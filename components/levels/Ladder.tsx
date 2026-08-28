'use client';

import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/layout/Reveal';
import type { Dictionary, Locale } from '@/lib/i18n';
import { sampleByLevel } from '@/lib/select-words';
import { LEVELS, LEVEL_COLORS, LEVEL_LABELS, WORD_COUNTS, type Level } from '@/lib/tokens';
import { WORDS } from '@/lib/words';

// How long the climb rests on a rung. Long enough to read the blurb and take
// in the word, which is the only reason to stop there.
const DWELL = 2600;

// Bars are scaled against the largest level, not against the 7,972 total: as a
// share of the whole, every bar would sit between 8% and 34% and the reader
// would be comparing five short stubs.
const MAX = Math.max(...LEVELS.map((l) => WORD_COUNTS[l]));

const SAMPLES = sampleByLevel(WORDS, 22);

export function Ladder({
  t,
  counts,
  locale,
}: {
  t: Dictionary['levels'];
  /** "2,139 words", already formatted for the locale by the section. */
  counts: Record<Level, string>;
  locale: Locale;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLUListElement>(null);
  // The bars draw once, when the ladder arrives. Redrawing them on every turn
  // of the climb would make five measurements flicker to say one thing.
  const drawn = useInView(ref, { margin: '-80px', once: true }) || reduced;
  const [live, setLive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setLive((i) => (i + 1) % LEVELS.length), DWELL);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <ul ref={ref} className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
      {LEVELS.map((level, i) => {
        const on = !reduced && i === live;
        const color = LEVEL_COLORS[level];
        const count = WORD_COUNTS[level];
        const word = SAMPLES[level];

        return (
          <li key={level}>
            <Reveal delay={i * 0.05}>
              <div
                className={`group flex items-center gap-4 px-5 py-5 transition-colors duration-500 sm:gap-5 sm:px-6 ${
                  i < LEVELS.length - 1 ? 'border-b border-line' : ''
                }`}
                style={{ background: on ? `${color}12` : undefined }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white transition-shadow duration-500"
                  style={{
                    background: color,
                    boxShadow: on ? `0 0 0 4px ${color}26` : undefined,
                  }}
                >
                  {LEVEL_LABELS[level]}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium">{t.blurbs[level]}</p>

                  <div className="mt-3 flex items-center gap-4">
                    {/* The measurement. Thin mark, square where it starts and
                        rounded where it ends. The track is the same width on
                        every row — the count sits in a fixed column so a
                        four-digit level cannot shorten its own bar — so the
                        lengths are the comparison. */}
                    <div className="h-1.5 min-w-0 flex-1">
                      <span
                        className="block h-full rounded-r-[4px] transition-[width] duration-1000 ease-out"
                        style={{
                          width: drawn ? `${(count / MAX) * 100}%` : 0,
                          background: color,
                          transitionDelay: `${i * 90}ms`,
                        }}
                      />
                    </div>

                    {/* A real word from the level, so "the bridge level" has
                        something in it. Held for the rung the climb is on, and
                        for whichever row the reader points at. The slot is
                        always here, so nothing shifts when it appears — and it
                        sits inside the row rather than at its edge, so the
                        counts stay flush right whether or not a word is up. */}
                    <p
                      className={`hidden w-[152px] shrink-0 truncate text-right text-[12px] transition-opacity duration-500 md:block ${
                        on ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <span className="font-jp font-medium">{word.kanji}</span>{' '}
                      <span className="text-muted">{word.meaning[locale]}</span>
                    </p>

                    <p className="w-[92px] shrink-0 text-right text-sm tabular-nums text-muted">
                      {counts[level]}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
