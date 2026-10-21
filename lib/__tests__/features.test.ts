import { describe, expect, it } from 'vitest';
import { FEATURE_IDS } from '../features';
import { getDictionary } from '../i18n';
import { LOCALES } from '../i18n/locales';

// The section looks each card's grid placement and illustration up by id, and
// the spans only build the intended bento because auto-placement walks the
// items in this order. Both halves of that are invisible to TypeScript, so
// they are pinned here: a card renamed, reordered or dropped fails the suite
// rather than quietly landing under the wrong picture.
describe('feature cards', () => {
  it('carry the ids the bento places, in the order it lays them out', () => {
    for (const locale of LOCALES) {
      expect(
        getDictionary(locale).features.items.map((f) => f.id),
        `feature ids in ${locale}`,
      ).toEqual([...FEATURE_IDS]);
    }
  });
});
