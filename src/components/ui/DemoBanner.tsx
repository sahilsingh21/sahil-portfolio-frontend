'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DEMO_STEPS = [
  { section: 'about', label: 'Meet Sahil' },
  { section: 'why', label: 'Why hire him' },
  { section: 'projects', label: 'Featured projects' },
  { section: 'skills', label: 'Technical depth' },
  { section: 'sysdesign', label: 'System design' },
  { section: 'contact', label: 'Get in touch' },
];

interface DemoBannerProps {
  onEnd: () => void;
}

export default function DemoBanner({ onEnd }: DemoBannerProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    scrollToStep(0);
  }, []);

  function scrollToStep(i: number) {
    document.getElementById(DEMO_STEPS[i].section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function next() {
    if (step < DEMO_STEPS.length - 1) {
      const next = step + 1;
      setStep(next);
      scrollToStep(next);
    } else {
      onEnd();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: '100px',
        padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
        zIndex: 150, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: '0.8rem', color: 'var(--text3)', fontFamily: 'var(--font-dm-mono)' }}>
        {step + 1}/{DEMO_STEPS.length}
      </span>
      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{DEMO_STEPS[step].label}</span>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {step > 0 && (
          <button
            onClick={() => { const prev = step - 1; setStep(prev); scrollToStep(prev); }}
            style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)', padding: '0.3rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            ← Back
          </button>
        )}
        <button
          onClick={next}
          style={{ background: 'var(--accent)', border: 'none', color: '#fff', padding: '0.3rem 0.9rem', borderRadius: '100px', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}
        >
          {step === DEMO_STEPS.length - 1 ? 'Finish ✓' : 'Next →'}
        </button>
        <button
          onClick={onEnd}
          style={{ background: 'none', border: 'none', color: 'var(--coral)', padding: '0.3rem 0.5rem', borderRadius: '100px', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}
