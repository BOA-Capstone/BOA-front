import React from 'react';
import { useInView } from '../hooks/useInView';

interface DashboardSectionProps {
  className?: string;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ className }) => {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className={`w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0033] via-[#0a1f44] to-[#38bdf8] ${className || ''}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${inView ? 'animate-slide-up' : ''}`}>통계 및 분석</h2>
      <p className={`max-w-2xl text-lg md:text-xl mb-8 text-center ${inView ? 'animate-fade-in' : ''}`}>
        전체 및 지역별 통계(가동률, 혼잡도, 이용률 등)를 그래프와 차트로 시각화합니다.<br />
        주요 지표와 트렌드를 한눈에 확인할 수 있습니다.
      </p>
      {/* 추후 대시보드/통계 컴포넌트 삽입 가능 */}
    </section>
  );
};

export default DashboardSection;
