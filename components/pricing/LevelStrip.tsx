'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LEVELS, LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';

// The same five pills the ladder and Browse use, doing the one job the pricing
// table could not do in words: showing the size of the difference.
//
// Free lights N5 and leaves the other four hollow. Pro fills them in turn, and
// the count climbs with them — 718, 1,386, 3,525, 5,273, 7,972 — so the number
// beside the pills is the dictionary assembling itself rather than a figure
// that merely appears. Free's count sits at 718 the whole time, right next to
// it. That comparison is the argument.
const STEP = 700; // one level lighting up
const HOLD = 1900; // the full set, before it starts over

export function LevelStrip({
  counts,
  pro = false,
}: {
  /** The running totals, already formatted for the locale — one per level. */
  counts: string[];
  pro?: boolean;
}) {
  const reduced = useReducedMotion();
  // Starts at 1 on the server and on first paint, so there is nothing to
  // reconcile; reduced motion jumps to the full set once mounted.
  const [lit, setLit] = useState(1);

  useEffect(() => {
    if (!pro || reduced) return;
    const last = lit >= LEVELS.length;
    const id = setTimeout(() => setLit(last ? 1 : lit + 1), last ? HOLD : STEP);
    return () => clearTimeout(id);
  }, [lit, pro, reduced]);

  const shown = pro ? (reduced ? LEVELS.length : lit) : 1;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        {LEVELS.map((level, i) => {
          const on = i < shown;
          return (
            <span
              key={level}
              // Short on purpose. The count beside these updates instantly, so
              // a long fade let the number announce a level before its pill had
              // finished arriving — 7,972 while N1 was still hollow.
              className="rounded-full border px-2.5 py-0.5 text-[11px] font-bold transition-colors duration-200"
              style={
                on
                  ? {
                      background: LEVEL_COLORS[level],
                      borderColor: LEVEL_COLORS[level],
                      color: '#FFFFFF',
                    }
                  : {
                      background: 'transparent',
                      borderColor: '#E8DFD0',
                      color: '#A99C89',
                    }
              }
            >
              {LEVEL_LABELS[level]}
            </span>
          );
        })}
      </div>

      {/* No tabular figures here: this is one value, not a column, and the
          tabular comma sits in a full-width cell that reads as "7 , 972". */}
      <p className={`mt-3 text-[15px] ${pro ? 'font-medium text-ink' : 'text-muted'}`}>
        {counts[shown - 1]}
      </p>
    </div>
  );
}
