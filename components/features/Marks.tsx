import type { CSSProperties } from 'react';
import { LEVELS, LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';

// The five quieter features. None of these runs on its own: each sits still
// until its card is hovered, then answers once. Three cards in this section
// already loop, and eight looping cards would be a fairground rather than a
// feature list.
//
// All of it is CSS on `.group`, so these stay server components and ship no
// JavaScript. Under prefers-reduced-motion globals.css flattens the
// durations, which leaves the hover as an instant state change.

const BARS = [9, 17, 27, 34, 27, 17, 9];

export function AudioMark() {
  return (
    <div aria-hidden className="flex h-9 items-center gap-[3px]">
      {BARS.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-ink/20 transition-[transform,background-color] duration-300 ease-out group-hover:scale-y-[1.35] group-hover:bg-accent/70"
          style={{ height: h, transitionDelay: `${i * 45}ms` }}
        />
      ))}
    </div>
  );
}

export function FavouriteMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-9 w-9">
      <path
        d="M6.5 3h11a1 1 0 0 1 1 1v17.2l-6.5-3.9-6.5 3.9V4a1 1 0 0 1 1-1Z"
        className="fill-transparent stroke-ink/30 transition-colors duration-300 group-hover:fill-accent group-hover:stroke-accent"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The widget's rhythm, as a schedule you can see: notches, and the word
// travelling to the next one. Deliberately unlabelled — the intervals differ
// between the free tier and Pro, and Pricing is where that belongs.
const NOTCHES = [0, 33.3, 66.6, 100];

export function ScheduleMark() {
  return (
    <div aria-hidden className="relative h-9 w-full max-w-[220px]">
      <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line" />
      {NOTCHES.map((p) => (
        <span
          key={p}
          className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-line"
          style={{ left: `${p}%` }}
        />
      ))}
      <span className="absolute left-0 top-1/2 h-px w-0 -translate-y-1/2 bg-accent/50 transition-[width] duration-700 ease-out group-hover:w-full" />
      <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-[left] duration-700 ease-out group-hover:left-full" />
    </div>
  );
}

// The app's Browse tab in miniature: a query part-typed, and the level filter
// under it. あか is the reading of the word the meanings card is holding.
export function BrowseMark() {
  return (
    <div aria-hidden className="w-full max-w-[300px]">
      <div className="flex items-center rounded-full border border-line bg-ground/50 px-3.5 py-2 font-jp text-[12px] text-muted">
        あか
        <span className="ml-px h-[13px] w-px animate-pulse bg-accent" />
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        {LEVELS.map((l, i) => (
          <span
            key={l}
            className="rounded-full border px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 group-hover:border-[var(--c)] group-hover:bg-[var(--c)] group-hover:text-white"
            style={
              {
                '--c': LEVEL_COLORS[l],
                borderColor: `${LEVEL_COLORS[l]}55`,
                color: LEVEL_COLORS[l],
                transitionDelay: `${i * 55}ms`,
              } as CSSProperties
            }
          >
            {LEVEL_LABELS[l]}
          </span>
        ))}
      </div>
    </div>
  );
}

// Aeroplane mode, at rest. An earlier version sat at four bars of signal and
// dropped them on hover, which meant a card titled "Completely offline" spent
// its whole life saying "connected" to anyone who never hovered it.
export function OfflineMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-9 w-9 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-6"
    >
      <path
        d="M10.5 2.6a1.5 1.5 0 0 1 3 0V9l8 4.5v2.2l-8-2.3v4.3l2.6 2v1.7L12 20.3l-4.1 1.1v-1.7l2.6-2v-4.3l-8 2.3v-2.2L10.5 9V2.6Z"
        className="fill-ink/25 transition-colors duration-300 group-hover:fill-accent/70"
      />
    </svg>
  );
}
