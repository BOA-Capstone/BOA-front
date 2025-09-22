import React from 'react';

const Statistics: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">통계 및 분석 (더미)</h2>
      <ul className="space-y-2">
        <li>일일 평균 충전 횟수: <span className="font-semibold">320회</span></li>
        <li>월간 이용자 수: <span className="font-semibold">2,400명</span></li>
        <li>최다 이용 시간대: <span className="font-semibold">오후 6~8시</span></li>
        <li>고장 발생률: <span className="font-semibold text-red-500">1.2%</span></li>
      </ul>
    </div>
  );
};

export default Statistics;
