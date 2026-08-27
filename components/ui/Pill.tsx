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
    accent: 'border-accent/25 bg-accent/10 text-accent',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
