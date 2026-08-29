import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { JsonLd } from '@/components/seo/JsonLd';
import { pageGraph } from '@/lib/schema';
import { SUPPORT_EMAIL } from '@/lib/site';

const DESCRIPTION =
  'The terms covering Yumo and the one-time Yumo Pro purchase: acceptable use, refunds, and the open dictionary data Yumo credits.';

export const metadata: Metadata = {
  title: 'Yumo Terms of Use — the app, Pro and attribution',
  description: DESCRIPTION,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalLayout locale="en" title="Yumo — Terms of Use" updated="Effective August 17, 2026">
      <JsonLd
        data={pageGraph({
          locale: 'en',
          path: '/terms',
          name: 'Terms of Use',
          description: DESCRIPTION,
        })}
      />
      <h2>The app</h2>
      <p>
        Yumo helps you learn Japanese vocabulary through widgets, notifications,
        and practice tools. It is provided as-is, without warranty of any kind.
        Word translations and stroke diagrams are provided for study purposes; we
        work to keep them accurate but cannot guarantee they are error-free.
      </p>

      <h2>Yumo Pro</h2>
      <p>
        Yumo Pro is a single one-time purchase — not a subscription — processed by
        Apple&apos;s App Store or Google Play under their respective terms. It
        unlocks additional JLPT levels, faster word frequencies, and widget styling
        on devices signed in to the same store account. After reinstalling the app,
        use &quot;Restore purchase&quot; on the upgrade screen to bring Pro back at
        no charge. Refunds are handled by Apple or Google under their store
        policies.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don&apos;t attempt to resell, redistribute, or extract the app&apos;s
        bundled dictionary data for other products; the underlying open datasets
        are available from their original sources under their own licenses.
      </p>

      <h2>Attribution</h2>
      <p>
        Stroke order diagrams © <a href="https://kanjivg.tagaini.net">KanjiVG</a>{' '}
        (Ulrich Apel), CC BY-SA. French, German and Spanish translations include
        data from{' '}
        <a href="https://www.edrdg.org/jmdict/j_jmdict.html">JMdict/EDICT</a>{' '}
        (EDRDG), used under CC BY-SA 4.0.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
