import type { ReactNode } from 'react';

// No device bezel. These read as part of the page rather than as photographs
// of hardware: the screen surface dissolves into the ground at the bottom, so
// the UI appears to rise out of the site instead of sitting on top of it.
//
// The aspect is a real phone's (9:19.5, an iPhone 14 Pro is 1179x2556). An
// earlier version squashed it to 9:17 to hide empty space, which just made
// the device look wrong — the fix is to fill the height with content.
const DISSOLVE = 'linear-gradient(to bottom, #000 0%, #000 74%, rgba(0,0,0,0.55) 90%, transparent 100%)';

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
      ? 'linear-gradient(165deg, #ECE7F1 0%, #F2EAEC 40%, #F8F2EC 72%, #FAF6EF 100%)'
      : 'linear-gradient(160deg, #F1F6F4 0%, #EDF1F7 36%, #F5F0F4 68%, #FAF6EF 100%)';

  return (
    <div className={`relative mx-auto w-full max-w-[272px] ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-16%] rounded-full opacity-60 blur-[70px]"
        style={{ background: 'radial-gradient(closest-side, #FFFFFF, transparent)' }}
      />

      <div className="relative aspect-[9/19.5] w-full">
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-[2.3rem]"
          style={{ maskImage: DISSOLVE, WebkitMaskImage: DISSOLVE }}
        >
          <div className="absolute inset-0" style={{ background: wallpaper }} />
          <div
            className="absolute -left-10 -top-8 h-44 w-44 rounded-full opacity-30 blur-[46px]"
            style={{ background: bloom }}
          />
          <div
            className="absolute -right-10 top-1/2 h-40 w-40 rounded-full opacity-20 blur-[48px]"
            style={{ background: '#8B5CF6' }}
          />
        </div>

        <div
          className="relative flex h-full flex-col"
          style={{ maskImage: DISSOLVE, WebkitMaskImage: DISSOLVE }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function StatusBar({ time = '9:41' }: { time?: string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 text-[10px] font-semibold text-ink/65">
      <span>{time}</span>
      <span aria-hidden className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />
        <span className="h-2 w-4 rounded-[3px] border border-ink/35" />
      </span>
    </div>
  );
}

export function Tile({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-[24%] border border-white/60 bg-white/55 shadow-[0_1px_3px_rgba(58,46,34,.08)] ${className}`}
    />
  );
}
