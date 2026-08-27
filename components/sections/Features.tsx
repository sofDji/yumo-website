import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import type { Dictionary } from '@/lib/i18n';

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
        {t.items.map((f, i) => (
          <Reveal key={f.title} delay={(i % 4) * 0.06}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
              <h3 className="text-[15px] font-semibold">{f.title}</h3>
              <p
                className="mt-2 text-[14px] leading-relaxed text-muted"
                dangerouslySetInnerHTML={{ __html: f.body }}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
