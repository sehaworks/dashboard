import styles from "@/pages/Dashboard/Dashboard.module.css";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { TbX } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPendingEmergencyLogs, readEmergencyLogs } from "@/services/apis/emergencyAPI";

// 대시보드 비상상황 발생 알림 모달
const EmergencyModal = ({ workplaceId }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    // 비상상황 알림 polling (3초마다)
    useEffect(() => {
        const fetchPendingEmergencyLogs = async () => {
            try {
                const res = await getPendingEmergencyLogs({ workplaceId });

                if (res.hasUnreadLogs) {
                    setData(res.sosLogs);
                    setOpen(true);
                } else if (res.sosLogs.length === 0) {
                    setOpen(false);
                }
            } catch (error) {
                console.error("비상상황 알림 조회 실패:", error);
            }
        };

        fetchPendingEmergencyLogs();
        const intervalId = setInterval(fetchPendingEmergencyLogs, 3000);
        return () => clearInterval(intervalId);
    }, [workplaceId]);

    // 모달 닫기 (읽음 처리 API 호출)
    const handleClose = async () => {
        const sosLogIds = data.map((log) => log.id);

        if (sosLogIds.length > 0) {
            try {
                await readEmergencyLogs(sosLogIds);
            } catch (error) {
                console.error("SOS 로그 읽음 처리 실패:", error);
            }
        }

        setOpen(false);
        setData([]);
    };

    // 조치 버튼 클릭
    const handleAction = () => {
        handleClose();
        navigate("/smartbadge/emergency-log");
    };

    if (!open || !data || data.length === 0) return null;

    return (
        <div className={`${styles.modalDim} ${styles.active}`}>
            <div className={`${styles.modalContainer} ${styles.emergency}`}>
                <div className={styles.modalHeaderBox}>
                    <header className={styles.modalHeader}>
                        <div className={`${styles.modalTitle} ${styles.redTxt}`}>
                            <div className={styles.iconBox}>
                                <BsFillExclamationCircleFill />
                            </div>
                            <span>비상상황 발생 알림</span>
                        </div>
                        <div className={styles.closeBtn} onClick={handleClose}>
                            <TbX />
                        </div>
                    </header>
                    <div className={styles.modaHeaderDes}>
                        <b className={styles.redTxt}>비상 버튼 입력이 감지</b>되었습니다.
                        <br />
                        현황 확인 후 필요한 조치를 진행해 주세요.
                    </div>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.emergencyLogBox}>
                        {data.map((item, index) => (
                            <div key={item.id || index} className={styles.emergencyLogItem}>
                                <div className={styles.emergencyLogItemTitle}>
                                    <span>
                                        {item.departmentName || "미지정"}{" "}
                                        {item.userName || ""}
                                    </span>
                                    <span>
                                        {item.occurredAt
                                            ? item.occurredAt.replace("T", " ").substring(0, 16)
                                            : ""}
                                    </span>
                                </div>
                                <div className={styles.emergencyLogItemZone}>
                                    {item.workplaceName || ""} - {item.areaName || ""}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.grayBtn} onClick={handleClose}>닫기</button>
                    <button className={styles.redBtn} onClick={handleAction}>조치</button>
                </div>
            </div>
        </div>
    );
};

export default EmergencyModal;
