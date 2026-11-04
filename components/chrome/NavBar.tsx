'use client';

import Link from 'next/link';
import { AppleLogo } from '@/components/ui/AppleLogo';
import { Logo } from '@/components/ui/Logo';
import { Pill } from '@/components/ui/Pill';
import { localePath, type Dictionary, type Locale } from '@/lib/i18n';
import { APP_STORE_URL, PLAY_STORE_URL, storeState, type StoreState } from '@/lib/site';
import { LanguageMenu } from './LanguageMenu';

export function NavBar({
  locale,
  t,
  /** Path within the locale, so the language menu lands on the counterpart page
   *  rather than dumping the reader back on the home page. */
  path = '',
}: {
  locale: Locale;
  t: Dictionary['nav'];
  path?: string;
}) {
  const state = storeState();
  // Where the nav's store button goes. With one store it goes straight to that
  // listing and names the platform, so an Android visitor is never sent after
  // an iPhone-only app. With both, one button cannot pick, so it goes to the
  // pricing section, where both store buttons sit.
  const store: Record<Exclude<StoreState, 'coming-soon'>, { href: string; label: string }> = {
    ios: { href: APP_STORE_URL, label: t.getIphone },
    android: { href: PLAY_STORE_URL, label: t.getAndroid },
    live: { href: `${localePath(locale)}#pricing`, label: t.getApp },
  };

  return (
    <div className="sticky top-4 z-50 px-4">
      {/* Three columns with equal sides, so the links sit in the true center
          of the page, however wide the logo and the store button are. */}
      <nav className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Link
          href={localePath(locale)}
          className="justify-self-start rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-md"
          aria-label={t.home}
        >
          <Logo height={22} priority />
        </Link>

        {/* From lg, not md: with five links the French row needs ~830px, more
            than a tablet-width pill has, and a wrapped "Comment ça marche"
            breaks the pill. Below lg the section links are dropped, as on phones. */}
        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-[rgba(30,30,30,.72)] p-1 backdrop-blur-md lg:flex">
          {t.links.map((l) => (
            <li key={l.href}>
              <Link
                href={`${localePath(locale)}${l.href}`}
                className="whitespace-nowrap rounded-full px-3 py-2 text-sm text-muted transition-colors duration-200 hover:bg-ground hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <span className="col-start-3 flex items-center justify-self-end gap-2">
          <LanguageMenu locale={locale} path={path} label={t.language} />
          {state === 'coming-soon' ? (
            <Pill tone="accent">{t.comingSoon}</Pill>
          ) : (
            <Link
              href={store[state].href}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-ground shadow-soft transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:shadow-lift"
            >
              {state === 'ios' && <AppleLogo className="-mt-0.5 h-3.5 w-3.5" />}
              {/* Under 400px the platform label crowds the logo and the language
                  switch ("Télécharger pour iPhone" clips at 320px), so small
                  phones get the short label. The Apple mark still names the platform. */}
              <span className="hidden min-[400px]:inline">{store[state].label}</span>
              <span className="min-[400px]:hidden">{t.getApp}</span>
            </Link>
          )}
        </span>
      </nav>
    </div>
  );
}
