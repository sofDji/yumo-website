// Open Graph and X card tags, built the same way for every page.
//
// Next merges metadata one top-level key at a time: a page that sets
// `openGraph` replaces the layout's wholesale rather than adding to it, and a
// page that sets nothing inherits nothing useful. So there is no layout-level
// default to lean on — each page asks for its full set here, which is also what
// keeps a shared link from ever arriving without a title, image or site name.

import type { Metadata } from 'next';
import type { Locale } from './i18n';
import { APP_STORE_ID, SOCIAL } from './site';

const OG_LOCALE: Record<Locale, string> = { en: 'en_US', fr: 'fr_FR' };

export type ShareImage = { url: string; alt: string };

/** The cards scripts/build-og.mjs renders. All are 1200x630. */
export const SHARE_IMAGES = {
  en: { url: '/og.png', alt: 'Yumo showing a Japanese word on an iPhone Lock Screen' },
  fr: {
    url: '/og-fr.png',
    alt: "Yumo affichant un mot japonais sur l'écran de verrouillage d'un iPhone",
  },
  n5: { url: '/og-n5.png', alt: 'The JLPT N5 vocabulary list on Yumo' },
} as const satisfies Record<string, ShareImage>;

/**
 * Safari's Smart App Banner: on an iPhone, the bar above the page that opens
 * or installs Yumo in one tap. Both root layouts set it, and no page sets
 * `itunes`, so Next's key-by-key merge carries it onto every page. Absent while
 * the app has no App Store listing, since a banner for a missing app shows an
 * error.
 */
export function appBannerMetadata(): Pick<Metadata, 'itunes'> {
  return APP_STORE_ID === '' ? {} : { itunes: { appId: APP_STORE_ID } };
}

export function shareMetadata({
  locale,
  path,
  title,
  description,
  image = SHARE_IMAGES[locale],
  type = 'website',
}: {
  locale: Locale;
  /** Path as served, e.g. '/support'. Resolved against metadataBase. */
  path: string;
  title: string;
  description: string;
  image?: ShareImage;
  type?: 'website' | 'article';
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Yumo',
      locale: OG_LOCALE[locale],
      type,
      images: [{ url: image.url, width: 1200, height: 630, alt: image.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${SOCIAL.x.handle}`,
      title,
      description,
      images: [image.url],
    },
  };
}
