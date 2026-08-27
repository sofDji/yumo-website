import { LockScreen } from '@/components/illustrations/LockScreen';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { WORDS } from '@/lib/words';

const WORD = WORDS.find((w) => w.kanji === '明日') ?? WORDS[0];

const POINTS = [
  {
    h: 'The screen you check most',
    p: 'You look at your Lock Screen dozens of times a day without deciding to. Yumo puts a word there, so the reading happens before you have thought about studying.',
  },
  {
    h: 'Rectangular or inline',
    p: 'The rectangular accessory shows the kanji, its reading and its meaning. The inline one sits beside the time as a single line, for when you want it almost invisible.',
  },
  {
    h: 'iPhone only, and we say so',
    p: 'Lock Screen widgets are an iOS feature. Android phones do not have them, so on Android Yumo lives on the home screen instead.',
  },
];

export function LockScreenSection() {
  return (
    <Section
      id="lockscreen"
      eyebrow="Lock Screen"
      title={<>Learned before you even <span className="font-serif font-normal italic">unlock</span></>}
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <LockScreen word={WORD} />
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
