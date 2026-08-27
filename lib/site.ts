// The single switch that turns the site from pre-launch to launched.
// Flip LAUNCHED to true and fill both URLs on the day the app ships.
export const LAUNCHED = false;
export const APP_STORE_URL = '';
export const PLAY_STORE_URL = '';

// The project's real production alias. NOT yumo-website.vercel.app — Vercel
// subdomains are globally unique and that one belongs to someone else's
// project, so pointing metadataBase and the canonical URL at it sent every
// crawler to a stranger's site. Check `vercel inspect <deployment>` for the
// alias list before changing this.
export const SITE_URL = 'https://yumo-website-sable.vercel.app';
export const SUPPORT_EMAIL = 'sofianeenf85@gmail.com';

// Fails safe: a half-configured launch renders "coming soon" rather than a
// badge linking nowhere.
export function storeState(): 'coming-soon' | 'live' {
  return LAUNCHED && APP_STORE_URL !== '' && PLAY_STORE_URL !== ''
    ? 'live'
    : 'coming-soon';
}
