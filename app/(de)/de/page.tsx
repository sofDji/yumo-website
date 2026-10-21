import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { Landing } from '@/components/Landing';
import { getDictionary } from '@/lib/i18n';
import { shareMetadata } from '@/lib/metadata';
import { hreflang } from '@/lib/routes';
import { homeGraph } from '@/lib/schema';

const t = getDictionary('de');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: '/de',
    languages: hreflang(''),
  },
  ...shareMetadata({
    locale: 'de',
    path: '/de',
    title: t.meta.title,
    description: t.meta.ogDescription,
  }),
};

export default function StartseiteDe() {
  return (
    <>
      <JsonLd data={homeGraph('de', t)} />
      <Landing locale="de" />
    </>
  );
}
