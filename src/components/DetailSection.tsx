import React from 'react';
import { useInView } from '../hooks/useInView';

interface DetailSectionProps {
  className?: string;
}

const DetailSection: React.FC<DetailSectionProps> = ({ className }) => {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className={`w-full min-h-screen flex flex-col items-center justify-center bg-black ${className || ''}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${inView ? 'animate-slide-up' : ''}`}>충전소 상세 정보</h2>
      <p className={`max-w-2xl text-lg md:text-xl mb-8 text-center ${inView ? 'animate-fade-in' : ''}`}>
        개별 충전소의 상세 정보(주소, 운영시간, 충전기 종류, 상태, 혼잡도 등)를 제공합니다.<br />
        상세 페이지 또는 팝업/모달로 확인할 수 있습니다.
      </p>
      {/* 추후 상세 정보 컴포넌트 삽입 가능 */}
    </section>
  );
};

export default DetailSection;
