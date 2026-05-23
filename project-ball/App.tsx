import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Storage } from './lib/storage';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { SubscriptionProvider, useSubscription } from './context/SubscriptionContext';
import OnboardingNavigator from './screens/onboarding/OnboardingNavigator';
import HomeScreen from './screens/HomeScreen';
import DrillsScreen from './screens/DrillsScreen';
import DrillDetailScreen from './screens/DrillDetailScreen';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DrillDetailScreenAny = DrillDetailScreen as any;
import ProgramsScreen from './screens/ProgramsScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShotTrackerScreen from './screens/ShotTrackerScreen';
import PaywallScreen from './screens/PaywallScreen';

const Tab = createBottomTabNavigator();
const DrillsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function DrillsStackNavigator() {
  const { colors } = useTheme();
  return (
    <DrillsStack.Navigator>
      <DrillsStack.Screen name="DrillList" component={DrillsScreen} options={{ headerShown: false }} />
      <DrillsStack.Screen
        name="DrillDetail"
        component={DrillDetailScreenAny}
        options={({ route }: any) => ({
          title: (route.params?.drill?.name ?? 'Drill'),
          headerBackTitle: 'Library',
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { fontWeight: '700', color: colors.textDark },
        })}
      />
    </DrillsStack.Navigator>
  );
}

function HomeStackNavigator({ onReset }: { onReset: () => void }) {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="DrillDetail"
        component={DrillDetailScreenAny}
        options={({ route }: any) => ({
          title: (route.params?.drill?.name ?? 'Drill'),
          headerBackTitle: 'Today',
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { fontWeight: '700', color: colors.textDark },
        })}
      />
    </HomeStack.Navigator>
  );
}

const TAB_ICONS: Record<string, string> = {
  Today: '🏠',
  Drills: '📋',
  Programs: '📅',
  Shots: '🏀',
  Progress: '📊',
  Profile: '👤',
};

function AppNavigator({ onReset }: { onReset: () => void }) {
  const { colors, isDark } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>{TAB_ICONS[route.name] ?? '○'}</Text>,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textLight,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.surfaceBorder,
            borderTopWidth: 1,
            paddingBottom: 4,
            height: 60,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Today">
          {() => <HomeStackNavigator onReset={onReset} />}
        </Tab.Screen>
        <Tab.Screen name="Drills" component={DrillsStackNavigator} />
        <Tab.Screen name="Programs" component={ProgramsScreen} />
        <Tab.Screen name="Shots" component={ShotTrackerScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Profile">
          {() => <ProfileScreen onReset={onReset} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function AppRoot() {
  const { colors, isDark } = useTheme();
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  const checkOnboarding = useCallback(async () => {
    const done = await Storage.isOnboardingDone();
    setOnboarded(done);
    setReady(true);
  }, []);

  useEffect(() => { checkOnboarding(); }, [checkOnboarding]);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!onboarded) {
    return <OnboardingNavigator onComplete={() => setOnboarded(true)} />;
  }

  return <AppNavigator onReset={() => setOnboarded(false)} />;
}

function AppWithPaywall() {
  const { paywallVisible, hidePaywall } = useSubscription();
  return (
    <>
      <AppRoot />
      <Modal visible={paywallVisible} animationType="slide" presentationStyle="fullScreen" onRequestClose={hidePaywall}>
        <PaywallScreen />
      </Modal>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SubscriptionProvider>
        <AppWithPaywall />
      </SubscriptionProvider>
    </ThemeProvider>
  );
}
