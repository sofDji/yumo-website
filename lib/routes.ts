import { LOCALES, LOCALISED_ROUTES, localePath } from './i18n/locales';

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

/** Every language version of a localised page, keyed by its hreflang code. */
function versions(page: (typeof LOCALISED_ROUTES)[number]): Record<string, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, page === '' && locale === 'en' ? '' : localePath(locale, page)]),
  );
}

/**
 * The `alternates.languages` a localised page declares: every version,
 * itself included, plus x-default on the English one for visitors whose
 * language is none of them.
 */
export function hreflang(page: (typeof LOCALISED_ROUTES)[number]): Record<string, string> {
  return {
    ...Object.fromEntries(LOCALES.map((locale) => [locale, localePath(locale, page)])),
    'x-default': localePath('en', page),
  };
}

const LOCALISED: Route[] = LOCALISED_ROUTES.flatMap((page) => {
  const alternates = versions(page);
  return Object.values(alternates).map((path) => ({
    path,
    alternates,
    priority: page === '' ? 1 : 0.6,
  }));
});

export const ROUTES: Route[] = [
  ...LOCALISED,
  // Reference content. Ranked above the legal pages and below the home page:
  // it is the only thing on the site someone might search for without already
  // knowing the product exists.
  { path: '/jlpt/n5', alternates: {}, priority: 0.8 },
  // Privacy and Terms are English-only for now: there is no /fr/privacy to
  // point at, and claiming one that 404s is worse than claiming none.
  { path: '/privacy', alternates: {}, priority: 0.3 },
  { path: '/terms', alternates: {}, priority: 0.3 },
];
