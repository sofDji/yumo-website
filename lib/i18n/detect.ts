// Sends a first-time visitor on the English pages to their own language.
//
// Static export, so no server reads Accept-Language or the request's country.
// The decision runs in the browser instead, as an inline script in the head of
// the English pages, before anything paints — a redirect after hydration would
// flash the English page first.
//
// The order:
//   1. A language the visitor picked in the menu, remembered in localStorage.
//      English included: someone who switched back to English stays there.
//   2. The browser's own language list. An English phone in Paris belongs to
//      someone who reads English; a Korean phone in Seoul gets Korean.
//   3. The country the device's time zone names, for a browser whose languages
//      are none the site has (a Japanese phone in France gets French).
// Crawlers are never moved, so each language keeps its own indexed URL.

import { TIMEZONE_COUNTRY } from '../timezones';
import { LOCALE_CHOICE_KEY, LOCALES, LOCALISED_ROUTES, localePath, type Locale } from './locales';

// Countries whose visitors get a non-English locale when their browser doesn't
// say. French and Spanish follow official-language status; Belgium and
// Switzerland go to their largest language the site has.
const COUNTRY_LOCALE: Record<string, Exclude<Locale, 'en'>> = {
  ...Object.fromEntries(
    ['FR', 'BE', 'LU', 'MC', 'SN', 'CI', 'CM', 'BJ', 'BF', 'ML', 'NE', 'TD', 'GA', 'CG', 'CD', 'MG', 'TG', 'GN', 'HT'].map(
      (c) => [c, 'fr'],
    ),
  ),
  ...Object.fromEntries(['DE', 'AT', 'CH', 'LI'].map((c) => [c, 'de'])),
  ...Object.fromEntries(
    ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR', 'GQ'].map(
      (c) => [c, 'es'],
    ),
  ),
  KR: 'ko',
  VN: 'vi',
};

/** Time zone -> locale, only for zones whose country maps to one. */
export const TIMEZONE_LOCALE: Record<string, string> = Object.fromEntries(
  Object.entries(TIMEZONE_COUNTRY)
    .filter(([, country]) => country in COUNTRY_LOCALE)
    .map(([zone, country]) => [zone, COUNTRY_LOCALE[country]]),
);

export type DetectInput = {
  /** The remembered menu choice, if any. */
  stored: string | null;
  languages: readonly string[];
  timeZone: string | undefined;
  userAgent: string;
};

/**
 * The locale to show, or null to stay on English. Pure and self-contained —
 * it references nothing outside its arguments — because it is also serialised
 * into the inline head script with Function.prototype.toString.
 */
export function pickLocale(
  input: DetectInput,
  locales: readonly string[],
  timeZoneLocale: Record<string, string>,
): string | null {
  if (/bot|crawl|spider|slurp|lighthouse|preview|facebookexternalhit/i.test(input.userAgent)) {
    return null;
  }
  if (input.stored && locales.indexOf(input.stored) !== -1) {
    return input.stored === 'en' ? null : input.stored;
  }
  for (let i = 0; i < input.languages.length; i++) {
    const base = input.languages[i].toLowerCase().split('-')[0];
    if (locales.indexOf(base) !== -1) return base === 'en' ? null : base;
  }
  const fromZone = input.timeZone ? timeZoneLocale[input.timeZone] : undefined;
  return fromZone || null;
}

/**
 * The inline script for the English pages. It maps the current English path
 * to its counterpart and replaces the history entry, so Back does not bounce
 * the visitor straight into another redirect.
 */
export function redirectScript(): string {
  // '/' -> { ko: '/ko', ... }, '/support' -> { ko: '/ko/support', ... }
  const targets = Object.fromEntries(
    LOCALISED_ROUTES.map((page) => [
      localePath('en', page),
      Object.fromEntries(LOCALES.filter((l) => l !== 'en').map((l) => [l, localePath(l, page)])),
    ]),
  );

  return `(function(){try{
var t=${JSON.stringify(targets)}[location.pathname.replace(/(.)\\/$/,'$1')];if(!t)return;
var s=null;try{s=localStorage.getItem(${JSON.stringify(LOCALE_CHOICE_KEY)})}catch(e){}
var z;try{z=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}
var l=(${pickLocale.toString()})({stored:s,languages:navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''],timeZone:z,userAgent:navigator.userAgent},${JSON.stringify(LOCALES)},${JSON.stringify(TIMEZONE_LOCALE)});
if(l&&t[l])location.replace(t[l]+location.search+location.hash);
}catch(e){}})();`;
}
