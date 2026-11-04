import { Be_Vietnam_Pro, Geist, Instrument_Serif, Lora } from 'next/font/google';
import type { ReactNode } from 'react';
import { AppBanner } from '@/components/chrome/AppBanner';
import { getDictionary, type Locale } from '@/lib/i18n';
import { redirectScript } from '@/lib/i18n/detect';

const sans = Geist({
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

// Neither face above has Vietnamese glyphs, and letting the browser fall back
// letter by letter breaks words apart mid-syllable. So Vietnamese pages get
// their own pair, under the same CSS variables, and never preload on the others.
const viSans = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
  preload: false,
});

const viSerif = Lora({
  subsets: ['latin', 'vietnamese'],
  style: 'italic',
  variable: '--font-serif',
  display: 'swap',
  preload: false,
});

// One <html> per locale is why the app uses a root layout per locale rather
// than one: a French page served as lang="en" makes screen readers pronounce it with an
// English voice, and Next only lets the root layout own the html element.
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html
      lang={locale}
      className={locale === 'vi' ? `${viSans.variable} ${viSerif.variable}` : `${sans.variable} ${serif.variable}`}
    >
      {/* English is the unprefixed default every visitor lands on, so only its
          pages carry the script that moves a first visit to the visitor's own
          language. Inline and in the head, so it runs before anything paints.
          See lib/i18n/detect.ts. */}
      {locale === 'en' && (
        <head>
          <script dangerouslySetInnerHTML={{ __html: redirectScript() }} />
        </head>
      )}
      <body>
        {children}

        {/* Here rather than per page, so every page, legal ones included, offers the app. */}
        <AppBanner t={getDictionary(locale).appBanner} />

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
