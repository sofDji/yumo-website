'use client';

import { motion } from 'framer-motion';

const freeFeatures = [
  'N5 level (718 words)',
  'Daily & hourly words',
  'Lock Screen & Home Screen widgets',
  'Stroke practice',
  'Pronunciation',
  '4 translation languages',
  'Light & dark theme',
];

const proFeatures = [
  'All 5 JLPT levels (N5–N1)',
  'Word frequency: 1, 2, 3, 4 hours',
  '10 widget colors + glass + gradient',
  'Widget text color control',
  'Auto journey progression',
  'Everything in Free',
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-rust mb-3 block">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-ink">
            One purchase, not a subscription.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <h3 className="text-lg font-bold text-ink">Free</h3>
            <p className="text-subtext text-sm mt-1">Get started</p>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-ink"
                >
                  <span className="text-rust mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card rounded-2xl border-2 border-rust p-8 relative"
          >
            <div className="absolute -top-3 right-6 bg-rust text-white text-xs font-bold px-3 py-1 rounded-full">
              Popular
            </div>
            <h3 className="text-lg font-bold text-ink">Yumo Pro</h3>
            <p className="text-rust font-bold text-2xl mt-1">$5.99</p>
            <p className="text-subtext text-sm">one-time purchase</p>
            <ul className="mt-6 space-y-3">
              {proFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-ink"
                >
                  <span className="text-rust mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center text-subtext text-xs mt-8"
        >
          Restore purchase available. Refunds handled by Apple or Google under
          their store policies.
        </motion.p>
      </div>
    </section>
  );
}
