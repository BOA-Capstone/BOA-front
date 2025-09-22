import React, { useState } from 'react';
import IntroSection from '../components/home/IntroSection';
import AboutSection from '../components/home/AboutSection';
import VisualizationSection from '../components/home/VisualizationSection';
import DetailSection from '../components/home/DetailSection';
import DashboardSection from '../components/home/DashboardSection';
import MainLayout from '../layouts/MainLayout';
import HomeLayout from '../layouts/HomeLayout';

const HomeScreen: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    if (onStart) onStart();
  };

  return started ? (
    <MainLayout />
  ) : (
    <HomeLayout>
      <div className="snap-y snap-mandatory h-screen overflow-y-auto">
        <IntroSection onStart={handleStart} className="snap-start" />
        <AboutSection className="snap-start" />
        <VisualizationSection className="snap-start" />
        <DetailSection className="snap-start" />
        <DashboardSection className="snap-start" />
      </div>
    </HomeLayout>
  );
};

export default HomeScreen;