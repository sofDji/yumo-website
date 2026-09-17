import { KanaScreen } from '@/components/illustrations/KanaScreen';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { fill, type Dictionary, type Locale } from '@/lib/i18n';
import { kanaCounts } from '@/lib/kana';

// The app's Kana tab (1.1). Placed before Levels because the kana come before
// N5, and with its phone on the left so it alternates with Browse's.
export function KanaSection({ locale, t }: { locale: Locale; t: Dictionary['kana'] }) {
  const counts = kanaCounts(locale);

  return (
    <Section
      id="kana"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
        </>
      }
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <KanaScreen t={t} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6">
            {t.points.map((pt) => (
              <div key={pt.h}>
                <h3 className="text-lg font-semibold">{pt.h}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{fill(pt.p, counts)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
