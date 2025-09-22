import React from 'react';

const summaryData = [
  { label: '전체 충전소 수', value: 128 },
  { label: '실시간 가동 충전소', value: 97 },
  { label: '평균 혼잡도', value: '중간' },
  { label: '오늘 총 충전 횟수', value: 342 },
  { label: '가장 많이 사용된 충전소', value: 'B충전소' },
];

const Summary: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white/10 rounded-2xl shadow-lg p-8 flex flex-col gap-6 items-center">
      <h2 className="text-2xl font-bold text-blue-200 mb-4">전체 현황 요약</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {summaryData.map((item, idx) => (
          <div key={idx} className="bg-blue-900/60 rounded-xl p-6 flex flex-col items-center shadow">
            <div className="text-lg text-blue-100 mb-2">{item.label}</div>
            <div className="text-3xl font-extrabold text-cyan-300">{item.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-blue-100 opacity-70">※ 임시 데이터입니다.</div>
    </div>
  );
};

export default Summary;
