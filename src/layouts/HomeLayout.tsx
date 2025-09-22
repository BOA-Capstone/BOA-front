import React from 'react';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* 본문 영역 */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      {/* 푸터 영역 (필요시 추가) */}
      <footer className="bg-white border-t text-sm text-gray-500 text-center z-50">
        &copy; 2025 BOA Service. All rights reserved.
      </footer>
    </div>
  );
};

export default HomeLayout;
