import React from 'react';

const IntroScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex flex-col min-h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-600 to-blue-300 animate-fade-in">
      {/* 로고 */}
      <img
        src="/vite.svg"
        alt="BOA Logo"
        className="w-32 h-32 mb-8 drop-shadow-lg animate-slide-down"
      />
      {/* 타이틀 */}
      <h1 className="text-4xl font-extrabold text-white mb-6 animate-slide-up">
        BOA EV 충전 스케줄링 시스템
      </h1>
      {/* 시작하기 버튼 */}
      <button
        onClick={onStart}
        className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:bg-blue-100 transition-all duration-300 animate-slide-up"
      >
        시작하기
      </button>
    </div>
  );
};

export default IntroScreen;