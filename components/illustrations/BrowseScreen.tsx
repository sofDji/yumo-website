import type { Dictionary, Locale } from '@/lib/i18n';
import type { SiteWord } from '@/lib/select-words';
import { LEVELS, LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';
import { Panel, Stage } from './Stage';

// The dictionary as a search bar with its results falling away into the space,
// nearest first. The rows come from the real dataset.
export function BrowseScreen({
  words,
  locale,
  t,
}: {
  words: SiteWord[];
  locale: Locale;
  t: Dictionary['browse'];
}) {
  return (
    <Stage glow="#3B82F6">
      <Panel x={6} y={5} w={88} z={6} tilt="rotateX(6deg)" className="flex items-center gap-[2.4cqw] rounded-[5cqw] px-[4.5cqw] py-[3.6cqw]">
        <svg viewBox="0 0 24 24" className="h-[4.6cqw] w-[4.6cqw] shrink-0" fill="none" stroke="#E9ECA5" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4" />
        </svg>
        <span className="truncate text-[3.6cqw] text-white/70">{t.searchPlaceholder}</span>
      </Panel>

      <Panel plain x={6} y={19} w={88} z={6} delay={0.6} className="flex flex-wrap gap-[1.4cqw]">
        <span className="rounded-full bg-white px-[3cqw] py-[1.2cqw] text-[3cqw] font-semibold text-[#111]">{t.all}</span>
        {LEVELS.map((l) => (
          <span
            key={l}
            className="rounded-full border px-[2.6cqw] py-[1.2cqw] text-[3cqw] font-semibold"
            style={{ borderColor: `${LEVEL_COLORS[l]}90`, color: LEVEL_COLORS[l] }}
          >
            {LEVEL_LABELS[l]}
          </span>
        ))}
      </Panel>

      {words.slice(0, 4).map((w, i) => (
        <Panel
          key={w.id}
          x={6 + i * 2}
          y={29 + i * 18.5}
          w={88 - i * 3}
          z={5 + i}
          delay={0.3 * i}
          tilt={`rotateX(8deg) rotateY(${i % 2 ? 6 : -6}deg) translateZ(${-i * 2}cqw)`}
          className="flex items-center justify-between rounded-[4.5cqw] px-[4.5cqw] py-[2.2cqw]"
        >
          <span className="min-w-0" style={{ opacity: 1 - i * 0.14 }}>
            <span lang="ja" className="block font-jp text-[5.6cqw] font-medium leading-tight">
              {w.kanji}
            </span>
            <span className="block truncate text-[3.2cqw] leading-tight text-white/65">
              {w.kana} · {w.romaji}
            </span>
            <span className="block truncate text-[3.4cqw] leading-tight">{w.meaning[locale]}</span>
          </span>
          <span className="ml-[2cqw] shrink-0 rounded-full px-[2.6cqw] py-[0.9cqw] text-[3cqw] font-bold text-white" style={{ background: LEVEL_COLORS[w.level] }}>
            {LEVEL_LABELS[w.level]}
          </span>
        </Panel>
      ))}
    </Stage>
  );
}
