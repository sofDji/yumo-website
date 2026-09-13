import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { Landing } from '@/components/Landing';
import { getDictionary } from '@/lib/i18n';
import { shareMetadata } from '@/lib/metadata';
import { homeGraph } from '@/lib/schema';

const t = getDictionary('fr');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: '/fr',
    languages: { en: '/', fr: '/fr', 'x-default': '/' },
  },
  ...shareMetadata({
    locale: 'fr',
    path: '/fr',
    title: t.meta.title,
    description: t.meta.ogDescription,
  }),
};

export default function AccueilFr() {
  return (
    <>
      <JsonLd data={homeGraph('fr', t)} />
      <Landing locale="fr" />
    </>
  );
}
