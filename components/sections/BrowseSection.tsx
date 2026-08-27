import { BrowseScreen } from '@/components/illustrations/BrowseScreen';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { fill, type Dictionary, type Locale } from '@/lib/i18n';
import { TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';
import { WORDS } from '@/lib/words';

// One word per level, five rows. The illustration only needs to say that you
// can look words up; a dense list forces the type down until it is texture
// rather than something anyone reads. Meanings are capped at 22 characters in
// both rendered locales so no row truncates at this size.
const BROWSE_ROWS = ['n5', 'n4', 'n3', 'n2', 'n1'].map(
  (level) =>
    WORDS.filter(
      (w) => w.level === level && w.meaning.en.length <= 22 && w.meaning.fr.length <= 22,
    )[0] ?? WORDS.filter((w) => w.level === level)[0],
);

export function BrowseSection({
  locale,
  t,
  nf,
}: {
  locale: Locale;
  t: Dictionary['browse'];
  nf: Intl.NumberFormat;
}) {
  const total = nf.format(TOTAL_WORDS);
  const n5 = nf.format(WORD_COUNTS.n5);

  return (
    <Section
      id="browse"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
        </>
      }
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted">
            <p>{fill(t.p1, { total })}</p>
            <p>{fill(t.p2, { n5 })}</p>
            <p>{t.p3}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <BrowseScreen words={BROWSE_ROWS} locale={locale} t={t} />
        </Reveal>
      </div>
    </Section>
  );
}
