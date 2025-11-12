import React from 'react';


interface ChargeResultBarVerticalProps {
  label: string;
  cost: number;
  baseCost: number; // 일반 충전 비용(기준)
  colorClass: string;
}

const ChargeResultBarVertical: React.FC<ChargeResultBarVerticalProps> = ({ label, cost, baseCost, colorClass }) => {
  // baseCost가 0이면 100%로 처리
  const height = baseCost > 0 ? `${Math.round((cost / baseCost) * 100)}%` : '100%';
  return (
    <div className="flex flex-col items-center w-32">
      <div className="relative flex flex-col justify-end w-full bg-slate-200 rounded-t-lg rounded-b-lg h-48 min-h-[8rem] overflow-hidden">
        <div
          className={`${colorClass} w-full rounded-b-lg absolute bottom-0 left-0 transition-all duration-500`}
          style={{ height, minHeight: '8px', zIndex: 1 }}
        />
    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-white font-bold z-10 pointer-events-none whitespace-nowrap">
          {cost.toLocaleString()}원
        </span>
      </div>
    <span className="mt-2 text-center font-bold text-xl text-white whitespace-pre-line">{label}</span>
    </div>
  );
};

export default ChargeResultBarVertical;
