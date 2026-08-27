import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import type { Dictionary } from '@/lib/i18n';

export function HowItWorks({ t }: { t: Dictionary['how'] }) {
  return (
    <Section
      id="how"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
        </>
      }
      lede={t.lede}
    >
      <ol className="grid gap-6 md:grid-cols-3">
        {t.steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <li className="h-full rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <span className="font-serif text-2xl italic text-accent">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
