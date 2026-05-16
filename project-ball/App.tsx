import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Storage } from './lib/storage';
import { Colors } from './theme/colors';
import OnboardingNavigator from './screens/onboarding/OnboardingNavigator';
import HomeScreen from './screens/HomeScreen';
import DrillsScreen from './screens/DrillsScreen';
import DrillDetailScreen from './screens/DrillDetailScreen';
import ProgramsScreen from './screens/ProgramsScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const DrillsStack = createNativeStackNavigator();

function DrillsStackNavigator() {
  return (
    <DrillsStack.Navigator>
      <DrillsStack.Screen name="DrillList" component={DrillsScreen} options={{ headerShown: false }} />
      <DrillsStack.Screen
        name="DrillDetail"
        component={DrillDetailScreen}
        options={({ route }: any) => ({
          title: (route.params?.drill?.name ?? 'Drill'),
          headerBackTitle: 'Library',
          headerTintColor: Colors.primary,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerTitleStyle: { fontWeight: '700', color: Colors.textDark },
        })}
      />
    </DrillsStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeStackNavigator({ onReset }: { onReset: () => void }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="DrillDetail"
        component={DrillDetailScreen}
        options={({ route }: any) => ({
          title: (route.params?.drill?.name ?? 'Drill'),
          headerBackTitle: 'Today',
          headerTintColor: Colors.primary,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerTitleStyle: { fontWeight: '700', color: Colors.textDark },
        })}
      />
    </HomeStack.Navigator>
  );
}

const TAB_ICONS: Record<string, string> = {
  Today: '🏠',
  Drills: '📋',
  Programs: '📅',
  Progress: '📊',
  Profile: '👤',
};

export default function App() {
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  if (!onboarded) {
    return <OnboardingNavigator onComplete={() => setOnboarded(true)} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>{TAB_ICONS[route.name] ?? '○'}</Text>,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textLight,
          tabBarStyle: {
            backgroundColor: Colors.background,
            borderTopColor: Colors.surfaceBorder,
            borderTopWidth: 1,
            paddingBottom: 4,
            height: 60,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Today">
          {() => <HomeStackNavigator onReset={() => setOnboarded(false)} />}
        </Tab.Screen>
        <Tab.Screen name="Drills" component={DrillsStackNavigator} />
        <Tab.Screen name="Programs" component={ProgramsScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Profile">
          {() => <ProfileScreen onReset={() => setOnboarded(false)} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
