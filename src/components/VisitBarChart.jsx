import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export default function VisitBars({
  planned = 24,
  completed = 49,
  max = 100, // 0~100 스케일
  height = 150,
}) {
  const data = [
    { name: "방문예정", value: planned },
    { name: "방문완료", value: completed },
  ];

  return (
    <div style={{ display: "flex", gap: 18, alignItems: "start" }}>
      {/* 오른쪽: 숫자 */}
      <div
        style={{
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          fontSize: "15px",
          lineHeight: "32px",
          gap: "18px",
          paddingTop: "16px",
        }}
      >
        <span>방문예정</span>
        <span>방문완료</span>
      </div>
      {/* 왼쪽: 막대 */}
      <div style={{ flex: 1, height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 6, right: 12, left: 0, bottom: 12 }}
            barCategoryGap={0}
          >
            {/* 세로 점선 위치를 강제로 지정 */}
            <CartesianGrid
              vertical
              horizontal={false}
              stroke="rgba(255,255,255,0.3)"
              strokeDasharray="2 6"
            />
            {/* 맨 왼쪽 실선 (0 기준) */}
            <ReferenceLine
              x={0}
              stroke="rgba(255,255,255,0.8)"
              strokeWidth={1}
            />

            {/* 눈금/축: 아래 숫자 0~100 */}
            <XAxis
              type="number"
              domain={[0, max]}
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#ffffff",
                fontSize: 12,
                opacity: 0.8,
              }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={0} // 화면에 안 보이게
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="value" barSize={12} radius={[0, 6, 6, 0]}>
              <Cell fill="#06D8E7" /> {/* 방문예정 */}
              <Cell fill="#63917D" /> {/* 방문완료 */}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 오른쪽: 숫자 */}
      <div
        style={{
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          fontSize: "15px",
          lineHeight: "32px",
          gap: "18px",
          paddingTop: "16px",
        }}
      >
        <div
          style={{
            color: "#fff",
            display: "flex",
            flexDirection: "row",
            lineHeight: "32px",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "28px", fontWeight: "700" }}>{planned}</span>
          <b style={{ fontSize: "20px", fontWeight: "700" }}>명</b>
        </div>
        <div
          style={{
            color: "#fff",
            display: "flex",
            flexDirection: "row",
            lineHeight: "32px",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "28px", fontWeight: "700" }}>
            {completed}
          </span>
          <b style={{ fontSize: "20px", fontWeight: "700" }}>명</b>
        </div>
      </div>
    </div>
  );
}
