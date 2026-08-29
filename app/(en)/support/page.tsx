import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { JsonLd } from '@/components/seo/JsonLd';
import { pageGraph } from '@/lib/schema';
import { SUPPORT_EMAIL } from '@/lib/site';

const DESCRIPTION =
  'Help with the Yumo widget, pronunciation, notifications, restoring Yumo Pro and refunds.';

export const metadata: Metadata = {
  title: 'Support — Yumo',
  description: DESCRIPTION,
  alternates: {
    canonical: '/support',
    languages: { en: '/support', fr: '/fr/support', 'x-default': '/support' },
  },
};

export default function SupportPage() {
  return (
    <LegalLayout locale="en" path="support" title="Yumo — Support">
      <JsonLd
        data={pageGraph({
          locale: 'en',
          path: '/support',
          name: 'Support',
          description: DESCRIPTION,
        })}
      />
      <p>
        Yumo shows you a new Japanese word every few hours, on your Lock Screen and
        Home Screen. If something isn&apos;t working, this page covers the common
        cases. Anything else, email us — we read every message.
      </p>

      <h2>Contact</h2>
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Please
        mention your device and iOS or Android version, and we&apos;ll usually
        reply within a couple of days.
      </p>

      <h2>Adding the widget</h2>
      <p>
        <strong>iPhone, Home Screen:</strong> touch and hold an empty area of the
        Home Screen, tap <strong>Edit</strong> then <strong>Add Widget</strong>,
        search for Yumo, and pick a size.
      </p>
      <p>
        <strong>iPhone, Lock Screen:</strong> touch and hold the Lock Screen, tap{' '}
        <strong>Customize</strong>, choose <strong>Lock Screen</strong>, tap a
        widget area, and select Yumo.
      </p>
      <p>
        <strong>Android:</strong> touch and hold an empty area of the home screen,
        tap <strong>Widgets</strong>, find Yumo, and drag it where you want it.
      </p>

      <h2>The widget isn&apos;t changing words</h2>
      <p>
        Yumo rotates on a fixed rhythm — every 6, 12 or 24 hours on the free tier,
        or every 1, 2, 3 or 4 hours with Yumo Pro. Between those points the word
        stays put; that&apos;s intended, not a fault.
      </p>
      <p>
        If it looks stuck well past its window, check that battery saver or low
        power mode isn&apos;t suspending background refresh, then remove the widget
        and add it again.
      </p>

      <h2>Pronunciation isn&apos;t playing</h2>
      <p>
        Yumo speaks through your device&apos;s built-in Japanese voice. If nothing
        is heard, make sure a Japanese voice is installed: on iPhone, Settings →
        Accessibility → Spoken Content → Voices; on Android, Settings →
        Accessibility → Text-to-speech output. Also check your device isn&apos;t
        muted.
      </p>

      <h2>Notifications aren&apos;t arriving</h2>
      <p>
        Notifications must be allowed for Yumo in your system settings, and the
        toggle in Yumo&apos;s own Settings screen must be on. Yumo schedules them
        locally on your device, so they work with no internet connection.
      </p>

      <h2>Restoring Yumo Pro</h2>
      <p>
        Yumo Pro is a one-time purchase tied to your App Store or Google Play
        account, not to any Yumo account. On a new device, or after reinstalling,
        open <strong>Settings</strong> in Yumo and tap{' '}
        <strong>Restore purchases</strong>, signed in with the same store account
        you bought it with.
      </p>
      <p>
        If it still doesn&apos;t restore, email us with the date of purchase and
        we&apos;ll help. Refunds are handled by Apple or Google, not by us — for
        the App Store use{' '}
        <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>; on
        Google Play, use the order history in your Google account.
      </p>

      <h2>A word looks wrong</h2>
      <p>
        Yumo&apos;s vocabulary comes from open Japanese dictionary data, and
        occasionally a reading or translation is off. Email us the word and what
        looks wrong, and we&apos;ll correct it in the next update.
      </p>

      <h2>Your data</h2>
      <p>
        Yumo has no accounts and collects no personal data. Everything — settings,
        saved words, progress — stays on your device, and deleting the app deletes
        it all. See the <Link href="/privacy">Privacy Policy</Link> and{' '}
        <Link href="/terms">Terms of Use</Link>.
      </p>
    </LegalLayout>
  );
}
