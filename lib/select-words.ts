import { LEVELS, type Level } from './tokens';

export type Locale = 'en' | 'fr';

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
  /** Only the locales the site renders. The dataset carries de and es too. */
  meaning: Record<Locale, string>;
  level: Level;
}

// The site shows words at display size on small cards. Long compounds and the
// dataset's multi-clause glosses are unreadable there, so both are filtered
// out rather than truncated — a clipped meaning looks like a bug.
// Words the app should absolutely still teach — they are real JLPT
// vocabulary — but which should never land on a marketing page, where a
// visitor meets them with no context and no reason to expect them. This is a
// display concern, not a dataset one: nothing is removed from the app.
const NOT_FOR_DISPLAY = new Set(['自殺']);

const usable = (gloss: string | undefined) =>
  !!gloss && gloss.length > 0 && gloss.length < 40 && !gloss.includes(';');

export function selectWords(raw: RawWord[], perLevel: number): SiteWord[] {
  const out: SiteWord[] = [];

  for (const level of LEVELS) {
    const picked = raw
      .filter((w) => w.level === level)
      .filter((w) => w.kanji.length >= 1 && w.kanji.length <= 3)
      // Both rendered locales must be usable, or the French cards would fall
      // back to English under a French headline.
      .filter((w) => usable(w.meaning?.en) && usable(w.meaning?.fr))
      // Require a real kanji form. Where kanji === kana the dataset is storing
      // a kana-only word, and a card reading ああ over ああ looks broken.
      .filter((w) => w.kanji !== w.kana)
      // ～区, ～化 and friends are suffix stubs, not words.
      .filter((w) => !w.kanji.includes('～') && !w.kanji.includes('〜'))
      .filter((w) => !NOT_FOR_DISPLAY.has(w.kanji))
      .slice(0, perLevel)
      .map((w) => ({
        id: w.id,
        kanji: w.kanji,
        kana: w.kana,
        romaji: w.romaji,
        meaning: { en: w.meaning.en, fr: w.meaning.fr },
        level: w.level,
      }));

    out.push(...picked);
  }

  return out;
}

// One display word per level, for the places that want to put a face on a
// level rather than list it: the Browse illustration's rows and the levels
// ladder. Short meanings only — at the size these render, a multi-clause gloss
// forces the type down until it is texture, and both rendered locales have to
// fit or a French page shows an English-sized gap.
export function sampleByLevel(words: SiteWord[], maxMeaning: number): Record<Level, SiteWord> {
  const out = {} as Record<Level, SiteWord>;

  for (const level of LEVELS) {
    const ofLevel = words.filter((w) => w.level === level);
    out[level] =
      ofLevel.find(
        (w) => w.meaning.en.length <= maxMeaning && w.meaning.fr.length <= maxMeaning,
      ) ?? ofLevel[0];
  }

  return out;
}
