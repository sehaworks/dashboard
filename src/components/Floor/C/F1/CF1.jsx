import react from "react";
import styles from "../../Floor.module.css";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import gate from "../../../../assets/imgs/gateImg.png";
import gaf1 from "../../../../assets/imgs/dashboard-svg/floor/ga-F1.png";
import gaFIf1 from "../../../../assets/imgs/dashboard-svg/floor/fi_ga-F1.png";
import gaFIf2 from "../../../../assets/imgs/dashboard-svg/floor/fi_ga-F2.png";
import gaFIf3 from "../../../../assets/imgs/dashboard-svg/floor/fi_ga-F3.png";

const CF1 = ({ currentFloor = 1, onFloorChange }) => {
  return (
    <div className={styles.floorMap}>
      <img src={gaf1} alt="C-F1" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="812"
        height="776"
        viewBox="0 0 812 776"
        className={styles.floorSvg}
      >
        <defs>
          {/* ✅ pattern: xlink/use 제거하고 image를 직접 넣기 */}
          <pattern
            id="gatePattern"
            patternUnits="userSpaceOnUse"
            x={693.236 - 20.199}
            y={517 - 20.199}
            width={20.199 * 2}
            height={20.199 * 2}
          >
            <image
              href={gate}
              x="0"
              y="0"
              width={20.199 * 2}
              height={20.199 * 2}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>

          <radialGradient
            id="floor4_paint0"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(541.2 401.8) rotate(60.0184) scale(36.02)"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="0.600962" stopColor="#00B2D2" />
            <stop offset="1" stopColor="#0091FF" />
          </radialGradient>

          <linearGradient
            id="floor4_paint1"
            x1="533.686"
            y1="390.147"
            x2="553.035"
            y2="422.445"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="0.600962" stopColor="#00B2D2" />
            <stop offset="1" stopColor="#0091FF" />
          </linearGradient>

          <radialGradient
            id="floor4_paint2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(688.391 509.728) rotate(60.0184) scale(36.3784)"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="0.600962" stopColor="#00728B" />
            <stop offset="1" stopColor="#003E4C" />
          </radialGradient>

          <clipPath id="floor4_clip0">
            <rect width="812" height="776" fill="#FFFFFF" />
          </clipPath>

          <clipPath id="floor4_clip1">
            <rect
              width="25.9354"
              height="25.9354"
              fill="#FFFFFF"
              transform="translate(532.973 396.97)"
            />
          </clipPath>
        </defs>

        {/* 1) 상단 원 (486,332) */}
        <g>
          <circle
            cx="546"
            cy="409"
            r="21.995"
            stroke="url(#floor4_paint0)"
            strokeWidth="4.00997"
          />
          <circle cx="546.002" cy="409" r="20" fill="#FFFFFF" />

          <g clipPath="url(#floor4_clip1)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M536.14 398.092C536.379 397.811 536.719 397.636 537.086 397.605C537.454 397.575 537.818 397.692 538.099 397.93C538.381 398.168 538.556 398.509 538.586 398.876C538.617 399.243 538.5 399.608 538.261 399.889C536.752 401.668 535.891 403.906 535.82 406.238C535.892 408.566 536.752 410.8 538.26 412.575C538.49 412.857 538.601 413.218 538.569 413.581C538.536 413.943 538.362 414.279 538.084 414.515C537.807 414.75 537.448 414.868 537.085 414.842C536.721 414.815 536.383 414.647 536.142 414.374C534.2 412.087 533.105 409.2 533.041 406.201C533.121 403.224 534.214 400.363 536.14 398.092ZM555.74 398.092C555.502 397.811 555.161 397.636 554.794 397.605C554.427 397.575 554.062 397.692 553.781 397.93C553.5 398.168 553.325 398.509 553.294 398.876C553.264 399.243 553.381 399.608 553.619 399.889C555.128 401.668 555.989 403.906 556.061 406.238C555.989 408.566 555.128 410.8 553.621 412.575C553.39 412.857 553.279 413.218 553.312 413.581C553.344 413.943 553.518 414.279 553.796 414.515C554.073 414.75 554.433 414.868 554.796 414.842C555.159 414.815 555.497 414.647 555.738 414.374C557.68 412.087 558.775 409.2 558.839 406.201C558.759 403.224 557.665 400.363 555.738 398.092M552.706 401.994C552.614 401.836 552.491 401.698 552.346 401.588C552.201 401.478 552.035 401.397 551.858 401.351C551.682 401.304 551.498 401.293 551.317 401.318C551.137 401.343 550.962 401.403 550.805 401.495C550.647 401.587 550.51 401.709 550.399 401.855C550.289 402 550.208 402.166 550.162 402.342C550.069 402.699 550.121 403.078 550.307 403.396C550.825 404.281 551.116 405.26 551.164 406.258C551.115 407.27 550.822 408.255 550.31 409.129C550.212 409.287 550.147 409.463 550.118 409.647C550.089 409.83 550.097 410.018 550.142 410.198C550.187 410.379 550.268 410.548 550.379 410.697C550.491 410.845 550.631 410.97 550.792 411.063C550.953 411.157 551.13 411.217 551.315 411.241C551.499 411.264 551.686 411.251 551.865 411.2C552.044 411.15 552.211 411.065 552.356 410.949C552.502 410.833 552.622 410.69 552.711 410.526C553.478 409.211 553.902 407.723 553.943 406.201C553.88 404.719 553.455 403.275 552.706 401.995M541.072 401.495C540.914 401.403 540.74 401.343 540.559 401.318C540.378 401.293 540.193 401.304 540.017 401.351C539.84 401.397 539.674 401.478 539.529 401.589C539.383 401.699 539.261 401.837 539.169 401.995C538.403 403.307 537.978 404.791 537.934 406.31C537.989 407.792 538.411 409.237 539.165 410.528C539.353 410.842 539.657 411.068 540.011 411.159C540.365 411.25 540.741 411.198 541.056 411.014C541.372 410.83 541.603 410.529 541.698 410.176C541.794 409.824 541.746 409.448 541.566 409.129C541.056 408.255 540.763 407.27 540.714 406.258C540.766 405.25 541.06 404.269 541.57 403.398C541.662 403.24 541.722 403.066 541.747 402.885C541.771 402.704 541.76 402.52 541.714 402.344C541.667 402.167 541.587 402.002 541.476 401.856C541.366 401.711 541.228 401.589 541.07 401.497M547.33 409.181C548.465 408.757 549.084 407.751 549.084 406.264C549.084 404.25 547.952 403.118 545.94 403.118C543.928 403.118 542.795 404.25 542.795 406.264C542.795 407.751 543.413 408.759 544.551 409.181V421.056C544.551 421.425 544.697 421.778 544.958 422.038C545.218 422.299 545.572 422.445 545.94 422.445C546.309 422.445 546.662 422.299 546.923 422.038C547.183 421.778 547.33 421.425 547.33 421.056V409.181Z"
              fill="url(#floor4_paint1)"
            />
          </g>

          <path
            d="M543.268 445C543.268 446.476 544.465 447.673 545.941 447.673C547.418 447.673 548.615 446.476 548.615 445C548.615 443.524 547.418 442.327 545.941 442.327C544.465 442.327 543.268 443.524 543.268 445ZM545.941 433L545.44 433V445H546.443V433H545.941Z"
            fill="#009DEE"
          />
        </g>

        <g className={`${styles.pinGroup}`}>
          {/* ✅ 라벨(주차장) - 핀 위 */}
          <g
            transform="translate(0, 6)"
            className={`${styles.pinLabel} ${styles.gatePin}`}
          >
            {/* 캡슐 배경 */}
            <rect
              x={693.236 - 68} // 중심 기준 좌우로 반(=60) 만큼
              y={517 - 80} // 원 중심보다 위쪽에 배치
              width={136}
              height={40}
              rx={20}
              fill="#00728b99"
            />
            {/* 텍스트 */}
            <text
              x={693.236}
              y={517 - 80 + 26} // rect y + 세로 중앙 보정
              textAnchor="middle"
              fontSize="18"
              fontWeight="600"
              fill="#fff"
            >
              스피드게이트
            </text>
          </g>
          {/* 2) 하단 원 (693,517) - 외곽 스트로크 */}
          <g className={styles.gatePin}>
            <path
              d="M693.238 494.766C705.517 494.766 715.472 504.721 715.472 517C715.471 529.279 705.517 539.233 693.238 539.233C680.959 539.233 671.004 529.279 671.004 517C671.004 504.721 680.959 494.766 693.238 494.766Z"
              stroke="url(#floor4_paint2)"
              strokeWidth="4.00997"
            />

            {/* 배경 흰 원 */}
            <circle cx="693.236" cy="517" r="20.199" fill="white" />

            {/* 이미지 채움 원 */}
            <circle cx="693.236" cy="517" r="20.199" fill="url(#gatePattern)" />
          </g>
        </g>
      </svg>
      <div className={styles.floorInfo}>
        <div className={styles.floorText}>
          <span
            className={currentFloor === 3 ? styles.active : ""}
            onClick={() => onFloorChange?.(3)}
          >
            3F
          </span>
          <span className={styles.dashGap}></span>
          <span
            className={currentFloor === 2 ? styles.active : ""}
            onClick={() => onFloorChange?.(2)}
          >
            2F
          </span>
          <span className={styles.dashGap}></span>
          <span
            className={currentFloor === 1 ? styles.active : ""}
            onClick={() => onFloorChange?.(1)}
          >
            1F
          </span>
        </div>
        <div className={styles.floorImg}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="232"
            height="172"
            viewBox="0 0 232 172"
            fill="none"
          >
            <defs>
              {/* rect1 pattern */}
              <pattern
                id="pattern0"
                patternUnits="userSpaceOnUse"
                x="48.4531"
                y="42.3486"
                width="182.939"
                height="129.652"
              >
                <image
                  href={gaFIf1}
                  x="0"
                  y="0"
                  width="182.939"
                  height="129.652"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>

              {/* rect2 pattern */}
              <pattern
                id="pattern1"
                patternUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="231.401"
                height="129.652"
              >
                <image
                  href={gaFIf2}
                  x="0"
                  y="0"
                  width="231.401"
                  height="129.652"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>

              {/* rect3 pattern */}
              <pattern
                id="pattern2"
                patternUnits="userSpaceOnUse"
                x="170.555"
                y="12.1602"
                width="60.8399"
                height="54.5463"
              >
                <image
                  href={gaFIf3}
                  x="0"
                  y="0"
                  width="60.8399"
                  height="54.5463"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>

            {/* floor Path */}
            <g
              className={`${styles.floorItem} ${currentFloor === 1 ? styles.active : ""}`}
              onClick={() => onFloorChange?.(1)}
            >
              <path
                className={`${styles.floor}`}
                fill="url(#pattern0)"
                d="M48.4688 108.075V119.412L49.6592 120.877L49.8315 120.748L54.0943 126.001V126.259L55.2569 127.594L55.6013 127.443L55.7736 127.206L64.0408 123.417H64.2561L64.6867 123.223L104.217 171.768L171.114 141.034L181.298 153.566L204.076 143.067L204.541 143.531L204.619 143.454L209.705 149.728V149.921L210.028 150.218L211.861 149.431V149.211L218.818 145.992L219.091 146.044L220.926 145.181V136.002L221.118 135.869V135.204L231.06 130.752V114.974L172.099 42.3975L55.3962 96.0802V104.761L48.4688 108.075Z"
              />
              <path
                className={`${styles.floorItemOverlay}`}
                fill="rgba(255, 255, 255, 0)"
                d="M48.4688 108.075V119.412L49.6592 120.877L49.8315 120.748L54.0943 126.001V126.259L55.2569 127.594L55.6013 127.443L55.7736 127.206L64.0408 123.417H64.2561L64.6867 123.223L104.217 171.768L171.114 141.034L181.298 153.566L204.076 143.067L204.541 143.531L204.619 143.454L209.705 149.728V149.921L210.028 150.218L211.861 149.431V149.211L218.818 145.992L219.091 146.044L220.926 145.181V136.002L221.118 135.869V135.204L231.06 130.752V114.974L172.099 42.3975L55.3962 96.0802V104.761L48.4688 108.075Z"
              />
            </g>
            <g
              className={`${styles.floorItem} ${currentFloor === 2 ? styles.active : ""}`}
              onClick={() => onFloorChange?.(2)}
            >
              <path
                className={`${styles.floor}`}
                fill="url(#pattern1)"
                d="M0 36.0749V51.7351L12.3486 67.001L42.7945 52.9789L55.3834 68.5117V69.4026L104.151 129.403L171.163 98.609L181.312 111.159L231.048 88.2279V72.6951L171.997 0L74.7399 44.672L49.2829 13.2834L0 36.0749Z"
              />
              <path
                className={`${styles.floorItemOverlay}`}
                fill="rgba(255, 255, 255, 0)"
                d="M0 36.0749V51.7351L12.3486 67.001L42.7945 52.9789L55.3834 68.5117V69.4026L104.151 129.403L171.163 98.609L181.312 111.159L231.048 88.2279V72.6951L171.997 0L74.7399 44.672L49.2829 13.2834L0 36.0749Z"
              />
            </g>
            <g
              className={`${styles.floorItem} ${currentFloor === 3 ? styles.active : ""}`}
              onClick={() => onFloorChange?.(3)}
            >
              <path
                className={`${styles.floor}`}
                fill="url(#pattern2)"
                d="M170.602 53.2529V35.2403L220.256 12.2383L230.966 25.5648V43.6989L181.31 66.5187L170.602 53.2529Z"
              />
              <path
                className={`${styles.floorItemOverlay}`}
                fill="rgba(255, 255, 255, 0)"
                d="M170.602 53.2529V35.2403L220.256 12.2383L230.966 25.5648V43.6989L181.31 66.5187L170.602 53.2529Z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CF1;
