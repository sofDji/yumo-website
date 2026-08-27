// Generates App Store and Play Store screenshot panels.
//
// The panels are rendered as ONE continuous canvas (panel width x panel
// count) and then clipped, so the background really is continuous rather than
// several backgrounds that approximately line up. Elements straddling a seam
// are cut by the clip, which is what sells the panorama in a scrolling
// gallery.
//
// Run with `npm run shots:store`.
import { createReadStream, existsSync, mkdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const APP = resolve(here, '../../Yumo');
const SRC = resolve(APP, 'store-screenshots/ios-6.9');
const OUT = resolve(APP, 'store-screenshots/store-panels');

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
// The two widget placements are the drawn illustrations from the site, not
// captures. There is no Lock Screen capture at all, and the Home Screen one
// carries iOS's rainbow wallpaper, which fights the panel ground — replacing
// that wallpaper is possible but turns the white app labels invisible against
// the new light background. The illustrations sidestep both and match the
// site. Everything after them is the real app, whose own UI is already this
// beige, so the two kinds sit together rather than clashing.
const PANELS = [
  { frame: '#frame-lock', lead: 'A new word,', accent: 'before you unlock' },
  { frame: '#frame-home', lead: 'And on the screen', accent: 'you work from' },
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

// Every card sits ON a seam or on the canvas edge, centred there so the clip
// cuts it in half and the eye completes it across the gallery gap. Fractions
// are of the FULL canvas, so they track the panel count.
//
// Nothing sits mid-panel: the phone occupies the centre of every panel, and a
// card there would cover the app UI. The gutter beside the phone is the only
// place a card can live without hiding what the reviewer needs to see.
const CARDS = [
  { at: 0 / 6, y: 0.34, level: 'n5' },
  { at: 1 / 6, y: 0.62, level: 'n5' },
  { at: 2 / 6, y: 0.36, level: 'n4' },
  { at: 3 / 6, y: 0.64, level: 'n3' },
  { at: 4 / 6, y: 0.38, level: 'n2' },
  { at: 5 / 6, y: 0.60, level: 'n1' },
  { at: 6 / 6, y: 0.36, level: 'n1' },
];

// Serves out/ so the illustration components can be screenshotted from a real
// route. Rendering them here instead would mean a second copy of their markup
// that drifts from the site's.
function serveStatic(root) {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
                  '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json',
                  '.svg': 'image/svg+xml', '.txt': 'text/plain' };
  const server = createServer((req, res) => {
    let p = join(root, decodeURIComponent(req.url.split('?')[0]));
    if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
    if (!existsSync(p) && existsSync(p + '.html')) p += '.html';
    if (!existsSync(p)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' });
    createReadStream(p).pipe(res);
  });
  return new Promise((ok) => server.listen(0, () => ok({ server, port: server.address().port })));
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
        <img class="shot ${PANELS[i].frame ? 'drawn' : ''}" src="${images[i]}" alt="">
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

  /* One continuous wash walking the JLPT ladder N5 to N1 across the panels,
     so scrolling the gallery is scrolling the level progression. */
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
  /* The drawn frames already dissolve into the ground and carry their own
     soft edge; a clip and a drop shadow would draw the rectangle back on. */
  .shot.drawn { border-radius:0; box-shadow:none; top:${Math.round(h * 0.285)}px;
                width:${Math.round(w * 0.74)}px; }
</style></head>
<body><div class="canvas">
  <div class="wash"></div>
  <div class="cards">${cards}</div>
  <div class="panels">${panels}</div>
</div></body></html>`;
}

// ---------------------------------------------------------------- run

const pool = words();

// Pre-process the captures once; every target reuses them.
//
// Inlined as data URIs rather than referenced from disk. A page built with
// setContent has an about:blank origin, and file:// requests from there are
// blocked, so the shots load as nothing and the panels come out empty with no
// error anywhere. Downscaled to 1100px first — they render at roughly 1000 —
// so the inlined payload stays reasonable.
const browser = await chromium.launch();

// Illustration panels are screenshotted off the site's own /store-frames
// route at 4x, so they use the same components the site does rather than a
// second copy of their markup. PNG rather than JPEG: flat colour and text is
// where JPEG ringing shows.
const { server, port } = await serveStatic(resolve(here, '../out'));
const framePage = await browser.newPage({
  viewport: { width: 1400, height: 1400 },
  deviceScaleFactor: 4,
});
await framePage.goto(`http://127.0.0.1:${port}/store-frames`, { waitUntil: 'networkidle' });
await framePage.evaluate(() => document.fonts.ready);
await framePage.waitForTimeout(400);

const images = [];
for (const p of PANELS) {
  if (p.frame) {
    const shot = await framePage.locator(p.frame).screenshot({ omitBackground: true });
    images.push(`data:image/png;base64,${shot.toString('base64')}`);
  } else {
    const buf = readFileSync(resolve(SRC, p.file));
    const jpeg = await sharp(buf).resize(1100).jpeg({ quality: 92 }).toBuffer();
    images.push(`data:image/jpeg;base64,${jpeg.toString('base64')}`);
  }
}
await framePage.close();
server.close();

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
console.log(`written to ${OUT}`);
