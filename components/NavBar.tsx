'use client';

import { motion } from 'framer-motion';

export default function NavBar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-cream/90 border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src="/icon.svg" alt="Yumo" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-semibold tracking-tight text-ink">
            yumo
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-subtext hover:text-ink transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-subtext hover:text-ink transition-colors"
          >
            Pricing
          </a>
          <a
            href="#roadmap"
            className="text-sm font-medium text-subtext hover:text-ink transition-colors"
          >
            What&apos;s coming
          </a>
        </div>

        <a
          href="#"
          className="bg-rust text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-rust-light transition-colors"
        >
          Download
        </a>
      </div>
    </motion.nav>
  );
}
