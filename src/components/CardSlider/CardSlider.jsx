import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./CardSlider.module.css";
import { TbChevronRight, TbChevronLeft, TbClock } from "react-icons/tb";

const MAX_VISIBLE_DOTS = 5;
const RESUME_DELAY = 1000;

const CardSlider = ({ items = [], autoMs = 0, onClickItem }) => {
  const n = items.length;

  const [idx, setIdx] = useState(0);
  const [animClass, setAnimClass] = useState("");
  const intervalRef = useRef(null);
  const resumeRef = useRef(null);

  // 현재 보고 있는 item의 id 추적 (polling 시 위치 유지용)
  const currentIdRef = useRef(null);

  // dots: 최대 5개만 표시 (현재 dot 포함), n 초과 시 슬라이딩 윈도우
  const visibleDotIndices = useMemo(() => {
    if (n <= MAX_VISIBLE_DOTS) {
      return Array.from({ length: n }, (_, i) => i);
    }
    const start = Math.max(0, Math.min(idx - 2, n - MAX_VISIBLE_DOTS));
    return Array.from({ length: MAX_VISIBLE_DOTS }, (_, i) => start + i);
  }, [n, idx]);

  // 현재 보고 있는 item의 id 업데이트
  useEffect(() => {
    if (items[idx]?.id !== undefined) {
      currentIdRef.current = items[idx].id;
    }
  }, [idx, items]);

  // items가 변경될 때 현재 보고 있던 item의 위치 유지
  useEffect(() => {
    if (currentIdRef.current === null || n === 0) return;

    const newIndex = items.findIndex((item) => item.id === currentIdRef.current);
    if (newIndex !== -1 && newIndex !== idx) {
      setIdx(newIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const next = useCallback(() => {
    if (n <= 1) return;
    setAnimClass(styles.slideNext);
    setIdx((v) => (v + 1) % n);
  }, [n]);

  const prev = useCallback(() => {
    if (n <= 1) return;
    setAnimClass(styles.slidePrev);
    setIdx((v) => (v - 1 + n) % n);
  }, [n]);

  const handleAnimEnd = () => setAnimClass("");

  const startAutoRoll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!autoMs || n <= 1) return;
    intervalRef.current = setInterval(() => next(), autoMs);
  }, [autoMs, n, next]);

  const pauseAndResume = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => startAutoRoll(), RESUME_DELAY);
  }, [startAutoRoll]);

  const handlePrev = useCallback(() => {
    prev();
    pauseAndResume();
  }, [prev, pauseAndResume]);

  const handleNext = useCallback(() => {
    next();
    pauseAndResume();
  }, [next, pauseAndResume]);

  const handleDotClick = useCallback((i) => {
    if (n <= 1) return;
    setAnimClass(i > idx ? styles.slideNext : styles.slidePrev);
    setIdx(i);
    pauseAndResume();
  }, [n, idx, pauseAndResume]);

  const handleCardClick = useCallback((id) => {
    pauseAndResume();
    onClickItem?.(id);
  }, [onClickItem, pauseAndResume]);


  // 자동 슬라이드: 마운트 시 시작, 언마운트 시 정리
  useEffect(() => {
    startAutoRoll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, [startAutoRoll]);

  // 데이터가 없을 때 빈 상태 UI
  if (n === 0) {
    return (
      <div>
        <div className={styles.wrap}>
          <button
            className={`${styles.arrow} ${styles.left} `}
            aria-label="prev"
          >
            <TbChevronLeft />
          </button>
          <div className={styles.viewport}>
            <div className={styles.emptyCard}>
              <span>방문예정 정보가 없습니다.</span>
            </div>
          </div>
          <button
            className={`${styles.arrow} ${styles.right} `}
            aria-label="next"
          >
            <TbChevronRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.wrap}>
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={handlePrev}
          aria-label="prev"
        >
          <TbChevronLeft />
        </button>

        {/* viewport */}
        <div className={styles.viewport}>
          <div
            key={items[idx]?.id ?? idx}
            className={`${styles.cardWrapper} ${animClass}`}
            onAnimationEnd={handleAnimEnd}
          >
            <div
              className={styles.card}
              onClick={() => handleCardClick(items[idx]?.id)}
              style={{ cursor: onClickItem ? 'pointer' : 'default' }}
            >
              <div className={styles.header}>
                <span className={styles.clock}>
                  <TbClock />
                </span>
                <span className={styles.time}>{items[idx]?.time}</span>
              </div>

              <ul className={styles.list}>
                {items[idx]?.rows.map((r, ri) => (
                  <li key={ri} className={styles.row}>
                    <span className={styles.dot} />
                    <span className={styles.label}>{r.label}</span>
                    <span className={styles.value}>{r.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={handleNext}
          aria-label="next"
        >
          <TbChevronRight />
        </button>
      </div>
      {/* dots: 최대 5개 윈도우 */}
      {n > 1 && (
        <div className={styles.dots}>
          {visibleDotIndices.map((i) => (
            <button
              key={i}
              className={`${styles.dotBtn} ${i === idx ? styles.active : ""}`}
              onClick={() => handleDotClick(i)}
              aria-label={`go ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardSlider;
