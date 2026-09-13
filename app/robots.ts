import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Replaces the old public/robots.txt, which was a flat file that could not
// name the sitemap without hardcoding the domain a second time. Generating it
// keeps one definition of where the site lives.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Deliberately no `disallow: '/_next/'`. That directory holds the CSS,
        // the fonts and the JS every page loads, and Googlebot renders pages
        // before indexing them: block it and Google sees an unstyled document,
        // which it can judge not mobile-friendly. Google's own guidance is to
        // never block rendering resources. Crawl budget is not a concern at
        // seven pages; nothing under /_next/ is linked, so nothing is indexed.
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // No `host:` line. It is a Yandex extension that Google ignores, and an
    // unrecognised directive in robots.txt is noise in a file whose whole job
    // is being unambiguous to a parser.
  };
}
