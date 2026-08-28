import { describe, expect, it } from 'vitest';
import { en } from '../i18n/en';
import { fr } from '../i18n/fr';

// components/how/Steps.tsx binds each step to its illustration by position,
// which is safe only while there are exactly three and their order is printed
// on the page as 01/02/03. A fourth step added to the copy would render with
// no illustration at all, so it fails here instead.
describe('how it works', () => {
  it('has exactly the three steps the section illustrates', () => {
    expect(en.how.steps).toHaveLength(3);
    expect(fr.how.steps).toHaveLength(3);
  });

  it('numbers them in order', () => {
    expect(en.how.steps.map((s) => s.n)).toEqual(['01', '02', '03']);
    expect(fr.how.steps.map((s) => s.n)).toEqual(['01', '02', '03']);
  });
});
