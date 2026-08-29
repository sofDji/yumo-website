// Every indexable route the site ships, and how the locales pair up.
//
// This is the single source the sitemap and the hreflang tags read from, so a
// page added under app/ without a line here is a page Google never hears
// about. `alternates` is the full set of language versions of one document —
// each entry lists itself, because hreflang is reciprocal: a page that names
// its French twin without the French page naming it back is a broken pair and
// Google drops both.

export type Route = {
  /** Path as served, no trailing slash. The home page is the empty string. */
  path: string;
  /** Language versions of this same document, keyed by hreflang code. */
  alternates: Record<string, string>;
  /**
   * Relative weight within the site. Only meaningful compared to the site's
   * own other pages — it says nothing to Google about ranking against anyone
   * else, so the legal pages sit low simply because they are not the point.
   */
  priority: number;
};

const BILINGUAL = { en: '', fr: '/fr' } as const;
const BILINGUAL_SUPPORT = { en: '/support', fr: '/fr/support' } as const;

export const ROUTES: Route[] = [
  { path: '', alternates: BILINGUAL, priority: 1 },
  { path: '/fr', alternates: BILINGUAL, priority: 1 },
  { path: '/support', alternates: BILINGUAL_SUPPORT, priority: 0.6 },
  { path: '/fr/support', alternates: BILINGUAL_SUPPORT, priority: 0.6 },
  // Privacy and Terms are English-only for now: there is no /fr/privacy to
  // point at, and claiming one that 404s is worse than claiming none.
  { path: '/privacy', alternates: {}, priority: 0.3 },
  { path: '/terms', alternates: {}, priority: 0.3 },
];
