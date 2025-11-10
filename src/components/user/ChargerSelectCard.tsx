import React from 'react';
import { Button } from '../ui/button';
import { useStationStore } from '../../store/stationStore';
import { useChargeStore } from '../../store/chargeStore';

interface ChargerSelectCardProps {
  onBack?: () => void;
  onSelect?: () => void;
}

const statusColor = {
  IDLE: 'bg-white/10 text-white/70',
  CHARGING: 'bg-green-500/20 text-green-300',
  FAULT: 'bg-red-500/20 text-red-300',
};

const ChargerSelectCard: React.FC<ChargerSelectCardProps> = ({ onBack, onSelect }) => {
  const chargersByStation = useStationStore(state => state.chargersByStation);
  const stations = useStationStore(state => state.stations);
  const selectedStationId = useChargeStore(state => state.selectedStationId);
  const selectedId = useChargeStore(state => state.selectedChargerId);
  const setCharger = useChargeStore(state => state.setCharger);
  const stationName = stations.find(s => s.id === selectedStationId)?.name;
  const chargers = chargersByStation[selectedStationId || 0] || [];
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-2 text-white">충전기 선택</h1>
      {stationName && (
        <div className="mb-6 text-lg text-cyan-400 font-semibold text-center">{stationName}</div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {chargers.map(charger => (
          <div
            key={charger.id}
            className={`rounded-2xl p-4 bg-white/5 border transition-all cursor-pointer select-none
              ${selectedId === charger.id ? 'border-[var(--cyan)] ring-2 ring-[var(--cyan)] bg-black/60' : 'border-white/10 hover:border-[var(--cyan)] hover:bg-black/40'}
              ${charger.status === 'FAULT' ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => {
              setCharger(charger.id);
              if (onSelect) onSelect();
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-white">{charger.name}</div>
              <span className={`text-xs px-2 py-1 rounded-full ${statusColor[charger.status]}`}>{charger.status}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-white/60">{charger.powerKw}kW</span>
            </div>
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

export default ChargerSelectCard;
