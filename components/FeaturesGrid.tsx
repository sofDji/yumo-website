'use client';

import { motion } from 'framer-motion';

const features = [
  {
    tag: 'Widgets',
    title: 'Lock Screen widgets',
    description: 'See a word every time you check the time. iOS Lock Screen and Home Screen.',
  },
  {
    tag: 'Widgets',
    title: 'Home Screen widgets',
    description: 'Resizable, customizable, always current. iOS and Android.',
  },
  {
    tag: 'Practice',
    title: 'Stroke-by-stroke practice',
    description: 'Trace kanji with real stroke-order data from KanjiVG. ~3,000 characters.',
  },
  {
    tag: 'JLPT',
    title: '5 JLPT levels',
    description: 'N5 to N1. Auto mode climbs progressively as you learn.',
  },
  {
    tag: 'Languages',
    title: '4 translation languages',
    description: 'English, French, German, Spanish — free for everyone.',
  },
  {
    tag: 'Audio',
    title: 'Pronunciation',
    description: 'Hear native Japanese TTS for every word with one tap.',
  },
];

const tagColors: Record<string, string> = {
  Widgets: 'bg-n5/10 text-n5',
  Practice: 'bg-n3/10 text-n3',
  JLPT: 'bg-n2/10 text-n2',
  Languages: 'bg-n4/10 text-n4',
  Audio: 'bg-n1/10 text-n1',
};

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-rust mb-3 block">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-ink">
            Everything you need.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-card rounded-2xl border border-border p-7 hover:shadow-md transition-shadow"
            >
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                  tagColors[f.tag] ?? 'bg-ink/5 text-ink'
                }`}
              >
                {f.tag}
              </span>
              <h3 className="text-lg font-bold text-ink">{f.title}</h3>
              <p className="text-subtext text-sm mt-2 leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
