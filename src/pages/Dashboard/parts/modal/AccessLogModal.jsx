import styles from "@/pages/Dashboard/Dashboard.module.css";
import { TbX, TbChevronRight } from "react-icons/tb";
import { useState, useEffect } from "react";
import { getEmergencyLogList, getSecurityAccessLogList } from "@/services/apis/dashboardAPI";

import { useNavigate } from "react-router-dom";

const MOCK_SECURITY_LOGS = [
    {
        id: 1,
        areaName: "서버실하나둘셋넷다섯",
        userName: "홍길동",
        departmentName: "개발팀",
        loggedAt: "2026-02-09T07:08:12.431Z"
    },
    {
        id: 2,
        areaName: "창고",
        userName: "홍길동",
        departmentName: "개발팀",
        loggedAt: "2026-02-09T07:08:12.431Z"
    },
    {
        id: 3,
        areaName: "창고",
        userName: "홍길동",
        departmentName: "개발팀",
        loggedAt: "2026-02-09T07:08:12.431Z"
    }
];

const MOCK_EMERGENCY_LOGS = [
    {
        id: 1,
        areaName: "창고",
        userName: "홍길동",
        departmentName: "개발팀",
        occurredAt: "2026-02-09T07:09:46.181Z",
        actionAt: "2026-02-09T07:09:46.181Z",
        actionStatus: "SOS_OCCURRED",
        actionStatusDescription: "비상발생"
    },
    {
        id: 3,
        areaName: "창고",
        userName: "홍길동",
        departmentName: "개발팀",
        occurredAt: "2026-02-09T07:09:46.181Z",
        actionAt: "2026-02-09T07:09:46.181Z",
        actionStatus: "SOS_OCCURRED",
        actionStatusDescription: "비상발생"
    },
    {
        id: 4,
        areaName: "창고일이삼사오육",
        userName: "홍길동",
        departmentName: "개발팀",
        occurredAt: "2026-02-09T07:09:46.181Z",
        actionAt: "2026-02-09T07:09:46.181Z",
        actionStatus: "SOS_RESOLVED",
        actionStatusDescription: "비상해제"
    }
];

// 시간 포맷 (HH:MM:SS)
const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
};

// 텍스트 자르기
const truncateText = (text, maxLength = 9) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
};




// 보안구역 접근 로그 모달 & 비상상황 발생 로그
const AccessLogModal = ({ open, onClose, workplaceId }) => {
    const navigate = useNavigate();



    const [securityLogs, setSecurityLogs] = useState([]);
    const [emergencyLogs, setEmergencyLogs] = useState([]);

    useEffect(() => {
        if (!open) return;

        const fetchData = async () => {
            try {
                const [security, emergency] = await Promise.all([
                    getSecurityAccessLogList({ workplaceId }),
                    getEmergencyLogList({ workplaceId }),
                ]);
                setSecurityLogs(security || []);
                setEmergencyLogs(emergency || []);
            } catch (error) {
                console.error("로그 데이터 호출 실패:", error);
            }
        };

        fetchData();
        const timer = setInterval(fetchData, 60000);

        return () => clearInterval(timer);
    }, [open, workplaceId]);

    // useEffect(() => {
    //     // eslint-disable-next-line react-hooks/set-state-in-effect
    //     setSecurityLogs(MOCK_SECURITY_LOGS);
    //     setEmergencyLogs(MOCK_EMERGENCY_LOGS);
    // }, []);

    if (!open) return null;

    // 스마트사원증관리 > 보안구역 접근로그 메뉴 이동
    const handleSecurityAccessLogMenu = () => {
        navigate("/smartbadge/access-history");
    };

    // 스마트사원증관리 > 비상상황 발생로그 메뉴 이동
    const handleEmergencyLogMenu = () => {
        navigate("/smartbadge/emergency-log");
    };


    return (
        <div className={`${styles.eventLogPanel} ${styles.securityLog}`}>
            <div className={styles.logBox}>
                <div className={styles.logDes}>
                    <header className={styles.logHeader}>
                        <span>보안구역 접근 로그</span>
                        <button className={styles.closeBtn} onClick={onClose}>
                            <TbX />
                        </button>
                    </header>
                    <ul className={styles.logList}>
                        {securityLogs.map((log) => (
                            <li key={log.id} className={styles.liRed}>
                                <span className={styles.liZone}>
                                    <span className={styles.dot} />
                                    {truncateText(log.areaName, 9)}                                </span>
                                <span className={styles.liName}>{log.userName}</span>
                                <span className={styles.liTime}>{formatTime(log.loggedAt)}</span>
                            </li>
                        ))}

                        {securityLogs.length === 0 && (
                            <div className={styles.noneData}>데이터가 존재하지 않습니다.</div>
                        )}
                    </ul>
                </div>
                <button className={styles.moreBtn} onClick={handleSecurityAccessLogMenu}>
                    자세히 보기
                    <TbChevronRight />
                </button>
            </div>

            <div className={styles.logBox}>
                <div className={styles.logDes}>
                    <header className={styles.logHeader}>
                        <span>비상상황 발생 로그</span>
                    </header>

                    <ul className={`${styles.logList} ${styles.doubleTime}`}>
                        {emergencyLogs.map((log) => {
                            const isResolved = log.actionStatus === "SOS_RESOLVED";
                            return (
                                <li key={log.id} className={isResolved ? styles.liGreen : styles.liYellow}>
                                    <span className={styles.liZone}>
                                        <span className={styles.dot} />
                                        {truncateText(log.areaName, 7)}
                                    </span>
                                    <span className={styles.liName}>{log.userName}</span>
                                    <span className={`${styles.liTime} ${styles.liYellow}`}>
                                        {formatTime(log.occurredAt)}
                                    </span>
                                    <span className={`${styles.liTime} ${styles.liGreen}`}>
                                        {isResolved ? formatTime(log.actionAt) : ""}
                                    </span>
                                </li>
                            );
                        })}

                        {emergencyLogs.length === 0 && (
                            <div className={styles.noneData}>데이터가 존재하지 않습니다.</div>
                        )}
                    </ul>
                </div>

                <button className={styles.moreBtn} onClick={handleEmergencyLogMenu}>
                    자세히 보기
                    <TbChevronRight />
                </button>
            </div>
        </div>
    );
};

export default AccessLogModal;
