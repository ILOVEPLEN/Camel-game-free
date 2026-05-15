import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateRoutine } from './Generate';

const STEPS = ['Welcome', 'Goals', 'Setup', 'Ready'];

const GOAL_OPTIONS = [
  { id: 'shooting', label: 'Improve Shooting', emoji: '🏀' },
  { id: 'handles', label: 'Ball Handling', emoji: '✋' },
  { id: 'strength', label: 'Build Strength', emoji: '💪' },
  { id: 'speed', label: 'Speed & Conditioning', emoji: '⚡' },
  { id: 'defense', label: 'Sharpen Defense', emoji: '🛡️' },
  { id: 'allaround', label: 'All-Around Game', emoji: '⭐' },
];

export default function Onboarding() {
  const { setProfile, setRoutine } = useApp();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState([]);
  const [time, setTime] = useState(45);
  const [level, setLevel] = useState('Intermediate');
  const [gym, setGym] = useState(false);
  const [equipment, setEquipment] = useState(['Basketball', 'Hoop']);

  const toggleGoal = (id) => {
    setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const finish = () => {
    const profile = { goals, timePerDay: time, equipment, skillLevel: level, gymAccess: gym };
    setProfile(profile);
    const routine = generateRoutine(profile);
    setRoutine(routine);
  };

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', paddingTop: '60px', paddingBottom: '8px' }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{
            width: i === step ? '24px' : '8px',
            height: '8px',
            borderRadius: '999px',
            background: i <= step ? '#0EA5E9' : '#E2E8F0',
            transition: 'all 0.3s',
          }}/>
        ))}
      </div>

      <div style={{ flex: 1, padding: '24px 24px 40px', display: 'flex', flexDirection: 'column' }}>
        {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}
        {step === 1 && (
          <GoalsStep goals={goals} onToggle={toggleGoal} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <SetupStep time={time} setTime={setTime} level={level} setLevel={setLevel}
            gym={gym} setGym={setGym} equipment={equipment} setEquipment={setEquipment}
            onNext={() => setStep(3)} />
        )}
        {step === 3 && <ReadyStep onFinish={finish} goals={goals} time={time} level={level} />}
      </div>
    </div>
  );
}

function WelcomeStep({ onNext }) {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
      <div style={{ fontSize: '80px', marginBottom: '24px', marginTop: '20px' }}>🏀</div>
      <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0F172A', letterSpacing: '-1px', lineHeight: 1.1 }}>
        Project Ball
      </h1>
      <p style={{ color: '#64748B', fontSize: '17px', marginTop: '16px', lineHeight: 1.6, maxWidth: '280px' }}>
        Your personal basketball training system. Build skills, track progress, and never miss a day.
      </p>
      <div style={{ flex: 1 }} />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          {['Drill Library', 'AI Routines', 'Streak Tracking', 'Gym Workouts'].map(f => (
            <span key={f} className="chip chip-inactive" style={{ fontSize: '12px' }}>{f}</span>
          ))}
        </div>
        <button className="btn btn-black btn-full" onClick={onNext} style={{ borderRadius: '14px', fontSize: '17px', padding: '18px' }}>
          Let's Get Started →
        </button>
      </div>
    </div>
  );
}

function GoalsStep({ goals, onToggle, onNext }) {
  return (
    <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>What's your focus?</h2>
      <p style={{ color: '#64748B', marginTop: '8px', marginBottom: '24px' }}>Select all that apply. We'll build your routine around these.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flex: 1 }}>
        {GOAL_OPTIONS.map(g => {
          const selected = goals.includes(g.id);
          return (
            <button key={g.id} onClick={() => onToggle(g.id)} style={{
              background: selected ? '#0F172A' : '#F8FAFC',
              border: `2px solid ${selected ? '#0F172A' : '#E2E8F0'}`,
              borderRadius: '14px',
              padding: '20px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: '28px' }}>{g.emoji}</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: selected ? '#fff' : '#334155', textAlign: 'center' }}>{g.label}</span>
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

function SetupStep({ time, setTime, level, setLevel, gym, setGym, equipment, setEquipment, onNext }) {
  const equipOptions = ['Basketball', 'Hoop', 'Jump Rope', 'Agility Ladder', 'Cones', 'Barbell', 'Dumbbells', 'Pull-up Bar', 'Plyo Box'];

  const toggleEquip = (e) => {
    setEquipment(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);
  };

  return (
    <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>Quick setup</h2>
      <p style={{ color: '#64748B', marginTop: '8px', marginBottom: '24px' }}>Tell us about your situation.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
        <div>
          <label style={{ fontWeight: '700', fontSize: '15px', display: 'block', marginBottom: '12px' }}>
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
                background: level === l ? '#0F172A' : '#F8FAFC',
                color: level === l ? '#fff' : '#64748B',
                border: `2px solid ${level === l ? '#0F172A' : '#E2E8F0'}`,
                transition: 'all 0.15s',
              }}>{l}</button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontWeight: '700', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Gym access?</label>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            {[true, false].map(v => (
              <button key={String(v)} onClick={() => setGym(v)} style={{
                flex: 1, padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                background: gym === v ? '#0F172A' : '#F8FAFC',
                color: gym === v ? '#fff' : '#64748B',
                border: `2px solid ${gym === v ? '#0F172A' : '#E2E8F0'}`,
                transition: 'all 0.15s',
              }}>{v ? 'Yes, I have gym access' : 'No gym, home only'}</button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontWeight: '700', fontSize: '15px', display: 'block', marginBottom: '12px' }}>Equipment available</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {equipOptions.map(e => (
              <button key={e} onClick={() => toggleEquip(e)} className={`chip ${equipment.includes(e) ? 'chip-active' : 'chip-inactive'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="btn btn-primary btn-full" onClick={onNext} style={{ marginTop: '24px', borderRadius: '14px', fontSize: '16px' }}>
        Continue →
      </button>
    </div>
  );
}

function ReadyStep({ onFinish, goals, time, level }) {
  return (
    <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: '72px', marginTop: '32px', marginBottom: '24px' }}>🚀</div>
      <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A' }}>You're all set!</h2>
      <p style={{ color: '#64748B', marginTop: '12px', fontSize: '16px', lineHeight: 1.6, maxWidth: '280px' }}>
        Your AI-personalized routine is ready. {time} minutes a day to level up your game.
      </p>
      <div style={{ background: '#F0F7FF', borderRadius: '16px', padding: '20px', width: '100%', marginTop: '32px', textAlign: 'left' }}>
        <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>YOUR PLAN INCLUDES</div>
        {[
          '📅 7-day personalized routine',
          '🏀 Drills matched to your goals',
          gym => gym ? '🏋️ Gym workouts included' : '🏠 Home-friendly workouts',
          '🔥 Daily streak tracking',
          '📈 Progress dashboard',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 4 ? '1px solid #E0F0FF' : 'none' }}>
            <span style={{ fontSize: '15px' }}>{typeof item === 'function' ? item() : item}</span>
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
