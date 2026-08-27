// Generates App Store and Play Store screenshot panels.
//
// The five panels are rendered as ONE continuous canvas (5 x panel width) and
// then clipped, so the background really is continuous rather than five
// backgrounds that approximately line up. Elements straddling a seam are cut
// by the clip, which is what sells the panorama in a scrolling gallery.
//
// Run with `npm run shots:store`.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const APP = resolve(here, '../../Yumo');
const SRC = resolve(APP, 'store-screenshots/ios-6.9');
const OUT = resolve(APP, 'store-screenshots/store-panels');
const TMP = resolve(here, '../.store-tmp');

// Store targets. Play is 9:16 and iOS is ~9:19.5, so each is composed for its
// own frame — rescaling one into the other would crop the headings.
const TARGETS = [
  { name: 'ios-6.9', w: 1290, h: 2796 },
  { name: 'ios-6.5', w: 1284, h: 2778 },
  { name: 'play-phone', w: 1080, h: 1920 },
];

// Panel order matters: the store shows the first two or three without
// scrolling, so the widget — the product itself — leads.
//
// Adding the Lock Screen panel later is one entry here plus its capture in
// SRC. Nothing else changes.
const PANELS = [
  { file: '05-widget-home.png', lead: 'A new word,', accent: 'every few hours', soften: true },
  { file: '01-today.png', lead: "Today's word,", accent: 'always waiting' },
  { file: '02-browse.png', lead: '7,972 words,', accent: 'searchable' },
  { file: '03-saved.png', lead: 'Keep the ones', accent: 'that stick' },
  { file: '04-settings.png', lead: 'Your rhythm,', accent: 'your level' },
];

const LEVEL = {
  n5: '#10B981',
  n4: '#14B8A6',
  n3: '#3B82F6',
  n2: '#8B5CF6',
  n1: '#F43F5E',
};

// Every card sits ON a seam (0.2, 0.4, 0.6, 0.8) or on the canvas edge
// (0.0, 1.0), centred there so the clip cuts it in half and the eye completes
// it across the gallery gap.
//
// Nothing sits mid-panel: the phone occupies the centre of every panel, and a
// card there would cover the app UI. The gutter beside the phone is the only
// place a card can live without hiding what the reviewer needs to see.
const CARDS = [
  { at: 0.0, y: 0.34, level: 'n5' },
  { at: 0.2, y: 0.62, level: 'n5' },
  { at: 0.4, y: 0.36, level: 'n4' },
  { at: 0.6, y: 0.64, level: 'n3' },
  { at: 0.8, y: 0.38, level: 'n2' },
  { at: 1.0, y: 0.60, level: 'n1' },
];

// The widget capture carries iOS's default rainbow wallpaper, which fights the
// beige ground. The wallpaper is desaturated and lifted while the Yumo widget
// is composited back at full strength — a flat desaturation drains its green
// along with everything else, and the widget is the point of the shot.
const WIDGET_RECT = { left: 89, top: 296, width: 519, height: 518 };
const WIDGET_RADIUS = 96;

async function soften(input) {
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDGET_RECT.width}" height="${WIDGET_RECT.height}">` +
      `<rect width="${WIDGET_RECT.width}" height="${WIDGET_RECT.height}" ` +
      `rx="${WIDGET_RADIUS}" ry="${WIDGET_RADIUS}" fill="#fff"/></svg>`,
  );
  const widget = await sharp(input)
    .extract(WIDGET_RECT)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Composite at full resolution and resize in a second pass: sharp applies
  // resize before composite within one pipeline regardless of call order.
  return sharp(input)
    .modulate({ saturation: 0.26, brightness: 1.16 })
    .composite([{ input: widget, left: WIDGET_RECT.left, top: WIDGET_RECT.top }])
    .png()
    .toBuffer();
}

function words() {
  const src = readFileSync(resolve(here, '../lib/words.ts'), 'utf8');
  const list = JSON.parse(src.slice(src.indexOf('= [') + 2, src.indexOf('];') + 1));
  const byLevel = {};
  for (const l of Object.keys(LEVEL)) {
    byLevel[l] = list.filter(
      (w) => w.level === l && w.meaning.en.length <= 24 && w.kanji.length <= 2,
    );
  }
  return byLevel;
}

function html({ w, h }, images, pool) {
  const W = w * PANELS.length;
  const s = (n) => Math.round(n * (w / 1290)); // scale from the 6.9" reference

  const cards = CARDS.map((c, i) => {
    const list = pool[c.level];
    const word = list[i % list.length];
    const color = LEVEL[c.level];
    return `
      <div class="card" style="left:${c.at * W - s(300) / 2}px; top:${c.y * h}px; box-shadow:0 ${s(24)}px ${s(56)}px -${s(30)}px ${color}66, 0 ${s(3)}px ${s(6)}px rgba(58,46,34,.07)">
        <span class="badge" style="background:${color}">${c.level.toUpperCase()}</span>
        <p class="kanji">${word.kanji}</p>
        <p class="reading">${word.kana} · ${word.romaji}</p>
        <p class="meaning">${word.meaning.en}</p>
      </div>`;
  }).join('');

  const panels = PANELS.map(
    (p, i) => `
      <section class="panel">
        <h2><span class="lead">${p.lead}</span><span class="accent">${p.accent}</span></h2>
        <img class="shot" src="${images[i]}" alt="">
      </section>`,
  ).join('');

  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Schibsted+Grotesk:wght@600&display=swap">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:${W}px; height:${h}px; background:#FAF6EF; overflow:hidden;
         font-family:'Schibsted Grotesk',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
  .canvas { position:relative; width:${W}px; height:${h}px; }

  /* One continuous wash walking the JLPT ladder N5 to N1 across the five
     panels, so scrolling the gallery is scrolling the level progression. */
  .wash { position:absolute; inset:0; background:
      radial-gradient(${s(900)}px ${s(900)}px at 8% 22%,  #10B98140, transparent 72%),
      radial-gradient(${s(900)}px ${s(900)}px at 30% 72%, #14B8A638, transparent 72%),
      radial-gradient(${s(950)}px ${s(950)}px at 50% 20%, #3B82F638, transparent 72%),
      radial-gradient(${s(900)}px ${s(900)}px at 72% 74%, #8B5CF63A, transparent 72%),
      radial-gradient(${s(900)}px ${s(900)}px at 93% 26%, #F43F5E34, transparent 72%);
  }

  .cards { position:absolute; inset:0; }
  .card { position:absolute; width:${s(300)}px; padding:${s(26)}px ${s(28)}px;
          border:1px solid #E8DFD0; border-radius:${s(34)}px; background:rgba(255,255,255,.78); }
  .badge { display:inline-block; border-radius:999px; padding:${s(4)}px ${s(14)}px;
           font-size:${s(20)}px; font-weight:600; letter-spacing:.06em; color:#fff; }
  .kanji { margin-top:${s(14)}px; font-size:${s(58)}px; line-height:1;
           font-family:'Hiragino Sans','Yu Gothic','Noto Sans JP',sans-serif; color:#201C17; }
  .reading { margin-top:${s(12)}px; font-size:${s(22)}px; color:#6E6354;
             font-family:'Hiragino Sans','Yu Gothic','Noto Sans JP',sans-serif; }
  .meaning { margin-top:${s(8)}px; font-size:${s(24)}px; color:#201C17; line-height:1.3; }

  .panels { position:absolute; inset:0; display:flex; }
  .panel { position:relative; width:${w}px; height:${h}px; flex:none;
           display:flex; flex-direction:column; align-items:center; }
  h2 { margin-top:${Math.round(h * 0.068)}px; width:${Math.round(w * 0.82)}px; text-align:center;
       font-size:${Math.round(w * 0.083)}px; line-height:1.16; letter-spacing:-.015em; color:#201C17; }
  .lead { display:block; }
  .accent { display:block; font-family:'Instrument Serif',Georgia,serif;
            font-style:italic; font-weight:400; }
  /* Bleeds off the bottom rather than fading: a store panel has to keep the
     app legible, and a dissolve would hide content the reviewer looks for. */
  .shot { position:absolute; top:${Math.round(h * 0.315)}px; width:${Math.round(w * 0.70)}px;
          border-radius:${s(58)}px;
          box-shadow:0 ${s(6)}px ${s(18)}px rgba(58,46,34,.10), 0 ${s(60)}px ${s(110)}px -${s(50)}px rgba(58,46,34,.55); }
</style></head>
<body><div class="canvas">
  <div class="wash"></div>
  <div class="cards">${cards}</div>
  <div class="panels">${panels}</div>
</div></body></html>`;
}

// ---------------------------------------------------------------- run

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

const pool = words();

// Pre-process the captures once; every target reuses them.
//
// Inlined as data URIs rather than referenced from disk. A page built with
// setContent has an about:blank origin, and file:// requests from there are
// blocked, so the shots load as nothing and the panels come out empty with no
// error anywhere. Downscaled to 1100px first — they render at roughly 1000 —
// so the inlined payload stays reasonable.
const images = [];
for (const p of PANELS) {
  const input = resolve(SRC, p.file);
  const buf = p.soften ? await soften(input) : readFileSync(input);
  const jpeg = await sharp(buf).resize(1100).jpeg({ quality: 92 }).toBuffer();
  images.push(`data:image/jpeg;base64,${jpeg.toString('base64')}`);
}

const browser = await chromium.launch();

for (const target of TARGETS) {
  const dir = resolve(OUT, target.name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const page = await browser.newPage({
    viewport: { width: target.w * PANELS.length, height: target.h },
    deviceScaleFactor: 1,
  });
  await page.setContent(html(target, images, pool), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  for (let i = 0; i < PANELS.length; i++) {
    const name = `${String(i + 1).padStart(2, '0')}.png`;
    await page.screenshot({
      path: resolve(dir, name),
      clip: { x: i * target.w, y: 0, width: target.w, height: target.h },
    });
  }
  await page.close();
  console.log(`${target.name}: ${PANELS.length} panels at ${target.w}x${target.h}`);
}

await browser.close();
rmSync(TMP, { recursive: true, force: true });
console.log(`written to ${OUT}`);
