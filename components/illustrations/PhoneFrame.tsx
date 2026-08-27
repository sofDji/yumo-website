import type { ReactNode } from 'react';

// The shared device shell for every drawn screen. A real capture drags in
// whatever wallpaper and third-party icons were on the device, which fights
// the page and dates the image; these scale, stay on-palette, and can show
// any word.
export function PhoneFrame({
  children,
  bloom = '#10B981',
  tone = 'light',
  className = '',
}: {
  children: ReactNode;
  bloom?: string;
  tone?: 'light' | 'dusk';
  className?: string;
}) {
  const wallpaper =
    tone === 'dusk'
      ? 'linear-gradient(160deg, #E7E2EE 0%, #EFE7EA 42%, #F6EFE9 100%)'
      : 'linear-gradient(155deg, #F4F7F6 0%, #EFF2F7 38%, #F6F1F4 70%, #FAF6EF 100%)';

  return (
    <div className={`relative mx-auto w-full max-w-[286px] ${className}`}>
      {/* soft halo so the phone sits in light rather than on a hard edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-14%] rounded-full opacity-70 blur-[60px]"
        style={{ background: 'radial-gradient(closest-side, #FFFFFF, transparent)' }}
      />

      <div className="relative aspect-[9/17] w-full rounded-[2.6rem] border border-line bg-ground p-[7px] shadow-[0_2px_6px_rgba(58,46,34,.10),0_40px_70px_-40px_rgba(58,46,34,.45)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem]">
          <div aria-hidden className="absolute inset-0" style={{ background: wallpaper }} />
          <div
            aria-hidden
            className="absolute -left-10 -top-8 h-40 w-40 rounded-full opacity-30 blur-[42px]"
            style={{ background: bloom }}
          />
          <div
            aria-hidden
            className="absolute -right-8 bottom-16 h-36 w-36 rounded-full opacity-20 blur-[44px]"
            style={{ background: '#8B5CF6' }}
          />
          <div className="relative flex h-full flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function StatusBar({ time = '9:41' }: { time?: string }) {
  return (
    <div className="flex items-center justify-between px-4 pt-3 text-[10px] font-semibold text-ink/70">
      <span>{time}</span>
      <span aria-hidden className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-ink/45" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink/45" />
        <span className="h-2 w-4 rounded-[3px] border border-ink/40" />
      </span>
    </div>
  );
}

export function Tile({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-[22%] border border-white/50 bg-white/55 shadow-[0_1px_3px_rgba(58,46,34,.10)] ${className}`}
    />
  );
}
