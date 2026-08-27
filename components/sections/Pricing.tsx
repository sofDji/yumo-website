import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { StoreCta } from '@/components/ui/StoreCta';
import { TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';

// Every claim below is taken from resolveFrequency and resolveLevelForWindow
// in the app's src/lib/scheduler.ts. Do not adjust without re-reading them —
// an earlier design doc described Browse as fully free and the code does not.
const FREE = [
  `N5 vocabulary — ${WORD_COUNTS.n5} words`,
  'A new word every 6, 12 or 24 hours',
  'Lock Screen and Home Screen widgets',
  'Pronunciation and stroke practice',
  'Favourites, notifications and themes',
];

const PRO = [
  `Every level, N5 to N1 — all ${TOTAL_WORDS.toLocaleString('en-US')} words`,
  'A new word every 1, 2, 3 or 4 hours',
  'The Auto journey, climbing N5 to N1',
  'Browse the full dictionary',
  'Widget colours, transparency and text colour',
];

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

export function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title={<>One price, <span className="font-serif font-normal italic">forever</span></>}
      lede="Yumo Pro is a single purchase. No subscription, no renewal, no account to cancel."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <Tier name="Free" price="$0" items={FREE} />
        </Reveal>
        <Reveal delay={0.08}>
          <Tier name="Yumo Pro" price="$5.99" suffix="once" items={PRO} featured />
        </Reveal>
      </div>

      <div className="mt-12 flex justify-center">
        <StoreCta />
      </div>
    </Section>
  );
}
