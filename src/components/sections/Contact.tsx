'use client';

import { useState } from 'react';
import { analyzeJD, trackEvent } from '@/lib/api';
import type { JDAnalysisResult } from '@/types';

export default function Contact() {
  const [jd, setJd] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<JDAnalysisResult | null>(null);
  const [error, setError] = useState('');

  async function handleAnalyze() {
    if (jd.trim().length < 50) { setError('Please paste a full job description (at least 50 characters).'); return; }
    setError('');
    setAnalyzing(true);
    setResult(null);
    try {
      const data = await analyzeJD(jd);
      setResult(data);
    } catch {
      setError('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <section id="contact" style={{ padding: '5rem 3rem', borderTop: '1px solid var(--border)' }}>
      <div className="section-label">✉ Contact</div>
      <h2 className="section-title">Let's <em>build</em> something</h2>
      <p style={{ color: 'var(--text2)', maxWidth: '60ch', lineHeight: 1.7, marginBottom: '3rem' }}>
        Open to full-time roles, contract work, and interesting conversations.
      </p>

      {/* ✅ Auto-stacks to 1 column on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        alignItems: 'start',
      }}>
        {/* Left — contact links */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { icon: '@', bg: 'rgba(108,99,255,0.12)', color: 'var(--accent2)', label: 'Email', val: 'sahilsingh2597@gmail.com', href: 'mailto:sahilsingh2597@gmail.com' },
              { icon: '⌂', bg: 'rgba(56,189,248,0.12)', color: 'var(--accent3)', label: 'GitHub', val: 'github.com/sahilsingh21', href: 'https://github.com/sahilsingh21' },
              { icon: 'in', bg: 'rgba(52,211,153,0.12)', color: 'var(--green)', label: 'LinkedIn', val: 'linkedin.com/in/sahil-singh-513a6a149', href: 'https://linkedin.com/in/sahil-singh-513a6a149' },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, textDecoration: 'none', color: 'var(--text)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg3)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg2)'; }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, background: link.bg, color: link.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, fontWeight: 700 }}>{link.icon}</div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{link.label}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '0.15rem' }}>{link.val}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Resume download */}
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Download Resume</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: '1.5rem', lineHeight: 1.65 }}>
              PDF resume — updated May 2025. Includes full experience, projects, and references.
            </p>
            <a
              href="/SahilResume.pdf"
              download="Sahil_Singh_Resume.pdf"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                background: 'var(--accent)',
                color: '#fff',
                padding: '0.75rem 1.75rem',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.2s',
              }}
              onClick={() => trackEvent('resume_download')}
            >
              ↓ Download Resume (PDF)
            </a>
          </div>
        </div>

        {/* Right — JD Analyzer */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>✦ AI Resume Analyzer</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: '1.25rem', lineHeight: 1.65 }}>
            Paste a job description below. The AI will match it against Sahil's profile and give you a fit score, gaps, and suggestions.
          </div>

          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste job description here..."
            rows={5}
            style={{
              width: '100%',
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '0.9rem',
              color: 'var(--text)',
              fontFamily: 'inherit',
              fontSize: '0.83rem',
              resize: 'vertical',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />

          {error && <div style={{ color: 'var(--coral)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</div>}

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            style={{
              width: '100%',
              marginTop: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--accent)',
              color: '#fff',
              padding: '0.75rem 1.75rem',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.9rem',
              border: 'none',
              cursor: analyzing ? 'not-allowed' : 'pointer',
              opacity: analyzing ? 0.7 : 1,
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            {analyzing ? 'Analyzing...' : 'Analyze Match →'}
          </button>

          {result && (
            <div style={{ marginTop: '1.25rem', padding: '1.25rem', background: 'var(--bg3)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-dm-mono)', background: 'linear-gradient(135deg, var(--green), var(--accent3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {result.score}%
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Match Score</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>Based on skills, experience & keywords</div>
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', lineHeight: 1.8, color: 'var(--text2)' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--green)' }}>✓ Matched:</strong> {result.matched_skills.join(', ')}</div>
                {result.missing_skills.length > 0 && (
                  <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--amber)' }}>△ Gaps:</strong> {result.missing_skills.join(', ')}</div>
                )}
                {result.strengths?.length > 0 && (
                  <div style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--accent3)' }}>★ Strengths:</strong> {result.strengths.join(', ')}</div>
                )}
                <div style={{ background: 'var(--bg4)', padding: '0.75rem', borderRadius: 6, fontSize: '0.8rem' }}>
                  <strong>Suggestion:</strong> {result.suggestion}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact {
            padding: 3rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}