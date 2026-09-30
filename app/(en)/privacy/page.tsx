import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { JsonLd } from '@/components/seo/JsonLd';
import { shareMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/schema';
import { SUPPORT_EMAIL } from '@/lib/site';

const DESCRIPTION =
  'Yumo has no accounts, no advertising and no tracking. What the app sends, to whom, and what this website measures.';

const TITLE = 'Yumo Privacy Policy — no accounts, no tracking';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/privacy' },
  ...shareMetadata({ locale: 'en', path: '/privacy', title: TITLE, description: DESCRIPTION }),
};

export default function PrivacyPage() {
  return (
    <LegalLayout locale="en" title="Yumo — Privacy Policy" updated="Effective September 30, 2026">
      <JsonLd
        data={pageGraph({
          locale: 'en',
          path: '/privacy',
          name: 'Privacy Policy',
          description: DESCRIPTION,
        })}
      />
      <p>
        Yumo is a Japanese vocabulary app. It is built to work entirely on your
        device: it has no accounts, no advertising, and no tracking.
      </p>

      <h2>Data stored on your device</h2>
      <p>
        Your settings (JLPT level, word frequency, language, widget style, theme),
        your saved words, and your learning progress are stored only on your
        device. They are never transmitted to us or anyone else. Word notifications
        are scheduled locally on your device. Deleting the app deletes all of this
        data.
      </p>

      <h2>News &amp; updates notifications</h2>
      <p>
        On iPhone, if you allow notifications, Yumo can occasionally send you
        news about new features and study tips. These are delivered through{' '}
        <a href="https://onesignal.com/privacy_policy">OneSignal</a>, which
        receives the push token Apple assigns to your device, an anonymous
        identifier, your device model, operating system version, language, time
        zone and IP address, and when you open the app or a notification. This is
        used only to deliver these notifications and count how many were opened —
        never for advertising, and it is not linked to your name or email, which
        Yumo never asks for. Turn off <em>News &amp; updates</em> in Yumo&apos;s
        Settings to stop them at any time.
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
        No name, email, location, contacts, photos, microphone audio, or
        advertising identifiers. The entire word dataset ships inside the app and
        works offline. Besides RevenueCat and OneSignal, as described above,
        Yumo&apos;s only network request is a daily check of a public file on this
        website to see whether a newer version is available; it sends nothing
        about you.
      </p>

      <h2>This website</h2>
      <p>
        Everything above describes the app. This website is a separate thing, and
        it does measure traffic: we use{' '}
        <a href="https://vercel.com/docs/analytics/privacy-policy">
          Vercel Web Analytics
        </a>
        , which counts page views and referrers without cookies, without a device
        or browser fingerprint, and without any identifier that could follow you
        to another site. We can see that a page was visited. We cannot see who
        visited it, and we cannot recognise you on a second visit. Installing the
        app carries none of this with it.
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
