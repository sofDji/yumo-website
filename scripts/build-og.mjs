// The site's dark look: black, lime, the handwritten logo and the hero's headline.
// Renders the Open Graph cards to public/og.png, og-fr.png, og-de.png,
// og-es.png, og-ko.png, og-vi.png and og-n5.png.
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
import { mkdirSync, readFileSync } from 'node:fs';
import sharp from 'sharp';

const W = 1200;
const H = 630;
const SAFE = H; // the widest square a centre-crop can take from a 1200x630 card

const T = {
  ground: '#050505',
  ink: '#F5F5F2',
  muted: '#A3A39D',
  accent: '#E9ECA5',
};

const dataUri = (path, type) => `data:${type};base64,${readFileSync(path).toString('base64')}`;
const LOGO = dataUri('public/logo-mark.png', 'image/png');
const HERO = (level) => dataUri(`public/hero/${level}.jpg`, 'image/jpeg');

const CARDS = [
  {
    out: 'public/og.png',
    lang: 'en',
    lead: 'Japanese, learned',
    accent: 'without trying',
    sub: 'A new word on your Lock Screen every few hours',
  },
  {
    out: 'public/og-fr.png',
    lang: 'fr',
    lead: 'Le japonais, appris',
    accent: 'sans effort',
    sub: 'Un nouveau mot sur votre écran verrouillé',
  },
  {
    out: 'public/og-de.png',
    lang: 'de',
    lead: 'Japanisch lernen,',
    accent: 'ganz nebenbei',
    sub: 'Alle paar Stunden ein neues Wort auf deinem Sperrbildschirm',
  },
  {
    out: 'public/og-es.png',
    lang: 'es',
    lead: 'Japonés, aprendido',
    accent: 'sin esfuerzo',
    sub: 'Una palabra nueva en tu pantalla de bloqueo',
  },
  {
    // Hangul falls through to the system's Korean face. word-break: keep-all
    // stops a line breaking mid-word.
    out: 'public/og-ko.png',
    lang: 'ko',
    lead: '애쓰지 않아도 익히는',
    accent: '일본어',
    sub: '몇 시간마다 잠금 화면에 새로운 단어',
  },
  {
    out: 'public/og-vi.png',
    lang: 'vi',
    lead: 'Học tiếng Nhật',
    accent: 'thật nhẹ nhàng',
    sub: 'Vài giờ lại có một từ mới trên màn hình khóa',
  },
  {
    // For /jlpt/n5. The count must match N5_WORDS.length in lib/jlpt/n5.ts —
    // the page title quotes the same number.
    out: 'public/og-n5.png',
    lang: 'en',
    lead: 'JLPT N5',
    accent: 'vocabulary list',
    sub: 'All 718 words: kanji, kana and meanings',
  },
];

const side = (level, label, kanji, cls) =>
  `<div class="card ${cls}" style="background-image:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.45)),url(${HERO(level)})"><span>${label}</span><b lang="ja">${kanji}</b></div>`;

const html = (card) => `<!doctype html>
<html lang="${card.lang}"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@500;600&family=Instrument+Serif:ital@1&family=Be+Vietnam+Pro:wght@500;600&family=Lora:ital@1&display=block" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:${T.ground};overflow:hidden;
       font-family:${card.lang === 'vi' ? "'Be Vietnam Pro'" : "'Geist'"},'Malgun Gothic','Apple SD Gothic Neo',system-ui,sans-serif;
       display:flex;align-items:center;justify-content:center;position:relative}
  /* Decoration only. These sit outside the safe square by design. */
  .glow{position:absolute;inset:0;background:
    radial-gradient(circle 420px at 50% 44%,rgba(233,236,165,.1),transparent),
    radial-gradient(circle 360px at 12% 20%,rgba(16,185,129,.1),transparent),
    radial-gradient(circle 360px at 88% 80%,rgba(139,92,246,.1),transparent)}
  .card{position:absolute;top:170px;width:216px;height:520px;border-radius:30px;padding:24px;color:#fff;
        background-size:cover;background-position:center;
        box-shadow:0 20px 60px rgba(0,0,0,.6),inset 0 0 0 1px rgba(255,255,255,.16)}
  .card span{display:inline-block;padding:4px 11px;border-radius:14px;background:rgba(0,0,0,.28);font-size:15px;font-weight:600}
  .card b{display:block;margin-top:18px;font-family:'Yu Gothic','Hiragino Sans','Meiryo',sans-serif;font-size:70px;line-height:1.1}
  .l{left:26px;transform:rotate(-8deg)}
  .r{right:26px;transform:rotate(8deg)}
  .safe{width:${SAFE}px;padding:0 24px;text-align:center;position:relative;z-index:1;word-break:keep-all}
  .logo{display:block;height:74px;margin:0 auto 26px}
  h1{font-size:64px;font-weight:600;line-height:1.06;color:${T.ink};letter-spacing:-.03em;margin-bottom:24px}
  h1 em{display:block;font-family:${card.lang === 'vi' ? "'Lora'" : "'Instrument Serif'"},'Malgun Gothic',serif;font-style:${card.lang === 'ko' ? 'normal' : 'italic'};
        font-weight:400;font-size:1.14em;letter-spacing:-.01em;color:${T.accent}}
  p{font-size:24px;font-weight:500;line-height:1.4;color:${T.muted}}
</style></head>
<body>
  <div class="glow"></div>
  ${side('n4', 'N4', '夢', 'l')}
  ${side('n3', 'N3', '桜', 'r')}
  <div class="safe">
    <img class="logo" src="${LOGO}" alt="">
    <h1>${card.lead}<em>${card.accent}</em></h1>
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
    const worst = [...document.querySelectorAll('.safe h1, .safe p')]
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
