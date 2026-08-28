'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LEVEL_COLORS } from '@/lib/tokens';

// A miniature of the app's word card, changing its mind about the theme. Only
// colours transition — nothing here moves or resizes, so a card that flips
// every few seconds costs the page nothing.
const LIGHT = { bg: '#FFFFFF', line: '#E8DFD0', ink: '#201C17', sub: '#6E6354' };
const DARK = { bg: '#221E19', line: '#3A342C', ink: '#F6F1E8', sub: '#A79B88' };

const STEP = 2600;

export function ThemeFlip() {
  const reduced = useReducedMotion();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setDark((d) => !d), STEP);
    return () => clearInterval(id);
  }, [reduced]);

  const c = dark ? DARK : LIGHT;

  return (
    <div
      className="w-full max-w-[150px] rounded-xl border px-3.5 py-3 transition-colors duration-700"
      style={{ background: c.bg, borderColor: c.line }}
      aria-hidden
    >
      <span
        className="inline-block rounded-full px-1.5 py-px text-[8px] font-bold tracking-wider text-white"
        style={{ background: LEVEL_COLORS.n5 }}
      >
        N5
      </span>
      <p
        className="mt-1.5 font-jp text-[20px] font-medium leading-none transition-colors duration-700"
        style={{ color: c.ink }}
      >
        明日
      </p>
      <p
        className="mt-1.5 font-jp text-[10px] transition-colors duration-700"
        style={{ color: c.sub }}
      >
        あした · ashita
      </p>
    </div>
  );
}
