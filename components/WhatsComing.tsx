'use client';

import { motion } from 'framer-motion';

const roadmap = [
  'Spaced repetition & quizzes',
  'Streaks & learning goals',
  'Custom word decks',
  'More widget styles & colors',
  'French, German & Spanish store listings',
];

export default function WhatsComing() {
  return (
    <section id="roadmap" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-rust mb-3 block">
            Roadmap
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-ink">
            Built with care, updated often.
          </h2>
        </motion.div>

        <div className="space-y-4">
          {roadmap.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="flex items-center gap-4 bg-card rounded-xl border border-border px-6 py-4"
            >
              <span className="inline-block bg-rust/10 text-rust text-xs font-semibold px-3 py-1 rounded-full shrink-0">
                Planned
              </span>
              <span className="text-ink text-sm font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
