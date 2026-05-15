import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext(null);
const STORAGE_KEY = 'projectball_state';
const today = () => new Date().toDateString();

const defaultState = {
  onboarded: false,
  profile: { goals: [], timePerDay: 45, equipment: [], skillLevel: 'Intermediate', gymAccess: false },
  streak: { current: 0, longest: 0, lastTrainedDate: null, history: {}, freezesUsed: 0, freezesAvailable: 2 },
  favorites: [],
  workoutLog: [],
  gymProgress: {},
  routine: null,
  achievements: [],
};

export function AppProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try {
          const saved = JSON.parse(raw);
          const merged = { ...defaultState, ...saved };
          // reset streak if missed more than 1 day
          const last = merged.streak?.lastTrainedDate;
          if (last) {
            const diffDays = Math.floor((new Date() - new Date(last)) / 86400000);
            if (diffDays > 1) merged.streak = { ...merged.streak, current: 0 };
          }
          // reset monthly freezes
          const now = new Date();
          const lastMonth = saved._lastFreezeReset;
          if (!lastMonth || new Date(lastMonth).getMonth() !== now.getMonth()) {
            merged.streak = { ...merged.streak, freezesAvailable: 2 };
            merged._lastFreezeReset = today();
          }
          setState(merged);
        } catch {}
      }
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, loaded]);

  const completeTraining = useCallback((item) => {
    setState(prev => {
      const todayStr = today();
      const alreadyDone = prev.streak.lastTrainedDate === todayStr;
      const streak = { ...prev.streak };
      const history = { ...streak.history, [todayStr]: item.type || 'drill' };

      if (!alreadyDone) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isConsecutive = streak.lastTrainedDate === yesterday.toDateString();
        streak.current = isConsecutive ? streak.current + 1 : 1;
        streak.longest = Math.max(streak.longest, streak.current);
        streak.lastTrainedDate = todayStr;
      }

      const log = [{ date: todayStr, ...item }, ...prev.workoutLog.slice(0, 99)];
      const achievements = checkAchievements(prev.achievements, streak.current, log.length);
      return { ...prev, streak: { ...streak, history }, workoutLog: log, achievements };
    });
  }, []);

  const toggleFavorite = useCallback((id) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id)
        ? prev.favorites.filter(f => f !== id)
        : [...prev.favorites, id],
    }));
  }, []);

  const setProfile = useCallback((profile) => {
    setState(prev => ({ ...prev, profile, onboarded: true }));
  }, []);

  const setRoutine = useCallback((routine) => {
    setState(prev => ({ ...prev, routine }));
  }, []);

  const useStreakFreeze = useCallback(() => {
    setState(prev => {
      if (prev.streak.freezesAvailable <= 0) return prev;
      const todayStr = today();
      return {
        ...prev,
        streak: {
          ...prev.streak,
          freezesAvailable: prev.streak.freezesAvailable - 1,
          freezesUsed: prev.streak.freezesUsed + 1,
          lastTrainedDate: todayStr,
          history: { ...prev.streak.history, [todayStr]: 'freeze' },
        },
      };
    });
  }, []);

  const trainedToday = state.streak.lastTrainedDate === today();

  return (
    <AppContext.Provider value={{ state, loaded, completeTraining, toggleFavorite, setProfile, setRoutine, useStreakFreeze, trainedToday }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

const MILESTONES = [7, 30, 50, 100, 365];

function checkAchievements(current, streak, totalWorkouts) {
  const earned = [...current];
  MILESTONES.forEach(days => {
    const id = `streak_${days}`;
    if (streak >= days && !earned.find(a => a.id === id)) {
      earned.push({ id, label: `${days} Day Streak`, emoji: days >= 100 ? '🏆' : '🔥', date: today() });
    }
  });
  if (totalWorkouts >= 10 && !earned.find(a => a.id === 'w10'))
    earned.push({ id: 'w10', label: '10 Workouts Complete', emoji: '💪', date: today() });
  if (totalWorkouts >= 50 && !earned.find(a => a.id === 'w50'))
    earned.push({ id: 'w50', label: '50 Workouts Complete', emoji: '⚡', date: today() });
  return earned;
}
