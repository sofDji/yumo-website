import { Instrument_Serif, Schibsted_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n';

const sans = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-serif',
  display: 'swap',
});

// One <html> per locale is why the app uses two root layouts rather than one:
// a French page served as lang="en" makes screen readers pronounce it with an
// English voice, and Next only lets the root layout own the html element.
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable}`}>
      <body>
        {children}

        {/*
          Vercel Web Analytics, as the script tag rather than @vercel/analytics.
          The package will not install here: it declares an optional peer on
          @sveltejs/kit, npm tries to satisfy it anyway, and SvelteKit's
          toolchain wants vite@8 while vitest holds vite@5. Forcing past that
          locally would leave Vercel's own `npm install` resolving the same
          impossible tree at build time.

          Nothing is lost. This is the file the package injects, and it is
          already served from the project. The package's one real advantage is
          reporting route patterns (/blog/[slug]) in place of raw paths, which
          needs dynamic segments to mean anything — this site has six static
          routes. The script patches the history API itself, so client-side
          navigation between them is still counted.
        */}
        <script defer src="/_vercel/insights/script.js" />
      </body>
    </html>
  );
}
