import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerProfile } from '../types/profile';
import { WorkoutLog, WorkoutSession } from '../types/workout';
import { ProgramEnrollment } from '../types/program';

export interface ShotSession {
  id: string;
  date: string;
  zones: Record<string, { makes: number; attempts: number }>;
  totalMakes: number;
  totalAttempts: number;
}

const KEYS = {
  PROFILE: 'pb_profile',
  LOGS: 'pb_logs',
  CURRENT_SESSION: 'pb_current_session',
  ENROLLMENT: 'pb_enrollment',
  ONBOARDING_DONE: 'pb_onboarding_done',
  SHOT_SESSIONS: 'pb_shot_sessions',
} as const;

async function get<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

async function set(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const Storage = {
  getProfile: () => get<PlayerProfile>(KEYS.PROFILE),
  setProfile: (p: PlayerProfile) => set(KEYS.PROFILE, p),

  isOnboardingDone: async () => {
    const v = await AsyncStorage.getItem(KEYS.ONBOARDING_DONE);
    return v === 'true';
  },
  setOnboardingDone: () => AsyncStorage.setItem(KEYS.ONBOARDING_DONE, 'true'),

  getLogs: async (): Promise<WorkoutLog[]> => (await get<WorkoutLog[]>(KEYS.LOGS)) ?? [],
  appendLog: async (log: WorkoutLog) => {
    const existing = await Storage.getLogs();
    await set(KEYS.LOGS, [...existing, log]);
  },

  getCurrentSession: () => get<WorkoutSession>(KEYS.CURRENT_SESSION),
  setCurrentSession: (s: WorkoutSession) => set(KEYS.CURRENT_SESSION, s),

  getEnrollment: () => get<ProgramEnrollment>(KEYS.ENROLLMENT),
  setEnrollment: (e: ProgramEnrollment | null) => set(KEYS.ENROLLMENT, e),

  getStreak: async (): Promise<number> => {
    const logs = await Storage.getLogs();
    if (logs.length === 0) return 0;
    const dates = [...new Set(logs.map((l) => l.date))].sort().reverse();
    let streak = 0;
    const expected = new Date();
    expected.setHours(0, 0, 0, 0);
    let expectedTime = expected.getTime();
    for (const dateStr of dates) {
      const d = new Date(dateStr);
      d.setHours(0, 0, 0, 0);
      const diff = Math.round((expectedTime - d.getTime()) / 86400000);
      if (diff === 0 || diff === 1) {
        streak++;
        expectedTime = d.getTime();
      } else break;
    }
    return streak;
  },

  getShotSessions: async (): Promise<ShotSession[]> =>
    (await get<ShotSession[]>(KEYS.SHOT_SESSIONS)) ?? [],
  appendShotSession: async (s: ShotSession) => {
    const existing = await Storage.getShotSessions();
    await set(KEYS.SHOT_SESSIONS, [...existing, s]);
  },
};
