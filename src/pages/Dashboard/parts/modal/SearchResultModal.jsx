import styles from "../../Dashboard.module.css";
import { TbX } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";

const SearchResultModal = ({ open, onClose, userData }) => {
    if (!open || !userData) return null;

    return (
        <div className={styles.searchResult}>
            <header className={styles.logHeader}>
                <span className={styles.logHeaderTitle}>검색결과 {userData.status === "SIGNAL_OUTAGE" && ": 위치신호 이탈"}</span>
                <button className={styles.closeBtn} onClick={onClose}>
                    <TbX />
                </button>
            </header>
            <div className={styles.searchResultDes}>
                {userData.profileImageUrl ? (
                    <img src={userData.profileImageUrl} alt="userImg" />
                ) : (
                    <span className={styles.profileIcon}>
                        <FaUserCircle />
                    </span>
                )}
                <div className={styles.userDes}>
                    <div className={styles.userLocation}>
                        {userData.location}
                        {userData.status === "SIGNAL_OUTAGE" && userData.elapsedTime && (
                            <span className={styles.elapsedTime}>
                                {userData.elapsedTime}
                            </span>
                        )}
                    </div>
                    <div className={styles.userName}>{userData.maskedUserName}</div>
                    <div className={styles.userTeam}>{userData.departmentName}</div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultModal;
