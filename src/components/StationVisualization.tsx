import React from 'react';

const StationVisualization: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">충전소 현황 요약</h2>
      <ul className="space-y-2">
        <li>총 충전소 수: <span className="font-semibold">120개</span></li>
        <li>운영 중: <span className="font-semibold text-green-600">110개</span></li>
        <li>점검/일시중지: <span className="font-semibold text-yellow-500">8개</span></li>
        <li>고장/미운영: <span className="font-semibold text-red-500">2개</span></li>
      </ul>
    </div>
  );
};

export default StationVisualization;
