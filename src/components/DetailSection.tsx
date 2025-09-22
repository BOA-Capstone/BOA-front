import React from 'react';
import { useInView } from '../hooks/useInView';

interface DetailSectionProps {
  className?: string;
}

const DetailSection: React.FC<DetailSectionProps> = ({ className }) => {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className={`relative flex items-center justify-center min-h-screen w-screen bg-[url('/src/assets/photo4.jpg')] bg-cover bg-center ${className || ''}`}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center text-center translate-y-8">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${inView ? 'animate-slide-up' : ''}`}>충전소 상세 정보</h2>
        <p className={`text-lg md:text-xl mb-8 ${inView ? 'animate-slide-up' : ''}`}> 
          개별 충전소의 상세 정보(주소, 운영시간, 충전기 종류, 상태, 혼잡도 등)를 제공합니다.<br />
          상세 페이지 또는 팝업/모달로 확인할 수 있습니다.
        </p>
        {/* 추후 상세 정보 컴포넌트 삽입 가능 */}
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <span className="animate-bounce text-3xl text-white drop-shadow-lg">↓</span>
        <span className="mt-1 text-sm text-white animate-fade-in">플랫폼 소개</span>
      </div>
    </section>
  );
};

export default DetailSection;
