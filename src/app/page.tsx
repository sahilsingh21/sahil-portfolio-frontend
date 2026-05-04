'use client';

import { useState, useEffect } from 'react';
import { Navbar, Hero, WhyHireMe, Projects, SkillsExperience, SystemDesign, Contact, Footer } from '@/components/sections';
import { LiveMetrics } from '@/components/sections';
import ChatBot from '@/components/chatbot/ChatBot';
import DemoBanner from '@/components/ui/DemoBanner';
import { trackEvent } from '@/lib/api';

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [demoActive, setDemoActive] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    trackEvent('page_view');
    // Personalize returning visitors
    const last = localStorage.getItem('sahil_visited');
    if (last) {
      // Returning visitor — chatbot will show welcome back message
      localStorage.setItem('sahil_returning', 'true');
    }
    localStorage.setItem('sahil_visited', Date.now().toString());
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next === 'light' ? 'light' : '';
  };

  return (
    <>
      <Navbar
        onChatOpen={() => setChatOpen(true)}
        onThemeToggle={toggleTheme}
        theme={theme}
      />

      <main>
        <Hero onChatOpen={() => setChatOpen(true)} onDemoStart={() => setDemoActive(true)} />
        <WhyHireMe />
        <LiveMetrics />
        <Projects />
        <SkillsExperience />
        <SystemDesign />
        <Contact />
      </main>

      <Footer />

      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {demoActive && (
        <DemoBanner onEnd={() => setDemoActive(false)} />
      )}
    </>
  );
}
