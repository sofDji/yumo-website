import { describe, expect, it } from 'vitest';
import { APP_STORE_ID, APP_STORE_URL, PLAY_STORE_URL, storeState, storeUrls } from '../site';

const IOS = 'https://apps.apple.com/app/id1';
const ANDROID = 'https://play.google.com/store/apps/details?id=x';

describe('store state', () => {
  it('is coming soon while no store lists the app', () => {
    expect(storeState('', '')).toBe('coming-soon');
  });

  it('names the one store that does, when only one does', () => {
    expect(storeState(IOS, '')).toBe('ios');
    expect(storeState('', ANDROID)).toBe('android');
  });

  it('is live only when both stores list the app', () => {
    expect(storeState(IOS, ANDROID)).toBe('live');
  });

  it('reads the real listings by default', () => {
    expect(storeState()).toBe(storeState(APP_STORE_URL, PLAY_STORE_URL));
  });
});

describe('store listings', () => {
  it('links the App Store by numeric id, with no country segment', () => {
    // A country-less link lets Apple send each visitor to their own
    // storefront, so one URL serves the English and French pages alike.
    expect(APP_STORE_ID).toMatch(/^\d+$/);
    expect(APP_STORE_URL).toBe(`https://apps.apple.com/app/id${APP_STORE_ID}`);
  });

  it('points any Play link at the app package', () => {
    if (PLAY_STORE_URL !== '') {
      expect(PLAY_STORE_URL).toBe(
        'https://play.google.com/store/apps/details?id=com.sofianeenf.yumo',
      );
    }
  });

  it('lists only stores that exist, App Store first', () => {
    const urls = storeUrls();
    expect(urls).not.toContain('');
    expect(urls).toEqual([APP_STORE_URL, PLAY_STORE_URL].filter((u) => u !== ''));
  });
});
