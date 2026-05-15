import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import WorkoutLogger from '../components/WorkoutLogger';

const MOTIVATIONS = [
  "Champions train when no one's watching.",
  "Every rep is a step closer to the player you want to be.",
  "The work you put in today is the performance you see tomorrow.",
  "Hard work beats talent when talent doesn't work hard.",
  "Your only competition is who you were yesterday.",
  "Greatness is earned one drill at a time.",
  "The court doesn't care about excuses.",
  "Today's training is tomorrow's highlight reel.",
  "Pain is temporary. Skill is permanent.",
  "Show up. Put in work. Repeat.",
];

const today = () => new Date().toDateString();

function getDayOfWeek() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getTodayWorkout(routine) {
  if (!routine) return null;
  const dayIdx = new Date().getDay();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return routine[days[dayIdx]] || null;
}

export default function Home({ onNavigate }) {
  const { state, trainedToday } = useApp();
  const { streak, workoutLog, profile } = state;
  const [loggerOpen, setLoggerOpen] = useState(false);
  const [loggerType, setLoggerType] = useState('drill');

  const todayWorkout = getTodayWorkout(state.routine);
  const motivation = MOTIVATIONS[new Date().getDate() % MOTIVATIONS.length];
  const thisWeek = workoutLog.filter(w => {
    const d = new Date(w.date);
    const now = new Date();
    const diff = (now - d) / 86400000;
    return diff < 7;
  }).length;
  const thisMonth = workoutLog.filter(w => {
    const d = new Date(w.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="page fade-in">
      {/* Header */}
      <div style={{ padding: '56px 20px 0', background: 'linear-gradient(180deg, #0EA5E9 0%, #0284C7 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '14px', opacity: 0.8, fontWeight: '500' }}>{getGreeting()}</p>
            <h1 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '-0.5px', marginTop: '2px' }}>
              {getDayOfWeek()}
            </h1>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '20px' }}>🔥</span>
            <span style={{ fontSize: '22px', fontWeight: '900' }}>{streak.current}</span>
          </div>
        </div>

        {/* Streak bar */}
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '14px', padding: '14px 16px', marginTop: '20px', marginBottom: '-20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '13px', opacity: 0.8, fontWeight: '500' }}>Current Streak</div>
              <div style={{ fontSize: '28px', fontWeight: '900', lineHeight: 1.1 }}>
                {streak.current} {streak.current === 1 ? 'day' : 'days'} 🔥
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>Best</div>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>{streak.longest}d</div>
            </div>
          </div>
          {trainedToday && (
            <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '6px 10px', display: 'inline-block' }}>
              <span style={{ fontSize: '12px', fontWeight: '600' }}>✅ Trained today!</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '32px 20px 0' }}>
        {/* Quote */}
        <p style={{ fontSize: '14px', color: '#64748B', fontStyle: 'italic', marginBottom: '20px', lineHeight: 1.5 }}>
          "{motivation}"
        </p>

        {/* Today's Workout Card */}
        {todayWorkout ? (
          <TodayWorkoutCard workout={todayWorkout} trainedToday={trainedToday}
            onStart={() => { setLoggerType(todayWorkout.type); setLoggerOpen(true); }}
            onNavigate={onNavigate} />
        ) : !state.routine ? (
          <div className="card" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0369A1)', color: '#fff', marginBottom: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🤖</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>No routine yet</h3>
            <p style={{ opacity: 0.85, fontSize: '14px', marginTop: '6px', marginBottom: '16px' }}>
              Let AI build your personalized weekly training plan.
            </p>
            <button className="btn" onClick={() => onNavigate('generate')}
              style={{ background: '#fff', color: '#0EA5E9', fontWeight: '700', borderRadius: '10px', padding: '12px 20px', fontSize: '14px' }}>
              Generate My Plan →
            </button>
          </div>
        ) : (
          <div className="card" style={{ marginBottom: '20px', textAlign: 'center', padding: '28px' }}>
            <div style={{ fontSize: '40px' }}>😴</div>
            <h3 style={{ fontWeight: '700', marginTop: '12px' }}>Rest Day</h3>
            <p style={{ color: '#64748B', fontSize: '14px', marginTop: '6px' }}>Recovery is part of training. Your body thanks you.</p>
          </div>
        )}

        {/* Quick Actions */}
        <h3 className="section-title">Quick Start</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Drills', emoji: '🏀', sub: 'Skill work', page: 'train', type: 'drill' },
            { label: 'Gym', emoji: '🏋️', sub: 'Strength', page: 'train', type: 'gym' },
            { label: 'AI Plan', emoji: '🤖', sub: 'Generate', page: 'generate', type: null },
            { label: 'Progress', emoji: '📈', sub: 'Your stats', page: 'progress', type: null },
          ].map(a => (
            <button key={a.label} onClick={() => onNavigate(a.page)} style={{
              background: '#fff',
              border: '1.5px solid #E2E8F0',
              borderRadius: '14px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '4px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: '26px' }}>{a.emoji}</span>
              <span style={{ fontWeight: '700', fontSize: '15px', color: '#0F172A' }}>{a.label}</span>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>{a.sub}</span>
            </button>
          ))}
        </div>

        {/* Stats Row */}
        <h3 className="section-title">This Week</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'This Week', value: thisWeek, sub: 'sessions' },
            { label: 'This Month', value: thisMonth, sub: 'sessions' },
            { label: 'All Time', value: workoutLog.length, sub: 'total' },
          ].map(s => (
            <div key={s.label} className="card-sm" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A' }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px', fontWeight: '500' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Next milestone */}
        <NextMilestone streak={streak.current} />

        {/* Recent Activity */}
        {workoutLog.length > 0 && (
          <>
            <h3 className="section-title" style={{ marginTop: '24px' }}>Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {workoutLog.slice(0, 5).map((w, i) => (
                <div key={i} className="card-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{w.type === 'gym' ? '🏋️' : '🏀'}</span>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>{w.name || 'Workout'}</div>
                      <div style={{ fontSize: '12px', color: '#94A3B8' }}>{w.date}</div>
                    </div>
                  </div>
                  {w.rating && <span style={{ fontSize: '12px', color: '#94A3B8' }}>{'⭐'.repeat(w.rating)}</span>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {loggerOpen && (
        <WorkoutLogger type={loggerType} workout={todayWorkout} onClose={() => setLoggerOpen(false)} />
      )}
    </div>
  );
}

function TodayWorkoutCard({ workout, trainedToday, onStart, onNavigate }) {
  return (
    <div className="card" style={{ marginBottom: '20px', border: '2px solid #EBF5FF' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <span className="badge badge-blue">Today's Workout</span>
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '8px', color: '#0F172A' }}>{workout.name}</h3>
        </div>
        <span style={{ fontSize: '32px' }}>{workout.type === 'gym' ? '🏋️' : '🏀'}</span>
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration</div>
          <div style={{ fontWeight: '700', fontSize: '15px' }}>{workout.duration} min</div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Focus</div>
          <div style={{ fontWeight: '700', fontSize: '15px' }}>{workout.focus || workout.type}</div>
        </div>
      </div>
      {workout.items && (
        <div style={{ marginBottom: '16px' }}>
          {workout.items.slice(0, 3).map((item, i) => (
            <div key={i} style={{ fontSize: '13px', color: '#64748B', padding: '3px 0' }}>
              • {item}
            </div>
          ))}
          {workout.items.length > 3 && <div style={{ fontSize: '13px', color: '#94A3B8' }}>+{workout.items.length - 3} more</div>}
        </div>
      )}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="btn btn-primary" onClick={onStart}
          style={{ flex: 1, borderRadius: '10px', padding: '13px', opacity: trainedToday ? 0.6 : 1 }}>
          {trainedToday ? '✅ Done Today' : '▶ Start Workout'}
        </button>
        <button className="btn btn-outline" onClick={() => onNavigate('train')}
          style={{ padding: '13px 16px', borderRadius: '10px', fontSize: '14px' }}>
          Swap
        </button>
      </div>
    </div>
  );
}

function NextMilestone({ streak }) {
  const milestones = [7, 30, 50, 100, 365];
  const next = milestones.find(m => m > streak);
  if (!next) return null;
  const pct = Math.min(100, Math.round((streak / next) * 100));
  return (
    <div className="card" style={{ marginBottom: '0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontWeight: '700', fontSize: '15px' }}>Next Milestone</span>
        <span style={{ fontSize: '18px' }}>🏆</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: '#64748B', fontSize: '13px' }}>{streak} / {next} day streak</span>
        <span style={{ fontWeight: '700', fontSize: '13px', color: '#0EA5E9' }}>{next - streak} days away</span>
      </div>
      <div style={{ background: '#F1F5F9', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #38AEEC, #0EA5E9)', borderRadius: '999px', transition: 'width 0.5s' }} />
      </div>
    </div>
  );
}
