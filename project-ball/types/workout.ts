import { Drill } from './drill';

export type SessionBlock = 'warmup' | 'skill' | 'conditioning' | 'lift' | 'cooldown';

export interface SessionDrill {
  drill: Drill;
  block: SessionBlock;
  targetSets?: number;
  targetReps?: number;
  targetDuration?: number; // seconds
}

export interface WorkoutSession {
  id: string;
  date: string; // ISO date
  drills: SessionDrill[];
  estimatedMinutes: number;
  programId?: string;
  programDay?: number;
}

export interface DrillLog {
  drillId: string;
  makes?: number;
  attempts?: number;
  weight?: number;
  reps?: number;
  sets?: number;
  notes?: string;
}

export interface WorkoutLog {
  id: string;
  sessionId: string;
  date: string;
  drillLogs: DrillLog[];
  rpe: number; // 1-10
  note?: string;
  durationMinutes: number;
}
