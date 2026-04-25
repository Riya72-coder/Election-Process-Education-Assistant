/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#1A56DB',
          700: '#1D4ED8',
          800: '#1E3A8A',
          900: '#0F1E4A',
        },
        teal: {
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        saffron: {
          400: '#FB923C',
          500: '#F97316',
        },
        india: {
          green:   '#138808',
          saffron: '#FF9933',
          navy:    '#000080',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'slide-left': 'slideLeft 0.35s ease-out',
        'bounce-in':  'bounceIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' },                         '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideLeft: { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        bounceIn:  { '0%': { opacity: '0', transform: 'scale(0.8)' }, '70%': { transform: 'scale(1.05)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
      boxShadow: {
        'civic': '0 4px 24px -4px rgba(26,86,219,0.25)',
        'card':  '0 2px 16px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
