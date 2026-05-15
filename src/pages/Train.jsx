import React, { useState } from 'react';
import { drills, DRILL_CATEGORIES } from '../data/drills';
import { exercises, MUSCLE_GROUPS } from '../data/exercises';
import { useApp } from '../context/AppContext';
import WorkoutLogger from '../components/WorkoutLogger';

export default function Train() {
  const [tab, setTab] = useState('drills');
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [logDrillId, setLogDrillId] = useState(null);
  const [logExerciseId, setLogExerciseId] = useState(null);

  if (selectedDrill) return <DrillDetail drill={selectedDrill} onBack={() => setSelectedDrill(null)} onStart={() => { setLogDrillId(selectedDrill.id); setSelectedDrill(null); }} />;
  if (selectedExercise) return <ExerciseDetail exercise={selectedExercise} onBack={() => setSelectedExercise(null)} onStart={() => { setLogExerciseId(selectedExercise.id); setSelectedExercise(null); }} />;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Train</h1>
        <p className="page-subtitle">Drills & gym workouts</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
          {['drills', 'gym'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '14px',
              background: tab === t ? '#0F172A' : '#F1F5F9',
              color: tab === t ? '#fff' : '#64748B',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s',
              textTransform: 'capitalize',
            }}>{t === 'drills' ? '🏀 Drills' : '🏋️ Gym'}</button>
          ))}
        </div>
      </div>

      {tab === 'drills'
        ? <DrillsTab onSelect={setSelectedDrill} />
        : <GymTab onSelect={setSelectedExercise} />
      }

      {logDrillId && (
        <WorkoutLogger type="drill" drillId={logDrillId} onClose={() => setLogDrillId(null)} />
      )}
      {logExerciseId && (
        <WorkoutLogger type="gym" exerciseId={logExerciseId} onClose={() => setLogExerciseId(null)} />
      )}
    </div>
  );
}

function DrillsTab({ onSelect }) {
  const { state, toggleFavorite } = useApp();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showFavs, setShowFavs] = useState(false);

  const filtered = drills.filter(d => {
    if (showFavs && !state.favorites.includes(d.id)) return false;
    if (category !== 'All' && d.category !== category) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ padding: '16px 20px' }}>
      <input
        type="search"
        placeholder="Search drills..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '12px 16px', borderRadius: '12px',
          border: '1.5px solid #E2E8F0', fontSize: '15px', marginBottom: '14px',
          background: '#fff', outline: 'none', fontFamily: 'inherit',
        }}
      />

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
        <button onClick={() => setShowFavs(!showFavs)} className={`chip ${showFavs ? 'chip-active' : 'chip-inactive'}`} style={{ whiteSpace: 'nowrap' }}>
          ❤️ Favorites
        </button>
        {DRILL_CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`chip ${category === c ? 'chip-active' : 'chip-inactive'}`} style={{ whiteSpace: 'nowrap' }}>
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>
          No drills found
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(drill => (
          <DrillCard key={drill.id} drill={drill}
            isFav={state.favorites.includes(drill.id)}
            onToggleFav={() => toggleFavorite(drill.id)}
            onSelect={() => onSelect(drill)}
          />
        ))}
      </div>
    </div>
  );
}

function DrillCard({ drill, isFav, onToggleFav, onSelect }) {
  return (
    <div className="card" style={{ padding: '16px' }} onClick={onSelect}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className={`badge ${drill.category === 'Shooting' ? 'badge-blue' : drill.category === 'Conditioning' ? 'badge-orange' : drill.category === 'Defense' ? 'badge-red' : 'badge-green'}`}>
              {drill.category}
            </span>
            <span className={`badge ${drill.difficulty === 'Beginner' ? 'badge-green' : drill.difficulty === 'Intermediate' ? 'badge-orange' : 'badge-red'}`}>
              {drill.difficulty}
            </span>
          </div>
          <h3 style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A' }}>{drill.name}</h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', lineHeight: 1.4 }}>{drill.description}</p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>⏱ {drill.duration} min</span>
            {drill.equipment.length > 0 && (
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>🏀 {drill.equipment.join(', ')}</span>
            )}
          </div>
        </div>
        <button onClick={e => { e.stopPropagation(); onToggleFav(); }} style={{
          background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '4px', marginLeft: '8px',
        }}>
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}

function GymTab({ onSelect }) {
  const [group, setGroup] = useState('All');

  const filtered = exercises.filter(e => group === 'All' || e.muscleGroup === group);

  const grouped = MUSCLE_GROUPS.filter(g => g !== 'All').reduce((acc, g) => {
    const items = filtered.filter(e => e.muscleGroup === g);
    if (items.length) acc[g] = items;
    return acc;
  }, {});

  return (
    <div style={{ padding: '16px 20px' }}>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
        {MUSCLE_GROUPS.map(g => (
          <button key={g} onClick={() => setGroup(g)} className={`chip ${group === g ? 'chip-active' : 'chip-inactive'}`} style={{ whiteSpace: 'nowrap' }}>
            {g}
          </button>
        ))}
      </div>

      {Object.entries(grouped).map(([grp, exs]) => (
        <div key={grp} style={{ marginBottom: '24px' }}>
          <h3 style={{ fontWeight: '800', fontSize: '16px', color: '#0F172A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {MUSCLE_EMOJI[grp]} {grp}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {exs.map(ex => (
              <ExerciseCard key={ex.id} exercise={ex} onSelect={() => onSelect(ex)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const MUSCLE_EMOJI = {
  Chest: '🫀', Back: '💪', Shoulders: '🏋️', Arms: '💪', Legs: '🦵', Core: '⚡', Calves: '🦶'
};

function ExerciseCard({ exercise, onSelect }) {
  return (
    <div className="card" style={{ padding: '14px' }} onClick={onSelect}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
            <span className={`badge ${exercise.difficulty === 'Beginner' ? 'badge-green' : exercise.difficulty === 'Intermediate' ? 'badge-orange' : 'badge-red'}`}>
              {exercise.difficulty}
            </span>
            <span className="badge badge-gray">{exercise.equipment}</span>
          </div>
          <h3 style={{ fontWeight: '700', fontSize: '15px', color: '#0F172A' }}>{exercise.name}</h3>
          <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>{exercise.sets} sets × {exercise.reps}</span>
          </div>
        </div>
        <span style={{ color: '#CBD5E1', fontSize: '18px', marginTop: '2px' }}>›</span>
      </div>
    </div>
  );
}

function DrillDetail({ drill, onBack, onStart }) {
  return (
    <div className="page fade-in">
      <div style={{ background: '#0F172A', padding: '56px 20px 24px', color: '#fff' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '10px', padding: '8px 14px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}>
          ← Back
        </button>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <span className="badge badge-blue">{drill.category}</span>
          <span className={`badge ${drill.difficulty === 'Beginner' ? 'badge-green' : drill.difficulty === 'Intermediate' ? 'badge-orange' : 'badge-red'}`}>{drill.difficulty}</span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '-0.5px' }}>{drill.name}</h1>
        <div style={{ display: 'flex', gap: '20px', marginTop: '12px', opacity: 0.7, fontSize: '14px' }}>
          <span>⏱ {drill.duration} min</span>
          {drill.equipment.length > 0 && <span>🏀 {drill.equipment.join(', ')}</span>}
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div className="card" style={{ marginBottom: '16px' }}>
          <h3 style={{ fontWeight: '700', fontSize: '15px', marginBottom: '10px' }}>Overview</h3>
          <p style={{ color: '#334155', fontSize: '15px', lineHeight: 1.6 }}>{drill.description}</p>
        </div>

        <div className="card" style={{ marginBottom: '16px' }}>
          <h3 style={{ fontWeight: '700', fontSize: '15px', marginBottom: '12px' }}>How To Do It</h3>
          {drill.instructions.map((inst, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '8px 0', borderBottom: i < drill.instructions.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <span style={{ width: '24px', height: '24px', background: '#EBF5FF', color: '#0EA5E9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
                {i + 1}
              </span>
              <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.5 }}>{inst}</p>
            </div>
          ))}
        </div>

        {drill.tips && (
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ fontWeight: '700', fontSize: '13px', color: '#D97706', marginBottom: '6px' }}>💡 PRO TIP</div>
            <p style={{ fontSize: '14px', color: '#78350F', lineHeight: 1.5 }}>{drill.tips}</p>
          </div>
        )}

        <button className="btn btn-primary btn-full" onClick={onStart} style={{ borderRadius: '12px', fontSize: '16px' }}>
          ▶ Start This Drill
        </button>
      </div>
    </div>
  );
}

function ExerciseDetail({ exercise, onBack, onStart }) {
  return (
    <div className="page fade-in">
      <div style={{ background: '#0F172A', padding: '56px 20px 24px', color: '#fff' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '10px', padding: '8px 14px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}>
          ← Back
        </button>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <span className="badge badge-blue">{exercise.muscleGroup}</span>
          <span className={`badge ${exercise.difficulty === 'Beginner' ? 'badge-green' : exercise.difficulty === 'Intermediate' ? 'badge-orange' : 'badge-red'}`}>{exercise.difficulty}</span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '900' }}>{exercise.name}</h1>
        <div style={{ display: 'flex', gap: '20px', marginTop: '12px', opacity: 0.7, fontSize: '14px' }}>
          <span>📋 {exercise.sets} sets × {exercise.reps}</span>
          <span>🏋️ {exercise.equipment}</span>
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div className="card" style={{ marginBottom: '16px' }}>
          <h3 style={{ fontWeight: '700', fontSize: '15px', marginBottom: '10px' }}>Why This Exercise</h3>
          <p style={{ color: '#334155', fontSize: '15px', lineHeight: 1.6 }}>{exercise.description}</p>
        </div>

        <div className="card" style={{ marginBottom: '16px' }}>
          <h3 style={{ fontWeight: '700', fontSize: '15px', marginBottom: '12px' }}>Instructions</h3>
          {exercise.instructions.map((inst, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '8px 0', borderBottom: i < exercise.instructions.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <span style={{ width: '24px', height: '24px', background: '#EBF5FF', color: '#0EA5E9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
                {i + 1}
              </span>
              <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.5 }}>{inst}</p>
            </div>
          ))}
        </div>

        {exercise.progression && (
          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ fontWeight: '700', fontSize: '13px', color: '#16A34A', marginBottom: '6px' }}>📈 PROGRESSION</div>
            <p style={{ fontSize: '14px', color: '#14532D', lineHeight: 1.5 }}>{exercise.progression}</p>
          </div>
        )}

        <button className="btn btn-primary btn-full" onClick={onStart} style={{ borderRadius: '12px', fontSize: '16px' }}>
          ▶ Log This Exercise
        </button>
      </div>
    </div>
  );
}
