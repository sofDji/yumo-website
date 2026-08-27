'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { StoreCta } from '@/components/ui/StoreCta';
import { DURATION, EASE } from '@/lib/motion';
import { SHOTS } from '@/lib/shots';
import { WORDS } from '@/lib/words';
import { Blooms } from './Blooms';
import { FloatingCards } from './FloatingCards';
import { PhoneShot } from './PhoneShot';
import { WordCard } from './WordCard';

export function Hero() {
  const reduced = useReducedMotion();
  // Index 0 on the server, a random word once mounted — anything else is a
  // hydration mismatch.
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * WORDS.length));
  }, []);

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: DURATION.slow, ease: EASE, delay },
        };

  return (
    <header className="relative overflow-hidden pb-8 pt-16 md:pt-24">
      <Blooms />
      <FloatingCards />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <motion.h1
          {...enter(0.05)}
          className="text-[40px] font-semibold leading-[1.06] tracking-tight md:text-[64px]"
        >
          Japanese, learned{' '}
          <span className="font-serif font-normal italic">without trying</span>
        </motion.h1>

        <motion.p
          {...enter(0.15)}
          className="mt-5 max-w-prose text-[18px] leading-relaxed text-muted"
        >
          A new JLPT word appears on your Lock Screen and Home Screen every few
          hours. No streaks, no lessons, nothing to remember to open.
        </motion.p>

        <motion.div {...enter(0.25)} className="mt-10">
          <WordCard word={WORDS[index]} />
        </motion.div>

        <motion.div {...enter(0.35)} className="mt-10">
          <StoreCta />
        </motion.div>
      </div>

      <motion.div {...enter(0.45)} className="relative mx-auto mt-16 w-full max-w-xs px-6">
        <PhoneShot
          shot={SHOTS.widgetHome}
          alt="The Yumo widget on an iPhone Home Screen"
          priority
        />
      </motion.div>
    </header>
  );
}
