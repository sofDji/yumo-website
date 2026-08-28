import { BrowseScreen } from '@/components/illustrations/BrowseScreen';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { fill, type Dictionary, type Locale } from '@/lib/i18n';
import { sampleByLevel } from '@/lib/select-words';
import { LEVELS, TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';
import { WORDS } from '@/lib/words';

// One word per level, five rows. The illustration only needs to say that you
// can look words up; a dense list forces the type down until it is texture
// rather than something anyone reads. 22 characters is what fits a row at
// this size in both rendered locales.
const SAMPLES = sampleByLevel(WORDS, 22);
const BROWSE_ROWS = LEVELS.map((level) => SAMPLES[level]);

export function BrowseSection({
  locale,
  t,
  nf,
}: {
  locale: Locale;
  t: Dictionary['browse'];
  nf: Intl.NumberFormat;
}) {
  // Both counts go to every point; `fill` ignores the one a point does not use.
  const counts = { total: nf.format(TOTAL_WORDS), n5: nf.format(WORD_COUNTS.n5) };

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
        <Reveal className="md:order-2">
          <BrowseScreen words={BROWSE_ROWS} locale={locale} t={t} />
        </Reveal>

        <Reveal delay={0.1} className="md:order-1">
          <div className="space-y-6">
            {t.points.map((pt) => (
              <div key={pt.h}>
                <h3 className="text-lg font-semibold">{pt.h}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                  {fill(pt.p, counts)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
