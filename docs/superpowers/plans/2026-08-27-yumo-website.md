# Yumo Promotional Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `sofDji/yumo-website` into a polished, animated marketing site that presents every Yumo feature and hosts the canonical privacy, terms and support pages.

**Architecture:** Static Next.js 15 App Router export deployed on Vercel. One long landing page composed of independent section components, plus three legal routes sharing a common layout. All dynamic content (word data, screenshots) is generated at build time by scripts and committed, so the build never depends on the app repo being present. Motion is centralised in one tokens module so the whole page shares an easing curve.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind 3, framer-motion 12, Vitest, sharp.

**Spec:** `docs/superpowers/specs/2026-08-27-yumo-website-design.md`

## Global Constraints

- Palette, exact values: ground `#FAF6EF`, surface `#FFFFFF`, line `#E8DFD0`, ink `#201C17`, muted `#6E6354`, accent `#BE3F29`.
- Level colours, exact values: N5 `#10B981`, N4 `#14B8A6`, N3 `#3B82F6`, N2 `#8B5CF6`, N1 `#F43F5E`.
- Word counts, exact: N5 718, N4 668, N3 2139, N2 1748, N1 2699, total 7972.
- Typefaces: Schibsted Grotesk (UI/body), Instrument Serif italic (one accent word per headline), Zen Kaku Gothic New (all Japanese glyphs).
- Light theme only. No dark mode, no `prefers-color-scheme` blocks. Every colour painted explicitly.
- No email capture, no forms, no analytics, no API routes, no environment variables. `output: 'export'` must keep working.
- **Free vs Pro claims must match `../Yumo/src/lib/scheduler.ts`.** Free is N5 only (718 words), rhythms 6/12/24h, no Auto journey, no widget appearance, Browse restricted to N5. Never describe Browse or the dictionary as free.
- Continuous animation touches only `transform` and `opacity`. Never animate `filter` or `backdrop-filter`.
- Every animation collapses to its final state under `prefers-reduced-motion: reduce`.
- Total screenshot payload under 400 KB.
- The site must be legible and complete with JavaScript disabled.

---

### Task 1: Foundation — tooling, tokens, fonts

**Files:**
- Modify: `package.json`
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `vitest.config.ts`
- Create: `lib/tokens.ts`
- Test: `lib/__tests__/tokens.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `LEVEL_COLORS: Record<Level, string>`, `type Level = 'n5'|'n4'|'n3'|'n2'|'n1'`, `LEVELS: Level[]`, `WORD_COUNTS: Record<Level, number>`, `TOTAL_WORDS: number` from `lib/tokens.ts`. Tailwind classes `bg-ground`, `bg-surface`, `text-ink`, `text-muted`, `border-line`, `text-accent`, `bg-n5`…`bg-n1`. CSS vars `--ground`, `--surface`, `--line`, `--ink`, `--muted`, `--accent`. Font CSS vars `--font-sans`, `--font-serif`, `--font-jp`.

- [ ] **Step 1: Install dev dependencies**

```bash
cd /d/yumo-website
npm install -D vitest@^2.1.0 sharp@^0.34.0
```

- [ ] **Step 2: Add scripts to package.json**

Add to the `"scripts"` block:

```json
"test": "vitest run",
"test:watch": "vitest",
"build:words": "node scripts/build-words.mjs",
"build:assets": "node scripts/optimise-assets.mjs"
```

- [ ] **Step 3: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/__tests__/**/*.test.ts'],
  },
});
```

- [ ] **Step 4: Write the failing test**

Create `lib/__tests__/tokens.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { LEVELS, LEVEL_COLORS, TOTAL_WORDS, WORD_COUNTS } from '../tokens';

describe('tokens', () => {
  it('lists levels from easiest to hardest', () => {
    expect(LEVELS).toEqual(['n5', 'n4', 'n3', 'n2', 'n1']);
  });

  it('matches the app palette exactly', () => {
    expect(LEVEL_COLORS).toEqual({
      n5: '#10B981',
      n4: '#14B8A6',
      n3: '#3B82F6',
      n2: '#8B5CF6',
      n1: '#F43F5E',
    });
  });

  it('carries the real dataset counts', () => {
    expect(WORD_COUNTS).toEqual({
      n5: 718, n4: 668, n3: 2139, n2: 1748, n1: 2699,
    });
  });

  it('totals to the full dataset', () => {
    const summed = LEVELS.reduce((n, l) => n + WORD_COUNTS[l], 0);
    expect(summed).toBe(TOTAL_WORDS);
    expect(TOTAL_WORDS).toBe(7972);
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `../tokens`.

- [ ] **Step 6: Create lib/tokens.ts**

```ts
export type Level = 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

export const LEVELS: Level[] = ['n5', 'n4', 'n3', 'n2', 'n1'];

// Verbatim from the app's src/theme/colors.ts — the site and the app must
// render the same product.
export const LEVEL_COLORS: Record<Level, string> = {
  n5: '#10B981',
  n4: '#14B8A6',
  n3: '#3B82F6',
  n2: '#8B5CF6',
  n1: '#F43F5E',
};

export const LEVEL_LABELS: Record<Level, string> = {
  n5: 'N5', n4: 'N4', n3: 'N3', n2: 'N2', n1: 'N1',
};

// Counted from assets/word-data.json on 2026-08-27.
export const WORD_COUNTS: Record<Level, number> = {
  n5: 718, n4: 668, n3: 2139, n2: 1748, n1: 2699,
};

export const TOTAL_WORDS = 7972;
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npm test`
Expected: PASS, 4 tests.

- [ ] **Step 8: Rewrite tailwind.config.ts**

The existing `rust` value `#B4382C` does not match the app's accent. Replace the whole file:

```ts
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
        jp: ['var(--font-jp)', 'ui-sans-serif', 'sans-serif'],
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
```

- [ ] **Step 9: Rewrite app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ground: #FAF6EF;
  --surface: #FFFFFF;
  --line: #E8DFD0;
  --ink: #201C17;
  --muted: #6E6354;
  --accent: #BE3F29;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  background: var(--ground);
  color: var(--ink);
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

h1, h2, h3 { text-wrap: balance; }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 10: Wire the three fonts in app/layout.tsx**

Replace the file:

```tsx
import type { Metadata } from 'next';
import { Instrument_Serif, Schibsted_Grotesk, Zen_Kaku_Gothic_New } from 'next/font/google';
import './globals.css';

const sans = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-serif',
  display: 'swap',
});

const jp = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yumo — Japanese on your Lock Screen',
  description:
    'A new JLPT word on your Lock Screen and Home Screen every few hours. 7,972 words, fully offline, no accounts, no tracking.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${jp.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 11: Verify the build still succeeds**

Run: `npm run build`
Expected: build completes. The old components still compile; they get removed in Task 10.

- [ ] **Step 12: Commit**

```bash
git add package.json package-lock.json vitest.config.ts tailwind.config.ts app/globals.css app/layout.tsx lib/
git commit -m "feat: design tokens, three-face typography and test tooling"
```

---

### Task 2: Word data pipeline

**Files:**
- Create: `scripts/build-words.mjs`
- Create: `lib/select-words.ts`
- Create: `lib/words.ts` (generated, committed)
- Test: `lib/__tests__/select-words.test.ts`
- Test: `lib/__tests__/words.test.ts`

**Interfaces:**
- Consumes: `Level`, `LEVELS` from `lib/tokens.ts`.
- Produces: `type SiteWord = { id: number; kanji: string; kana: string; romaji: string; meaning: string; level: Level }`, `selectWords(raw: RawWord[], perLevel: number): SiteWord[]` from `lib/select-words.ts`, and `WORDS: SiteWord[]`, `wordsByLevel(level: Level): SiteWord[]` from `lib/words.ts`.

- [ ] **Step 1: Write the failing test for the selector**

Create `lib/__tests__/select-words.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { selectWords, type RawWord } from '../select-words';

const raw = (over: Partial<RawWord> & { id: number }): RawWord => ({
  kanji: '水', kana: 'みず', romaji: 'mizu', level: 'n5',
  meaning: { en: 'water', fr: 'eau', de: 'Wasser', es: 'agua' },
  ...over,
});

describe('selectWords', () => {
  it('drops kanji longer than three characters', () => {
    const out = selectWords([raw({ id: 1, kanji: '一二三四' })], 5);
    expect(out).toHaveLength(0);
  });

  it('drops meanings of 40 characters or more', () => {
    const long = 'a'.repeat(40);
    const out = selectWords([raw({ id: 2, meaning: { en: long, fr: '', de: '', es: '' } })], 5);
    expect(out).toHaveLength(0);
  });

  it('drops meanings containing a semicolon', () => {
    const out = selectWords([raw({ id: 3, meaning: { en: 'water; liquid', fr: '', de: '', es: '' } })], 5);
    expect(out).toHaveLength(0);
  });

  it('caps each level at perLevel entries', () => {
    const many = Array.from({ length: 30 }, (_, i) => raw({ id: i + 1 }));
    expect(selectWords(many, 24)).toHaveLength(24);
  });

  it('flattens the meaning to English and keeps the level', () => {
    const [w] = selectWords([raw({ id: 4 })], 5);
    expect(w).toEqual({
      id: 4, kanji: '水', kana: 'みず', romaji: 'mizu', meaning: 'water', level: 'n5',
    });
  });

  it('keeps levels separate rather than filling from one', () => {
    const input = [
      ...Array.from({ length: 30 }, (_, i) => raw({ id: i + 1, level: 'n5' })),
      raw({ id: 100, level: 'n1' }),
    ];
    const out = selectWords(input, 24);
    expect(out.filter((w) => w.level === 'n5')).toHaveLength(24);
    expect(out.filter((w) => w.level === 'n1')).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `../select-words`.

- [ ] **Step 3: Create lib/select-words.ts**

```ts
import { LEVELS, type Level } from './tokens';

export interface RawWord {
  id: number;
  kanji: string;
  kana: string;
  romaji: string;
  meaning: { en: string; fr: string; de: string; es: string };
  level: Level;
}

export interface SiteWord {
  id: number;
  kanji: string;
  kana: string;
  romaji: string;
  meaning: string;
  level: Level;
}

// The site shows words at display size on small cards. Long compounds and the
// dataset's multi-clause glosses are unreadable there, so both are filtered
// out rather than truncated — a clipped meaning looks like a bug.
export function selectWords(raw: RawWord[], perLevel: number): SiteWord[] {
  const out: SiteWord[] = [];

  for (const level of LEVELS) {
    const picked = raw
      .filter((w) => w.level === level)
      .filter((w) => w.kanji.length >= 1 && w.kanji.length <= 3)
      .filter((w) => {
        const en = w.meaning?.en ?? '';
        return en.length > 0 && en.length < 40 && !en.includes(';');
      })
      .slice(0, perLevel)
      .map((w) => ({
        id: w.id,
        kanji: w.kanji,
        kana: w.kana,
        romaji: w.romaji,
        meaning: w.meaning.en,
        level: w.level,
      }));

    out.push(...picked);
  }

  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS, all `selectWords` tests green.

- [ ] **Step 5: Create scripts/build-words.mjs**

```js
// Generates lib/words.ts from the Yumo app's dataset. Run manually with
// `npm run build:words`; the output is committed so `npm run build` never
// needs the app repo checked out beside this one.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(here, '../../Yumo/assets/word-data.json');
const OUT = resolve(here, '../lib/words.ts');
const PER_LEVEL = 24;

const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];

function selectWords(raw, perLevel) {
  const out = [];
  for (const level of LEVELS) {
    const picked = raw
      .filter((w) => w.level === level)
      .filter((w) => w.kanji.length >= 1 && w.kanji.length <= 3)
      .filter((w) => {
        const en = w.meaning?.en ?? '';
        return en.length > 0 && en.length < 40 && !en.includes(';');
      })
      .slice(0, perLevel)
      .map((w) => ({
        id: w.id, kanji: w.kanji, kana: w.kana,
        romaji: w.romaji, meaning: w.meaning.en, level: w.level,
      }));
    out.push(...picked);
  }
  return out;
}

const data = JSON.parse(readFileSync(SOURCE, 'utf8'));
const words = selectWords(data.words, PER_LEVEL);

for (const level of LEVELS) {
  const n = words.filter((w) => w.level === level).length;
  if (n < PER_LEVEL) {
    throw new Error(`only ${n} usable words for ${level}, expected ${PER_LEVEL}`);
  }
}

const body = `// GENERATED by scripts/build-words.mjs — do not edit by hand.
// Source: the Yumo app's assets/word-data.json (7,972 records).
import type { Level } from './tokens';
import type { SiteWord } from './select-words';

export const WORDS: SiteWord[] = ${JSON.stringify(words, null, 2)};

export function wordsByLevel(level: Level): SiteWord[] {
  return WORDS.filter((w) => w.level === level);
}
`;

writeFileSync(OUT, body, 'utf8');
console.log(`wrote ${words.length} words to lib/words.ts`);
```

Note: the duplicated `selectWords` here is deliberate — the script is plain ESM and cannot import the TypeScript module. Task 2's test suite pins the TypeScript copy; Step 7 below pins the generated output, so a drift between them fails the build.

- [ ] **Step 6: Generate the data**

Run: `npm run build:words`
Expected: `wrote 120 words to lib/words.ts`.

- [ ] **Step 7: Write the test that pins the generated file**

Create `lib/__tests__/words.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { LEVELS } from '../tokens';
import { WORDS, wordsByLevel } from '../words';

describe('generated words', () => {
  it('holds 24 words for every level', () => {
    for (const level of LEVELS) {
      expect(wordsByLevel(level)).toHaveLength(24);
    }
  });

  it('holds 120 words in total', () => {
    expect(WORDS).toHaveLength(120);
  });

  it('obeys the display constraints the selector promises', () => {
    for (const w of WORDS) {
      expect(w.kanji.length).toBeLessThanOrEqual(3);
      expect(w.meaning.length).toBeLessThan(40);
      expect(w.meaning).not.toContain(';');
    }
  });

  it('has every field populated', () => {
    for (const w of WORDS) {
      expect(w.kanji).toBeTruthy();
      expect(w.kana).toBeTruthy();
      expect(w.romaji).toBeTruthy();
      expect(w.meaning).toBeTruthy();
    }
  });
});
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add scripts/build-words.mjs lib/select-words.ts lib/words.ts lib/__tests__/ package.json
git commit -m "feat: build-time word pipeline with a curated 120-word subset"
```

---

### Task 3: Site config and motion tokens

**Files:**
- Create: `lib/site.ts`
- Create: `lib/motion.ts`
- Test: `lib/__tests__/site.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `LAUNCHED: boolean`, `APP_STORE_URL: string`, `PLAY_STORE_URL: string`, `SITE_URL: string`, `SUPPORT_EMAIL: string`, `storeState(): 'coming-soon' | 'live'` from `lib/site.ts`. `EASE`, `DURATION`, `riseBlur: Variants`, `drift(i: number)` from `lib/motion.ts`.

- [ ] **Step 1: Write the failing test**

Create `lib/__tests__/site.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { APP_STORE_URL, LAUNCHED, PLAY_STORE_URL, storeState } from '../site';

describe('site config', () => {
  it('is pre-launch until the flag is flipped', () => {
    expect(LAUNCHED).toBe(false);
  });

  it('reports coming-soon while unlaunched', () => {
    expect(storeState()).toBe('coming-soon');
  });

  it('refuses to claim launched without both store URLs', () => {
    if (LAUNCHED) {
      expect(APP_STORE_URL).not.toBe('');
      expect(PLAY_STORE_URL).not.toBe('');
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `../site`.

- [ ] **Step 3: Create lib/site.ts**

```ts
// The single switch that turns the site from pre-launch to launched.
// Flip LAUNCHED to true and fill both URLs on the day the app ships.
export const LAUNCHED = false;
export const APP_STORE_URL = '';
export const PLAY_STORE_URL = '';

export const SITE_URL = 'https://yumo-website.vercel.app';
export const SUPPORT_EMAIL = 'sofianeenf85@gmail.com';

// Fails safe: a half-configured launch renders "coming soon" rather than a
// badge linking nowhere.
export function storeState(): 'coming-soon' | 'live' {
  return LAUNCHED && APP_STORE_URL !== '' && PLAY_STORE_URL !== ''
    ? 'live'
    : 'coming-soon';
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Create lib/motion.ts**

```ts
import type { Variants } from 'framer-motion';

// One curve for the whole page, so every element feels like part of the same
// object. Matches --ease in globals.css.
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = { fast: 0.25, base: 0.5, slow: 0.8 } as const;

// The signature reveal: blur clearing as the element rises. Blur only ever
// appears in an enter transition, never in a loop — see the spec's
// performance rules.
export const riseBlur: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

// Independent periods so the five floating cards never synchronise into a
// visible pulse. Transform-only, so it stays on the compositor.
export function drift(i: number) {
  const period = 7 + i * 1.7;
  return {
    animate: {
      y: [0, -14, 0, 10, 0],
      x: [0, 8, 0, -6, 0],
      rotate: [0, 1.5, 0, -1.5, 0],
    },
    transition: {
      duration: period,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };
}
```

- [ ] **Step 6: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add lib/site.ts lib/motion.ts lib/__tests__/site.test.ts
git commit -m "feat: launch switch and shared motion tokens"
```

---

### Task 4: Screenshot optimisation pipeline

**Files:**
- Create: `scripts/optimise-assets.mjs`
- Create: `lib/shots.ts` (generated, committed)
- Delete: `public/screenshots/*.png`
- Create: `public/shots/*.webp`
- Test: `lib/__tests__/shots.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `interface Shot { src: string; srcSmall: string; width: number; height: number; blur: string }` and `SHOTS: Record<string, Shot>` from `lib/shots.ts`, keyed `today`, `browse`, `saved`, `settings`, `widgetHome`.

- [ ] **Step 1: Create scripts/optimise-assets.mjs**

```js
// Converts the App Store captures into web-weight WebP plus an inline blur
// placeholder. Run with `npm run build:assets`; output is committed.
//
// This exists because next.config.ts sets output:'export' with
// images:{unoptimized:true} — Next cannot compress at request time, so
// whatever sits in public/ is exactly what every visitor downloads.
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, '../../Yumo/store-screenshots/ios-6.9');
const OUT = resolve(here, '../public/shots');
const GEN = resolve(here, '../lib/shots.ts');

const MAP = {
  '01-today.png': 'today',
  '02-browse.png': 'browse',
  '03-saved.png': 'saved',
  '04-settings.png': 'settings',
  '05-widget-home.png': 'widgetHome',
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const entries = {};

for (const [file, key] of Object.entries(MAP)) {
  const input = resolve(SRC, file);
  const meta = await sharp(input).metadata();

  await sharp(input).resize(1290).webp({ quality: 82 }).toFile(resolve(OUT, `${key}.webp`));
  await sharp(input).resize(645).webp({ quality: 80 }).toFile(resolve(OUT, `${key}@small.webp`));

  const blurBuf = await sharp(input).resize(12).webp({ quality: 40 }).toBuffer();

  entries[key] = {
    src: `/shots/${key}.webp`,
    srcSmall: `/shots/${key}@small.webp`,
    width: meta.width,
    height: meta.height,
    blur: `data:image/webp;base64,${blurBuf.toString('base64')}`,
  };
}

const total = readdirSync(OUT).reduce(
  (n, f) => n + statSync(resolve(OUT, f)).size,
  0,
);

const body = `// GENERATED by scripts/optimise-assets.mjs — do not edit by hand.
export interface Shot {
  src: string;
  srcSmall: string;
  width: number;
  height: number;
  blur: string;
}

export const SHOTS: Record<string, Shot> = ${JSON.stringify(entries, null, 2)};
`;

writeFileSync(GEN, body, 'utf8');
console.log(`wrote ${Object.keys(entries).length} shots, ${(total / 1024).toFixed(0)} KB total`);

if (total > 400 * 1024) {
  throw new Error(`shots total ${(total / 1024).toFixed(0)} KB, budget is 400 KB`);
}
```

- [ ] **Step 2: Run the pipeline**

```bash
cd /d/yumo-website
npm run build:assets
```

Expected: `wrote 5 shots, <NNN> KB total`, and the run does not throw. If it exceeds 400 KB, lower the large-size quality from 82 to 75 and rerun.

- [ ] **Step 3: Remove the old unoptimised PNGs**

```bash
git rm -r public/screenshots
```

- [ ] **Step 4: Write the test that pins the budget**

Create `lib/__tests__/shots.test.ts`:

```ts
import { statSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SHOTS } from '../shots';

describe('screenshots', () => {
  it('has all five app captures', () => {
    expect(Object.keys(SHOTS).sort()).toEqual(
      ['browse', 'saved', 'settings', 'today', 'widgetHome'].sort(),
    );
  });

  it('carries real dimensions so layout space is reserved', () => {
    for (const shot of Object.values(SHOTS)) {
      expect(shot.width).toBeGreaterThan(0);
      expect(shot.height).toBeGreaterThan(0);
    }
  });

  it('carries an inline blur placeholder', () => {
    for (const shot of Object.values(SHOTS)) {
      expect(shot.blur.startsWith('data:image/webp;base64,')).toBe(true);
    }
  });

  it('stays inside the 400 KB payload budget', () => {
    let total = 0;
    for (const shot of Object.values(SHOTS)) {
      total += statSync(resolve(process.cwd(), `public${shot.src}`)).size;
      total += statSync(resolve(process.cwd(), `public${shot.srcSmall}`)).size;
    }
    expect(total).toBeLessThan(400 * 1024);
  });
});
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add scripts/optimise-assets.mjs lib/shots.ts lib/__tests__/shots.test.ts public/shots package.json
git commit -m "perf: replace 5 MB of PNG with a build-time WebP pipeline"
```

---

### Task 5: UI primitives

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Pill.tsx`
- Create: `components/ui/StoreCta.tsx`
- Create: `components/layout/Section.tsx`
- Create: `components/layout/Reveal.tsx`

**Interfaces:**
- Consumes: `storeState` from `lib/site.ts`; `riseBlur`, `DURATION`, `EASE` from `lib/motion.ts`.
- Produces: `<Button href? onClick? variant='primary'|'ghost' children>`, `<Pill children tone?='neutral'|'accent'>`, `<StoreCta />`, `<Section id title? eyebrow? children className?>`, `<Reveal delay? children>`.

- [ ] **Step 1: Create components/ui/Button.tsx**

```tsx
import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
}

const base =
  'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';

const styles = {
  primary:
    'bg-ink text-ground shadow-soft hover:-translate-y-0.5 hover:shadow-lift',
  ghost:
    'border border-line bg-surface/70 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft',
};

export function Button({ href, children, variant = 'primary' }: Props) {
  const cls = `${base} ${styles[variant]}`;
  const inner = (
    <>
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (!href) {
    return <span className={`${cls} cursor-default`}>{inner}</span>;
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
```

- [ ] **Step 2: Create components/ui/Pill.tsx**

```tsx
import type { ReactNode } from 'react';

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'accent';
}) {
  const tones = {
    neutral: 'border-line bg-surface/70 text-muted',
    accent: 'border-accent/25 bg-accent/10 text-accent',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create components/ui/StoreCta.tsx**

```tsx
import { APP_STORE_URL, PLAY_STORE_URL, storeState } from '@/lib/site';
import { Button } from './Button';

// Renders "coming soon" until lib/site.ts declares a launch with both URLs.
export function StoreCta() {
  if (storeState() === 'coming-soon') {
    return (
      <div className="flex flex-col items-center gap-3">
        <Button>Coming soon</Button>
        <p className="text-sm text-muted">Free on the App Store and Google Play</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button href={APP_STORE_URL}>Download for iPhone</Button>
      <Button href={PLAY_STORE_URL} variant="ghost">
        Get it on Android
      </Button>
    </div>
  );
}
```

- [ ] **Step 4: Create components/layout/Section.tsx**

```tsx
import type { ReactNode } from 'react';

interface Props {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  lede?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, lede, children, className = '' }: Props) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-6 py-24 md:py-32 ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-14 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-[32px] font-semibold leading-[1.12] tracking-tight md:text-[44px]">
              {title}
            </h2>
          )}
          {lede && <p className="mt-4 max-w-prose text-[17px] leading-relaxed text-muted">{lede}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
```

- [ ] **Step 5: Create components/layout/Reveal.tsx**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DURATION, EASE, riseBlur } from '@/lib/motion';

// Scroll reveal: blur clears as the element rises. Fires once. Under
// prefers-reduced-motion the element renders in its final state with no
// transition at all.
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={riseBlur}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: DURATION.slow, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 6: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/ui components/layout
git commit -m "feat: button, pill, store CTA, section and scroll-reveal primitives"
```

---

### Task 6: Chrome — nav and footer

**Files:**
- Create: `components/chrome/NavBar.tsx`
- Create: `components/chrome/Footer.tsx`
- Delete: `components/NavBar.tsx`, `components/Footer.tsx`
- Copy: `public/logo.png`

**Interfaces:**
- Consumes: `Pill` from `components/ui/Pill.tsx`; `SUPPORT_EMAIL` from `lib/site.ts`.
- Produces: `<NavBar />`, `<Footer />`.

- [ ] **Step 1: Copy the logo**

```bash
cp /d/Yumo/assets/images/icon.png /d/yumo-website/public/logo.png
```

- [ ] **Step 2: Create components/chrome/NavBar.tsx**

```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pill } from '@/components/ui/Pill';
import { storeState } from '@/lib/site';

const LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#features', label: 'Features' },
  { href: '/#levels', label: 'Levels' },
  { href: '/#pricing', label: 'Pricing' },
];

export function NavBar() {
  return (
    <div className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-3xl items-center gap-2 rounded-full border border-line bg-[rgba(255,252,246,0.72)] p-2 shadow-soft backdrop-blur-xl">
        <Link href="/" className="shrink-0" aria-label="Yumo home">
          <Image
            src="/logo.png"
            alt="Yumo"
            width={36}
            height={36}
            className="rounded-xl"
            priority
          />
        </Link>

        <ul className="ml-1 hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-muted transition-colors duration-200 hover:bg-ground hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <span className="ml-auto pr-1">
          <Pill tone="accent">
            {storeState() === 'live' ? 'Available now' : 'Coming soon'}
          </Pill>
        </span>
      </nav>
    </div>
  );
}
```

- [ ] **Step 3: Create components/chrome/Footer.tsx**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={40} height={40} className="rounded-xl" />
          <div>
            <p className="font-semibold">Yumo</p>
            <p className="text-sm text-muted">Japanese, without opening an app.</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/support" className="text-muted transition-colors hover:text-ink">
            Support
          </Link>
          <Link href="/privacy" className="text-muted transition-colors hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="text-muted transition-colors hover:text-ink">
            Terms
          </Link>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-muted transition-colors hover:text-ink"
          >
            Contact
          </a>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-10 text-xs leading-relaxed text-muted">
        <p>© 2026 Yumo. Stroke order diagrams © KanjiVG (Ulrich Apel), CC BY-SA 4.0. French, German and Spanish translations include data from JMdict/EDICT (EDRDG), used under CC BY-SA 4.0.</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Delete the superseded components**

```bash
git rm components/NavBar.tsx components/Footer.tsx
```

- [ ] **Step 5: Verify types compile**

Run: `npx tsc --noEmit`
Expected: errors only from `app/page.tsx`, which still imports the deleted files. That is fixed in Task 10.

- [ ] **Step 6: Commit**

```bash
git add components/chrome public/logo.png
git commit -m "feat: glass nav pill and footer with legal links"
```

---

### Task 7: Hero

**Files:**
- Create: `components/hero/Blooms.tsx`
- Create: `components/hero/WordCard.tsx`
- Create: `components/hero/FloatingCards.tsx`
- Create: `components/hero/PhoneShot.tsx`
- Create: `components/hero/Hero.tsx`
- Delete: `components/Hero.tsx`

**Interfaces:**
- Consumes: `WORDS`, `wordsByLevel` from `lib/words.ts`; `LEVELS`, `LEVEL_COLORS`, `LEVEL_LABELS` from `lib/tokens.ts`; `SHOTS` from `lib/shots.ts`; `drift`, `DURATION`, `EASE` from `lib/motion.ts`; `StoreCta`.
- Produces: `<Hero />`, `<WordCard word size='lg'|'sm' />`, `<PhoneShot shot alt priority? />`.

- [ ] **Step 1: Create components/hero/Blooms.tsx**

```tsx
// Three static radial washes that give the flat beige depth. Never animated —
// a blurred element animating every frame is the reliable way to make this
// page stutter on mobile Safari.
export function Blooms() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full opacity-[0.18] blur-[110px]"
        style={{ background: '#10B981' }}
      />
      <div
        className="absolute -right-24 top-40 h-[380px] w-[380px] rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: '#3B82F6' }}
      />
      <div
        className="absolute left-1/3 top-[420px] hidden h-[360px] w-[360px] rounded-full opacity-[0.12] blur-[130px] md:block"
        style={{ background: '#8B5CF6' }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create components/hero/WordCard.tsx**

```tsx
import { LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';
import type { SiteWord } from '@/lib/select-words';

export function WordCard({ word, size = 'lg' }: { word: SiteWord; size?: 'lg' | 'sm' }) {
  const color = LEVEL_COLORS[word.level];
  const large = size === 'lg';

  return (
    <div
      className={`rounded-2xl border border-line bg-surface/70 backdrop-blur-none md:backdrop-blur-md ${
        large ? 'px-8 py-7' : 'px-4 py-3'
      }`}
      style={{ boxShadow: `0 18px 40px -24px ${color}66, 0 2px 4px rgba(58,46,34,.06)` }}
    >
      <span
        className="mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider text-white"
        style={{ background: color }}
      >
        {LEVEL_LABELS[word.level]}
      </span>
      <p className={`font-jp font-medium leading-none ${large ? 'text-6xl' : 'text-2xl'}`}>
        {word.kanji}
      </p>
      <p className={`mt-3 font-jp text-muted ${large ? 'text-lg' : 'text-xs'}`}>
        {word.kana} · {word.romaji}
      </p>
      {large && <p className="mt-2 text-[17px] font-medium">{word.meaning}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Create components/hero/FloatingCards.tsx**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { drift } from '@/lib/motion';
import { LEVELS } from '@/lib/tokens';
import { wordsByLevel } from '@/lib/words';
import { WordCard } from './WordCard';

// Positions are deliberately asymmetric — a symmetrical ring reads as a
// diagram rather than as objects floating in space.
const SPOTS = [
  'left-[2%] top-[14%]',
  'right-[4%] top-[8%]',
  'left-[8%] bottom-[16%]',
  'right-[2%] bottom-[22%]',
  'left-[46%] top-[2%]',
];

export function FloatingCards() {
  const reduced = useReducedMotion();
  // Server and client must agree on first render, so index 0 is fixed and the
  // shuffle happens after mount.
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 24));
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {LEVELS.map((level, i) => {
        const pool = wordsByLevel(level);
        const word = pool[(seed + i * 5) % pool.length];
        const motionProps = reduced ? {} : drift(i);

        return (
          <motion.div
            key={level}
            className={`absolute ${SPOTS[i]}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
          >
            <motion.div {...motionProps}>
              <WordCard word={word} size="sm" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Create components/hero/PhoneShot.tsx**

```tsx
import type { Shot } from '@/lib/shots';

// Plain <picture> rather than next/image: output:'export' with
// images:{unoptimized:true} means next/image adds no optimisation here, only
// wrapper markup. Explicit width/height reserve layout space so CLS stays 0.
export function PhoneShot({
  shot,
  alt,
  className = '',
  priority = false,
}: {
  shot: Shot;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={shot.srcSmall} type="image/webp" />
      <source srcSet={shot.src} type="image/webp" />
      <img
        src={shot.src}
        alt={alt}
        width={shot.width}
        height={shot.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`h-auto w-full rounded-[2rem] ${className}`}
        style={{
          backgroundImage: `url(${shot.blur})`,
          backgroundSize: 'cover',
        }}
      />
    </picture>
  );
}
```

- [ ] **Step 5: Create components/hero/Hero.tsx**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { StoreCta } from '@/components/ui/StoreCta';
import { DURATION, EASE } from '@/lib/motion';
import { SHOTS } from '@/lib/shots';
import { WORDS } from '@/lib/words';
import { Blooms } from './Blooms';
import { FloatingCards } from './FloatingCards';
import { PhoneShot } from './PhoneShot';
import { WordCard } from './WordCard';

export function Hero() {
  const reduced = useReducedMotion();
  // Index 0 on the server, a random word once mounted — anything else is a
  // hydration mismatch.
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * WORDS.length));
  }, []);

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: DURATION.slow, ease: EASE, delay },
        };

  return (
    <header className="relative overflow-hidden pb-8 pt-16 md:pt-24">
      <Blooms />
      <FloatingCards />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <motion.h1
          {...enter(0.05)}
          className="text-[40px] font-semibold leading-[1.06] tracking-tight md:text-[64px]"
        >
          Japanese, learned{' '}
          <span className="font-serif italic font-normal">without trying</span>
        </motion.h1>

        <motion.p {...enter(0.15)} className="mt-5 max-w-prose text-[18px] leading-relaxed text-muted">
          A new JLPT word appears on your Lock Screen and Home Screen every few
          hours. No streaks, no lessons, nothing to remember to open.
        </motion.p>

        <motion.div {...enter(0.25)} className="mt-10">
          <WordCard word={WORDS[index]} />
        </motion.div>

        <motion.div {...enter(0.35)} className="mt-10">
          <StoreCta />
        </motion.div>
      </div>

      <motion.div {...enter(0.45)} className="relative mx-auto mt-16 w-full max-w-xs px-6">
        <PhoneShot shot={SHOTS.widgetHome} alt="The Yumo widget on an iPhone Home Screen" priority />
      </motion.div>
    </header>
  );
}
```

- [ ] **Step 6: Delete the old hero**

```bash
git rm components/Hero.tsx
```

- [ ] **Step 7: Verify types compile**

Run: `npx tsc --noEmit`
Expected: errors only from `app/page.tsx`, fixed in Task 10.

- [ ] **Step 8: Commit**

```bash
git add components/hero
git commit -m "feat: hero with live word card, drifting level cards and ambient blooms"
```

---

### Task 8: Sections — how it works, the widget, features

**Files:**
- Create: `components/sections/HowItWorks.tsx`
- Create: `components/sections/WidgetSection.tsx`
- Create: `components/sections/Features.tsx`
- Delete: `components/HowItWorks.tsx`, `components/FeaturesGrid.tsx`

**Interfaces:**
- Consumes: `Section`, `Reveal`, `PhoneShot`, `SHOTS`.
- Produces: `<HowItWorks />`, `<WidgetSection />`, `<Features />`.

- [ ] **Step 1: Create components/sections/HowItWorks.tsx**

```tsx
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';

const STEPS = [
  {
    n: '01',
    title: 'Add the widget',
    body: 'Long-press your Lock Screen or Home Screen and drop Yumo in. That is the entire setup.',
  },
  {
    n: '02',
    title: 'Pick your rhythm',
    body: 'A new word every 6, 12 or 24 hours on the free tier. Every 1, 2, 3 or 4 hours with Pro.',
  },
  {
    n: '03',
    title: 'Stop thinking about it',
    body: 'Words arrive while you check the time. Tap one to hear it, save it, or trace its strokes.',
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title={<>Three steps, then <span className="font-serif italic font-normal">nothing</span></>}
      lede="Yumo is designed to be set up once and then forgotten. The learning happens on screens you already look at."
    >
      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <li className="h-full rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <span className="font-serif text-2xl italic text-accent">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
```

- [ ] **Step 2: Create components/sections/WidgetSection.tsx**

```tsx
import { PhoneShot } from '@/components/hero/PhoneShot';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { SHOTS } from '@/lib/shots';

export function WidgetSection() {
  return (
    <Section
      id="widget"
      eyebrow="The widget"
      title={<>It lives where you already <span className="font-serif italic font-normal">look</span></>}
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="mx-auto max-w-[280px]">
            <PhoneShot shot={SHOTS.widgetHome} alt="The Yumo widget on a Home Screen" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">On iPhone</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                Lock Screen and Home Screen, in small, medium, rectangular and
                inline sizes. Every widget can carry its own level and rhythm,
                so you can run N5 on the Lock Screen and N3 on the Home Screen.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">On Android</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                A resizable home-screen widget that follows the level and rhythm
                you set in the app. Android has no Lock Screen widgets, so Yumo
                does not pretend otherwise.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Always right, always offline</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                The word shown is a pure function of the time and your settings.
                No server decides it, so it is identical on every device and
                works in aeroplane mode.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create components/sections/Features.tsx**

```tsx
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';

const FEATURES = [
  { title: 'Hear every word', body: "Native pronunciation through your device's Japanese voice. No downloads, no streaming." },
  { title: 'Trace the strokes', body: 'Practise writing kanji and kana with guided stroke order from KanjiVG.' },
  { title: 'Four meaning languages', body: 'English, French, German and Spanish, all bundled in the app.' },
  { title: 'Save what matters', body: 'Keep the words you want to revisit; they stay on your device.' },
  { title: 'Notifications, same rhythm', body: 'Optional word notifications on the widget schedule, scheduled locally.' },
  { title: 'Themes', body: 'Light, dark or system, plus widget colours, transparency and text colour with Pro.' },
  { title: 'Browse the dictionary', body: '7,972 words with readings and meanings. N5 on the free tier, every level with Pro.' },
  { title: 'Completely offline', body: 'The whole dataset ships inside the app. Yumo makes no network requests of its own.' },
];

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      title={<>Small app, <span className="font-serif italic font-normal">deep</span> app</>}
      lede="Everything below works without an account, without a connection, and without sending anything anywhere."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 4) * 0.06}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
              <h3 className="text-[15px] font-semibold">{f.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Delete the superseded components**

```bash
git rm components/HowItWorks.tsx components/FeaturesGrid.tsx
```

- [ ] **Step 5: Verify types compile**

Run: `npx tsc --noEmit`
Expected: errors only from `app/page.tsx`.

- [ ] **Step 6: Commit**

```bash
git add components/sections
git commit -m "feat: how-it-works, widget and features sections"
```

---

### Task 9: Sections — levels, browse, pricing, privacy, FAQ

**Files:**
- Create: `components/sections/JlptLadder.tsx`
- Create: `components/sections/BrowseSection.tsx`
- Create: `components/sections/Pricing.tsx`
- Create: `components/sections/PrivacySection.tsx`
- Create: `components/sections/Faq.tsx`
- Delete: `components/JlptLevels.tsx`, `components/Pricing.tsx`, `components/Privacy.tsx`, `components/WhatsComing.tsx`

**Interfaces:**
- Consumes: `LEVELS`, `LEVEL_COLORS`, `LEVEL_LABELS`, `WORD_COUNTS`, `TOTAL_WORDS`; `SHOTS`; `Section`, `Reveal`, `PhoneShot`, `StoreCta`.
- Produces: `<JlptLadder />`, `<BrowseSection />`, `<Pricing />`, `<PrivacySection />`, `<Faq />`.

- [ ] **Step 1: Create components/sections/JlptLadder.tsx**

```tsx
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { LEVELS, LEVEL_COLORS, LEVEL_LABELS, TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';

const BLURB: Record<string, string> = {
  n5: 'The first 718 words. Everything on the free tier.',
  n4: 'Everyday verbs and adjectives you will actually hear.',
  n3: 'The bridge level, and the largest jump in vocabulary.',
  n2: 'Newspaper and workplace Japanese.',
  n1: 'The long tail — 2,699 words most courses never reach.',
};

export function JlptLadder() {
  return (
    <Section
      id="levels"
      eyebrow="Levels"
      title={<>N5 to N1, or let it <span className="font-serif italic font-normal">climb</span></>}
      lede={`All ${TOTAL_WORDS.toLocaleString('en-US')} words, graded by JLPT level. Pick one and stay there, or turn on Auto and let Yumo move you up as you go, weaving earlier words back in for review.`}
    >
      <ul className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
        {LEVELS.map((level, i) => (
          <Reveal key={level} delay={i * 0.05}>
            <li
              className="group relative flex items-center gap-5 overflow-hidden border-b border-line px-6 py-5 last:border-b-0"
            >
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `${LEVEL_COLORS[level]}0F` }}
              />
              <span
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{ background: LEVEL_COLORS[level] }}
              >
                {LEVEL_LABELS[level]}
              </span>
              <span className="relative z-10 flex-1">
                <span className="block text-[15px] font-medium">{BLURB[level]}</span>
              </span>
              <span className="relative z-10 shrink-0 text-sm tabular-nums text-muted">
                {WORD_COUNTS[level].toLocaleString('en-US')} words
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 2: Create components/sections/BrowseSection.tsx**

```tsx
import { PhoneShot } from '@/components/hero/PhoneShot';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { SHOTS } from '@/lib/shots';
import { TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';

export function BrowseSection() {
  return (
    <Section
      id="browse"
      eyebrow="Browse"
      title={<>The whole dictionary, <span className="font-serif italic font-normal">searchable</span></>}
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Search {TOTAL_WORDS.toLocaleString('en-US')} words by kanji, kana,
              romaji or meaning. Every entry carries its reading, its romaji, its
              JLPT level and meanings in English, French, German and Spanish.
            </p>
            <p>
              On the free tier Browse covers N5 — {WORD_COUNTS.n5} words. Yumo Pro
              opens every level above it.
            </p>
            <p>
              It all ships inside the app, so search works with no connection at
              all.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto max-w-[280px]">
            <PhoneShot shot={SHOTS.browse} alt="Browsing the Yumo dictionary" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create components/sections/Pricing.tsx**

Every claim here is taken from `resolveFrequency` and `resolveLevelForWindow` in the app's `src/lib/scheduler.ts`. Do not adjust without re-reading them.

```tsx
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { StoreCta } from '@/components/ui/StoreCta';
import { WORD_COUNTS, TOTAL_WORDS } from '@/lib/tokens';

const FREE = [
  `N5 vocabulary — ${WORD_COUNTS.n5} words`,
  'A new word every 6, 12 or 24 hours',
  'Lock Screen and Home Screen widgets',
  'Pronunciation and stroke practice',
  'Favourites, notifications and themes',
];

const PRO = [
  `Every level, N5 to N1 — all ${TOTAL_WORDS.toLocaleString('en-US')} words`,
  'A new word every 1, 2, 3 or 4 hours',
  'The Auto journey, climbing N5 to N1',
  'Browse the full dictionary',
  'Widget colours, transparency and text colour',
];

export function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title={<>One price, <span className="font-serif italic font-normal">forever</span></>}
      lede="Yumo Pro is a single purchase. No subscription, no renewal, no account to cancel."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-line bg-surface p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted">Free</p>
            <p className="mt-2 text-4xl font-semibold">£0</p>
            <ul className="mt-6 space-y-3 text-[15px] text-muted">
              {FREE.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden className="text-accent">·</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-2xl border-2 border-accent/30 bg-surface p-8 shadow-lift">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Yumo Pro</p>
            <p className="mt-2 text-4xl font-semibold">
              $5.99 <span className="text-base font-normal text-muted">once</span>
            </p>
            <ul className="mt-6 space-y-3 text-[15px] text-muted">
              {PRO.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden className="text-accent">·</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 flex justify-center">
        <StoreCta />
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Create components/sections/PrivacySection.tsx**

```tsx
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';

const CLAIMS = [
  { title: 'No account', body: 'There is nothing to sign up for. Yumo has no login, no profile and no cloud sync.' },
  { title: 'No analytics', body: 'No usage tracking, no crash reporting, no advertising identifiers, no third-party SDKs beyond billing.' },
  { title: 'Nothing leaves the device', body: 'Settings, saved words and progress are stored locally. Deleting the app deletes all of it.' },
  { title: 'No network requests', body: 'The whole dataset ships inside the app. Yumo makes no requests of its own, so it works offline by design rather than by accident.' },
];

export function PrivacySection() {
  return (
    <Section
      id="privacy"
      eyebrow="Privacy"
      title={<>It collects <span className="font-serif italic font-normal">nothing</span></>}
      lede="Not as a policy decision that could change, but because there is no server to send anything to."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CLAIMS.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.08}>
            <div className="h-full rounded-2xl border border-line bg-surface p-7 shadow-soft">
              <h3 className="text-[15px] font-semibold">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        The one exception: buying Yumo Pro sends your purchase to Apple or Google
        and to RevenueCat, which validates it so you can restore it later. That is
        described in full in the{' '}
        <a href="/privacy" className="text-accent underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </Section>
  );
}
```

- [ ] **Step 5: Create components/sections/Faq.tsx**

```tsx
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';

const QA = [
  {
    q: 'Why has the word not changed?',
    a: 'Yumo rotates on a fixed rhythm — every 6, 12 or 24 hours free, or every 1 to 4 hours with Pro. Between those points the word holds. That is intended: a word you see for a few hours is a word you remember.',
  },
  {
    q: 'Does it work on Android?',
    a: 'Yes, as a home-screen widget. Android phones have no Lock Screen widgets, so that part is iPhone only.',
  },
  {
    q: 'Is Yumo Pro a subscription?',
    a: 'No. It is a single purchase tied to your App Store or Google Play account, restorable on any device you sign into.',
  },
  {
    q: 'I hear nothing when I tap the speaker.',
    a: "Yumo speaks through your device's built-in Japanese voice. If none is installed, add one in Accessibility settings — iPhone under Spoken Content, Android under Text-to-speech output.",
  },
  {
    q: 'How do I get a refund?',
    a: 'Refunds are handled by Apple and Google, not by us. Use reportaproblem.apple.com, or your Google Play order history.',
  },
];

export function Faq() {
  return (
    <Section id="faq" eyebrow="Questions" title="Before you ask">
      <div className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
        {QA.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.04}>
            <details className="group px-7 py-5">
              <summary className="cursor-pointer list-none text-[15px] font-medium marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span
                    aria-hidden
                    className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: Delete the superseded components**

```bash
git rm components/JlptLevels.tsx components/Pricing.tsx components/Privacy.tsx components/WhatsComing.tsx
```

- [ ] **Step 7: Verify types compile**

Run: `npx tsc --noEmit`
Expected: errors only from `app/page.tsx`.

- [ ] **Step 8: Commit**

```bash
git add components/sections
git commit -m "feat: levels, browse, pricing, privacy and FAQ sections"
```

---

### Task 10: Compose the landing page

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: every section component and the chrome.
- Produces: the rendered `/` route.

- [ ] **Step 1: Rewrite app/page.tsx**

```tsx
import { Footer } from '@/components/chrome/Footer';
import { NavBar } from '@/components/chrome/NavBar';
import { Hero } from '@/components/hero/Hero';
import { BrowseSection } from '@/components/sections/BrowseSection';
import { Faq } from '@/components/sections/Faq';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { JlptLadder } from '@/components/sections/JlptLadder';
import { Pricing } from '@/components/sections/Pricing';
import { PrivacySection } from '@/components/sections/PrivacySection';
import { WidgetSection } from '@/components/sections/WidgetSection';

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <HowItWorks />
        <WidgetSection />
        <Features />
        <JlptLadder />
        <BrowseSection />
        <Pricing />
        <PrivacySection />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Confirm no orphaned components remain**

Run: `ls components/*.tsx 2>/dev/null`
Expected: no output — every top-level component has been moved into `chrome/`, `hero/`, `sections/`, `ui/` or `layout/`.

- [ ] **Step 3: Verify the full build**

Run: `npx tsc --noEmit && npm run build`
Expected: no type errors; build completes and emits `out/`.

- [ ] **Step 4: Verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` and confirm: the nav pill blurs what scrolls under it; the hero word card shows a real Japanese word; five cards drift at different rates on a wide window; sections reveal on scroll; hovering a JLPT row floods it with that level's colour; the FAQ opens and closes.

Then set the OS to reduced motion and reload — everything must render in its final state with nothing animating.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose the landing page from the new sections"
```

---

### Task 11: Legal and support routes

**Files:**
- Create: `components/layout/LegalLayout.tsx`
- Create: `app/privacy/page.tsx`
- Create: `app/terms/page.tsx`
- Create: `app/support/page.tsx`

**Interfaces:**
- Consumes: `NavBar`, `Footer`.
- Produces: routes `/privacy`, `/terms`, `/support`.

- [ ] **Step 1: Create components/layout/LegalLayout.tsx**

```tsx
import type { ReactNode } from 'react';
import { Footer } from '@/components/chrome/Footer';
import { NavBar } from '@/components/chrome/NavBar';

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="mx-auto w-full max-w-3xl px-6 py-20">
        <h1 className="text-[34px] font-semibold leading-tight tracking-tight">{title}</h1>
        {updated && <p className="mt-2 text-sm text-muted">{updated}</p>}
        <div className="prose-yumo mt-10 space-y-6 text-[15px] leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-ink">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create app/privacy/page.tsx**

Port the text verbatim from `../Yumo/docs/legal/privacy-policy.html`. Read that file and transcribe each `<h2>` and `<p>` into JSX; do not paraphrase — this is a legal document already cited in the App Store listing.

```tsx
import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy — Yumo',
  description: 'Yumo has no accounts, no analytics and no tracking. Here is exactly what that means.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="Effective August 17, 2026">
      <p>
        Yumo is a Japanese vocabulary app. It is built to work entirely on your
        device: it has no accounts, no analytics, no advertising, and no tracking.
      </p>

      <h2>Data stored on your device</h2>
      <p>
        Your settings (JLPT level, word frequency, language, widget style, theme),
        your saved words, and your learning progress are stored only on your
        device. They are never transmitted to us or anyone else. Word notifications
        are scheduled locally on your device. Deleting the app deletes all of this
        data.
      </p>

      <h2>Purchases</h2>
      <p>
        Yumo offers one optional one-time purchase, Yumo Pro, processed by Apple&apos;s
        App Store or Google Play. To validate purchases and enable restoring them,
        Yumo uses <a href="https://www.revenuecat.com/privacy">RevenueCat</a>, which
        receives an anonymous app-generated identifier and your purchase history for
        this app. RevenueCat cannot identify you personally from this data, and it is
        used for no purpose other than making your purchase work. Payment details are
        handled entirely by Apple or Google and never reach Yumo or RevenueCat.
      </p>

      <h2>What we never collect</h2>
      <p>
        No name, email, location, contacts, photos, microphone audio, usage
        analytics, or advertising identifiers. Yumo makes no network requests of its
        own — the entire word dataset ships inside the app and works offline.
      </p>

      <h2>Children</h2>
      <p>Yumo collects no personal data from anyone, including children.</p>

      <h2>Changes</h2>
      <p>
        If this policy ever changes, the updated version will be posted at this
        address with a new effective date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
```

- [ ] **Step 3: Create app/terms/page.tsx**

Open `../Yumo/docs/legal/terms.html`. It is a flat sequence of `<h1>`, an
effective-date `<p><em>`, then `<h2>`/`<p>` pairs. Transcribe it into exactly
the structure of Step 2's `app/privacy/page.tsx`:

- `<h1>` text becomes `LegalLayout`'s `title` prop
- the `<em>` effective date becomes the `updated` prop
- each `<h2>` becomes `<h2>`, each `<p>` becomes `<p>`, in source order
- `metadata.title` is `'Terms of Use — Yumo'`
- escape apostrophes in JSX text as `&apos;`

Transcribe verbatim. These clauses are cited from the App Store listing; do
not reword, reorder, summarise or "improve" them.

- [ ] **Step 4: Create app/support/page.tsx**

Same procedure, reading `../Yumo/docs/legal/support.html`, with
`metadata.title` set to `'Support — Yumo'`. That file also contains `<strong>`
and `<ul>`/`<li>`; carry them across unchanged.

It has nine `<h2>` sections and all nine must survive: Contact, Adding the
widget, The widget isn't changing words, Pronunciation isn't playing,
Notifications aren't arriving, Restoring Yumo Pro, A word looks wrong, Your
data. Verify the count after transcribing — a dropped section is a support
email you have to answer by hand.

- [ ] **Step 5: Verify the routes build and render**

Run: `npm run build`
Expected: build output lists `/privacy`, `/terms` and `/support` as static routes.

Then `npm run dev` and open each. Confirm the nav and footer appear, the text matches the live GitHub Pages version, and the footer links between them work.

- [ ] **Step 6: Commit**

```bash
git add components/layout/LegalLayout.tsx app/privacy app/terms app/support
git commit -m "feat: branded privacy, terms and support routes"
```

---

### Task 12: Metadata, favicon and social card

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/opengraph-image.tsx`
- Create: `app/icon.png` (copied)
- Create: `public/robots.txt`

**Interfaces:**
- Consumes: `SITE_URL` from `lib/site.ts`.
- Produces: full document metadata, an OG image at `/opengraph-image`, a favicon.

- [ ] **Step 1: Copy the app icon as the favicon**

```bash
cp /d/Yumo/assets/images/icon.png /d/yumo-website/app/icon.png
```

Next.js App Router serves `app/icon.png` as the favicon automatically.

- [ ] **Step 2: Extend metadata in app/layout.tsx**

Replace the `metadata` export:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Yumo — Japanese on your Lock Screen',
  description:
    'A new JLPT word on your Lock Screen and Home Screen every few hours. 7,972 words, fully offline, no accounts, no tracking.',
  openGraph: {
    title: 'Yumo — Japanese on your Lock Screen',
    description:
      'A new JLPT word every few hours. 7,972 words, fully offline, no accounts.',
    url: SITE_URL,
    siteName: 'Yumo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yumo — Japanese on your Lock Screen',
    description: 'A new JLPT word every few hours. Fully offline, no accounts.',
  },
};
```

Add the import at the top: `import { SITE_URL } from '@/lib/site';`

- [ ] **Step 3: Create app/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Yumo — Japanese on your Lock Screen';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#FAF6EF',
          color: '#201C17',
          fontSize: 64,
          fontWeight: 600,
        }}
      >
        <div style={{ fontSize: 28, color: '#BE3F29', marginBottom: 24 }}>YUMO</div>
        <div style={{ lineHeight: 1.1 }}>Japanese on your Lock Screen</div>
        <div style={{ fontSize: 30, color: '#6E6354', marginTop: 28 }}>
          A new JLPT word every few hours · 7,972 words · fully offline
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 4: Create public/robots.txt**

```
User-agent: *
Allow: /
```

- [ ] **Step 5: Verify the build emits the OG image**

Run: `npm run build`
Expected: build succeeds and `out/opengraph-image.png` (or `out/opengraph-image/route`) is present.

`next/og` renders this at build time, which normally works under
`output: 'export'`. If the build instead errors with an edge-runtime or
dynamic-route complaint, do not fight it — delete `app/opengraph-image.tsx`
and ship a static card instead:

```bash
rm app/opengraph-image.tsx
node -e "
const sharp=require('sharp');
sharp({create:{width:1200,height:630,channels:3,background:'#FAF6EF'}})
  .composite([{input:'public/logo.png',gravity:'centre'}])
  .png().toFile('public/og.png').then(()=>console.log('wrote public/og.png'));
"
```

Then add `images: ['/og.png']` to both the `openGraph` and `twitter` blocks in
`app/layout.tsx`. The social card is worth one fallback, not an afternoon.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/opengraph-image.tsx app/icon.png public/robots.txt
git commit -m "feat: metadata, favicon, social card and robots"
```

---

### Task 13: Performance and accessibility verification

**Files:**
- Modify: whichever files the audit implicates.

**Interfaces:**
- Consumes: the whole site.
- Produces: a site meeting the spec's success criteria.

- [ ] **Step 1: Build and serve the production output**

```bash
cd /d/yumo-website
npm run build
npx serve out -l 4173
```

- [ ] **Step 2: Measure the payload**

In Chrome DevTools, Network tab, hard reload `http://localhost:4173`.

Record: total transferred bytes, and the largest single asset.
Expected: images total under 400 KB. If not, lower WebP quality in `scripts/optimise-assets.mjs` and rerun `npm run build:assets`.

- [ ] **Step 3: Run Lighthouse**

DevTools → Lighthouse → Mobile → Performance and Accessibility.
Expected: Performance ≥ 90, Accessibility ≥ 95, CLS ≈ 0.

Record any failing audit and fix it before continuing. The likely candidates are an unsized image (add `width`/`height`) and insufficient contrast on `text-muted` over `bg-surface` (darken `--muted` if flagged).

- [ ] **Step 4: Verify reduced motion**

Chrome DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`. Reload.
Expected: nothing animates, nothing drifts, every section is visible immediately.

- [ ] **Step 5: Verify without JavaScript**

DevTools → Settings → Debugger → Disable JavaScript. Reload.
Expected: every section renders with readable text. Animations do not run, which is fine; the drifting cards are `aria-hidden` decoration, and no content is inside a client-only branch.

- [ ] **Step 6: Verify keyboard navigation**

Tab through the page from the top.
Expected: a visible focus ring on every link and the FAQ summaries, in document order, with no trapped focus.

- [ ] **Step 7: Commit any fixes**

```bash
git add -A
git commit -m "perf: address Lighthouse and accessibility findings"
```

---

### Task 14: Deploy and redirect the legal pages

**Files:**
- Modify (in the `sofDji/yumo-legal` repo): `legal/privacy-policy.html`, `legal/terms.html`, `legal/support.html`

**Interfaces:**
- Consumes: the deployed site URL.
- Produces: live site; old URLs redirecting to it while still serving their text.

- [ ] **Step 1: Push and let Vercel deploy**

```bash
cd /d/yumo-website
git push origin main
```

Vercel project `yumo-website` is already linked and builds on push to `main`.

- [ ] **Step 2: Verify the deployment**

```bash
vercel ls --yes
```

Then open the production URL and confirm `/`, `/privacy`, `/terms` and `/support` all render.

- [ ] **Step 3: Add the redirect to each yumo-legal page**

For each of the three files, insert into `<head>`, immediately after `<meta name="viewport">`:

```html
<meta http-equiv="refresh" content="0; url=https://yumo-website.vercel.app/privacy">
<link rel="canonical" href="https://yumo-website.vercel.app/privacy">
```

Use `/terms` in `terms.html` and `/support` in `support.html`.

**Leave the existing body content in place.** If a review tool fetches the URL without executing the meta refresh, the full policy must still be readable. A privacy URL that returns an empty redirect stub is an App Store rejection risk that costs nothing to avoid.

Add a visible line at the top of each `<body>`:

```html
<p><em>This page has moved to <a href="https://yumo-website.vercel.app/privacy">yumo-website.vercel.app/privacy</a>. The full text remains below.</em></p>
```

- [ ] **Step 4: Push the redirects**

```bash
cd /tmp && git clone https://github.com/sofDji/yumo-legal.git && cd yumo-legal
# apply the three edits, then:
git add legal/
git commit -m "Redirect legal pages to the Yumo website, keeping full text inline"
git push origin main
```

- [ ] **Step 5: Verify the redirects resolve**

```bash
for u in privacy-policy terms support; do
  printf "%-20s -> " "$u"
  curl -sL -o /dev/null -w "%{http_code}\n" "https://sofdji.github.io/yumo-legal/legal/$u.html"
done
```

Expected: all three return 200. Open one in a browser and confirm it lands on the site.

- [ ] **Step 6: Confirm the App Store listing still validates**

The URLs in App Store Connect are unchanged and still resolve. No listing edit and no app rebuild are required. Confirm by opening the exact URL pasted into the listing and reaching the new page.

---

## Self-review notes

**Spec coverage.** Every spec section maps to a task: design system → 1; live word → 2; launch switch and motion → 3; asset pipeline → 4; primitives → 5; chrome → 6; hero → 7; sections → 8 and 9; landing composition → 10; legal routes → 11; metadata → 12; performance criteria → 13; deployment and redirects → 14.

**Known deviation.** `scripts/build-words.mjs` duplicates `selectWords` because a plain ESM script cannot import the TypeScript module. Both copies are pinned by tests — `select-words.test.ts` covers the TypeScript one, `words.test.ts` covers the generated output — so a drift between them fails `npm test`.

**Copy risk.** The pricing and browse copy is the only place where the site can contradict the binary. Task 9 marks both, and the global constraints name `src/lib/scheduler.ts` as the sole source of truth. An earlier design doc described Browse as fully free; the shipped code does not.
