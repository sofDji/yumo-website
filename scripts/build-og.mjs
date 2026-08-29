// Renders the Open Graph cards to public/og.png and public/og-fr.png.
//
//   npm run build:og      (needs no dev server — the HTML is self-contained)
//
// Why this exists rather than a hand-made image: chat apps do not honour the
// 1.91:1 aspect Open Graph nominally implies. WhatsApp and several others crop
// the card to a square and take it from the CENTRE, so a headline set across
// the full 1200px is sliced at both ends — "Japanese on your Lock Screen"
// arrives as "ese on your Lock Scr", and the wordmark disappears entirely.
//
// So the whole composition lives inside SAFE (630px, the height), centred.
// Anything outside it is decoration that is allowed to be cropped away. The
// run throws if a line outgrows that square, and writes the square crop to
// shots-out/ so the constraint is checkable rather than remembered.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const W = 1200;
const H = 630;
const SAFE = H; // the widest square a centre-crop can take from a 1200x630 card

const T = {
  ground: '#FAF6EF',
  ink: '#201C17',
  muted: '#6E6354',
  accent: '#BE3F29',
  mint: '#E4EDE6',
  haze: '#DEE5EA',
};

const CARDS = [
  {
    out: 'public/og.png',
    lang: 'en',
    headline: 'Japanese on<br>your Lock Screen',
    sub: 'A new word every few hours<br>7,972 words &middot; fully offline',
  },
  {
    out: 'public/og-fr.png',
    lang: 'fr',
    headline: 'Le japonais sur<br>votre &eacute;cran',
    sub: 'Un nouveau mot toutes les heures<br>7 972 mots &middot; hors ligne',
  },
];

const html = (card) => `<!doctype html>
<html lang="${card.lang}"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700&display=block" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:${T.ground};overflow:hidden;
       font-family:'Schibsted Grotesk',system-ui,sans-serif;
       display:flex;align-items:center;justify-content:center;position:relative}
  /* Decoration only. Both sit largely outside the safe square by design. */
  .blob{position:absolute;border-radius:50%}
  .tl{width:760px;height:760px;background:${T.mint};top:-430px;left:-300px}
  .br{width:820px;height:820px;background:${T.haze};bottom:-470px;right:-320px}
  .safe{width:${SAFE}px;text-align:center;position:relative;z-index:1}
  .mark{font-size:22px;font-weight:700;letter-spacing:.34em;color:${T.accent};
        text-indent:.34em;margin-bottom:30px}
  h1{font-size:66px;font-weight:700;line-height:1.1;color:${T.ink};
     letter-spacing:-.02em;margin-bottom:26px}
  p{font-size:25px;font-weight:500;line-height:1.5;color:${T.muted}}
</style></head>
<body>
  <div class="blob tl"></div><div class="blob br"></div>
  <div class="safe">
    <div class="mark">YUMO</div>
    <h1>${card.headline}</h1>
    <p>${card.sub}</p>
  </div>
</body></html>`;

mkdirSync('shots-out', { recursive: true });

const browser = await chromium.launch();
// Render at 2x and downsample: text rendered straight at 1200x630 is soft on
// the thin strokes, and these cards get scaled up on desktop Twitter/Slack.
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });

for (const card of CARDS) {
  await page.setContent(html(card), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const overflow = await page.evaluate((safe) => {
    // Fails loudly rather than shipping a card that crops badly: if a line has
    // outgrown the safe square, the whole point of this file is defeated.
    const worst = [...document.querySelectorAll('.safe h1, .safe p, .safe .mark')]
      .map((el) => {
        const r = document.createRange();
        r.selectNodeContents(el);
        return Math.ceil(Math.max(...[...r.getClientRects()].map((b) => b.width), 0));
      });
    return { widest: Math.max(...worst), safe };
  }, SAFE);

  if (overflow.widest > SAFE) {
    throw new Error(
      `${card.out}: a line is ${overflow.widest}px wide but the safe square is ` +
        `${SAFE}px. Shorten the copy or drop the font size — as written this ` +
        `card would be cropped mid-word in chat apps.`,
    );
  }

  const shot = await page.screenshot();
  await sharp(shot).resize(W, H).png({ compressionLevel: 9 }).toFile(card.out);

  // What a square-cropping app actually keeps. Written to shots-out/ rather
  // than public/ — it is a check, not an asset, and public/ ships.
  const preview = card.out.replace(/^public\//, 'shots-out/').replace(/\.png$/, '-square.png');
  await sharp(shot)
    .extract({ left: (W * 2 - H * 2) / 2, top: 0, width: H * 2, height: H * 2 })
    .resize(SAFE, SAFE)
    .png()
    .toFile(preview);

  console.log(`${card.out}  widest line ${overflow.widest}px / ${SAFE}px safe`);
}

await browser.close();
