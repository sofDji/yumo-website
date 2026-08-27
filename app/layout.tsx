import type { Metadata } from 'next';
import { Instrument_Serif, Schibsted_Grotesk } from 'next/font/google';
import { SITE_URL } from '@/lib/site';
import './globals.css';

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Yumo — Japanese on your Lock Screen',
  description:
    'A new JLPT word on your Lock Screen and Home Screen every few hours. 7,972 words, fully offline, no accounts, no tracking.',
  openGraph: {
    title: 'Yumo — Japanese on your Lock Screen',
    description:
      'A new JLPT word every few hours. 7,972 words, fully offline, no accounts.',
    url: SITE_URL,
    siteName: 'Yumo',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yumo — Japanese on your Lock Screen',
    description: 'A new JLPT word every few hours. Fully offline, no accounts.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
