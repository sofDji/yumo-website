import type { SiteWord } from '@/lib/select-words';
import { LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';
import { PhoneFrame, StatusBar, Tile } from './PhoneFrame';

// Neighbouring tiles are deliberately abstract — imitating Apple's own app
// icons would be noisier and a trademark problem.
export function HomeScreen({ word }: { word: SiteWord }) {
  const color = LEVEL_COLORS[word.level];

  return (
    <PhoneFrame bloom={color}>
      <StatusBar />

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <div
          className="relative aspect-square w-[62%] rounded-[1.35rem] p-3.5 text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,.35)]"
          style={{ background: `linear-gradient(150deg, ${color}, ${color}CC)` }}
        >
          <span className="inline-block rounded-full bg-white/25 px-1.5 py-0.5 text-[8px] font-bold tracking-wide">
            {LEVEL_LABELS[word.level]}
          </span>
          <p className="mt-1.5 font-jp text-[26px] font-medium leading-none">{word.kanji}</p>
          <p className="mt-1 font-jp text-[10px] leading-tight text-white/85">{word.kana}</p>
          <p className="text-[9px] italic leading-tight text-white/75">{word.romaji}</p>
          <p className="mt-1 text-[9px] leading-snug text-white/95">{word.meaning}</p>
        </div>
        <p className="mb-4 mt-1 pl-1 text-[8px] font-medium text-ink/55">Yumo</p>

        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Tile key={i} i={i} className="aspect-square" />
          ))}
        </div>

        <div className="mt-auto">
          <div className="mx-auto mb-2 h-4 w-16 rounded-full bg-white/70" />
          <div className="flex items-center justify-center gap-2.5 rounded-[1.4rem] border border-white/85 bg-white/60 p-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Tile key={i} i={i + 1} className="h-8 w-8" />
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
