import type { CSSProperties } from 'react';
import { Reveal } from '@/components/layout/Reveal';
import { Logo } from '@/components/ui/Logo';
import { FAN_WORDS } from '@/lib/fan-words';
import type { Dictionary, Locale } from '@/lib/i18n';

const RATIOS = ['9:16', '3:4', '4:5', '1:1'];

// Photos are the app's placeholder gallery: replace with the owner's photos
// when the app's gallery is replaced, before STORY_MAKER_LIVE is switched on.
const CARDS = [
  { word: 3, photo: 'story-1', r: -6, x: -148, y: 26, z: 1 },
  { word: 2, photo: 'story-2', r: 0, x: 0, y: 0, z: 3 },
  { word: 1, photo: 'story-3', r: 6, x: 148, y: 26, z: 1 },
];

export function StorySection({ locale, t }: { locale: Locale; t: Dictionary['story'] }) {
  return (
    <section id="share" className="mx-auto grid w-full max-w-6xl items-center gap-12 overflow-hidden px-6 py-24 md:grid-cols-2 md:py-32">
      <Reveal>
        <p className="text-sm text-accent">{t.eyebrow}</p>
        <h2 className="mt-3 text-[40px] font-semibold leading-[1.06] tracking-[-0.03em] md:text-[56px]">
          {t.titleLead}
          <br />
          <span className="font-serif text-[1.08em] font-normal italic text-accent">{t.titleAccent}</span>
        </h2>
        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">{t.lede}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {RATIOS.map((r) => (
            <li key={r} className="rounded-full border border-line px-3.5 py-1.5 text-[13px]">
              {r}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="story-fan relative h-[420px]" aria-hidden>
        {CARDS.map(({ word: index, photo, r, x, y, z }) => {
          const word = FAN_WORDS[index];
          return (
            <div
              key={photo}
              className="story-card"
              style={
                {
                  '--x': `${x}px`,
                  '--r': `${r}deg`,
                  '--y': `${y}px`,
                  zIndex: z,
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.28), rgba(0,0,0,.34) 60%, rgba(0,0,0,.72)), url(/story/${photo}.jpg)`,
                } as CSSProperties
              }
            >
              <div className="absolute left-5 top-20 flex gap-1.5">
                <span className="self-end whitespace-nowrap font-serif text-[12px] uppercase tracking-[0.2em] [transform:rotate(180deg)] [writing-mode:vertical-rl]">
                  {word.meaning[locale]}
                </span>
                <span>
                  <span lang="ja" className="block font-jp font-medium leading-tight" style={{ fontSize: word.kanji.length > 2 ? 22 : 34 }}>
                    {word.kanji}
                  </span>
                  <span className="mt-1.5 block font-serif text-[14px]">/ {word.reading} /</span>
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-[11px]">
                <Logo height={22} />
                <span>{t.caption}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
