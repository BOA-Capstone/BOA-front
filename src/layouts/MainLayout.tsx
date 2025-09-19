import Sidebar, { type DashboardPage } from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';
import VisualizationSection from '../components/VisualizationSection';
import DetailSection from '../components/DetailSection';
import DashboardSection from '../components/DashboardSection';
import React, { useState } from 'react';

const MainLayout: React.FC<{ onGoHome?: () => void }> = ({ onGoHome }) => {
  const [page, setPage] = useState<DashboardPage>('dashboard');

  let content;
  switch (page) {
    case 'dashboard':
      content = <Dashboard />;
      break;
    case 'visualization':
      content = <VisualizationSection />;
      break;
    case 'detail':
      content = <DetailSection />;
      break;
    case 'stats':
      content = <DashboardSection />;
      break;
    case 'settings':
      content = <div className="p-8">설정 페이지 준비중...</div>;
      break;
    default:
      content = <Dashboard />;
  }

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* 사이드바 */}
      <Sidebar current={page} onNavigate={(page) => {
        if (page === 'home' && onGoHome) onGoHome();
        else setPage(page);
      }} />
      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="h-16 bg-black shadow flex items-center px-8">
          <div className="text-xl font-semibold bg-gradient-to-r from-[#38bdf8] to-[#7f00ff] bg-clip-text text-transparent">전기차 충전소 스케쥴링 시스템</div>
        </header>
        {/* 콘텐츠 */}
        <main className="flex-1 p-8">{content}</main>
      </div>
    </div>
  );
};

export default MainLayout;
