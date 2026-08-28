import { Steps } from '@/components/how/Steps';
import { Section } from '@/components/layout/Section';
import type { Dictionary, Locale } from '@/lib/i18n';

export function HowItWorks({ t, locale }: { t: Dictionary['how']; locale: Locale }) {
  return (
    <Section
      id="how"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
        </>
      }
      lede={t.lede}
    >
      <Steps steps={t.steps} locale={locale} />
    </Section>
  );
}
