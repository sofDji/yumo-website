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
    </Section>
  );
}
