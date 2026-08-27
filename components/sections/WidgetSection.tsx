import { HomeScreen } from '@/components/illustrations/HomeScreen';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import type { Dictionary, Locale } from '@/lib/i18n';
import { WORDS } from '@/lib/words';

// Chosen, not indexed: two clean kanji, a one-word meaning, and a sense that
// fits a widget which brings you a word each day. Falls back to the first N5
// entry if the dataset is ever regenerated without it.
const ILLUSTRATION_WORD =
  WORDS.find((w) => w.kanji === '明日') ?? WORDS.filter((w) => w.level === 'n5')[0];

export function WidgetSection({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary['homeScreen'];
}) {
  return (
    <Section
      id="widget"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
          {t.titleTail ? ` ${t.titleTail}` : ''}
        </>
      }
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal className="md:order-2">
          <HomeScreen word={ILLUSTRATION_WORD} locale={locale} />
        </Reveal>

        <Reveal delay={0.1} className="md:order-1">
          <div className="space-y-6">
            {t.points.map((pt) => (
              <div key={pt.h}>
                <h3 className="text-lg font-semibold">{pt.h}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{pt.p}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
