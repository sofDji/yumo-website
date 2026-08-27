import { statSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SHOTS } from '../shots';

const sizeOf = (publicPath: string) =>
  statSync(resolve(process.cwd(), `public${publicPath}`)).size;

describe('screenshots', () => {
  it('has all five app captures', () => {
    expect(Object.keys(SHOTS).sort()).toEqual(
      ['browse', 'saved', 'settings', 'today', 'widgetHome'].sort(),
    );
  });

  it('carries real dimensions so layout space is reserved', () => {
    for (const shot of Object.values(SHOTS)) {
      expect(shot.width).toBeGreaterThan(0);
      expect(shot.height).toBeGreaterThan(0);
    }
  });

  it('describes the emitted file, not the source capture', () => {
    for (const shot of Object.values(SHOTS)) {
      expect(shot.width).toBe(1080);
    }
  });

  it('carries an inline blur placeholder', () => {
    for (const shot of Object.values(SHOTS)) {
      expect(shot.blur.startsWith('data:image/webp;base64,')).toBe(true);
    }
  });

  // A visitor gets one variant per image, never both sets, so the budget is
  // the worst single-visitor payload rather than the directory total.
  it('keeps the worst-case visitor payload under 400 KB', () => {
    const desktop = Object.values(SHOTS).reduce((n, s) => n + sizeOf(s.src), 0);
    const mobile = Object.values(SHOTS).reduce((n, s) => n + sizeOf(s.srcSmall), 0);
    expect(Math.max(desktop, mobile)).toBeLessThan(400 * 1024);
  });
});
