import { SessionDrill } from './workout';

export interface ProgramDay {
  day: number;
  title: string;
  drills: SessionDrill[];
  estimatedMinutes: number;
}

export interface ProgramWeek {
  week: number;
  days: ProgramDay[];
}

export interface Program {
  id: string;
  name: string;
  tagline: string;
  weeks: number;
  focusGoal: string;
  description: string;
  schedule: ProgramWeek[];
}

export interface ProgramEnrollment {
  programId: string;
  startDate: string;
  currentWeek: number;
  currentDay: number;
  completedDays: number[];
}
