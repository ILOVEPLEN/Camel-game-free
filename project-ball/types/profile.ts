export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type Goal =
  | 'shooting'
  | 'handles'
  | 'finishing'
  | 'athleticism'
  | 'conditioning';

export type BBEquipment = 'ball-only' | 'ball-and-hoop' | 'court-only' | 'full-court';
export type GymEquipment = 'no-gym' | 'home-gym' | 'full-gym';

// Legacy — kept for profiles saved before the equipment split
export type EquipmentAccess = 'full-gym' | 'home-gym' | 'court-only' | 'ball-and-hoop';

export interface PlayerProfile {
  name: string;
  position: Position;
  skillLevel: SkillLevel;
  goals: Goal[];
  bbEquipment: BBEquipment;
  gymEquipment: GymEquipment;
  equipmentAccess?: EquipmentAccess; // legacy
  daysPerWeek: number;
  minutesPerSession: number;
  createdAt: string;
}
