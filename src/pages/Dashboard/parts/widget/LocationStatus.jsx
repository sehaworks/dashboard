import styles from "@/pages/Dashboard/Dashboard.module.css";
import { TbX, TbChevronRight } from "react-icons/tb";
import { useState } from "react";
import { HiOutlineCube } from "react-icons/hi";
import {
    BsFillExclamationTriangleFill,
    BsFillExclamationCircleFill,
} from "react-icons/bs";
import ToggleList from "@/components/ToggleList/ToggleList";
import { TbUsers } from "react-icons/tb";

import { useDashboardPolling } from "@/hooks/useDashboardPolling";
import { getLocationStatusData } from "@/services/apis/dashboardAPI";



// 실시간 위치현황
const LocationStatus = ({ workplaceId, onOpen }) => {


    // API 호출
    const { data } = useDashboardPolling(getLocationStatusData, { workplaceId });




    return (
        <div className={`${styles.blurBox} ${styles.liveLocationBox}`}>
            <div className={styles.blurBoxHeader}>
                <div className={styles.blurBoxTitle}>
                    <div className="iconBox">
                        <HiOutlineCube />
                    </div>
                    <span className={styles.titleText}>실시간 위치현황</span>
                </div>
                <div className="iconBox" onClick={onOpen}>
                    <TbChevronRight />
                </div>
            </div>
            <div className={`${styles.blurBoxContent} ${styles.noPadding}`}>
                <div className={styles.entryContentBox}>
                    <div className={styles.entryContent}>
                        <div className={styles.entryTitle}>사옥 내 체류 임직원</div>
                        <div className={styles.entryTotal}>
                            {data?.totalPersonnel ?? "--"} <span>명</span>
                        </div>
                    </div>
                </div>
                <div className={styles.toggleListBox}>
                    <ToggleList buildings={data?.buildings || []} />
                </div>
                <div className={styles.chartLegendBox}>
                    <div className={`${styles.chartLegend} ${styles.red}`}>
                        <span className="iconBox">
                            <BsFillExclamationTriangleFill />
                        </span>
                        보안구역
                    </div>
                    <div className={`${styles.chartLegend} ${styles.yellow}`}>
                        <span className="iconBox">
                            <BsFillExclamationCircleFill />
                        </span>
                        위치신호 이탈
                    </div>
                    <div className={`${styles.chartLegend} ${styles.white}`}>
                        <span className="iconBox">
                            <TbUsers />
                        </span>
                        정상
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationStatus;