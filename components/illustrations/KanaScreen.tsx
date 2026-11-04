'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { BASIC_ROWS, toKatakana } from '@/lib/kana';
import { Panel, Stage } from './Stage';

// The kana chart as a glass plane receding into the space, changing script every
// few seconds, with one character lifted out of it. Both scripts are drawn in
// every cell and only their opacity moves, so a flip costs the page nothing.
const STEP = 2800;

// The character lifted out, pointing at "tap one to write it".
const LIFTED = { kana: 'し', romaji: 'shi' };

const VISIBLE_ROWS = BASIC_ROWS.slice(0, 5);

function Both({ kana, katakana }: { kana: string; katakana: boolean }) {
  return (
    <>
      <span className="absolute inset-0 transition-opacity duration-500" style={{ opacity: katakana ? 0 : 1 }}>
        {kana}
      </span>
      <span className="absolute inset-0 transition-opacity duration-500" style={{ opacity: katakana ? 1 : 0 }}>
        {toKatakana(kana)}
      </span>
    </>
  );
}

export function KanaScreen({ t }: { t: Dictionary['kana'] }) {
  const reduced = useReducedMotion();
  const [katakana, setKatakana] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setKatakana((k) => !k), STEP);
    return () => clearInterval(id);
  }, [reduced]);

  const pill = (active: boolean) =>
    `rounded-full px-[3.6cqw] py-[1.6cqw] text-[3.2cqw] font-semibold transition-colors duration-500 ${
      active ? 'bg-accent text-[#15160F]' : 'border border-white/20 bg-white/[0.08] text-white'
    }`;

  return (
    <Stage glow="#14B8A6">
      <Panel plain x={6} y={6} delay={0.5} z={3} className="flex gap-[1.6cqw]">
        <span className={pill(!katakana)}>{t.hiragana}</span>
        <span className={pill(katakana)}>{t.katakana}</span>
      </Panel>

      <Panel plain x={8} y={25} w={76} tilt="rotateX(28deg) rotateZ(-8deg)">
        <div aria-hidden className="flex flex-col gap-[1.5cqw]">
          {VISIBLE_ROWS.map((row, r) => (
            <div key={r} className="grid grid-cols-5 gap-[1.5cqw]">
              {row.map((cell, c) =>
                cell ? (
                  <div key={cell.kana} className="glass-panel flex flex-col items-center rounded-[2.4cqw] py-[1.5cqw]">
                    <span className="relative block h-[6.6cqw] w-full text-center font-jp text-[5.6cqw] font-medium leading-[6.6cqw]">
                      <Both kana={cell.kana} katakana={katakana} />
                    </span>
                    <span className="text-[2.4cqw] leading-tight text-white/60">{cell.romaji}</span>
                  </div>
                ) : (
                  <span key={`empty-${c}`} />
                ),
              )}
            </div>
          ))}
        </div>
      </Panel>

      <Panel plain x={64} y={5} w={29} z={4} delay={1} tilt="rotateY(-14deg) rotateZ(4deg)">
        <div aria-hidden className="stage-lifted flex aspect-square flex-col items-center justify-center rounded-[6cqw] bg-accent text-[#15160F]">
          <span className="relative block h-[17cqw] w-full text-center font-jp text-[15cqw] font-bold leading-[17cqw]">
            <Both kana={LIFTED.kana} katakana={katakana} />
          </span>
          <span className="text-[3.4cqw] font-semibold">{LIFTED.romaji}</span>
        </div>
      </Panel>
    </Stage>
  );
}
