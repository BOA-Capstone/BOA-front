import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="w-full h-full bg-black flex flex-col">
      <h2 className="text-2xl font-bold mb-10">대시보드</h2>
      <div className="bg-black rounded-lg shadow p-6">
        <p>여기에 주요 지표, 차트, 충전소 상태 등이 표시됩니다.</p>
      </div>
    </div>
  );
};

export default Dashboard;
