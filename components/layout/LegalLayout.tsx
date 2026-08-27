import type { ReactNode } from 'react';
import { Footer } from '@/components/chrome/Footer';
import { NavBar } from '@/components/chrome/NavBar';
import { getDictionary, type Locale } from '@/lib/i18n';

export function LegalLayout({
  locale,
  path = '',
  title,
  updated,
  children,
}: {
  locale: Locale;
  /** Path within the locale, so the language switch lands on the counterpart. */
  path?: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  const t = getDictionary(locale);

  return (
    <>
      <NavBar locale={locale} t={t.nav} path={path} />
      <main className="mx-auto w-full max-w-3xl px-6 py-20">
        <h1 className="text-[34px] font-semibold leading-tight tracking-tight">{title}</h1>
        {updated && <p className="mt-2 text-sm text-muted">{updated}</p>}
        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_li]:mb-1.5 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <Footer locale={locale} t={t.footer} />
    </>
  );
}
