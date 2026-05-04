/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
        serif: ['var(--font-instrument)', 'Georgia', 'serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#6c63ff',
          2: '#a78bfa',
          3: '#38bdf8',
        },
        brand: {
          bg: '#0a0a0f',
          bg2: '#111118',
          bg3: '#1a1a24',
          bg4: '#22223a',
        },
        green: '#34d399',
        amber: '#fbbf24',
        coral: '#f87171',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        blink: 'blink 1.2s step-end infinite',
        pulse: 'pulse 2s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
      },
    },
  },
  plugins: [],
};
