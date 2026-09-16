'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppleLogo } from '@/components/ui/AppleLogo';
import type { Dictionary } from '@/lib/i18n';
import { STORE_NAME, STORE_URL, bannerStore, type Store } from '@/lib/site';

const DISMISSED_KEY = 'yumo.appBanner.dismissed';

// A floating install card along the bottom edge, modelled on Safari's Smart
// App Banner: icon, listing name, a Get button and a close button. It follows
// the scroll, but steps aside whenever one of the page's own store buttons is
// on screen: on a phone the hero's "Download for iPhone" sits right where the
// card would land, and two install buttons stacked on each other is one too
// many.
//
// Which store it offers is decided in the browser (see bannerStore), so the
// static HTML ships without it and it slides in after hydration.
export function AppBanner({ t }: { t: Dictionary['appBanner'] }) {
  const [store, setStore] = useState<Store | null>(null);
  const [dismissed, setDismissed] = useState(true);
  const [ctaOnScreen, setCtaOnScreen] = useState(true);

  useEffect(() => {
    // Browser storage can be unavailable (private mode, blocked site data).
    // Without it the banner just shows again next visit.
    let seen = false;
    try {
      seen = localStorage.getItem(DISMISSED_KEY) === '1';
    } catch {}
    setDismissed(seen);
    setStore(bannerStore(navigator.userAgent));
  }, []);

  useEffect(() => {
    const ctas = document.querySelectorAll('[data-store-cta]');
    if (ctas.length === 0) {
      setCtaOnScreen(false);
      return;
    }
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setCtaOnScreen(onScreen.size > 0);
    });
    ctas.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (store === null || dismissed) return null;

  const visible = !ctaOnScreen;
  // "Yumo: Japanese On Lock Screen" is too long for one line beside the button
  // on a phone. It is set out the way the App Store sets out a listing: the app
  // name, with the rest of the title as a subtitle.
  const [name, subtitle] = STORE_NAME[store].split(': ');

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISSED_KEY, '1');
    } catch {}
  }

  return (
    <>
      {/* Keeps the footer's last line clear of the card at the bottom of the page. */}
      <div aria-hidden className="h-24" />

      <div
        role="region"
        aria-label={t.label}
        inert={!visible}
        className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
        }`}
      >
        <div className="flex w-full max-w-md items-center gap-2.5 rounded-[22px] border border-line bg-[rgba(255,252,246,0.9)] p-2.5 shadow-lift backdrop-blur-xl">
          <Image
            src="/app-icon.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-[11px]"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold leading-tight text-ink">{name}</p>
            <p className="mt-0.5 truncate text-[13px] leading-tight text-muted">{subtitle}</p>
          </div>

          <Link
            href={STORE_URL[store]}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-sm font-semibold text-ground transition-transform duration-300 hover:-translate-y-px"
          >
            {store === 'ios' && <AppleLogo className="-mt-0.5 h-3.5 w-3.5" />}
            {t.get}
          </Link>

          <button
            type="button"
            onClick={dismiss}
            aria-label={t.dismiss}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-ground hover:text-ink"
          >
            <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
