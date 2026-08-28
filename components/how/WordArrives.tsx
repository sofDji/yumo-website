'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { EASE } from '@/lib/motion';
import { LEVEL_COLORS } from '@/lib/tokens';
import { WORDS } from '@/lib/words';

// Step 03, stated literally: the clock is a different hour each time you look,
// and a different word is under it. Nothing is tapped and nothing is opened —
// which is the step.
const ARRIVALS = [
  { time: '9:41', kanji: '雨' },
  { time: '13:20', kanji: '犬' },
  { time: '21:07', kanji: '明日' },
];

const BEATS = ARRIVALS.map(({ time, kanji }) => ({
  time,
  word: WORDS.find((w) => w.kanji === kanji) ?? WORDS[0],
}));

export function WordArrives({ active, locale }: { active: boolean; locale: Locale }) {
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (active && !reduced) setBeat((b) => b + 1);
  }, [active, reduced]);

  const { time, word } = BEATS[beat % BEATS.length];

  const card = (
    <div
      className="mx-auto flex w-fit items-center gap-2.5 rounded-xl border border-line bg-surface/80 px-3 py-2 backdrop-blur"
      style={{ boxShadow: `0 12px 28px -20px ${LEVEL_COLORS[word.level]}88` }}
    >
      <span
        className="rounded-full px-1.5 py-px text-[8px] font-bold text-white"
        style={{ background: LEVEL_COLORS[word.level] }}
      >
        {word.level.toUpperCase()}
      </span>
      <span className="font-jp text-[16px] font-medium leading-none">{word.kanji}</span>
      <span className="min-w-0 truncate text-[11px] text-muted">{word.meaning[locale]}</span>
    </div>
  );

  return (
    <div aria-hidden className="w-full">
      <p className="text-center text-[30px] font-light leading-none tracking-tight text-ink/70">
        {time}
      </p>

      <div className="mt-4">
        {reduced ? (
          card
        ) : (
          <motion.div
            key={beat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          >
            {card}
          </motion.div>
        )}
      </div>
    </div>
  );
}
