import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { en } from '../i18n/en';
import { fr } from '../i18n/fr';
import robots from '../../app/robots';
import sitemap from '../../app/sitemap';
import { N5_WORDS } from '../jlpt/n5';
import { SHARE_IMAGES, shareMetadata } from '../metadata';
import { ROUTES } from '../routes';
import { homeGraph, pageGraph } from '../schema';
import { PRICE_CURRENCY, PRO_PRICE, PRO_PRICE_LABEL, SITE_URL, SOCIAL, SUPPORT_EMAIL } from '../site';

type Node = Record<string, unknown>;

// Any of the graph builders — home, inner page, JLPT — each of which returns
// its own literal node union, so the helpers accept the shape they share.
type Graph = { '@graph': readonly unknown[] };

function nodes(graph: Graph): Node[] {
  return graph['@graph'] as Node[];
}

function ofType(graph: Graph, type: string): Node {
  const found = nodes(graph).find((n) => n['@type'] === type);
  if (!found) throw new Error(`no ${type} node in graph`);
  return found;
}

describe('site URL', () => {
  // The bug this file exists to prevent: every canonical, hreflang and og:url
  // on the site is built from SITE_URL, so pointing it at a *.vercel.app alias
  // silently tells Google the real site lives somewhere else.
  it('is the apex domain, not a Vercel alias', () => {
    expect(SITE_URL).toBe('https://yumo.lol');
    expect(SITE_URL).not.toMatch(/vercel\.app/);
  });

  it('has no trailing slash, so metadataBase can join paths', () => {
    expect(SITE_URL.endsWith('/')).toBe(false);
  });
});

describe('routes', () => {
  it('covers every page the site builds', () => {
    expect(ROUTES.map((r) => r.path).sort()).toEqual(
      ['', '/fr', '/fr/support', '/jlpt/n5', '/privacy', '/support', '/terms'].sort(),
    );
  });

  it('has no duplicate paths', () => {
    const paths = ROUTES.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('pairs hreflang reciprocally', () => {
    // A page naming its twin without the twin naming it back is a broken pair,
    // and Google discards both sides rather than guessing.
    for (const route of ROUTES) {
      for (const path of Object.values(route.alternates)) {
        const twin = ROUTES.find((r) => r.path === path);
        expect(twin, `${route.path} points at ${path}, which is not a route`).toBeDefined();
        expect(twin!.alternates).toEqual(route.alternates);
      }
    }
  });

  it('only claims alternates that are real routes', () => {
    const known = new Set(ROUTES.map((r) => r.path));
    for (const route of ROUTES) {
      for (const path of Object.values(route.alternates)) {
        expect(known.has(path)).toBe(true);
      }
    }
  });
});

describe('sitemap', () => {
  const entries = sitemap();

  it('lists every route', () => {
    expect(entries.map((e) => e.url).sort()).toEqual(
      ROUTES.map((r) => `${SITE_URL}${r.path}`).sort(),
    );
  });

  it('carries no alternates, which would break XSD element order', () => {
    // Next emits hreflang as <xhtml:link> directly after <loc>, but the
    // sitemap schema allows foreign-namespace elements only after <priority>.
    // The resulting file fails validation on the <lastmod> that follows, and
    // Search Console rejects it with "Sitemap could not be read". hreflang
    // lives in each page's <head> instead, which Google treats as equivalent.
    for (const entry of entries) {
      expect(entry).not.toHaveProperty('alternates');
    }
  });

  it('emits the fields the schema expects, in the order it expects them', () => {
    for (const entry of entries) {
      expect(Object.keys(entry)).toEqual(['url', 'lastModified', 'changeFrequency', 'priority']);
    }
  });
});

describe('home JSON-LD', () => {
  const graphs = { en: homeGraph('en', en), fr: homeGraph('fr', fr) };

  it('declares the four entity types answer engines read', () => {
    for (const graph of Object.values(graphs)) {
      const types = nodes(graph).map((n) => n['@type']);
      expect(types).toEqual(
        expect.arrayContaining(['Organization', 'WebSite', 'MobileApplication', 'FAQPage']),
      );
    }
  });

  it('quotes the same price the pricing card renders', () => {
    const offers = ofType(graphs.en, 'MobileApplication').offers as Node[];
    const pro = offers.find((o) => o.price !== '0')!;
    expect(pro.price).toBe(PRO_PRICE);
    expect(pro.priceCurrency).toBe(PRICE_CURRENCY);
    // Structured data disagreeing with the visible page is treated as
    // misleading markup, so the label and the machine-readable value must
    // describe one number.
    expect(PRO_PRICE_LABEL).toContain(PRO_PRICE);
  });

  it('never invents a rating', () => {
    // The app has not shipped. Fabricated review markup is the one
    // structured-data offence that reliably earns a manual action.
    const json = JSON.stringify(graphs.en);
    expect(json).not.toContain('aggregateRating');
    expect(json).not.toContain('reviewCount');
  });

  it('omits store links until the app is actually launched', () => {
    const app = ofType(graphs.en, 'MobileApplication');
    expect(app.downloadUrl).toBeUndefined();
  });

  it('carries every FAQ answer as plain text', () => {
    for (const [locale, graph] of Object.entries(graphs)) {
      const faq = ofType(graph, 'FAQPage');
      const questions = faq.mainEntity as Node[];
      const dict = locale === 'fr' ? fr : en;
      expect(questions).toHaveLength(dict.faq.items.length);

      for (const q of questions) {
        const text = (q.acceptedAnswer as Node).text as string;
        expect(text.length).toBeGreaterThan(0);
        // The dictionaries carry HTML entities because the FAQ renders through
        // dangerouslySetInnerHTML; inside a script block nothing decodes them.
        expect(text).not.toMatch(/&[a-z]+;/);
        expect(text).not.toMatch(/<[^>]+>/);
      }
    }
  });

  it('ties the organization to exactly the profiles the footer links', () => {
    const org = ofType(graphs.en, 'Organization');
    expect(org.sameAs).toEqual(Object.values(SOCIAL).map((p) => p.url));
    for (const url of org.sameAs as string[]) {
      expect(url).toMatch(/^https:\/\//);
    }
  });

  it('names the support address as the contact point', () => {
    const org = ofType(graphs.en, 'Organization');
    expect((org.contactPoint as Node).email).toBe(SUPPORT_EMAIL);
  });

  it('uses no property schema.org does not define on an application', () => {
    // numberOfItems belongs to ItemList; on MobileApplication validators flag it.
    expect(ofType(graphs.en, 'MobileApplication')).not.toHaveProperty('numberOfItems');
  });

  it('anchors every node under the real domain', () => {
    for (const graph of Object.values(graphs)) {
      for (const node of nodes(graph)) {
        const id = node['@id'];
        if (typeof id === 'string') expect(id.startsWith(SITE_URL)).toBe(true);
      }
    }
  });
});

describe('inner page JSON-LD', () => {
  const graph = pageGraph({
    locale: 'en',
    path: '/support',
    name: 'Support',
    description: 'Help with the Yumo widget.',
  });

  it('breadcrumbs back to the locale home', () => {
    const crumb = ofType(graph, 'BreadcrumbList');
    const items = crumb.itemListElement as Node[];
    expect(items).toHaveLength(2);
    expect(items[0].item).toBe(`${SITE_URL}/`);
    expect(items[1].name).toBe('Support');
  });

  it('sends a French page to the French home', () => {
    const fr = pageGraph({
      locale: 'fr',
      path: '/fr/support',
      name: 'Assistance',
      description: 'Aide.',
    });
    const items = ofType(fr, 'BreadcrumbList').itemListElement as Node[];
    expect(items[0].item).toBe(`${SITE_URL}/fr`);
  });
});

describe('robots.txt', () => {
  it('never blocks the CSS, JS and fonts Google renders pages with', () => {
    // Googlebot renders before indexing. Disallowing /_next/ hid every
    // stylesheet and font from it, so the site was judged unstyled.
    const rules = [robots().rules].flat();
    for (const rule of rules) {
      const disallowed = [rule.disallow ?? []].flat();
      expect(disallowed.some((p) => '/_next/static/css/x.css'.startsWith(p))).toBe(false);
    }
  });
});

describe('share cards', () => {
  it('ship every image they point at', () => {
    for (const image of Object.values(SHARE_IMAGES)) {
      expect(existsSync(`public${image.url}`), image.url).toBe(true);
    }
  });

  it('carry an image, the site name and the X account on every page', () => {
    const tags = shareMetadata({ locale: 'fr', path: '/fr/support', title: 'T', description: 'D' });
    const og = tags.openGraph as Record<string, unknown>;
    expect(og.siteName).toBe('Yumo');
    expect(og.images).toEqual([expect.objectContaining({ url: SHARE_IMAGES.fr.url, width: 1200 })]);
    expect(tags.twitter).toMatchObject({
      card: 'summary_large_image',
      site: `@${SOCIAL.x.handle}`,
    });
  });

  it('quote the N5 word count the page itself quotes', () => {
    // scripts/build-og.mjs is plain JS and cannot import the word list, so
    // the number on the card is typed out; this is what catches it drifting.
    const script = readFileSync('scripts/build-og.mjs', 'utf8');
    expect(script).toContain(`All ${N5_WORDS.length} words`);
  });
});

describe('home page titles', () => {
  it('fit a search result without truncating', () => {
    // Google cuts titles at roughly 600px, which is about 60 characters.
    for (const dict of [en, fr]) {
      expect([...dict.meta.title].length, dict.meta.title).toBeLessThanOrEqual(60);
    }
  });
});
