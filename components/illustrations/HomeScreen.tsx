import type { Locale } from '@/lib/i18n';
import type { SiteWord } from '@/lib/select-words';
import { LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';
import { Panel, Stage } from './Stage';

// The widget on its own, in its two sizes, floating in space.
export function HomeScreen({ word, locale }: { word: SiteWord; locale: Locale }) {
  const color = LEVEL_COLORS[word.level];

  return (
    <Stage glow={color}>
      <Panel plain x={9} y={9} w={52} tilt="rotateY(18deg) rotateX(7deg) rotateZ(-3deg)">
        <div
          className="stage-widget aspect-square rounded-[7cqw] p-[5cqw] text-white"
          style={{ background: `linear-gradient(150deg, ${color}, ${color}B0)` }}
        >
          <span className="inline-block rounded-full bg-white/25 px-[2cqw] py-[0.6cqw] text-[2.8cqw] font-bold">
            {LEVEL_LABELS[word.level]}
          </span>
          <p lang="ja" className="mt-[3cqw] font-jp text-[13cqw] font-medium leading-none">
            {word.kanji}
          </p>
          <p className="mt-[2.4cqw] font-jp text-[3.8cqw] leading-tight text-white/90">{word.kana}</p>
          <p className="text-[3.3cqw] italic leading-tight text-white/80">{word.romaji}</p>
          <p className="mt-[1.6cqw] text-[4cqw] font-medium leading-snug">{word.meaning[locale]}</p>
        </div>
      </Panel>

      <Panel
        x={32}
        y={60}
        w={62}
        z={2}
        delay={1}
        tilt="rotateY(-14deg) rotateX(5deg) rotateZ(2deg)"
        className="flex items-center gap-[4cqw] rounded-[6cqw] p-[5cqw]"
      >
        <p lang="ja" className="font-jp text-[11cqw] font-medium leading-none">
          {word.kanji}
        </p>
        <div className="min-w-0">
          <span className="inline-block rounded-full px-[2cqw] py-[0.5cqw] text-[2.6cqw] font-bold" style={{ background: color }}>
            {LEVEL_LABELS[word.level]}
          </span>
          <p className="mt-[1.2cqw] truncate font-jp text-[3.4cqw] text-white/70">
            {word.kana} · {word.romaji}
          </p>
          <p className="truncate text-[4cqw] font-medium">{word.meaning[locale]}</p>
        </div>
      </Panel>
    </Stage>
  );
}
