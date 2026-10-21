import { describe, expect, it } from 'vitest';
import { getDictionary } from '../i18n';
import { LOCALES } from '../i18n/locales';

// components/how/Steps.tsx binds each step to its illustration by position,
// which is safe only while there are exactly three and their order is printed
// on the page as 01/02/03. A fourth step added to the copy would render with
// no illustration at all, so it fails here instead.
describe('how it works', () => {
  it('has exactly the three steps the section illustrates', () => {
    for (const locale of LOCALES) {
      expect(getDictionary(locale).how.steps, locale).toHaveLength(3);
    }
  });

  it('numbers them in order', () => {
    for (const locale of LOCALES) {
      expect(getDictionary(locale).how.steps.map((s) => s.n), locale).toEqual(['01', '02', '03']);
    }
  });
});
