// The kana chart the Kana section draws. Mirrors the app's src/lib/kana.ts:
// written once in hiragana, with katakana as the same chart shifted by code
// point, so the two scripts on the page cannot disagree.
import type { Locale } from './i18n/locales';

export interface KanaCell {
  kana: string;
  romaji: string;
}

// 'あ:a' pairs, '-' for the empty slots that keep the a-i-u-e-o columns aligned.
function row(spec: string): (KanaCell | null)[] {
  return spec.split(' ').map((pair) => {
    if (pair === '-') return null;
    const [kana, romaji] = pair.split(':');
    return { kana, romaji };
  });
}

export const BASIC_ROWS: (KanaCell | null)[][] = [
  row('あ:a い:i う:u え:e お:o'),
  row('か:ka き:ki く:ku け:ke こ:ko'),
  row('さ:sa し:shi す:su せ:se そ:so'),
  row('た:ta ち:chi つ:tsu て:te と:to'),
  row('な:na に:ni ぬ:nu ね:ne の:no'),
  row('は:ha ひ:hi ふ:fu へ:he ほ:ho'),
  row('ま:ma み:mi む:mu め:me も:mo'),
  row('や:ya - ゆ:yu - よ:yo'),
  row('ら:ra り:ri る:ru れ:re ろ:ro'),
  row('わ:wa - - - を:wo'),
  row('ん:n - - - -'),
];

// The app's three sections. Only the basic chart is drawn; the other two are
// quoted in the copy.
export const KANA_COUNTS = { basic: 46, dakuten: 25, combo: 33 } as const;

export function kanaCounts(locale: Locale): Record<keyof typeof KANA_COUNTS, string> {
  const nf = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US');
  return {
    basic: nf.format(KANA_COUNTS.basic),
    dakuten: nf.format(KANA_COUNTS.dakuten),
    combo: nf.format(KANA_COUNTS.combo),
  };
}

export function toKatakana(text: string): string {
  let out = '';
  for (const ch of text) {
    const c = ch.codePointAt(0)!;
    out += c >= 0x3041 && c <= 0x3096 ? String.fromCodePoint(c + 0x60) : ch;
  }
  return out;
}
