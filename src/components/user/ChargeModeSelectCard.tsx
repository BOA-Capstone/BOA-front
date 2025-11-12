import React from 'react';
import { FaBolt } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useStationStore } from '../../store/stationStore';
import { useChargeStore } from '../../store/chargeStore';

interface ChargeModeSelectCardProps {
  onSelect: (mode: 'normal' | 'optimized') => void;
  onBack: () => void;
  setHovered: (mode: 'normal' | 'optimized' | 'chargerSelect' | null) => void;
}

const ChargeModeSelectCard: React.FC<ChargeModeSelectCardProps> = ({
  onSelect,
  onBack,
  setHovered,
}) => {
  const stations = useStationStore(state => state.stations);
  const chargersByStation = useStationStore(state => state.chargersByStation);
  const selectedStationId = useChargeStore(state => state.selectedStationId);
  const selectedChargerId = useChargeStore(state => state.selectedChargerId);
  const stationName = stations.find(s => s.id === selectedStationId)?.name;
  const chargerName = (chargersByStation[selectedStationId || 0] || []).find(c => c.id === selectedChargerId)?.name;
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-3xl font-bold text-white">충전 방식 선택</h1>
        <FaBolt className="text-cyan-400 text-2xl" />
      </div>
      {(stationName || chargerName) && (
        <div className="mb-6 text-lg text-cyan-400 font-semibold text-center">
          {stationName && <span>{stationName}</span>}
          {stationName && chargerName && <span className="mx-2 text-white/40">/</span>}
          {chargerName && <span>{chargerName}</span>}
        </div>
      )}
      <div className="flex flex-col gap-6 mb-8 w-full">
        <Button
          variant="secondary"
          size="lg"
          className="w-full text-lg hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:bg-black focus:border-[var(--cyan)] focus:text-[var(--cyan)] focus:bg-black transition-all"
          onClick={() => onSelect('normal')}
          onMouseEnter={() => setHovered('normal')}
          onMouseLeave={() => setHovered(null)}
        >
          급속 충전
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="w-full text-lg hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:bg-black focus:border-[var(--cyan)] focus:text-[var(--cyan)] focus:bg-black transition-all"
          onClick={() => onSelect('optimized')}
          onMouseEnter={() => setHovered('optimized')}
          onMouseLeave={() => setHovered(null)}
        >
          최적화 충전
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="w-full text-lg hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:bg-black focus:border-[var(--cyan)] focus:text-[var(--cyan)] focus:bg-black transition-all"
          onClick={onBack}
          onMouseEnter={() => setHovered('chargerSelect')}
          onMouseLeave={() => setHovered(null)}
        >
          뒤로가기
        </Button>
      </div>
    </>
  );
};

export default ChargeModeSelectCard;
