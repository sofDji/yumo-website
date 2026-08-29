// JSON-LD for the site: the entity graph search engines and AI answer engines
// read to work out what Yumo is, who makes it, what it costs, and what it
// answers.
//
// Every value here is derived from something the page already renders — the
// price from lib/site, the word count from lib/tokens, the questions from the
// dictionaries. Nothing is written twice, because structured data that
// disagrees with the visible page is worse than none: Google treats it as
// misleading markup and can demote the whole domain for it.
//
// Deliberately absent: aggregateRating and review. The app has not shipped, so
// there are no ratings, and inventing them is the one structured-data offence
// that reliably earns a manual action.

import type { Dictionary, Locale } from './i18n';
import { PRICE_CURRENCY, PRO_PRICE, SITE_URL, storeState, APP_STORE_URL, PLAY_STORE_URL } from './site';
import { TOTAL_WORDS } from './tokens';

/** Stable @id anchors, so the nodes below can reference each other by URI. */
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;

const LOCALE_TAG: Record<Locale, string> = { en: 'en-US', fr: 'fr-FR' };

/**
 * The dictionaries hold a couple of `&apos;` escapes because the FAQ renders
 * its answers through dangerouslySetInnerHTML. Inside a JSON-LD script block
 * there is no HTML parser to expand them, so they would reach Google as the
 * literal six characters. Decode the entities the dictionaries actually use.
 */
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&apos;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Yumo',
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo-mark.png`,
    },
    // The person behind the app, named because E-E-A-T rewards a site that
    // says who is accountable for it rather than hiding behind a brand.
    founder: { '@type': 'Person', name: 'SofDji' },
  };
}

function webSite(locale: Locale, t: Dictionary) {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${SITE_URL}/`,
    name: 'Yumo',
    description: t.meta.description,
    inLanguage: LOCALE_TAG[locale],
    publisher: { '@id': ORG_ID },
  };
}

/**
 * The product entity. This is the node an AI engine cites when someone asks
 * "what app puts Japanese words on my Lock Screen" — so it carries the
 * concrete, checkable facts rather than marketing lines.
 */
function application(locale: Locale, t: Dictionary) {
  const live = storeState() === 'live';

  return {
    '@type': 'MobileApplication',
    '@id': APP_ID,
    name: 'Yumo',
    description: t.meta.description,
    url: `${SITE_URL}/`,
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: 'Language Learning',
    operatingSystem: 'iOS, Android',
    inLanguage: LOCALE_TAG[locale],
    publisher: { '@id': ORG_ID },
    isAccessibleForFree: true,
    // Two tiers, matching the two cards the pricing section renders.
    offers: [
      {
        '@type': 'Offer',
        name: t.pricing.freeName,
        price: '0',
        priceCurrency: PRICE_CURRENCY,
        category: 'free',
      },
      {
        '@type': 'Offer',
        name: t.pricing.proName,
        price: PRO_PRICE,
        priceCurrency: PRICE_CURRENCY,
        // One payment, no renewal — the single most misunderstood fact about
        // the app, so it is stated in the markup as well as on the page.
        category: 'one-time purchase',
      },
    ],
    featureList: t.features.items.map((item) => item.title),
    // A number worth exposing: it is the site's most citable hard fact.
    numberOfItems: TOTAL_WORDS,
    ...(live && {
      downloadUrl: [APP_STORE_URL, PLAY_STORE_URL].filter(Boolean),
    }),
  };
}

/**
 * The FAQ the page already shows, restated for answer engines. This is what
 * makes the site eligible for People Also Ask and quotable by Perplexity and
 * ChatGPT Search — the questions are real user questions and the answers are
 * already written, so the markup costs nothing but unlocks a surface the site
 * otherwise cannot reach.
 */
function faqPage(locale: Locale, t: Dictionary) {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${locale === 'fr' ? '/fr' : ''}/#faq`,
    inLanguage: LOCALE_TAG[locale],
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: toPlainText(item.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: toPlainText(item.a),
      },
    })),
  };
}

/** Everything the home page declares, as one connected graph. */
export function homeGraph(locale: Locale, t: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      webSite(locale, t),
      application(locale, t),
      faqPage(locale, t),
    ],
  };
}

/**
 * Inner pages: a WebPage node tied back to the site entity, plus breadcrumbs
 * so search results show "yumo.lol › Support" rather than a bare URL.
 */
export function pageGraph({
  locale,
  path,
  name,
  description,
}: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
}) {
  const url = `${SITE_URL}${path}`;
  const home = `${SITE_URL}${locale === 'fr' ? '/fr' : '/'}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name,
        description,
        inLanguage: LOCALE_TAG[locale],
        isPartOf: { '@id': SITE_ID },
        about: { '@id': APP_ID },
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Yumo', item: home },
          { '@type': 'ListItem', position: 2, name },
        ],
      },
    ],
  };
}

/**
 * The JLPT reference pages. Same WebPage + BreadcrumbList spine as pageGraph,
 * plus the page's own FAQ — these are reference pages people arrive at from a
 * question ("how many words do you need for N5?"), so the answers are the part
 * worth making machine-readable.
 *
 * Deliberately no ItemList of the vocabulary. Google produces no rich result
 * from a 718-entry list, and serialising it would roughly double the page
 * weight to say in JSON-LD exactly what the table already says in HTML.
 */
export function jlptGraph({
  path,
  name,
  description,
  faq,
}: {
  path: string;
  name: string;
  description: string;
  faq: { q: string; a: string }[];
}) {
  const url = `${SITE_URL}${path}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name,
        description,
        inLanguage: LOCALE_TAG.en,
        isPartOf: { '@id': SITE_ID },
        publisher: { '@id': ORG_ID },
        license: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Yumo', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: LOCALE_TAG.en,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: toPlainText(item.q),
          acceptedAnswer: { '@type': 'Answer', text: toPlainText(item.a) },
        })),
      },
    ],
  };
}
