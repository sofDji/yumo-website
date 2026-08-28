// The eight feature cards, in the order the bento lays them out — which is
// also the order they appear in the dictionaries, so reading `features.items`
// in en.ts walks the section the same way the page does.
//
// Each dictionary item carries its id and the section looks up that card's
// grid placement and its illustration by id, so a card can never end up under
// the wrong picture. `features.test.ts` pins both dictionaries to this list.
export const FEATURE_IDS = [
  'strokes',
  'audio',
  'favourites',
  'languages',
  'browse',
  'themes',
  'notifications',
  'offline',
] as const;

export type FeatureId = (typeof FEATURE_IDS)[number];
