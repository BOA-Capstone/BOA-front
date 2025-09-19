import React, { useState } from 'react';
import IntroSection from '../components/IntroSection';
import AboutSection from '../components/AboutSection';
import FeatureSection from '../components/FeatureSection';
import MainLayout from '../layouts/MainLayout';
import Dashboard from './Dashboard';

const HomeScreen: React.FC = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return started ? (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  ) : (
    <>
      <IntroSection onStart={handleStart} />
      <AboutSection />
      <FeatureSection />
    </>
  );
};

export default HomeScreen;