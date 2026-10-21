import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { Landing } from '@/components/Landing';
import { getDictionary } from '@/lib/i18n';
import { shareMetadata } from '@/lib/metadata';
import { hreflang } from '@/lib/routes';
import { homeGraph } from '@/lib/schema';

const t = getDictionary('ko');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: '/ko',
    languages: hreflang(''),
  },
  ...shareMetadata({
    locale: 'ko',
    path: '/ko',
    title: t.meta.title,
    description: t.meta.ogDescription,
  }),
};

export default function HomeKo() {
  return (
    <>
      <JsonLd data={homeGraph('ko', t)} />
      <Landing locale="ko" />
    </>
  );
}
