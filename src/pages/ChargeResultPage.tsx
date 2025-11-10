import { CHARGER_RESULT_MAP, DEFAULT_CHARGER_RESULT } from "../constants/charge";
import { useChargeStore } from "../store/chargeStore";
import { useStationStore } from "../store/stationStore";
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { InfoModal } from "../components/ui/info-modal";
import { Modal } from "../components/ui/modal";
import { useNavigate, useLocation } from "react-router-dom";
import ChargeResultBar from "../components/charge/ChargeResultBar";

const ChargeResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showInfo, setShowInfo] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const state = location.state || {};
  const { currentSoc, targetSoc, arrivalTime, departureTime, mode } = state;

  // zustand 값 먼저 받고, state 값이 있으면 덮어씀 (Hook 규칙 위반 방지)
  const zustandStationId = useChargeStore(s => s.selectedStationId);
  const zustandChargerId = useChargeStore(s => s.selectedChargerId);
  const selectedStationId = state.selectedStationId !== undefined ? state.selectedStationId : zustandStationId;
  const selectedChargerId = state.selectedChargerId !== undefined ? state.selectedChargerId : zustandChargerId;
  const isBoa1 = selectedStationId === 1;
  const isSpecialPort = selectedChargerId === 1 || selectedChargerId === 4;
  let result;
  if (isBoa1 && isSpecialPort) {
    result = CHARGER_RESULT_MAP[selectedChargerId!];
  } else {
    result = DEFAULT_CHARGER_RESULT;
  }
  const { baseCost, rapidCost, aiCost, rapidSave, rapidSaveRate, aiSave, aiSaveRate, infoList } = result;
  const maxCost = Math.max(baseCost, rapidCost, aiCost);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-[url('/src/assets/photo9.jpg')] bg-cover bg-center">
      <div className="text-white bg-black/80 rounded-2xl shadow-xl px-10 py-12 max-w-lg w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">예상 충전 결과</h1>
      <div className="w-full flex flex-col gap-4 mb-8">
        <div className="text-lg text-center text-cyan-400 mb-2">충전 스케줄링 결과가 완성되었습니다!</div>
        {/* 입력값 요약 */}
        <div className="w-full flex flex-col gap-1 text-base mb-4">
          <div><span className="font-semibold">현재 SoC:</span> {currentSoc ?? '-'}</div>
          <div><span className="font-semibold">목표 SoC:</span> {targetSoc ?? '-'}</div>
          <div><span className="font-semibold">차량 도착 시간:</span> {arrivalTime ?? '-'}</div>
          <div><span className="font-semibold">출차 희망 시간:</span> {departureTime ?? '-'}</div>
          <div><span className="font-semibold">모드:</span> {mode === 'normal' ? '급속 충전' : mode === 'optimized' ? '최적화 충전' : '-'}</div>
        </div>
        {/* 비교 시각화: 모드에 따라 분기 */}
        {mode === 'normal' && (
          <div className="w-full mb-6">
            <div className="font-bold text-cyan-400 mb-2">일반 충전 vs 급속 충전</div>
            <div className="flex flex-col gap-2">
              <ChargeResultBar label="일반 충전" cost={baseCost} maxCost={maxCost} colorClass="bg-gray-400" />
              <ChargeResultBar label="급속 충전" cost={rapidCost} maxCost={maxCost} colorClass="bg-blue-400" />
            </div>
            <div className="mt-2 text-sm text-cyan-400 font-semibold text-right">
              절감액: {rapidSave.toLocaleString()}원 ({rapidSaveRate}%↓)
            </div>
          </div>
        )}
        {mode === 'optimized' && (
          <div className="w-full mb-2">
            <div className="font-bold text-cyan-400 mb-2">일반 충전 vs 최적화 충전</div>
            <div className="flex flex-col gap-2">
              <ChargeResultBar label="일반 충전" cost={baseCost} maxCost={maxCost} colorClass="bg-gray-400" />
              <ChargeResultBar label="최적화 충전" cost={aiCost} maxCost={maxCost} colorClass="bg-cyan-500" />
            </div>
            <div className="mt-2 text-sm text-cyan-400 font-semibold text-right">
              절감액: {aiSave.toLocaleString()}원 ({aiSaveRate}%↓)
            </div>
          </div>
        )}
      </div>
      <Button
        className="w-full mb-3"
        variant="secondary"
        onClick={() => setShowInfo(true)}
      >
        절감 원리 보기
      </Button>
    <Button className="w-full mb-3" variant="secondary" onClick={() => setShowConfirm(true)}>충전하기</Button>
    <Button className="w-full" variant="secondary" onClick={() => navigate("/")}>메인으로 돌아가기</Button>
      <InfoModal
        open={showInfo}
        onClose={() => setShowInfo(false)}
        className="bg-black/80 text-white rounded-2xl shadow-xl px-8 py-10"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-white">절감 내역 안내</h2>
        <ul className="list-disc pl-5 text-sm text-white mb-2">
          {infoList.map((msg: string, i: number) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
        <div className="text-xs text-slate-400">(여러 환경과 상황에 따라 조금씩 값이 달라질 수 있습니다.)</div>
      </InfoModal>

      {/* 충전 시작 확인 모달 - InfoModal 바깥에 위치 */}
      <Modal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        className="bg-black/80 text-white rounded-2xl shadow-xl px-8 py-10"
      >
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-white">충전을 시작할까요?</h2>
          <div className="mb-6 text-slate-400">충전이 시작되면 <span className="font-bold">취소가 불가</span>합니다. 계속 진행하시겠습니까?</div>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>취소</Button>
            <Button
              variant="secondary"
              onClick={() => {
                // 충전 시작 시에만 상태를 CHARGING으로 변경
                if (selectedStationId && selectedChargerId) {
                  useStationStore.getState().setChargerStatus(selectedStationId, selectedChargerId, 'CHARGING');
                }
                setShowConfirm(false);
                navigate("/");
              }}
            >
              충전 시작
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
  );
}

export default ChargeResultPage;