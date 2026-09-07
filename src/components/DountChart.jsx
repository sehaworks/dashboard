import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function EventDonut({
  title = "전체",
  total = 0,
  size = 140,
  thickness = 15, // 링 두께
  chartData = [], // [{ name, value, color }]
}) {
  // 데이터가 없거나 모든 값이 0인 경우 기본 회색 원 표시
  const hasData = chartData.length > 0 && chartData.some(d => d.value > 0);
  const data = hasData ? chartData : [{ name: "없음", value: 1, color: "#555" }];
  // Recharts는 radius로 두께를 결정하니 계산
  const outerRadius = Math.floor(size / 2);
  const innerRadius = outerRadius - thickness;

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={0}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* 중앙 텍스트 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1 }}>
          {title}
        </div>
        <div style={{ height: 8 }} />
        <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>
          {total}
          <span style={{ fontSize: 30, fontWeight: 700, marginLeft: 4 }}>
            건
          </span>
        </div>
      </div>
    </div>
  );
}
