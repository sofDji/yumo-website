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
      <body>{children}</body>
    </html>
  );
}
