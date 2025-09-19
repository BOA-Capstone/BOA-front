import React from 'react';
import { useInView } from '../hooks/useInView';

interface FeatureSectionProps {
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ className }) => {
    const { ref, inView } = useInView(0.3);

  return (
    <section ref={ref} className={`w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 ${className || ''}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${inView ? 'animate-slide-up' : ''}`}>주요 기능</h2>
      <ul className={`max-w-2xl text-lg md:text-xl space-y-6 ${inView ? 'animate-fade-in' : ''}`}>
        <li>🔋 실시간 충전소 현황 및 위치 지도</li>
        <li>⚡ 충전기별 사용 가능/고장/점검 상태 표시</li>
        <li>📊 대시보드에서 주요 통계/가동률/혼잡도 시각화</li>
        <li>🗺️ 주변 충전소 빠른 검색 및 필터</li>
        <li>🔔 고장/점검/공지 알림 안내</li>
      </ul>
    </section>
  );
};

export default FeatureSection;
