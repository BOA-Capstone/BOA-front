import React from 'react';
import { useInView } from '../hooks/useInView';

interface IntroSectionProps {
  onStart?: () => void;
  className?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onStart, className }) => {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className={`relative flex flex-col min-h-screen w-screen items-center justify-center bg-[url('/src/assets/title1.jpg')] bg-cover bg-center ${inView ? 'animate-fade-in' : ''} ${className || ''}`}>
      
      <div className="z-10 mb-8 animate-slide-down">
        {/* <img src="/src/assets/logo.png" alt="BOA Logo" className="w-24 h-24 mx-auto" /> */}
      </div>
      <h1 className={`z-10 text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-[0_0_16px_#38bdf8] ${inView ? 'animate-fade-in' : ''}`}>
        EV 충전 스케줄링 시스템
      </h1>
      <button
        onClick={onStart}
        className={`z-10 mt-10 px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xl font-bold rounded-full shadow-lg border-2 border-blue-300 hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 drop-shadow-[0_0_8px_#38bdf8] ${inView ? 'animate-fade-in' : ''}`}
      >
        <span className="inline-flex items-center gap-2 animation-fade-in">
          시작하기
        </span>
      </button>
      {/* 아래로 스크롤 안내 플로팅 아이콘 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <span className="animate-bounce text-3xl text-cyan-300 drop-shadow-lg">↓</span>
        <span className="mt-1 text-sm text-cyan-200 animate-fade-in">플랫폼 소개</span>
      </div>
    </section>
  );
};

export default IntroSection;
