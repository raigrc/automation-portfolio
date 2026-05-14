import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../hooks/useApi';
import { useIsMobile } from '../hooks/useIsMobile';
import BootScreen from '../components/BootScreen';
import DesktopIcons from '../components/DesktopIcons';
import MainWindow from '../components/MainWindow';
import Taskbar from '../components/Taskbar';

export default function Portfolio() {
  const isMobile = useIsMobile();
  const [booted, setBooted] = useState(() => sessionStorage.getItem('ravenos_booted') === '1');
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ profile: null, skills: [], projects: [], experience: [] });

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
  };

  return (
    <>
      {!booted && <BootScreen onComplete={handleBoot} />}

      {/* Desktop */}
      <motion.div
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
        {!isMobile && <DesktopIcons activeTab={activeTab} onTabChange={handleTabChange} />}

        {/* Main area: centered window */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: isMobile ? '6px 4px' : '12px 16px 12px 8px',
          }}
        >
          <MainWindow
            activeTab={activeTab}
            onTabChange={handleTabChange}
            data={data}
            loading={loading}
          />
        </div>
      </motion.div>

      <Taskbar activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}
