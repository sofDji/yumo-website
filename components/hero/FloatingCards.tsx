'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { cardEnter, CARD_ENTER, drift } from '@/lib/motion';
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

// The cards belong to the same arrival as the headline, not to a second wave
// behind it. These interleave with the hero's own delays — 0.05 title, 0.15
// lede, 0.25 card, 0.35 button — so the whole hero resolves as one gesture.
// The previous 0.5 + i * 0.1 did not start the first card until the middle
// column had almost finished, and then popped them in one at a time.
const ENTER_FROM = 0.12;
const ENTER_STEP = 0.09;

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
          const delay = ENTER_FROM + i * ENTER_STEP;

          return (
            <motion.div
              key={level}
              className={`absolute ${SPOTS[i]}`}
              // Shared with the hero's middle card, so all six word cards
              // arrive the same way. These used to scale up on framer's default
              // easing over 0.6s, half a second after the middle column had
              // finished — a separate animation that happened to be nearby.
              {...(reduced ? {} : cardEnter(delay))}
            >
              <motion.div {...(reduced ? {} : drift(i, delay + CARD_ENTER))}>
                <WordCard word={word} locale={locale} size="sm" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
