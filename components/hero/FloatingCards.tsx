'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { drift } from '@/lib/motion';
import { LEVELS } from '@/lib/tokens';
import { wordsByLevel } from '@/lib/words';
import { WordCard } from './WordCard';

// Positions are deliberately asymmetric — a symmetrical ring reads as a
// diagram rather than as objects floating in space.
const SPOTS = [
  'left-[2%] top-[14%]',
  'right-[4%] top-[8%]',
  'left-[8%] bottom-[16%]',
  'right-[2%] bottom-[22%]',
  'left-[46%] top-[2%]',
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
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
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
  );
}
