import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import styles from '../../Dashboard.module.css';
import minilogo from "../../../../assets/imgs/mize_mark.png";
import logoW from "../../../../assets/imgs/mize_blue.png";

import {
    TbLayoutSidebar,
    TbSmartHome,
    TbChevronRight,
    TbChevronLeft,
    TbChevronDown,
    TbBuilding,
    TbUserCheck,
    TbDoorEnter,
    TbCar,
    TbIdBadge,
    TbBriefcase,
    TbToolsKitchen2,
    TbCup,
    TbId,
    TbStack2,
    TbChartCandle,
    TbTool,
    TbMessages,
    TbSearch,
    TbClock,
    TbUsers,
    TbX,
    TbMap2,
} from "react-icons/tb";


export default function DashboardSidebar() {
    const [openMenu, setOpenMenu] = useState(null);

    // 사이드바
    const navigate = useNavigate();
    const location = useLocation();
    const { setTalkModalOpen } = useTalkModal();
    const { checkPermission, scope } = usePermission();

    // 마이즈 관리자(GLOBAL scope) 여부 확인
    // const isMizeAdmin = scope === "GLOBAL";

    // 방문신청 목록 페이지에서만 알림톡 버튼 표시
    // const showTalkButton = location.pathname === "/visit/request";


    const toggleMenu = (index) => {
        // 1️. 사이드바가 닫혀 있으면 먼저 열기
        if (isClose) {
            setIsClose(false);
            setOpenMenu(index);
            return;
        }

        // 2️. 열려 있으면 기존 로직 유지
        setOpenMenu(openMenu === index ? null : index);
    };

    // 사이드바 열고닫기
    const [isClose, setIsClose] = useState(true);


    // 사이드바 상태에 따라 body에 클래스 추가
    useEffect(() => {
        if (isClose) {
            document.body.classList.add("sidebar-closed");
        } else {
            document.body.classList.remove("sidebar-closed");
        }
        return () => {
            document.body.classList.remove("sidebar-closed");
        };
    }, [isClose]);


    return (
        <>
            <aside
                className={`${styles.sidebar} ${styles.noScroll} ${isClose ? styles.close : ""
                    }`}
            >
                <div className={styles.sidebarHeader}>
                    <div className={styles.logoBox}>
                        <img src={isClose ? minilogo : logoW} alt="logo" />
                    </div>

                    <div
                        className={`${styles.iconBox} ${styles.sidebarToggleBtn}`}
                        onClick={() => setIsClose((prev) => !prev)}
                    >
                        <TbLayoutSidebar />
                    </div>
                </div>

                <nav className={styles.menu}>
                    {/* 1. 대시보드 - 마이즈 관리자만 표시 */}
                    <NavLink to="/dashboard">
                        <div className={styles.menuItem}>
                            <div
                                className={`${styles.menuTitle} ${styles.active}
                    }`}
                                onClick={() => toggleMenu(1)}
                            >
                                <div className={styles.menuTitleContent}>
                                    <div className={styles.iconBox}>
                                        <TbSmartHome />
                                    </div>
                                    <span>대시보드</span>
                                </div>
                                <div className={styles.iconBox}>
                                    <TbChevronRight />
                                </div>
                            </div>
                        </div>
                    </NavLink>

                    {/* 2. 회사관리 - 마이즈 관리자만 표시 */}
                    <NavLink to="/company/list" className={styles.submenuItem}>
                        <div className={styles.menuItem}>
                            <div
                                className={`${styles.menuTitle} ${openMenu === 2 ? styles.active : ""
                                    }`}
                                onClick={() => toggleMenu(2)}
                            >
                                <div className={styles.menuTitleContent}>
                                    <div className={styles.iconBox}>
                                        <TbBuilding />
                                    </div>
                                    <span>회사관리</span>
                                </div>
                                <div className={`${styles.iconBox} ${styles.toggleBtn}`}>
                                    <TbChevronDown />
                                </div>
                            </div>
                        </div>
                    </NavLink>

                    {/* 3. 사용자관리 */}
                    <NavLink to="/user/list" className={styles.submenuItem}>
                        <div className={styles.menuItem}>
                            <div
                                className={`${styles.menuTitle} ${openMenu === 3 ? styles.active : ""
                                    }`}
                                onClick={() => toggleMenu(3)}
                            >
                                <div className={styles.menuTitleContent}>
                                    <div className={styles.iconBox}>
                                        <TbUserCheck />
                                    </div>
                                    <span>사용자관리</span>
                                </div>
                                <div className={`${styles.iconBox} ${styles.toggleBtn}`}>
                                    <TbChevronDown />
                                </div>
                            </div>
                        </div>
                    </NavLink>

                    {/* 4. 방문관리 */}
                    <NavLink to="/visit/request" className={styles.submenuItem}>
                        <div className={styles.menuItem}>
                            <div
                                className={`${styles.menuTitle} ${openMenu === 4 ? styles.active : ""
                                    }`}
                                onClick={() => toggleMenu(4)}
                            >
                                <div className={styles.menuTitleContent}>
                                    <div className={styles.iconBox}>
                                        <TbDoorEnter />
                                    </div>
                                    <span>방문관리</span>
                                </div>
                                <div className={`${styles.iconBox} ${styles.toggleBtn}`}>
                                    <TbChevronDown />
                                </div>
                            </div>
                        </div>
                    </NavLink>

                    {/* 5. 주차관리 */}
                    <NavLink to="/parking/cctv" className={styles.submenuItem}>
                        <div className={styles.menuItem}>
                            <div
                                className={`${styles.menuTitle} ${openMenu === 5 ? styles.active : ""
                                    }`}
                                onClick={() => toggleMenu(5)}
                            >
                                <div className={styles.menuTitleContent}>
                                    <div className={styles.iconBox}>
                                        <TbCar />
                                    </div>
                                    <span>주차관리</span>
                                </div>
                                <div className={`${styles.iconBox} ${styles.toggleBtn}`}>
                                    <TbChevronDown />
                                </div>
                            </div>
                        </div>
                    </NavLink>

                    {/* 6. 스마트사원증관리 - 마이즈 관리자만 표시 */}


                    {/* 7. 근태관리 */}


                    {/* 8. 식수관리 */}


                    {/* 9. 카페관리 */}


                    {/* 10. 전자명패관리 */}


                    {/* 11. 구역관리 - 마이즈 관리자만 표시 */}


                    {/* 12. 장치관리 */}

                </nav>
            </aside>
        </>
    );
}