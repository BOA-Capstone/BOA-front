import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { InfoModal } from "../components/ui/info-modal";
import { useNavigate, useLocation } from "react-router-dom";

const ChargeResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showInfo, setShowInfo] = useState(false);
  const { currentSoc, targetSoc, arrivalTime, departureTime, mode } = location.state || {};

  // 더미 데이터: 실제 API 연동 전까지 사용
  // 일반 충전(즉시), 급속 충전, AI 최적화 충전 비용 (단위: 원)
  const baseCost = 5000; // 일반 충전(즉시)
  const rapidCost = 4200; // 급속 충전
  const aiCost = 3800; // AI 최적화

  // 절감 계산
  const rapidSave = baseCost - rapidCost;
  const rapidSaveRate = Math.round((rapidSave / baseCost) * 100);
  const aiSave = baseCost - aiCost;
  const aiSaveRate = Math.round((aiSave / baseCost) * 100);

  // 바 차트 길이 비율 (최대 100%)
  const maxCost = Math.max(baseCost, rapidCost, aiCost);
  const getBarWidth = (cost: number) => `${Math.round((cost / maxCost) * 100)}%`;

          return (
  <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200">
    <div className="bg-white/90 rounded-2xl shadow-xl px-10 py-12 max-w-lg w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">예상 충전 결과</h1>
      <div className="w-full flex flex-col gap-4 mb-8">
        <div className="text-lg text-center text-slate-700 mb-2">충전 스케줄링 결과가 완성되었습니다!</div>
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
            <div className="font-bold text-slate-800 mb-2">일반 충전 vs 급속 충전</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-24">일반 충전</span>
                <div className="flex-1 bg-slate-200 rounded h-6 relative">
                  <div className="bg-gray-400 h-6 rounded" style={{ width: getBarWidth(baseCost) }} />
                  <span className="absolute left-2 top-0.5 text-xs text-white font-bold">{baseCost.toLocaleString()}원</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24">급속 충전</span>
                <div className="flex-1 bg-slate-200 rounded h-6 relative">
                  <div className="bg-blue-400 h-6 rounded" style={{ width: getBarWidth(rapidCost) }} />
                  <span className="absolute left-2 top-0.5 text-xs text-white font-bold">{rapidCost.toLocaleString()}원</span>
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-semibold text-right">
              절감액: {rapidSave.toLocaleString()}원 ({rapidSaveRate}%↓)
            </div>
          </div>
        )}
        {mode === 'optimized' && (
          <div className="w-full mb-2">
            <div className="font-bold text-slate-800 mb-2">일반 충전 vs 최적화 충전</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-24">일반 충전</span>
                <div className="flex-1 bg-slate-200 rounded h-6 relative">
                  <div className="bg-gray-400 h-6 rounded" style={{ width: getBarWidth(baseCost) }} />
                  <span className="absolute left-2 top-0.5 text-xs text-white font-bold">{baseCost.toLocaleString()}원</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24">최적화 충전</span>
                <div className="flex-1 bg-slate-200 rounded h-6 relative">
                  <div className="bg-green-500 h-6 rounded" style={{ width: getBarWidth(aiCost) }} />
                  <span className="absolute left-2 top-0.5 text-xs text-white font-bold">{aiCost.toLocaleString()}원</span>
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-semibold text-right">
              절감액: {aiSave.toLocaleString()}원 ({aiSaveRate}%↓)
            </div>
          </div>
        )}
      </div>
      <Button
        className="w-full mb-3"
        variant="outline"
        onClick={() => setShowInfo(true)}
      >
        절감 원리 보기
      </Button>
      <Button className="w-full" onClick={() => navigate("/")}>메인으로 돌아가기</Button>
      <InfoModal open={showInfo} onClose={() => setShowInfo(false)}>
        <h2 className="text-xl font-bold mb-4 text-center">절감 원리 안내</h2>
        <ul className="list-disc pl-5 text-sm text-slate-600 mb-2">
          <li>전력 요금이 낮은 시간대에 집중 충전</li>
          <li>ESS(배터리) 활용 및 태양광 등 신재생 에너지 연계</li>
          <li>사용자 목표 SoC와 출차 시간에 맞춘 맞춤형 스케줄</li>
        </ul>
        <div className="text-xs text-slate-400">(실제 절감 효과는 환경 및 요금제에 따라 달라질 수 있습니다)</div>
      </InfoModal>
    </div>
  </div>
);
}

export default ChargeResultPage;