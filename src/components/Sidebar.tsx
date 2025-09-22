import React from 'react';

export type DashboardPage = 'summary' | 'visualization' | 'detail' | 'stats' | 'settings' | 'home';

export interface SidebarProps {
  current: DashboardPage;
  onNavigate: (page: DashboardPage) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ current, onNavigate }) => {
  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-8">BOA Dashboard</div>
      <nav className="flex flex-col gap-4">
        <button
          className={`text-left hover:text-blue-300 ${current === 'summary' ? 'font-bold text-blue-300' : ''}`}
          onClick={() => onNavigate('summary')}
        >전체 현황 요약</button>
        <button
          className={`text-left hover:text-blue-300 ${current === 'visualization' ? 'font-bold text-blue-300' : ''}`}
          onClick={() => onNavigate('visualization')}
        >충전소 현황</button>
        <button
          className={`text-left hover:text-blue-300 ${current === 'detail' ? 'font-bold text-blue-300' : ''}`}
          onClick={() => onNavigate('detail')}
        >충전소 상세 정보</button>
        <button
          className={`text-left hover:text-blue-300 ${current === 'stats' ? 'font-bold text-blue-300' : ''}`}
          onClick={() => onNavigate('stats')}
        >통계 및 분석</button>
        <button
          className={`text-left hover:text-blue-300 ${current === 'settings' ? 'font-bold text-blue-300' : ''}`}
          onClick={() => onNavigate('settings')}
        >설정</button>
      </nav>
      <div className="mt-auto pt-8">
        <button
          className="w-full py-2 rounded hover:text-blue-300 font-semibold transition-all"
          onClick={() => onNavigate('home')}
        >
          처음으로
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
