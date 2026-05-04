'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects, explainProject, trackEvent } from '@/lib/api';
import type { Project } from '@/types';

const STACKS = ['all', 'react', 'graphql', 'python', 'node', 'mongodb'];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);
  const [explanation, setExplanation] = useState('');
  const [explaining, setExplaining] = useState(false);
  const [source, setSource] = useState<'db' | 'github'>('db');

  useEffect(() => {
    if (source === 'github') {
      loadGitHubProjects();
    } else {
      loadProjects(filter);
    }
  }, [filter, source]);
  
  async function loadGitHubProjects() {
    setLoading(true);
    try {
      const { getGitHubProjects } = await import('@/lib/api');
      const data = await getGitHubProjects();
      setProjects(data);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects(filter);
  }, [filter]);

  async function loadProjects(stack: string) {
    setLoading(true);
    try {
      const data = await getProjects(stack === 'all' ? undefined : stack);
      setProjects(data);
    } catch {
      // Fallback to static data in case API is down
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  function openProject(p: Project) {
    setSelected(p);
    setExplanation('');
    trackEvent('project_view', p._id);
  }

  async function handleExplain(mode: 'simple' | 'technical') {
    if (!selected) return;
    setExplaining(true);
    setExplanation('');
    try {
      const result = await explainProject(selected.name, selected.desc, selected.architecture, mode);
      setExplanation(result);
    } catch {
      setExplanation('Explanation unavailable. Please try again.');
    } finally {
      setExplaining(false);
    }
  }

  return (
    <section id="projects" style={{ padding: '5rem 3rem', borderTop: '1px solid var(--border)' }}>
      <div className="section-label">⬡ Work</div>
      <h2 className="section-title">Selected <em>projects</em></h2>
      <p style={{ color: 'var(--text2)', fontSize: '1rem', maxWidth: '60ch', lineHeight: 1.7, marginBottom: '2.5rem' }}>
        Each project solves a real problem. Click any card to see architecture, challenges, and the story behind it.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'center' }}>
  <button
    onClick={() => setSource('db')}
    style={{
      background: source === 'db' ? 'var(--accent)' : 'var(--bg3)',
      border: `1px solid ${source === 'db' ? 'var(--accent)' : 'var(--border)'}`,
      color: source === 'db' ? '#fff' : 'var(--text2)',
      padding: '0.4rem 1rem', borderRadius: '100px',
      fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
    }}
  >
    ⬡ Portfolio Projects
  </button>
  <button
    onClick={() => setSource('github')}
    style={{
      background: source === 'github' ? 'var(--accent)' : 'var(--bg3)',
      border: `1px solid ${source === 'github' ? 'var(--accent)' : 'var(--border)'}`,
      color: source === 'github' ? '#fff' : 'var(--text2)',
      padding: '0.4rem 1rem', borderRadius: '100px',
      fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
    }}
  >
    ⌂ All GitHub Repos
  </button>
</div>

      {/* Filter row */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {STACKS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              background: filter === s ? 'var(--accent)' : 'var(--bg3)',
              border: `1px solid ${filter === s ? 'var(--accent)' : 'var(--border)'}`,
              color: filter === s ? '#fff' : 'var(--text2)',
              padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.78rem',
              cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, transition: 'all 0.2s',
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ color: 'var(--text3)', fontFamily: 'var(--font-dm-mono)', fontSize: '0.85rem' }}>Loading projects...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <AnimatePresence>
            {projects.map((p) => (
              <motion.div
                key={p._id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="card"
                style={{
                  cursor: 'pointer', overflow: 'hidden',
                  border: p.featured ? '1px solid rgba(108,99,255,0.4)' : '1px solid var(--border)',
                  transition: 'all 0.25s',
                }}
                onClick={() => openProject(p)}
                whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(108,99,255,0.15)' }}
              >
                <div style={{ padding: '1.5rem 1.5rem 1rem', position: 'relative' }}>
                  {p.featured && (
                    <span style={{
                      position: 'absolute', top: '1rem', right: '1rem',
                      background: 'var(--accent)', color: '#fff',
                      fontSize: '0.67rem', padding: '0.2rem 0.6rem', borderRadius: '100px',
                      fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>★ Featured</span>
                  )}
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--text2)', lineHeight: 1.6 }}>{p.desc}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', padding: '0 1.5rem 1rem' }}>
                  {p.techStack.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <div style={{ borderTop: '1px solid var(--border)', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600, fontFamily: 'var(--font-dm-mono)' }}>{p.impact}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a href={p.githubUrl} target="_blank" rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: 'var(--text3)', fontSize: '0.78rem', textDecoration: 'none', padding: '0.25rem 0.6rem', border: '1px solid var(--border)', borderRadius: 6, transition: 'all 0.2s' }}>
                      GitHub
                    </a>
                    <a href={p.liveUrl} target="_blank" rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: 'var(--text3)', fontSize: '0.78rem', textDecoration: 'none', padding: '0.25rem 0.6rem', border: '1px solid var(--border)', borderRadius: 6, transition: 'all 0.2s' }}>
                      Demo →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 12, maxWidth: 680, width: '100%', maxHeight: '80vh', overflowY: 'auto' }}
            >
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{selected.name}</div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '1.3rem', lineHeight: 1 }}>✕</button>
              </div>

              <div style={{ padding: '1.5rem' }}>
                {[
                  ['Problem Statement', selected.problem],
                  ['Solution Approach', selected.solution],
                ].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: '0.3rem' }}>{label}</div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text2)', lineHeight: 1.7 }}>{val}</div>
                  </div>
                ))}

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: '0.3rem' }}>Architecture Overview</div>
                  <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.8rem', background: 'var(--bg3)', padding: '1rem', borderRadius: 8, color: 'var(--accent3)' }}>
                    {selected.architecture}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: '0.3rem' }}>Key Challenges & Learnings</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text2)', lineHeight: 1.7 }}>{selected.challenges}</div>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {selected.techStack.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>

              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem' }}>
                <button className="btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }} onClick={() => handleExplain('simple')}>
                  💡 Explain Simply
                </button>
                <button className="btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }} onClick={() => handleExplain('technical')}>
                  ⚙️ Technical Deep Dive
                </button>
              </div>

              {(explaining || explanation) && (
                <div style={{ padding: '0 1.5rem 1.5rem', fontSize: '0.83rem', color: 'var(--text2)', lineHeight: 1.7, background: 'var(--bg3)', margin: '0 1.5rem 1.5rem', borderRadius: 8 }}>
                  {explaining ? (
                    <span style={{ color: 'var(--text3)' }}>Thinking...</span>
                  ) : explanation}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@media(max-width:900px){#projects{padding:3rem 1.5rem!important}}`}</style>
    </section>
  );
}
