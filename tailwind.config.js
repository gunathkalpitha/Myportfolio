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
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        mint: {
          400: '#4ade80',
          500: '#22c55e',
        },
        violet: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#5b21b6',
        },
      },
      boxShadow: {
        soft: '0 2px 16px -4px rgba(0,0,0,0.08)',
        card: '0 4px 24px -8px rgba(0,0,0,0.1)',
        'card-hover': '0 8px 32px -8px rgba(37,99,235,0.15)',
        hero: '0 20px 60px -12px rgba(37,99,235,0.2)',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marqueeLeft: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.65s ease-out both',
        'fade-up-d1': 'fadeUp 0.65s ease-out 0.15s both',
        'fade-up-d2': 'fadeUp 0.65s ease-out 0.3s both',
        'fade-up-d3': 'fadeUp 0.65s ease-out 0.45s both',
        'fade-in':    'fadeIn 0.5s ease-out both',
        'float':      'float 4s ease-in-out infinite',
        'slide-left': 'slideLeft 0.65s ease-out both',
        'scale-in':   'scaleIn 0.55s ease-out both',
        'marquee-left':  'marqueeLeft 25s linear infinite',
        'marquee-right': 'marqueeRight 25s linear infinite',
        'blink':         'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
