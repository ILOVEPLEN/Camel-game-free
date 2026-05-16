import { WorkoutLog } from '../types/workout';
import { Storage } from './storage';

export interface VolumeState {
  multiplier: number; // 0.8 – 1.2
  consecutiveHighRPE: number;
  consecutiveLowRPE: number;
}

const DEFAULT_STATE: VolumeState = {
  multiplier: 1.0,
  consecutiveHighRPE: 0,
  consecutiveLowRPE: 0,
};

export async function computeVolumeMultiplier(): Promise<number> {
  const logs = await Storage.getLogs();
  if (logs.length < 2) return 1.0;

  const recent = logs.slice(-2);
  const state = recent.reduce<VolumeState>((acc, log) => {
    if (log.rpe >= 8) {
      acc.consecutiveHighRPE += 1;
      acc.consecutiveLowRPE = 0;
    } else if (log.rpe <= 4) {
      acc.consecutiveLowRPE += 1;
      acc.consecutiveHighRPE = 0;
    } else {
      acc.consecutiveHighRPE = 0;
      acc.consecutiveLowRPE = 0;
    }
    return acc;
  }, { ...DEFAULT_STATE });

  if (state.consecutiveHighRPE >= 2) {
    return Math.max(0.8, 1.0 - 0.1);
  }
  if (state.consecutiveLowRPE >= 2) {
    return Math.min(1.2, 1.0 + 0.1);
  }
  return 1.0;
}

export function analyzeShootingTrend(
  logs: WorkoutLog[],
  drillId: string
): 'improving' | 'declining' | 'stable' {
  const relevant = logs
    .flatMap((l) => l.drillLogs)
    .filter((dl) => dl.drillId === drillId && dl.makes != null && dl.attempts != null)
    .map((dl) => dl.makes! / dl.attempts!);

  if (relevant.length < 3) return 'stable';

  const last3 = relevant.slice(-3);
  const trend = last3[2] - last3[0];
  if (trend > 0.05) return 'improving';
  if (trend < -0.05) return 'declining';
  return 'stable';
}
