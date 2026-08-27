import type { Metadata } from 'next';
import { Landing } from '@/components/Landing';
import { getDictionary } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

const t = getDictionary('fr');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: '/fr',
    languages: { en: '/', fr: '/fr' },
  },
  openGraph: {
    title: t.meta.title,
    description: t.meta.ogDescription,
    url: `${SITE_URL}/fr`,
    siteName: 'Yumo',
    locale: 'fr_FR',
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

export default function AccueilFr() {
  return <Landing locale="fr" />;
}
