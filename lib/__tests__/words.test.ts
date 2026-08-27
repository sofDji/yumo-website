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

  it('obeys the display constraints the selector promises, in every locale', () => {
    for (const w of WORDS) {
      expect(w.kanji.length).toBeLessThanOrEqual(3);
      expect(w.kanji).not.toBe(w.kana);
      for (const locale of ['en', 'fr'] as const) {
        expect(w.meaning[locale].length).toBeLessThan(40);
        expect(w.meaning[locale]).not.toContain(';');
      }
    }
  });

  it('has every field populated, including both meanings', () => {
    for (const w of WORDS) {
      expect(w.kanji).toBeTruthy();
      expect(w.kana).toBeTruthy();
      expect(w.romaji).toBeTruthy();
      expect(w.meaning.en).toBeTruthy();
      expect(w.meaning.fr).toBeTruthy();
    }
  });

  // A French card showing the English gloss is the failure this bilingual
  // pipeline exists to prevent. A handful of entries legitimately match —
  // religion, digestion, oral are cognates — so the check is a threshold
  // rather than zero. A wholesale copy of en into fr would sit near 100%.
  it('does not reuse the English glosses as the French ones', () => {
    const identical = WORDS.filter((w) => w.meaning.en === w.meaning.fr);
    expect(identical.length / WORDS.length).toBeLessThan(0.1);
  });

  it('keeps words unsuitable for a marketing page out of the display pool', () => {
    expect(WORDS.map((w) => w.kanji)).not.toContain('自殺');
  });
});
