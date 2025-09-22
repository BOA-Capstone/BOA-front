import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { type DashboardPage } from '../components/main/Sidebar';

interface MainScreenProps {
  initialPage?: DashboardPage;
  onGoHome?: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ initialPage, onGoHome }) => {
  return <MainLayout initialPage={initialPage} onGoHome={onGoHome} />;
};

export default MainScreen;
