import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { InfoModal } from "../components/ui/info-modal";
import { Modal } from "../components/ui/modal";
import { useNavigate, useLocation } from "react-router-dom";
import ChargeResultBar from "../components/charge/ChargeResultBar";
import { BASE_COST, RAPID_COST, AI_COST, getSave, getSaveRate } from "../constants/charge";

const ChargeResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showInfo, setShowInfo] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { currentSoc, targetSoc, arrivalTime, departureTime, mode } = location.state || {};

  // 비용/절감 계산 상수 및 유틸 사용
  const baseCost = BASE_COST;
  const rapidCost = RAPID_COST;
  const aiCost = AI_COST;
  const rapidSave = getSave(baseCost, rapidCost);
  const rapidSaveRate = getSaveRate(baseCost, rapidCost);
  const aiSave = getSave(baseCost, aiCost);
  const aiSaveRate = getSaveRate(baseCost, aiCost);
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
        <h2 className="text-xl font-bold mb-4 text-center text-white">절감 원리 안내</h2>
        <ul className="list-disc pl-5 text-sm text-white mb-2">
          <li>전력 요금이 낮은 시간대에 집중 충전</li>
          <li>ESS(배터리) 활용 및 태양광 등 신재생 에너지 연계</li>
          <li>사용자 목표 SoC와 출차 시간에 맞춘 맞춤형 스케줄</li>
        </ul>
        <div className="text-xs text-slate-400">(실제 절감 효과는 환경 및 요금제에 따라 달라질 수 있습니다)</div>
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