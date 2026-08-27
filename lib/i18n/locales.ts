export type Locale = 'en' | 'fr';

export const LOCALES: Locale[] = ['en', 'fr'];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABEL: Record<Locale, string> = { en: 'EN', fr: 'FR' };

// Privacy and terms exist in English only and are binding: translating them
// is a legal act, not a copy task, and the App Store listing cites the
// English URLs. Everything else has a French counterpart.
export const LOCALISED_ROUTES = ['', 'support'] as const;

export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  if (locale === 'en') return clean ? `/${clean}` : '/';
  return clean ? `/fr/${clean}` : '/fr';
}
