import { describe, expect, it } from 'vitest';
import { en } from '../i18n/en';
import { fill, getDictionary } from '../i18n';
import { LOCALES, localePath } from '../i18n/locales';

const TRANSLATIONS = LOCALES.filter((l) => l !== 'en').map((l) => [l, getDictionary(l)] as const);

// Walks both dictionaries and collects every leaf path, so a key that exists
// in one and not the other is caught even though TypeScript already forbids
// it — this also catches arrays that lost or gained an entry.
function paths(node: unknown, prefix = ''): string[] {
  if (Array.isArray(node)) return node.flatMap((v, i) => paths(v, `${prefix}[${i}]`));
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([k, v]) => paths(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

// Every leaf, as a "path -> value" pair, for spotting untranslated strings.
function leaves(node: unknown, prefix = ''): [string, string][] {
  if (Array.isArray(node)) return node.flatMap((v, i) => leaves(v, `${prefix}[${i}]`));
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k));
  }
  return [[prefix, String(node)]];
}

describe.each(TRANSLATIONS)('%s dictionary', (_, dict) => {
  it('has exactly the shape of English', () => {
    expect(paths(dict)).toEqual(paths(en));
  });

  it('leaves no placeholder unfilled', () => {
    const enTokens = leaves(en).map(([p, v]) => [p, (v.match(/\{\w+\}/g) ?? []).sort()] as const);
    const map = new Map(leaves(dict));
    for (const [path, tokens] of enTokens) {
      const ownTokens = (map.get(path)?.match(/\{\w+\}/g) ?? []).sort();
      expect(ownTokens, `placeholders differ at ${path}`).toEqual(tokens);
    }
  });

  it('actually translates the strings that carry meaning', () => {
    // Proper nouns and short labels legitimately match across locales; long
    // prose that is byte-identical means someone copied English across.
    const map = new Map(leaves(dict));
    const untranslated = leaves(en)
      .filter(([p, v]) => v.length > 40 && map.get(p) === v)
      .map(([p]) => p);
    expect(untranslated).toEqual([]);
  });
});

describe('localePath', () => {
  it('keeps English at the root', () => {
    expect(localePath('en')).toBe('/');
    expect(localePath('en', 'support')).toBe('/support');
  });

  it('prefixes every other locale with its code', () => {
    expect(localePath('fr')).toBe('/fr');
    expect(localePath('fr', 'support')).toBe('/fr/support');
    expect(localePath('ko')).toBe('/ko');
    expect(localePath('de', 'support')).toBe('/de/support');
  });

  it('tolerates slashes on either end', () => {
    expect(localePath('fr', '/support/')).toBe('/fr/support');
  });
});

describe('fill', () => {
  it('substitutes placeholders', () => {
    expect(fill('All {total} words', { total: '7,972' })).toBe('All 7,972 words');
  });

  it('leaves an unknown placeholder visible rather than blank', () => {
    expect(fill('{missing} here', {})).toBe('{missing} here');
  });
});
