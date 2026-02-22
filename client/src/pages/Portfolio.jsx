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
        const all = projectsRes.data;
        const featured = all.filter((p) => p.featured);
        const teaser = all.find((p) => !p.featured);
        setProjects(teaser ? [...featured, teaser] : featured);
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
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-text-muted font-mono text-sm">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen">
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} showFade />
      <Experience experience={experience} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </div>
  );
}
