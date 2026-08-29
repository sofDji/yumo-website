import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { Landing } from '@/components/Landing';
import { getDictionary } from '@/lib/i18n';
import { homeGraph } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

const t = getDictionary('fr');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: '/fr',
    languages: { en: '/', fr: '/fr', 'x-default': '/' },
  },
  openGraph: {
    title: t.meta.title,
    description: t.meta.ogDescription,
    url: `${SITE_URL}/fr`,
    siteName: 'Yumo',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-fr.png',
        width: 1200,
        height: 630,
        alt: "Yumo affichant un mot japonais sur l'écran de verrouillage d'un iPhone",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: t.meta.title,
    description: t.meta.ogDescription,
    images: ['/og-fr.png'],
  },
};

export default function AccueilFr() {
  return (
    <>
      <JsonLd data={homeGraph('fr', t)} />
      <Landing locale="fr" />
    </>
  );
}
