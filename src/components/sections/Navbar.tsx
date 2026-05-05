'use client';

import { useState, useEffect } from 'react';

interface NavbarProps {
  onChatOpen: () => void;
  onThemeToggle: () => void;
  theme: 'dark' | 'light';
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Architecture', href: '#sysdesign' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onChatOpen, onThemeToggle, theme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(10,10,15,0.92)' : 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          height: 56,
          transition: 'background 0.3s',
        }}
      >
        {/* Logo */}
        <div
          className="gradient-text"
          style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          SS / Portfolio
        </div>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--text2)',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text2)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onThemeToggle}
            style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              color: 'var(--text2)',
              padding: '0.4rem 0.9rem',
              borderRadius: 8,
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            {theme === 'dark' ? '☀ Light' : '◑ Dark'}
          </button>

          <button
            onClick={onChatOpen}
            style={{
              background: 'var(--accent)',
              border: '1px solid var(--accent)',
              color: '#fff',
              padding: '0.4rem 0.9rem',
              borderRadius: 8,
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            ✦ Ask AI
          </button>

          {/* Hamburger button — only on mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '0.4rem 0.6rem',
              borderRadius: 8,
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'none',
              lineHeight: 1,
              transition: 'all 0.2s',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'var(--bg2)',
            borderBottom: '1px solid var(--border)',
            padding: '1rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              style={{
                color: 'var(--text2)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {link.label}
              <span style={{ color: 'var(--accent2)', fontSize: '0.8rem' }}>→</span>
            </a>
          ))}

          {/* Mobile chat button */}
          <button
            onClick={() => { onChatOpen(); setMenuOpen(false); }}
            style={{
              background: 'var(--accent)',
              border: 'none',
              color: '#fff',
              padding: '0.75rem',
              borderRadius: 8,
              fontSize: '0.9rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 600,
              marginTop: '0.5rem',
              width: '100%',
            }}
          >
            ✦ Ask AI
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .hamburger-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}