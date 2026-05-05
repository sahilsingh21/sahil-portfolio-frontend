'use client';

import { useEffect, useRef } from 'react';

interface HeroProps {
  onChatOpen: () => void;
  onDemoStart: () => void;
}

export default function Hero({ onChatOpen, onDemoStart }: HeroProps) {
  const cursorRef = useRef<HTMLSpanElement>(null);

  return (
    <section
      id="about"
      style={{
        minHeight: 'calc(100vh - 56px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
        padding: '4rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 60% at 70% 40%, rgba(108,99,255,0.12), transparent), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(56,189,248,0.08), transparent)',
      }} />

      {/* Left — copy */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.3)',
          color: 'var(--accent2)', padding: '0.35rem 0.9rem', borderRadius: '100px',
          fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.06em',
          textTransform: 'uppercase', marginBottom: '1.5rem',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Open to opportunities
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
          Sahil Singh<br />
          builds{' '}
          <em style={{ fontStyle: 'normal', fontFamily: 'var(--font-instrument)', color: 'var(--accent2)' }}>systems</em>
          <br />that scale.
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text2)', maxWidth: '42ch', lineHeight: 1.7, marginBottom: '2rem' }}>
          Full Stack Engineer with 3+ years crafting high-performance products at{' '}
          <strong style={{ color: 'var(--text)' }}>o9 Solutions</strong> &{' '}
          <strong style={{ color: 'var(--text)' }}>Samsung Data Systems</strong>.
          MERN · Python · GraphQL · System Design.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={onDemoStart}>▶ Watch Portfolio Demo</button>
          <button className="btn-outline" onClick={onChatOpen}>✦ Chat with AI</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2.5rem' }}>
          {[['3+', 'Years Exp'], ['12+', 'Projects'], ['500+', 'Commits']].map(([num, label]) => (
            <div key={label} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div className="gradient-text" style={{ fontSize: '1.6rem', fontWeight: 800 }}>{num}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.15rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — terminal */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ padding: '1.5rem', fontFamily: 'var(--font-dm-mono)', fontSize: '0.82rem', width: '100%', maxWidth: 420, boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
            {['#f87171', '#fbbf24', '#34d399'].map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ fontSize: '0.72rem', color: 'var(--text3)', marginLeft: '0.5rem' }}>sahil@portfolio ~ zsh</span>
          </div>

          {[
            ['comment', '// engineer.json'],
            ['plain', '{'],
            ['kv', '"name"', '"Sahil Singh"'],
            ['kv', '"role"', '"Full Stack Engineer"'],
            ['kv', '"stack"', '["MERN", "Python", "GraphQL"]'],
            ['nested', '"impact"'],
            ['kv2', '"perf_gain"', '"40%"'],
            ['kv2', '"enterprises_served"', '"Fortune 500"'],
            ['close', '},'],
            ['kv', '"status"', '"open_to_work"'],
            ['plain', '}'],
          ].map((row, i) => (
            <div key={i} style={{ marginBottom: '0.35rem', lineHeight: 1.5 }}>
              {row[0] === 'comment' && <span style={{ color: 'var(--text3)' }}>{row[1]}</span>}
              {row[0] === 'plain' && <span>{row[1]}</span>}
              {row[0] === 'kv' && <span>&nbsp;&nbsp;<span style={{ color: 'var(--accent3)' }}>{row[1]}</span>: <span style={{ color: 'var(--amber)' }}>{row[2]}</span>,</span>}
              {row[0] === 'nested' && <span>&nbsp;&nbsp;<span style={{ color: 'var(--accent3)' }}>{row[1]}</span>: {'{'}</span>}
              {row[0] === 'kv2' && <span>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--accent3)' }}>{row[1]}</span>: <span style={{ color: 'var(--green)' }}>{row[2]}</span>,</span>}
              {row[0] === 'close' && <span>&nbsp;&nbsp;{row[1]}</span>}
            </div>
          ))}
          <span style={{ display: 'inline-block', width: 8, height: '1.1em', background: 'var(--accent2)', animation: 'blink 1.2s step-end infinite', verticalAlign: 'middle' }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media(max-width:900px) {
          #about { grid-template-columns: 1fr !important; padding: 2rem 1.5rem !important; }
          #about > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
