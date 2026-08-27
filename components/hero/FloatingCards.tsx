'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { drift } from '@/lib/motion';
import { LEVELS } from '@/lib/tokens';
import { wordsByLevel } from '@/lib/words';
import { WordCard } from './WordCard';

// All five sit in the gutters beside the headline and the live word card.
//
// Percentages are relative to the 1280px wrapper below, not the viewport, so
// a card can never drift over the centred 768px content column no matter how
// wide the window gets: the gutter is 256px and a 172px card at 6% still
// clears it. Vertical spacing is at least 24 points between cards on the same
// side — now that each card carries its meaning they are ~15% of the hero
// tall, and the previous 13/31/46 split had them overlapping each other.
const SPOTS = [
  'left-[3%] top-[9%]',
  'right-[4%] top-[13%]',
  'left-[6%] top-[35%]',
  'right-[1%] top-[42%]',
  'left-[1%] top-[61%]',
];

export function FloatingCards({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion();
  // Server and client must agree on first render, so index 0 is fixed and the
  // shuffle happens after mount.
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 24));
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
      <div className="relative mx-auto h-full w-full max-w-[1280px]">
        {LEVELS.map((level, i) => {
          const pool = wordsByLevel(level);
          const word = pool[(seed + i * 5) % pool.length];
          const motionProps = reduced ? {} : drift(i);

          return (
            <motion.div
              key={level}
              className={`absolute ${SPOTS[i]}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
            >
              <motion.div {...motionProps}>
                <WordCard word={word} locale={locale} size="sm" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
