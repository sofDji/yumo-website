import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yumo — Learn Japanese without opening the app',
  description:
    'A new JLPT word on your Lock Screen every few hours. ~8,000 words, fully offline, no accounts.',
  openGraph: {
    title: 'Yumo — Learn Japanese without opening the app',
    description:
      'A new JLPT word on your Lock Screen every few hours. ~8,000 words, fully offline, no accounts.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
