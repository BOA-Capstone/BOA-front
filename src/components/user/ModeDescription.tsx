import React from 'react';

interface ModeDescriptionProps {
  hovered: 'normal' | 'optimized' | 'home' | null;
}


const ModeDescription: React.FC<ModeDescriptionProps> = ({ hovered }) => {
  let text = '';
  if (hovered === 'normal') {
    text = '빠르게 충전하는 일반 모드입니다.';
  } else if (hovered === 'optimized') {
    text = 'AI가 추천하는 최적의 충전 계획을 제공합니다.';
  } else if (hovered === 'home') {
    text = '메인 화면으로 이동합니다.';
  }
  return (
    <div className="w-full min-h-[32px] flex items-end justify-center">
      {text && (
        <div className="w-full text-center text-base text-[var(--cyan)] animate-fade-in">{text}</div>
      )}
    </div>
  );
};

export default ModeDescription;
