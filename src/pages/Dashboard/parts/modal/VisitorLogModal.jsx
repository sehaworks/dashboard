import styles from "../../Dashboard.module.css";
import { TbX, TbChevronRight } from "react-icons/tb";
import { useState } from "react";
// react-router-dom import 제거

const MOCK_LOGS = [
    { id: 1, accessType: "ENTRY", accessTypeDescription: "입장", accessTime: "14:30:25", visitorName: "◇◇사" },
    { id: 2, accessType: "EXIT", accessTypeDescription: "퇴장", accessTime: "14:30:25", visitorName: "◇◇사" },
    { id: 3, accessType: "ENTRY", accessTypeDescription: "입장", accessTime: "14:30:25", visitorName: "◇◇사" },
    { id: 4, accessType: "EXIT", accessTypeDescription: "퇴장", accessTime: "14:30:25", visitorName: "◇◇사" },
    { id: 5, accessType: "EXIT", accessTypeDescription: "퇴장", accessTime: "14:30:25", visitorName: "◇◇사" },
    { id: 6, accessType: "ENTRY", accessTypeDescription: "입장", accessTime: "14:30:25", visitorName: "◇◇사" },
    { id: 7, accessType: "EXIT", accessTypeDescription: "퇴장", accessTime: "14:30:25", visitorName: "◇◇사" },
    { id: 8, accessType: "ENTRY", accessTypeDescription: "입장", accessTime: "14:30:25", visitorName: "◇◇사" },
    { id: 9, accessType: "EXIT", accessTypeDescription: "퇴장", accessTime: "14:30:25", visitorName: "◇◇사" },
    { id: 10, accessType: "ENTRY", accessTypeDescription: "입장", accessTime: "14:30:25", visitorName: "◇◇사" },
    { id: 11, accessType: "EXIT", accessTypeDescription: "퇴장", accessTime: "14:30:25", visitorName: "◇◇사" }
];

const VisitorLogModal = ({ open = true, onClose }) => {
    const [logs] = useState(MOCK_LOGS);

    if (!open) return null;

    // window.location.href로 경로 이동 처리
    const handleVisitAccessHistoryMenu = () => {
        window.location.href = "/visit/access-history";
    };

    return (
        <div className={`${styles.eventLogPanel} ${styles.visitorLog}`}>
            <div className={styles.logBox}>
                <div className={styles.logDes}>
                    <header className={styles.logHeader}>
                        <span>방문자 출입 내역</span>
                        <button className={styles.closeBtn} onClick={onClose}>
                            <TbX />
                        </button>
                    </header>

                    <ul className={styles.logList}>
                        {logs.map((log) => {
                            const isEntry = log.accessType === "ENTRY";
                            return (
                                <li key={log.id}>
                                    <span className={styles.liTime}>
                                        <span className={isEntry ? styles.workIn : styles.workOut}>
                                            {log.accessTypeDescription}
                                        </span>
                                        {log.accessTime}
                                    </span>
                                    <span className={styles.liName}>{log.visitorName}</span>
                                </li>
                            );
                        })}

                        {logs.length === 0 && (
                            <div className={styles.noneData}>데이터가 존재하지 않습니다.</div>
                        )}
                    </ul>
                </div>

                <button className={styles.moreBtn} onClick={handleVisitAccessHistoryMenu}>
                    자세히 보기
                    <TbChevronRight />
                </button>
            </div>
        </div>
    );
};

export default VisitorLogModal;