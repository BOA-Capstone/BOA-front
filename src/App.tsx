
import React, { useState } from 'react';
import IntroScreen from './pages/IntroScreen';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';

function App() {
  const [started, setStarted] = useState(false);

  if (!started) 
    return <IntroScreen onStart={() => setStarted(true)} />;

  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

export default App;
