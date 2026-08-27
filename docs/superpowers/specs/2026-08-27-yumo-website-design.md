# Yumo promotional website — design

*2026-08-27*

## Purpose

A public marketing site for Yumo that presents every app feature, hosts the
support page, and hosts the privacy policy and terms. It exists to convert a
visitor into an install once the app ships, and until then to establish that
Yumo is a real, finished product.

Success looks like: a visitor who has never heard of Yumo understands what it
does within one screen, can find every feature without leaving the page, and
can reach support, privacy and terms in one click.

## Context

The repo already exists and is further along than a greenfield start:

- `sofDji/yumo-website`, cloned at `D:\yumo-website`
- Next.js 15 App Router, React 19, Tailwind 3, framer-motion, TypeScript
- `output: 'export'` — a fully static site, no server, no API routes
- Already linked to Vercel project `yumo-website`, with a live production
  deployment as of 2026-08-26
- One commit: `32b2cfc Initial landing page`

The existing nine components are replaced wholesale. The repo, its name, its
git history and its Vercel link are all kept.

## Decisions already settled

| Decision | Choice | Why |
|---|---|---|
| Repo | Rebuild inside `yumo-website` | Stack is already correct; the name is the one we'd pick anyway |
| Primary CTA | Store badges, gated by one constant | No backend, no email storage; keeps the "collects nothing" story intact |
| Legal pages | Site is canonical, GitHub Pages redirects | App Store listing and shipped app keep working with zero edits |
| Hero | Live word card plus drifting level cards | The site demonstrates the product rather than describing it |
| Theme | Light only | The beige is the brand; references are all light |
| Domain | `yumo-website.vercel.app` for v1 | A custom domain later changes only the redirect targets |

## Design system

### Colour

Taken verbatim from the app's `src/theme/colors.ts` so the site and the app
are visibly the same product.

```
ground   #FAF6EF     ink      #201C17
surface  #FFFFFF     muted    #6E6354
line     #E8DFD0     accent   #BE3F29
```

JLPT level colours, used for word cards, the level ladder, and tinted shadows:

```
N5 #10B981   N4 #14B8A6   N3 #3B82F6   N2 #8B5CF6   N1 #F43F5E
```

Defined once as CSS custom properties on `:root` in `app/globals.css` and
mirrored into `tailwind.config.ts` so both `var(--ink)` and `text-ink` work.
Every colour is painted explicitly; nothing is inherited from the browser.

No dark mode in v1. The site commits to one visual world deliberately, and
paints backgrounds and text explicitly so it holds regardless of the visitor's
OS setting.

### Type

Three faces, all from Google Fonts, loaded via `next/font/google` so they are
self-hosted at build time and produce no layout shift.

- **Schibsted Grotesk** — headlines, UI, body. Chosen over Inter, which reads
  as a default.
- **Instrument Serif**, italic only — exactly one accent word per headline.
- **Zen Kaku Gothic New** — every Japanese glyph on the site. Kanji rendered
  in a Latin face's fallback looks wrong to the audience most likely to buy.

Scale: 12 / 14 / 16 / 18 / 21 / 28 / 40 / 56 / 72px. Headlines get
`text-wrap: balance`. Running text caps at 65 characters.

### Shape and depth

Radii 8 / 12 / 16 / 24 / 999px. Shadows are soft and warm-tinted
(`rgba(58,46,34,…)`, matching the app's `cardShadow`), never neutral grey.

## Information architecture

One long landing page at `/`, plus three standalone routes.

### Landing page sections

1. **Nav** — floating pill, `position: sticky`. Black logo square at left,
   section links centre, "Coming soon" pill right.
2. **Hero** — live word card, five drifting level cards, headline with one
   italic serif word, CTA, tilted Home Screen screenshot.
3. **How it works** — three steps: add the widget, pick your rhythm, words
   appear. Numbered, because the order is real.
4. **The widget** — Lock Screen and Home Screen on iOS, Home Screen on
   Android. States the platform difference honestly.
5. **Features** — the full inventory: pronunciation through the system's
   Japanese voice, kanji and kana stroke practice, favourites, notifications
   on the widget's rhythm, themes, widget styling, four meaning languages,
   fully offline.
6. **JLPT ladder** — N5 to N1 in the level colours with real counts:
   718 / 668 / 2,139 / 1,748 / 2,699.
7. **Browse** — the in-app dictionary: 7,972 words with meanings in English,
   French, German and Spanish. Copy must state the gate plainly: 718 N5 words
   on the free tier, all 7,972 with Pro. Browse is level-gated exactly like
   the widget (`src/app/(tabs)/browse.tsx:27`), so "a free dictionary" would
   be false advertising.
8. **Pricing** — Free versus Pro. $8.99 once, no subscription.

   Verified against the resolvers, which are the only source of truth
   (`resolveFrequency`, `resolveLevelForWindow` in `src/lib/scheduler.ts`):

   | | Free | Pro |
   |---|---|---|
   | Levels | N5 only — 718 words | N5–N1 — all 7,972 |
   | Rhythm | 6, 12 or 24 hours | 1, 2, 3, 4, 6, 12 or 24 hours |
   | Auto journey | No — pinned to N5 | Yes, climbs N5 → N1 |
   | Browse | N5 only | All levels |
   | Widget appearance | No | Colours, transparency, text colour |
   | Widget, favourites, notifications, themes, pronunciation, stroke practice | Yes | Yes |
9. **Privacy** — no accounts, no analytics, no tracking, works offline. A
   full section, because for this app it is a differentiator rather than a
   disclaimer.
10. **FAQ** — widget setup, why words hold between windows, restoring Pro,
    refunds, missing Japanese TTS voice.
11. **Footer** — privacy, terms, support, contact, copyright.

### Routes

- `/privacy` — the privacy policy, currently at `yumo-legal`
- `/terms` — the terms of use
- `/support` — the support page

All three share one `LegalLayout`: same nav, same footer, single readable
column, no hero. Content lives in TSX, not Markdown, so no MDX dependency is
added for three pages.

## The live word

A build-time script, `scripts/build-words.mjs`, reads
`../Yumo/assets/word-data.json` (7,972 records shaped
`{id, kanji, kana, romaji, meaning: {en,fr,de,es}, level}`) and emits
`lib/words.ts` containing a curated subset.

Selection rules, applied in order:

1. Keep words whose `kanji` field is 1–3 characters — long compounds do not
   read at display size.
2. Keep words whose English meaning is under 40 characters and contains no
   semicolon — the dataset's longer glosses are unreadable on a card.
3. Take the first 24 surviving words per level, giving 120 total.

The script runs manually and its output is committed, so `npm run build`
never depends on the app repo being present. The generated file is a few KB;
the 2.5 MB source never reaches the browser.

**Hydration.** A random word chosen during render would differ between server
and client and produce a hydration mismatch. The server renders index 0 for
each card; a `useEffect` on mount swaps in a random pick. The swap is
covered by the same crossfade used for later rotations, so it reads as
intentional rather than as a flash.

## Motion and surface

### Blur, in three specific places

- **Nav pill** — `rgba(255, 252, 246, 0.72)` with `backdrop-blur-xl` and a
  hairline border. Lifted from the app's own `navChrome` token.
- **Ambient blooms** — three large radial washes in the N5 green, N3 blue and
  N2 violet, at very low opacity behind the hero, heavily blurred. Static;
  never animated.
- **Word cards** — white at ~70% with backdrop blur and a shadow tinted in
  that card's level colour.

### Motion

- **Load** — staggered sequence: nav, headline word by word, live card, CTA,
  phone. Each element enters `blur(8px) → blur(0)` with a 12px rise.
- **Continuous** — the five level cards drift on independent loops with
  different periods so they never synchronise. The only always-on animation.
- **Pointer** — cards parallax ~15px against the cursor; the hero phone takes
  a clamped, spring-damped 3D tilt.
- **Scroll** — sections reveal once via `useInView` with the same blur-and-rise.
  The phone gets gentle parallax.
- **Word change** — crossfade with a slight scale.

### Hover

Primary button lifts with a growing shadow and its arrow slides right.
Feature cards rise 4px, border warms toward the accent. Word cards tilt toward
the cursor and reveal their meaning. Nav links gain a pill background. JLPT
rows flood with their level colour. Screenshots scale slightly.

One shared easing curve across all of it, defined as a token.

### Performance rules

These are requirements, not preferences. A blur-heavy animated page is the
easiest way to ship something that stutters on a phone.

- Continuous animation touches only `transform` and `opacity`. Never `filter`,
  never `backdrop-filter`.
- Blur appears in enter transitions and on static backdrops only.
- Card `backdrop-filter` is dropped below the `md` breakpoint, and the bloom
  count halves.
- Pointer parallax runs through `requestAnimationFrame` with spring damping
  and is disabled entirely on touch devices.
- `prefers-reduced-motion: reduce` collapses every animation above to its
  final state instantly, including the drift loop.

## Assets

### Screenshots

`public/screenshots/` currently holds 5 MB of unoptimised PNG, including a
3.3 MB `widget-home.png`. With `output: 'export'` and
`images: { unoptimized: true }`, Next cannot compress these at request time,
so the browser downloads all of it. This is the single largest performance
problem in the current repo.

Replace with the higher-quality captures from `../Yumo/store-screenshots/ios-6.9/`
(1290×2796), converted at build time by `scripts/optimise-assets.mjs` into:

- WebP at 1290w and 645w, quality 82
- A tiny blurred placeholder for each, inlined as a base64 `data:` URI

Served through `<picture>` with explicit `width`/`height` to reserve layout
space. Target: under 400 KB total for all screenshots, down from 5 MB.

When the Lock Screen capture exists, it drops into the hero in place of the
Home Screen shot with no layout change.

### Logo

`../Yumo/assets/images/icon.png` — white handwritten script on pure black —
copied to `public/logo.png` and used at its native square aspect in the nav
and footer. Against `#FAF6EF` the black square is the strongest mark on the
page and is used at size rather than shrunk into a corner.

`public/icon.svg` already exists and becomes the favicon.

## Legal redirects

Once `/privacy`, `/terms` and `/support` are live, the three files in
`sofDji/yumo-legal` are rewritten as redirects to them:

```html
<meta http-equiv="refresh" content="0; url=https://…/privacy">
<link rel="canonical" href="https://…/privacy">
```

**The full policy text stays on the page below the redirect.** If a review
tool fetches the URL without executing a meta refresh, the policy is still
there to read. A privacy URL that returns a blank redirect stub is a
rejection risk that costs nothing to avoid.

Effects: the App Store Connect listing needs no edit, `src/lib/legal.ts` in
the app needs no change, and no rebuild is required.

## Deployment

Vercel project `yumo-website` is already linked, with a production deployment
from 2026-08-26. Pushing to `main` triggers a build. No environment variables,
no secrets, no server runtime.

`.gitignore` gains `.vercel` — currently an uncommitted local change.

Launch switch, in `lib/site.ts`:

```ts
export const LAUNCHED = false;
export const APP_STORE_URL = '';
export const PLAY_STORE_URL = '';
```

`LAUNCHED === false` renders "Coming soon to the App Store and Google Play".
Flipping it to `true` with the two URLs filled renders real store badges. One
edit, one deploy, no code restructuring.

## Out of scope for v1

Email capture and any form. Dark mode. Blog or changelog. Analytics of any
kind, which would contradict the privacy section. A custom domain.

**Superseded 2026-08-28 — French was added.** `/fr` and `/fr/support` render
from `lib/i18n/`, where `fr.ts` is typed as `typeof en` so a missing key is a
compile error. Privacy and terms stay English only and binding: translating
them is a legal act, and the App Store listing cites the English URLs. Two
root layouts (route groups `(en)` and `(fr)`) exist so each locale gets its
own `<html lang>`, which one shared layout cannot provide. The word dataset
now carries `meaning: { en, fr }` and a word must have a usable gloss in both
to be selected, so a French card can never fall back to English.

## Success criteria

- Every app feature listed in the Features section appears on the site
- Every free-versus-Pro claim on the site matches the resolvers in
  `src/lib/scheduler.ts`, checked by reading the code rather than the design
  docs — an earlier design described Browse as fully free, and the shipped
  code gates it to N5
- `/privacy`, `/terms` and `/support` render the same text now served from
  `yumo-legal`, and the old URLs redirect to them while still containing
  their text
- Lighthouse performance ≥ 90 on mobile
- Total screenshot payload under 400 KB
- No layout shift on load (CLS ≈ 0)
- Every animation collapses under `prefers-reduced-motion`
- The page is legible and complete with JavaScript disabled
- One constant flips the site from pre-launch to launched
