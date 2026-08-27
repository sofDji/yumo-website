import { describe, expect, it } from 'vitest';
import { APP_STORE_URL, LAUNCHED, PLAY_STORE_URL, storeState } from '../site';

describe('site config', () => {
  it('is pre-launch until the flag is flipped', () => {
    expect(LAUNCHED).toBe(false);
  });

  it('reports coming-soon while unlaunched', () => {
    expect(storeState()).toBe('coming-soon');
  });

  it('refuses to claim launched without both store URLs', () => {
    if (LAUNCHED) {
      expect(APP_STORE_URL).not.toBe('');
      expect(PLAY_STORE_URL).not.toBe('');
    }
  });
});
