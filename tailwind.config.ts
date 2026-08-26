import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EF',
        card: '#FFFFFF',
        ink: '#201C17',
        subtext: '#6E6354',
        border: '#E8DFD0',
        rust: {
          DEFAULT: '#B4382C',
          light: '#E2593D',
          solid: '#B23A26',
        },
        n5: '#10B981',
        n4: '#14B8A6',
        n3: '#3B82F6',
        n2: '#8B5CF6',
        n1: '#F43F5E',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        xl: '20px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
};

export default config;
