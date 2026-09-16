import type { Dictionary } from '@/lib/i18n';
import { APP_STORE_URL, PLAY_STORE_URL, storeState } from '@/lib/site';
import { Button } from './Button';

// One button per store that lists Yumo, driven by the listings in lib/site.
// While only one store does, a line underneath says which platform is still to
// come; with neither, it renders "coming soon" instead of a button linking
// nowhere.
export function StoreCta({ t }: { t: Dictionary['cta'] }) {
  const state = storeState();

  if (state === 'coming-soon') {
    return (
      <div data-store-cta className="flex flex-col items-center gap-3">
        <Button>{t.comingSoon}</Button>
        <p className="text-sm text-muted">{t.freeOn}</p>
      </div>
    );
  }

  // data-store-cta tells the floating AppBanner to step aside while this is on screen.
  return (
    <div data-store-cta className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {APP_STORE_URL !== '' && <Button href={APP_STORE_URL}>{t.iphone}</Button>}
        {PLAY_STORE_URL !== '' && (
          <Button href={PLAY_STORE_URL} variant={state === 'live' ? 'ghost' : 'primary'}>
            {t.android}
          </Button>
        )}
      </div>
      {state === 'ios' && <p className="text-sm text-muted">{t.androidSoon}</p>}
      {state === 'android' && <p className="text-sm text-muted">{t.iphoneSoon}</p>}
    </div>
  );
}
