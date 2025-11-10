
import React from 'react';
import { Button } from '../ui/button';
import type { Station } from '../../types/station';

interface StationSelectCardProps {
  stations: Station[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onBack?: () => void;
}

const statusColor = {
  IDLE: 'bg-white/10 text-white/70',
  CHARGING: 'bg-green-500/20 text-green-300',
  FAULT: 'bg-red-500/20 text-red-300',
};

const StationSelectCard: React.FC<StationSelectCardProps> = ({ stations, selectedId, onSelect, onBack }) => (
  <div className="w-full">
    <h1 className="text-3xl font-bold mb-8 text-white">충전소 선택</h1>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {stations.map(station => (
        <div
          key={station.id}
          className={`rounded-2xl p-4 bg-white/5 border transition-all cursor-pointer select-none
            ${selectedId === station.id ? 'border-[var(--cyan)] ring-2 ring-[var(--cyan)] bg-black/60' : 'border-white/10 hover:border-[var(--cyan)] hover:bg-black/40'}`}
          onClick={() => onSelect(station.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-white">{station.name}</div>
            <span className={`text-xs px-2 py-1 rounded-full ${statusColor[station.status]}`}>{station.status}</span>
          </div>
          <div className="text-sm text-white/70 mb-1">{station.address}</div>
          <div className="text-xs text-[var(--cyan)]">{station.distanceKm.toFixed(1)} km 거리</div>
        </div>
      ))}
    </div>
    {onBack && (
      <div className="flex justify-end mt-2">
        <Button variant="secondary" size="lg" onClick={onBack}>
          뒤로가기
        </Button>
      </div>
    )}
  </div>
);

export default StationSelectCard;
