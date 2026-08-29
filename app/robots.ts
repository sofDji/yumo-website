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
        // Next's build output. Nothing under it is a document, and letting
        // crawlers spend budget on hashed JS chunks helps no one.
        disallow: '/_next/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
