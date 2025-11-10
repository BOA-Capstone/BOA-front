import React from 'react';
import { Modal } from '../../components/ui/modal';
import { Button } from '../../components/ui/button';

interface ChargeConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentSoc: string;
  targetSoc: string;
  arrivalTime: string;
  departureTime: string;
  mode: 'normal' | 'optimized';
}

const ChargeConfirmModal: React.FC<ChargeConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  currentSoc,
  targetSoc,
  arrivalTime,
  departureTime,
  mode,
}) => (
  <Modal open={open} onClose={onClose}>
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-xl font-bold mb-2">입력값 확인</h3>
      <div className="w-full flex flex-col gap-2 text-base">
        <div><span className="font-semibold">현재 SoC:</span> {currentSoc}%</div>
        <div><span className="font-semibold">목표 SoC:</span> {targetSoc}%</div>
        <div><span className="font-semibold">차량 도착 시간:</span> {arrivalTime}</div>
        <div><span className="font-semibold">출차 희망 시간:</span> {departureTime}</div>
        <div><span className="font-semibold">모드:</span> {mode === 'normal' ? '급속 충전' : '최적화 충전'}</div>
      </div>
      <div className="flex gap-4 mt-4">
        <Button variant="default" onClick={onClose}>수정</Button>
        <Button variant="default" onClick={onConfirm}>확인</Button>
      </div>
    </div>
  </Modal>
);

export default ChargeConfirmModal;
