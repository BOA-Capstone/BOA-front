import React from 'react';
import { useInView } from '../../hooks/useInView';

interface DashboardSectionProps {
  className?: string;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ className }) => {
  const { ref, inView } = useInView(0.3);

  return (
    <section ref={ref} className={`relative w-full min-h-screen flex items-center justify-center bg-[url('/src/assets/photo5.jpg')] bg-cover bg-center text-black ${className || ''}`}> 
      <div className="relative w-full max-w-xl mr-auto flex flex-col items-center text-center md:items-start md:text-left md:pl-20">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${inView ? 'animate-slide-up' : ''}`}>통계 및 분석</h2>
        <p className={`text-lg md:text-xl mb-8 ${inView ? 'animate-slide-up' : ''}`}> 
          전체 및 지역별 통계(가동률, 혼잡도, 이용률)를 시각화합니다.<br />
          주요 지표와 트렌드를 한눈에 확인할 수 있습니다.
        </p>
        {/* 추후 대시보드/통계 컴포넌트 삽입 가능 */}
      </div>
    </section>
  );
};

export default DashboardSection;
