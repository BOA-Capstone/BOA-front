import React from 'react';
import { useInView } from '../../hooks/useInView';

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
    const { ref, inView } = useInView(0.3);

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center justify-center bg-[url('/src/assets/photo3.jpg')] bg-cover bg-center text-white px-4 ${className || ''}`}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-2xl ml-auto md:pr-24 flex flex-col items-center -translate-y-5">
        <h2 className={`text-3xl md:text-4xl font-bold mb-5 ${inView ? 'animate-fade-in' : ''}`}>BOA EV 충전 스케줄링 시스템이란?</h2>
        <p className={`text-xl mb-8 ${inView ? 'animate-fade-in' : ''}`}>
          전기차 충전소의 실시간 현황, 위치, 사용 가능 여부, 주요 통계 정보를 확인할 수 있는 플랫폼입니다.<br />
          누구나 쉽고 빠르게 주변 충전소를 찾고, 효율적으로 충전 계획을 세울 수 있도록 돕습니다.
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <span className="animate-bounce text-3xl text-white drop-shadow-lg">↓</span>
        <span className="mt-1 text-sm text-white animate-fade-in">플랫폼 소개</span>
      </div>
    </section>
  );
};

export default AboutSection;
