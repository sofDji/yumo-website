// Visual check for a running build. Serve the site first, then:
//   npx serve out -l 4191 &   npm run shot
//
// Sections animate in on scroll, so each one is scrolled into view and given
// time to finish before capture — screenshotting without that catches the
// reveal mid-blur and looks like a rendering bug.
import { chromium } from 'playwright';

const URL = process.env.SHOT_URL ?? 'http://localhost:4191/';
const SECTIONS = ['how', 'lockscreen', 'widget', 'features', 'levels', 'browse', 'pricing'];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 950 },
  deviceScaleFactor: 2,
});

await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'shots-out/hero.png' });
console.log('hero');

for (const id of SECTIONS) {
  const el = await page.$('#' + id);
  if (!el) continue;
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  await el.screenshot({ path: `shots-out/${id}.png` });
  console.log(id);
}

await browser.close();
