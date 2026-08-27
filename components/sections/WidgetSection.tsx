import { WidgetIllustration } from '@/components/hero/WidgetIllustration';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { WORDS } from '@/lib/words';

const POINTS = [
  {
    h: 'On iPhone',
    p: 'Lock Screen and Home Screen, in small, medium, rectangular and inline sizes. Every widget can carry its own level and rhythm, so you can run N5 on the Lock Screen and N3 on the Home Screen.',
  },
  {
    h: 'On Android',
    p: 'A resizable home-screen widget that follows the level and rhythm you set in the app. Android has no Lock Screen widgets, so Yumo does not pretend otherwise.',
  },
  {
    h: 'Always right, always offline',
    p: 'The word shown is a pure function of the time and your settings. No server decides it, so it is identical on every device and works in aeroplane mode.',
  },
];

// Chosen, not indexed: two clean kanji, a one-word meaning, and a sense that
// fits a widget which brings you a word each day. Falls back to the first N5
// entry if the dataset is ever regenerated without it.
const ILLUSTRATION_WORD =
  WORDS.find((w) => w.kanji === '明日') ?? WORDS.filter((w) => w.level === 'n5')[0];

export function WidgetSection() {
  return (
    <Section
      id="widget"
      eyebrow="The widget"
      title={<>It lives where you already <span className="font-serif font-normal italic">look</span></>}
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <WidgetIllustration word={ILLUSTRATION_WORD} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6">
            {POINTS.map((pt) => (
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
