'use client';

import { motion } from 'framer-motion';

const screenshots = [
  { src: '/screenshots/widget-home.png', alt: 'Widget', rotate: -3, x: -80, z: 1 },
  { src: '/screenshots/settings.png', alt: 'Settings', rotate: -1.5, x: -35, z: 2 },
  { src: '/screenshots/today.png', alt: 'Today', rotate: 0, x: 0, z: 3 },
  { src: '/screenshots/browse.png', alt: 'Browse', rotate: 1.5, x: 35, z: 2 },
  { src: '/screenshots/saved.png', alt: 'Saved', rotate: 3, x: 80, z: 1 },
];

export default function Hero() {
  return (
    <section className="pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-block bg-rust/10 text-rust text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            Japanese, effortlessly
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-ink"
        >
          Learn Japanese
          <br />
          without opening
          <br />
          <span className="italic text-rust">the app</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl text-subtext max-w-xl mx-auto leading-relaxed"
        >
          A new JLPT word on your Lock Screen every few hours.
          <br className="hidden md:block" />
          ~8,000 words, fully offline, no accounts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-ink text-cream text-sm font-semibold px-6 py-3 rounded-full hover:bg-ink/90 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-ink text-cream text-sm font-semibold px-6 py-3 rounded-full hover:bg-ink/90 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.04c.72.47 1.6.28 2.12-.15l8.56-4.92-2.2-2.2L3.18 23.04zm-.8-1.14V2.1c0-.38.2-.73.53-.92L13.7 12l-10.8 9.98zm15.58-9.16l-2.7-1.56-2.48 2.44 2.48 2.44 2.7-1.56c.76-.44.76-1.56 0-2zm-2.7-5.74L5.3 6.2l2.2 2.2 10.74-6.18c.52-.28 1.08-.33 1.4-.2z" />
            </svg>
            Google Play
          </a>
        </motion.div>
      </div>

      {/* Screenshot fan */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-16 relative h-[320px] md:h-[420px] max-w-5xl mx-auto"
      >
        <div className="absolute inset-0 flex items-end justify-center">
          {screenshots.map((s, i) => (
            <motion.img
              key={s.src}
              src={s.src}
              alt={s.alt}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: s.rotate }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
              className="absolute bottom-0 w-[140px] md:w-[180px] rounded-2xl shadow-xl border border-border/50"
              style={{
                transform: `translateX(${s.x}px) rotate(${s.rotate}deg)`,
                zIndex: s.z,
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
