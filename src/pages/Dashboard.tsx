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
    <div className="w-full h-full bg-gradient-to-br from-[#1a0033] via-[#0a1f44] to-[#38bdf8] flex flex-col items-center">
      <h2 className="text-2xl font-bold my-5 text-white">충전소별 사용량 대시보드 (예시)</h2>
      <div className="bg-black rounded-2xl shadow-lg flex flex-col items-center w-full max-w-5xl mx-auto">
        <svg width={800} height={400}>
          <Group top={40} left={60}>
            {data.map((d, i) => {
              // 새로운 스케일 계산 (확장된 width/height 기준)
              const barWidth = 80;
              const barHeight = d.value * 5;
              const x = i * 120;
              const y = 300 - barHeight;
              return (
                <Bar
                  key={`bar-${d.name}`}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="#38bdf8"
                  rx={12}
                />
              );
            })}
            {/* X축 라벨 */}
            {data.map((d, i) => {
              const x = i * 120 + 40;
              return (
                <text
                  key={`label-${d.name}`}
                  x={x}
                  y={340}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={18}
                  fontWeight="bold"
                >
                  {d.name}
                </text>
              );
            })}
            {/* Y축 라벨 */}
            <text x={-40} y={180} fill="#fff" fontSize={18} textAnchor="middle" transform="rotate(-90, -40, 180)">
              사용량
            </text>
          </Group>
        </svg>
        <div className="my-8 text-gray-300 text-base">
          ※ 실제 데이터가 아닌 임시 예시입니다.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
