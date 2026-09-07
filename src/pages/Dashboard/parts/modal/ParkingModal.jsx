import styles from "@/pages/Dashboard/Dashboard.module.css";
import { useState, useEffect, useCallback, useMemo } from "react";
import { TbMap2, TbChevronRight, TbX, TbChevronDown, TbClock } from "react-icons/tb";
import { HiCube } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useConditionalPolling } from "@/hooks/useConditionalPolling";
import { getParkingSummary, getParkingCCTVList, getParkingBarrierList } from "@/services/apis/dashboardAPI";
import { searchParkingLogs } from "@/services/apis/parkingLogAPI";
import { controlBarrier, changeBarrierMode } from "@/services/apis/gatebarrierAPI";
import MesPlayer from "@/components/MesPlayer";


// getParkingCCTVList용 areaId 하드코딩
const PARKING_AREA_ID = 23;

// 모드 값 변환 (라벨 -> 백엔드 값)
const getModeValue = (label) => {
    switch (label) {
        case "일반모드": return "UNLOCK";
        case "상시개방": return "UPLOCK";
        case "상시잠금": return "DNLOCK";
        default: return "UNLOCK";
    }
};

// 모드 라벨 변환 (백엔드 값 -> 라벨)
const getModeLabel = (mode) => {
    switch (mode) {
        case "UNLOCK": return "일반모드";
        case "UPLOCK": return "상시개방";
        case "DNLOCK": return "상시잠금";
        default: return "일반모드";
    }
};

const MODE_OPTIONS = ["일반모드", "상시개방", "상시잠금"];


const ParkingModal = ({ open, onClose, workplaceId }) => {
    const navigate = useNavigate();

    const [cctvList, setCctvList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [openingBarrierId, setOpeningBarrierId] = useState(null);
    const companyId = JSON.parse(localStorage.getItem("grantRes"))?.data?.companyId || 1;  // 뮤트로닉스 회사 id

    const pollEnabled = open && !!workplaceId;
    const POLL_INTERVAL_MS = 3000;

    // 메모이제이션된 params
    const parkingParams = useMemo(() => ({ workplaceId }), [workplaceId]);
    const logsParams = useMemo(() => ({ companyId, workplaceId }), [companyId, workplaceId]);

    // 메모이제이션된 API 함수
    const fetchRecentLogs = useCallback(
        (params) => searchParkingLogs({
            companyId: params.companyId,
            workplaceId: params.workplaceId,
            page: 0,
            size: 3
        }).then((data) => data.contents || []),
        []
    );

    const { data: parkingSummary } = useConditionalPolling(getParkingSummary, parkingParams, POLL_INTERVAL_MS, pollEnabled);
    const { data: recentLogs } = useConditionalPolling(fetchRecentLogs, logsParams, POLL_INTERVAL_MS, pollEnabled);
    // 주차장 차단기 목록 api 조회
    const [barrierList, setBarrierList] = useState([]);
    useEffect(() => {
        if (!open || !workplaceId) {
            setBarrierList([]);
            return;
        }
        const loadBarrierList = async () => {
            const data = await getParkingBarrierList(workplaceId, PARKING_AREA_ID);
            setBarrierList(Array.isArray(data) ? data : []);
        };
        loadBarrierList();
    }, [open, workplaceId]);

    // 차단기 모드 변경
    const handleBarrierModeChange = async (barrierId, modeLabel) => {
        try {
            await changeBarrierMode({ barrierId, workplaceId, mode: getModeValue(modeLabel) });
            const data = await getParkingBarrierList(workplaceId, PARKING_AREA_ID);
            setBarrierList(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("차단기 모드 변경 실패:", err);
            window.alert("차단기 모드 변경에 실패했습니다.");
        }
        setOpenDropdownId(null);
    };

    // 차단기 개방
    const handleBarrierOpen = async (barrierId) => {
        setOpeningBarrierId(barrierId);
        try {
            await controlBarrier({ barrierId, workplaceId, command: "OPEN" });
        } catch (err) {
            console.error("차단기 개방 실패:", err);
            window.alert("차단기 개방에 실패했습니다.");
        } finally {
            setOpeningBarrierId(null);
        }
    };

    // 모달 열릴 때 CCTV 목록 조회
    useEffect(() => {
        if (!open || !workplaceId) {
            setCctvList([]);
            return;
        }

        const loadCctvList = async () => {
            setLoading(true);
            try {
                const data = await getParkingCCTVList(PARKING_AREA_ID);
                setCctvList(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("CCTV 목록 조회 실패:", err);
                setCctvList([]);
            } finally {
                setLoading(false);
            }
        };

        loadCctvList();
    }, [open, workplaceId]);

    if (!open) return null;

    // 전체 보기 이동
    const handleMoreBtn = () => {
        navigate("/parking/cctv");
    };

    // 시간 포맷: "26-02-10 02:01 PM"
    const formatLogTime = (isoStr) => {
        const d = new Date(isoStr);
        const yy = String(d.getFullYear()).slice(2);
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        return `${yy}-${mm}-${dd} ${time}`;
    };

    // CCTV 4개까지 표시 (cctvGroup이 2x2 그리드)
    const displayCctvs = cctvList.slice(0, 4);
    const isHttps = import.meta.env.VITE_HTTPS === "true";
    const wsProtocol = isHttps ? "wss" : "ws";

    return (
        <div className={`${styles.modalDim} ${styles.active}`} onClick={onClose}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <header className={styles.modalHeader}>
                    <div className={`${styles.modalTitle} ${styles.blurBoxTitle}`}>
                        <div className={styles.iconBox}>
                            <TbMap2 />
                        </div>
                        <span>대시보드 메인</span>
                        <div className={styles.iconBox}>
                            <TbChevronRight />
                        </div>
                        <span>주차장</span>
                    </div>
                    <div className={styles.closeBtn} onClick={onClose}>
                        <TbX />
                    </div>
                </header>
                <section className={styles.modalBody}>
                    <div className={styles.leftContainer}>
                        <div className={styles.cctvGroup}>
                            {displayCctvs.length > 0
                                ? displayCctvs.map((cctv) => {
                                    const wsUrl = `${wsProtocol}://${cctv.url}/stream/${cctv.streamUuid}/channel/${cctv.channel}/mse?uuid=${cctv.streamUuid}&channel=${cctv.channel}`;
                                    return (
                                        <div key={cctv.cctvId} className={styles.cctvBox}>
                                            <span className={styles.cctvTag}>{cctv.cctvName}</span>
                                            <MesPlayer wsUrl={wsUrl} isPlayback={false} />
                                        </div>
                                    );
                                })
                                : Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className={styles.cctvBox} />
                                ))
                            }
                            {/* 빈 슬롯 채우기 (4칸 유지) */}
                            {displayCctvs.length > 0 && displayCctvs.length < 4 &&
                                Array.from({ length: 4 - displayCctvs.length }).map((_, i) => (
                                    <div key={`empty-${i}`} className={styles.cctvBox} />
                                ))
                            }
                        </div>
                        <div className={styles.bottomControlBox}>
                            {barrierList.map((barrier) => (
                                <div key={barrier.barrierId} className={styles.controlBox}>
                                    <span className={styles.controlTitle}>{barrier.barrierName}</span>
                                    <div
                                        className={styles.controlDropdown}
                                        onClick={() => setOpenDropdownId(openDropdownId === barrier.barrierId ? null : barrier.barrierId)}
                                    >
                                        <span>{getModeLabel(barrier.mode)}</span>
                                        <div className={styles.iconBox}>
                                            <TbChevronDown />
                                        </div>
                                        {openDropdownId === barrier.barrierId && (
                                            <div className={styles.controlDropdownListBox}>
                                                <ul className={styles.controlDropdownList}>
                                                    {MODE_OPTIONS.map((label) => (
                                                        <li
                                                            key={label}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleBarrierModeChange(barrier.barrierId, label);
                                                            }}
                                                        >
                                                            <span className={styles.liName}>{label}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className={`${styles.controlToggleBtn} ${barrier.mode === "UNLOCK" && openingBarrierId !== barrier.barrierId ? styles.on : ""}`}
                                        disabled={barrier.mode !== "UNLOCK" || openingBarrierId === barrier.barrierId}
                                        onClick={() => handleBarrierOpen(barrier.barrierId)}
                                    >
                                        {openingBarrierId === barrier.barrierId ? "처리중..." : "열기"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.rightContainer}>
                        <div className={styles.inAndOutTotal}>
                            <div className={styles.boxTitle}>
                                <div className={styles.iconBox}>
                                    <HiCube />
                                </div>
                                <span className={styles.titleText}>입출차 현황</span>
                            </div>
                            <div className={styles.entryContent}>
                                <div className={styles.entryTitle}>실시간 체류 차량</div>
                                <div className={styles.entryTotal}>
                                    {parkingSummary?.totalParkedCount ?? "--"} <span>대</span>
                                </div>
                            </div>
                            <div className={styles.totalItemBox}>
                                <div className={styles.totalItem}>
                                    <span className={`${styles.dot} ${styles.green}`}></span>
                                    임직원 <b>{parkingSummary?.employeeCount ?? "--"}</b>
                                </div>
                                <div className={styles.totalItem}>
                                    <span className={`${styles.dot} ${styles.green}`}></span>
                                    방문자 <b>{parkingSummary?.visitorCount ?? "--"}</b>
                                </div>
                                <div className={styles.totalItem}>
                                    <span className={`${styles.dot} ${styles.green}`}></span>
                                    기타 <b>{parkingSummary ? (parkingSummary.tenantCount + parkingSummary.unregisteredCount) : "--"}</b>
                                </div>
                            </div>
                        </div>
                        <div className={styles.inAndOutLog}>
                            <div className={styles.boxTitle}>
                                <div className={styles.iconBox}>
                                    <HiCube />
                                </div>
                                <span className={styles.titleText}>최근 입출차</span>
                            </div>
                            <div className={styles.logGroup}>
                                {(recentLogs ?? []).length > 0 ? (recentLogs ?? []).map((log) => (
                                    <div key={log.logId} className={styles.card}>
                                        <div className={styles.header}>
                                            <span className={styles.clock}>
                                                <TbClock />
                                            </span>
                                            <span className={styles.time}>{formatLogTime(log.createdAt)}</span>
                                        </div>
                                        <ul className={styles.list}>
                                            <li className={styles.row}>
                                                <span className={`${styles.dot} ${styles.blue}`} />
                                                <span className={styles.label}>차량번호:</span>
                                                <span className={styles.value}> {log.carNum}</span>
                                            </li>
                                            <li className={styles.row}>
                                                <span className={`${styles.dot} ${styles.blue}`} />
                                                <span className={styles.label}>출입방향:</span>
                                                <span className={styles.value}> {log.type}</span>
                                            </li>
                                            <li className={styles.row}>
                                                <span className={`${styles.dot} ${styles.blue}`} />
                                                <span className={styles.label}>유　　형:</span>
                                                <span className={styles.value}> {log.ownerType}</span>
                                            </li>
                                        </ul>
                                    </div>
                                )) : (
                                    <div className={styles.card} style={{ textAlign: 'center', padding: '20px' }}>
                                        입출차 내역이 없습니다.
                                    </div>
                                )}
                            </div>
                        </div>

                        <button className={styles.moreBtn} onClick={handleMoreBtn}>
                            전체 보기
                            <TbChevronRight />
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ParkingModal;
