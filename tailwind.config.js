/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#EAF4FF',
          100: '#D9ECFF',
          200: '#B7DAFF',
          300: '#89C1FF',
          400: '#5DA5FF',
          500: '#3B82F6',
          600: '#2E67D2',
          700: '#224EA8',
        },
        coral: {
          100: '#FFE7E2',
          300: '#FFAF9F',
          500: '#F97362',
        },
        mint: {
          100: '#DCFCE7',
          300: '#86EFAC',
          500: '#22C55E',
        },
      },
      boxShadow: {
        soft: '0 8px 30px -18px rgba(15, 23, 42, 0.25)',
        glow: '0 0 0 1px rgba(148, 163, 184, 0.25), 0 30px 60px -24px rgba(59, 130, 246, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(18px, -12px, 0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out both',
      },
    },
  },
  plugins: [],
}

