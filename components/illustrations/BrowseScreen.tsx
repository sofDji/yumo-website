import type { SiteWord } from '@/lib/select-words';
import { LEVELS, LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';
import { PhoneFrame, StatusBar } from './PhoneFrame';

// Mirrors the app's Browse tab: search field, level filter, result rows and
// the floating nav pill. Rows come from the real dataset, so the readings and
// meanings shown are the ones the app would actually return.
//
// Deliberately few rows. The point is only "you can look words up" — a dense
// list at this scale becomes texture nobody reads, and the type has to shrink
// to fit it.
export function BrowseScreen({ words }: { words: SiteWord[] }) {
  return (
    <PhoneFrame bloom="#3B82F6">
      <StatusBar time="9:41" />

      <div className="flex flex-1 flex-col overflow-hidden px-4 pb-6 pt-3">
        <p className="mb-3 text-center text-[12px] font-semibold">Browse</p>

        <div className="rounded-[0.8rem] border border-line bg-white/90 px-3 py-2 text-[10px] text-muted">
          Search kanji, kana, romaji, meaning…
        </div>

        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded-full bg-ink px-2.5 py-1 text-[9px] font-semibold text-ground">
            All
          </span>
          {LEVELS.map((l) => (
            <span
              key={l}
              className="rounded-full border px-2 py-1 text-[9px] font-semibold"
              style={{ borderColor: `${LEVEL_COLORS[l]}80`, color: LEVEL_COLORS[l] }}
            >
              {LEVEL_LABELS[l]}
            </span>
          ))}
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
          {words.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between rounded-[0.8rem] border border-line bg-white/90 px-3 py-2.5"
            >
              <span className="min-w-0">
                <span className="block font-jp text-[17px] font-medium leading-tight">
                  {w.kanji}
                </span>
                <span className="block truncate text-[9.5px] leading-tight text-muted">
                  {w.kana} · {w.romaji}
                </span>
                <span className="block truncate text-[9.5px] leading-tight">{w.meaning}</span>
              </span>
              <span
                className="ml-2 shrink-0 rounded-full px-2 py-0.5 text-[8.5px] font-bold text-white"
                style={{ background: LEVEL_COLORS[w.level] }}
              >
                {LEVEL_LABELS[w.level]}
              </span>
            </div>
          ))}
        </div>

        {/* the app's floating nav pill */}
        <div className="mt-3 flex items-center justify-around rounded-full border border-line bg-white/85 px-4 py-2.5">
          <span aria-hidden className="h-4 w-4 rounded-full bg-accent" />
          <span aria-hidden className="h-3.5 w-3.5 rounded-full border-2 border-ink/35" />
          <span aria-hidden className="h-3.5 w-3.5 rounded-[3px] bg-ink/25" />
          <span aria-hidden className="h-3.5 w-3.5 rounded-full border-2 border-ink/35" />
        </div>
      </div>
    </PhoneFrame>
  );
}
