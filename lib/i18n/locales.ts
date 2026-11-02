export type Locale = 'en' | 'fr' | 'de' | 'es' | 'ko' | 'vi';

// The order the language menu lists them in: English first as the default,
// then the others in the order the app added them.
export const LOCALES: Locale[] = ['en', 'fr', 'de', 'es', 'ko', 'vi'];
export const DEFAULT_LOCALE: Locale = 'en';

/** localStorage key for the language picked in the menu. See lib/i18n/detect.ts. */
export const LOCALE_CHOICE_KEY = 'yumo-locale';

export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  de: 'DE',
  es: 'ES',
  ko: 'KO',
  vi: 'VI',
};

/** Each language named in itself, as the language menu lists it. */
export const LOCALE_NAME: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  ko: '한국어',
  vi: 'Tiếng Việt',
};

/** BCP 47 tag with region, for Intl number formatting and schema.org inLanguage. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  ko: 'ko-KR',
  vi: 'vi-VN',
};

// Privacy and terms exist in English only and are binding: translating them
// is a legal act, not a copy task, and the App Store listing cites the
// English URLs. Everything else has a counterpart in every locale.
export const LOCALISED_ROUTES = ['', 'support'] as const;

export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  if (locale === 'en') return clean ? `/${clean}` : '/';
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/** The formatter every count on a page goes through, so 7,972 reads 7 972 in French. */
export function numberFormat(locale: Locale): Intl.NumberFormat {
  return new Intl.NumberFormat(LOCALE_TAG[locale]);
}
