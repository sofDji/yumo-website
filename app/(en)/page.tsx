import type { Metadata } from 'next';
import { Landing } from '@/components/Landing';
import { getDictionary } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

const t = getDictionary('en');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: '/',
    languages: { en: '/', fr: '/fr' },
  },
  openGraph: {
    title: t.meta.title,
    description: t.meta.ogDescription,
    url: `${SITE_URL}/`,
    siteName: 'Yumo',
    locale: 'en_US',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: t.meta.title,
    description: t.meta.ogDescription,
    images: ['/og.png'],
  },
};

export default function Home() {
  return <Landing locale="en" />;
}
