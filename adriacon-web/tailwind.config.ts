import type { Config } from 'tailwindcss';

/**
 * Adriacon Designsystem
 *
 * Markenfarben verbindlich:
 *   sky  #8CCAEE  – helles Adriacon-Blau aus dem Logo
 *   blue #3884C3  – kräftiges Adriacon-Blau aus der Logowelle
 *
 * Ergänzend, bewusst sparsam:
 *   navy   – Footer und dunkle Flächen
 *   ink    – Textton statt hartem Schwarz
 *   shell  – weiches Offwhite für ruhige Flächen
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
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]),
      ),
      colors: {
        sky: {
          DEFAULT: '#8CCAEE',
          light: '#C7E5F6',
          pale: '#EAF5FC',
        },
        blue: {
          DEFAULT: '#3884C3',
          deep: '#2A6799',
        },
        navy: {
          DEFAULT: '#12314A',
          deep: '#0C2436',
        },
        ink: {
          DEFAULT: '#22333F',
          soft: '#4F6473',
          light: '#7C8D99',
        },
        shell: {
          DEFAULT: '#F6F9FB',
          warm: '#FAFBFC',
        },
        line: '#DDE6EC',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Futura', 'Avenir Next', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        d1: ['clamp(2.4rem, 5.4vw, 4.25rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        d2: ['clamp(1.9rem, 3.8vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        d3: ['clamp(1.4rem, 2.4vw, 1.95rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        label: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.12em' }],
      },
      maxWidth: {
        shell: '76rem',
        text: '36rem',
      },
      spacing: {
        block: 'clamp(4rem, 8vw, 7.5rem)',
      },
      borderRadius: {
        DEFAULT: '6px',
        card: '10px',
        soft: '4px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(18,49,74,.04), 0 10px 30px -20px rgba(18,49,74,.30)',
        card: '0 2px 4px rgba(18,49,74,.04), 0 20px 50px -35px rgba(18,49,74,.45)',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(.25,.6,.35,1)',
      },
    },
  },
  plugins: [],
};

export default config;
