import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const TAB_LABELS = {
  about:      '🖥️ My Computer',
  projects:   '📁 My Projects',
  skills:     '⚙️ Control Panel',
  experience: '📄 Work History.txt',
  contact:    '✉️ Contact.exe',
};

export default function Taskbar({ activeTab, onTabChange }) {
  const isMobile = useIsMobile();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const separator = (
    <div
      style={{
        width: '2px',
        height: '24px',
        borderLeft: '1px solid #808080',
        borderRight: '1px solid #FFFFFF',
        flexShrink: 0,
      }}
    />
  );

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: '#C0C0C0',
        borderTop: '2px solid #FFFFFF',
        boxShadow: 'inset 0 1px 0 #FFFFFF',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        height: '34px',
      }}
    >
      {/* Start button */}
      <button
        className="win-button"
        style={{
          fontWeight: 'bold',
          padding: '2px 10px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          height: '26px',
        }}
        onClick={() => onTabChange?.('about')}
      >
        <span style={{ fontSize: '14px' }}>🪟</span>{!isMobile && ' Start'}
      </button>

      {separator}

      {/* Active window button */}
      {activeTab && (
        <button
          className={activeTab ? 'taskbar-btn taskbar-btn-active' : 'taskbar-btn'}
          style={{
            padding: '2px 10px',
            fontSize: '11px',
            height: '26px',
            maxWidth: isMobile ? '120px' : '220px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {TAB_LABELS[activeTab] ?? '🪟 RavenOS 95'}
        </button>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {separator}

      {/* Clock */}
      <div
        style={{
          border: '2px solid',
          borderColor: '#808080 #FFFFFF #FFFFFF #808080',
          padding: '2px 10px',
          fontSize: '12px',
          minWidth: '52px',
          textAlign: 'center',
          fontFamily: '"Courier New", monospace',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#C0C0C0',
        }}
      >
        {time}
      </div>
    </div>
  );
}
