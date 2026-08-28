'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Reveal } from '@/components/layout/Reveal';
import type { Dictionary, Locale } from '@/lib/i18n';
import { RhythmDial } from './RhythmDial';
import { WidgetDrop } from './WidgetDrop';
import { WordArrives } from './WordArrives';

// How long each step holds the thread before it moves on. Long enough to read
// the step's two lines, which is the point of stopping there at all.
const DWELL = 3200;

// Bound by position, not by an id: there are exactly three steps, and their
// order is printed on the page as 01/02/03, so a step cannot be reordered
// without renumbering it. `how.test.ts` pins the count.
function demo(i: number, active: boolean, locale: Locale) {
  if (i === 0) return <WidgetDrop active={active} />;
  if (i === 1) return <RhythmDial active={active} locale={locale} />;
  return <WordArrives active={active} locale={locale} />;
}

export function Steps({
  steps,
  locale,
}: {
  steps: Dictionary['how']['steps'];
  locale: Locale;
}) {
  const reduced = useReducedMotion();
  const [live, setLive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setLive((s) => (s + 1) % steps.length), DWELL);
    return () => clearInterval(id);
  }, [reduced, steps.length]);

  return (
    <>
      {/* The thread. Each cell draws the segment running from its own numeral
          to the next one — one column wide plus the grid's gap — so the rail
          stays registered to the cards with no hard-coded widths. Below md the
          cards stack and the numerals go back inside them. */}
      <div className="mb-7 hidden grid-cols-3 gap-6 md:grid" aria-hidden>
        {steps.map((s, i) => (
          <div key={s.n} className="relative flex items-center justify-center">
            {i < steps.length - 1 && (
              <>
                <span className="absolute left-1/2 top-1/2 h-px w-[calc(100%+1.5rem)] -translate-y-1/2 bg-line" />
                <span
                  className="absolute left-1/2 top-1/2 h-px -translate-y-1/2 bg-accent/45 transition-[width] duration-700 ease-out"
                  style={{ width: reduced || i < live ? 'calc(100% + 1.5rem)' : 0 }}
                />
              </>
            )}
            <span
              className={`relative z-10 bg-ground px-4 font-serif text-2xl italic transition-colors duration-500 ${
                reduced || i === live ? 'text-accent' : 'text-ink/25'
              }`}
            >
              {s.n}
            </span>
          </div>
        ))}
      </div>

      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => {
          const active = reduced || i === live;

          return (
            <li key={s.n} className="h-full">
              <Reveal delay={i * 0.08} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-2xl bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${
                    // The live card takes the same treatment hover gives, so
                    // the thread is followed by the eye rather than announced.
                    !reduced && i === live
                      ? 'border border-accent/30 shadow-lift'
                      : 'border border-line shadow-soft'
                  }`}
                >
                  <span
                    className={`font-serif text-2xl italic transition-colors duration-500 md:hidden ${
                      active ? 'text-accent' : 'text-ink/25'
                    }`}
                  >
                    {s.n}
                  </span>

                  <div className="mb-6 mt-4 flex h-[112px] items-center md:mt-0">
                    {demo(i, active, locale)}
                  </div>

                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </>
  );
}
