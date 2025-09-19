import { useState } from 'react';
import HomeScreen from './pages/HomeScreen';
import MainLayout from './layouts/MainLayout';

function App() {
  const [view, setView] = useState<'home' | 'main'>('home');

  // HomeScreen에서 시작하기 버튼 클릭 시 'main'으로 전환
  const handleStart = () => setView('main');
  // MainLayout에서 Sidebar의 처음으로 버튼 클릭 시 'home'으로 전환
  const handleGoHome = () => setView('home');

  return view === 'home' ? (
    <HomeScreen onStart={handleStart} />
  ) : (
    <MainLayout onGoHome={handleGoHome} />
  );
}

export default App;