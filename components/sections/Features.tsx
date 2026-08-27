import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';

const FEATURES = [
  { title: 'Hear every word', body: "Native pronunciation through your device's Japanese voice. No downloads, no streaming." },
  { title: 'Trace the strokes', body: 'Practise writing kanji and kana with guided stroke order from KanjiVG.' },
  { title: 'Four meaning languages', body: 'English, French, German and Spanish, all bundled in the app.' },
  { title: 'Save what matters', body: 'Keep the words you want to revisit; they stay on your device.' },
  { title: 'Notifications, same rhythm', body: 'Optional word notifications on the widget schedule, scheduled locally.' },
  { title: 'Themes', body: 'Light, dark or system, plus widget colours, transparency and text colour with Pro.' },
  { title: 'Browse the dictionary', body: '7,972 words with readings and meanings. N5 on the free tier, every level with Pro.' },
  { title: 'Completely offline', body: 'The whole dataset ships inside the app. Yumo makes no network requests of its own.' },
];

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      title={<>Small app, <span className="font-serif font-normal italic">deep</span> app</>}
      lede="Everything below works without an account, without a connection, and without sending anything anywhere."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 4) * 0.06}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
              <h3 className="text-[15px] font-semibold">{f.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
