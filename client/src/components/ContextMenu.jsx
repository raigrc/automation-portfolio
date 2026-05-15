import { useEffect, useRef } from 'react';

export default function ContextMenu({ items, position, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const x = Math.min(position.x, window.innerWidth - 164);
  const y = Math.min(position.y, window.innerHeight - 120);

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: y,
        left: x,
        zIndex: 2000,
        background: '#FFFFFF',
        border: '2px solid',
        borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
        minWidth: '152px',
        padding: '2px',
        fontFamily: 'Tahoma, Arial, sans-serif',
        fontSize: '11px',
        boxShadow: '2px 2px 0 #000000',
      }}
    >
      {items.map((item, i) => {
        if (item === 'separator') {
          return (
            <div
              key={i}
              style={{
                margin: '3px 4px',
                borderTop: '1px solid #808080',
                borderBottom: '1px solid #FFFFFF',
              }}
            />
          );
        }
        return (
          <div
            key={i}
            onClick={() => { if (!item.disabled) { item.action?.(); onClose(); } }}
            style={{
              padding: '3px 24px 3px 24px',
              cursor: 'default',
              userSelect: 'none',
              color: item.disabled ? '#808080' : '#000000',
            }}
            onMouseEnter={(e) => {
              if (!item.disabled) {
                e.currentTarget.style.background = '#000080';
                e.currentTarget.style.color = '#FFFFFF';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = item.disabled ? '#808080' : '#000000';
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
