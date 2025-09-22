import React, { useState } from 'react';
import IntroSection from '../components/home/IntroSection';
import AboutSection from '../components/home/AboutSection';
import VisualizationSection from '../components/home/VisualizationSection';
import DetailSection from '../components/home/DetailSection';
import DashboardSection from '../components/home/DashboardSection';
import MainScreen from './MainScreen';
import HomeLayout from '../layouts/HomeLayout';
import { type DashboardPage } from '../components/main/Sidebar';

const HomeScreen: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  const [started, setStarted] = useState(false);
  const [mainPage, setMainPage] = useState<DashboardPage | undefined>(undefined);

  const handleStart = () => {
    setStarted(true);
    setMainPage(undefined);
    if (onStart) onStart();
  };

  const handleGoToVisualization = () => {
    setStarted(true);
    setMainPage('visualization');
  };

  const handleGoToDetail = () => {
    setStarted(true);
    setMainPage('detail');
  }

  const handleGoToStats = () => {
    setStarted(true);
    setMainPage('stats');
  }

  const handleGoHome = () => {
    setStarted(false);
    setMainPage(undefined);
  };

  return started ? (
    <MainScreen initialPage={mainPage} onGoHome={handleGoHome} />
  ) : (
    <HomeLayout>
      <div className="snap-y snap-mandatory h-screen overflow-y-auto">
        <IntroSection onStart={handleStart} className="snap-start" />
        <AboutSection className="snap-start" />
        <VisualizationSection className="snap-start" onGoToMain={handleGoToVisualization} />
        <DetailSection className="snap-start" onGoToMain={handleGoToDetail} />
        <DashboardSection className="snap-start" onGoToMain={handleGoToStats} />
      </div>
    </HomeLayout>
  );
};

export default HomeScreen;