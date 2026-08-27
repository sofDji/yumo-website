import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy — Yumo',
  description:
    'Yumo has no accounts, no analytics and no tracking. Here is exactly what that means.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Yumo — Privacy Policy" updated="Effective August 17, 2026">
      <p>
        Yumo is a Japanese vocabulary app. It is built to work entirely on your
        device: it has no accounts, no analytics, no advertising, and no tracking.
      </p>

      <h2>Data stored on your device</h2>
      <p>
        Your settings (JLPT level, word frequency, language, widget style, theme),
        your saved words, and your learning progress are stored only on your
        device. They are never transmitted to us or anyone else. Word notifications
        are scheduled locally on your device. Deleting the app deletes all of this
        data.
      </p>

      <h2>Purchases</h2>
      <p>
        Yumo offers one optional one-time purchase, Yumo Pro, processed by
        Apple&apos;s App Store or Google Play. To validate purchases and enable
        restoring them, Yumo uses{' '}
        <a href="https://www.revenuecat.com/privacy">RevenueCat</a>, which receives
        an anonymous app-generated identifier and your purchase history for this
        app. RevenueCat cannot identify you personally from this data, and it is
        used for no purpose other than making your purchase work. Payment details
        are handled entirely by Apple or Google and never reach Yumo or RevenueCat.
      </p>

      <h2>What we never collect</h2>
      <p>
        No name, email, location, contacts, photos, microphone audio, usage
        analytics, or advertising identifiers. Yumo makes no network requests of
        its own — the entire word dataset ships inside the app and works offline.
      </p>

      <h2>Children</h2>
      <p>Yumo collects no personal data from anyone, including children.</p>

      <h2>Changes</h2>
      <p>
        If this policy ever changes, the updated version will be posted at this
        address with a new effective date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
