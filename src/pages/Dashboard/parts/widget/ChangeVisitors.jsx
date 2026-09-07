import styles from "../../Dashboard.module.css";
import { HiOutlineCube } from "react-icons/hi";
import AccessLineChart from "../../../../components/AccessLineChart";

// 백엔드 API 및 커스텀 훅 없이 동작하는 더미 데이터
const DUMMY_DATA = {
    "timeLabels": [
        "01", "02", "03", "04", "05", "06",
        "07", "08", "09", "10", "11", "12",
        "13", "14", "15", "16", "17", "18",
        "19", "20", "21", "22", "23", "24"
    ],
    "employees": [
        0, 5, 10, 40, 2, 0, 0, 50, 60, 60, 40, 30,
        40, 40, 40, 20, 10, 5, 0, 0, 0, 0, 0, 0
    ],
    "visitors": [
        0, 1, 0, 0, 3, 0, 0, 0, 10, 0, 0, 5,
        0, 0, 5, 7, 10, 15, 15, 14, 10, 0, 0, 0
    ]
};

// 별도의 prop 전달 없이 바로 사용할 수 있습니다.
const ChangeVisitors = () => {
    return (
        <div className={`${styles.blurBox} ${styles.chartVisitorBox}`}>
            <div className={styles.blurBoxHeader}>
                <div className={styles.blurBoxTitle}>
                    <div className="iconBox">
                        <HiOutlineCube size={24} />
                    </div>
                    <span className={styles.titleText}>출입인원 변화</span>
                </div>
                <div className="iconBox"></div>
            </div>
            <div className={styles.blurBoxContent}>
                <div className={styles.chartBox}>
                    <AccessLineChart apiData={DUMMY_DATA} />
                    <div className={styles.chartLegendBox}>
                        <div className={styles.chartLegend}>
                            <span
                                className={`${styles.doubleDot} ${styles.white}`}
                            ></span>
                            임직원
                        </div>
                        <div className={styles.chartLegend}>
                            <span
                                className={`${styles.doubleDot} ${styles.blue}`}
                            ></span>
                            방문자
                        </div>
                        {/* <div className={styles.chartLegend}>
                            <span
                                className={`${styles.doubleDot} ${styles.yellow}`}
                            ></span>
                            미확인
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeVisitors;