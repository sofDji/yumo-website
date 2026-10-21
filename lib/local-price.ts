// Yumo Pro's price as the visitor's own App Store will show it.
//
// The site is a static export, so there is no server to read a country from
// the request, and asking a geo-IP service would send every visitor's address
// to a third party — on a page whose pitch is that nothing is collected. The
// device already knows where it is: its time zone names a country for almost
// everyone, and the browser's language region covers the rest (UTC, VPS-style
// setups). Nothing leaves the browser.
//
// Pages render the US price first — that is what the static HTML, crawlers and
// the JSON-LD offer carry — and swap in the local one after hydration.

import { APP_STORE_PRICES } from './app-store-prices';
import { LOCALE_TAG, type Locale } from './i18n/locales';
import { TIMEZONE_COUNTRY } from './timezones';

export type StorePrice = { currency: string; amount: number };

function toPrice(entry: readonly [string, number]): StorePrice {
  return { currency: entry[0], amount: entry[1] };
}

/** The US storefront: the default, and the one the JSON-LD offer quotes. */
export const DEFAULT_PRICE = toPrice(APP_STORE_PRICES.US);

/** ISO country code for a time zone, falling back to the first language with a region. */
export function detectCountry(
  timeZone: string | undefined,
  languages: readonly string[],
): string | undefined {
  const fromZone = timeZone ? TIMEZONE_COUNTRY[timeZone] : undefined;
  if (fromZone) return fromZone;

  for (const tag of languages) {
    const region = /-([A-Za-z]{2})(?:-|$)/.exec(tag)?.[1];
    if (region) return region.toUpperCase();
  }
  return undefined;
}

/** The storefront price for a country; the US one where Yumo has no storefront. */
export function priceFor(country: string | undefined): StorePrice {
  const entry = country ? APP_STORE_PRICES[country] : undefined;
  return entry ? toPrice(entry) : DEFAULT_PRICE;
}

/**
 * Formatted in the page's language: the same 9.99 EUR reads €9.99 on the
 * English page and 9,99 € on the French one. Whole amounts drop the decimals
 * (¥1,500, CHF 8, 3 990 Ft).
 */
export function formatPrice({ currency, amount }: StorePrice, locale: Locale): string {
  const digits = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

/** The visitor's storefront price, read from the browser. Client only. */
export function browserPrice(): StorePrice {
  let timeZone: string | undefined;
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    timeZone = undefined;
  }
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return priceFor(detectCountry(timeZone, languages));
}
