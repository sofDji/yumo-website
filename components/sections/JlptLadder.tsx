import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { LEVELS, LEVEL_COLORS, LEVEL_LABELS, TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';

const BLURB: Record<string, string> = {
  n5: 'The first 718 words. Everything on the free tier.',
  n4: 'Everyday verbs and adjectives you will actually hear.',
  n3: 'The bridge level, and the largest jump in vocabulary.',
  n2: 'Newspaper and workplace Japanese.',
  n1: 'The long tail — 2,699 words most courses never reach.',
};

export function JlptLadder() {
  return (
    <Section
      id="levels"
      eyebrow="Levels"
      title={<>N5 to N1, or let it <span className="font-serif font-normal italic">climb</span></>}
      lede={`All ${TOTAL_WORDS.toLocaleString('en-US')} words, graded by JLPT level. Pick one and stay there, or turn on Auto and let Yumo move you up as you go, weaving earlier words back in for review.`}
    >
      <ul className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
        {LEVELS.map((level, i) => (
          <Reveal key={level} delay={i * 0.05}>
            <li className="group relative flex items-center gap-5 overflow-hidden border-b border-line px-6 py-5 last:border-b-0">
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `${LEVEL_COLORS[level]}0F` }}
              />
              <span
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{ background: LEVEL_COLORS[level] }}
              >
                {LEVEL_LABELS[level]}
              </span>
              <span className="relative z-10 flex-1 text-[15px] font-medium">{BLURB[level]}</span>
              <span className="relative z-10 shrink-0 text-sm tabular-nums text-muted">
                {WORD_COUNTS[level].toLocaleString('en-US')} words
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
