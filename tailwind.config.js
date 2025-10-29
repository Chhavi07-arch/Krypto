/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'crypto-blue': '#1976d2',
        'crypto-gold': '#ffd700',
        'gold': {
          500: '#ffd700',
        },
        'blue': {
          300: '#60a5fa',
          400: '#60a5fa',
          600: '#2563eb',
        },
      },
    },
  },
  plugins: [],
};