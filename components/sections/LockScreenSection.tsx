import { LockScreen } from '@/components/illustrations/LockScreen';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import type { Dictionary, Locale } from '@/lib/i18n';
import { WORDS } from '@/lib/words';

const WORD = WORDS.find((w) => w.kanji === '明日') ?? WORDS[0];

export function LockScreenSection({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary['lockScreen'];
}) {
  return (
    <Section
      id="lockscreen"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
        </>
      }
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <LockScreen word={WORD} locale={locale} />
        </Reveal>

        <Reveal delay={0.1}>
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
