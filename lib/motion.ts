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

// How a word card arrives — the hero's middle card and the five that float
// beside it, so those six always match each other.
//
// No blur here, and that is the whole point. The page's entrance clears an 8px
// blur, which works on a 64px headline: the glyphs stay legible throughout, so
// the eye follows the entire movement. On a 172px card with 26px type the same
// blur is a smudge — the card is unreadable until the blur is nearly gone, and
// then it resolves into legibility over the last fraction of the animation.
// Measured on the painted frames, that late snap is what reads as popping, and
// no amount of re-pacing the opacity fixes it, because the opacity was never
// what was hiding the card.
//
// So these fade and rise, plainly, over a long window with nothing obscuring
// them. Dropping the filter also lets the card's own backdrop-blur work: an
// ancestor with any filter — blur(0px) included — makes its descendants stop
// sampling the backdrop.
export const CARD_ENTER = 0.9;

export function cardEnter(delay: number) {
  return {
    initial: { opacity: 0, y: 24, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: CARD_ENTER, ease: 'easeOut' as const, delay },
  };
}

// Independent periods so the five floating cards never synchronise into a
// visible pulse. Transform-only, so it stays on the compositor.
//
// `after` holds the drift until the card has finished arriving. Starting both
// at mount had a card sliding sideways while it was still fading in, which is
// what made the entrance read as unsettled.
export function drift(i: number, after = 0) {
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
      delay: after,
    },
  };
}
