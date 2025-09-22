import Sidebar, { type DashboardPage } from '../components/main/Sidebar';
import Summary from '../components/main/Summary';
import StationVisualization from '../components/main/StationVisualization';
import StationDetail from '../components/main/StationDetail';
import Statistics from '../components/main/Statistics';
import React, { useState } from 'react';
import SettingsModal from '../components/main/SettingsModal';

const MainLayout: React.FC<{ onGoHome?: () => void }> = ({ onGoHome }) => {
  const [page, setPage] = useState<DashboardPage>('summary');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

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
    // 'settings'는 모달로 처리하므로 content 변경 없음
    default:
      content = <Summary />;
  }

  return (
    <div className="flex h-screen w-screen">
      {/* 사이드바 */}
      <Sidebar current={page} onNavigate={(nextPage) => {
        if (nextPage === 'home' && onGoHome) onGoHome();
        else if (nextPage === 'settings') setShowSettingsModal(true);
        else setPage(nextPage);
      }} />
      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="h-16 bg-black shadow flex items-center px-8">
          <div className="text-xl font-semibold bg-gradient-to-r from-[#38bdf8] to-[#7f00ff] bg-clip-text text-transparent">전기차 충전소 스케쥴링 시스템</div>
        </header>
        {/* 콘텐츠 */}
        <main className="flex-1 relative">
          {content}
          {showSettingsModal && (
            <SettingsModal onClose={() => setShowSettingsModal(false)} />
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
