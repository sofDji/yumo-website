import type { Variants } from 'framer-motion';

// One curve for the whole page, so every element feels like part of the same
// object. Matches --ease in globals.css.
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = { fast: 0.25, base: 0.5, slow: 0.8 } as const;

// The signature reveal: blur clearing as the element rises. Blur only ever
// appears in an enter transition, never in a loop — see the spec's
// performance rules.
export const riseBlur: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

// Independent periods so the five floating cards never synchronise into a
// visible pulse. Transform-only, so it stays on the compositor.
export function drift(i: number) {
  const period = 7 + i * 1.7;
  return {
    animate: {
      y: [0, -14, 0, 10, 0],
      x: [0, 8, 0, -6, 0],
      rotate: [0, 1.5, 0, -1.5, 0],
    },
    transition: {
      duration: period,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };
}
