import styles from "@/pages/Dashboard/Dashboard.module.css";
import { TbChevronRight } from "react-icons/tb";
import { useMemo } from "react";
import { HiOutlineCube, HiCube } from "react-icons/hi";
import VisitBars from "@/components/VisitBarChart";
import CardSlider from "@/components/CardSlider/CardSlider";

import { useDashboardPolling } from "@/hooks/useDashboardPolling";
import { getVisitorSummary, getVisitReservationList } from "@/services/apis/dashboardAPI";
import { useNavigate } from "react-router-dom";

/**
* [
  {
    "reservationId": 1,
    "visitDateTime": "2026-02-03T08:16:49.699Z",
    "visitorName": "마이즈솔루션",
    "visitorCompanyName": "마이즈",
    "visitPurpose": "설계구도회의",
    "targetUserName": "김철수",
    "targetDepartmentName": "영업팀"
  }
]
 */


// 방문자 현황
const VisitorStatus = ({ workplaceId, items, onOpen }) => {
    const navigate = useNavigate();

    // API 호출
    const { data: visitorSummaryData } = useDashboardPolling(getVisitorSummary, { workplaceId });
    const { data: reservationData } = useDashboardPolling(getVisitReservationList, { workplaceId });

    // 날짜 포맷팅 함수 (yy-mm-dd hh:mm AM/PM)
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const yy = String(date.getFullYear()).slice(2);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        return `${yy}-${mm}-${dd} ${time}`;
    };

    // API 응답을 CardSlider reservationData 구조로 변환
    const sliderItems = useMemo(() => {
        if (!reservationData || !Array.isArray(reservationData)) return [];

        return reservationData.map((item) => ({
            id: item.reservationId,
            time: formatDateTime(item.visitDateTime),
            rows: [
                { label: "방 문 자:", value: `${item.visitorName || '-'} / ${item.visitorCompanyName || '-'}` },
                { label: "방문목적:", value: item.visitPurpose || '-' },
                { label: "담 당 자:", value: `${item.targetUserName || '-'} / ${item.targetDepartmentName || '-'}` },
            ],
        }));
    }, [reservationData]);

    // 방문자 출입 내역 화면으로 이동
    const handleVisitAccessHistoryMenu = () => {
        navigate("/visit/request");
    };

    // 카드 클릭 시 상세 페이지로 이동하며 ID 전달 (모달 띄우기용)
    const handleCardClick = (id) => {
        navigate("/visit/request", { state: { reservationId: id } });
    };

    return (
        <div className={`${styles.blurBox} ${styles.visitorBox}`}>
            <div className={styles.blurBoxHeader}>
                <div className={styles.blurBoxTitle}>
                    <div className="iconBox">
                        <HiOutlineCube />
                    </div>
                    <span className={styles.titleText}>방문자 현황</span>
                </div>
                <div className="iconBox" onClick={onOpen}>
                    <TbChevronRight />
                </div>
            </div>
            <div className={styles.blurBoxContent}>
                <div className={styles.chartBox}>
                    <VisitBars planned={visitorSummaryData?.scheduledCount || 0} completed={visitorSummaryData?.completedCount || 0} />
                </div>
            </div>
            <div className={`${styles.boxInBox} ${styles.visitReservation}`}>
                <div className={styles.blurBoxHeader}>
                    <div className={styles.blurBoxTitle}>
                        <div className="iconBox">
                            <HiCube />
                        </div>
                        <span className={styles.titleText}>7일 이내 방문 예정</span>
                    </div>
                    <div className={styles.viewMore} onClick={handleVisitAccessHistoryMenu}>
                        자세히 보기
                        <div className="iconBox">
                            <TbChevronRight />
                        </div>
                    </div>
                </div>
                <div className={styles.blurBoxContent}>
                    <CardSlider items={sliderItems} autoMs={5000} onClickItem={handleCardClick} />
                </div>
            </div>
        </div>
    );
};

export default VisitorStatus;