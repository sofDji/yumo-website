'use client';

import { motion } from 'framer-motion';

const levels = [
  { level: 'N5', color: 'bg-n5', words: '718', desc: 'Beginner essentials' },
  { level: 'N4', color: 'bg-n4', words: '668', desc: 'Basic conversations' },
  { level: 'N3', color: 'bg-n3', words: '2,139', desc: 'Everyday situations' },
  { level: 'N2', color: 'bg-n2', words: '1,748', desc: 'Complex topics' },
  { level: 'N1', color: 'bg-n1', words: '2,699', desc: 'Near-native' },
];

export default function JlptLevels() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-rust mb-3 block">
            JLPT levels
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-ink">
            From beginner to native.
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {levels.map((l, i) => (
            <motion.div
              key={l.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center gap-3 w-[140px] md:w-[160px]"
            >
              <span
                className={`${l.color} text-white text-sm font-bold px-4 py-1.5 rounded-full`}
              >
                {l.level}
              </span>
              <span className="text-2xl font-bold text-ink">{l.words}</span>
              <span className="text-xs text-subtext text-center">
                {l.desc}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-subtext text-sm">
            <span className="font-semibold text-ink">Auto mode</span> starts at
            N5 and climbs every two weeks. Every 4th window blends in the
            previous level for review.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
