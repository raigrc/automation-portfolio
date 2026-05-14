import { useEffect, useState } from 'react';
import api from '../hooks/useApi';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
function SectionBreak() {
  return (
    <div style={{ padding: '0 32px' }}>
      <div
        style={{
          height: '4px',
          borderTop: '2px solid #808080',
          borderBottom: '2px solid #FFFFFF',
          background: '#C0C0C0',
        }}
      />
    </div>
  );
}

export default function Portfolio() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, skillsRes, projectsRes, expRes] = await Promise.all([
          api.get('/profile'),
          api.get('/skills'),
          api.get('/projects'),
          api.get('/experience'),
        ]);
        setProfile(profileRes.data);
        setSkills(skillsRes.data);
        setProjects(projectsRes.data);
        setExperience(expRes.data);
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#008080' }}>
        <div className="win95-window" style={{ width: '300px' }}>
          <div className="win95-titlebar">
            <span>⏳</span>
            <span>Loading Portfolio...</span>
          </div>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', marginBottom: '12px' }}>Please wait...</p>
            <div className="win95-sunken" style={{ height: '16px', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '40%', background: '#000080' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#C0C0C0', minHeight: '100vh', paddingBottom: '40px' }}>
      <Navbar profile={profile} />
      <div style={{ paddingTop: '32px' }}>
        <Hero profile={profile} />
        <SectionBreak />
        <About profile={profile} />
        <SectionBreak />
        <Skills skills={skills} />
        <SectionBreak />
        <Projects projects={projects} showFade />
        <SectionBreak />
        <Experience experience={experience} />
        <SectionBreak />
        <Contact profile={profile} />
        <Footer profile={profile} />
      </div>
    </div>
  );
}
