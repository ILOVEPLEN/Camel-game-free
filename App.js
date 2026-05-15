import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useApp } from './src/context/AppContext';
import BottomTabBar from './src/components/BottomTabBar';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import TrainScreen from './src/screens/TrainScreen';
import GenerateScreen from './src/screens/GenerateScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import StreakScreen from './src/screens/StreakScreen';

function Root() {
  const { state, loaded } = useApp();
  const [tab, setTab] = useState('home');

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0EA5E9' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!state.onboarded) {
    return <OnboardingScreen />;
  }

  const screens = { home: HomeScreen, train: TrainScreen, generate: GenerateScreen, progress: ProgressScreen, streak: StreakScreen };
  const Screen = screens[tab] || HomeScreen;

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F7FF' }}>
      <Screen onNavigate={setTab} />
      <BottomTabBar active={tab} onChange={setTab} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppProvider>
        <Root />
      </AppProvider>
    </SafeAreaProvider>
  );
}
