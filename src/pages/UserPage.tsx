import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const UserPage: React.FC = () => {
  const [mode, setMode] = useState<'normal' | 'optimized' | null>(null);
  const [hovered, setHovered] = useState<'normal' | 'optimized' | 'home' | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen px-0 bg-gradient-to-b from-slate-50 to-slate-200 flex flex-col items-center justify-center text-left">
      <div className="fixed top-0 left-0 w-full z-30">
  <div className="w-full bg-gradient-to-r from-black via-black to-cyan-400 text-white text-center text-xl font-bold py-4 shadow-lg">
          OptiEV 사용자 모드
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
          {(mode === 'normal' || mode === 'optimized') && (
            <form className="w-full flex flex-col gap-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-2 text-center">
                {mode === 'normal' ? '급속 충전 정보 입력' : '최적화 충전 정보 입력'}
              </h2>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">현재 SoC(%)</label>
                <Input type="number" min={0} max={100} placeholder="예: 30" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">목표 SoC(%)</label>
                <Input type="number" min={0} max={100} placeholder="예: 80" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">차량 도착 시간</label>
                <Input type="time" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">출차 희망 시간</label>
                <Input type="time" />
              </div>
              <div className="flex flex-row gap-4 mt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setMode(null)}>
                  뒤로
                </Button>
                <Button type="submit" variant="default" className="flex-1">
                  충전 요청
                </Button>
              </div>
            </form>
          )}
      </div>
    </div>
  );
};

export default UserPage;
