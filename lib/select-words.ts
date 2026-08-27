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
      // Require a real kanji form. Where kanji === kana the dataset is storing
      // a kana-only word, and a card reading ああ over ああ looks broken.
      .filter((w) => w.kanji !== w.kana)
      // ～区, ～化 and friends are suffix stubs, not words.
      .filter((w) => !w.kanji.includes('～') && !w.kanji.includes('〜'))
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
