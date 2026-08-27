import type { SiteWord } from '@/lib/select-words';
import { LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';
import { PhoneFrame, StatusBar } from './PhoneFrame';

// The accessoryRectangular widget, which is the placement the app's own store
// name leads with. Rendered flat and translucent the way iOS renders Lock
// Screen accessories, rather than as a full-colour tile like the home screen.
export function LockScreen({ word }: { word: SiteWord }) {
  const color = LEVEL_COLORS[word.level];

  return (
    <PhoneFrame bloom={color} tone="dusk">
      <StatusBar time="9:41" />

      <div className="flex flex-1 flex-col items-center px-5 pb-5 pt-8">
        <p className="text-[11px] font-medium text-ink/60">Sunday, 9 February</p>
        <p className="mt-0.5 text-[54px] font-semibold leading-none tracking-tight text-ink/85">
          9:41
        </p>

        {/* the rectangular accessory */}
        <div className="mt-5 w-full rounded-[0.9rem] border border-white/60 bg-white/55 px-3 py-2.5 shadow-[0_4px_14px_-8px_rgba(58,46,34,.4)]">
          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-1.5 py-0.5 text-[8px] font-bold text-white"
              style={{ background: color }}
            >
              {LEVEL_LABELS[word.level]}
            </span>
            <span className="font-jp text-[17px] font-medium leading-none">{word.kanji}</span>
          </div>
          <p className="mt-1.5 font-jp text-[10px] leading-tight text-muted">
            {word.kana} · {word.romaji}
          </p>
          <p className="text-[10px] font-medium leading-snug">{word.meaning}</p>
        </div>

        <div className="mt-auto flex w-full items-center justify-between">
          <span aria-hidden className="h-9 w-9 rounded-full border border-white/60 bg-white/45" />
          <span aria-hidden className="h-9 w-9 rounded-full border border-white/60 bg-white/45" />
        </div>
        <div className="mt-4 h-1 w-24 rounded-full bg-ink/25" />
      </div>
    </PhoneFrame>
  );
}
