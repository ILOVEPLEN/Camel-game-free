import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const MILESTONES = [
  { days: 7, emoji: '🔥', label: '1 Week', reward: 'You\'re building a habit!' },
  { days: 30, emoji: '💪', label: '1 Month', reward: 'Real commitment unlocked.' },
  { days: 50, emoji: '⚡', label: '50 Days', reward: 'You\'re on another level.' },
  { days: 100, emoji: '🏆', label: '100 Days', reward: 'Elite dedication.' },
  { days: 365, emoji: '👑', label: '1 Year', reward: 'Legendary status.' },
];

function getLast35Days() {
  return Array.from({ length: 35 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (34 - i));
    return d.toDateString();
  });
}

export default function Streak() {
  const { state, useStreakFreeze } = useApp();
  const { streak } = state;
  const [freezeConfirm, setFreezeConfirm] = useState(false);

  const trainedToday = streak.lastTrainedDate === new Date().toDateString();
  const days35 = getLast35Days();
  const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleFreeze = () => {
    if (freezeConfirm) {
      useStreakFreeze();
      setFreezeConfirm(false);
    } else {
      setFreezeConfirm(true);
    }
  };

  const nextMilestone = MILESTONES.find(m => m.days > streak.current);
  const prevMilestones = MILESTONES.filter(m => m.days <= streak.current);

  return (
    <div className="page fade-in">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '56px 20px 32px',
        color: '#fff',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '8px', lineHeight: 1 }}>🔥</div>
        <div style={{ fontSize: '80px', fontWeight: '900', lineHeight: 1, letterSpacing: '-2px' }}>
          {streak.current}
        </div>
        <div style={{ fontSize: '20px', fontWeight: '600', opacity: 0.7, marginTop: '4px' }}>
          {streak.current === 1 ? 'day streak' : 'day streak'}
        </div>
        {trainedToday && (
          <div style={{ marginTop: '16px', background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '999px', padding: '8px 20px', display: 'inline-block' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#86EFAC' }}>✅ Trained today!</span>
          </div>
        )}

        {/* Stats row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '24px' }}>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '800' }}>{streak.longest}</div>
            <div style={{ fontSize: '12px', opacity: 0.6 }}>Best streak</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.15)' }}/>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '800' }}>{streak.freezesAvailable}</div>
            <div style={{ fontSize: '12px', opacity: 0.6 }}>Freezes left</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.15)' }}/>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '800' }}>{Object.keys(streak.history || {}).length}</div>
            <div style={{ fontSize: '12px', opacity: 0.6 }}>Days logged</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {/* 5-week calendar */}
        <h3 className="section-title">Activity Calendar</h3>
        <div className="card" style={{ marginBottom: '20px', padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px', marginBottom: '6px' }}>
            {DAY_LETTERS.map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: '10px', color: '#94A3B8', fontWeight: '600' }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
            {days35.map(d => {
              const entry = (streak.history || {})[d];
              const isToday = d === new Date().toDateString();
              const bg = entry === 'freeze' ? '#F59E0B'
                : entry === 'gym' ? '#7C3AED'
                : entry ? '#0EA5E9'
                : '#F8FAFC';
              const border = isToday ? '2px solid #0EA5E9' : 'none';
              return (
                <div key={d} style={{
                  aspectRatio: '1',
                  borderRadius: '5px',
                  background: bg,
                  border,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  color: entry ? '#fff' : '#E2E8F0',
                }}>
                  {new Date(d).getDate()}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
            {[
              { color: '#0EA5E9', label: 'Trained' },
              { color: '#7C3AED', label: 'Gym' },
              { color: '#F59E0B', label: 'Freeze used' },
              { color: '#F8FAFC', label: 'Rest/Missed', border: '1px solid #E2E8F0' },
            ].map(({ color, label, border }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '10px', height: '10px', background: color, borderRadius: '2px', border }} />
                <span style={{ fontSize: '10px', color: '#94A3B8' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next milestone */}
        {nextMilestone && (
          <>
            <h3 className="section-title">Next Milestone</h3>
            <div className="card" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                <span style={{ fontSize: '40px' }}>{nextMilestone.emoji}</span>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '18px' }}>{nextMilestone.label} Streak</div>
                  <div style={{ fontSize: '14px', color: '#64748B' }}>{nextMilestone.reward}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: '#64748B' }}>{streak.current} / {nextMilestone.days} days</span>
                <span style={{ fontWeight: '700', color: '#0EA5E9' }}>{nextMilestone.days - streak.current} days to go</span>
              </div>
              <div style={{ background: '#F1F5F9', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.min(100, (streak.current / nextMilestone.days) * 100)}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #38AEEC, #0EA5E9)',
                  borderRadius: '999px',
                  transition: 'width 0.6s',
                }} />
              </div>
            </div>
          </>
        )}

        {/* All milestones */}
        <h3 className="section-title">All Milestones</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {MILESTONES.map(m => {
            const reached = streak.current >= m.days;
            return (
              <div key={m.days} className="card-sm" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                opacity: reached ? 1 : 0.45,
                border: reached ? '2px solid #0EA5E9' : '2px solid transparent',
              }}>
                <span style={{ fontSize: '28px', filter: reached ? 'none' : 'grayscale(1)' }}>{m.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '15px' }}>{m.label}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{m.reward}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: reached ? '#22C55E' : '#CBD5E1' }}>
                    {reached ? '✓ Done' : `${m.days}d`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Streak Freeze */}
        <h3 className="section-title">Streak Freeze</h3>
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
            <span style={{ fontSize: '36px' }}>🧊</span>
            <div>
              <h4 style={{ fontWeight: '700', fontSize: '16px' }}>Streak Freeze</h4>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', lineHeight: 1.5 }}>
                Protect your streak when life gets busy. You have{' '}
                <strong style={{ color: '#0EA5E9' }}>{streak.freezesAvailable} freeze{streak.freezesAvailable !== 1 ? 's' : ''}</strong>{' '}
                available this month.
              </p>
            </div>
          </div>
          {trainedToday ? (
            <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '12px', fontSize: '13px', color: '#16A34A', fontWeight: '600', textAlign: 'center' }}>
              ✅ Already trained today — no freeze needed!
            </div>
          ) : streak.freezesAvailable > 0 ? (
            <button className="btn btn-outline btn-full" onClick={handleFreeze}
              style={{ borderRadius: '10px', color: freezeConfirm ? '#EF4444' : '#0F172A', borderColor: freezeConfirm ? '#EF4444' : '#E2E8F0' }}>
              {freezeConfirm ? '⚠️ Confirm — Use Freeze?' : '🧊 Use Streak Freeze Today'}
            </button>
          ) : (
            <div style={{ background: '#FEF2F2', borderRadius: '10px', padding: '12px', fontSize: '13px', color: '#EF4444', fontWeight: '600', textAlign: 'center' }}>
              No freezes remaining this month.
            </div>
          )}
        </div>

        {/* Tips */}
        <div style={{ background: '#F0F7FF', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontWeight: '700', fontSize: '14px', color: '#0369A1', marginBottom: '12px' }}>🔥 STREAK TIPS</div>
          {[
            'Even a 10-minute drill session counts — consistency beats perfection.',
            'Set a daily reminder for the same time each day.',
            'The streak builds on itself — the longer it goes, the more you want to protect it.',
            'Rest days are programmed into your routine — no guilt needed.',
          ].map((tip, i) => (
            <div key={i} style={{ fontSize: '13px', color: '#334155', padding: '5px 0', display: 'flex', gap: '8px' }}>
              <span style={{ color: '#0EA5E9' }}>•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
