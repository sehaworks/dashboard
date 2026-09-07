import styles from "@/pages/Dashboard/Dashboard.module.css";
import { HiOutlineCube } from "react-icons/hi";

import { useDashboardPolling } from "@/hooks/useDashboardPolling";
import { getEntireAcessStatus } from "@/services/apis/dashboardAPI";


// 전체 출입현황
const EntireAcessStatus = ({ workplaceId }) => {

    // API 호출
    const { data } = useDashboardPolling(getEntireAcessStatus, { workplaceId });


    return (
        <div className={`${styles.blurBox} ${styles.entryBox}`}>
            <div className={styles.blurBoxHeader}>
                <div className={styles.blurBoxTitle}>
                    <div className="iconBox">
                        <HiOutlineCube />
                    </div>
                    <span className={styles.titleText}>전체 출입현황</span>
                </div>
                <div className="iconBox"></div>
            </div>
            <div className={`${styles.blurBoxContent} ${styles.noPadding}`}>
                <div className={styles.entryContentBox}>
                    <div className={styles.entryTitle}>금일 총 출입 인원</div>
                    <div className={styles.entryContent}>
                        <div className={styles.entryDes}>
                            <span className={`${styles.dot} ${styles.green}`}></span>
                            임직원 <b>{data?.employeeAccessCount || 0}</b> 방문자 <b>{data?.visitorAccessCount || 0}</b>
                        </div>
                        <div className={styles.entryTotal}>
                            {data?.totalAccessCount || 0} <span>명</span>
                        </div>
                    </div>
                </div>
                <div className={styles.entryContentBox}>
                    <div className={styles.entryTitle}>현재 체류 인원</div>
                    <div className={styles.entryContent}>
                        <div className={styles.entryDes}>
                            <span className={`${styles.dot} ${styles.green}`}></span>
                            임직원 {data?.employeeStayCount || 0} 방문자 {data?.visitorStayCount || 0}
                        </div>
                        <div className={styles.entryTotal}>
                            {data?.currentStayCount || 0} <span>명</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntireAcessStatus;