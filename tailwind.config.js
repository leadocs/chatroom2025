/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wisteria: {
          DEFAULT: '#c69fd5',
          50: '#fbf7fc',
          100: '#f5ebf8',
          200: '#ead6f0',
          300: '#dec0e7',
          400: '#c69fd5', // Base
          500: '#ae7ec0',
          600: '#9461a6',
          700: '#7a4a89',
          800: '#62386d',
          900: '#4b2a53',
          950: '#2e1035',
        },
        lemon: {
          DEFAULT: '#fdfdc9',
          50: '#fffffc',
          100: '#ffffed',
          200: '#fefeda',
          300: '#fdfdc9', // Base
          400: '#fbfb9c',
          500: '#f4f46a',
          600: '#dcdc41',
          700: '#b0b02e',
          800: '#8c8c28',
          900: '#747426',
          950: '#414112',
        },
        slate: {
          50: '#F8FAFC',
          400: '#94A3B8',
          700: '#334155', // Approximated for border
          800: '#2D2D2D', // Panel Surface
          900: '#1A1A1A', // Deep Slate
        },
        blue: {
          500: '#3B82F6',
        },
        amber: {
          500: '#F59E0B',
        },
        emerald: {
          500: '#10B981',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
