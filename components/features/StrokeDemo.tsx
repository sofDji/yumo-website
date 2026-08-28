'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// 学 — "to learn". The section's one loud element, so it is the one that had
// to be real: these are KanjiVG paths lifted verbatim from the app's
// assets/stroke-data.json, in KanjiVG's 109x109 box, in the order the app's
// write screen draws them. Eight strokes, eight start points.
//
// Copied rather than generated: it is one character, and a build script that
// reaches into the app repo for 8 strings would be more machinery than the
// data it moves.
const STROKES = [
  'M29.5,17.25c3.5,3,6.5,7.25,7.75,9.75',
  'M49,12c1.25,2,4.75,8.25,5.25,11.5',
  'M75,11c0.25,1.75-0.12,2.75-0.75,4.25c-1.29,3.1-4.25,7.38-6.5,9.75',
  'M21.25,33.75c-0.12,4.75-2,12.5-3.75,16.25',
  'M23.5,36.5c17-1.62,42.38-5.5,60-5.75c9.5-0.13,4.12,5.12,0,9',
  'M37.25,46.5c1,0.25,3.75,0.25,5.5-0.25s18.25-4,20-4s2.75,0.75,1,2.25S54.5,53.5,53,54.75',
  'M50.75,55.75c4,8.75,7.18,24.67,1.75,38c-2.75,6.75-7.75,1.25-9.75-2',
  'M15.75,67.75c1.75,1,4.64,1.36,7.5,1c15.88-2,44.43-6.25,61.37-5.5c2.5,0.11,4.72,0.25,6.39,1',
];

const STARTS: [number, number][] = [
  [20.25, 13.63],
  [39.75, 8.5],
  [66.5, 8.5],
  [14.5, 34.63],
  [24.5, 32.5],
  [29.25, 48.5],
  [44.5, 58.63],
  [8.5, 72.5],
];

const BOX = 109;
const DRAW = 0.5; // seconds one stroke takes
const GAP = 0.34; // seconds between the start of one stroke and the next
const HOLD = 1.5; // seconds the finished character rests before it redraws

const INK = '#201C17';
const WIDTH = 5.5;

// pathLength only — the page's rule is that blur belongs to an enter
// transition and never to something that repeats.
const TOTAL = (STROKES.length - 1) * GAP + DRAW;

export function StrokeDemo() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-80px' });
  // Bumping this remounts the animated group, which is what replays it.
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = setTimeout(() => setRun((n) => n + 1), (TOTAL + HOLD) * 1000);
    return () => clearTimeout(id);
  }, [run, inView, reduced]);

  return (
    <div
      ref={ref}
      // Hovering the card starts the character over rather than waiting out
      // the loop — the one place a visitor can ask for it again.
      onMouseEnter={() => !reduced && setRun((n) => n + 1)}
      className="mx-auto w-full max-w-[210px]"
    >
      <svg viewBox={`0 0 ${BOX} ${BOX}`} className="w-full" role="img" aria-label="学">
        {/* The practice square from the app's write screen. */}
        <rect
          x="1.5"
          y="1.5"
          width={BOX - 3}
          height={BOX - 3}
          rx="10"
          fill="none"
          stroke="#E8DFD0"
          strokeWidth="1.5"
        />
        <line
          x1={BOX / 2}
          y1="6"
          x2={BOX / 2}
          y2={BOX - 6}
          stroke="#E8DFD0"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        <line
          x1="6"
          y1={BOX / 2}
          x2={BOX - 6}
          y2={BOX / 2}
          stroke="#E8DFD0"
          strokeWidth="1"
          strokeDasharray="3 6"
        />

        {/* The whole character, faint, so the ink has somewhere to land. */}
        {STROKES.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={INK}
            strokeOpacity={0.07}
            strokeWidth={WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {reduced ? (
          STROKES.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={INK}
              strokeWidth={WIDTH}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))
        ) : (
          <g key={run}>
            {STROKES.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke={INK}
                strokeWidth={WIDTH}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: DRAW, ease: 'easeInOut', delay: i * GAP },
                  opacity: { duration: 0.01, delay: i * GAP },
                }}
              />
            ))}

            {/* Where each stroke begins, the way the app marks it. */}
            {STARTS.map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={3.4}
                fill="#BE3F29"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.5] }}
                transition={{
                  duration: DRAW + 0.35,
                  delay: Math.max(0, i * GAP - 0.16),
                  times: [0, 0.22, 0.7, 1],
                  ease: 'easeOut',
                }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
