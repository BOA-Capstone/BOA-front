import React from 'react';
import { useNavigate } from 'react-router-dom';
import IntroSection from '../components/home/IntroSection';
import VisualizationSection from '../components/home/UserSection';
import DetailSection from '../components/home/AdminSection';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-auto">
      <IntroSection
        className="snap-start"
        onAdminClick={() => navigate('/admin')}
        onUserClick={() => navigate('/user')}
      />
      <VisualizationSection className="snap-start" />
      <DetailSection className="snap-start" />
    </div>
  );
};

export default HomeScreen;