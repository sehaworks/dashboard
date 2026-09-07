import { useState, useRef, useEffect } from "react";
import styles from "../../Dashboard.module.css";
import { TbSearch } from "react-icons/tb";
import { getUserLocationSearch, getUserLocationDetail } from "@/services/apis/dashboardAPI";
import SearchResultModal from "../modal/SearchResultModal";

const EmployeeSearchBox = ({ workplaceId }) => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const timerRef = useRef(null);
  const boxRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 디바운스 검색
  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setShowResult(false);
    setSelectedUser(null);
    setUserDetail(null);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (!value.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    timerRef.current = setTimeout(async () => {
      try {
        const result = await getUserLocationSearch({ workplaceId, keyword: value.trim() });
        setSuggestions(result || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("위치 검색 실패:", err);
        setSuggestions([]);
      }
    }, 200);
  };

  // 사용자 선택
  const handleSelect = async (user) => {
    setSelectedUser(user);
    setKeyword(`${user.userName} ${user.departmentName}`);
    setShowDropdown(false);
    setSuggestions([]);

    try {
      const detail = await getUserLocationDetail(user.beaconId, workplaceId);
      setUserDetail(detail);
      setShowResult(true);
    } catch (err) {
      console.error("위치 상세 조회 실패:", err);
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setUserDetail(null);
    setSelectedUser(null);
    setKeyword("");
  };

  return (
    <div className={styles.searchInputBox} ref={boxRef}>
      <div className="iconInputBox">
        <input
          type="search"
          placeholder="임직원 이름으로 위치 찾기"
          value={keyword}
          onChange={handleChange}
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

      {/* 검색결과 */}
      <SearchResultModal
        open={showResult}
        onClose={handleCloseResult}
        userData={userDetail}
      />
    </div>
  );
};

export default EmployeeSearchBox;
