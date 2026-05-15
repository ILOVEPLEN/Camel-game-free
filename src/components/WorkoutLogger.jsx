import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { drills } from '../data/drills';
import { exercises } from '../data/exercises';

export default function WorkoutLogger({ type, workout, onClose, drillId, exerciseId }) {
  const { completeTraining } = useApp();
  const [step, setStep] = useState('active'); // active | rest | done
  const [restTime, setRestTime] = useState(90);
  const [restLeft, setRestLeft] = useState(90);
  const [elapsed, setElapsed] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(3);
  const timerRef = useRef(null);
  const restRef = useRef(null);

  const item = drillId ? drills.find(d => d.id === drillId)
    : exerciseId ? exercises.find(e => e.id === exerciseId)
    : null;

  const items = workout?.items || (item ? [item.name] : ['Training session']);
  const sessionName = workout?.name || item?.name || 'Workout';

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const startRest = (seconds = 90) => {
    setStep('rest');
    setRestLeft(seconds);
    restRef.current = setInterval(() => {
      setRestLeft(r => {
        if (r <= 1) {
          clearInterval(restRef.current);
          setStep('active');
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  };

  const skipRest = () => {
    clearInterval(restRef.current);
    setStep('active');
  };

  const finish = () => {
    clearInterval(timerRef.current);
    clearInterval(restRef.current);
    const mins = Math.round(elapsed / 60);
    completeTraining({
      type: type || 'drill',
      name: sessionName,
      duration: mins,
      notes,
      rating,
      items: checkedItems,
    });
    setStep('done');
  };

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)', zIndex: 200,
      display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="slide-up" style={{
        background: '#fff',
        borderRadius: '24px 24px 0 0',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: '40px', height: '4px', background: '#E2E8F0', borderRadius: '999px' }} />
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '16px 20px 32px' }}>
          {step === 'done' ? (
            <DoneScreen notes={notes} setNotes={setNotes} rating={rating} setRating={setRating}
              elapsed={elapsed} checkedItems={checkedItems} items={items} onClose={onClose} />
          ) : step === 'rest' ? (
            <RestScreen restLeft={restLeft} setRestTime={setRestTime} onSkip={skipRest} fmt={fmt} />
          ) : (
            <ActiveScreen sessionName={sessionName} items={items} checkedItems={checkedItems}
              setCheckedItems={setCheckedItems} elapsed={elapsed} onRest={startRest}
              onFinish={finish} fmt={fmt} type={type} item={item} />
          )}
        </div>
      </div>
    </div>
  );
}

function ActiveScreen({ sessionName, items, checkedItems, setCheckedItems, elapsed, onRest, onFinish, fmt, type, item }) {
  const toggle = (i) => {
    setCheckedItems(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };
  const allDone = items.length > 0 && checkedItems.length === items.length;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {type === 'gym' ? 'Gym Session' : 'Drill Session'}
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{sessionName}</h2>
        </div>
        <div style={{ background: '#0EA5E9', color: '#fff', borderRadius: '12px', padding: '8px 14px', fontWeight: '700', fontSize: '18px', fontVariantNumeric: 'tabular-nums' }}>
          {fmt(elapsed)}
        </div>
      </div>

      {/* Instructions if single item */}
      {item?.instructions && (
        <div style={{ background: '#F0F7FF', borderRadius: '12px', padding: '14px', marginBottom: '20px' }}>
          <div style={{ fontWeight: '700', fontSize: '13px', color: '#0369A1', marginBottom: '8px' }}>HOW TO DO IT</div>
          {item.instructions.slice(0, 4).map((inst, i) => (
            <div key={i} style={{ fontSize: '13px', color: '#334155', padding: '3px 0', display: 'flex', gap: '8px' }}>
              <span style={{ color: '#94A3B8', minWidth: '16px' }}>{i + 1}.</span>
              <span>{inst}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '12px' }}>
        Checklist ({checkedItems.length}/{items.length})
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {items.map((it, i) => {
          const done = checkedItems.includes(i);
          return (
            <button key={i} onClick={() => toggle(i)} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px', borderRadius: '12px',
              background: done ? '#F0FDF4' : '#F8FAFC',
              border: `1.5px solid ${done ? '#86EFAC' : '#E2E8F0'}`,
              cursor: 'pointer', textAlign: 'left', width: '100%',
              transition: 'all 0.15s',
            }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: done ? '#22C55E' : '#fff',
                border: `2px solid ${done ? '#22C55E' : '#CBD5E1'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}>
                {done && <span style={{ color: '#fff', fontSize: '13px', fontWeight: '700' }}>✓</span>}
              </div>
              <span style={{ fontWeight: '500', fontSize: '14px', color: done ? '#16A34A' : '#334155', textDecoration: done ? 'line-through' : 'none' }}>
                {it}
              </span>
            </button>
          );
        })}
      </div>

      {type === 'gym' && (
        <button className="btn btn-outline btn-full" onClick={() => onRest(90)} style={{ marginBottom: '12px', borderRadius: '12px' }}>
          ⏱ Start Rest Timer (90s)
        </button>
      )}

      <button className="btn btn-primary btn-full" onClick={onFinish}
        style={{ borderRadius: '12px', background: allDone ? '#22C55E' : '#0EA5E9' }}>
        {allDone ? '✅ Complete Workout' : 'Finish Early'}
      </button>
    </>
  );
}

function RestScreen({ restLeft, onSkip, fmt }) {
  const pct = restLeft / 90;
  const r = 54;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
      <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '32px' }}>Rest Time</h2>
      <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '32px' }}>
        <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="80" cy="80" r={r} fill="none" stroke="#E2E8F0" strokeWidth="8"/>
          <circle cx="80" cy="80" r={r} fill="none" stroke="#0EA5E9" strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }}/>
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ fontSize: '40px', fontWeight: '900', fontVariantNumeric: 'tabular-nums' }}>{restLeft}</span>
          <span style={{ fontSize: '13px', color: '#94A3B8' }}>seconds</span>
        </div>
      </div>
      <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '24px' }}>Breathe. Next set coming up.</p>
      <button className="btn btn-outline" onClick={onSkip} style={{ borderRadius: '12px', padding: '12px 32px' }}>
        Skip Rest
      </button>
    </div>
  );
}

function DoneScreen({ notes, setNotes, rating, setRating, elapsed, checkedItems, items, onClose }) {
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '16px', marginTop: '8px' }}>🔥</div>
      <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A' }}>Workout Complete!</h2>
      <p style={{ color: '#64748B', marginTop: '8px', marginBottom: '24px' }}>
        {checkedItems.length}/{items.length} items done · {mins}m {secs}s
      </p>

      <div style={{ background: '#F0F7FF', borderRadius: '14px', padding: '20px', width: '100%', marginBottom: '20px' }}>
        <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>Rate this session</div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map(r => (
            <button key={r} onClick={() => setRating(r)} style={{
              fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer',
              opacity: r <= rating ? 1 : 0.3, transition: 'opacity 0.15s'
            }}>⭐</button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', marginBottom: '20px' }}>
        <label style={{ fontWeight: '700', fontSize: '14px', display: 'block', marginBottom: '8px' }}>Notes (optional)</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)}
          placeholder="How did it go? What felt good or hard?"
          style={{
            width: '100%', borderRadius: '12px', border: '1.5px solid #E2E8F0',
            padding: '12px', fontSize: '14px', resize: 'none', minHeight: '80px',
            fontFamily: 'inherit', outline: 'none',
          }}/>
      </div>

      <button className="btn btn-black btn-full" onClick={onClose} style={{ borderRadius: '12px' }}>
        Done 🏀
      </button>
    </div>
  );
}
