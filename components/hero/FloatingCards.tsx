'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { drift } from '@/lib/motion';
import { LEVELS } from '@/lib/tokens';
import { wordsByLevel } from '@/lib/words';
import { WordCard } from './WordCard';

// All five sit in the gutters beside the headline and the live word card, and
// none reach below 46% — the band lower down belongs to the phone, and cards
// flanking it read as clutter rather than atmosphere.
//
// Percentages are relative to the 1180px wrapper below, not the viewport, so
// a card can never drift over the centred 768px content column no matter how
// wide the window gets.
const SPOTS = [
  'left-[1%] top-[13%]',
  'right-[2%] top-[8%]',
  'left-[6%] top-[31%]',
  'right-[7%] top-[27%]',
  'left-[2%] top-[46%]',
];

export function FloatingCards() {
  const reduced = useReducedMotion();
  // Server and client must agree on first render, so index 0 is fixed and the
  // shuffle happens after mount.
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 24));
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
      <div className="relative mx-auto h-full w-full max-w-[1180px]">
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
                <WordCard word={word} size="sm" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
