// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'crypto-blue': '#1976d2',
        'crypto-gold': '#ffd700',
      },
    },
  },
  plugins: [],
};