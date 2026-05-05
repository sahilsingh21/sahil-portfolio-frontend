// LiveMetrics.tsx
'use client';
import { useEffect, useState } from 'react';
import { getGitHubStats } from '@/lib/api';

const STATIC_METRICS = [
  { num: '500+', label: 'GitHub Commits' },
  { num: '12', label: 'Projects Shipped' },
  { num: '8', label: 'Technologies' },
  { num: '2', label: 'Enterprises' },
  { num: '40%', label: 'Avg Perf Gain' },
];

export function LiveMetrics() {
  const [ghStats, setGhStats] = useState<{ publicRepos: number; followers: number; totalStars: number } | null>(null);

  useEffect(() => {
    getGitHubStats().then(s => setGhStats(s)).catch(() => {});
  }, []);

  const metrics = ghStats
    ? [
        { num: `${ghStats.publicRepos}`, label: 'Public Repos' },
        { num: `${ghStats.totalStars}`, label: 'GitHub Stars' },
        { num: `${ghStats.followers}`, label: 'Followers' },
        { num: '12', label: 'Projects' },
        { num: '40%', label: 'Avg Perf Gain' },
      ]
    : STATIC_METRICS;

  return (
    <div style={{ padding: '0 3rem 3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        {metrics.map((m) => (
          <div key={m.label} className="card" style={{ padding: '1.25rem', textAlign: 'center', transition: 'all 0.2s' }}>
            <div className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-dm-mono)' }}>{m.num}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.25rem' }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SkillsExperience.tsx ─────────────────────────────────────────────────────

const SKILLS = {
  Frontend: [
    { n: 'React.js', p: 95 },
    { n: 'Next.js', p: 80 },
    { n: 'TypeScript', p: 85 },
    { n: 'Tailwind CSS', p: 90 },
    { n: 'GraphQL (Client)', p: 88 },
  ],
  Backend: [
    { n: 'Node.js + Express', p: 90 },
    { n: 'Python / Django', p: 85 },
    { n: 'GraphQL (Apollo)', p: 82 },
    { n: 'REST API Design', p: 92 },
  ],
  'Database & Infra': [
    { n: 'MongoDB Atlas', p: 88 },
    { n: 'PostgreSQL', p: 78 },
    { n: 'Redis', p: 75 },
    { n: 'Docker', p: 70 },
  ],
};

const EXPERIENCE = [
  {
    company: 'Sansung Data Systems(SDS)',
    role: 'Software Engineer 2 — Full Stack',
    period: '2022 – Present · Gurugram, India',
    color: 'var(--accent)',
    bullets: [
      'Built high-performance supply chain dashboards in React + GraphQL for Fortune 500 clients',
      'Reduced API response times by 40% through Redis caching and GraphQL DataLoader',
      'Architected reusable component library adopted across 3 product teams',
      'Integrated real-time data pipelines using Node.js + WebSockets',
    ],
  },
  {
    company: 'Leaf Craft Pvt. India',
    role: 'Full Stack Developer',
    period: '2021 – 2022 · Hyderabad, India',
    color: 'var(--accent3)',
    bullets: [
      'Developed internal tools using React.js and Python/Django backend',
      'Built REST APIs consumed by 500+ users for a data analytics platform',
      'Improved test coverage from 30% → 85% with Jest and PyTest suites',
    ],
  },
];

function SkillBar({ name, pct }: { name: string; pct: number }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
        <span style={{ fontWeight: 500 }}>{name}</span>
        <span style={{ color: 'var(--text3)', fontFamily: 'var(--font-dm-mono)', fontSize: '0.78rem' }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: 'var(--bg4)', borderRadius: '100px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, borderRadius: '100px', background: 'linear-gradient(90deg, var(--accent), var(--accent3))', transition: 'width 1s cubic-bezier(0.25,0.46,0.45,0.94)' }} />
      </div>
    </div>
  );
}

export function SkillsExperience() {
  return (
    <section id="skills" style={{ padding: '5rem 3rem', borderTop: '1px solid var(--border)' }}>
      <div className="section-label">◈ Skills & Experience</div>
      <h2 className="section-title">Technical <em>depth</em></h2>
      <p style={{ color: 'var(--text2)', maxWidth: '60ch', lineHeight: 1.7, marginBottom: '3rem' }}>Hands-on across the full stack, with real production experience.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        <div>
          {Object.entries(SKILLS).map(([group, skills]) => (
            <div key={group} style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '1rem' }}>{group}</div>
              {skills.map((s) => <SkillBar key={s.n} name={s.n} pct={s.p} />)}
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '1.25rem' }}>Experience</div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '1rem', top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />
            {EXPERIENCE.map((exp) => (
              <div key={exp.company} style={{ paddingLeft: '3rem', position: 'relative', marginBottom: '2.5rem' }}>
                <div style={{ position: 'absolute', left: 'calc(1rem - 4px)', top: '0.3rem', width: 10, height: 10, borderRadius: '50%', background: exp.color, border: '2px solid var(--bg)' }} />
                <div style={{ fontSize: '0.75rem', color: 'var(--accent2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-dm-mono)' }}>{exp.company}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, margin: '0.2rem 0' }}>{exp.role}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text3)', fontFamily: 'var(--font-dm-mono)', marginBottom: '0.75rem' }}>{exp.period}</div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {exp.bullets.map((b) => (
                    <li key={b} style={{ fontSize: '0.83rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '0.4rem', paddingLeft: '1rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--accent3)' }}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){#skills{padding:3rem 1.5rem!important} #skills > div + div + div{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── SystemDesign.tsx ─────────────────────────────────────────────────────────

const DIAGRAMS = [
  {
    title: 'Microservices Event Pipeline',
    diagram: `[Client] → API Gateway
    ↓
[Auth]  [Orders]  [Inventory]
    ↓
Message Queue (Redis)
    ↓
[Event Processor]
    ↓
MongoDB + Cache`,
    desc: 'Decoupled services communicating via Redis pub/sub. Each service owns its data and scales independently. Event sourcing for auditability.',
  },
  {
    title: 'React Performance Architecture',
    diagram: `Component Tree
    ↓
Memoization Layer
(React.memo, useMemo)
    ↓
Virtualized Lists
    ↓
GraphQL + DataLoader
(N+1 problem solved)
    ↓
CDN-cached Assets`,
    desc: 'Multi-layer performance strategy: prevent re-renders, batch DB queries, and serve static assets at the edge for sub-100ms loads.',
  },
  {
    title: 'Real-Time Dashboard (HLD)',
    diagram: `WebSocket Server
(Node.js + Socket.io)
    ↓
Event Bus
    ↓
Time-Series DB
(aggregated metrics)
    ↓
React Dashboard
(live charts, D3.js)`,
    desc: 'Persistent WebSocket connections push delta updates only. Client uses optimistic rendering with server reconciliation.',
  },
];

export function SystemDesign() {
  return (
    <section id="sysdesign" style={{ padding: '5rem 3rem', borderTop: '1px solid var(--border)' }}>
      <div className="section-label">⬡ Architecture</div>
      <h2 className="section-title">System <em>design</em></h2>
      <p style={{ color: 'var(--text2)', maxWidth: '60ch', lineHeight: 1.7, marginBottom: '3rem' }}>Practical architecture thinking for real-world scale.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {DIAGRAMS.map((d) => (
          <div key={d.title} className="card" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{d.title}</div>
            <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '1.25rem', fontFamily: 'var(--font-dm-mono)', fontSize: '0.72rem', color: 'var(--accent3)', lineHeight: 1.9, marginBottom: '1rem', whiteSpace: 'pre' }}>
              {d.diagram}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.65 }}>{d.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Footer.tsx ───────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer style={{ padding: '2rem 3rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text3)', fontSize: '0.8rem', flexWrap: 'wrap', gap: '1rem' }}>
      <div style={{ fontWeight: 700, color: 'var(--text2)' }}>Sahil Singh</div>
      <div>Built with Next.js · Node.js · MongoDB · ♥</div>
      <div>© 2025</div>
    </footer>
  );
}

export default LiveMetrics;
