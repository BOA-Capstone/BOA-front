import React from 'react';

const StationDetail: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">충전소 상세 정보 (더미)</h2>
      <ul className="space-y-2">
        <li>충전소명: <span className="font-semibold">BOA 강남점</span></li>
        <li>주소: <span className="font-semibold">서울시 강남구 테헤란로 123</span></li>
        <li>운영 시간: <span className="font-semibold">24시간</span></li>
        <li>충전기 수: <span className="font-semibold">8대</span></li>
        <li>상태: <span className="font-semibold text-green-600">운영 중</span></li>
      </ul>
    </div>
  );
};

export default StationDetail;
