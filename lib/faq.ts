// The FAQ as it is actually shown, with its placeholders filled.
//
// Answers may carry {total} and {price}, so the word count and the Pro price
// stay defined once — in lib/tokens and lib/site — rather than typed into prose
// that nobody remembers to update. Two readers consume the result: the
// accordion on the page and the FAQPage node in the JSON-LD. Filling it here
// for both is what stops a raw "{price}" reaching either one, where it would be
// a visible bug in the first and misleading markup in the second.

import { fill, type Dictionary, type Locale } from './i18n';
import { PRO_PRICE_LABEL } from './site';
import { TOTAL_WORDS } from './tokens';

export function faqItems(locale: Locale, t: Dictionary['faq']): Dictionary['faq']['items'] {
  const nf = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US');
  const values = { total: nf.format(TOTAL_WORDS), price: PRO_PRICE_LABEL };
  return t.items.map((item) => ({ q: item.q, a: fill(item.a, values) }));
}
