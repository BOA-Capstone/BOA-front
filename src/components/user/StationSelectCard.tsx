import React from 'react';
import { Button } from '../ui/button';
import { useStationStore } from '../../store/stationStore';
import { useChargeStore } from '../../store/chargeStore';

interface StationSelectCardProps {
  onBack?: () => void;
  onSelect?: () => void;
}

const StationSelectCard: React.FC<StationSelectCardProps> = ({ onBack, onSelect }) => {
  const stations = useStationStore(state => state.stations);
  const selectedId = useChargeStore(state => state.selectedStationId);
  const setStation = useChargeStore(state => state.setStation);
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-white">충전소 선택</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stations.map(station => (
          <div
            key={station.id}
            className={`rounded-2xl p-4 bg-white/5 border transition-all cursor-pointer select-none
              ${selectedId === station.id ? 'border-[var(--cyan)] ring-2 ring-[var(--cyan)] bg-black/60' : 'border-white/10 hover:border-[var(--cyan)] hover:bg-black/40'}`}
            onClick={() => {
              setStation(station.id);
              if (onSelect) onSelect();
            }}
          >
            <div className="flex items-center mb-2">
              <div className="font-semibold text-white">{station.name}</div>
            </div>
            <div className="text-sm text-white/70 mb-1">{station.address}</div>
            {station.desc && (
              <div className="text-xs text-cyan-400 font-bold mt-1 whitespace-pre-line">{station.desc}</div>
            )}
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
};

export default StationSelectCard;
