import { describe, expect, it } from 'vitest';
import { en } from '../i18n/en';
import { fr } from '../i18n/fr';
import { fill } from '../i18n';
import { BASIC_ROWS, KANA_COUNTS, kanaCounts, toKatakana } from '../kana';

describe('kana chart', () => {
  it('carries the app chart counts', () => {
    // The app's src/lib/kana.ts: 46 basic, 25 dakuten/handakuten, 33 combinations.
    expect(KANA_COUNTS).toEqual({ basic: 46, dakuten: 25, combo: 33 });
  });

  it('draws the whole basic chart, five columns wide', () => {
    expect(BASIC_ROWS.every((row) => row.length === 5)).toBe(true);
    expect(BASIC_ROWS.flat().filter(Boolean)).toHaveLength(KANA_COUNTS.basic);
    expect(BASIC_ROWS[0][0]).toEqual({ kana: 'あ', romaji: 'a' });
  });

  it('shifts hiragana to katakana', () => {
    expect(toKatakana('し')).toBe('シ');
    expect(toKatakana('を')).toBe('ヲ');
  });

  it('fills every count the Kana section quotes, in both locales', () => {
    for (const [locale, dict] of [
      ['en', en],
      ['fr', fr],
    ] as const) {
      const text = dict.kana.points.map((p) => fill(p.p, kanaCounts(locale))).join(' ');
      expect(text, `unfilled placeholder in ${locale}`).not.toMatch(/\{\w+\}/);
      expect(text).toContain('46');
      expect(text).toContain('25');
      expect(text).toContain('33');
    }
  });
});

describe('nav', () => {
  it('links the Kana section between Features and Levels', () => {
    for (const dict of [en, fr]) {
      expect(dict.nav.links.map((l) => l.href)).toEqual([
        '#how',
        '#features',
        '#kana',
        '#levels',
        '#pricing',
      ]);
    }
  });
});
