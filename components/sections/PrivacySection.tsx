import Link from 'next/link';
import { Reveal } from '@/components/layout/Reveal';
import { Section } from '@/components/layout/Section';

const CLAIMS = [
  { title: 'No account', body: 'There is nothing to sign up for. Yumo has no login, no profile and no cloud sync.' },
  { title: 'No analytics', body: 'No usage tracking, no crash reporting, no advertising identifiers, no third-party SDKs beyond billing.' },
  { title: 'Nothing leaves the device', body: 'Settings, saved words and progress are stored locally. Deleting the app deletes all of it.' },
  { title: 'No network requests', body: 'The whole dataset ships inside the app. Yumo makes no requests of its own, so it works offline by design rather than by accident.' },
];

export function PrivacySection() {
  return (
    <Section
      id="privacy"
      eyebrow="Privacy"
      title={<>It collects <span className="font-serif font-normal italic">nothing</span></>}
      lede="Not as a policy decision that could change, but because there is no server to send anything to."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CLAIMS.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.08}>
            <div className="h-full rounded-2xl border border-line bg-surface p-7 shadow-soft">
              <h3 className="text-[15px] font-semibold">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        The one exception: buying Yumo Pro sends your purchase to Apple or Google
        and to RevenueCat, which validates it so you can restore it later. That is
        described in full in the{' '}
        <Link href="/privacy" className="text-accent underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
    </Section>
  );
}
