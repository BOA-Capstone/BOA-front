import React from 'react';
import { useInView } from '../hooks/useInView';

interface IntroSectionProps {
  onStart?: () => void;
  className?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onStart, className }) => {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className={`relative flex flex-col min-h-screen w-screen items-center justify-center bg-gradient-to-br from-[#090f68] via-blue-900 to-[#101d32] ${inView ? 'animate-fade-in' : ''} ${className || ''}`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bolt-gradient" x1="1000" y1="300" x2="1200" y2="600" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <g filter="url(#glow)">
          {/* 좌상단 */}
          <path d="M80 80 H200 V160 H320" stroke="#38bdf8" strokeWidth="3" />
          <circle cx="80" cy="80" r="10" fill="#38bdf8" />
          <circle cx="200" cy="160" r="10" fill="#38bdf8" />
          <circle cx="320" cy="160" r="10" fill="#38bdf8" />
          {/* 우상단 */}
          <path d="M1360 80 H1240 V160 H1120" stroke="#38bdf8" strokeWidth="3" />
          <circle cx="1360" cy="80" r="10" fill="#38bdf8" />
          <circle cx="1240" cy="160" r="10" fill="#38bdf8" />
          <circle cx="1120" cy="160" r="10" fill="#38bdf8" />
          {/* 좌하단 */}
          <path d="M80 720 H200 V640 H320" stroke="#22d3ee" strokeWidth="3" />
          <circle cx="80" cy="720" r="10" fill="#22d3ee" />
          <circle cx="200" cy="640" r="10" fill="#22d3ee" />
          <circle cx="320" cy="640" r="10" fill="#22d3ee" />
          {/* 우하단 */}
          <path d="M1360 720 H1240 V640 H1120" stroke="#22d3ee" strokeWidth="3" />
          <circle cx="1360" cy="720" r="10" fill="#22d3ee" />
          <circle cx="1240" cy="640" r="10" fill="#22d3ee" />
          <circle cx="1120" cy="640" r="10" fill="#22d3ee" />

          {/* 상단 중앙 세로 */}
          <path d="M320 80 V200" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="320" cy="80" r="8" fill="#38bdf8" />
          <circle cx="320" cy="200" r="8" fill="#38bdf8" />
          <path d="M1120 80 V200" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="1120" cy="80" r="8" fill="#38bdf8" />
          <circle cx="1120" cy="200" r="8" fill="#38bdf8" />
          <path d="M720 80 V200" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="720" cy="80" r="8" fill="#38bdf8" />
          <circle cx="720" cy="200" r="8" fill="#38bdf8" />

          {/* 좌측 중앙 세로 */}
          <path d="M80 320 V480" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="80" cy="320" r="7" fill="#38bdf8" />
          <circle cx="80" cy="480" r="7" fill="#38bdf8" />
          {/* 우측 중앙 세로 */}
          <path d="M1360 320 V480" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="1360" cy="320" r="7" fill="#22d3ee" />
          <circle cx="1360" cy="480" r="7" fill="#22d3ee" />
        </g>
      </svg>
      <div className="z-10 mb-8 animate-slide-down">
        {/* <img src="/src/assets/logo.png" alt="BOA Logo" className="w-24 h-24 mx-auto" /> */}
      </div>
      <h1 className={`z-10 text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-[0_0_16px_#38bdf8] ${inView ? 'animate-slide-up' : ''}`}>
        BOA EV 충전 스케줄링 시스템
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
