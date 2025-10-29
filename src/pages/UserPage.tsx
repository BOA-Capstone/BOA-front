import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import ChargeForm from '../components/charge/ChargeForm';
import ChargeConfirmModal from '../components/charge/ChargeConfirmModal';
import { useChargeForm } from '../hooks/useChargeForm';

const UserPage: React.FC = () => {
  const [mode, setMode] = useState<'normal' | 'optimized' | null>(null);
  const [hovered, setHovered] = useState<'normal' | 'optimized' | 'home' | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const {
    currentSoc,
    setCurrentSoc,
    targetSoc,
    setTargetSoc,
    arrivalTime,
    setArrivalTime,
    departureTime,
    setDepartureTime,
    error,
    resetForm,
    validate,
  } = useChargeForm();

  return (
    <div className="min-h-screen w-screen px-0 bg-white flex flex-col items-center justify-center text-left">
      <div className="fixed top-0 left-0 w-full z-30">
  <div className="w-full bg-black text-white text-center text-xl font-bold py-4 shadow-lg">
          <span className="text-[var(--cyan)]">OptiEV</span> 사용자
        </div>
      </div>
  <div className="w-full max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-xl px-16 py-16 flex flex-col items-center mt-16">
          {mode === null && (
            <>
              <h1 className="text-3xl font-bold mb-8">충전 방식 선택</h1>
              <div className="flex flex-col gap-6 mb-8 w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-lg"
                  onClick={() => setMode('normal')}
                  onMouseEnter={() => setHovered('normal')}
                  onMouseLeave={() => setHovered(null)}
                >
                  급속 충전
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-lg"
                  onClick={() => setMode('optimized')}
                  onMouseEnter={() => setHovered('optimized')}
                  onMouseLeave={() => setHovered(null)}
                >
                  최적화 충전
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-lg"
                  onClick={() => navigate('/')}
                  onMouseEnter={() => setHovered('home')}
                  onMouseLeave={() => setHovered(null)}
                >
                  처음으로
                </Button>
              </div>
              <div className="min-h-[32px] flex items-end w-full">
                {hovered === 'normal' && (
                  <div className="w-full text-center text-base text-slate-500 animate-fade-in">빠르게 충전하는 일반 모드입니다.</div>
                )}
                {hovered === 'optimized' && (
                  <div className="w-full text-center text-base text-slate-500 animate-fade-in">AI가 추천하는 최적의 충전 계획을 제공합니다.</div>
                )}
                {hovered === 'home' && (
                  <div className="w-full text-center text-base text-slate-500 animate-fade-in">메인 화면으로 이동합니다.</div>
                )}
              </div>
            </>
          )}
          {/* 입력값 확인 모달 */}
          <ChargeConfirmModal
            open={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={() => {
              setShowConfirm(false);
              navigate('/charge-result', {
                state: {
                  currentSoc,
                  targetSoc,
                  arrivalTime,
                  departureTime,
                  mode,
                },
              });
              resetForm();
              setMode(null);
            }}
            currentSoc={currentSoc}
            targetSoc={targetSoc}
            arrivalTime={arrivalTime}
            departureTime={departureTime}
            mode={mode as 'normal' | 'optimized'}
          />
          {(mode === 'normal' || mode === 'optimized') && (
            <ChargeForm
              currentSoc={currentSoc}
              targetSoc={targetSoc}
              arrivalTime={arrivalTime}
              departureTime={departureTime}
              error={error}
              mode={mode}
              onChange={(field, value) => {
                if (field === 'currentSoc') setCurrentSoc(value);
                if (field === 'targetSoc') setTargetSoc(value);
                if (field === 'arrivalTime') setArrivalTime(value);
                if (field === 'departureTime') setDepartureTime(value);
              }}
              onBack={() => {
                setMode(null);
                resetForm();
              }}
              onSubmit={e => {
                e.preventDefault();
                if (validate()) {
                  setShowConfirm(true);
                }
              }}
            />
          )}
      </div>
    </div>
  );
};

export default UserPage;
