'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

function Arrow({ direction, label, disabled, onClick }: { direction: 'prev' | 'next'; label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      data-slider={direction}
      className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.05] text-ink transition-opacity duration-200 hover:bg-white/10 disabled:cursor-default disabled:opacity-30"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  );
}

// A row that swipes natively on a phone and snaps card by card. The arrows move
// by one card, for anyone without a touchscreen or a trackpad.
export function ReviewSlider({ children, prev, next }: { children: ReactNode; prev: string; next: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const move = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <div className="mt-12">
      <div
        ref={track}
        onScroll={update}
        data-review-track
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
        {children}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Arrow direction="prev" label={prev} disabled={atStart} onClick={() => move(-1)} />
        <Arrow direction="next" label={next} disabled={atEnd} onClick={() => move(1)} />
      </div>
    </div>
  );
}
