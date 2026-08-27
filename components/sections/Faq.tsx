'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { EASE } from '@/lib/motion';

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
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();

  return (
    <Section id="faq" eyebrow="Questions" title="Before you ask">
      {/* Panels are collapsed by the markup so there is no flash of every
          answer before hydration. Without JavaScript nothing can expand them,
          so this puts them back. */}
      <noscript>
        <style>{`.faq-panel { height: auto !important; opacity: 1 !important; }`}</style>
      </noscript>

      <div className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
        {QA.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left text-[15px] font-medium transition-colors duration-200 hover:text-accent"
                >
                  {item.q}
                  <motion.span
                    aria-hidden
                    className="shrink-0 text-xl leading-none text-muted"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.3, ease: EASE }}
                  >
                    +
                  </motion.span>
                </button>
              </h3>

              <motion.div
                id={`faq-panel-${i}`}
                role="region"
                className="faq-panel overflow-hidden"
                initial={{ height: i === 0 ? 'auto' : 0, opacity: i === 0 ? 1 : 0 }}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        height: { duration: 0.38, ease: EASE },
                        // Fading a touch faster than the height keeps the text
                        // from smearing as the panel closes.
                        opacity: { duration: isOpen ? 0.3 : 0.18, ease: 'linear' },
                      }
                }
              >
                <p className="px-7 pb-5 text-[14px] leading-relaxed text-muted">{item.a}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
