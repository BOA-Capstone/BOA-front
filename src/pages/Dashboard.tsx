import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';

const Dashboard: React.FC = () => {
  // 더미 데이터: 충전소별 사용량
  const data = [
    { name: 'A충전소', value: 40 },
    { name: 'B충전소', value: 25 },
    { name: 'C충전소', value: 60 },
    { name: 'D충전소', value: 15 },
    { name: 'E충전소', value: 50 },
  ];
  const width = 400;
  const height = 220;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // X축: 충전소 이름
  const xScale = scaleBand({
    domain: data.map(d => d.name),
    range: [0, xMax],
    padding: 0.3,
  });
  // Y축: 사용량
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d.value))],
    range: [yMax, 0],
  });
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1a0033] via-[#0a1f44] to-[#38bdf8] flex flex-col items-center py-10">
      <h2 className="text-2xl font-bold mb-10 text-white">충전소별 사용량 대시보드 (예시)</h2>
      <div className="bg-black rounded-lg shadow p-6 flex flex-col items-center">
        <svg width={width} height={height}>
          <Group top={margin.top} left={margin.left}>
            {data.map((d, i) => {
              const barWidth = xScale.bandwidth();
              const barHeight = yMax - yScale(d.value);
              const x = xScale(d.name);
              const y = yScale(d.value);
              return (
                <Bar
                  key={`bar-${d.name}`}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="#38bdf8"
                  rx={6}
                />
              );
            })}
            {/* X축 라벨 */}
            {data.map((d, i) => {
              const x = xScale(d.name) ?? 0;
              return (
                <text
                  key={`label-${d.name}`}
                  x={x + xScale.bandwidth() / 2}
                  y={yMax + 20}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={14}
                >
                  {d.name}
                </text>
              );
            })}
            {/* Y축 라벨 */}
            <text x={-30} y={yMax / 2} fill="#fff" fontSize={14} textAnchor="middle" transform={`rotate(-90, -30, ${yMax / 2})`}>
              사용량
            </text>
          </Group>
        </svg>
        <div className="mt-6 text-gray-300 text-sm">
          ※ 실제 데이터가 아닌 임시 예시입니다.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
