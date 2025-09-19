
import { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import IntroSection from './components/IntroSection';

function App() {
  const [started, setStarted] = useState(false);

  if (!started) 
    return <IntroSection onStart={() => setStarted(true)} />;

  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

export default App;
