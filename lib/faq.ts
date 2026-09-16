// The FAQ as it is actually shown, with its placeholders filled.
//
// Answers may carry {total} and {price}, so the word count and the Pro price
// stay defined once — in lib/tokens and lib/site — rather than typed into prose
// that nobody remembers to update. The Android answer also carries {playSoon},
// which says the Play release is still to come and disappears by itself once
// lib/site has a Play listing. Two readers consume the result: the accordion on
// the page and the FAQPage node in the JSON-LD. Filling it here for both is
// what stops a raw "{price}" reaching either one, where it would be a visible
// bug in the first and misleading markup in the second.

import { fill, type Dictionary, type Locale } from './i18n';
import { PLAY_STORE_URL, PRO_PRICE_LABEL } from './site';
import { TOTAL_WORDS } from './tokens';

export function faqItems(locale: Locale, t: Dictionary['faq']): Dictionary['faq']['items'] {
  const nf = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US');
  const values = {
    total: nf.format(TOTAL_WORDS),
    price: PRO_PRICE_LABEL,
    playSoon: PLAY_STORE_URL === '' ? t.playSoon : '',
  };
  // Trimmed, because an emptied trailing placeholder leaves its space behind.
  return t.items.map((item) => ({ q: item.q, a: fill(item.a, values).trim() }));
}
