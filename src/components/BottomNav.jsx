import React from 'react';

const tabs = [
  {
    id: 'home',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    )
  },
  {
    id: 'train',
    label: 'Train',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="3" fill={active ? 'currentColor' : 'none'}/>
        <line x1="12" y1="2" x2="12" y2="5"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="5" y2="12"/>
        <line x1="19" y1="12" x2="22" y2="12"/>
      </svg>
    )
  },
  {
    id: 'generate',
    label: 'AI Plan',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        {active && <path d="M4 20h16" strokeWidth="2.5"/>}
        {!active && <path d="M4 20h16"/>}
      </svg>
    )
  },
  {
    id: 'streak',
    label: 'Streak',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    )
  },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 'calc(72px + env(safe-area-inset-bottom, 0px))',
      background: '#fff',
      borderTop: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: '8px',
      zIndex: 100,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              padding: '4px 0',
              color: isActive ? '#0EA5E9' : '#94A3B8',
              transition: 'color 0.15s',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {tab.icon(isActive)}
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? '700' : '500',
              letterSpacing: '0.2px',
            }}>
              {tab.label}
            </span>
            {isActive && (
              <span style={{
                position: 'absolute',
                bottom: 'calc(env(safe-area-inset-bottom, 0px) + 68px)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#0EA5E9',
              }}/>
            )}
          </button>
        );
      })}
    </nav>
  );
}
