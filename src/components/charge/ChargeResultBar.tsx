import React from 'react';

interface ChargeResultBarProps {
  label: string;
  cost: number;
  maxCost: number;
  colorClass: string;
}

const ChargeResultBar: React.FC<ChargeResultBarProps> = ({ label, cost, maxCost, colorClass }) => {
  const width = `${Math.round((cost / maxCost) * 100)}%`;
  return (
    <div className="flex items-center gap-2">
      <span className="w-24">{label}</span>
      <div className="flex-1 bg-slate-200 rounded h-6 relative">
        <div className={`${colorClass} h-6 rounded`} style={{ width }} />
        <span className="absolute left-2 top-0.5 text-xs text-white font-bold">{cost.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default ChargeResultBar;
