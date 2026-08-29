import type { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/routes';
import { SITE_URL } from '@/lib/site';

// `output: 'export'` still runs this — Next writes the result to
// out/sitemap.xml at build time rather than serving it from a route handler.
// Which also means lastModified is the build date: honest for a site whose
// content only changes when it is rebuilt and redeployed.
export const dynamic = 'force-static';

// No `alternates` here, deliberately. Next emits hreflang as <xhtml:link>
// immediately after <loc>, but the sitemap XSD declares <url> as the strict
// sequence loc, lastmod, changefreq, priority — with the wildcard that admits
// foreign-namespace elements only at the END. Injecting xhtml:link after loc
// breaks that sequence, and a validator reports the following <lastmod> as
// "not expected". Google Search Console read the file and answered "Sitemap
// could not be read".
//
// Dropping it costs nothing: hreflang is already declared in every page's
// <head> via alternates.languages in the route metadata, and Google treats the
// HTML-tag and sitemap forms as equivalent — either alone is sufficient. The
// pages are static HTML, so the tags are read without rendering.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route.priority,
  }));
}
