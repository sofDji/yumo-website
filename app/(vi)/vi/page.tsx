import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { Landing } from '@/components/Landing';
import { getDictionary } from '@/lib/i18n';
import { shareMetadata } from '@/lib/metadata';
import { hreflang } from '@/lib/routes';
import { homeGraph } from '@/lib/schema';

const t = getDictionary('vi');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: '/vi',
    languages: hreflang(''),
  },
  ...shareMetadata({
    locale: 'vi',
    path: '/vi',
    title: t.meta.title,
    description: t.meta.ogDescription,
  }),
};

export default function HomeVi() {
  return (
    <>
      <JsonLd data={homeGraph('vi', t)} />
      <Landing locale="vi" />
    </>
  );
}
