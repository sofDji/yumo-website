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
      expect(w.kanji).not.toBe(w.kana);
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
