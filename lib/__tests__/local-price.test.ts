import { describe, expect, it } from 'vitest';
import { APP_STORE_PRICES } from '../app-store-prices';
import { DEFAULT_PRICE, detectCountry, formatPrice, priceFor } from '../local-price';
import { PRICE_CURRENCY, PRO_PRICE } from '../site';
import { TIMEZONE_COUNTRY } from '../timezones';

describe('App Store price table', () => {
  it('agrees with the US price the JSON-LD offer quotes', () => {
    // The static page and the structured data both show the US storefront;
    // a re-exported CSV that moves it must move lib/site too.
    expect(DEFAULT_PRICE).toEqual({ currency: PRICE_CURRENCY, amount: Number(PRO_PRICE) });
  });

  it('covers every storefront in the export', () => {
    expect(Object.keys(APP_STORE_PRICES)).toHaveLength(175);
    for (const [code, [currency, amount]] of Object.entries(APP_STORE_PRICES)) {
      expect(code).toMatch(/^[A-Z]{2}$/);
      expect(currency).toMatch(/^[A-Z]{3}$/);
      expect(amount).toBeGreaterThan(0);
    }
  });
});

describe('detectCountry', () => {
  it('reads the country from the time zone', () => {
    expect(detectCountry('Europe/Paris', ['en-US'])).toBe('FR');
    expect(detectCountry('Asia/Seoul', [])).toBe('KR');
  });

  it('knows the legacy names Chrome still reports', () => {
    expect(TIMEZONE_COUNTRY['Asia/Calcutta']).toBe('IN');
    expect(TIMEZONE_COUNTRY['Europe/Kiev']).toBe('UA');
  });

  it('falls back to the first language that names a region', () => {
    expect(detectCountry('UTC', ['de', 'de-CH', 'en-US'])).toBe('CH');
    expect(detectCountry(undefined, ['zh-Hant-TW'])).toBe('TW');
  });

  it('gives up when neither says', () => {
    expect(detectCountry('Etc/UTC', ['en'])).toBeUndefined();
  });
});

describe('priceFor', () => {
  it('picks the storefront price', () => {
    expect(priceFor('JP')).toEqual({ currency: 'JPY', amount: 1500 });
    expect(priceFor('FR')).toEqual({ currency: 'EUR', amount: 9.99 });
  });

  it('uses the US price where Yumo has no storefront or none was found', () => {
    expect(priceFor('AQ')).toEqual(DEFAULT_PRICE);
    expect(priceFor(undefined)).toEqual(DEFAULT_PRICE);
  });
});

describe('formatPrice', () => {
  // Intl inserts narrow no-break spaces in some locales; compare on plain spaces.
  const plain = (s: string) => s.replace(/[  ]/g, ' ');

  it('keeps the US label the rest of the site uses', () => {
    expect(formatPrice(DEFAULT_PRICE, 'en')).toBe('$8.99');
  });

  it('formats in the page language', () => {
    expect(plain(formatPrice(priceFor('FR'), 'fr'))).toBe('9,99 €');
    expect(plain(formatPrice(priceFor('DE'), 'de'))).toBe('9,99 €');
    expect(formatPrice(priceFor('KR'), 'ko')).toBe('₩15,000');
  });

  it('drops decimals from whole amounts', () => {
    expect(formatPrice(priceFor('JP'), 'en')).toBe('¥1,500');
    expect(plain(formatPrice(priceFor('CH'), 'en'))).toBe('CHF 8');
  });
});
