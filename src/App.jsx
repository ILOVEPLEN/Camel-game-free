import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Train from './pages/Train';
import Generate from './pages/Generate';
import Progress from './pages/Progress';
import Streak from './pages/Streak';
import Onboarding from './pages/Onboarding';

function Inner() {
  const { state } = useApp();
  const [tab, setTab] = useState('home');

  if (!state.onboarded) {
    return <Onboarding />;
  }

  const pages = { home: Home, train: Train, generate: Generate, progress: Progress, streak: Streak };
  const PageComponent = pages[tab] || Home;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageComponent onNavigate={setTab} />
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Inner />
    </AppProvider>
  );
}
