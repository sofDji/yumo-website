import { APP_STORE_URL, PLAY_STORE_URL, storeState } from '@/lib/site';
import { Button } from './Button';

// Renders "coming soon" until lib/site.ts declares a launch with both URLs.
export function StoreCta() {
  if (storeState() === 'coming-soon') {
    return (
      <div className="flex flex-col items-center gap-3">
        <Button>Coming soon</Button>
        <p className="text-sm text-muted">Free on the App Store and Google Play</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button href={APP_STORE_URL}>Download for iPhone</Button>
      <Button href={PLAY_STORE_URL} variant="ghost">
        Get it on Android
      </Button>
    </div>
  );
}
