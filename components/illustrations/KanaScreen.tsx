'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { BASIC_ROWS, toKatakana } from '@/lib/kana';
import { AppTabBar, PhoneFrame, StatusBar } from './PhoneFrame';

// Mirrors the app's Kana tab: the Hiragana/Katakana switch, the basic chart
// with romaji under each kana, and the floating nav pill. The chart changes
// script every few seconds. Both scripts are drawn in every cell and only
// their opacity moves, so nothing reflows and a flip costs the page nothing.
const STEP = 2800;

// The cell the illustration presents as tapped, pointing at "tap one to write it".
const TAPPED = 'し';

// あ through ら: what fits above the nav pill without cutting a row in half.
// The screen dissolves at the bottom, so the chart still reads as continuing.
const VISIBLE_ROWS = BASIC_ROWS.slice(0, 9);

export function KanaScreen({ t }: { t: Dictionary['kana'] }) {
  const reduced = useReducedMotion();
  const [katakana, setKatakana] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setKatakana((k) => !k), STEP);
    return () => clearInterval(id);
  }, [reduced]);

  const pill = (active: boolean) =>
    `rounded-full px-3 py-1 text-[9.5px] font-semibold transition-colors duration-500 ${
      active ? 'bg-accent text-[#15160F]' : 'border border-line bg-white/10 text-ink'
    }`;

  return (
    <PhoneFrame bloom="#14B8A6">
      <StatusBar time="9:41" />

      <div className="flex flex-1 flex-col overflow-hidden px-3.5 pb-5 pt-2">
        <p className="mb-3 text-center text-[12px] font-semibold">{t.tabTitle}</p>

        <div aria-hidden className="flex justify-center gap-1.5">
          <span className={pill(!katakana)}>{t.hiragana}</span>
          <span className={pill(katakana)}>{t.katakana}</span>
        </div>

        <p className="mb-2 mt-3 text-[11px] font-semibold">{t.basic}</p>

        <div aria-hidden className="flex min-h-0 flex-1 flex-col gap-1 overflow-hidden">
          {VISIBLE_ROWS.map((row, r) => (
            <div key={r} className="grid grid-cols-5 gap-1">
              {row.map((cell, c) =>
                cell ? (
                  <div
                    key={cell.kana}
                    className={`flex flex-col items-center rounded-[0.5rem] border bg-white/10 py-1 ${
                      cell.kana === TAPPED ? 'border-accent' : 'border-line'
                    }`}
                  >
                    <span className="relative block h-[17px] w-full text-center font-jp text-[14px] font-medium leading-[17px]">
                      <span
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{ opacity: katakana ? 0 : 1 }}
                      >
                        {cell.kana}
                      </span>
                      <span
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{ opacity: katakana ? 1 : 0 }}
                      >
                        {toKatakana(cell.kana)}
                      </span>
                    </span>
                    <span className="text-[7.5px] leading-tight text-muted">{cell.romaji}</span>
                  </div>
                ) : (
                  <span key={`empty-${c}`} />
                ),
              )}
            </div>
          ))}
        </div>

        <AppTabBar active="kana" />
      </div>
    </PhoneFrame>
  );
}
