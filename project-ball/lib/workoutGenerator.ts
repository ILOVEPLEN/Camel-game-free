import { PlayerProfile, BBEquipment, GymEquipment, Goal } from '../types/profile';
import { WorkoutSession, SessionDrill, SessionBlock } from '../types/workout';
import { Drill, Equipment, DrillCategory } from '../types/drill';
import drillsData from '../data/drills.json';
const allDrills = drillsData as Drill[];

function genId(): string {
  return `session-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

const BB_EQUIPMENT_MAP: Record<BBEquipment, Equipment[]> = {
  'ball-only':    ['ball', 'none'],
  'ball-and-hoop': ['ball', 'hoop', 'none'],
  'court-only':   ['ball', 'hoop', 'cones', 'two-balls', 'tennis-ball', 'pad', 'none'],
  'full-court':   ['ball', 'hoop', 'cones', 'two-balls', 'tennis-ball', 'pad', 'none'],
};

const GYM_EQUIPMENT_MAP: Record<GymEquipment, Equipment[]> = {
  'no-gym':   [],
  'home-gym': ['dumbbell', 'resistance-band', 'med-ball', 'box', 'none'],
  'full-gym': ['barbell', 'dumbbell', 'trap-bar', 'resistance-band', 'med-ball', 'box', 'none'],
};

// Legacy fallback for profiles saved before the equipment split
const LEGACY_EQUIPMENT_MAP: Record<string, Equipment[]> = {
  'full-gym':     ['ball', 'hoop', 'cones', 'two-balls', 'tennis-ball', 'resistance-band', 'pad', 'barbell', 'dumbbell', 'trap-bar', 'med-ball', 'box', 'none'],
  'home-gym':     ['ball', 'hoop', 'cones', 'two-balls', 'tennis-ball', 'resistance-band', 'dumbbell', 'med-ball', 'box', 'none'],
  'court-only':   ['ball', 'hoop', 'cones', 'two-balls', 'tennis-ball', 'pad', 'none'],
  'ball-and-hoop': ['ball', 'hoop', 'none'],
};

const GOAL_CATEGORY_MAP: Record<Goal, DrillCategory[]> = {
  shooting:     ['shooting'],
  handles:      ['ball-handling'],
  finishing:    ['finishing', 'footwork'],
  athleticism:  ['strength', 'conditioning'],
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
  return candidates.sort(() => Math.random() - 0.5).slice(0, count);
}

function difficultyFor(level: PlayerProfile['skillLevel']): 1 | 2 | 3 {
  if (level === 'beginner') return 1;
  if (level === 'intermediate') return 2;
  return 3;
}

function resolveBBAvail(profile: PlayerProfile): Equipment[] {
  if (profile.bbEquipment) return BB_EQUIPMENT_MAP[profile.bbEquipment];
  // Legacy fallback
  const legacy = profile.equipmentAccess ?? 'ball-and-hoop';
  const all = LEGACY_EQUIPMENT_MAP[legacy] ?? [];
  const gymOnly: Equipment[] = ['barbell', 'dumbbell', 'trap-bar', 'resistance-band', 'med-ball', 'box'];
  return all.filter((e) => !gymOnly.includes(e));
}

function resolveGymAvail(profile: PlayerProfile): Equipment[] {
  if (profile.gymEquipment) return GYM_EQUIPMENT_MAP[profile.gymEquipment];
  // Legacy fallback
  const legacy = profile.equipmentAccess ?? 'court-only';
  if (legacy === 'full-gym') return GYM_EQUIPMENT_MAP['full-gym'];
  if (legacy === 'home-gym') return GYM_EQUIPMENT_MAP['home-gym'];
  return [];
}

export function generateSession(
  profile: PlayerProfile,
  volumeMultiplier = 1.0
): WorkoutSession {
  const bbAvail = resolveBBAvail(profile);
  const gymAvail = resolveGymAvail(profile);
  const diff = difficultyFor(profile.skillLevel);
  const targetMinutes = Math.round(profile.minutesPerSession * volumeMultiplier);
  const used = new Set<string>();
  const sessionDrills: SessionDrill[] = [];

  // ── Basketball section ───────────────────────────────────────────────────
  // Warmup
  WARMUP_IDS.forEach((id) => {
    const d = allDrills.find((x) => x.id === id);
    if (d && canDo(d, bbAvail)) {
      sessionDrills.push({ drill: d, block: 'warmup' as SessionBlock });
      used.add(id);
    }
  });

  // Skill block — pick up to 3 goal categories
  const bbGoals = profile.goals.filter((g) => g !== 'athleticism');
  const goalCategories = bbGoals.flatMap((g) => GOAL_CATEGORY_MAP[g]);
  const uniqueCategories = [...new Set(goalCategories)].slice(0, 3);

  for (const cat of uniqueCategories) {
    const drills = pickFrom(allDrills, bbAvail, cat as DrillCategory, diff, 2, used);
    drills.forEach((d) => {
      sessionDrills.push({ drill: d, block: 'skill' as SessionBlock });
      used.add(d.id);
    });
  }

  // Court-based conditioning (no gym needed)
  if (profile.goals.includes('conditioning') || profile.goals.includes('athleticism')) {
    const condDrills = pickFrom(allDrills, bbAvail, 'conditioning', diff, 2, used);
    condDrills.forEach((d) => {
      sessionDrills.push({ drill: d, block: 'conditioning' as SessionBlock });
      used.add(d.id);
    });
  }

  // Cooldown
  COOLDOWN_IDS.forEach((id) => {
    const d = allDrills.find((x) => x.id === id);
    if (d && canDo(d, bbAvail) && !used.has(id)) {
      sessionDrills.push({ drill: d, block: 'cooldown' as SessionBlock });
    }
  });

  // ── Gym section ──────────────────────────────────────────────────────────
  if (gymAvail.length > 0) {
    const liftDrills = pickFrom(allDrills, gymAvail, 'strength', diff, 4, used);
    liftDrills.forEach((d) => {
      sessionDrills.push({ drill: d, block: 'lift' as SessionBlock });
      used.add(d.id);
    });
  }

  const estimatedMinutes = Math.min(
    sessionDrills.reduce((sum, sd) => sum + sd.drill.duration, 0),
    targetMinutes
  );

  return {
    id: genId(),
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

  const blockOrder: SessionBlock[] = ['warmup', 'skill', 'conditioning', 'lift', 'cooldown'];
  const newDrills = [...keep, ...skill].sort(
    (a, b) => blockOrder.indexOf(a.block) - blockOrder.indexOf(b.block)
  );

  return {
    ...session,
    drills: newDrills,
    estimatedMinutes: newDrills.reduce((s, d) => s + d.drill.duration, 0),
  };
}
