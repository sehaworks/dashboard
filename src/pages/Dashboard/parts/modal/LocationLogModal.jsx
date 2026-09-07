import styles from "@/pages/Dashboard/Dashboard.module.css"
import { TbX, TbChevronRight } from "react-icons/tb";
import { useState, useEffect } from "react";
import { getLocationSignalAbsentUsers, getLocationLogList } from "@/services/apis/dashboardAPI";
import { useNavigate } from "react-router-dom";


// 시간 포맷 (HH:MM:SS)
const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
};


// 실시간 위치 로그 + 위치신호 이탈 로그 모달
const LocationLogModal = ({ open, onClose, workplaceId }) => {
    const navigate = useNavigate();

    const [locationLogs, setLocationLogs] = useState([]);
    const [signalLostLogs, setSignalLostLogs] = useState([]);

    useEffect(() => {
        if (!open) return;

        const fetchData = async () => {
            try {
                const [location, signalLost] = await Promise.all([
                    getLocationLogList({ workplaceId }),
                    getLocationSignalAbsentUsers({ workplaceId }),
                ]);
                setLocationLogs(location || []);
                setSignalLostLogs(signalLost || []);
            } catch (error) {
                console.error("위치 로그 데이터 호출 실패:", error);
            }
        };

        fetchData();
        const timer = setInterval(fetchData, 60000);

        return () => clearInterval(timer);
    }, [open, workplaceId]);

    if (!open) return null;

    // 실시간 위치 로그 화면으로 이동
    const handleLocationLogMenu = () => {
        navigate("/smartbadge/location-log");
    };

    return (
        <div className={`${styles.eventLogPanel} ${styles.locationLog}`}>
            <div className={styles.logBox}>
                <div className={styles.logDes}>
                    <header className={styles.logHeader}>
                        <span>실시간 위치 로그</span>
                        <div className={styles.closeBtn} onClick={onClose}>
                            <TbX />
                        </div>
                    </header>
                    <ul className={styles.logList}>
                        {locationLogs.map((log) => (
                            <li key={log.id}>
                                <span className={styles.liTime}>
                                    <span className={`${styles.dot} ${styles.blue}`} />
                                    {formatTime(log.loggedAt)}
                                </span>
                                <span className={styles.liZone}>{log.areaName}</span>
                                <span className={styles.liName}>{log.userName}</span>
                            </li>
                        ))}

                        {locationLogs.length === 0 && (
                            <div className={styles.noneData}>위치 로그가 없습니다.</div>
                        )}
                    </ul>
                </div>
                <button className={styles.moreBtn} onClick={handleLocationLogMenu}>
                    자세히 보기
                    <TbChevronRight />
                </button>
            </div>

            <div className={styles.logBox}>
                <div className={styles.logDes}>
                    <header className={styles.logHeader}>
                        <span>위치신호 이탈 로그</span>
                    </header>

                    <ul className={styles.logList}>
                        {signalLostLogs.map((log) => (
                            <li key={log.beaconId}>
                                <span className={styles.liTime}>
                                    <span className={`${styles.dot} ${styles.yellow}`} />
                                    {formatTime(log.signalLostAt)}
                                </span>
                                <span className={styles.liZone}>{log.areaName}</span>
                                <span className={styles.liName}>{log.userName}</span>
                            </li>
                        ))}

                        {signalLostLogs.length === 0 && (
                            <div className={styles.noneData}>데이터가 존재하지 않습니다.</div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LocationLogModal;
