import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: '#050505',
        surface: '#141414',
        line: '#2A2A2A',
        ink: '#F5F5F2',
        muted: '#A3A39D',
        accent: '#E9ECA5',
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
        soft: '0 1px 2px rgba(0,0,0,.4), 0 12px 32px -20px rgba(0,0,0,.8)',
        lift: '0 2px 4px rgba(0,0,0,.4), 0 24px 48px -24px rgba(0,0,0,.9)',
      },
      maxWidth: { prose: '65ch' },
    },
  },
  plugins: [],
};

export default config;
