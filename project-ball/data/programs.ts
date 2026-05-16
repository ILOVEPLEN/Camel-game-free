import { Program } from '../types/program';
import drillsRaw from './drills.json';
import { Drill } from '../types/drill';

const drills = drillsRaw as Drill[];
const d = (id: string) => drills.find((x) => x.id === id)!;

// Helper to build a SessionDrill-like object (without import cycle issues)
const sd = (id: string, block: 'warmup' | 'skill' | 'conditioning' | 'lift' | 'cooldown') => ({
  drill: d(id),
  block,
});

export const PROGRAMS: Program[] = [
  {
    id: 'shooting-overhaul',
    name: 'Shooting Overhaul',
    tagline: '4 weeks to a better shot',
    weeks: 4,
    focusGoal: 'shooting',
    description:
      'A systematic 4-week program to rebuild and sharpen your shooting mechanics, range, and shot selection. Starts with form fundamentals and progressively adds distance, difficulty, and fatigue.',
    schedule: [
      {
        week: 1,
        days: [
          {
            day: 1,
            title: 'Mechanics Foundation',
            estimatedMinutes: 45,
            drills: [
              sd('shoot-01', 'warmup'),
              sd('foot-01', 'warmup'),
              sd('shoot-01', 'skill'),
              sd('shoot-03', 'skill'),
              sd('shoot-07', 'skill'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 2,
            title: 'Mid-Range Focus',
            estimatedMinutes: 45,
            drills: [
              sd('shoot-01', 'warmup'),
              sd('shoot-07', 'skill'),
              sd('shoot-11', 'skill'),
              sd('shoot-02', 'skill'),
              sd('cond-06', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 3,
            title: 'Three-Point Volume',
            estimatedMinutes: 50,
            drills: [
              sd('shoot-01', 'warmup'),
              sd('shoot-05', 'skill'),
              sd('shoot-03', 'skill'),
              sd('shoot-06', 'skill'),
              sd('cond-01', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
        ],
      },
      {
        week: 2,
        days: [
          {
            day: 4,
            title: 'Off-Movement Shooting',
            estimatedMinutes: 50,
            drills: [
              sd('shoot-06', 'warmup'),
              sd('shoot-08', 'skill'),
              sd('shoot-02', 'skill'),
              sd('shoot-09', 'skill'),
              sd('cond-05', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 5,
            title: 'Fatigue Shooting',
            estimatedMinutes: 55,
            drills: [
              sd('shoot-01', 'warmup'),
              sd('shoot-04', 'skill'),
              sd('shoot-05', 'skill'),
              sd('shoot-11', 'skill'),
              sd('cond-02', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 6,
            title: 'Advanced Shots',
            estimatedMinutes: 50,
            drills: [
              sd('shoot-06', 'warmup'),
              sd('shoot-09', 'skill'),
              sd('shoot-10', 'skill'),
              sd('shoot-12', 'skill'),
              sd('cond-01', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
        ],
      },
      {
        week: 3,
        days: [
          {
            day: 7,
            title: 'Volume Day',
            estimatedMinutes: 60,
            drills: [
              sd('shoot-06', 'warmup'),
              sd('shoot-05', 'skill'),
              sd('shoot-03', 'skill'),
              sd('shoot-07', 'skill'),
              sd('shoot-11', 'skill'),
              sd('cond-02', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 8,
            title: 'Game Situations',
            estimatedMinutes: 55,
            drills: [
              sd('shoot-06', 'warmup'),
              sd('shoot-08', 'skill'),
              sd('shoot-04', 'skill'),
              sd('shoot-09', 'skill'),
              sd('cond-07', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 9,
            title: 'Range Extension',
            estimatedMinutes: 50,
            drills: [
              sd('shoot-01', 'warmup'),
              sd('shoot-12', 'skill'),
              sd('shoot-05', 'skill'),
              sd('shoot-06', 'skill'),
              sd('cond-03', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
        ],
      },
      {
        week: 4,
        days: [
          {
            day: 10,
            title: 'Peak Week — Mechanics',
            estimatedMinutes: 60,
            drills: [
              sd('shoot-01', 'warmup'),
              sd('shoot-03', 'skill'),
              sd('shoot-07', 'skill'),
              sd('shoot-02', 'skill'),
              sd('shoot-04', 'skill'),
              sd('cond-02', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 11,
            title: 'Peak Week — All Ranges',
            estimatedMinutes: 60,
            drills: [
              sd('shoot-06', 'warmup'),
              sd('shoot-11', 'skill'),
              sd('shoot-05', 'skill'),
              sd('shoot-12', 'skill'),
              sd('shoot-09', 'skill'),
              sd('cond-07', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 12,
            title: 'Test Day',
            estimatedMinutes: 55,
            drills: [
              sd('shoot-06', 'warmup'),
              sd('shoot-05', 'skill'),
              sd('shoot-04', 'skill'),
              sd('shoot-08', 'skill'),
              sd('shoot-12', 'skill'),
              sd('cond-01', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'summer-bounce',
    name: 'Summer Bounce',
    tagline: '6 weeks to jump higher and move faster',
    weeks: 6,
    focusGoal: 'athleticism',
    description:
      'A 6-week athletic development program combining plyometrics, strength, and conditioning to add inches to your vertical and explosiveness to your first step. Best with gym access.',
    schedule: [
      {
        week: 1,
        days: [
          {
            day: 1,
            title: 'Strength Foundation',
            estimatedMinutes: 55,
            drills: [
              sd('foot-01', 'warmup'),
              sd('str-04', 'lift'),
              sd('str-01', 'lift'),
              sd('str-11', 'lift'),
              sd('cond-08', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 2,
            title: 'Explosive Power',
            estimatedMinutes: 50,
            drills: [
              sd('foot-01', 'warmup'),
              sd('str-06', 'lift'),
              sd('str-08', 'lift'),
              sd('str-09', 'lift'),
              sd('cond-06', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 3,
            title: 'Unilateral Strength',
            estimatedMinutes: 55,
            drills: [
              sd('foot-01', 'warmup'),
              sd('str-02', 'lift'),
              sd('str-03', 'lift'),
              sd('str-11', 'lift'),
              sd('cond-05', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
        ],
      },
      {
        week: 2,
        days: [
          {
            day: 4,
            title: 'Heavy Lower',
            estimatedMinutes: 60,
            drills: [
              sd('foot-01', 'warmup'),
              sd('str-01', 'lift'),
              sd('str-02', 'lift'),
              sd('str-11', 'lift'),
              sd('cond-08', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 5,
            title: 'Plyometric Focus',
            estimatedMinutes: 50,
            drills: [
              sd('foot-01', 'warmup'),
              sd('str-07', 'lift'),
              sd('str-06', 'lift'),
              sd('str-09', 'lift'),
              sd('cond-03', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
          {
            day: 6,
            title: 'Posterior Chain',
            estimatedMinutes: 55,
            drills: [
              sd('foot-01', 'warmup'),
              sd('str-03', 'lift'),
              sd('str-05', 'lift'),
              sd('str-10', 'lift'),
              sd('cond-01', 'conditioning'),
              sd('def-01', 'cooldown'),
            ],
          },
        ],
      },
      {
        week: 3,
        days: [
          { day: 7, title: 'Max Strength', estimatedMinutes: 60, drills: [sd('foot-01', 'warmup'), sd('str-01', 'lift'), sd('str-02', 'lift'), sd('str-08', 'lift'), sd('cond-02', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 8, title: 'Reactive Power', estimatedMinutes: 50, drills: [sd('foot-01', 'warmup'), sd('str-07', 'lift'), sd('str-06', 'lift'), sd('str-09', 'lift'), sd('cond-05', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 9, title: 'Accessory Day', estimatedMinutes: 50, drills: [sd('foot-01', 'warmup'), sd('str-03', 'lift'), sd('str-10', 'lift'), sd('str-11', 'lift'), sd('cond-03', 'conditioning'), sd('def-01', 'cooldown')] },
        ],
      },
      {
        week: 4,
        days: [
          { day: 10, title: 'Deload — Movement', estimatedMinutes: 40, drills: [sd('foot-01', 'warmup'), sd('str-04', 'lift'), sd('str-11', 'lift'), sd('cond-08', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 11, title: 'Deload — Plyo', estimatedMinutes: 35, drills: [sd('foot-01', 'warmup'), sd('str-06', 'lift'), sd('str-09', 'lift'), sd('cond-06', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 12, title: 'Deload — Conditioning', estimatedMinutes: 35, drills: [sd('foot-01', 'warmup'), sd('cond-05', 'conditioning'), sd('cond-08', 'conditioning'), sd('def-01', 'cooldown')] },
        ],
      },
      {
        week: 5,
        days: [
          { day: 13, title: 'Peak Strength', estimatedMinutes: 65, drills: [sd('foot-01', 'warmup'), sd('str-01', 'lift'), sd('str-02', 'lift'), sd('str-03', 'lift'), sd('cond-02', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 14, title: 'Peak Plyo', estimatedMinutes: 55, drills: [sd('foot-01', 'warmup'), sd('str-07', 'lift'), sd('str-06', 'lift'), sd('str-08', 'lift'), sd('cond-01', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 15, title: 'Speed + Power', estimatedMinutes: 55, drills: [sd('foot-01', 'warmup'), sd('str-05', 'lift'), sd('str-09', 'lift'), sd('str-10', 'lift'), sd('cond-05', 'conditioning'), sd('def-01', 'cooldown')] },
        ],
      },
      {
        week: 6,
        days: [
          { day: 16, title: 'Test Week — Strength', estimatedMinutes: 60, drills: [sd('foot-01', 'warmup'), sd('str-01', 'lift'), sd('str-02', 'lift'), sd('str-07', 'lift'), sd('cond-02', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 17, title: 'Test Week — Power', estimatedMinutes: 55, drills: [sd('foot-01', 'warmup'), sd('str-06', 'lift'), sd('str-07', 'lift'), sd('str-09', 'lift'), sd('cond-01', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 18, title: 'Final Test Day', estimatedMinutes: 50, drills: [sd('foot-01', 'warmup'), sd('str-06', 'lift'), sd('str-07', 'lift'), sd('str-08', 'lift'), sd('cond-07', 'conditioning'), sd('def-01', 'cooldown')] },
        ],
      },
    ],
  },
  {
    id: 'handles-lockdown',
    name: 'Handles Lockdown',
    tagline: '4 weeks to unguardable handles',
    weeks: 4,
    focusGoal: 'handles',
    description:
      'A 4-week ball-handling intensive that progressively builds from stationary fundamentals to full-speed game moves. Requires only a ball — no gym needed.',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, title: 'Foundation Moves', estimatedMinutes: 40, drills: [sd('handle-01', 'warmup'), sd('handle-02', 'skill'), sd('handle-05', 'skill'), sd('handle-06', 'skill'), sd('cond-06', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 2, title: 'Vision Drills', estimatedMinutes: 40, drills: [sd('handle-01', 'warmup'), sd('handle-03', 'skill'), sd('handle-02', 'skill'), sd('handle-05', 'skill'), sd('cond-06', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 3, title: 'Speed Dribble', estimatedMinutes: 45, drills: [sd('handle-01', 'warmup'), sd('handle-09', 'skill'), sd('handle-06', 'skill'), sd('handle-07', 'skill'), sd('cond-01', 'conditioning'), sd('def-01', 'cooldown')] },
        ],
      },
      {
        week: 2,
        days: [
          { day: 4, title: 'Between Legs Series', estimatedMinutes: 45, drills: [sd('handle-01', 'warmup'), sd('handle-08', 'skill'), sd('handle-07', 'skill'), sd('handle-04', 'skill'), sd('cond-05', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 5, title: 'Game Speed', estimatedMinutes: 50, drills: [sd('handle-01', 'warmup'), sd('handle-09', 'skill'), sd('handle-10', 'skill'), sd('handle-04', 'skill'), sd('cond-02', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 6, title: 'Combo Moves', estimatedMinutes: 45, drills: [sd('handle-01', 'warmup'), sd('handle-06', 'skill'), sd('handle-07', 'skill'), sd('handle-08', 'skill'), sd('cond-01', 'conditioning'), sd('def-01', 'cooldown')] },
        ],
      },
      {
        week: 3,
        days: [
          { day: 7, title: 'Pressure Dribbling', estimatedMinutes: 50, drills: [sd('handle-01', 'warmup'), sd('handle-03', 'skill'), sd('handle-10', 'skill'), sd('handle-09', 'skill'), sd('cond-07', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 8, title: 'Advanced Combos', estimatedMinutes: 50, drills: [sd('handle-01', 'warmup'), sd('handle-08', 'skill'), sd('handle-07', 'skill'), sd('handle-10', 'skill'), sd('cond-05', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 9, title: 'Cone Work', estimatedMinutes: 45, drills: [sd('handle-01', 'warmup'), sd('handle-04', 'skill'), sd('handle-09', 'skill'), sd('handle-10', 'skill'), sd('cond-03', 'conditioning'), sd('def-01', 'cooldown')] },
        ],
      },
      {
        week: 4,
        days: [
          { day: 10, title: 'Volume Day', estimatedMinutes: 55, drills: [sd('handle-01', 'warmup'), sd('handle-05', 'skill'), sd('handle-06', 'skill'), sd('handle-07', 'skill'), sd('handle-08', 'skill'), sd('cond-02', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 11, title: 'Game Sim', estimatedMinutes: 55, drills: [sd('handle-01', 'warmup'), sd('handle-09', 'skill'), sd('handle-10', 'skill'), sd('handle-04', 'skill'), sd('cond-07', 'conditioning'), sd('def-01', 'cooldown')] },
          { day: 12, title: 'Final Test', estimatedMinutes: 50, drills: [sd('handle-01', 'warmup'), sd('handle-03', 'skill'), sd('handle-10', 'skill'), sd('handle-09', 'skill'), sd('handle-08', 'skill'), sd('cond-02', 'conditioning'), sd('def-01', 'cooldown')] },
        ],
      },
    ],
  },
];
