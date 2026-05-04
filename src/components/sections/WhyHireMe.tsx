// ─── WhyHireMe.tsx ───────────────────────────────────────────────────────────
'use client';

import { motion } from 'framer-motion';

const WHY_CARDS = [
  { icon: '⚡', title: 'Performance-Obsessed', desc: 'Reduced dashboard load times by 40% at o9 Solutions through intelligent caching, code splitting, and query optimization on enterprise-scale data.', badge: '↑ 40% faster' },
  { icon: '🏗️', title: 'Systems Thinker', desc: 'Designed and shipped microservice architectures handling millions of events. Strong grasp of HLD/LLD, database modeling, and distributed systems.', badge: 'millions of events' },
  { icon: '🎨', title: 'Product-Minded UI/UX', desc: 'I bridge the gap between engineering and design. Shipped React component systems at Samsung that became org-wide standards.', badge: 'org-wide adoption' },
  { icon: '🤝', title: 'Cross-Functional Leader', desc: 'Collaborated with product, design, and data teams to deliver features end-to-end. Comfortable in ambiguity; thrives when ownership matters.', badge: 'led 5+ features' },
  { icon: '🔬', title: 'Full Stack Depth', desc: 'From GraphQL resolvers to MongoDB aggregations, from Tailwind UI to Node.js REST APIs — I own the full vertical, start to finish.', badge: 'MERN · GraphQL · Python' },
  { icon: '📈', title: 'Continuous Learner', desc: 'Shipped AI-powered features using OpenAI APIs, built data pipelines in Python/Django, and always leveling up — this portfolio is proof.', badge: 'AI-first mindset' },
];

export default function WhyHireMe() {
  return (
    <section id="why" style={{ padding: '5rem 3rem', borderTop: '1px solid var(--border)' }}>
      <div className="section-label">★ Value Proposition</div>
      <h2 className="section-title">Why hire <em>me?</em></h2>
      <p style={{ color: 'var(--text2)', maxWidth: '60ch', lineHeight: 1.7, marginBottom: '3rem' }}>
        Impact-first engineering. I don't just write code — I solve business problems.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {WHY_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card"
            style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden', transition: 'all 0.25s' }}
            whileHover={{ y: -2 }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), var(--accent3))', transform: 'scaleX(0)', transition: 'transform 0.3s', transformOrigin: 'left' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = 'scaleX(1)')}
            />
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{card.icon}</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{card.title}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '0.75rem' }}>{card.desc}</div>
            <span style={{ display: 'inline-block', background: 'rgba(52,211,153,0.12)', color: 'var(--green)', border: '1px solid rgba(52,211,153,0.25)', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-dm-mono)' }}>
              {card.badge}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
