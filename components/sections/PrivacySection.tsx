import Link from 'next/link';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';
import type { Dictionary } from '@/lib/i18n';

export function PrivacySection({ t }: { t: Dictionary['privacy'] }) {
  return (
    <Section
      id="privacy"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.titleLead} <span className="font-serif font-normal italic">{t.titleAccent}</span>
        </>
      }
      lede={t.lede}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {t.claims.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.08}>
            <div className="h-full rounded-2xl border border-line bg-surface p-7 shadow-soft">
              <h3 className="text-[15px] font-semibold">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        {t.exceptionBefore}
        {/* Always the English policy: it is the binding version and the one
            the App Store listing cites. */}
        <Link href="/privacy" className="text-accent underline underline-offset-2">
          {t.exceptionLink}
        </Link>
        {t.exceptionAfter}
      </p>
    </Section>
  );
}
