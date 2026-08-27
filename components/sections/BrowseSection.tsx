import { BrowseScreen } from '@/components/illustrations/BrowseScreen';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { WORDS } from '@/lib/words';
import { TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';

// Seven rows, ordered N5 -> N1, so the illustration shows the whole ladder.
// The frame fits eight before the nav pill is pushed out, and an
// alphabetical slice of the dataset would have shown nothing but N5.
const LADDER: { level: string; count: number }[] = [
  { level: 'n5', count: 2 },
  { level: 'n4', count: 2 },
  { level: 'n3', count: 1 },
  { level: 'n2', count: 1 },
  { level: 'n1', count: 1 },
];

const BROWSE_ROWS = LADDER.flatMap(({ level, count }) =>
  WORDS.filter((w) => w.level === level).slice(0, count),
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
