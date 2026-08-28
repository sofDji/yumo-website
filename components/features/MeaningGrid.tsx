'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

// 赤い, from the app's dataset. All four glosses are shown at once — the claim
// is "four languages", and four languages arriving one at a time would be a
// worse picture of it than four sitting there together. What moves is only
// which one is lit.
//
// The dataset stores several senses per language ("rot; kommunistisch") and a
// part-of-speech note on the English; the head sense is what fits a card this
// size, which is the same display trim lib/select-words.ts already makes.
const GLOSSES = [
  { code: 'EN', gloss: 'red' },
  { code: 'FR', gloss: 'rouge' },
  { code: 'DE', gloss: 'rot' },
  { code: 'ES', gloss: 'rojo' },
];

const STEP = 1400;

export function MeaningGrid() {
  const reduced = useReducedMotion();
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setLit((n) => (n + 1) % GLOSSES.length), STEP);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
      <div className="shrink-0">
        <p className="font-jp text-[34px] font-medium leading-none">赤い</p>
        <p className="mt-2 font-jp text-[12px] text-muted">あかい · akai</p>
      </div>

      <ul className="grid flex-1 grid-cols-2 gap-x-6 gap-y-2.5">
        {GLOSSES.map((g, i) => {
          // Under reduced motion nothing travels, so nothing is dimmed either.
          const on = reduced || i === lit;
          return (
            <li key={g.code} className="flex items-baseline gap-2.5">
              <span
                className={`w-[22px] shrink-0 text-[10px] font-bold tracking-wider transition-colors duration-500 ${
                  on ? 'text-accent' : 'text-muted/45'
                }`}
              >
                {g.code}
              </span>
              <span
                className={`text-[15px] transition-colors duration-500 ${
                  on ? 'font-medium text-ink' : 'text-muted/55'
                }`}
              >
                {g.gloss}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
