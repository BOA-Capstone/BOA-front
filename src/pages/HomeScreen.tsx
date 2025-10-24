import React from 'react';    
import IntroSection from '../components/home/IntroSection';
import UserSection from '../components/home/UserSection';
import AdminSection from '../components/home/AdminSection';

const HomeScreen: React.FC = () => {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-auto">
      <IntroSection className="snap-start" />
      <UserSection className="snap-start" />
      <AdminSection className="snap-start" />
    </div>
  );
};

export default HomeScreen;