import React, { useState } from 'react';
import { Button } from '../components/ui/button';

const UserPage: React.FC = () => {
  const [mode, setMode] = useState<'normal' | 'optimized' | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-slate-50 to-slate-200">
      <h1 className="text-3xl font-bold mb-8">충전 방식 선택</h1>
      <div className="flex flex-col gap-6 mb-10 w-full max-w-xs">
        <Button
          variant={mode === 'normal' ? 'default' : 'outline'}
          size="lg"
          className="w-full text-lg"
          onClick={() => setMode('normal')}
        >
          급속 충전
        </Button>
        <Button
          variant={mode === 'optimized' ? 'default' : 'outline'}
          size="lg"
          className="w-full text-lg"
          onClick={() => setMode('optimized')}
        >
          최적화 충전
        </Button>
      </div>
      {mode && (
        <div className="text-xl font-semibold text-slate-700">
          {mode === 'normal' ? '일반 충전 방식을 선택하셨습니다.' : '최적화 충전 방식을 선택하셨습니다.'}
        </div>
      )}
    </div>
  );
};

export default UserPage;
