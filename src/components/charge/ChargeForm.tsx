import React from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

interface ChargeFormProps {
  currentSoc: string;
  targetSoc: string;
  arrivalTime: string;
  departureTime: string;
  error?: string | null;
  onChange: (field: 'currentSoc' | 'targetSoc' | 'arrivalTime' | 'departureTime', value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  mode: 'normal' | 'optimized' | null;
}

const ChargeForm: React.FC<ChargeFormProps> = ({
  currentSoc,
  targetSoc,
  arrivalTime,
  departureTime,
  error,
  onChange,
  onSubmit,
  onBack,
  mode,
}) => (
  <form className="w-full flex flex-col gap-6 animate-fade-in" onSubmit={onSubmit}>
    <h2 className="text-2xl font-bold mb-2 text-center text-white">
      {mode === 'normal' ? '급속 충전 정보 입력' : '최적화 충전 정보 입력'}
    </h2>
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-white">현재 배터리 잔량(%)</label>
      <Input
        type="number"
        min={0}
        max={100}
        placeholder="예: 30"
        value={currentSoc}
        onChange={e => onChange('currentSoc', e.target.value)}
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-white">목표 배터리 잔량(%)</label>
      <Input
        type="number"
        min={0}
        max={100}
        placeholder="예: 80"
        value={targetSoc}
        onChange={e => onChange('targetSoc', e.target.value)}
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-white">차량 도착 시간</label>
      <Input
        type="time"
        value={arrivalTime}
        onChange={e => onChange('arrivalTime', e.target.value)}
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-white">출차 희망 시간</label>
      <Input
        type="time"
        value={departureTime}
        onChange={e => onChange('departureTime', e.target.value)}
      />
    </div>
    {error && (
      <div className="text-red-500 text-sm text-center min-h-[24px]">{error}</div>
    )}
    <div className="flex flex-row gap-4 mt-2">
  <Button type="button" variant="default" className="flex-1 hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:bg-black focus:border-[var(--cyan)] focus:text-[var(--cyan)] focus:bg-black transition-all" onClick={onBack}>
        뒤로
      </Button>
  <Button type="submit" variant="default" className="flex-1 hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:bg-black focus:border-[var(--cyan)] focus:text-[var(--cyan)] focus:bg-black transition-all">
        충전 요청
      </Button>
    </div>
  </form>
);

export default ChargeForm;
