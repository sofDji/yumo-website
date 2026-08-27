import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import { fill, type Dictionary } from '@/lib/i18n';
import { LEVELS, LEVEL_COLORS, LEVEL_LABELS, TOTAL_WORDS, WORD_COUNTS } from '@/lib/tokens';

export function JlptLadder({ t, nf }: { t: Dictionary['levels']; nf: Intl.NumberFormat }) {
  return (
    <Section
      id="levels"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
        </>
      }
      lede={fill(t.lede, { total: nf.format(TOTAL_WORDS) })}
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
              <span className="relative z-10 flex-1 text-[15px] font-medium">
                {t.blurbs[level]}
              </span>
              <span className="relative z-10 shrink-0 text-sm tabular-nums text-muted">
                {fill(t.words, { n: nf.format(WORD_COUNTS[level]) })}
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
