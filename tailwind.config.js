/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './site/index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e8f2fc',
          100: '#cce4ff',
          400: '#4da3ff',
          500: '#0057b8',
          600: '#003d82',
          700: '#002d61',
        },
        steel: {
          500: '#64748b',
          700: '#334155',
          800: '#1e4a8a',
          900: '#0c3266',
          950: '#0a2463',
        },
        accent: {
          red: '#e63946',
          cyan: '#4da3ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Orbitron"', 'Inter', 'system-ui', 'sans-serif'],
        racing: ['"Rajdhani"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
        'ken-burns': 'ken-burns 18s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'speed-line': 'speed-line 1.2s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 87, 184, 0.35)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 87, 184, 0.65)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.12) translate(-2%, -1%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'speed-line': {
          '0%': { transform: 'translateX(-100%) skewX(-20deg)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translateX(300%) skewX(-20deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
