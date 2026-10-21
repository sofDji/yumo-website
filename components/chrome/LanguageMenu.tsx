'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import {
  LOCALE_CHOICE_KEY,
  LOCALE_LABEL,
  LOCALE_NAME,
  LOCALES,
  localePath,
  type Locale,
} from '@/lib/i18n/locales';

// The nav's language switch. With two locales it was a single link to the
// other one; with five a link per language would not fit the pill on a phone,
// so the current language's short label opens a list of all of them, each
// named in its own language — a reader looking for theirs will not recognise
// "Korean" written in French.
export function LanguageMenu({
  locale,
  path,
  label,
}: {
  locale: Locale;
  /** Path within the locale, so each choice lands on the counterpart page. */
  path: string;
  /** Accessible name for the button, in the current language. */
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs font-semibold tracking-wide text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent aria-expanded:border-accent/40 aria-expanded:text-accent"
      >
        {LOCALE_LABEL[locale]}
        <svg
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={`h-1.5 w-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul
        id={listId}
        hidden={!open}
        className="absolute right-0 top-full mt-2 min-w-[9.5rem] rounded-2xl border border-line bg-surface p-1.5 shadow-lift"
      >
        {LOCALES.map((l) => (
          <li key={l}>
            <Link
              href={localePath(l, path)}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? 'page' : undefined}
              onClick={() => {
                setOpen(false);
                // An explicit choice outranks every guess the English pages
                // make on arrival, English included. Private modes may refuse.
                try {
                  localStorage.setItem(LOCALE_CHOICE_KEY, l);
                } catch {}
              }}
              className="flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-sm text-ink transition-colors duration-200 hover:bg-ground aria-[current=page]:font-semibold aria-[current=page]:text-accent"
            >
              {LOCALE_NAME[l]}
              <span className="text-[11px] font-semibold tracking-wide text-muted">
                {LOCALE_LABEL[l]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
