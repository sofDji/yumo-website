'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Set your pace',
    description:
      'Choose 1, 3, 6, 12, or 24 hours. Yumo shows a new word at your rhythm.',
    image: '/screenshots/settings.png',
    imageLeft: true,
  },
  {
    num: '02',
    title: 'See a word',
    description:
      'It appears on your Lock Screen or Home Screen. Kanji, reading, meaning, and JLPT level.',
    image: '/screenshots/widget-home.png',
    imageLeft: false,
  },
  {
    num: '03',
    title: 'Learn passively',
    description:
      'No streaks, no reminders, no guilt. The words just keep showing up on screens you already look at.',
    image: '/screenshots/today.png',
    imageLeft: true,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-rust mb-3 block">
            How it works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-ink">
            Three steps. Zero effort.
          </h2>
        </motion.div>

        <div className="space-y-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
                !step.imageLeft ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-[220px] md:w-[260px] rounded-2xl shadow-lg border border-border/50"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 max-w-md">
                <span className="text-5xl font-bold text-border select-none">
                  {step.num}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-ink mt-2">
                  {step.title}
                </h3>
                <p className="text-subtext text-lg mt-4 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
