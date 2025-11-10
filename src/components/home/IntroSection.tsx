import React, { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import title3 from '../../assets/title3.png';


interface IntroSectionProps {
  onAdminClick?: () => void;
  onUserClick?: () => void;
  className?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onAdminClick, onUserClick, className }) => {
  const { ref, inView } = useInView(0.3);
  const [optiColored, setOptiColored] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOptiColored(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section
      ref={ref}
      className={`relative flex flex-col sm:flex-row min-h-screen w-screen bg-[#0a1033] ${className || ''}`}
      style={{
        backgroundImage: `url(${title3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex flex-col justify-center items-center sm:items-start px-4 sm:pl-16 w-full max-w-xl z-10 mx-auto sm:mx-0">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-center sm:text-left leading-tight drop-shadow-[0_0_3px_#a855f7] ${inView ? 'animate-fade-in' : ''}`}> 
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
        <h1 className={`text-2xl sm:text-3xl font-extrabold mb-4 text-center sm:text-left leading-tight ${inView ? 'animate-fade-in' : ''}`}> 
          <span className="text-white"> 전기차</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> 스케줄링</span>
          <span className="text-white"> 시스템</span>
        </h1>
        <p className={`text-base sm:text-lg text-slate-200 mb-8 mt-2 text-center sm:text-left ${inView ? 'animate-fade-in' : ''}`}>
          OptiEV는 전기차 충전소 스케줄링 플랫폼입니다.<br />
          충전소 관리자와 충전소 사용자 모두에게 새로운 경험을 제공합니다.<br />
          플랫폼의 소개를 확인하려면 아래로 슬라이드해주십시오.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full items-center sm:items-start">
          <button
            onClick={onAdminClick}
            className={`w-full sm:w-[180px] py-4 bg-primary text-primary-foreground text-lg font-bold rounded-md shadow-lg border border-accent hover:border-[#a855f7] hover:text-[#a855f7] transition-all duration-300 ${inView ? 'animate-fade-in' : ''}`}
          >
            관리자
          </button>
          <button
            onClick={onUserClick}
            className={`w-full sm:w-[180px] py-4 bg-primary text-primary-foreground text-lg font-bold rounded-md shadow-lg border border-accent hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all duration-300 ${inView ? 'animate-fade-in' : ''}`}
          >
            사용자
          </button>
        </div>
      </div>
      <div className="hidden sm:flex flex-1" />
    </section>
  );
};

export default IntroSection;
