import type { Metadata } from 'next';
import { Instrument_Serif, Schibsted_Grotesk, Zen_Kaku_Gothic_New } from 'next/font/google';
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

const jp = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yumo — Japanese on your Lock Screen',
  description:
    'A new JLPT word on your Lock Screen and Home Screen every few hours. 7,972 words, fully offline, no accounts, no tracking.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${jp.variable}`}>
      <body>{children}</body>
    </html>
  );
}
