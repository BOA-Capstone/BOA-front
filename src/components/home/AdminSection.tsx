import React from 'react';
import { useInView } from '../../hooks/useInView';
import { useNavigate } from 'react-router-dom';

interface DetailSectionProps {
  className?: string;
  onGoToMain?: () => void;
}

const DetailSection: React.FC<DetailSectionProps> = ({ className }) => {
  const { ref, inView } = useInView(0.3);
  const navigate = useNavigate();
  const handleGoToAdmin = () => {
    navigate('/admin');
  };
  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center justify-center bg-[url('/src/assets/photo3.jpg')] bg-cover bg-center text-white px-4 ${className || ''}`}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-2xl ml-auto md:pr-24 flex flex-col items-end text-left -translate-y-5">
  <div className="w-full bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6 sm:p-10 flex flex-col items-start text-left transition-all duration-300 mx-auto md:mx-0">
          <h2 className={`text-3xl md:text-4xl font-bold mb-5 w-full text-left ${inView ? 'animate-slide-up' : ''}`}>관리자 모드</h2>
          <p className={`text-lg md:text-xl mb-8 w-full text-left ${inView ? 'animate-slide-up' : ''}`}> 
            충전소 관리자 입장에서 운영 비용의 최적화를 목표로 합니다.<br />
            24시간 기준으로 차량 스케줄을 입력받아 최적의 충전 계획을 수립합니다.<br />
          </p>
          <button
            className={`mt-4 px-8 py-3 bg-white/20 border border-blue-300 text-blue-100 font-bold rounded-full shadow-lg backdrop-blur hover:bg-blue-100 hover:text-black transition-all duration-200 w-fit ${inView ? 'animate-slide-up' : ''}`}
            onClick={handleGoToAdmin}>
            이동하기
          </button>
        </div>
        {/* 추후 상세 정보 컴포넌트 삽입 가능 */}
      </div>
    </section>
  );
};

export default DetailSection;
