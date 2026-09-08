import {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./Dashboard.module.css";
import toggleStyles from "../../components/ToggleList/ToggleList.module.css";
import { FaChartLine } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
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
import { HiOutlineCube, HiCube } from "react-icons/hi";
import {
  BsFillExclamationTriangleFill,
  BsFillExclamationCircleFill,
} from "react-icons/bs";

// 이미지들
import dashboardBg from "../../assets/imgs/dashboardMain.png";
import logoWtitle from "../../assets/imgs/mize_blue.png";
import mizecore from "../../assets/imgs/mizecore.png";
import compass from "../../assets/imgs/compass.png";
import minilogo from "../../assets/imgs/mize_mark.png";
import logoW from "../../assets/imgs/mize_blue.png";
import cloudy from "../../assets/imgs/cloudy-day.png"

// 컴포넌츠
// import DashboardSidebar from "./parts/DashboardSidebar/DashboardSidebar.jsx";
import DonutChart from "../../components/DountChart.jsx";
import VisitBars from "../../components/VisitBarChart.jsx";
import CardSlider from "../../components/CardSlider/CardSlider.jsx";
import ChangeVisitors from "./parts/widget/ChangeVisitors.jsx";

// 모달
import VisitorLogModal from "./parts/modal/VisitorLogModal.jsx";
import FloorDetailModal from "./parts/modal/FloorDetailModal.jsx";


export default function Dashboard() {
  // 모달 오픈
  const [openFloorDetailModal, setOpenFloorDetailModal] = useState(false); // 건물 모달
  const [activeBuildingZone, setActiveBuildingZone] = useState(null); // 건물 zone
  const handleOpenFloorModal = (zoneId) => {
    setActiveBuildingZone(zoneId);
    setOpenFloorDetailModal(true);
  };
  /* ---- 현재 날짜 시간 ----*/
  // 현재 날짜 yyyy-mm-dd
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 현재 시간 hh:mm AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));
  // 매 초마다 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(formatDate(now));
      setCurrentTime(formatTime(now));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /*---- 건물 누끼따기 ----*/
  // path 안에 자동으로 버튼 만들기
  const wrapRef = useRef(null);
  const svgRef = useRef(null);

  // zoneId -> path element 저장
  const pathRefs = useRef(new Map());

  // 계산된 버튼 위치들 [{ id, label, x, y }]
  const [btns, setBtns] = useState([]);
  const [activeZone, setActiveZone] = useState(null);

  // path ref 등록 콜백
  const registerPath = useCallback(
    (id) => (el) => {
      if (!id) return;
      if (el) pathRefs.current.set(id, el);
      else pathRefs.current.delete(id);
    },
    [],
  );

  const recomputeButtons = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const next = [];
    for (const [id, pathEl] of pathRefs.current.entries()) {
      if (!pathEl) continue;

      const label = pathEl.getAttribute("data-zone") || id;

      // SVG 내부 바운딩 박스 기준 중심점 계산
      const bb = pathEl.getBBox();

      // 1920 x 1080 viewBox 기준 퍼센트(%) 좌표로 변환
      const xPercent = ((bb.x + bb.width / 2) / 1920) * 100;
      const yPercent = ((bb.y + bb.height / 2) / 1080) * 100;

      next.push({ id, label, x: xPercent, y: yPercent });
    }

    setBtns(next);
  }, []);

  // 1. 마운트 시 및 path 등록 완료 후 버튼 위치 계산
  useEffect(() => {
    // pathRefs 등록 완료를 보장하기 위해 한 프레임 지연 후 실행
    const timer = setTimeout(() => {
      recomputeButtons();
    }, 50);

    return () => clearTimeout(timer);
  }, [recomputeButtons]);

  // 호버 정보 박스
  const activeBtn = btns.find((b) => b.id === activeZone);

  // 메뉴오픈
  const [openMenu, setOpenMenu] = useState(null);
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

  // 더미 데이터 배열
  const sliderItems = [
    {
      id: 101,
      time: "26-01-16 01:00 PM",
      rows: [
        { label: "방 문 자:", value: "김○○ / ◇◇사" },
        { label: "방문목적:", value: "○○○○○○" },
        { label: "담 당 자:", value: "박○○ / 대리 / ○○팀" },
      ],
    },
    {
      id: 102,
      time: "26-01-16 01:00 PM",
      rows: [
        { label: "방 문 자:", value: "김○○ / ◇◇사" },
        { label: "방문목적:", value: "○○○○○○" },
        { label: "담 당 자:", value: "박○○ / 대리 / ○○팀" },
      ],
    },
    {
      id: 103,
      time: "26-01-16 01:00 PM",
      rows: [
        { label: "방 문 자:", value: "김○○ / ◇◇사" },
        { label: "방문목적:", value: "○○○○○○" },
        { label: "담 당 자:", value: "박○○ / 대리 / ○○팀" },
      ],
    },
  ];

  // 카드 클릭 시 실행할 함수 (선택 사항)
  const handleItemClick = (id) => {
    console.log("선택한 카드 ID:", id);
  };

  // 1. 더미 데이터 정의
  const DUMMY_USERS = [
    { beaconId: 1, userName: "김OO", departmentName: "개발팀" },
    { beaconId: 2, userName: "김OO", departmentName: "전략기획팀" },
    { beaconId: 3, userName: "김OO", departmentName: "디자인팀" },
    { beaconId: 4, userName: "김OO", departmentName: "영업팀" },
    { beaconId: 5, userName: "이OO", departmentName: "인사팀" },
    { beaconId: 6, userName: "박OO", departmentName: "마케팅팀" },
  ];

  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 2. 검색어 입력 시 필터링
  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // 이름에 입력한 키워드가 포함된 항목 필터링
    const filtered = DUMMY_USERS.filter((user) =>
      user.userName.includes(value)
    );

    setSuggestions(filtered);
    setShowDropdown(true);
  };

  // 3. 드롭다운 항목 클릭 시 선택 처리
  const handleSelect = (user) => {
    setKeyword(`${user.userName} (${user.departmentName})`);
    setShowDropdown(false);
    console.log("선택된 사용자:", user);
  };

  // 1. 모달 열림/닫힘 상태 관리 (기본값 false)
  const [openVisitorLogModal, setOpenVisitorLogModal] = useState(false);

  // 2. 모달 열기 핸들러 함수
  const handleOpenModal = () => {
    setOpenVisitorLogModal(true);
  };

  return (
    <div
      className={styles.dashboardContainer}
    >
      <div className={styles.dashboardBox}>
        <img
          ref={wrapRef}
          src={dashboardBg}
          alt="MapImg"
          className={styles.dashboardBg}
        />
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1080"
          className={styles.zoneSvg}
          preserveAspectRatio="xMidYMid slice"
        >
          {/* 주차장 */}
          <g id="parkingPin" className={styles.pinGroup}>
            <g className={styles.pin}>
              <circle
                cx="1263.5"
                cy="708.596"
                r="22.4176"
                fill="#FFFFFF"
                stroke="url(#floor5_paint0)"
                strokeWidth="6.35593"
              />

              <path
                d="M1265.5 700H1257V718H1261V713H1265.5C1269.08 713 1272 710.084 1272 706.5C1272 702.916 1269.08 700 1265.5 700ZM1265.5 709H1261V704H1265.5C1266.88 704 1268 705.121 1268 706.5C1268 707.879 1266.88 709 1265.5 709Z"
                fill="url(#floor5_paint1)"
              />

              <path
                d="M1264 742L1259.04 733.54L1268.96 733.54L1264 742Z"
                fill="#004C8E"
              />
            </g>

            <g className={styles.pinLabel}>
              <rect
                x="1204"
                y="631"
                width="120"
                height="44"
                rx="22"
                fill="#005BAA"
                fillOpacity="0.5"
              />

              <path
                d="M1229.76 646.396V650.527H1231.61V644.955H1233.47V659.791H1231.61V652.109H1229.76V656.469H1223.52V646.396H1229.76ZM1225.35 647.943V654.922H1227.93V647.943H1225.35ZM1236.74 644.674V660.564H1234.86V644.674H1236.74ZM1251.82 644.691V656.17H1249.85V644.691H1251.82ZM1252.26 658.666V660.248H1241.31V655.01H1243.28V658.666H1252.26ZM1243.15 645.729C1245.56 645.729 1247.43 647.398 1247.43 649.701C1247.43 652.057 1245.56 653.691 1243.15 653.691C1240.73 653.691 1238.87 652.057 1238.87 649.701C1238.87 647.398 1240.73 645.729 1243.15 645.729ZM1243.15 647.434C1241.8 647.434 1240.76 648.33 1240.78 649.701C1240.76 651.107 1241.8 651.986 1243.15 651.986C1244.47 651.986 1245.51 651.107 1245.51 649.701C1245.51 648.33 1244.47 647.434 1243.15 647.434ZM1272.9 653.533V655.115H1266.59V660.547H1264.65V655.115H1258.41V653.533H1272.9ZM1271.56 645.57V647.117H1266.8C1266.91 648.857 1269 650.527 1272.14 650.932L1271.44 652.461C1268.73 652.083 1266.62 650.844 1265.65 649.121C1264.69 650.844 1262.58 652.083 1259.91 652.461L1259.17 650.932C1262.29 650.527 1264.38 648.857 1264.53 647.117H1259.75V645.57H1271.56ZM1279.56 649.719C1279.56 652.074 1280.89 654.641 1283.34 655.801L1282.25 657.277C1280.53 656.478 1279.29 654.904 1278.63 653.041C1277.92 655.045 1276.61 656.741 1274.79 657.559L1273.72 656.047C1276.22 654.922 1277.62 652.215 1277.62 649.719V648.893H1274.23V647.328H1277.62V645.008H1279.58V647.328H1282.92V648.893H1279.56V649.719ZM1286.41 644.674V650.967H1288.86V652.602H1286.41V660.564H1284.46V644.674H1286.41ZM1295.22 647.539C1295.22 649.49 1296.49 651.318 1298.96 652.074L1298.03 653.604C1296.25 653.05 1294.98 651.916 1294.29 650.475C1293.59 652.145 1292.24 653.472 1290.33 654.113L1289.35 652.566C1291.92 651.723 1293.25 649.666 1293.25 647.557V647.363H1289.89V645.781H1298.53V647.363H1295.22V647.539ZM1302.06 644.674V648.488H1304.27V650.088H1302.06V654.148H1300.11V644.674H1302.06ZM1296.89 654.5C1300.18 654.5 1302.2 655.607 1302.22 657.506C1302.2 659.422 1300.18 660.547 1296.89 660.547C1293.57 660.547 1291.51 659.422 1291.51 657.506C1291.51 655.607 1293.57 654.5 1296.89 654.5ZM1296.89 656.029C1294.71 656.029 1293.46 656.539 1293.46 657.506C1293.46 658.49 1294.71 659.018 1296.89 659.018C1299.07 659.018 1300.28 658.49 1300.28 657.506C1300.28 656.539 1299.07 656.029 1296.89 656.029Z"
                fill="#FFFFFF"
              />
            </g>
          </g>
          {/* A동 */}
          <g opacity="0.01" className={`${styles.zone} ${activeZone === "A" ? styles.zoneActive : ""}`} filter="url(#floor5_filter0)"
            ref={registerPath("A")}
            data-zone="A동"
            onMouseEnter={() => setActiveZone("A")}
            onMouseLeave={() => setActiveZone(null)}
          >
            <path
              d="M724.5 362.5L728.5 431.5L831 470L940 372V304L839 266L724.5 362.5Z"
            />
          </g>
          {/* B동 */}
          <g opacity="0.01" className={`${styles.zone} ${activeZone === "B" ? styles.zoneActive : ""}`} filter="url(#floor5_filter1)"
            ref={registerPath("B")}
            data-zone="B동"
            onMouseEnter={() => setActiveZone("B")}
            onMouseLeave={() => setActiveZone(null)}
          >
            <path
              d="M882 373V413.5L870.5 426V443L940 466.5L950 455.5L971.5 464V473L983.5 478.5L989.5 471.5L1008 478.5L1069 416V362.5L939 318L882 373Z"
            />
          </g>
          {/* C동 */}
          <g opacity="0.01" className={`${styles.zone} ${activeZone === "C" ? styles.zoneActive : ""}`} filter="url(#floor5_filter2)"
            ref={registerPath("C")}
            data-zone="C동"
            onMouseEnter={() => setActiveZone("C")}
            onMouseLeave={() => setActiveZone(null)}
            onClick={() => handleOpenFloorModal("C")}
          >
            <path
              d="M1124.5 462L1232.5 502L1253.5 480.5L1269 487L1282 473L1298.5 478.5L1329.5 447L1324 434.5L1308 429L1311 341L1202.5 302.5L1124.5 376V462Z"
            />
          </g>

          <defs>
            <filter
              id="floor5_filter0"
              x="702.959"
              y="244.286"
              width="258.541"
              height="247.438"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_floor5"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_floor5"
                result="shape"
              />
            </filter>

            <filter
              id="floor5_filter1"
              x="849"
              y="296.284"
              width="241.5"
              height="204.051"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0.6 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_floor5"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_floor5"
                result="shape"
              />
            </filter>

            <filter
              id="floor5_filter2"
              x="1103"
              y="280.78"
              width="248.282"
              height="242.965"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0.6 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_floor5"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_floor5"
                result="shape"
              />
            </filter>

            <linearGradient
              id="floor5_paint0"
              x1="1239.18"
              y1="667.643"
              x2="1277.58"
              y2="734.191"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFFFFF" />
              <stop offset="0.600962" stopColor="#005BAA" />
              <stop offset="1" stopColor="#004179" />
            </linearGradient>

            <radialGradient
              id="floor5_paint1"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(11.625 27.5 -23.1452 14.4254 1257 690.5)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFFFFF" />
              <stop offset="0.600962" stopColor="#005BAA" />
              <stop offset="1" stopColor="#004179" />
            </radialGradient>
          </defs>
        </svg>

        {btns.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`${styles.zoneBtn} ${activeZone === b.id ? styles.visible : ""}`}
            style={{
              position: "absolute",
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 100,
            }}
            onClick={() => {
              // C동(또는 b.id가 "C"인 경우)일 때만 모달 열기
              if (b.id !== "C") return;
              handleOpenFloorModal(b.id);
            }}
            onMouseEnter={() => setActiveZone(b.id)}
          >
            {b.label}
          </button>
        ))}
      </div >

      <div className={styles.dashboardLayout}>
        {/* 사이드바 */}
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

            {/* 2. 회사관리 - 마이즈 관리자만 표시 */}
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

            {/* 3. 사용자관리 */}
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

            {/* 4. 방문관리 */}
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

            {/* 5. 주차관리 */}
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

            {/* 6. 스마트사원증관리 - 마이즈 관리자만 표시 */}


            {/* 7. 근태관리 */}


            {/* 8. 식수관리 */}


            {/* 9. 카페관리 */}


            {/* 10. 전자명패관리 */}


            {/* 11. 구역관리 - 마이즈 관리자만 표시 */}


            {/* 12. 장치관리 */}

          </nav>
        </aside>

        {/* 대시보드 컨텐츠 */}
        <div className={styles.dashboardContent}>
          <div className={`${styles.dashboardLeft}`}>
            <div className={styles.todayBox}>
              <div className={styles.timeBox}>
                <span className={styles.today}>{currentDate}</span>
                <span className={styles.nowTime}>{currentTime}</span>
              </div>
              <div className={styles.weatherBox}>
                <span className={styles.weatherImgBox}>
                  <img src={cloudy} alt="weatherImg" />
                </span>
                <span className={styles.weatherData}>
                  <div className={styles.text}>구름많음</div>
                  <div className={styles.temperature}>23°</div>
                </span>
              </div>
            </div>

            {/* 전체 출입현황 */}
            <div className={`${styles.blurBox} ${styles.entryBox}`}>
              <div className={styles.blurBoxHeader}>
                <div className={styles.blurBoxTitle}>
                  <div className="iconBox">
                    <HiOutlineCube size={24} />
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
                      임직원 <b>53</b> 방문자 <b>26</b>
                    </div>
                    <div className={styles.entryTotal}>
                      79 <span>명</span>
                    </div>
                  </div>
                </div>
                <div className={styles.entryContentBox}>
                  <div className={styles.entryTitle}>현재 체류 인원</div>
                  <div className={styles.entryContent}>
                    <div className={styles.entryDes}>
                      <span className={`${styles.dot} ${styles.green}`}></span>
                      임직원 <b>21</b> 방문자 <b>8</b>
                    </div>
                    <div className={styles.entryTotal}>
                      29 <span>명</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 이벤트 발생현황 */}
            <div className={styles.eventStatusWrapper}>
              <div className={`${styles.blurBox} ${styles.eventBox}`}>
                <div className={styles.blurBoxHeader}>
                  <div
                    className={styles.blurBoxTitle}
                  >
                    <div className="iconBox">
                      <HiOutlineCube size={24} />
                    </div>
                    <span className={styles.titleText}>이벤트 발생현황</span>
                  </div>
                  <div className="iconBox" >
                    <TbChevronRight />
                  </div>
                </div>
                <div className={styles.blurBoxContentFlex}>
                  <div className={`${styles.chartBox} ${styles.forGlow}`}>
                    <DonutChart title="전체" total={0} />
                    <div className={styles.donutGlow} />
                  </div>
                  <div className={styles.legendBox}>
                    <div className={styles.chartLegend}>
                      <span className={`${styles.dot} ${styles.red}`}></span>
                      <span className={styles.legendTitle}>
                        보안구역 접근 <b>0</b>
                      </span>
                    </div>
                    <div className={styles.chartLegend}>
                      <span className={`${styles.dot} ${styles.yellow}`}></span>
                      <span className={styles.legendTitle}>
                        비상발생 <b>0</b>
                      </span>
                    </div>
                    <div className={styles.chartLegend}>
                      <span className={`${styles.dot} ${styles.green}`}></span>
                      <span className={styles.legendTitle}>
                        비상해제 <b>0</b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 방문자 현황 */}
            <div className={styles.visitorStatusWrapper}>
              <div className={`${styles.blurBox} ${styles.visitorBox}`}>
                <div className={styles.blurBoxHeader}

                  onClick={handleOpenModal} // 또는 onClick={() => setOpenVisitorLogModal(true)}
                  style={{ cursor: "pointer" }} // 클릭 가능하게 커서 style 추가 (선택사항)
                >
                  <div className={styles.blurBoxTitle}>
                    <div className="iconBox"
                    >
                      <HiOutlineCube size={24} />
                    </div>
                    <span className={styles.titleText}>방문자 현황</span>
                  </div>

                  {/* 3. onClick에 모달 열기 함수 연결 */}
                  <div
                    className="iconBox"
                  >
                    <TbChevronRight />
                  </div>
                </div>

                <div className={styles.blurBoxContent}>
                  <div className={styles.chartBox}>
                    <VisitBars planned={24} completed={49} />
                  </div>
                </div>

                <div className={`${styles.boxInBox} ${styles.visitReservation}`}>
                  <div className={styles.blurBoxHeader}>
                    <div className={styles.blurBoxTitle}>
                      <div className="iconBox">
                        <HiCube />
                      </div>
                      <span className={styles.titleText}>7일 이내 방문 예정</span>
                    </div>
                    <div className={styles.viewMore}>
                      자세히 보기
                      <div className="iconBox">
                        <TbChevronRight />
                      </div>
                    </div>
                  </div>
                  <div className={styles.blurBoxContent}>
                    <CardSlider items={sliderItems} autoMs={5000} />
                  </div>
                </div>
              </div>

              {/* 4. open 상태와 onClose 전달 */}
              <VisitorLogModal
                open={openVisitorLogModal}
                onClose={() => setOpenVisitorLogModal(false)}
              />
            </div>
          </div>

          <div className={styles.dashboardMiddle}>
            <header>
              <img src={logoWtitle} alt="MutronicsLogo" />
              실시간 현황 대시보드
            </header>
            <div className={styles.centerBox}>
              <img src={compass} alt="compassImg" />
            </div>
            <footer>
              <img src={mizecore} alt="MizeCore" />
            </footer>
          </div>

          <div className={`${styles.dashboardRight} ${styles.noScroll}`}>
            {/* 검색창 */}
            <div className={styles.searchInputBox}>
              <div className="iconInputBox">
                <input
                  type="search"
                  placeholder="임직원 이름으로 위치 찾기" value={keyword}
                  onChange={handleChange}
                  onFocus={() => keyword && setShowDropdown(true)}
                />
                <span className="iconBox" style={{ cursor: "pointer" }}>
                  <TbSearch />
                </span>
              </div>

              {/* 자동완성 드롭다운 */}
              {showDropdown && suggestions.length > 0 && (
                <div className={styles.searchDropdown}>
                  <ul className={styles.searchDropdownList}>
                    {suggestions.map((user) => (
                      <li key={user.beaconId} onClick={() => handleSelect(user)}>
                        <span className={styles.liName}>{user.userName}</span>
                        <span className={styles.liTeam}>{user.departmentName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 실시간 위치현황 */}
            <div className={styles.locationStatusWrapper}>
              <div className={`${styles.blurBox} ${styles.liveLocationBox}`}>
                <div className={styles.blurBoxHeader}>
                  <div className={styles.blurBoxTitle}>
                    <div className="iconBox">
                      <HiOutlineCube size={24} />
                    </div>
                    <span className={styles.titleText}>실시간 위치현황</span>
                  </div>
                  <div className="iconBox" >
                    <TbChevronRight />
                  </div>
                </div>
                <div className={`${styles.blurBoxContent} ${styles.noPadding}`}>
                  <div className={styles.entryContentBox}>
                    <div className={styles.entryContent}>
                      <div className={styles.entryTitle}>사옥 내 체류 임직원</div>
                      <div className={styles.entryTotal}>
                        <b>29</b> <span>명</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.toggleListBox}>
                    <section className={toggleStyles.panel}>
                      <div className={toggleStyles.list}>
                        <div className={toggleStyles.item}>
                          <button
                            type="button"
                            className={toggleStyles.itemBtn}
                          >
                            <div className={toggleStyles.left}>
                              <span className={toggleStyles.cubeSmall}>
                                <HiCube />
                              </span>
                              <span className={toggleStyles.itemTitle}>A동</span>
                            </div>

                            <div className={toggleStyles.right}>
                              <div className={toggleStyles.counts}>
                                <span className={`${toggleStyles.pill} ${toggleStyles.warn}`}>
                                  <BsFillExclamationCircleFill />{" "}
                                  <b>0</b>
                                </span>
                                <span className={`${toggleStyles.pill} ${toggleStyles.people}`}>
                                  <TbUsers /> <b>7</b>
                                </span>
                              </div>
                              <span className={`${toggleStyles.down} ${toggleStyles.rot}`}>
                                <TbChevronDown />
                              </span>
                            </div>
                          </button>
                        </div>
                        <div className={toggleStyles.item}>
                          <button
                            type="button"
                            className={toggleStyles.itemBtn}
                          >
                            <div className={toggleStyles.left}>
                              <span className={toggleStyles.cubeSmall}>
                                <HiCube />
                              </span>
                              <span className={toggleStyles.itemTitle}>B동</span>
                            </div>

                            <div className={toggleStyles.right}>
                              <div className={toggleStyles.counts}>
                                <span className={`${toggleStyles.pill} ${toggleStyles.warn}`}>
                                  <BsFillExclamationCircleFill />{" "}
                                  <b>0</b>
                                </span>
                                <span className={`${toggleStyles.pill} ${toggleStyles.people}`}>
                                  <TbUsers /> <b>2</b>
                                </span>
                              </div>
                              <span className={`${toggleStyles.down} ${toggleStyles.rot}`}>
                                <TbChevronDown />
                              </span>
                            </div>
                          </button>
                        </div>
                        <div className={toggleStyles.item}>
                          <button
                            type="button"
                            className={toggleStyles.itemBtn}
                          >
                            <div className={toggleStyles.left}>
                              <span className={toggleStyles.cubeSmall}>
                                <HiCube />
                              </span>
                              <span className={toggleStyles.itemTitle}>C동</span>
                            </div>

                            <div className={toggleStyles.right}>
                              <div className={toggleStyles.counts}>
                                <span className={`${toggleStyles.pill} ${toggleStyles.danger}`}>
                                  <BsFillExclamationTriangleFill />{" "}
                                  <b>0</b>
                                </span>
                                <span className={`${toggleStyles.pill} ${toggleStyles.warn}`}>
                                  <BsFillExclamationCircleFill />{" "}
                                  <b>0</b>
                                </span>
                                <span className={`${toggleStyles.pill} ${toggleStyles.people}`}>
                                  <TbUsers /> <b>12</b>
                                </span>
                              </div>
                              <span className={`${toggleStyles.down} ${toggleStyles.rot}`}>
                                <TbChevronDown />
                              </span>
                            </div>
                          </button>
                        </div>
                        <div className={toggleStyles.item}>
                          <button
                            type="button"
                            className={toggleStyles.itemBtn}
                          >
                            <div className={toggleStyles.left}>
                              <span className={toggleStyles.cubeSmall}>
                                <HiCube />
                              </span>
                              <span className={toggleStyles.itemTitle}>주차장</span>
                            </div>

                            <div className={toggleStyles.right}>
                              <div className={toggleStyles.counts}>
                                <span className={`${toggleStyles.pill} ${toggleStyles.warn}`}>
                                  <BsFillExclamationCircleFill />{" "}
                                  <b>0</b>
                                </span>
                                <span className={`${toggleStyles.pill} ${toggleStyles.people}`}>
                                  <TbUsers /> <b>8</b>
                                </span>
                              </div>
                              <span className={`${toggleStyles.down} ${toggleStyles.rot}`}>
                                <TbChevronDown />
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </section>
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
            </div>

            {/* 출입인원 변화 */}
            <ChangeVisitors />
          </div>
        </div>
      </div>

      {/* 건물별 모달 */}
      <FloorDetailModal
        open={openFloorDetailModal}
        onClose={() => {
          setOpenFloorDetailModal(false);
          setActiveBuildingZone(null);
        }}
        buildingZone={activeBuildingZone}
      />
    </div >
  );
}
