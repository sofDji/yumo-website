import type { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/routes';
import { SITE_URL } from '@/lib/site';

// `output: 'export'` still runs this — Next writes the result to
// out/sitemap.xml at build time rather than serving it from a route handler.
// Which also means lastModified is the build date: honest for a site whose
// content only changes when it is rebuilt and redeployed.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route.priority,
    ...(Object.keys(route.alternates).length > 0 && {
      alternates: {
        languages: Object.fromEntries(
          Object.entries(route.alternates).map(([lang, path]) => [lang, `${SITE_URL}${path}`]),
        ),
      },
    }),
  }));
}
