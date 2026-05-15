import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import AboutTab from './tabs/AboutTab';
import ProjectsTab from './tabs/ProjectsTab';
import SkillsTab from './tabs/SkillsTab';
import ExperienceTab from './tabs/ExperienceTab';
import ContactTab from './tabs/ContactTab';

const TABS = [
  { id: 'about',      label: '🖥️ About',      short: '🖥️',  title: 'My Computer' },
  { id: 'projects',   label: '📁 Projects',   short: '📁',  title: 'My Projects' },
  { id: 'skills',     label: '⚙️ Skills',     short: '⚙️',  title: 'Control Panel' },
  { id: 'experience', label: '📄 History',    short: '📄',  title: 'Work History.txt' },
  { id: 'contact',    label: '✉️ Contact',    short: '✉️',  title: 'Contact.exe' },
];

export default function MainWindow({ activeTab, onTabChange, data, loading, dragControls, minimized, onMinimize }) {
  const isMobile = useIsMobile();
  const currentTab = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <div
      className="win-window"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '860px',
        minHeight: minimized ? 'auto' : (isMobile ? 'calc(100vh - 80px)' : '520px'),
      }}
    >
      {/* Title bar — drag handle */}
      <div
        className="win-titlebar"
        style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, cursor: isMobile ? 'default' : 'grab' }}
        onPointerDown={(e) => dragControls?.start(e)}
      >
        <span style={{ fontSize: '14px' }}>🪟</span>
        <span style={{ flex: 1, fontSize: '12px', fontWeight: 'bold' }}>
          RavenOS 95 — Portfolio.exe
        </span>
        <div style={{ display: 'flex', gap: '2px' }}>
          {/* Minimize button */}
          <div
            className="win-panel-raised"
            onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
            style={{
              width: '16px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              cursor: 'pointer',
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            _
          </div>
          {/* Maximize + Close — decorative */}
          {['□', '×'].map((btn) => (
            <div
              key={btn}
              className="win-panel-raised"
              style={{
                width: '16px',
                height: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                cursor: 'default',
                fontWeight: 'bold',
              }}
            >
              {btn}
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible body — tab bar + content + status bar */}
      <AnimatePresence initial={false}>
        {!minimized && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ transformOrigin: 'top', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 }}
          >
            {/* Menu bar — hidden on mobile */}
            {!isMobile && (
              <div
                style={{
                  background: '#C0C0C0',
                  borderBottom: '1px solid #808080',
                  padding: '2px 4px',
                  display: 'flex',
                  gap: '2px',
                  fontSize: '11px',
                  flexShrink: 0,
                }}
              >
                {['File', 'Edit', 'View', 'Help'].map((m) => (
                  <span
                    key={m}
                    style={{ padding: '1px 6px', cursor: 'default', userSelect: 'none' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000000'; }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}

            {/* Tab bar */}
            <div className="win-tab-bar" style={{ flexShrink: 0, overflowX: 'auto', flexWrap: 'nowrap' }}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={activeTab === tab.id ? 'win-tab win-tab-active' : 'win-tab'}
                  onClick={() => onTabChange(tab.id)}
                  style={{ padding: isMobile ? '4px 8px' : undefined, fontSize: isMobile ? '11px' : undefined }}
                >
                  {isMobile ? tab.short : tab.label}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div
              className="win-panel-raised"
              style={{
                flex: 1,
                padding: isMobile ? '6px' : '10px',
                overflow: 'auto',
                position: 'relative',
                borderTop: 'none',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                  style={{ height: '100%' }}
                >
                  {activeTab === 'about' && <AboutTab profile={data.profile} loading={loading} isMobile={isMobile} />}
                  {activeTab === 'projects' && <ProjectsTab projects={data.projects} loading={loading} isMobile={isMobile} />}
                  {activeTab === 'skills' && <SkillsTab skills={data.skills} loading={loading} isMobile={isMobile} />}
                  {activeTab === 'experience' && <ExperienceTab experience={data.experience} loading={loading} />}
                  {activeTab === 'contact' && <ContactTab profile={data.profile} loading={loading} isMobile={isMobile} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Status bar */}
            <div className="win-statusbar" style={{ flexShrink: 0 }}>
              <span className="win-statusbar-cell" style={{ flex: 1 }}>{currentTab.title}</span>
              <span className="win-statusbar-cell">● Open to Work</span>
              <span className="win-statusbar-cell">Philippines</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
