'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '~8,000', label: 'words bundled on your device' },
  { value: '0', label: 'network requests for core features' },
  { value: '0', label: 'accounts, analytics, or ads' },
];

export default function Privacy() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-rust mb-3 block">
            Privacy
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-ink mb-16">
            No accounts. No tracking.
            <br />
            No server.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-bold text-rust">
                {s.value}
              </span>
              <span className="text-subtext text-sm mt-3 max-w-[200px]">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
