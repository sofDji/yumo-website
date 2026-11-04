import type { Locale } from '@/lib/i18n';
import type { SiteWord } from '@/lib/select-words';
import { LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';
import { PhoneFrame, StatusBar, Tile } from './PhoneFrame';

// Neighbouring tiles are deliberately abstract — imitating Apple's own app
// icons would be noisier and a trademark problem.
export function HomeScreen({ word, locale }: { word: SiteWord; locale: Locale }) {
  const color = LEVEL_COLORS[word.level];

  return (
    <PhoneFrame bloom={color} wallpaper={`/hero/${word.level}.jpg`}>
      <StatusBar />

      <div className="flex flex-1 flex-col px-4 pb-5 pt-6">
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
          <p className="mt-1 text-[9px] leading-snug text-white/95">{word.meaning[locale]}</p>
        </div>
        <p className="mb-3 mt-1 pl-1 text-[9px] font-medium text-white/90">Yumo</p>

        <div className="grid grid-cols-4 gap-3.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <Tile key={i} i={i} className="aspect-square" />
          ))}
        </div>

        <div className="mt-auto">
          <div className="mx-auto mb-2.5 flex h-5 w-16 items-center justify-center gap-1 rounded-full bg-black/25 backdrop-blur-md">
            <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4" />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-2.5 rounded-[1.5rem] bg-white/15 p-2.5 backdrop-blur-md">
            {Array.from({ length: 4 }).map((_, i) => (
              <Tile key={i} i={[3, 6, 8, 1][i]} className="h-10 w-10" />
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
