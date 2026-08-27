import type { Dictionary } from '@/lib/i18n';
import { APP_STORE_URL, PLAY_STORE_URL, storeState } from '@/lib/site';
import { Button } from './Button';

// Renders "coming soon" until lib/site.ts declares a launch with both URLs.
export function StoreCta({ t }: { t: Dictionary['cta'] }) {
  if (storeState() === 'coming-soon') {
    return (
      <div className="flex flex-col items-center gap-3">
        <Button>{t.comingSoon}</Button>
        <p className="text-sm text-muted">{t.freeOn}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button href={APP_STORE_URL}>{t.iphone}</Button>
      <Button href={PLAY_STORE_URL} variant="ghost">
        {t.android}
      </Button>
    </div>
  );
}
