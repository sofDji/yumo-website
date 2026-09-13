import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { Landing } from '@/components/Landing';
import { getDictionary } from '@/lib/i18n';
import { shareMetadata } from '@/lib/metadata';
import { homeGraph } from '@/lib/schema';

const t = getDictionary('en');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: '/',
    languages: { en: '/', fr: '/fr', 'x-default': '/' },
  },
  ...shareMetadata({
    locale: 'en',
    path: '/',
    title: t.meta.title,
    description: t.meta.ogDescription,
  }),
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph('en', t)} />
      <Landing locale="en" />
    </>
  );
}
