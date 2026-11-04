import type { CSSProperties } from 'react';
import { FAN_WORDS, type FanWord } from '@/lib/fan-words';
import type { Locale } from '@/lib/i18n';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/site';
import { LEVEL_LABELS } from '@/lib/tokens';

// Sideways step, tilt and drop for each card, from the outermost left to the
// outermost right. The stylesheet scales the step for narrow screens.
const PLACES = [
  { x: -332, r: -10, y: 78, z: 1 },
  { x: -166, r: -5, y: 28, z: 2 },
  { x: 0, r: 0, y: 0, z: 5 },
  { x: 166, r: 5, y: 28, z: 2 },
  { x: 332, r: 10, y: 78, z: 1 },
];

function Sentence({ word }: { word: FanWord }) {
  const [before, after] = word.jp.split(word.mark);
  return (
    <p lang="ja" className="font-jp text-[14px] font-semibold leading-snug">
      {before}
      <b className="font-bold text-accent">{word.mark}</b>
      {after}
    </p>
  );
}

function Card({ word, locale, cta }: { word: FanWord; locale: Locale; cta?: { href: string; label: string } }) {
  return (
    <>
      <span className="inline-block rounded-full bg-black/30 px-2 py-0.5 text-[11px] font-semibold">
        {LEVEL_LABELS[word.level]}
      </span>
      <p lang="ja" className={`mt-3 font-jp font-bold leading-[1.1] ${word.kanji.length > 2 ? 'text-[32px]' : 'text-[50px]'}`}>
        {word.kanji}
      </p>
      <p className="mt-1.5 text-[13px] text-white/90">{word.reading}</p>
      <p className="mt-0.5 text-[16px] font-semibold leading-snug">{word.meaning[locale]}</p>
      <div className="mt-4 border-t border-white/25 pt-3">
        <Sentence word={word} />
        <p className="mt-1.5 text-[11px] leading-snug text-white/90">
          {word.romaji.before}
          <b className="font-bold text-accent">{word.romaji.word}</b>
          {word.romaji.after}
        </p>
        <p className="mt-1.5 text-[12px] leading-snug text-white/85">{word.sentence[locale]}</p>
      </div>
      {cta && (
        <a
          href={cta.href}
          data-store-cta
          className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-white py-1 pl-3 pr-1 text-xs font-semibold text-[#111] shadow-lift transition-transform duration-200 hover:scale-[1.03]"
        >
          {cta.label}
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#111" strokeWidth="2.4" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </a>
      )}
    </>
  );
}

export function WordFan({ locale, getApp }: { locale: Locale; getApp: string }) {
  const href = APP_STORE_URL || PLAY_STORE_URL;
  return (
    <div className="word-fan relative mx-auto mt-12 md:mt-14" aria-label="">
      {FAN_WORDS.map((word, i) => {
        const place = PLACES[i];
        const outer = Math.abs(i - 2) === 2;
        return (
          <article
            key={word.id}
            className={`fan-card ${outer ? 'fan-card-outer' : ''}`}
            style={
              {
                '--x': `${place.x}px`,
                '--r': `${place.r}deg`,
                '--y': `${place.y}px`,
                '--delay': `${0.2 + Math.abs(i - 2) * 0.08}s`,
                zIndex: place.z,
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.5) 75%), url(/hero/${word.level}.jpg)`,
              } as CSSProperties
            }
          >
            <Card word={word} locale={locale} cta={i === 2 && href ? { href, label: getApp } : undefined} />
          </article>
        );
      })}
    </div>
  );
}
