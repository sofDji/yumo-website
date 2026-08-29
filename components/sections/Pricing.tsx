import type { ReactNode } from 'react';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { LevelStrip } from '@/components/pricing/LevelStrip';
import { StoreCta } from '@/components/ui/StoreCta';
import { fill, type Dictionary } from '@/lib/i18n';
import { PRO_PRICE_LABEL } from '@/lib/site';
import { cumulativeWords, LEVEL_COLORS, TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';

// Every claim below is taken from resolveFrequency and resolveLevelForWindow
// in the app's src/lib/scheduler.ts. Do not adjust without re-reading them —
// an earlier design doc described Browse as fully free and the code does not.


function Tier({
  name,
  price,
  suffix,
  strip,
  items,
  featured = false,
}: {
  name: string;
  price: string;
  suffix?: string;
  strip: ReactNode;
  items: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl bg-surface p-8 ${
        featured ? 'border-2 border-accent/30 shadow-lift' : 'border border-line shadow-soft'
      }`}
    >
      <p
        className={`text-sm font-semibold uppercase tracking-wider ${
          featured ? 'text-accent' : 'text-muted'
        }`}
      >
        {name}
      </p>

      <p className="mt-2 text-4xl font-semibold">
        {price}
        {/* "once" is the whole argument against every subscription this app
            sits beside, so it wears the page's accent voice rather than the
            small grey type it used to. */}
        {suffix && (
          <span className="ml-2 font-serif text-2xl font-normal italic text-accent">{suffix}</span>
        )}
      </p>

      <div className="mt-7">{strip}</div>

      <ul className="mt-7 space-y-3 border-t border-line pt-7 text-[15px] text-muted">
        {items.map((f) => (
          <li key={f} className="flex gap-3">
            <span aria-hidden className="text-accent">
              ·
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Pricing({
  t,
  cta,
  nf,
  words,
}: {
  t: Dictionary['pricing'];
  cta: Dictionary['cta'];
  nf: Intl.NumberFormat;
  /** The levels section's "{n} words" template, reused rather than translated
   *  a second time so the strip reads the same in both locales. */
  words: string;
}) {
  const total = nf.format(TOTAL_WORDS);
  const n5 = nf.format(WORD_COUNTS.n5);

  // Formatted here: Intl.NumberFormat is a class instance, and only plain
  // values cross into a client component.
  const counts = cumulativeWords().map((n) => fill(words, { n: nf.format(n) }));

  return (
    <Section
      id="pricing"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
        </>
      }
      lede={t.lede}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <Tier
            name={t.freeName}
            price="$0"
            strip={<LevelStrip counts={counts} />}
            items={t.free.map((s) => fill(s, { n5, total }))}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative h-full">
            {/* Static washes, never animated — the same rule the hero's blooms
                follow. They are what makes the paid card the warm one without
                resorting to a badge. Deliberately NOT clipped: bounding the
                glow draws a faint rectangle behind the card, which is the one
                thing a bloom must never look like. body has overflow-x hidden,
                so the spill costs nothing. */}
            <div aria-hidden className="pointer-events-none absolute -inset-4">
              <div
                className="absolute -left-8 top-2 h-56 w-56 rounded-full opacity-[0.20] blur-[90px]"
                style={{ background: LEVEL_COLORS.n5 }}
              />
              <div
                className="absolute -right-6 bottom-0 h-52 w-52 rounded-full opacity-[0.16] blur-[100px]"
                style={{ background: LEVEL_COLORS.n2 }}
              />
            </div>

            <div className="relative h-full">
              <Tier
                name={t.proName}
                price={PRO_PRICE_LABEL}
                suffix={t.once}
                strip={<LevelStrip counts={counts} pro />}
                items={t.pro.map((s) => fill(s, { n5, total }))}
                featured
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 flex justify-center">
        <StoreCta t={cta} />
      </div>
    </Section>
  );
}
