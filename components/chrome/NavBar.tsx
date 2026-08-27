'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pill } from '@/components/ui/Pill';
import { localePath, type Dictionary, type Locale } from '@/lib/i18n';
import { LOCALE_LABEL, LOCALES } from '@/lib/i18n/locales';
import { storeState } from '@/lib/site';

export function NavBar({
  locale,
  t,
  /** Path within the locale, so the switch lands on the counterpart page
   *  rather than dumping the reader back on the home page. */
  path = '',
}: {
  locale: Locale;
  t: Dictionary['nav'];
  path?: string;
}) {
  const other = LOCALES.find((l) => l !== locale) as Locale;

  return (
    <div className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-3xl items-center gap-2 rounded-full border border-line bg-[rgba(255,252,246,0.72)] p-2 shadow-soft backdrop-blur-xl">
        <Link href={localePath(locale)} className="shrink-0" aria-label={t.home}>
          <Image src="/logo.png" alt="Yumo" width={36} height={36} className="rounded-xl" priority />
        </Link>

        <ul className="ml-1 hidden items-center gap-1 md:flex">
          {t.links.map((l) => (
            <li key={l.href}>
              <Link
                href={`${localePath(locale)}${l.href}`}
                className="rounded-full px-3 py-2 text-sm text-muted transition-colors duration-200 hover:bg-ground hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <span className="ml-auto flex items-center gap-2 pr-1">
          <Link
            href={localePath(other, path)}
            hrefLang={other}
            aria-label={t.switchTo}
            className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold tracking-wide text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          >
            {LOCALE_LABEL[other]}
          </Link>
          <Pill tone="accent">
            {storeState() === 'live' ? t.availableNow : t.comingSoon}
          </Pill>
        </span>
      </nav>
    </div>
  );
}
