import type { Locale } from '@/lib/i18n';
import type { SiteWord } from '@/lib/select-words';
import { LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';

export function WordCard({
  word,
  locale,
  size = 'lg',
}: {
  word: SiteWord;
  locale: Locale;
  size?: 'lg' | 'sm';
}) {
  const color = LEVEL_COLORS[word.level];
  const large = size === 'lg';

  return (
    <div
      className={`rounded-2xl border border-line bg-surface/70 md:backdrop-blur-md ${
        large ? 'px-8 py-7' : 'w-[172px] px-4 py-3.5'
      }`}
      style={{ boxShadow: `0 18px 40px -24px ${color}66, 0 2px 4px rgba(58,46,34,.06)` }}
    >
      <span
        className="mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider text-white"
        style={{ background: color }}
      >
        {LEVEL_LABELS[word.level]}
      </span>
      <p className={`font-jp font-medium leading-none ${large ? 'text-6xl' : 'text-[26px]'}`}>
        {word.kanji}
      </p>
      <p className={`font-jp text-muted ${large ? 'mt-3 text-lg' : 'mt-2 text-[11px]'}`}>
        {word.kana} · {word.romaji}
      </p>
      <p className={`font-medium ${large ? 'mt-2 text-[17px]' : 'mt-1.5 text-[12px] leading-snug'}`}>
        {word.meaning[locale]}
      </p>
    </div>
  );
}
