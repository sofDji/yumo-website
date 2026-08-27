import type { SiteWord } from '@/lib/select-words';
import { LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';

export function WordCard({ word, size = 'lg' }: { word: SiteWord; size?: 'lg' | 'sm' }) {
  const color = LEVEL_COLORS[word.level];
  const large = size === 'lg';

  return (
    <div
      className={`rounded-2xl border border-line bg-surface/70 md:backdrop-blur-md ${
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
