import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { drills } from '../data/drills';
import { exercises } from '../data/exercises';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function generateRoutine(profile) {
  const { goals = [], timePerDay = 45, skillLevel = 'Intermediate', gymAccess = false, ageGroup = '', gameDays = [], position = 'any', equipment = [] } = profile;

  const diffMap = { Beginner: 0, Intermediate: 1, Advanced: 2 };
  const levelNum = diffMap[skillLevel] ?? 1;
  const ageMaxLevel = ageGroup === 'u12' ? 0 : ageGroup === '13-15' ? 1 : 2;
  const effectiveLevel = Math.min(levelNum, ageMaxLevel === 0 ? 0 : ageMaxLevel);

  const drillCount = timePerDay <= 30 ? 5 : timePerDay <= 60 ? 8 : 10;
  const exCount    = timePerDay <= 30 ? 4 : timePerDay <= 60 ? 6 : 8;
  const gameDayKeys = new Set(gameDays.map(d => d.toLowerCase()));

  const fd = (cat, n) => drills
    .filter(d => {
      if (cat && d.category !== cat) return false;
      if ((diffMap[d.difficulty] ?? 1) > effectiveLevel + 1) return false;
      if (d.equipment && d.equipment.length > 0 && equipment.length > 0) {
        const needed = d.equipment.filter(e => e !== 'Basketball');
        if (needed.length > 0 && !needed.every(e => equipment.includes(e))) return false;
      }
      return true;
    })
    .sort(() => Math.random() - 0.5).slice(0, n).map(d => d.name);

  const fe = (grp, n) => exercises
    .filter(e => (!grp || e.muscleGroup === grp) && !(!gymAccess && ['Barbell','Cable Machine'].includes(e.equipment)) && (diffMap[e.difficulty] ?? 1) <= effectiveLevel + 1)
    .sort(() => Math.random() - 0.5).slice(0, n).map(e => `${e.name} — ${e.sets}×${e.reps}`);

  const estDur = Math.min(timePerDay, drillCount * 7);
  const mk = (type, name, focus, items, dur) => ({ type, name, focus, duration: dur ?? timePerDay, items });

  const posMap = {
    PG:  { primary: 'Ball Handling', secondary: 'Shooting',      tertiary: 'Passing' },
    SG:  { primary: 'Shooting',      secondary: 'Ball Handling', tertiary: 'Finishing' },
    SF:  { primary: 'Shooting',      secondary: 'Finishing',     tertiary: 'Ball Handling' },
    PF:  { primary: 'Finishing',     secondary: 'Defense',       tertiary: 'Conditioning' },
    C:   { primary: 'Finishing',     secondary: 'Defense',       tertiary: 'Footwork' },
    any: { primary: 'Shooting',      secondary: 'Ball Handling', tertiary: 'Finishing' },
  };
  const pos = posMap[position] || posMap.any;
  const third = Math.ceil(drillCount / 3);

  const shootingSession  = mk('drill', 'Shooting Session',      'Shooting',      fd('Shooting', drillCount),      estDur);
  const handlesSession   = mk('drill', 'Ball Handling Session', 'Ball Handling', fd('Ball Handling', drillCount), estDur);
  const defenseSession   = mk('drill', 'Defense Session',       'Defense',       fd('Defense', drillCount),       estDur);
  const finishingSession = mk('drill', 'Finishing Session',     'Finishing',     fd('Finishing', drillCount),     estDur);
  const conditionSession = mk('drill', 'Conditioning Session',  'Conditioning',  fd('Conditioning', drillCount),  estDur);
  const passingSession   = mk('drill', 'Passing Session',       'Passing',       fd('Passing', drillCount),       estDur);
  const footworkSession  = mk('drill', 'Footwork Session',      'Footwork',      fd('Footwork', drillCount),      estDur);
  const posSession       = mk('drill', `${pos.primary} Focus`,  pos.primary,     [...fd(pos.primary, third + 1), ...fd(pos.secondary, third), ...fd(pos.tertiary, third - 1)], estDur);

  const upperGym = mk('gym', 'Upper Body', 'Chest/Back/Shoulders', [...fe('Chest', Math.ceil(exCount*0.3)), ...fe('Back', Math.ceil(exCount*0.4)), ...fe('Shoulders', Math.floor(exCount*0.3))]);
  const lowerGym = mk('gym', 'Lower Body', 'Legs/Core',            [...fe('Legs', Math.ceil(exCount*0.6)), ...fe('Core', Math.floor(exCount*0.4))]);
  const fullGym  = mk('gym', 'Full Body',  'Full Body',            [...fe('Chest',2), ...fe('Back',2), ...fe('Legs',2), ...fe('Core',2)]);

  const gameDay = mk('rest', 'Game Day',  'Compete & Rest', ['Light warmup only (5 min)', 'Dynamic stretches — no static holds', 'Short shooting warm-up (5 min catch & shoot)', '🏀 Save your legs for the game!'], 15);
  const rest    = mk('rest', 'Rest Day',  'Recovery',       ['Light stretching or yoga (10 min)', 'Foam roll quads, calves, hamstrings', 'Watch film — study your opponents', 'Sleep 8+ hours — this is when you grow'], 0);

  const hasShooting = goals.includes('shooting');
  const hasHandles  = goals.includes('handles');
  const hasStrength = goals.includes('strength');
  const hasSpeed    = goals.includes('speed');
  const hasDefense  = goals.includes('defense');
  const allAround   = goals.includes('allaround') || goals.length === 0;

  let schedule = {};

  if (hasStrength && gymAccess) {
    schedule = { monday: posSession, tuesday: upperGym, wednesday: handlesSession, thursday: lowerGym, friday: hasDefense ? defenseSession : finishingSession, saturday: hasSpeed ? conditionSession : shootingSession, sunday: rest };
  } else if (position === 'PG') {
    schedule = { monday: handlesSession, tuesday: passingSession, wednesday: shootingSession, thursday: rest, friday: conditionSession, saturday: posSession, sunday: rest };
  } else if (position === 'C' || position === 'PF') {
    schedule = { monday: finishingSession, tuesday: footworkSession, wednesday: defenseSession, thursday: rest, friday: conditionSession, saturday: posSession, sunday: rest };
  } else if (hasSpeed) {
    schedule = { monday: posSession, tuesday: conditionSession, wednesday: handlesSession, thursday: rest, friday: hasDefense ? defenseSession : finishingSession, saturday: conditionSession, sunday: rest };
  } else {
    schedule = {
      monday:    hasShooting || allAround ? shootingSession  : posSession,
      tuesday:   rest,
      wednesday: hasHandles  || allAround ? handlesSession   : posSession,
      thursday:  hasDefense  || allAround ? defenseSession   : footworkSession,
      friday:    finishingSession,
      saturday:  posSession,
      sunday:    rest,
    };
  }

  for (const day of Object.keys(schedule)) {
    if (gameDayKeys.has(day)) schedule[day] = gameDay;
  }

  return schedule;
}

export function shuffleDayDrills(dayWorkout, profile) {
  if (dayWorkout.type !== 'drill') return dayWorkout;
  const { timePerDay = 45, skillLevel = 'Intermediate', ageGroup = '', equipment = [] } = profile;
  const diffMap = { Beginner: 0, Intermediate: 1, Advanced: 2 };
  const levelNum = diffMap[skillLevel] ?? 1;
  const ageMaxLevel = ageGroup === 'u12' ? 0 : ageGroup === '13-15' ? 1 : 2;
  const effectiveLevel = Math.min(levelNum, ageMaxLevel === 0 ? 0 : ageMaxLevel);
  const drillCount = timePerDay <= 30 ? 5 : timePerDay <= 60 ? 8 : 10;
  const category = ['All Skills', 'Ball Handling Focus', 'Shooting Focus', 'Finishing Focus'].includes(dayWorkout.focus) ? null : dayWorkout.focus;

  const newItems = drills
    .filter(d => {
      if (category && d.category !== category) return false;
      if ((diffMap[d.difficulty] ?? 1) > effectiveLevel + 1) return false;
      if (d.equipment && d.equipment.length > 0 && equipment.length > 0) {
        const needed = d.equipment.filter(e => e !== 'Basketball');
        if (needed.length > 0 && !needed.every(e => equipment.includes(e))) return false;
      }
      return true;
    })
    .sort(() => Math.random() - 0.5).slice(0, drillCount).map(d => d.name);

  return { ...dayWorkout, items: newItems };
}

const GOAL_OPTIONS = [
  { id: 'shooting', label: 'Improve Shooting', emoji: '🏀' },
  { id: 'handles', label: 'Ball Handling', emoji: '✋' },
  { id: 'strength', label: 'Build Strength', emoji: '💪' },
  { id: 'speed', label: 'Speed & Conditioning', emoji: '⚡' },
  { id: 'defense', label: 'Sharpen Defense', emoji: '🛡️' },
  { id: 'allaround', label: 'All-Around Game', emoji: '⭐' },
];

export default function Generate() {
  const { state, setRoutine } = useApp();
  const profile = state.profile || {};
  const [goals, setGoals] = useState(profile.goals || []);
  const [time, setTime] = useState(profile.timePerDay || 45);
  const [level, setLevel] = useState(profile.skillLevel || 'Intermediate');
  const [generated, setGenerated] = useState(state.routine || null);
  const [generating, setGenerating] = useState(false);

  const toggleGoal = (id) => setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const routine = generateRoutine({ ...profile, goals, timePerDay: time, skillLevel: level });
      setGenerated(routine);
      setRoutine(routine);
      setGenerating(false);
    }, 1200);
  };

  const handleShuffle = (day) => {
    if (!generated) return;
    const updated = { ...generated, [day]: shuffleDayDrills(generated[day], { ...profile, timePerDay: time, skillLevel: level }) };
    setGenerated(updated);
    setRoutine(updated);
  };

  const handleSwapDays = (dayA, dayB) => {
    if (!generated) return;
    const updated = { ...generated, [dayA]: generated[dayB], [dayB]: generated[dayA] };
    setGenerated(updated);
    setRoutine(updated);
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">AI Plan</h1>
        <p className="page-subtitle">Generate your personalized weekly routine</p>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Goals */}
        <h3 className="section-title">Your Goals</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
          {GOAL_OPTIONS.map(g => {
            const sel = goals.includes(g.id);
            return (
              <button key={g.id} onClick={() => toggleGoal(g.id)} style={{
                background: sel ? '#0F172A' : '#F8FAFC',
                border: `2px solid ${sel ? '#0F172A' : '#E2E8F0'}`,
                borderRadius: '12px',
                padding: '14px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: '22px' }}>{g.emoji}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: sel ? '#fff' : '#334155', textAlign: 'left' }}>{g.label}</span>
              </button>
            );
          })}
        </div>

        {/* Time */}
        <h3 className="section-title">Daily Training Time: <span style={{ color: '#0EA5E9' }}>{time} min</span></h3>
        <input type="range" min="20" max="120" step="5" value={time} onChange={e => setTime(+e.target.value)}
          style={{ width: '100%', accentColor: '#0EA5E9', marginBottom: '8px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', fontSize: '12px', marginBottom: '24px' }}>
          <span>20 min</span><span>120 min</span>
        </div>

        {/* Level */}
        <h3 className="section-title">Skill Level</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['Beginner', 'Intermediate', 'Advanced'].map(l => (
            <button key={l} onClick={() => setLevel(l)} style={{
              flex: 1, padding: '12px 4px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              background: level === l ? '#0F172A' : '#F8FAFC',
              color: level === l ? '#fff' : '#64748B',
              border: `2px solid ${level === l ? '#0F172A' : '#E2E8F0'}`,
              transition: 'all 0.15s',
            }}>{l}</button>
          ))}
        </div>

        {/* Gym */}
        <h3 className="section-title">Gym Access</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {[{ v: true, label: '🏋️ Yes, I have gym' }, { v: false, label: '🏠 Home only' }].map(({ v, label }) => (
            <button key={String(v)} onClick={() => setGym(v)} style={{
              flex: 1, padding: '12px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              background: gym === v ? '#0F172A' : '#F8FAFC',
              color: gym === v ? '#fff' : '#64748B',
              border: `2px solid ${gym === v ? '#0F172A' : '#E2E8F0'}`,
              transition: 'all 0.15s',
            }}>{label}</button>
          ))}
        </div>

        <button className="btn btn-primary btn-full" onClick={handleGenerate}
          disabled={generating}
          style={{ borderRadius: '12px', fontSize: '16px', marginBottom: '28px', position: 'relative' }}>
          {generating ? (
            <span>🤖 Generating your plan...</span>
          ) : (
            <span>🤖 Generate My Weekly Plan</span>
          )}
        </button>

        {generated && <RoutineDisplay routine={generated} onShuffle={handleShuffle} onSwap={handleSwapDays} />}
      </div>
    </div>
  );
}

const DAY_COLORS = { drill: '#0EA5E9', gym: '#7C3AED', rest: '#94A3B8' };
const DAY_BG = { drill: '#EBF5FF', gym: '#F5F3FF', rest: '#F8FAFC' };

function RoutineDisplay({ routine, onShuffle, onSwap }) {
  const [expanded, setExpanded] = useState(null);
  const [swapping, setSwapping] = useState(null);

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 className="section-title" style={{ margin: 0 }}>Your Weekly Plan</h3>
        {swapping && <span style={{ fontSize: '12px', color: '#0EA5E9', fontWeight: '600' }}>Tap a day to swap with {DAY_LABELS[DAYS.indexOf(swapping)]}</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {DAYS.map((day, i) => {
          const workout = routine[day];
          if (!workout) return null;
          const color = DAY_COLORS[workout.type];
          const bg = DAY_BG[workout.type];
          const isOpen = expanded === day;
          const isSwapSource = swapping === day;
          return (
            <div key={day} style={{ borderRadius: '14px', overflow: 'hidden', border: `1.5px solid ${isSwapSource ? '#0EA5E9' : color + '22'}`, transition: 'border 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <button onClick={() => {
                  if (swapping && swapping !== day) { onSwap(swapping, day); setSwapping(null); }
                  else setExpanded(isOpen ? null : day);
                }} style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', background: isOpen ? bg : '#fff', cursor: 'pointer', border: 'none',
                  transition: 'background 0.15s', textAlign: 'left',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '40px', height: '40px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                      {workout.type === 'gym' ? '🏋️' : workout.type === 'rest' ? '😴' : '🏀'}
                    </span>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '15px', color: '#0F172A' }}>{DAY_LABELS[i]} — {workout.name}</div>
                      <div style={{ fontSize: '12px', color: '#94A3B8' }}>{workout.focus} {workout.duration > 0 ? `· ${workout.duration} min` : ''}</div>
                    </div>
                  </div>
                  <span style={{ color: '#CBD5E1', fontSize: '18px', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #F1F5F9' }}>
                  {workout.type === 'drill' && (
                    <button onClick={() => onShuffle(day)} title="Shuffle drills" style={{
                      flex: 1, padding: '0 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#94A3B8',
                    }}>🔀</button>
                  )}
                  <button onClick={() => setSwapping(isSwapSource ? null : day)} title="Swap this day" style={{
                    flex: 1, padding: '0 12px', background: isSwapSource ? '#EBF5FF' : 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: isSwapSource ? '#0EA5E9' : '#94A3B8',
                  }}>⇄</button>
                </div>
              </div>
              {isOpen && workout.items && (
                <div style={{ background: bg, padding: '0 16px 14px' }}>
                  {workout.items.map((item, idx) => (
                    <div key={idx} style={{ fontSize: '13px', color: '#334155', padding: '5px 0', borderTop: idx === 0 ? `1px solid ${color}22` : 'none', display: 'flex', gap: '8px' }}>
                      <span style={{ color: color }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ background: '#F0F7FF', borderRadius: '14px', padding: '16px', marginTop: '20px' }}>
        <div style={{ fontWeight: '700', fontSize: '13px', color: '#0369A1', marginBottom: '8px' }}>🤖 AI NOTES</div>
        <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
          This plan auto-balances skill work and recovery. Complete any workout to maintain your streak.
          Plans refresh every 3 weeks — tap "Generate" again for a fresh routine.
        </p>
      </div>
    </div>
  );
}
