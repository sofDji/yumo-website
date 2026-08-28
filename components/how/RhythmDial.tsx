'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EASE } from '@/lib/motion';
import type { Locale } from '@/lib/i18n';
import { LEVEL_COLORS } from '@/lib/tokens';
import { WORDS } from '@/lib/words';

// Step 02. The free tier's three intervals, and the rhythm doing what a rhythm
// does: every time the choice moves, the word behind it has changed. Pro's
// 1/2/3/4 hours are named in the step's own copy — showing seven pills here
// would be a settings screen, not a picture of the idea.
const INTERVALS = ['6h', '12h', '24h'];

// Chosen for length: at this size a three-kanji compound or a clause-long
// gloss turns the chip into texture. Falls back to the first N5 entries if the
// dataset is ever regenerated without them.
const PICKS = ['明日', '雨', '犬']
  .map((kanji) => WORDS.find((w) => w.kanji === kanji))
  .filter((w): w is (typeof WORDS)[number] => !!w);
const WORDS_SHOWN = PICKS.length === 3 ? PICKS : WORDS.filter((w) => w.level === 'n5').slice(0, 3);

// Deliberately not a divisor of the thread's 3.2s dwell: at 900ms the dial
// ticked a whole number of times per turn and settled back where it started,
// so the step looked frozen every time you came back to it.
const STEP = 780;

export function RhythmDial({ active, locale }: { active: boolean; locale: Locale }) {
  const reduced = useReducedMotion();
  const [pick, setPick] = useState(0);

  // Only while the step is live: the dial settles on whatever it last chose
  // and waits there until the thread comes back round.
  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => setPick((p) => (p + 1) % INTERVALS.length), STEP);
    return () => clearInterval(id);
  }, [active, reduced]);

  const word = WORDS_SHOWN[pick];

  return (
    <div aria-hidden className="w-full">
      <div className="flex items-center gap-1.5">
        {INTERVALS.map((label, i) => (
          <span
            key={label}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors duration-200 ${
              i === pick
                ? 'border-accent bg-accent text-white'
                : 'border-line bg-surface text-muted'
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-line bg-ground/50 px-3 py-2">
        <span
          className="rounded-full px-1.5 py-px text-[8px] font-bold text-white"
          style={{ background: LEVEL_COLORS[word.level] }}
        >
          {word.level.toUpperCase()}
        </span>
        {reduced ? (
          <span className="font-jp text-[15px] font-medium leading-none">{word.kanji}</span>
        ) : (
          <motion.span
            key={word.id}
            className="font-jp text-[15px] font-medium leading-none"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {word.kanji}
          </motion.span>
        )}
        <span className="truncate text-[11px] text-muted">{word.meaning[locale]}</span>
      </div>
    </div>
  );
}
