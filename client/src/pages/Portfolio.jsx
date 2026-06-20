import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useDragControls } from 'framer-motion';
import api from '../hooks/useApi';
import { useIsMobile } from '../hooks/useIsMobile';
import BootScreen from '../components/BootScreen';
import DesktopIcons from '../components/DesktopIcons';
import MainWindow from '../components/MainWindow';
import Taskbar from '../components/Taskbar';
import ContextMenu from '../components/ContextMenu';

export default function Portfolio() {
  const isMobile = useIsMobile();
  const [booted, setBooted] = useState(() => sessionStorage.getItem('ravenos_booted') === '1');
  const [activeTab, setActiveTab] = useState('about');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const [ctxMenu, setCtxMenu] = useState({ visible: false, x: 0, y: 0, items: [] });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ profile: null, skills: [], projects: [], experience: [] });

  // Drag setup (desktop only)
  const desktopRef = useRef(null);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const dragControls = useDragControls();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, skillsRes, projectsRes, expRes] = await Promise.all([
          api.get('/profile'),
          api.get('/skills'),
          api.get('/projects'),
          api.get('/experience'),
        ]);
        setData({
          profile: profileRes.data,
          skills: skillsRes.data,
          projects: projectsRes.data,
          experience: expRes.data,
        });
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleBoot = () => {
    sessionStorage.setItem('ravenos_booted', '1');
    setBooted(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedIcon(tab);
    setMinimized(false);
  };

  const snapToGrid = () => {
    const grid = 16;
    dragX.set(Math.round(dragX.get() / grid) * grid);
    dragY.set(Math.round(dragY.get() / grid) * grid);
  };

  const handleContextMenu = (e, { id, href, noAction }) => {
    let items;
    if (noAction) {
      items = [
        { label: '🗑️ Empty Recycle Bin', disabled: true },
        'separator',
        { label: 'ℹ️ Properties', disabled: true },
      ];
    } else if (href) {
      items = [
        { label: '📂 Open', action: () => window.open(href, '_blank') },
        'separator',
        { label: 'ℹ️ Properties', action: () => window.open(href, '_blank') },
      ];
    } else {
      items = [
        { label: '📂 Open', action: () => handleTabChange(id) },
        'separator',
        { label: 'ℹ️ Properties', action: () => handleTabChange(id) },
      ];
    }
    setCtxMenu({ visible: true, x: e.clientX, y: e.clientY, items });
  };

  return (
    <>
      {!booted && <BootScreen onComplete={handleBoot} />}

      {/* Desktop */}
      <motion.div
        ref={desktopRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          minHeight: '100vh',
          paddingBottom: '38px',
          background: '#008080',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0',
        }}
      >
        {/* Left column: desktop icons — hidden on mobile */}
        {!isMobile && (
          <DesktopIcons
            activeTab={activeTab}
            onTabChange={handleTabChange}
            selectedIcon={selectedIcon}
            onIconSelect={setSelectedIcon}
            onContextMenu={handleContextMenu}
            resumeUrl={data.profile?.resumeUrl}
          />
        )}

        {/* Main area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: isMobile ? '6px 4px' : '12px 16px 12px 8px',
          }}
        >
          <motion.div
            drag={!isMobile}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={desktopRef}
            style={{ x: dragX, y: dragY, width: '100%', maxWidth: '860px' }}
            onDragEnd={snapToGrid}
            whileDrag={{ cursor: 'grabbing' }}
          >
            <MainWindow
              activeTab={activeTab}
              onTabChange={handleTabChange}
              data={data}
              loading={loading}
              dragControls={!isMobile ? dragControls : undefined}
              minimized={minimized}
              onMinimize={() => setMinimized(true)}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Right-click context menu */}
      {ctxMenu.visible && (
        <ContextMenu
          items={ctxMenu.items}
          position={{ x: ctxMenu.x, y: ctxMenu.y }}
          onClose={() => setCtxMenu((m) => ({ ...m, visible: false }))}
        />
      )}

      <Taskbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        minimized={minimized}
        onMinimize={() => setMinimized(true)}
        onRestore={() => setMinimized(false)}
      />
    </>
  );
}
