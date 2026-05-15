import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateRoutine } from './Generate';

const STEPS = ['Welcome', 'Goals', 'Setup', 'Equipment', 'Position', 'Schedule', 'Ready'];

const GOAL_OPTIONS = [
  { id: 'shooting', label: 'Improve Shooting', emoji: '🏀' },
  { id: 'handles', label: 'Ball Handling', emoji: '✋' },
  { id: 'strength', label: 'Build Strength', emoji: '💪' },
  { id: 'speed', label: 'Speed & Conditioning', emoji: '⚡' },
  { id: 'defense', label: 'Sharpen Defense', emoji: '🛡️' },
  { id: 'allaround', label: 'All-Around Game', emoji: '⭐' },
];

const AGE_GROUPS = [
  { id: 'u12',   label: 'Under 12',    emoji: '🌱' },
  { id: '13-15', label: '13 – 15',     emoji: '📈' },
  { id: '16-18', label: '16 – 18',     emoji: '🔥' },
  { id: '19-22', label: '19 – 22',     emoji: '💪' },
  { id: '23+',   label: '23 and over', emoji: '🏆' },
];

const EQUIPMENT_OPTIONS = [
  { id: 'Basketball',      label: 'Basketball',       emoji: '🏀', required: true },
  { id: 'Hoop',            label: 'Hoop Access',      emoji: '🥅' },
  { id: 'Cones',           label: 'Cones',            emoji: '🔶' },
  { id: 'Bands',           label: 'Resistance Bands', emoji: '🔁' },
  { id: 'Agility Ladder',  label: 'Agility Ladder',   emoji: '🪜' },
  { id: 'Jump Rope',       label: 'Jump Rope',        emoji: '🪢' },
  { id: 'Dumbbells',       label: 'Dumbbells',        emoji: '🏋️' },
  { id: '2 Basketballs',   label: '2 Basketballs',    emoji: '🏀🏀' },
];

const POSITIONS = [
  { id: 'PG',  label: 'Point Guard',    sub: 'Playmaker & handles',       emoji: '👑' },
  { id: 'SG',  label: 'Shooting Guard', sub: 'Scoring & off-ball',        emoji: '🎯' },
  { id: 'SF',  label: 'Small Forward',  sub: 'Versatile wing',            emoji: '⚡' },
  { id: 'PF',  label: 'Power Forward',  sub: 'Paint & stretch game',      emoji: '💪' },
  { id: 'C',   label: 'Center',         sub: 'Post & rim presence',       emoji: '🦁' },
  { id: 'any', label: 'Not Sure',       sub: 'Balanced all-around plan',  emoji: '⭐' },
];

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Onboarding() {
  const { setProfile, setRoutine } = useApp();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState([]);
  const [time, setTime] = useState(45);
  const [level, setLevel] = useState('Intermediate');
  const [ageGroup, setAgeGroup] = useState('');
  const [equipment, setEquipment] = useState(['Basketball', 'Hoop']);
  const [position, setPosition] = useState('');
  const [gameDays, setGameDays] = useState([]);

  const toggleGoal    = (id) => setGoals(p => p.includes(id) ? p.filter(g => g !== id) : [...p, id]);
  const toggleGameDay = (d)  => setGameDays(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d]);
  const toggleEquip   = (id) => {
    if (id === 'Basketball') return;
    setEquipment(p => p.includes(id) ? p.filter(e => e !== id) : [...p, id]);
  };

  const finish = () => {
    const gymAccess = equipment.includes('Dumbbells');
    const profile = { goals, timePerDay: time, equipment, skillLevel: level, gymAccess, ageGroup, gameDays, position };
    setProfile(profile);
    setRoutine(generateRoutine(profile));
  };

  const Steps = [WelcomeStep, GoalsStep, SetupStep, EquipmentStep, PositionStep, ScheduleStep, ReadyStep];
  const StepComponent = Steps[step];

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', paddingTop: '60px', paddingBottom: '8px' }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{ width: i === step ? '20px' : '7px', height: '7px', borderRadius: '999px', background: i <= step ? '#0EA5E9' : '#E2E8F0', transition: 'all 0.3s' }} />
        ))}
      </div>
      <div style={{ flex: 1, padding: '24px 24px 40px', display: 'flex', flexDirection: 'column' }}>
        <StepComponent
          goals={goals} onToggleGoal={toggleGoal}
          time={time} setTime={setTime}
          level={level} setLevel={setLevel}
          ageGroup={ageGroup} setAgeGroup={setAgeGroup}
          equipment={equipment} onToggleEquip={toggleEquip}
          position={position} setPosition={setPosition}
          gameDays={gameDays} onToggleGameDay={toggleGameDay}
          onNext={() => setStep(s => s + 1)}
          onFinish={finish}
        />
      </div>
    </div>
  );
}

function WelcomeStep({ onNext }) {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
      <div style={{ fontSize: '80px', marginBottom: '24px', marginTop: '20px' }}>🏀</div>
      <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0F172A', letterSpacing: '-1px', lineHeight: 1.1 }}>Project Ball</h1>
      <p style={{ color: '#64748B', fontSize: '17px', marginTop: '16px', lineHeight: 1.6, maxWidth: '280px' }}>
        Your personal basketball training system. Build skills, track progress, never miss a day.
      </p>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
        {['80+ Drills', 'AI Routines', 'Streak Tracking', 'Position Training'].map(f => (
          <span key={f} className="chip chip-inactive" style={{ fontSize: '12px' }}>{f}</span>
        ))}
      </div>
      <button className="btn btn-black btn-full" onClick={onNext} style={{ borderRadius: '14px', fontSize: '17px', padding: '18px' }}>
        Let's Get Started →
      </button>
    </div>
  );
}

function GoalsStep({ goals, onToggleGoal, onNext }) {
  return (
    <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>What's your focus?</h2>
      <p style={{ color: '#64748B', marginTop: '8px', marginBottom: '24px' }}>Select all that apply.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flex: 1 }}>
        {GOAL_OPTIONS.map(g => {
          const sel = goals.includes(g.id);
          return (
            <button key={g.id} onClick={() => onToggleGoal(g.id)} style={{
              background: sel ? '#0F172A' : '#F8FAFC', border: `2px solid ${sel ? '#0F172A' : '#E2E8F0'}`,
              borderRadius: '14px', padding: '20px 12px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: '28px' }}>{g.emoji}</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: sel ? '#fff' : '#334155', textAlign: 'center' }}>{g.label}</span>
            </button>
          );
        })}
      </div>
      <button className="btn btn-primary btn-full" onClick={onNext}
        style={{ marginTop: '24px', borderRadius: '14px', fontSize: '16px', opacity: goals.length === 0 ? 0.5 : 1 }}
        disabled={goals.length === 0}>
        Continue →
      </button>
    </div>
  );
}

function SetupStep({ time, setTime, level, setLevel, ageGroup, setAgeGroup, onNext }) {
  return (
    <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>About you</h2>
      <p style={{ color: '#64748B', marginTop: '8px', marginBottom: '24px' }}>Quick setup so we can personalise your plan.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
        <div>
          <label style={{ fontWeight: '700', fontSize: '15px', display: 'block', marginBottom: '12px' }}>How old are you?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {AGE_GROUPS.map(a => (
              <button key={a.id} onClick={() => setAgeGroup(a.id)} style={{
                padding: '12px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '10px',
                background: ageGroup === a.id ? '#0F172A' : '#F8FAFC',
                color: ageGroup === a.id ? '#fff' : '#334155',
                border: `2px solid ${ageGroup === a.id ? '#0F172A' : '#E2E8F0'}`,
                transition: 'all 0.15s', textAlign: 'left',
              }}>
                <span style={{ fontSize: '20px' }}>{a.emoji}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontWeight: '700', fontSize: '15px', display: 'block', marginBottom: '4px' }}>
            Daily training time: <span style={{ color: '#0EA5E9' }}>{time} min</span>
          </label>
          <input type="range" min="20" max="120" step="5" value={time} onChange={e => setTime(+e.target.value)}
            style={{ width: '100%', accentColor: '#0EA5E9', height: '6px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', fontSize: '12px', marginTop: '4px' }}>
            <span>20 min</span><span>120 min</span>
          </div>
        </div>

        <div>
          <label style={{ fontWeight: '700', fontSize: '15px', display: 'block', marginBottom: '12px' }}>Skill level</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Beginner', 'Intermediate', 'Advanced'].map(l => (
              <button key={l} onClick={() => setLevel(l)} style={{
                flex: 1, padding: '12px 8px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                background: level === l ? '#0F172A' : '#F8FAFC', color: level === l ? '#fff' : '#64748B',
                border: `2px solid ${level === l ? '#0F172A' : '#E2E8F0'}`, transition: 'all 0.15s',
              }}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <button className="btn btn-primary btn-full" onClick={onNext}
        style={{ marginTop: '24px', borderRadius: '14px', fontSize: '16px', opacity: !ageGroup ? 0.5 : 1 }}
        disabled={!ageGroup}>
        Continue →
      </button>
    </div>
  );
}

function EquipmentStep({ equipment, onToggleEquip, onNext }) {
  return (
    <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>Your equipment</h2>
      <p style={{ color: '#64748B', marginTop: '8px', marginBottom: '24px' }}>
        What do you have access to? We'll only give you drills you can actually do.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1 }}>
        {EQUIPMENT_OPTIONS.map(e => {
          const sel = equipment.includes(e.id);
          return (
            <button key={e.id} onClick={() => onToggleEquip(e.id)} style={{
              background: sel ? '#0F172A' : '#F8FAFC',
              border: `2px solid ${sel ? '#0F172A' : '#E2E8F0'}`,
              borderRadius: '14px', padding: '16px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              cursor: e.required ? 'default' : 'pointer', transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: '22px' }}>{e.emoji}</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: sel ? '#fff' : '#334155', textAlign: 'center' }}>{e.label}</span>
              {e.required && <span style={{ fontSize: '10px', color: sel ? 'rgba(255,255,255,0.6)' : '#94A3B8' }}>Always needed</span>}
            </button>
          );
        })}
      </div>
      <button className="btn btn-primary btn-full" onClick={onNext} style={{ marginTop: '24px', borderRadius: '14px', fontSize: '16px' }}>
        Continue →
      </button>
    </div>
  );
}

function PositionStep({ position, setPosition, onNext }) {
  return (
    <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>Your position</h2>
      <p style={{ color: '#64748B', marginTop: '8px', marginBottom: '24px' }}>
        We'll tailor your drills to what you need on the court.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {POSITIONS.map(p => {
          const sel = position === p.id;
          return (
            <button key={p.id} onClick={() => setPosition(p.id)} style={{
              padding: '14px 18px', borderRadius: '14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '14px',
              background: sel ? '#0F172A' : '#F8FAFC',
              border: `2px solid ${sel ? '#0F172A' : '#E2E8F0'}`,
              transition: 'all 0.15s', textAlign: 'left',
            }}>
              <span style={{ fontSize: '24px' }}>{p.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '15px', color: sel ? '#fff' : '#0F172A' }}>{p.label}</div>
                <div style={{ fontSize: '12px', color: sel ? 'rgba(255,255,255,0.7)' : '#94A3B8', marginTop: '2px' }}>{p.sub}</div>
              </div>
              {sel && <span style={{ color: '#fff', fontSize: '16px' }}>✓</span>}
            </button>
          );
        })}
      </div>
      <button className="btn btn-primary btn-full" onClick={onNext}
        style={{ marginTop: '24px', borderRadius: '14px', fontSize: '16px', opacity: !position ? 0.5 : 1 }}
        disabled={!position}>
        Continue →
      </button>
    </div>
  );
}

function ScheduleStep({ gameDays, onToggleGameDay, onNext }) {
  return (
    <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>Game days</h2>
      <p style={{ color: '#64748B', marginTop: '8px', marginBottom: '8px' }}>
        Which days do you usually play games? We'll keep those light so you're fresh to compete.
      </p>
      <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '24px' }}>Skip this if you don't play in a league.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {WEEK_DAYS.map(day => {
          const sel = gameDays.includes(day);
          return (
            <button key={day} onClick={() => onToggleGameDay(day)} style={{
              padding: '14px 18px', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: sel ? '#0F172A' : '#F8FAFC', color: sel ? '#fff' : '#334155',
              border: `2px solid ${sel ? '#0F172A' : '#E2E8F0'}`, transition: 'all 0.15s',
            }}>
              <span>{day}</span>
              {sel && <span style={{ fontSize: '18px' }}>🏀</span>}
            </button>
          );
        })}
      </div>

      <button className="btn btn-primary btn-full" onClick={onNext} style={{ marginTop: '24px', borderRadius: '14px', fontSize: '16px' }}>
        {gameDays.length === 0 ? 'Skip →' : 'Continue →'}
      </button>
    </div>
  );
}

function ReadyStep({ onFinish }) {
  return (
    <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: '72px', marginTop: '32px', marginBottom: '24px' }}>🚀</div>
      <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A' }}>You're all set!</h2>
      <p style={{ color: '#64748B', marginTop: '12px', fontSize: '16px', lineHeight: 1.6, maxWidth: '280px' }}>
        Your personalised routine is ready. Game days are blocked off. Train daily and build that streak.
      </p>
      <div style={{ background: '#F0F7FF', borderRadius: '16px', padding: '20px', width: '100%', marginTop: '32px', textAlign: 'left' }}>
        {['📅 7-day personalised routine', '🏀 80+ drills matched to your position', '🎮 Game days kept light', '🔥 Daily streak tracking', '🏆 Achievement badges'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 4 ? '1px solid #E0F0FF' : 'none' }}>
            <span style={{ fontSize: '15px' }}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <button className="btn btn-black btn-full" onClick={onFinish} style={{ borderRadius: '14px', fontSize: '17px', padding: '18px', marginTop: '24px' }}>
        Start Training 🏀
      </button>
    </div>
  );
}
