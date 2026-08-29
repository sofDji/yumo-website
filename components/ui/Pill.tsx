import type { ReactNode } from 'react';

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'accent';
}) {
  const tones = {
    neutral: 'border-line bg-surface/70 text-muted',
    // /5 rather than /10. Accent text on a 10% accent wash over the ground
    // colour composites to 4.31:1, just under the 4.5 WCAG AA needs for text
    // this size; halving the tint lifts it to 4.63 and leaves the brand colour
    // itself untouched, which darkening the text would not.
    accent: 'border-accent/25 bg-accent/5 text-accent',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
