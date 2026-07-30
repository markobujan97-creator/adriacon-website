import type { Config } from 'tailwindcss';

/**
 * Adriacon Designsystem
 * Farben abgeleitet aus dem bestehenden Logo (dunkelblaue Welle, hellblaue Balken).
 * "bistre" ist die Hilfsfarbe für Raster-, Koordinaten- und Höhenlinien
 * (Anlehnung an Schweizer Landeskarten).
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Vollständige Opazitätsskala: erlaubt Werte wie border-ink/12 oder text-paper/85.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]),
      ),
      colors: {
        ink: {
          DEFAULT: '#0A1F30',
          soft: '#123049',
          muted: '#4A6478',
        },
        brand: {
          DEFAULT: '#3B87C6',
          deep: '#14405F',
          sky: '#8FC9EE',
          mist: '#E7F1F8',
        },
        paper: {
          DEFAULT: '#FBFCFD',
          shade: '#F2F5F8',
        },
        bistre: {
          DEFAULT: '#8A6A4A',
          soft: '#C7B49F',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.6rem, 6.2vw, 5.1rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.1rem, 4.4vw, 3.5rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.6rem, 2.9vw, 2.35rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.22em' }],
      },
      maxWidth: {
        shell: '78rem',
        prose: '38rem',
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 8.5rem)',
      },
      borderRadius: {
        card: '2px',
        pill: '999px',
      },
      boxShadow: {
        lift: '0 1px 2px rgba(10,31,48,.05), 0 12px 32px -18px rgba(10,31,48,.35)',
        panel: '0 30px 70px -50px rgba(10,31,48,.65)',
      },
      transitionTimingFunction: {
        course: 'cubic-bezier(.22,.61,.36,1)',
      },
      keyframes: {
        drawCourse: {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
        riseIn: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        riseIn: 'riseIn .7s cubic-bezier(.22,.61,.36,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
