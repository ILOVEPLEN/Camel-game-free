export type DrillCategory =
  | 'shooting'
  | 'ball-handling'
  | 'finishing'
  | 'footwork'
  | 'defense'
  | 'conditioning'
  | 'strength';

export type Equipment =
  | 'ball'
  | 'hoop'
  | 'cones'
  | 'two-balls'
  | 'tennis-ball'
  | 'resistance-band'
  | 'pad'
  | 'barbell'
  | 'dumbbell'
  | 'trap-bar'
  | 'med-ball'
  | 'box'
  | 'none';

export interface Drill {
  id: string;
  name: string;
  category: DrillCategory;
  difficulty: 1 | 2 | 3;
  equipment: Equipment[];
  duration: number; // minutes
  targetReps?: number;
  targetSets?: number;
  cues: string[];
  videoPlaceholder: string;
  description: string;
}

export interface DrillFilters {
  category?: DrillCategory | 'all';
  equipment?: Equipment[];
  difficulty?: (1 | 2 | 3)[];
  maxDuration?: number;
}
