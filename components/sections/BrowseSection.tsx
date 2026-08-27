import { PhoneShot } from '@/components/hero/PhoneShot';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { SHOTS } from '@/lib/shots';
import { TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';

export function BrowseSection() {
  return (
    <Section
      id="browse"
      eyebrow="Browse"
      title={<>The whole dictionary, <span className="font-serif font-normal italic">searchable</span></>}
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Search {TOTAL_WORDS.toLocaleString('en-US')} words by kanji, kana,
              romaji or meaning. Every entry carries its reading, its romaji, its
              JLPT level and meanings in English, French, German and Spanish.
            </p>
            <p>
              On the free tier Browse covers N5 — {WORD_COUNTS.n5} words. Yumo Pro
              opens every level above it.
            </p>
            <p>It all ships inside the app, so search works with no connection at all.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto max-w-[280px]">
            <PhoneShot shot={SHOTS.browse} alt="Browsing the Yumo dictionary" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
