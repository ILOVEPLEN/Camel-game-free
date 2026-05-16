export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type Goal =
  | 'shooting'
  | 'handles'
  | 'finishing'
  | 'athleticism'
  | 'conditioning';
export type EquipmentAccess =
  | 'full-gym'
  | 'home-gym'
  | 'court-only'
  | 'ball-and-hoop';

export interface PlayerProfile {
  position: Position;
  skillLevel: SkillLevel;
  goals: Goal[];
  equipmentAccess: EquipmentAccess;
  daysPerWeek: number;
  minutesPerSession: number;
  createdAt: string;
}
