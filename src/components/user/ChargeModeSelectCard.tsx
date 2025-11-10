import React from 'react';
import { Button } from '../ui/button';

interface ChargeModeSelectCardProps {
  onSelect: (mode: 'normal' | 'optimized') => void;
  onHome: () => void;
  hovered: 'normal' | 'optimized' | 'chargerSelect' | null;
  setHovered: (mode: 'normal' | 'optimized' | 'chargerSelect' | null) => void;
}

const ChargeModeSelectCard: React.FC<ChargeModeSelectCardProps> = ({
  onSelect,
  onHome,
  setHovered,
}) => (
  <>
    <h1 className="text-3xl font-bold mb-8 text-white">충전 방식 선택</h1>
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
        onClick={onHome}
        onMouseEnter={() => setHovered('chargerSelect')}
        onMouseLeave={() => setHovered(null)}
      >
        뒤로가기
      </Button>
    </div>
  </>
);

export default ChargeModeSelectCard;
