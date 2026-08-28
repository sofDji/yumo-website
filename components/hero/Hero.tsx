'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { StoreCta } from '@/components/ui/StoreCta';
import type { Dictionary, Locale } from '@/lib/i18n';
import { cardEnter, DURATION, EASE } from '@/lib/motion';
import type { SiteWord } from '@/lib/select-words';
import { Blooms } from './Blooms';
import { FloatingCards } from './FloatingCards';
import { WordCard } from './WordCard';

// The card the page opens on. Fixed rather than drawn at random from the
// dataset: this one is addressed to whoever just arrived, and an N1 compound
// pulled out of a hat is a worse greeting than the word that means greeting.
// Fixing it also retires the hydration dance the random pick needed — server
// and client now render the same card.
//
// Record 2055 of the app's word-data.json. The glosses are trimmed to the
// clause that fits a card: "welcome, reception" and "accueil; bienvenue;
// réception" are both right for 歓迎, and these are the halves a visitor is
// actually being told. Same display trim lib/select-words.ts documents.
const GREETING: SiteWord = {
  id: 2055,
  kanji: '歓迎',
  kana: 'かんげい',
  romaji: 'kangei',
  meaning: { en: 'welcome', fr: 'bienvenue' },
  level: 'n3',
};

export function Hero({
  locale,
  t,
  cta,
}: {
  locale: Locale;
  t: Dictionary['hero'];
  cta: Dictionary['cta'];
}) {
  const reduced = useReducedMotion();

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: DURATION.slow, ease: EASE, delay },
        };

  return (
    <header className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24">
      <Blooms />
      <FloatingCards locale={locale} />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <motion.h1
          {...enter(0.05)}
          className="text-[40px] font-semibold leading-[1.06] tracking-tight md:text-[64px]"
        >
          {t.titleLead}{' '}
          <span className="font-serif font-normal italic">{t.titleAccent}</span>
        </motion.h1>

        <motion.p
          {...enter(0.15)}
          className="mt-5 max-w-prose text-[18px] leading-relaxed text-muted"
        >
          {t.lede}
        </motion.p>

        {/* The card arrives as a card, not as a paragraph — same entrance
            as the five floating beside it. */}
        <motion.div {...(reduced ? {} : cardEnter(0.25))} className="mt-10">
          <WordCard word={GREETING} locale={locale} />
        </motion.div>

        <motion.div {...enter(0.35)} className="mt-10">
          <StoreCta t={cta} />
        </motion.div>
      </div>
    </header>
  );
}
