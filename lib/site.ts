// The single switch that turns the site from pre-launch to launched.
// Flip LAUNCHED to true and fill both URLs on the day the app ships.
export const LAUNCHED = false;
export const APP_STORE_URL = '';
export const PLAY_STORE_URL = '';

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

// Fails safe: a half-configured launch renders "coming soon" rather than a
// badge linking nowhere.
export function storeState(): 'coming-soon' | 'live' {
  return LAUNCHED && APP_STORE_URL !== '' && PLAY_STORE_URL !== ''
    ? 'live'
    : 'coming-soon';
}
