import { describe, expect, it } from 'vitest';
import { LOCALES } from '../i18n/locales';
import { getDictionary } from '../i18n';
import { en } from '../i18n/en';
import { fr } from '../i18n/fr';
import { FAN_WORDS } from '../fan-words';
import { reviewFor, REVIEWS } from '../reviews';
import { APP_STORE_RATING, APP_STORE_URL, SOCIAL, STORE_TITLE } from '../site';

describe('App Store reviews', () => {
  it('shows all six 5-star reviews and no lower rating', () => {
    expect(REVIEWS.map((r) => r.author).sort()).toEqual(
      ['Bouton d’or 86', 'HY Marwa', 'MatSaka', 'Nada Yousra', 'Princess achiever', 'SevenCoD'].sort(),
    );
    for (const review of REVIEWS) expect(review.stars).toBe(5);
  });

  it('carries no emoji, in any language', () => {
    const emoji = /\p{Extended_Pictographic}/u;
    for (const review of REVIEWS) {
      expect(review.author).not.toMatch(emoji);
      for (const locale of LOCALES) {
        expect(review.text[locale].title).not.toMatch(emoji);
        expect(review.text[locale].body).not.toMatch(emoji);
      }
    }
  });

  it('has every review in every language', () => {
    for (const review of REVIEWS) {
      for (const locale of LOCALES) {
        const text = review.text[locale];
        expect(text?.title.length).toBeGreaterThan(0);
        expect(text?.body.length).toBeGreaterThan(0);
      }
    }
  });

  it('keeps a review word for word in its own language, with no label', () => {
    const nada = REVIEWS.find((r) => r.author === 'Nada Yousra')!;
    const shown = reviewFor(nada, 'en', en.reviews);
    expect(shown.title).toBe('My favorite way to learn Japanese');
    expect(shown.body).toContain('The lock screen widget got me hooked');
    expect(shown.translatedNote).toBeNull();
  });

  it('labels a review shown in another language', () => {
    const seven = REVIEWS.find((r) => r.author === 'SevenCoD')!;
    expect(reviewFor(seven, 'en', en.reviews).translatedNote).toBe('Translated from French');
    expect(reviewFor(seven, 'fr', fr.reviews).translatedNote).toBeNull();
    const nada = REVIEWS.find((r) => r.author === 'Nada Yousra')!;
    expect(reviewFor(nada, 'fr', fr.reviews).translatedNote).toBe('Traduit de l’anglais');
  });

  it('only shows the rating the store reports', () => {
    expect(APP_STORE_RATING).toBe('4.9');
  });
});

describe('the App Store listing', () => {
  it('links to the listing by its full address', () => {
    expect(APP_STORE_URL).toBe('https://apps.apple.com/app/yumo-learn-japanese-kanji/id6805975318');
  });

  it('has the app’s store title', () => {
    expect(STORE_TITLE).toBe('Yumo: Learn Japanese & Kanji');
  });
});

describe('the review slider', () => {
  it('names its arrows in every language', () => {
    for (const locale of LOCALES) {
      const t = getDictionary(locale).reviews;
      expect(t.prev.length).toBeGreaterThan(0);
      expect(t.next.length).toBeGreaterThan(0);
    }
  });
});

describe('socials', () => {
  it('lists only Instagram and TikTok', () => {
    expect(Object.keys(SOCIAL).sort()).toEqual(['instagram', 'tiktok']);
  });

  it('points at @yumojapanese on Instagram and TikTok', () => {
    expect(SOCIAL.instagram.handle).toBe('yumojapanese');
    expect(SOCIAL.instagram.url).toBe('https://www.instagram.com/yumojapanese/');
    expect(SOCIAL.tiktok.handle).toBe('yumojapanese');
    expect(SOCIAL.tiktok.url).toBe('https://www.tiktok.com/@yumojapanese');
  });
});


describe('the hero cards', () => {
  it('shows five words with a sentence, in every language', () => {
    expect(FAN_WORDS).toHaveLength(5);
    for (const w of FAN_WORDS) {
      expect(w.jp).toContain(w.mark);
      expect(w.romaji.word.length).toBeGreaterThan(0);
      for (const locale of LOCALES) {
        expect(w.meaning[locale].length).toBeGreaterThan(0);
        expect(w.meaning[locale]).not.toMatch(/[;(]/);
        expect(w.sentence[locale].length).toBeGreaterThan(0);
        expect(w.sentence[locale]).toContain(w.sentenceMark[locale]);
      }
    }
  });
});
