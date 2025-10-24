import React from 'react';
import { useInView } from '../../hooks/useInView';

interface DetailSectionProps {
  className?: string;
  onGoToMain?: () => void;
}

const DetailSection: React.FC<DetailSectionProps> = ({ className, onGoToMain }) => {
  const { ref, inView } = useInView(0.3);
  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center justify-center bg-[url('/src/assets/photo3.jpg')] bg-cover bg-center text-white px-4 ${className || ''}`}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-2xl ml-auto md:pr-24 flex flex-col items-end text-right -translate-y-5">
        <h2 className={`text-3xl md:text-4xl font-bold mb-5 ${inView ? 'animate-slide-up' : ''}`}>충전소 상세 정보</h2>
        <p className={`text-lg md:text-xl mb-8 ${inView ? 'animate-slide-up' : ''}`}>
          개별 충전소의 상세 정보(주소, 운영시간, 상태, 혼잡도 등)를 제공합니다.<br />
          상세 페이지 또는 팝업/모달로 확인할 수 있습니다.
        </p>
        <button
          className={`mt-4 px-8 py-3 bg-white/20 border border-blue-300 text-blue-100 font-bold rounded-full shadow-lg backdrop-blur hover:bg-blue-100 hover:text-black transition-all duration-200 w-fit ${inView ? 'animate-slide-up' : ''}`}
          onClick={onGoToMain}
        >
          이동하기
        </button>
        {/* 추후 상세 정보 컴포넌트 삽입 가능 */}
      </div>
    </section>
  );
};

export default DetailSection;
