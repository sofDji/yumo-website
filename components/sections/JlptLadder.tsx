import { Ladder } from '@/components/levels/Ladder';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/layout/Section';
import { fill, type Dictionary, type Locale } from '@/lib/i18n';
import { LEVEL_COLORS, LEVELS, TOTAL_WORDS, WORD_COUNTS, type Level } from '@/lib/tokens';

export function JlptLadder({
  t,
  nf,
  locale,
}: {
  t: Dictionary['levels'];
  nf: Intl.NumberFormat;
  locale: Locale;
}) {
  // Formatted here rather than in the ladder: Intl.NumberFormat is a class
  // instance, and only plain values cross into a client component.
  const counts = Object.fromEntries(
    LEVELS.map((level) => [level, fill(t.words, { n: nf.format(WORD_COUNTS[level]) })]),
  ) as Record<Level, string>;

  return (
    <Section
      id="levels"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
        </>
      }
      lede={fill(t.lede, { total: nf.format(TOTAL_WORDS) })}
    >
      <Ladder t={t} counts={counts} locale={locale} />

      {/* The one place on the site where JLPT levels are the subject, so the
          one place a link to the reference page is worth more than a footer
          link: a link inside relevant content is read as a recommendation,
          boilerplate in the chrome is not.
          
          Given as a card rather than a text link because it is an offer, not a
          footnote — someone reading the N5 row has just been told it is 718
          words and is at the exact moment of wondering which 718. */}
      <div className="mt-12 flex flex-col items-start gap-6 rounded-2xl border border-line bg-surface p-8 shadow-soft md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <p className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: LEVEL_COLORS.n5 }}
            />
            <span className="text-lg font-semibold tracking-tight text-ink">
              {t.reference.title}
            </span>
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            {fill(t.reference.body, { n: nf.format(WORD_COUNTS.n5) })}
          </p>
        </div>

        <div className="shrink-0">
          <Button href="/jlpt/n5">{t.reference.cta}</Button>
        </div>
      </div>
    </Section>
  );
}
