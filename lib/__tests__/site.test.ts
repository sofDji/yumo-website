import { describe, expect, it } from 'vitest';
import {
  APP_STORE_ID,
  APP_STORE_URL,
  PLAY_STORE_URL,
  STORE_NAME,
  bannerStore,
  storeState,
  storeUrls,
} from '../site';

const IOS = 'https://apps.apple.com/app/id1';
const ANDROID = 'https://play.google.com/store/apps/details?id=x';

const UA = {
  iphone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1',
  android:
    'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36',
  desktop:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
};

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

  it('names each store listing exactly as the store shows it', () => {
    // Play gets its own title: Android has no Lock Screen widgets.
    expect(STORE_NAME).toEqual({
      ios: 'Yumo: Japanese On Lock Screen',
      android: 'Yumo: Japanese Word Widget',
    });
    for (const name of Object.values(STORE_NAME)) {
      expect(name.length).toBeLessThanOrEqual(30);
      // The floating banner splits each title into app name and subtitle here.
      expect(name.split(': ')).toHaveLength(2);
    }
  });
});

describe('floating app banner', () => {
  it('offers nothing while no store lists the app', () => {
    for (const ua of Object.values(UA)) {
      expect(bannerStore(ua, 'coming-soon')).toBeNull();
    }
  });

  it('never sends an Android phone to the App Store', () => {
    expect(bannerStore(UA.android, 'ios')).toBeNull();
    expect(bannerStore(UA.iphone, 'ios')).toBe('ios');
    expect(bannerStore(UA.desktop, 'ios')).toBe('ios');
  });

  it('never sends an iPhone to Google Play', () => {
    expect(bannerStore(UA.iphone, 'android')).toBeNull();
    expect(bannerStore(UA.android, 'android')).toBe('android');
    expect(bannerStore(UA.desktop, 'android')).toBe('android');
  });

  it("offers each visitor their own phone's store once both are live", () => {
    expect(bannerStore(UA.iphone, 'live')).toBe('ios');
    expect(bannerStore(UA.android, 'live')).toBe('android');
    expect(bannerStore(UA.desktop, 'live')).toBe('ios');
  });

  it('reads the real listings by default', () => {
    expect(bannerStore(UA.iphone)).toBe(bannerStore(UA.iphone, storeState()));
  });
});
