
import React, { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import title3 from '../../assets/title3.png';

interface IntroSectionProps {
  onStart?: () => void;
  className?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onStart, className }) => {
  const { ref, inView } = useInView(0.3);
  const [optiColored, setOptiColored] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOptiColored(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section
      ref={ref}
      className={`relative flex flex-row min-h-screen w-screen bg-[#0a1033] ${className || ''}`}
      style={{
        backgroundImage: `url(${title3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex flex-col justify-center pl-16 w-full max-w-xl z-10">
        <h1 className={`text-5xl md:text-6xl font-extrabold mb-4 text-left leading-tight drop-shadow-[0_0_3px_#a855f7] ${inView ? 'animate-fade-in' : ''}`}> 
          <span
            className={
              optiColored
                ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_3px_#f472b6] transition-colors duration-700"
                : "text-white drop-shadow-[0_0_3px_#a855f7] transition-colors duration-700"
            }
          >
            Opti
          </span>
          <span className="text-white drop-shadow-[0_0_8px_#a855f7]">EV</span>
        </h1>
        <br></br>
        <h1 className={`text-3xl md:text-3xl font-extrabold mb-4 text-left leading-tight ${inView ? 'animate-fade-in' : ''}`}>
          <span className="text-white"> 전기차</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> 스케줄링</span>
          <span className="text-white"> 시스템</span>
        </h1>
        <p className={`text-lg text-slate-200 mb-8 mt-2 ${inView ? 'animate-fade-in' : ''}`}>
          전기차 충전소의 실시간 현황, 위치, 사용 가능 여부, 주요 통계 정보를 확인할 수 있는 플랫폼입니다.<br />
          누구나 쉽고 빠르게 주변 충전소를 찾고, 효율적으로 충전 계획을 세울 수 있도록 돕습니다.<br />
          플랫폼의 소개를 확인하려면 아래로 슬라이드해주십시오.
        </p>
        <div className="flex flex-row gap-4 mt-4">
          <button
            onClick={onStart}
            className={`max-w-[200px] py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-bold rounded-full shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 ${inView ? 'animate-fade-in' : ''}`}
          >
            시작하기
          </button>
          <button
            onClick={onStart}
            className={`max-w-[200px] py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-bold rounded-full shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 ${inView ? 'animate-fade-in' : ''}`}
          >
            시작하기
          </button>
        </div>
      </div>
      {/* 오른쪽 영역: 배경 이미지가 전체에 적용되므로 별도 이미지 필요 없음 */}
      <div className="flex-1" />
    </section>
  );
};

export default IntroSection;
