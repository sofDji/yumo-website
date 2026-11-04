import type { CSSProperties, ReactNode } from 'react';

// The site's illustrations: Yumo's features floating as frosted glass in a dark,
// glowing space, with no device around them. Every size inside is in cqw (a
// percentage of the stage's width), so a scene is the same at any width.
export function Stage({ children, glow = '#10B981', className = '' }: { children: ReactNode; glow?: string; className?: string }) {
  return (
    <div className={`future-stage relative mx-auto aspect-[1/1.04] w-full max-w-[540px] text-white ${className}`} style={{ '--glow': glow } as CSSProperties}>
      <div aria-hidden className="stage-light" />
      <div className="absolute inset-0 [perspective:90cqw]">{children}</div>
    </div>
  );
}

// One floating object. The outer box tilts it in space; the inner one drifts, so
// the two transforms never fight.
export function Panel({
  x,
  y,
  w,
  tilt = '',
  delay = 0,
  z,
  children,
  className = '',
  plain = false,
}: {
  x: number;
  y: number;
  w?: number;
  tilt?: string;
  delay?: number;
  z?: number;
  children: ReactNode;
  className?: string;
  /** No glass: for type floating straight in the space. */
  plain?: boolean;
}) {
  return (
    <div
      className="absolute [transform-style:preserve-3d]"
      style={{ left: `${x}%`, top: `${y}%`, width: w ? `${w}%` : undefined, transform: tilt || undefined, zIndex: z }}
    >
      <div className={`stage-drift ${plain ? '' : 'glass-panel'} ${className}`} style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}

// Generic glyphs on coloured tiles, for the small home screen in "How it works".
const GLYPHS = [
  'M9 18V6l10-2v12M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3Zm10-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z',
  'M4 8h3l2-3h6l2 3h3v11H4zM12 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
  'M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  'M3 6h18v13H3zM3 7l9 7 9-7',
  'M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.6 1.5A3.3 3.3 0 0 1 17.5 18Z',
  'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  'M4 5h16v11H9l-5 4Z',
  'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2',
];

export function Tile({ i = 0, className = '' }: { i?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-[24%] border border-white/15 bg-white/[0.07] ${className}`}>
      <svg viewBox="0 0 24 24" className="h-[56%] w-[56%]" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={GLYPHS[i % GLYPHS.length]} />
      </svg>
    </div>
  );
}
