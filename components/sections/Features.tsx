import type { ReactNode } from 'react';
import {
  AudioMark,
  BrowseMark,
  FavouriteMark,
  OfflineMark,
  ScheduleMark,
} from '@/components/features/Marks';
import { MeaningGrid } from '@/components/features/MeaningGrid';
import { StrokeDemo } from '@/components/features/StrokeDemo';
import { ThemeFlip } from '@/components/features/ThemeFlip';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import type { FeatureId } from '@/lib/features';
import type { Dictionary } from '@/lib/i18n';

// Eight equal boxes said all eight things and showed none of them. The bento
// gives the features that can demonstrate themselves the room to do it and
// keeps the rest compact:
//
//   ┌────────────────────┬──────────┬──────────┐
//   │ strokes            │ audio    │ favourite│
//   │   学, drawing  2×2 ├──────────┴──────────┤
//   │                    │ languages      2×1  │
//   ├────────────────────┼──────────┬──────────┤
//   │ browse        2×1  │ themes   │ notifs   │
//   ├────────────────────┴──────────┴──────────┤
//   │ offline                             4×1  │
//   └───────────────────────────────────────────┘
//
// The spans below are exactly what row-major auto-placement needs to build
// that grid from the dictionary's order — no explicit starts, so a card that
// changes size cannot leave a hole somewhere else.
const PLACEMENT: Record<FeatureId, string> = {
  strokes: 'sm:col-span-2 lg:row-span-2',
  audio: '',
  favourites: '',
  languages: 'sm:col-span-2',
  browse: 'sm:col-span-2',
  themes: '',
  notifications: '',
  offline: 'sm:col-span-2 lg:col-span-4',
};

const VISUALS: Record<FeatureId, ReactNode> = {
  strokes: <StrokeDemo />,
  audio: <AudioMark />,
  favourites: <FavouriteMark />,
  languages: <MeaningGrid />,
  browse: <BrowseMark />,
  themes: <ThemeFlip />,
  notifications: <ScheduleMark />,
  offline: <OfflineMark />,
};

export function Features({ t }: { t: Dictionary['features'] }) {
  return (
    <Section
      id="features"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
          {t.titleTail ? ` ${t.titleTail}` : ''}
        </>
      }
      lede={t.lede}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((f, i) => {
          const id = f.id as FeatureId;
          // The character drawing itself is the point of its card, so it takes
          // the height and the words sit under it. The offline band is one row
          // tall across the full width, so its mark sits beside them instead.
          const hero = id === 'strokes';
          const band = id === 'offline';

          const words = (
            <>
              <h3 className="text-[15px] font-semibold">{f.title}</h3>
              <p
                className="mt-2 text-[14px] leading-relaxed text-muted"
                dangerouslySetInnerHTML={{ __html: f.body }}
              />
            </>
          );

          return (
            <Reveal key={f.id} delay={(i % 4) * 0.06} className={PLACEMENT[id]}>
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
                {band ? (
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    {VISUALS[id]}
                    <div className="min-w-[240px] max-w-prose flex-1">{words}</div>
                  </div>
                ) : (
                  <>
                    {/* Every card that is not the hero opens the same 100px
                        well, whatever it puts in it, so the titles across a
                        row start on one line instead of stepping with the
                        height of each illustration. */}
                    <div
                      className={
                        hero
                          ? 'flex flex-1 items-center justify-center py-4'
                          : 'mb-5 flex h-[100px] items-center'
                      }
                    >
                      {VISUALS[id]}
                    </div>
                    {words}
                  </>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
