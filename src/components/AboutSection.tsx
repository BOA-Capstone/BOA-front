import React from 'react';
import { useInView } from '../hooks/useInView';

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
    const { ref, inView } = useInView(0.3);

  return (
  <section
    ref={ref}
    className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#0f172a] text-white px-4 ${className || ''}`}
  >
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${inView ? 'animate-fade-in' : ''}`}>BOA EV 충전 스케줄링 시스템이란?</h2>
      <p className={`text-lg md:text-xl mb-8 text-center ${inView ? 'animate-fade-in' : ''}`}>
        BOA 시스템은 전기차 충전소의 실시간 현황, 위치, 사용 가능 여부, 주요 통계 정보를 한눈에 확인할 수 있는 플랫폼입니다.<br />
        누구나 쉽고 빠르게 주변 충전소를 찾고, 효율적으로 충전 계획을 세울 수 있도록 돕습니다.
      </p>
    </section>
  );
};

export default AboutSection;
