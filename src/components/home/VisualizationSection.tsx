import React from 'react';
import { useInView } from '../../hooks/useInView';

interface VisualizationSectionProps {
  className?: string;
}

const VisualizationSection: React.FC<VisualizationSectionProps> = ({ className }) => {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className={`relative w-full min-h-screen flex items-center justify-center bg-[url('/src/assets/photo6.jpg')] bg-cover bg-center ${className || ''}`}> 
      <div className="relative w-full max-w-xl mr-auto md:pl-20 flex flex-col text-left">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${inView ? 'animate-slide-up' : ''}`}>충전소 현황 시각화</h2>
        <p className={`text-lg md:text-xl mb-8 ${inView ? 'animate-slide-up' : ''}`}> 
          지도 기반으로 실시간 위치, 사용 가능/고장/점검 상태 등 충전소 현황을 한눈에 시각화합니다.<br />
          주변 충전소 검색, 필터링 기능도 제공합니다.
        </p>
        {/* 추후 지도/현황 컴포넌트 삽입 가능 */}
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <span className="animate-bounce text-3xl text-white drop-shadow-lg">↓</span>
        <span className="mt-1 text-sm text-white animate-fade-in">플랫폼 소개</span>
      </div>
    </section>
  );
};

export default VisualizationSection;
