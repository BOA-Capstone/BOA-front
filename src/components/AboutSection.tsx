import React from 'react';

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <section className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 text-white px-4 ${className || ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">전기차 충전소 이용을 더욱 스마트하게</h2>
      <p className="max-w-2xl text-lg md:text-xl mb-8 text-center animate-fade-in">
        BOA EV 충전 스케줄링 시스템은 전기차 충전소의 실시간 현황, 위치, 사용 가능 여부, 주요 통계 정보를 한눈에 확인할 수 있는 플랫폼입니다.<br />
        누구나 쉽고 빠르게 주변 충전소를 찾고, 효율적으로 충전 계획을 세울 수 있도록 돕습니다.
      </p>
    </section>
  );
};

export default AboutSection;
