import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
}

const base =
  'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';

const styles = {
  primary: 'bg-ink text-ground shadow-soft hover:-translate-y-0.5 hover:shadow-lift',
  ghost:
    'border border-line bg-surface/70 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft',
};

export function Button({ href, children, variant = 'primary' }: Props) {
  const cls = `${base} ${styles[variant]}`;
  const inner = (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (!href) {
    return <span className={`${cls} cursor-default`}>{inner}</span>;
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
