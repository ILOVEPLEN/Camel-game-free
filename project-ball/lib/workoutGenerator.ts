import { PlayerProfile, EquipmentAccess, Goal } from '../types/profile';
import { WorkoutSession, SessionDrill, SessionBlock } from '../types/workout';
import { Drill, Equipment, DrillCategory } from '../types/drill';
import drillsData from '../data/drills.json';
import { v4 as uuid } from 'uuid';

const allDrills = drillsData as Drill[];

const EQUIPMENT_MAP: Record<EquipmentAccess, Equipment[]> = {
  'full-gym': ['ball', 'hoop', 'cones', 'two-balls', 'tennis-ball', 'resistance-band', 'pad', 'barbell', 'dumbbell', 'trap-bar', 'med-ball', 'box', 'none'],
  'home-gym': ['ball', 'hoop', 'cones', 'two-balls', 'tennis-ball', 'resistance-band', 'dumbbell', 'med-ball', 'box', 'none'],
  'court-only': ['ball', 'hoop', 'cones', 'two-balls', 'tennis-ball', 'pad', 'none'],
  'ball-and-hoop': ['ball', 'hoop', 'none'],
};

const GOAL_CATEGORY_MAP: Record<Goal, DrillCategory[]> = {
  shooting: ['shooting'],
  handles: ['ball-handling'],
  finishing: ['finishing', 'footwork'],
  athleticism: ['strength', 'conditioning'],
  conditioning: ['conditioning'],
};

const WARMUP_IDS = ['foot-01', 'shoot-01', 'handle-01'];
const COOLDOWN_IDS = ['def-01'];

function canDo(drill: Drill, available: Equipment[]): boolean {
  return drill.equipment.every((e) => available.includes(e));
}

function pickFrom(
  drills: Drill[],
  available: Equipment[],
  category: DrillCategory,
  difficulty: 1 | 2 | 3,
  count: number,
  exclude: Set<string>
): Drill[] {
  const candidates = drills.filter(
    (d) =>
      d.category === category &&
      canDo(d, available) &&
      d.difficulty <= difficulty &&
      !exclude.has(d.id)
  );
  const shuffled = candidates.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function difficultyFor(level: PlayerProfile['skillLevel']): 1 | 2 | 3 {
  if (level === 'beginner') return 1;
  if (level === 'intermediate') return 2;
  return 3;
}

export function generateSession(
  profile: PlayerProfile,
  volumeMultiplier = 1.0
): WorkoutSession {
  const available = EQUIPMENT_MAP[profile.equipmentAccess];
  const diff = difficultyFor(profile.skillLevel);
  const targetMinutes = Math.round(profile.minutesPerSession * volumeMultiplier);
  const used = new Set<string>();
  const sessionDrills: SessionDrill[] = [];

  // Warmup
  WARMUP_IDS.forEach((id) => {
    const d = allDrills.find((x) => x.id === id);
    if (d && canDo(d, available)) {
      sessionDrills.push({ drill: d, block: 'warmup' as SessionBlock });
      used.add(id);
    }
  });

  // Skill block — up to 3 categories from goals
  const goalCategories = profile.goals.flatMap((g) => GOAL_CATEGORY_MAP[g]);
  const uniqueCategories = [...new Set(goalCategories)];
  const skillCategories = uniqueCategories.slice(0, 3);

  for (const cat of skillCategories) {
    const drills = pickFrom(allDrills, available, cat as DrillCategory, diff, 2, used);
    drills.forEach((d) => {
      sessionDrills.push({ drill: d, block: 'skill' as SessionBlock });
      used.add(d.id);
    });
  }

  // Conditioning or lift block
  const hasGym = profile.equipmentAccess === 'full-gym' || profile.equipmentAccess === 'home-gym';
  const wantsAth = profile.goals.includes('athleticism');

  if (hasGym && wantsAth) {
    const liftDrills = pickFrom(allDrills, available, 'strength', diff, 3, used);
    liftDrills.forEach((d) => {
      sessionDrills.push({ drill: d, block: 'lift' as SessionBlock });
      used.add(d.id);
    });
  } else {
    const condDrills = pickFrom(allDrills, available, 'conditioning', diff, 2, used);
    condDrills.forEach((d) => {
      sessionDrills.push({ drill: d, block: 'conditioning' as SessionBlock });
      used.add(d.id);
    });
  }

  // Cooldown
  COOLDOWN_IDS.forEach((id) => {
    const d = allDrills.find((x) => x.id === id);
    if (d && canDo(d, available) && !used.has(id)) {
      sessionDrills.push({ drill: d, block: 'cooldown' as SessionBlock });
    }
  });

  const estimatedMinutes = Math.min(
    sessionDrills.reduce((sum, sd) => sum + sd.drill.duration, 0),
    targetMinutes
  );

  return {
    id: uuid(),
    date: new Date().toISOString().slice(0, 10),
    drills: sessionDrills,
    estimatedMinutes,
  };
}

export function shortenSession(session: WorkoutSession): WorkoutSession {
  const keep = session.drills.filter(
    (sd) => sd.block === 'warmup' || sd.block === 'cooldown'
  );
  const skill = session.drills
    .filter((sd) => sd.block === 'skill')
    .slice(0, Math.max(1, Math.floor(session.drills.filter((x) => x.block === 'skill').length / 2)));

  const newDrills = [...keep, ...skill].sort((a, b) => {
    const order: SessionBlock[] = ['warmup', 'skill', 'conditioning', 'lift', 'cooldown'];
    return order.indexOf(a.block) - order.indexOf(b.block);
  });

  return {
    ...session,
    drills: newDrills,
    estimatedMinutes: newDrills.reduce((s, d) => s + d.drill.duration, 0),
  };
}
