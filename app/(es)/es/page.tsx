import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { Landing } from '@/components/Landing';
import { getDictionary } from '@/lib/i18n';
import { shareMetadata } from '@/lib/metadata';
import { hreflang } from '@/lib/routes';
import { homeGraph } from '@/lib/schema';

const t = getDictionary('es');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: '/es',
    languages: hreflang(''),
  },
  ...shareMetadata({
    locale: 'es',
    path: '/es',
    title: t.meta.title,
    description: t.meta.ogDescription,
  }),
};

export default function InicioEs() {
  return (
    <>
      <JsonLd data={homeGraph('es', t)} />
      <Landing locale="es" />
    </>
  );
}
