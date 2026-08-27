import type { SiteWord } from '@/lib/select-words';
import { LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';

// A drawn phone rather than a screenshot. A real capture drags in whatever
// wallpaper and third-party icons happened to be on the device, which fights
// the page and dates the image; this scales, stays on-palette, and can show
// any word. The surrounding tiles are deliberately abstract — imitating
// Apple's own app icons would be both noisier and a trademark problem.
function Tile({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-[22%] border border-white/50 bg-white/55 shadow-[0_1px_3px_rgba(58,46,34,.10)] ${className}`}
    />
  );
}

export function WidgetIllustration({ word }: { word: SiteWord }) {
  const color = LEVEL_COLORS[word.level];

  return (
    <div className="relative mx-auto w-full max-w-[286px]">
      {/* soft halo so the phone sits in light rather than on a hard edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-14%] rounded-full opacity-70 blur-[60px]"
        style={{ background: 'radial-gradient(closest-side, #FFFFFF, transparent)' }}
      />

      <div className="relative aspect-[9/17] w-full rounded-[2.6rem] border border-line bg-ground p-[7px] shadow-[0_2px_6px_rgba(58,46,34,.10),0_40px_70px_-40px_rgba(58,46,34,.45)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem]">
          {/* wallpaper, built from the site's own bloom colours */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(155deg, #F4F7F6 0%, #EFF2F7 38%, #F6F1F4 70%, #FAF6EF 100%)',
            }}
          />
          <div
            aria-hidden
            className="absolute -left-10 -top-8 h-40 w-40 rounded-full opacity-30 blur-[42px]"
            style={{ background: color }}
          />
          <div
            aria-hidden
            className="absolute -right-8 bottom-16 h-36 w-36 rounded-full opacity-20 blur-[44px]"
            style={{ background: '#8B5CF6' }}
          />

          <div className="relative flex h-full flex-col px-4 pb-4 pt-3">
            {/* status bar */}
            <div className="mb-4 flex items-center justify-between text-[10px] font-semibold text-ink/70">
              <span>9:41</span>
              <span aria-hidden className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-ink/45" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink/45" />
                <span className="h-2 w-4 rounded-[3px] border border-ink/40" />
              </span>
            </div>

            {/* the Yumo widget — a 2x2 tile, and the only thing in colour */}
            <div
              className="relative mb-2 aspect-square w-[62%] rounded-[1.35rem] p-3.5 text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,.35)]"
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
            <p className="mb-4 pl-1 text-[8px] font-medium text-ink/55">Yumo</p>

            {/* abstract neighbours */}
            <div className="grid grid-cols-4 gap-2.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <Tile key={i} className="aspect-square" />
              ))}
            </div>

            <div className="mt-auto">
              <div className="mx-auto mb-2 h-4 w-16 rounded-full bg-white/50" />
              <div className="flex items-center justify-center gap-2.5 rounded-[1.4rem] border border-white/50 bg-white/45 p-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Tile key={i} className="h-8 w-8" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
