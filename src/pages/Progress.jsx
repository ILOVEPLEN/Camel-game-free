import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exercises } from '../data/exercises';

const ACHIEVEMENT_DEFS = [
  { id: 'streak_7', label: '7 Day Streak', emoji: '🔥', desc: 'Train 7 days in a row' },
  { id: 'streak_30', label: '30 Day Streak', emoji: '💪', desc: 'Train 30 days in a row' },
  { id: 'streak_50', label: '50 Day Streak', emoji: '⚡', desc: 'Train 50 days in a row' },
  { id: 'streak_100', label: '100 Day Streak', emoji: '🏆', desc: 'Train 100 days in a row' },
  { id: 'streak_365', label: '365 Day Streak', emoji: '👑', desc: 'Train a full year straight' },
  { id: 'w10', label: '10 Workouts', emoji: '🌟', desc: 'Complete 10 total workouts' },
  { id: 'w50', label: '50 Workouts', emoji: '🎯', desc: 'Complete 50 total workouts' },
];

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toDateString();
  });
}

function getLast4Weeks() {
  return Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    return d.toDateString();
  });
}

export default function Progress() {
  const { state, resetOnboarding } = useApp();
  const { streak, workoutLog, achievements, gymProgress, profile } = state;
  const [section, setSection] = useState('overview');

  const thisWeekLogs = workoutLog.filter(w => {
    const d = new Date(w.date);
    const diff = (new Date() - d) / 86400000;
    return diff < 7;
  });
  const thisMonthLogs = workoutLog.filter(w => {
    const d = new Date(w.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const totalMinutes = workoutLog.reduce((s, w) => s + (w.duration || 0), 0);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Progress</h1>
        <p className="page-subtitle">Your training story</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px', overflowX: 'auto' }}>
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'activity', label: '📅 Activity' },
            { id: 'gym', label: '🏋️ Gym' },
            { id: 'badges', label: '🏆 Badges' },
          ].map(s => (
            <button key={s.id} onClick={() => setSection(s.id)} style={{
              padding: '9px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '13px',
              whiteSpace: 'nowrap',
              background: section === s.id ? '#0F172A' : '#F1F5F9',
              color: section === s.id ? '#fff' : '#64748B',
              border: 'none', cursor: 'pointer', transition: 'all 0.15s',
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {section === 'overview' && <OverviewSection streak={streak} workoutLog={workoutLog} thisWeekLogs={thisWeekLogs} thisMonthLogs={thisMonthLogs} totalMinutes={totalMinutes} onRedoSetup={resetOnboarding} />}
        {section === 'activity' && <ActivitySection workoutLog={workoutLog} streak={streak} />}
        {section === 'gym' && <GymSection gymProgress={gymProgress} />}
        {section === 'badges' && <BadgesSection achievements={achievements} />}
      </div>
    </div>
  );
}

function StatBox({ value, label, sub, color = '#0EA5E9' }) {
  return (
    <div className="card-sm" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '30px', fontWeight: '900', color }}>{value}</div>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', marginTop: '2px' }}>{label}</div>
      {sub && <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '1px' }}>{sub}</div>}
    </div>
  );
}

function OverviewSection({ streak, workoutLog, thisWeekLogs, thisMonthLogs, totalMinutes, onRedoSetup }) {
  const avgRating = workoutLog.filter(w => w.rating).reduce((s, w, _, arr) => s + w.rating / arr.length, 0);

  return (
    <>
      {/* Key stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
        <StatBox value={`${streak.current}🔥`} label="Current Streak" sub={`Best: ${streak.longest}`} color="#0F172A" />
        <StatBox value={workoutLog.length} label="Total Workouts" sub="all time" />
        <StatBox value={thisWeekLogs.length} label="This Week" sub="sessions" />
        <StatBox value={thisMonthLogs.length} label="This Month" sub="sessions" />
        <StatBox value={`${Math.floor(totalMinutes / 60)}h`} label="Total Time" sub={`${totalMinutes % 60}m`} />
        <StatBox value={avgRating ? avgRating.toFixed(1) + '⭐' : '—'} label="Avg Rating" sub="per session" />
      </div>

      {/* Weekly bar chart */}
      <h3 className="section-title">Last 7 Days</h3>
      <WeeklyChart workoutLog={workoutLog} />

      {/* Workout type breakdown */}
      {workoutLog.length > 0 && (
        <>
          <h3 className="section-title" style={{ marginTop: '24px' }}>Workout Breakdown</h3>
          <WorkoutTypeBreakdown workoutLog={workoutLog} />
        </>
      )}

      {/* Settings */}
      <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
        <h3 className="section-title">Settings</h3>
        <button onClick={onRedoSetup} style={{
          width: '100%', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '600',
          background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#334155', cursor: 'pointer',
        }}>
          ⚙️ Redo Setup &amp; Update My Profile
        </button>
      </div>
    </>
  );
}

function WeeklyChart({ workoutLog }) {
  const days = getLast7Days();
  const logDates = new Set(workoutLog.map(w => w.date));
  const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        {days.map(d => {
          const trained = logDates.has(d);
          const dayName = DAY_SHORT[new Date(d).getDay()];
          const isToday = d === new Date().toDateString();
          return (
            <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
              <div style={{
                width: '100%',
                maxWidth: '36px',
                height: '48px',
                borderRadius: '8px',
                background: trained ? '#0EA5E9' : '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}>
                {trained && '✓'}
              </div>
              <span style={{ fontSize: '11px', color: isToday ? '#0EA5E9' : '#94A3B8', fontWeight: isToday ? '700' : '400' }}>{dayName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkoutTypeBreakdown({ workoutLog }) {
  const drillCount = workoutLog.filter(w => w.type === 'drill').length;
  const gymCount = workoutLog.filter(w => w.type === 'gym').length;
  const total = workoutLog.length;

  return (
    <div className="card" style={{ padding: '20px' }}>
      {[
        { label: '🏀 Drills', count: drillCount, color: '#0EA5E9' },
        { label: '🏋️ Gym', count: gymCount, color: '#7C3AED' },
      ].map(({ label, count, color }) => (
        <div key={label} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontWeight: '600', fontSize: '14px' }}>{label}</span>
            <span style={{ fontWeight: '700', fontSize: '14px', color }}>{count} sessions</span>
          </div>
          <div style={{ background: '#F1F5F9', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
            <div style={{ width: `${total ? (count / total) * 100 : 0}%`, height: '100%', background: color, borderRadius: '999px', transition: 'width 0.6s' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivitySection({ workoutLog, streak }) {
  const weeks = getLast4Weeks();
  const logDates = new Set(workoutLog.map(w => w.date));

  const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <>
      <h3 className="section-title">4-Week Calendar</h3>
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
          {DAY_LETTERS.map((d, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {weeks.map(d => {
            const trained = logDates.has(d);
            const isToday = d === new Date().toDateString();
            return (
              <div key={d} style={{
                aspectRatio: '1',
                borderRadius: '6px',
                background: isToday ? (trained ? '#0F172A' : '#EBF5FF')
                  : trained ? '#0EA5E9' : '#F8FAFC',
                border: isToday ? '2px solid #0EA5E9' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: trained ? '#fff' : '#CBD5E1',
              }}>
                {new Date(d).getDate()}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '11px', color: '#64748B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', background: '#0EA5E9', borderRadius: '3px' }}/>
            Trained
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '3px' }}/>
            Rest / No log
          </div>
        </div>
      </div>

      <h3 className="section-title">Recent Sessions</h3>
      {workoutLog.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>
          No sessions logged yet. Get training!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {workoutLog.slice(0, 15).map((w, i) => (
            <div key={i} className="card-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '22px' }}>{w.type === 'gym' ? '🏋️' : '🏀'}</span>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{w.name}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{w.date} {w.duration ? `· ${w.duration}m` : ''}</div>
                  {w.notes && <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', fontStyle: 'italic' }}>"{w.notes}"</div>}
                </div>
              </div>
              {w.rating && <span style={{ fontSize: '12px', color: '#F59E0B' }}>{'⭐'.repeat(w.rating)}</span>}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function GymSection({ gymProgress }) {
  const trackedExercises = Object.keys(gymProgress);

  if (trackedExercises.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏋️</div>
        <h3 style={{ color: '#334155', fontWeight: '700' }}>No gym data yet</h3>
        <p style={{ fontSize: '14px', marginTop: '8px' }}>Log gym sessions to track your strength progress here.</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="section-title">Strength Progress</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {trackedExercises.map(exId => {
          const ex = exercises.find(e => e.id === exId);
          const logs = gymProgress[exId] || [];
          if (!ex || !logs.length) return null;
          const latest = logs[0];
          const prev = logs[1];
          return (
            <div key={exId} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '15px' }}>{ex.name}</h4>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{ex.muscleGroup}</div>
                </div>
                <span className="badge badge-blue">{logs.length} sessions</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '2px' }}>Latest</div>
                  <div style={{ fontWeight: '700', fontSize: '16px' }}>{latest.weight ? `${latest.weight}lbs` : latest.reps}</div>
                </div>
                {prev && (
                  <div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '2px' }}>Previous</div>
                    <div style={{ fontWeight: '600', fontSize: '16px', color: '#64748B' }}>{prev.weight ? `${prev.weight}lbs` : prev.reps}</div>
                  </div>
                )}
                {prev && latest.weight && prev.weight && latest.weight > prev.weight && (
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#22C55E', fontWeight: '700' }}>↑ +{latest.weight - prev.weight}lbs</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function BadgesSection({ achievements }) {
  const earned = new Set((achievements || []).map(a => a.id));

  return (
    <>
      <h3 className="section-title">Achievements</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {ACHIEVEMENT_DEFS.map(a => {
          const isEarned = earned.has(a.id);
          return (
            <div key={a.id} className="card-sm" style={{
              textAlign: 'center',
              opacity: isEarned ? 1 : 0.4,
              border: isEarned ? '2px solid #0EA5E9' : '2px solid transparent',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '8px', filter: isEarned ? 'none' : 'grayscale(1)' }}>{a.emoji}</div>
              <div style={{ fontWeight: '700', fontSize: '13px', color: '#0F172A' }}>{a.label}</div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>{a.desc}</div>
              {isEarned && <div style={{ fontSize: '10px', color: '#0EA5E9', marginTop: '6px', fontWeight: '600' }}>EARNED ✓</div>}
            </div>
          );
        })}
      </div>
    </>
  );
}
