import React from 'react';
import { useInView } from '../../hooks/useInView';
import { useNavigate } from 'react-router-dom';

interface VisualizationSectionProps {
  className?: string;
  onGoToMain?: () => void;
}

const VisualizationSection: React.FC<VisualizationSectionProps> = ({ className }) => {
  const { ref, inView } = useInView(0.3);
  const navigate = useNavigate();
  const handleGoToUser = () => {
    navigate('/user');
  };
  return (
    <section ref={ref} className={`relative w-full min-h-screen flex items-center justify-center text-white bg-[url('/src/assets/photo6.jpg')] bg-cover bg-center ${className || ''}`}> 
      <div className="relative w-full max-w-xl mr-auto md:pl-20 flex flex-col text-left">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${inView ? 'animate-slide-up' : ''}`}>사용자 모드</h2>
        <p className={`text-lg md:text-xl mb-8 ${inView ? 'animate-slide-up' : ''}`}> 
          목표 배터리, 출차 시각 등 사용자 정보를 통해 최적의 충전 비용을 계산합니다.<br />
          TOU만 사용한 급속 충전, AI 기반의 최적화 충전이 존재합니다.<br />
        </p>
        <button
          className={`mt-4 px-8 py-3 bg-white/20 border border-blue-300 text-blue-100 font-bold rounded-full shadow-lg backdrop-blur hover:bg-blue-100 hover:text-black transition-all duration-200 w-fit ${inView ? 'animate-slide-up' : ''}`}
          onClick={handleGoToUser}
        >
          이동하기
        </button>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <span className="animate-bounce text-3xl text-white drop-shadow-lg">↓</span>
        <span className="mt-1 text-sm text-white animate-fade-in">플랫폼 소개</span>
      </div>
    </section>
  );
};

export default VisualizationSection;
