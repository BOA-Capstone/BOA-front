import React from 'react';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
  <div className="flex min-h-screen w-screen bg-gray-50">
      {/* 사이드바 */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
        <div className="text-2xl font-bold mb-8">BOA Dashboard</div>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-blue-300">대시보드</a>
          <a href="#" className="hover:text-blue-300">충전소 관리</a>
          <a href="#" className="hover:text-blue-300">에너지 거래</a>
          <a href="#" className="hover:text-blue-300">설정</a>
        </nav>
      </aside>
      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="h-16 bg-black shadow flex items-center px-8">
          <div className="text-xl font-semibold">전기차 충전소 스케쥴링 시스템</div>
        </header>
        {/* 콘텐츠 */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
