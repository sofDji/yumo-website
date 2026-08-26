'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <img src="/icon.svg" alt="Yumo" className="w-7 h-7 rounded-lg" />
          <div>
            <span className="text-sm font-semibold text-ink">yumo</span>
            <p className="text-xs text-subtext">
              Learn Japanese without opening the app.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-6 text-xs text-subtext"
        >
          <a
            href="https://sofdji.github.io/yumo-legal/legal/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="https://sofdji.github.io/yumo-legal/legal/terms.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            Terms of Use
          </a>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 text-center">
        <p className="text-xs text-border">
          &copy; 2026 sofianeenf. Made with care.
        </p>
      </div>
    </footer>
  );
}
