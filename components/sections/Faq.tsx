import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';

const QA = [
  {
    q: 'Why has the word not changed?',
    a: 'Yumo rotates on a fixed rhythm — every 6, 12 or 24 hours free, or every 1 to 4 hours with Pro. Between those points the word holds. That is intended: a word you see for a few hours is a word you remember.',
  },
  {
    q: 'Does it work on Android?',
    a: 'Yes, as a home-screen widget. Android phones have no Lock Screen widgets, so that part is iPhone only.',
  },
  {
    q: 'Is Yumo Pro a subscription?',
    a: 'No. It is a single purchase tied to your App Store or Google Play account, restorable on any device you sign into.',
  },
  {
    q: 'I hear nothing when I tap the speaker.',
    a: "Yumo speaks through your device's built-in Japanese voice. If none is installed, add one in Accessibility settings — iPhone under Spoken Content, Android under Text-to-speech output.",
  },
  {
    q: 'How do I get a refund?',
    a: 'Refunds are handled by Apple and Google, not by us. Use reportaproblem.apple.com, or your Google Play order history.',
  },
];

export function Faq() {
  return (
    <Section id="faq" eyebrow="Questions" title="Before you ask">
      <div className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
        {QA.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.04}>
            <details className="group px-7 py-5">
              <summary className="cursor-pointer list-none text-[15px] font-medium marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span
                    aria-hidden
                    className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
