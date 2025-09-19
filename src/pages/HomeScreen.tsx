import React, { useState } from 'react';
import IntroSection from '../components/IntroSection';
import AboutSection from '../components/AboutSection';
import VisualizationSection from '../components/VisualizationSection';
import DetailSection from '../components/DetailSection';
import DashboardSection from '../components/DashboardSection';
import MainLayout from '../layouts/MainLayout';

const HomeScreen: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    if (onStart) onStart();
  };

  return started ? (
    <MainLayout />
  ) : (
    <div className="snap-y snap-mandatory h-screen overflow-y-auto">
      <IntroSection onStart={handleStart} className="snap-start" />
      <AboutSection className="snap-start" />
      <VisualizationSection className="snap-start" />
      <DetailSection className="snap-start" />
      <DashboardSection className="snap-start" />
    </div>
  );
};

export default HomeScreen;