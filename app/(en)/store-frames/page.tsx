import type { Metadata } from 'next';
import { HomeScreen } from '@/components/illustrations/HomeScreen';
import { LockScreen } from '@/components/illustrations/LockScreen';
import { WORDS } from '@/lib/words';

// Internal render target for scripts/store-shots.mjs. It exists so the store
// panels use the SAME illustration components as the site rather than a
// second copy of their markup that would quietly drift. Not linked from
// anywhere and excluded from indexing.
export const metadata: Metadata = {
  title: 'Store frames',
  robots: { index: false, follow: false },
};

const WORD = WORDS.find((w) => w.kanji === '明日') ?? WORDS[0];

export default function StoreFramesPage() {
  return (
    <main style={{ background: '#FAF6EF', padding: '40px', display: 'flex', gap: '40px' }}>
      <div id="frame-lock">
        <LockScreen word={WORD} locale="en" />
      </div>
      <div id="frame-home">
        <HomeScreen word={WORD} locale="en" />
      </div>
    </main>
  );
}
