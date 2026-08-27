import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';

const STEPS = [
  {
    n: '01',
    title: 'Add the widget',
    body: 'Long-press your Lock Screen or Home Screen and drop Yumo in. That is the entire setup.',
  },
  {
    n: '02',
    title: 'Pick your rhythm',
    body: 'A new word every 6, 12 or 24 hours on the free tier. Every 1, 2, 3 or 4 hours with Pro.',
  },
  {
    n: '03',
    title: 'Stop thinking about it',
    body: 'Words arrive while you check the time. Tap one to hear it, save it, or trace its strokes.',
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title={<>Three steps, then <span className="font-serif font-normal italic">nothing</span></>}
      lede="Yumo is designed to be set up once and then forgotten. The learning happens on screens you already look at."
    >
      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
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
