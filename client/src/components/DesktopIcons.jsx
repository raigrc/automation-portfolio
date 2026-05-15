import { motion } from 'framer-motion';

const RESUME_URL = 'https://drive.google.com/file/d/1bAv4ITgZsKAireaXWUddg9Uf6DBQXf5H/view?usp=sharing';

const ICONS = [
  { id: 'about',      icon: '🖥️',  label: 'My Computer' },
  { id: 'projects',   icon: '📁',  label: 'My Projects' },
  { id: 'skills',     icon: '⚙️',  label: 'Control Panel' },
  { id: 'experience', icon: '📄',  label: 'Work History.txt' },
  { id: 'contact',    icon: '✉️',  label: 'Contact.exe' },
  { id: 'resume',     icon: '📋',  label: 'Resume.pdf', href: RESUME_URL },
  { id: 'trash',      icon: '🗑️',  label: 'Recycle Bin', noAction: true },
];

export default function DesktopIcons({ activeTab, onTabChange, selectedIcon, onIconSelect, onContextMenu }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '8px 4px',
        width: '88px',
        flexShrink: 0,
        alignSelf: 'flex-start',
      }}
    >
      {ICONS.map(({ id, icon, label, href, noAction }, i) => {
        const isActive = activeTab === id;
        const isSelected = selectedIcon === id;

        return (
          <motion.button
            key={id}
            className="desktop-icon"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.2 }}
            onClick={() => {
              if (href) { window.open(href, '_blank'); return; }
              if (noAction) { onIconSelect?.(id); return; }
              onIconSelect?.(id);
            }}
            onDoubleClick={() => {
              if (href) { window.open(href, '_blank'); return; }
              if (noAction) return;
              onTabChange(id);
              onIconSelect?.(id);
            }}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return;
              if (href) { window.open(href, '_blank'); return; }
              if (noAction) return;
              onTabChange(id);
              onIconSelect?.(id);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              onContextMenu?.(e, { id, href, noAction });
            }}
          >
            <span
              style={{
                fontSize: '28px',
                display: 'block',
                filter: isActive ? 'brightness(1.2)' : 'none',
              }}
            >
              {icon}
            </span>
            <span
              className="desktop-icon-label"
              style={{
                background: isSelected ? '#000080' : 'transparent',
                color: '#FFFFFF',
                outline: isSelected ? '1px dotted #FFFFFF' : 'none',
              }}
            >
              {label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
