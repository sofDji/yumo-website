import { en, type Dictionary } from './en';
import { de } from './de';
import { es } from './es';
import { fr } from './fr';
import { ko } from './ko';
import type { Locale } from './locales';

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr, de, es, ko };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

// Strings carry {placeholders} rather than being functions, so the
// dictionaries stay plain data and can be compared key-for-key by a test.
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);
}

export type { Dictionary } from './en';
export type { Locale } from './locales';
export {
  localePath,
  numberFormat,
  LOCALES,
  LOCALE_LABEL,
  LOCALE_NAME,
  LOCALE_TAG,
  DEFAULT_LOCALE,
} from './locales';
