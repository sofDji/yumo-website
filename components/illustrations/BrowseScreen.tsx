import type { SiteWord } from '@/lib/select-words';
import { LEVELS, LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';
import { PhoneFrame, StatusBar } from './PhoneFrame';

// Mirrors the app's Browse tab: search field, level filter, result rows, and
// the floating nav pill. Rows come from the real dataset, so the readings and
// meanings shown are the ones the app would actually return.
export function BrowseScreen({ words }: { words: SiteWord[] }) {
  return (
    <PhoneFrame bloom="#3B82F6">
      <StatusBar time="9:41" />

      <div className="flex flex-1 flex-col overflow-hidden px-3 pb-3 pt-2">
        <p className="mb-2 text-center text-[10px] font-semibold">Browse</p>

        <div className="rounded-[0.7rem] border border-line bg-white/80 px-2.5 py-1.5 text-[8.5px] text-muted">
          Search kanji, kana, romaji, meaning…
        </div>

        <div className="mt-2 flex gap-1">
          <span className="rounded-full bg-ink px-2 py-0.5 text-[7.5px] font-semibold text-ground">
            All
          </span>
          {LEVELS.map((l) => (
            <span
              key={l}
              className="rounded-full border px-1.5 py-0.5 text-[7.5px] font-semibold"
              style={{ borderColor: `${LEVEL_COLORS[l]}80`, color: LEVEL_COLORS[l] }}
            >
              {LEVEL_LABELS[l]}
            </span>
          ))}
        </div>

        <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
          {words.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between rounded-[0.65rem] border border-line bg-white/85 px-2.5 py-1.5"
            >
              <span className="min-w-0">
                <span className="block font-jp text-[12px] font-medium leading-tight">
                  {w.kanji}
                </span>
                <span className="block truncate text-[7.5px] leading-tight text-muted">
                  {w.kana} · {w.romaji} — {w.meaning}
                </span>
              </span>
              <span
                className="ml-2 shrink-0 rounded-full px-1.5 py-0.5 text-[7px] font-bold text-white"
                style={{ background: LEVEL_COLORS[w.level] }}
              >
                {LEVEL_LABELS[w.level]}
              </span>
            </div>
          ))}
        </div>

        {/* the app's floating nav pill */}
        <div className="mt-2 flex items-center justify-around rounded-full border border-line bg-white/75 px-3 py-2">
          <span aria-hidden className="h-4 w-4 rounded-full bg-accent" />
          <span aria-hidden className="h-3 w-3 rounded-full border-2 border-ink/35" />
          <span aria-hidden className="h-3 w-3 rounded-[3px] bg-ink/25" />
          <span aria-hidden className="h-3 w-3 rounded-full border-2 border-ink/35" />
        </div>
      </div>
    </PhoneFrame>
  );
}
