import type { ReactNode } from 'react';

interface Props {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  lede?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, lede, children, className = '' }: Props) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-6 py-24 md:py-32 ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-14 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-[32px] font-semibold leading-[1.12] tracking-tight md:text-[44px]">
              {title}
            </h2>
          )}
          {lede && <p className="mt-4 max-w-prose text-[17px] leading-relaxed text-muted">{lede}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
