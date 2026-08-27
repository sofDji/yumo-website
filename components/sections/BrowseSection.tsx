import { BrowseScreen } from '@/components/illustrations/BrowseScreen';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { WORDS } from '@/lib/words';
import { TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';

// One word per level, five rows. The illustration only needs to say "you can
// look words up"; a dense list forces the type down until it is texture
// rather than something anyone reads. Meanings are capped at 22 characters so
// no row truncates at this size.
const BROWSE_ROWS = ['n5', 'n4', 'n3', 'n2', 'n1'].map(
  (level) =>
    WORDS.filter((w) => w.level === level && w.meaning.length <= 22)[0] ??
    WORDS.filter((w) => w.level === level)[0],
);

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
          <BrowseScreen words={BROWSE_ROWS} />
        </Reveal>
      </div>
    </Section>
  );
}
