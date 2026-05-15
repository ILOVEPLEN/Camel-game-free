import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

const today = () => new Date().toDateString();

const defaultState = {
  onboarded: false,
  profile: { goals: [], timePerDay: 30, equipment: [], skillLevel: 'Beginner', gymAccess: false },
  streak: { current: 0, longest: 0, lastTrainedDate: null, history: {}, freezesUsed: 0, freezesAvailable: 2 },
  favorites: [],
  completedToday: [],
  workoutLog: [],
  gymProgress: {},
  routine: null,
  achievements: [],
};

function loadState() {
  try {
    const raw = localStorage.getItem('projectball_state');
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

function saveState(state) {
  try {
    localStorage.setItem('projectball_state', JSON.stringify(state));
  } catch {}
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const update = useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      return next;
    });
  }, []);

  // Check streak on load
  useEffect(() => {
    const s = state.streak;
    if (!s.lastTrainedDate) return;
    const last = new Date(s.lastTrainedDate);
    const now = new Date();
    const diffDays = Math.floor((now - last) / 86400000);
    if (diffDays > 1) {
      update(prev => ({
        ...prev,
        streak: { ...prev.streak, current: 0 }
      }));
    }
  }, []);

  const completeTraining = useCallback((item) => {
    const todayStr = today();
    update(prev => {
      const alreadyDone = prev.completedToday.includes(todayStr);
      const streak = { ...prev.streak };
      const history = { ...streak.history };
      history[todayStr] = item.type || 'drill';

      if (!alreadyDone) {
        const last = streak.lastTrainedDate;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isConsecutive = last === yesterday.toDateString();
        streak.current = isConsecutive ? streak.current + 1 : 1;
        streak.longest = Math.max(streak.longest, streak.current);
        streak.lastTrainedDate = todayStr;
      }

      const log = [
        { date: todayStr, ...item },
        ...prev.workoutLog.slice(0, 99)
      ];

      const achievements = checkAchievements(prev.achievements, streak.current, log.length);

      return {
        ...prev,
        completedToday: alreadyDone ? prev.completedToday : [...prev.completedToday, todayStr],
        streak: { ...streak, history },
        workoutLog: log,
        achievements,
      };
    });
  }, [update]);

  const toggleFavorite = useCallback((id) => {
    update(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id)
        ? prev.favorites.filter(f => f !== id)
        : [...prev.favorites, id]
    }));
  }, [update]);

  const updateGymProgress = useCallback((exerciseId, entry) => {
    update(prev => ({
      ...prev,
      gymProgress: {
        ...prev.gymProgress,
        [exerciseId]: [entry, ...(prev.gymProgress[exerciseId] || []).slice(0, 19)]
      }
    }));
  }, [update]);

  const setProfile = useCallback((profile) => {
    update(prev => ({ ...prev, profile, onboarded: true }));
  }, [update]);

  const setRoutine = useCallback((routine) => {
    update(prev => ({ ...prev, routine }));
  }, [update]);

  const resetOnboarding = useCallback(() => {
    update(prev => ({ ...prev, onboarded: false }));
  }, [update]);

  const useStreakFreeze = useCallback(() => {
    update(prev => {
      if (prev.streak.freezesAvailable <= 0) return prev;
      const todayStr = today();
      const history = { ...prev.streak.history, [todayStr]: 'freeze' };
      return {
        ...prev,
        streak: {
          ...prev.streak,
          freezesAvailable: prev.streak.freezesAvailable - 1,
          freezesUsed: prev.streak.freezesUsed + 1,
          lastTrainedDate: todayStr,
          history,
        }
      };
    });
  }, [update]);

  const trainedToday = state.streak.lastTrainedDate === today();

  return (
    <AppContext.Provider value={{
      state,
      update,
      completeTraining,
      toggleFavorite,
      updateGymProgress,
      setProfile,
      setRoutine,
      resetOnboarding,
      useStreakFreeze,
      trainedToday,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

const MILESTONE_STREAKS = [7, 30, 50, 100, 365];

function checkAchievements(current, streak, workoutsTotal) {
  const earned = [...current];
  MILESTONE_STREAKS.forEach(days => {
    const id = `streak_${days}`;
    if (streak >= days && !earned.find(a => a.id === id)) {
      earned.push({ id, label: `${days} Day Streak`, emoji: days >= 100 ? '🏆' : '🔥', date: today() });
    }
  });
  if (workoutsTotal >= 10 && !earned.find(a => a.id === 'w10')) {
    earned.push({ id: 'w10', label: '10 Workouts Complete', emoji: '💪', date: today() });
  }
  if (workoutsTotal >= 50 && !earned.find(a => a.id === 'w50')) {
    earned.push({ id: 'w50', label: '50 Workouts Complete', emoji: '⚡', date: today() });
  }
  return earned;
}
