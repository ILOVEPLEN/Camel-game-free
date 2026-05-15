import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { drills } from '../data/drills';
import { exercises } from '../data/exercises';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function generateRoutine(profile) {
  const { goals = [], timePerDay = 45, skillLevel = 'Intermediate', gymAccess = false } = profile;

  const diffMap = { Beginner: 0, Intermediate: 1, Advanced: 2 };
  const levelNum = diffMap[skillLevel] ?? 1;

  const filterDrills = (category, count) => {
    return drills
      .filter(d => {
        if (category && d.category !== category) return false;
        const dLevel = diffMap[d.difficulty] ?? 1;
        return dLevel <= levelNum + 1;
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(d => d.name);
  };

  const filterExercises = (group, count) => {
    return exercises
      .filter(e => {
        if (group && e.muscleGroup !== group) return false;
        if (!gymAccess && ['Barbell', 'Cable Machine'].includes(e.equipment)) return false;
        const eLevel = diffMap[e.difficulty] ?? 1;
        return eLevel <= levelNum + 1;
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(e => `${e.name} — ${e.sets}×${e.reps}`);
  };

  const hasShooting = goals.includes('shooting');
  const hasHandles = goals.includes('handles');
  const hasStrength = goals.includes('strength');
  const hasSpeed = goals.includes('speed');
  const hasDefense = goals.includes('defense');
  const allAround = goals.includes('allaround') || goals.length === 0;

  const shortTime = timePerDay <= 30;
  const drillCount = shortTime ? 2 : 3;
  const exCount = shortTime ? 3 : 5;

  const shootingDrill = { type: 'drill', name: 'Shooting Session', focus: 'Shooting', duration: timePerDay, items: filterDrills('Shooting', drillCount) };
  const handlesDrill = { type: 'drill', name: 'Ball Handling Session', focus: 'Ball Handling', duration: timePerDay, items: filterDrills('Ball Handling', drillCount) };
  const defenseDrill = { type: 'drill', name: 'Defense Session', focus: 'Defense', duration: timePerDay, items: filterDrills('Defense', drillCount) };
  const finishingDrill = { type: 'drill', name: 'Finishing Session', focus: 'Finishing', duration: timePerDay, items: filterDrills('Finishing', drillCount) };
  const conditioningDrill = { type: 'drill', name: 'Conditioning Session', focus: 'Conditioning', duration: timePerDay, items: filterDrills('Conditioning', drillCount) };
  const fullDrill = { type: 'drill', name: 'Full Skill Session', focus: 'All Skills', duration: timePerDay, items: [...filterDrills('Shooting', 2), ...filterDrills('Ball Handling', 1)] };

  const upperGym = { type: 'gym', name: 'Upper Body', focus: 'Chest/Back/Shoulders', duration: timePerDay, items: [...filterExercises('Chest', 2), ...filterExercises('Back', 2), ...filterExercises('Shoulders', 1)] };
  const lowerGym = { type: 'gym', name: 'Lower Body', focus: 'Legs/Core', duration: timePerDay, items: [...filterExercises('Legs', 3), ...filterExercises('Core', 2)] };
  const fullGym = { type: 'gym', name: 'Full Body', focus: 'Full Body', duration: timePerDay, items: [...filterExercises('Chest', 1), ...filterExercises('Back', 1), ...filterExercises('Legs', 2), ...filterExercises('Core', 1)] };
  const rest = { type: 'rest', name: 'Rest Day', focus: 'Recovery', duration: 0, items: ['Light stretching (optional)', 'Foam roll', 'Stay hydrated'] };

  let schedule = {};

  if (hasStrength && gymAccess) {
    schedule = {
      monday: hasShooting ? shootingDrill : fullDrill,
      tuesday: upperGym,
      wednesday: hasHandles ? handlesDrill : fullDrill,
      thursday: lowerGym,
      friday: hasDefense ? defenseDrill : finishingDrill,
      saturday: hasSpeed ? conditioningDrill : fullGym,
      sunday: rest,
    };
  } else if (hasSpeed) {
    schedule = {
      monday: hasShooting ? shootingDrill : fullDrill,
      tuesday: conditioningDrill,
      wednesday: hasHandles ? handlesDrill : fullDrill,
      thursday: rest,
      friday: hasDefense ? defenseDrill : finishingDrill,
      saturday: conditioningDrill,
      sunday: rest,
    };
  } else {
    schedule = {
      monday: hasShooting || allAround ? shootingDrill : fullDrill,
      tuesday: rest,
      wednesday: hasHandles || allAround ? handlesDrill : fullDrill,
      thursday: hasDefense || allAround ? defenseDrill : rest,
      friday: finishingDrill,
      saturday: conditioningDrill,
      sunday: rest,
    };
  }

  return schedule;
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
  const [goals, setGoals] = useState(state.profile?.goals || []);
  const [time, setTime] = useState(state.profile?.timePerDay || 45);
  const [level, setLevel] = useState(state.profile?.skillLevel || 'Intermediate');
  const [gym, setGym] = useState(state.profile?.gymAccess || false);
  const [generated, setGenerated] = useState(state.routine || null);
  const [generating, setGenerating] = useState(false);

  const toggleGoal = (id) => {
    setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const routine = generateRoutine({ goals, timePerDay: time, skillLevel: level, gymAccess: gym });
      setGenerated(routine);
      setRoutine(routine);
      setGenerating(false);
    }, 1200);
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

        {generated && <RoutineDisplay routine={generated} />}
      </div>
    </div>
  );
}

const DAY_COLORS = { drill: '#0EA5E9', gym: '#7C3AED', rest: '#94A3B8' };
const DAY_BG = { drill: '#EBF5FF', gym: '#F5F3FF', rest: '#F8FAFC' };

function RoutineDisplay({ routine }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="fade-in">
      <h3 className="section-title">Your Weekly Plan</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {DAYS.map((day, i) => {
          const workout = routine[day];
          if (!workout) return null;
          const color = DAY_COLORS[workout.type];
          const bg = DAY_BG[workout.type];
          const isOpen = expanded === day;
          return (
            <div key={day} style={{ borderRadius: '14px', overflow: 'hidden', border: `1.5px solid ${color}22` }}>
              <button onClick={() => setExpanded(isOpen ? null : day)} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px', background: isOpen ? bg : '#fff', cursor: 'pointer', border: 'none',
                transition: 'background 0.15s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '40px', height: '40px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {workout.type === 'gym' ? '🏋️' : workout.type === 'rest' ? '😴' : '🏀'}
                  </span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '700', fontSize: '15px', color: '#0F172A' }}>{DAY_LABELS[i]} — {workout.name}</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>{workout.focus} {workout.duration > 0 ? `· ${workout.duration} min` : ''}</div>
                  </div>
                </div>
                <span style={{ color: '#CBD5E1', fontSize: '18px', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
              </button>
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
