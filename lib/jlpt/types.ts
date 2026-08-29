// Shared by the generated per-level tables in this directory.

/** The gojūon row a word files under, precomputed so pages need no kana logic. */
export type KanaRow = 'あ' | 'か' | 'さ' | 'た' | 'な' | 'は' | 'ま' | 'や' | 'ら' | 'わ';

export const KANA_ROWS: KanaRow[] = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'];

/** How each row is read aloud, for the anchor labels beside the kana. */
export const ROW_ROMAJI: Record<KanaRow, string> = {
  あ: 'a', か: 'ka', さ: 'sa', た: 'ta', な: 'na',
  は: 'ha', ま: 'ma', や: 'ya', ら: 'ra', わ: 'wa',
};

export interface JlptWord {
  kanji: string;
  kana: string;
  romaji: string;
  /** English gloss, at most two senses. See build-jlpt.mjs. */
  en: string;
  row: KanaRow;
}

/** Groups a level into gojūon rows, dropping rows the level has no words for. */
export function byRow(words: JlptWord[]): { row: KanaRow; words: JlptWord[] }[] {
  return KANA_ROWS.map((row) => ({ row, words: words.filter((w) => w.row === row) })).filter(
    (group) => group.words.length > 0,
  );
}
