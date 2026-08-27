'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pill } from '@/components/ui/Pill';
import { storeState } from '@/lib/site';

const LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#features', label: 'Features' },
  { href: '/#levels', label: 'Levels' },
  { href: '/#pricing', label: 'Pricing' },
];

export function NavBar() {
  return (
    <div className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-3xl items-center gap-2 rounded-full border border-line bg-[rgba(255,252,246,0.72)] p-2 shadow-soft backdrop-blur-xl">
        <Link href="/" className="shrink-0" aria-label="Yumo home">
          <Image src="/logo.png" alt="Yumo" width={36} height={36} className="rounded-xl" priority />
        </Link>

        <ul className="ml-1 hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-muted transition-colors duration-200 hover:bg-ground hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <span className="ml-auto pr-1">
          <Pill tone="accent">{storeState() === 'live' ? 'Available now' : 'Coming soon'}</Pill>
        </span>
      </nav>
    </div>
  );
}
