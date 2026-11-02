import { describe, expect, it } from 'vitest';
import { pickLocale, redirectScript, TIMEZONE_LOCALE, type DetectInput } from '../i18n/detect';
import { LOCALES } from '../i18n/locales';

const CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36';

function pick(over: Partial<DetectInput>) {
  return pickLocale(
    { stored: null, languages: [], timeZone: undefined, userAgent: CHROME, ...over },
    LOCALES,
    TIMEZONE_LOCALE,
  );
}

describe('pickLocale', () => {
  it('follows the browser language when the site has it', () => {
    expect(pick({ languages: ['ko-KR', 'en-US'], timeZone: 'Asia/Seoul' })).toBe('ko');
    expect(pick({ languages: ['vi-VN', 'en-US'], timeZone: 'Asia/Ho_Chi_Minh' })).toBe('vi');
    expect(pick({ languages: ['fr-FR'] })).toBe('fr');
    expect(pick({ languages: ['es-MX'] })).toBe('es');
  });

  it('keeps an English browser on English, wherever it is', () => {
    expect(pick({ languages: ['en-GB'], timeZone: 'Europe/Paris' })).toBeNull();
  });

  it('skips languages the site lacks before deciding', () => {
    expect(pick({ languages: ['ja-JP', 'de-DE'] })).toBe('de');
  });

  it('falls back to the country of the time zone', () => {
    expect(pick({ languages: ['ja-JP'], timeZone: 'Europe/Paris' })).toBe('fr');
    expect(pick({ languages: ['zh-CN'], timeZone: 'Asia/Seoul' })).toBe('ko');
    expect(pick({ languages: ['zh-CN'], timeZone: 'Asia/Ho_Chi_Minh' })).toBe('vi');
    expect(pick({ languages: ['it-IT'], timeZone: 'Europe/Zurich' })).toBe('de');
    expect(pick({ languages: ['pt-BR'], timeZone: 'America/Bogota' })).toBe('es');
  });

  it('stays on English when nothing points elsewhere', () => {
    expect(pick({ languages: ['ja-JP'], timeZone: 'Asia/Tokyo' })).toBeNull();
    expect(pick({ languages: [], timeZone: undefined })).toBeNull();
  });

  it('lets a remembered menu choice outrank every guess, English included', () => {
    expect(pick({ stored: 'en', languages: ['ko-KR'], timeZone: 'Asia/Seoul' })).toBeNull();
    expect(pick({ stored: 'es', languages: ['fr-FR'] })).toBe('es');
    expect(pick({ stored: 'xx', languages: ['fr-FR'] })).toBe('fr');
  });

  it('never moves a crawler', () => {
    const googlebot = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
    expect(pick({ userAgent: googlebot, languages: ['fr-FR'], timeZone: 'Europe/Paris' })).toBeNull();
  });
});

describe('redirectScript', () => {
  const script = redirectScript();

  it('is valid, self-contained JavaScript', () => {
    // pickLocale is inlined via toString, so a reference to anything outside
    // its arguments would throw in the browser. Parsing and running it against
    // stubs catches both.
    const replaced: string[] = [];
    const run = new Function('location', 'localStorage', 'navigator', script);
    run(
      { pathname: '/support/', search: '?a=1', hash: '', replace: (u: string) => replaced.push(u) },
      { getItem: () => null },
      { languages: ['ko-KR'], language: 'ko-KR', userAgent: CHROME },
    );
    expect(replaced).toEqual(['/ko/support?a=1']);
  });

  it('leaves pages without a translation alone', () => {
    const replaced: string[] = [];
    new Function('location', 'localStorage', 'navigator', script)(
      { pathname: '/privacy', search: '', hash: '', replace: (u: string) => replaced.push(u) },
      { getItem: () => null },
      { languages: ['fr-FR'], userAgent: CHROME },
    );
    expect(replaced).toEqual([]);
  });
});
