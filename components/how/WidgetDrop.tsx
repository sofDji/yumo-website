'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Tile } from '@/components/illustrations/PhoneFrame';
import { EASE } from '@/lib/motion';
import { LEVEL_COLORS } from '@/lib/tokens';

// Step 01, as the phone would show it: a home screen with a widget-shaped gap
// in the corner, and Yumo settling into it. It stays there once it has landed
// — the whole claim of the step is that you do this once.
const CELL = 34;
const GAP = 5;
const TILES = 8; // the cells a 2x2 widget leaves free in a 4x3 grid

const face = (
  <div
    className="flex h-full w-full flex-col justify-between rounded-[18%] border border-white/90 p-2 shadow-[0_4px_12px_rgba(58,46,34,.10)]"
    style={{ background: `linear-gradient(150deg, ${LEVEL_COLORS.n5}26, rgba(255,255,255,.92))` }}
  >
    <span
      className="w-fit rounded-full px-1.5 py-px text-[7px] font-bold text-white"
      style={{ background: LEVEL_COLORS.n5 }}
    >
      N5
    </span>
    <div>
      <p className="font-jp text-[17px] font-medium leading-none">明日</p>
      <p className="mt-1 font-jp text-[7px] leading-none text-muted">あした</p>
    </div>
  </div>
);

export function WidgetDrop({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  // Bumped every time the step comes round, which replays the drop.
  const [drop, setDrop] = useState(0);

  useEffect(() => {
    if (active && !reduced) setDrop((n) => n + 1);
  }, [active, reduced]);

  return (
    <div
      aria-hidden
      className="grid"
      style={{
        gap: GAP,
        gridTemplateColumns: `repeat(4, ${CELL}px)`,
        gridTemplateRows: `repeat(3, ${CELL}px)`,
      }}
    >
      {reduced ? (
        <div className="col-span-2 row-span-2">{face}</div>
      ) : (
        <motion.div
          key={drop}
          className="col-span-2 row-span-2"
          initial={{ opacity: 0, scale: 0.84, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {face}
        </motion.div>
      )}

      {Array.from({ length: TILES }, (_, i) => (
        <Tile key={i} i={i + 1} />
      ))}
    </div>
  );
}
