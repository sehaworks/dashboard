import styles from "@/pages/Dashboard/Dashboard.module.css";
import { TbChevronRight } from "react-icons/tb";
import { useState, useMemo } from "react";
import { HiOutlineCube } from "react-icons/hi";
import DonutChart from "@/components/DountChart";

import { useDashboardPolling } from "@/hooks/useDashboardPolling";
import { getEventStatus } from "@/services/apis/dashboardAPI";

// 이벤트 발생현황
const EventStatus = ({ workplaceId, onOpen }) => {

    const [openEventLogModal, setOpenEventLogModal] = useState(false);   // 이벤트 발생현황 로그 모달

    // API 호출
    const { data } = useDashboardPolling(getEventStatus, { workplaceId });

    // 차트 데이터 매핑
    const chartData = useMemo(() => [
        { name: "보안구역 접근", value: data?.securityAccessCount || 0, color: "#f28b4b" }, // 빨간색
        { name: "비상발생", value: data?.sosOccurredCount || 0, color: "#f2ff00" },        // 노란색
        { name: "비상해제", value: data?.sosResolvedCount || 0, color: "#6ee86b" },        // 초록색
    ], [data]);


    return (
        <div className={`${styles.blurBox} ${styles.eventBox}`}>
            <div className={styles.blurBoxHeader}>
                <div
                    className={styles.blurBoxTitle}
                >
                    <div className="iconBox">
                        <HiOutlineCube />
                    </div>
                    <span className={styles.titleText}>이벤트 발생현황</span>
                </div>
                <div className="iconBox" onClick={onOpen}>
                    <TbChevronRight />
                </div>
            </div>
            <div className={styles.blurBoxContentFlex}>
                <div className={`${styles.chartBox} ${styles.forGlow}`}>
                    <DonutChart title="전체" total={data?.totalEvents || 0} chartData={chartData} />
                    <div className={styles.donutGlow} />
                </div>
                <div className={styles.legendBox}>
                    <div className={styles.chartLegend}>
                        <span className={`${styles.dot} ${styles.red}`}></span>
                        <span className={styles.legendTitle}>
                            보안구역 접근 <b>{data?.securityAccessCount || 0}</b>
                        </span>
                    </div>
                    <div className={styles.chartLegend}>
                        <span className={`${styles.dot} ${styles.yellow}`}></span>
                        <span className={styles.legendTitle}>
                            비상발생 <b>{data?.sosOccurredCount || 0}</b>
                        </span>
                    </div>
                    <div className={styles.chartLegend}>
                        <span className={`${styles.dot} ${styles.green}`}></span>
                        <span className={styles.legendTitle}>
                            비상해제 <b>{data?.sosResolvedCount || 0}</b>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventStatus;