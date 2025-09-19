import React from 'react';

const Dashboard: React.FC = () => {
  return (
  <div className="w-full h-full bg-gradient-to-br from-[#1a0033] via-[#0a1f44] to-[#38bdf8] flex flex-col">
      <h2 className="text-2xl font-bold mb-10">대시보드</h2>
      <div className="bg-black rounded-lg shadow p-6">
        <p>여기에 주요 지표, 차트, 충전소 상태 등이 표시됩니다.</p>
      </div>
    </div>
  );
};

export default Dashboard;
