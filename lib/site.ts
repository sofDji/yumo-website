// Where Yumo is on sale. Each store's listing is its own launch switch: an
// empty value means the app is not on that store yet, and nothing on the site
// (buttons, the nav button, the floating banner, the JSON-LD, the Smart App
// Banner) links to it or claims it. Fill PLAY_STORE_URL on the day Google Play
// goes live.
//
// The App Store link carries no country segment, so Apple sends every visitor
// to their own storefront and one URL serves the English and French pages.
//
// Typed as string rather than left as literals: TypeScript rejects comparing a
// literal with '' as impossible, so filling or clearing a listing would
// otherwise break the build in every file that checks for it.
export const APP_STORE_ID: string = '6805975318';
export const APP_STORE_URL: string =
  APP_STORE_ID === '' ? '' : `https://apps.apple.com/app/id${APP_STORE_ID}`;
export const PLAY_STORE_URL: string = '';

// The apex domain, and the only URL that may appear in a canonical tag.
// Everything else Vercel answers on — the *.vercel.app aliases, preview
// deployments — 307s here, so naming one of those instead points crawlers at a
// redirect and hands the ranking signal to a hostname we don't own long-term.
// Must be the scheme + host with no trailing slash; metadataBase joins paths.
//
// www.yumo.lol resolves here too, via the wildcard DNS record, and is 308'd
// back to the apex by the redirect in vercel.json. That redirect is not
// optional decoration: without it the same document answers on two hostnames,
// which is the duplicate-content split this constant exists to prevent. It
// lives in vercel.json rather than next.config because `output: 'export'`
// leaves no server to run a Next redirect.
export const SITE_URL = 'https://yumo.lol';
export const SUPPORT_EMAIL = 'sofianeenf85@gmail.com';

// Yumo's public profiles. The footer links them, and the Organization node in
// lib/schema lists them as sameAs — which is how search engines tie these
// accounts to this site instead of treating them as unrelated namesakes.
// Handles carry no leading @; each URL is the profile's canonical form.
export const SOCIAL = {
  instagram: {
    name: 'Instagram',
    handle: 'japaneseyumo',
    url: 'https://www.instagram.com/japaneseyumo/',
  },
  tiktok: {
    name: 'TikTok',
    handle: 'japaneseyumo',
    url: 'https://www.tiktok.com/@japaneseyumo',
  },
  x: {
    name: 'X',
    handle: 'dji1380910',
    url: 'https://x.com/dji1380910',
  },
} as const;

export type SocialNetwork = keyof typeof SOCIAL;

// Yumo Pro's one-time price. Shared by the pricing card and the JSON-LD offer
// so structured data can never quote a number the page itself doesn't show —
// a mismatch Google treats as misleading markup, not a typo.
//
// Must match PRO_PRICE_LABEL in the app and the product tier set in App Store
// Connect and Play Console. Those consoles are what customers are actually
// charged; this is only what the site claims.
export const PRO_PRICE = '8.99';
export const PRO_PRICE_LABEL = '$8.99';
export const PRICE_CURRENCY = 'USD';

export type StoreState = 'coming-soon' | 'ios' | 'android' | 'live';

// Derived from the listings rather than set by hand, so the site can never
// announce a store it has no link for. The arguments default to the real
// listings; tests pass their own to cover every combination.
export function storeState(ios = APP_STORE_URL, android = PLAY_STORE_URL): StoreState {
  if (ios !== '' && android !== '') return 'live';
  if (ios !== '') return 'ios';
  if (android !== '') return 'android';
  return 'coming-soon';
}

/** The listings that exist, App Store first. */
export function storeUrls(): string[] {
  return [APP_STORE_URL, PLAY_STORE_URL].filter((url) => url !== '');
}

export type Store = 'ios' | 'android';

export const STORE_URL: Record<Store, string> = { ios: APP_STORE_URL, android: PLAY_STORE_URL };

// Each listing's title exactly as its store shows it. They differ on purpose:
// Android has no Lock Screen widgets, so Play's title says "Word Widget".
export const STORE_NAME: Record<Store, string> = {
  ios: 'Yumo: Japanese On Lock Screen',
  android: 'Yumo: Japanese Word Widget',
};

/**
 * The store the floating banner offers this visitor, or null for no banner.
 * A phone is only ever offered its own store: an Android phone that meets an
 * iPhone-only launch gets nothing, rather than an App Store link it cannot
 * use. Desktop visitors are offered whichever store is live, the App Store
 * first.
 */
export function bannerStore(userAgent: string, state: StoreState = storeState()): Store | null {
  const android = /Android/i.test(userAgent);
  const ios = /iPhone|iPad|iPod/i.test(userAgent);

  switch (state) {
    case 'coming-soon':
      return null;
    case 'ios':
      return android ? null : 'ios';
    case 'android':
      return ios ? null : 'android';
    case 'live':
      return android ? 'android' : 'ios';
  }
}
