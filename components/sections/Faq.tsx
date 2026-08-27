'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import type { Dictionary } from '@/lib/i18n';
import { EASE } from '@/lib/motion';

export function Faq({ t }: { t: Dictionary['faq'] }) {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();

  return (
    <Section id="faq" eyebrow={t.eyebrow} title={t.title}>
      {/* Panels are collapsed by the markup so there is no flash of every
          answer before hydration. Without JavaScript nothing can expand them,
          so this puts them back. */}
      <noscript>
        <style>{`.faq-panel { height: auto !important; opacity: 1 !important; }`}</style>
      </noscript>

      <div className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
        {t.items.map((item, i) => {
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
                <p
                  className="px-7 pb-5 text-[14px] leading-relaxed text-muted"
                  dangerouslySetInnerHTML={{ __html: item.a }}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
