import { LockScreen } from '@/components/illustrations/LockScreen';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import type { Dictionary, Locale } from '@/lib/i18n';
import type { SiteWord } from '@/lib/select-words';

// From the app's dataset, spelled out because the card below is about this
// word and the generated site sample may not include it.
const WORD: SiteWord = {
  id: 239,
  kanji: '月曜日',
  kana: 'げつようび',
  romaji: 'getsuyoubi',
  meaning: { en: 'Monday', fr: 'lundi', de: 'Montag', es: 'lunes', ko: '월요일', vi: 'thứ hai' },
  level: 'n5',
};

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
          <LockScreen word={WORD} locale={locale} t={t} />
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
