import styles from "../../Dashboard.module.css";
import { TbMap2, TbChevronRight, TbX } from "react-icons/tb";
import { HiOutlineCube } from "react-icons/hi";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useState } from "react";

import sample from "../../../../assets/imgs/sampleImg.jpg";
import unlock from "../../../../assets/imgs/icons/unlock.png";
import lock from "../../../../assets/imgs/icons/lock.png";

// 층별 도면 컴포넌트 (C동)
import CF1 from "../../../../components/Floor/C/F1/CF1";
import CF2 from "../../../../components/Floor/C/F2/CF2";
import CF3 from "../../../../components/Floor/C/F3/CF3";

// C동 단일 설정
const C_BUILDING_CONFIG = {
    buildingName: "C동",
    floors: [
        { number: 1, label: "1F", Component: CF1 },
        { number: 2, label: "2F", Component: CF2 },
        { number: 3, label: "3F", Component: CF3 },
    ],
};

// 이미지 기준 더미데이터
const DUMMY_STAY_USERS = [
    { beaconId: "1", userName: "김OO", departmentName: "근로자1" },
    { beaconId: "2", userName: "홍OO", departmentName: "근로자2" },
    { beaconId: "3", userName: "홍OO", departmentName: "근로자2" },
    { beaconId: "4", userName: "홍OO", departmentName: "근로자2" },
];

const DUMMY_SIGNAL_OUTAGE_USERS = [
    { beaconId: "101", userName: "김OO", elapsedTime: "1:30분 경과" },
    { beaconId: "102", userName: "Longname...", elapsedTime: "11:53분 경과" },
    { beaconId: "103", userName: "Longname...", elapsedTime: "11:53분 경과" },
    { beaconId: "104", userName: "Longname...", elapsedTime: "11:53분 경과" },
];

const DUMMY_DOOR_STATUS = [
    { doorId: "d1", doorName: "1층 게이트 정문 입문", isUnlocked: true },
    { doorId: "d2", doorName: "1층 게이트 정문 출문", isUnlocked: false },
    { doorId: "d3", doorName: "1층 게이트 후문 입문", isUnlocked: true },
    { doorId: "d4", doorName: "1층 게이트 후문 출문", isUnlocked: false },
];

const FloorDetailModal = ({ open, onClose }) => {
    const [currentFloor, setCurrentFloor] = useState(1);

    // 선택된 상세정보 state
    const [stayDetail, setStayDetail] = useState(null);
    const [selectedStayBeaconId, setSelectedStayBeaconId] = useState(null);

    const [leaveDetail, setLeaveDetail] = useState(null);
    const [selectedLeaveBeaconId, setSelectedLeaveBeaconId] = useState(null);

    if (!open) return null;

    const config = C_BUILDING_CONFIG;
    const floorConfig = config.floors.find((f) => f.number === currentFloor);
    const FloorComponent = floorConfig?.Component;
    const floorTitle = `${config.buildingName}-${currentFloor}F`;

    // 클릭 이벤트 핸들러
    const handleStayItemClick = (user) => {
        if (selectedStayBeaconId === user.beaconId) {
            setStayDetail(null);
            setSelectedStayBeaconId(null);
            return;
        }
        setStayDetail({
            profileImageUrl: sample,
            location: floorTitle,
            maskedUserName: user.userName,
            departmentName: user.departmentName,
        });
        setSelectedStayBeaconId(user.beaconId);
    };

    const handleLeaveItemClick = (user) => {
        if (selectedLeaveBeaconId === user.beaconId) {
            setLeaveDetail(null);
            setSelectedLeaveBeaconId(null);
            return;
        }
        setLeaveDetail({
            profileImageUrl: sample,
            elapsedTime: user.elapsedTime,
            maskedUserName: user.userName,
            departmentName: "미지정",
        });
        setSelectedLeaveBeaconId(user.beaconId);
    };

    return (
        <div className={`${styles.modalDim} ${styles.active}`} onClick={onClose}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <header className={styles.modalHeader}>
                    <div className={`${styles.modalTitle} ${styles.blurBoxTitle}`}>
                        <div className={styles.iconBox}>
                            <TbMap2 />
                        </div>
                        <span>대시보드 메인</span>
                        <div className={styles.iconBox}>
                            <TbChevronRight />
                        </div>
                        <span>{floorTitle}</span>
                    </div>
                    <div className={styles.closeBtn} onClick={onClose}>
                        <TbX />
                    </div>
                </header>

                <section className={styles.modalBody}>
                    <div className={styles.floorLeftBar}>
                        {/* 실시간 체류 인원 / 이탈 인원 영역 */}
                        <div className={`${styles.blurBox} ${styles.stayBox}`}>
                            <div className={styles.floorDetailInfoBox}>
                                <div className={styles.blurBoxHeader}>
                                    <div className={styles.blurBoxTitle}>
                                        <div className="iconBox">
                                            <HiOutlineCube />
                                        </div>
                                        <span className={styles.titleText}>실시간 체류 인원 정보</span>
                                    </div>
                                    <div className="iconBox"></div>
                                </div>
                                <div className={styles.listBox}>
                                    {DUMMY_STAY_USERS.map((u) => (
                                        <div
                                            className={`${styles.listItem} ${selectedStayBeaconId === u.beaconId ? styles.listItemSelected : ""}`}
                                            key={u.beaconId}
                                            onClick={() => handleStayItemClick(u)}
                                        >
                                            <div className={styles.userProfile}>
                                                <img src={sample} alt="profile" />
                                                <span>{u.userName}</span>
                                            </div>
                                            <span className={styles.userTitle}>{u.departmentName}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 위치신호 이탈 인원 정보 */}
                            <div className={styles.boxHeader}>
                                <div className={styles.iconBox}>
                                    <BsFillExclamationCircleFill className={styles.gradientIcon} />
                                </div>
                                <span className={styles.titleText}>위치신호 이탈 인원 정보</span>
                            </div>
                            <div className={styles.listBox}>
                                {DUMMY_SIGNAL_OUTAGE_USERS.map((u) => (
                                    <div
                                        className={`${styles.listItem} ${selectedLeaveBeaconId === u.beaconId ? styles.listItemSelected : ""}`}
                                        key={u.beaconId}
                                        onClick={() => handleLeaveItemClick(u)}
                                    >
                                        <div className={styles.userProfile}>
                                            <img src={sample} alt="profile" />
                                            <span>{u.userName}</span>
                                        </div>
                                        <span className={styles.spendTime}>{u.elapsedTime}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 출입문 상태 */}
                        <div className={`${styles.blurBox} ${styles.doorState}`}>
                            <div className={styles.blurBoxHeader}>
                                <div className={styles.blurBoxTitle}>
                                    <div className="iconBox">
                                        <HiOutlineCube />
                                    </div>
                                    <span className={styles.titleText}>출입문 상태</span>
                                </div>
                                <div className="iconBox"></div>
                            </div>
                            <div className={styles.lockListBox}>
                                {DUMMY_DOOR_STATUS.map((d) => (
                                    <div className={styles.lockListItem} key={d.doorId}>
                                        <span>{d.doorName}</span>
                                        <div className={styles.lockState}>
                                            <span>{d.isUnlocked ? "UNLOCK" : "LOCK"}</span>
                                            <img
                                                src={d.isUnlocked ? unlock : lock}
                                                alt={d.isUnlocked ? "unlockIcon" : "lockIcon"}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.floorBox}>
                        {/* 동적 층 컴포넌트 */}
                        {FloorComponent && (
                            <FloorComponent
                                currentFloor={currentFloor}
                                onFloorChange={setCurrentFloor}
                            />
                        )}

                        {/* 체류 인원 상세정보 팝업 */}
                        {stayDetail && (
                            <div className={`${styles.searchResult} ${styles.stayDetail}`}>
                                <header className={styles.logHeader}>
                                    <span>체류 인원 상세정보</span>
                                    <button
                                        onClick={() => {
                                            setStayDetail(null);
                                            setSelectedStayBeaconId(null);
                                        }}
                                    >
                                        <TbX color="var(--white)" />
                                    </button>
                                </header>
                                <div className={styles.searchResultDes}>
                                    <img src={stayDetail.profileImageUrl} alt="userImg" />
                                    <div className={styles.userDes}>
                                        <div className={styles.userLocation}>{stayDetail.location}</div>
                                        <div className={styles.userName}>{stayDetail.maskedUserName}</div>
                                        <div className={styles.userTeam}>{stayDetail.departmentName}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 위치신호 이탈 인원 상세정보 팝업 */}
                        {leaveDetail && (
                            <div className={`${styles.searchResult} ${styles.leaveDetail}`}>
                                <header className={styles.logHeader}>
                                    <span>위치신호 이탈 인원 상세정보</span>
                                    <button
                                        onClick={() => {
                                            setLeaveDetail(null);
                                            setSelectedLeaveBeaconId(null);
                                        }}
                                    >
                                        <TbX />
                                    </button>
                                </header>
                                <div className={styles.searchResultDes}>
                                    <img src={leaveDetail.profileImageUrl} alt="userImg" />
                                    <div className={styles.userDes}>
                                        <div className={styles.leaveTime}>{leaveDetail.elapsedTime}</div>
                                        <div className={styles.userName}>{leaveDetail.maskedUserName}</div>
                                        <div className={styles.userTeam}>{leaveDetail.departmentName}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FloorDetailModal;