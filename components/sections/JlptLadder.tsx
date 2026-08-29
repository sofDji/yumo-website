import Link from 'next/link';
import { Ladder } from '@/components/levels/Ladder';
import { Section } from '@/components/layout/Section';
import { fill, type Dictionary, type Locale } from '@/lib/i18n';
import { LEVELS, TOTAL_WORDS, WORD_COUNTS, type Level } from '@/lib/tokens';

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
          boilerplate in the chrome is not. */}
      <p className="mt-10 text-center">
        <Link
          href="/jlpt/n5"
          className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          {t.reference} &rarr;
        </Link>
      </p>
    </Section>
  );
}
