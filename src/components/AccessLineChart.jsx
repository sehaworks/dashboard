import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

// X축에 표시할 시간 (03, 06, 09, 12, 15, 18, 21, 24)
const VISIBLE_TICKS = ["03", "06", "09", "12", "15", "18", "21", "24"];

// Dot을 표시할 시간대 (01, 03, 06, 09, 12, 15, 18, 21, 24)
const DOT_VISIBLE_TIMES = ["01", "03", "06", "09", "12", "15", "18", "21", "24"];

// Y축 tick 값
const Y_AXIS_TICKS = [0, 20, 40, 60, 80, 100];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.75)",
        color: "#fff",
        padding: "10px 10px",
        borderRadius: 8,
        fontWeight: 500,
        lineHeight: "1.5",
      }}
    >
      <div>임직원: {payload[0]?.value || 0}명</div>
      {/* <br /> */}
      <div>방문자: {payload[1]?.value || 0}명</div>
    </div>
  );
}

export default function AccessLineChart({ apiData, height = 220 }) {
  // API 응답을 차트 데이터로 변환
  const chartData = useMemo(() => {
    if (!apiData?.timeLabels) return [];

    return apiData.timeLabels.map((time, idx) => ({
      t: time.padStart(2, "0"),
      employees: apiData.employees?.[idx] || 0,
      visitors: apiData.visitors?.[idx] || 0,
    }));
  }, [apiData]);
  // 데이터가 없을 때
  if (chartData.length === 0) {
    return (
      <div style={{ width: "100%", height, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)" }}>
        데이터가 없습니다.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 0, bottom: 10, left: 0 }}
        >
          <CartesianGrid
            vertical={false}
            horizontal
            stroke="rgba(255,255,255,0.3)"
            strokeDasharray="2 6"
          />
          <ReferenceLine y={0} stroke="rgba(255,255,255,0.8)" strokeWidth={1} />
          <XAxis
            dataKey="t"
            tickLine={false}
            axisLine={false}
            padding={{ left: 16, right: 16 }}
            tick={{
              fill: "#ffffff",
              fontSize: 12,
              opacity: 0.8,
            }}
            ticks={VISIBLE_TICKS}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={24}
            tick={{
              fill: "#ffffff",
              fontSize: 12,
              opacity: 0.8,
            }}
            ticks={Y_AXIS_TICKS}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* 임직원 (흰색) */}
          <Line
            type="linear"
            dataKey="employees"
            dot={(props) => {
              const { cx, cy, stroke, payload } = props;
              if (cx == null || cy == null) return null;
              // 특정 시간대에만 dot 표시
              if (!DOT_VISIBLE_TIMES.includes(payload?.t)) return null;

              return (
                <g>
                  <circle cx={cx} cy={cy} r={6} fill="#FFFFFF4D" />
                  <circle cx={cx} cy={cy} r={3} fill={stroke} />
                </g>
              );
            }}
            fill="#ffffff"
            stroke="#ffffff"
          />
          {/* 방문자 (파란색) */}
          <Line
            type="linear"
            dataKey="visitors"
            dot={(props) => {
              const { cx, cy, stroke, payload } = props;
              if (cx == null || cy == null) return null;
              // 특정 시간대에만 dot 표시
              if (!DOT_VISIBLE_TIMES.includes(payload?.t)) return null;

              return (
                <g>
                  <circle cx={cx} cy={cy} r={6} fill="#47EAFF4D" />
                  <circle cx={cx} cy={cy} r={3} fill={stroke} />
                </g>
              );
            }}
            fill="#47EAFF"
            stroke="#47EAFF"
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
