import { en, type Dictionary } from './en';
import { fr } from './fr';
import type { Locale } from './locales';

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

// Strings carry {placeholders} rather than being functions, so the two
// dictionaries stay plain data and can be compared key-for-key by a test.
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);
}

export type { Dictionary } from './en';
export type { Locale } from './locales';
export { localePath, LOCALES, LOCALE_LABEL, DEFAULT_LOCALE } from './locales';
