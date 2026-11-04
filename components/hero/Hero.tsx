'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Dictionary, Locale } from '@/lib/i18n';
import { DURATION, EASE } from '@/lib/motion';
import { APP_STORE_RATING, STORY_MAKER_LIVE } from '@/lib/site';
import { WordFan } from './WordFan';

export function Hero({
  locale,
  t,
  getApp,
}: {
  locale: Locale;
  t: Dictionary['hero'];
  getApp: string;
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
    <header className="hero-glow relative -mt-[72px] overflow-hidden pt-[112px] md:pt-[128px]">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <motion.p {...enter(0)} className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-muted">
          <span aria-hidden className="tracking-[0.1em] text-accent">
            ★★★★★
          </span>
          <span>
            <b className="font-semibold text-ink">{APP_STORE_RATING}</b> {t.onStore}
          </span>
          {STORY_MAKER_LIVE && (
            <>
              <span aria-hidden className="opacity-40">
                —
              </span>
              <span>{t.isNew}</span>
            </>
          )}
        </motion.p>

        <motion.h1
          {...enter(0.05)}
          className="mt-5 text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[76px]"
        >
          {t.titleLead}
          <br />
          <span className="font-serif text-[1.1em] font-normal italic tracking-[-0.01em] text-accent">
            {t.titleAccent}
          </span>
        </motion.h1>

        <motion.p {...enter(0.15)} className="mt-6 max-w-[38rem] text-[17px] leading-relaxed text-muted">
          {STORY_MAKER_LIVE ? t.ledeWithShare : t.lede}
        </motion.p>
      </div>

      <WordFan locale={locale} getApp={getApp} />
    </header>
  );
}
