import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { StoreCta } from '@/components/ui/StoreCta';
import { fill, type Dictionary } from '@/lib/i18n';
import { TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';

// Every claim below is taken from resolveFrequency and resolveLevelForWindow
// in the app's src/lib/scheduler.ts. Do not adjust without re-reading them —
// an earlier design doc described Browse as fully free and the code does not.
//
// The price must match PRO_PRICE_LABEL in the app and the product tier set in
// App Store Connect and Play Console. Those consoles are what customers are
// actually charged; this is only what the site claims.
const PRICE = '$8.99';

function Tier({
  name,
  price,
  suffix,
  items,
  featured = false,
}: {
  name: string;
  price: string;
  suffix?: string;
  items: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`h-full rounded-2xl bg-surface p-8 ${
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
        {suffix && <span className="text-base font-normal text-muted"> {suffix}</span>}
      </p>
      <ul className="mt-6 space-y-3 text-[15px] text-muted">
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
}: {
  t: Dictionary['pricing'];
  cta: Dictionary['cta'];
  nf: Intl.NumberFormat;
}) {
  const total = nf.format(TOTAL_WORDS);
  const n5 = nf.format(WORD_COUNTS.n5);

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
          <Tier name={t.freeName} price="$0" items={t.free.map((s) => fill(s, { n5, total }))} />
        </Reveal>
        <Reveal delay={0.08}>
          <Tier
            name={t.proName}
            price={PRICE}
            suffix={t.once}
            items={t.pro.map((s) => fill(s, { n5, total }))}
            featured
          />
        </Reveal>
      </div>

      <div className="mt-12 flex justify-center">
        <StoreCta t={cta} />
      </div>
    </Section>
  );
}
