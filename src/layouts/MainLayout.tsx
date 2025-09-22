import Sidebar, { type DashboardPage } from '../components/Sidebar';
import Summary from '../components/Summary';
import StationVisualization from '../components/StationVisualization';
import StationDetail from '../components/StationDetail';
import Statistics from '../components/Statistics';
import React, { useState } from 'react';

const MainLayout: React.FC<{ onGoHome?: () => void }> = ({ onGoHome }) => {
  const [page, setPage] = useState<DashboardPage>('summary');

  let content;
  switch (page) {
    case 'summary':
      content = <Summary />;
      break;
    case 'visualization':
      content = <StationVisualization />;
      break;
    case 'detail':
      content = <StationDetail />;
      break;
    case 'stats':
      content = <Statistics />;
      break;
    case 'settings':
      content = <div className="p-8">설정 페이지 준비중...</div>;
      break;
    default:
      content = <Summary />;
  }

  return (
    <div className="flex h-screen w-screen">
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
        <main className="flex-1">{content}</main>
      </div>
    </div>
  );
};

export default MainLayout;
