import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: '#FAF6EF',
        surface: '#FFFFFF',
        line: '#E8DFD0',
        ink: '#201C17',
        muted: '#6E6354',
        accent: '#BE3F29',
        n5: '#10B981',
        n4: '#14B8A6',
        n3: '#3B82F6',
        n2: '#8B5CF6',
        n1: '#F43F5E',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        // No webfont for Japanese. Google serves Zen Kaku Gothic New as 364
        // @font-face rules over 367 woff2 files (4.2 MB, 267 KB of
        // render-blocking CSS) because CJK fonts ship unicode-range subsets.
        // Every platform that renders Japanese already has a good face, and
        // the app itself uses the system stack — so match it.
        jp: [
          'Hiragino Sans',
          'Hiragino Kaku Gothic ProN',
          'Yu Gothic',
          'YuGothic',
          'Meiryo',
          'Noto Sans JP',
          'Noto Sans CJK JP',
          'ui-sans-serif',
          'sans-serif',
        ],
      },
      borderRadius: { lg: '12px', xl: '16px', '2xl': '24px' },
      boxShadow: {
        soft: '0 1px 2px rgba(58,46,34,.06), 0 12px 32px -20px rgba(58,46,34,.30)',
        lift: '0 2px 4px rgba(58,46,34,.08), 0 24px 48px -24px rgba(58,46,34,.38)',
      },
      maxWidth: { prose: '65ch' },
    },
  },
  plugins: [],
};

export default config;
