'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { browserPrice, DEFAULT_PRICE, formatPrice, type StorePrice } from '@/lib/local-price';

/**
 * The visitor's App Store price. Starts on the US price so the server render
 * and the first client render agree, then switches once mounted.
 */
export function useLocalPrice(): StorePrice {
  const [price, setPrice] = useState(DEFAULT_PRICE);
  useEffect(() => setPrice(browserPrice()), []);
  return price;
}

/** Yumo Pro's price, or with `free` a zero in the same currency. */
export function LocalPrice({ locale, free = false }: { locale: Locale; free?: boolean }) {
  const price = useLocalPrice();
  return <>{formatPrice(free ? { ...price, amount: 0 } : price, locale)}</>;
}
