import type { ReactNode } from 'react';

// A real phone body on the dark page: without a bezel the screens dissolved
// into the black ground and stopped reading as phones. The proportions are an
// iPhone's (9:19.5).

// The blooms are painted as gradients rather than as blurred circles. Safari
// draws a large `filter: blur()` into a finite rectangle around the element and
// clips whatever falls outside it. A gradient has no filter region to run out
// of, so there is nothing to clip.
function bloomGradient(hex: string, stops: readonly number[]) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const ramp = stops
    .map((a, i) => `rgba(${r},${g},${b},${a}) ${((i * 100) / (stops.length - 1)).toFixed(1)}%`)
    .join(', ');
  return `radial-gradient(circle closest-side, ${ramp})`;
}

const GREEN_STOPS = [0.26, 0.24, 0.18, 0.11, 0.055, 0.018, 0] as const;
const VIOLET_STOPS = [0.14, 0.13, 0.1, 0.07, 0.04, 0.015, 0] as const;

export function PhoneFrame({
  children,
  bloom = '#10B981',
  wallpaper,
  className = '',
}: {
  children: ReactNode;
  bloom?: string;
  /** An image behind the screen, for the Lock and Home Screens. App screens
   *  stay true black, as the app is in its dark theme. */
  wallpaper?: string;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[290px] ${className}`}>
      {/* Ambient light, deliberately not clipped to the phone. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-[194px] -top-[178px] h-[452px] w-[452px]"
          style={{ background: bloomGradient(bloom, GREEN_STOPS) }}
        />
        <div
          className="absolute -right-[184px] top-[calc(45%-104px)] h-[416px] w-[416px]"
          style={{ background: bloomGradient('#8B5CF6', VIOLET_STOPS) }}
        />
      </div>

      {/* Side buttons */}
      <span aria-hidden className="absolute -left-[2px] top-[17%] h-6 w-[3px] rounded-l-sm bg-[#3A3A3D]" />
      <span aria-hidden className="absolute -left-[2px] top-[24%] h-11 w-[3px] rounded-l-sm bg-[#3A3A3D]" />
      <span aria-hidden className="absolute -left-[2px] top-[33%] h-11 w-[3px] rounded-l-sm bg-[#3A3A3D]" />
      <span aria-hidden className="absolute -right-[2px] top-[27%] h-16 w-[3px] rounded-r-sm bg-[#3A3A3D]" />

      <div
        className="relative aspect-[9/19.5] w-full rounded-[3rem] p-[7px] shadow-[0_30px_70px_-20px_rgba(0,0,0,.9),inset_0_0_0_1px_rgba(255,255,255,.16)]"
        style={{ background: 'linear-gradient(145deg, #4A4A4E, #1B1B1D 28%, #0D0D0E 68%, #3C3C40)' }}
      >
        <div className="relative h-full overflow-hidden rounded-[2.6rem] bg-black">
          {wallpaper && (
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.16), rgba(0,0,0,.42)), url(${wallpaper})` }}
            />
          )}

          <div className="relative flex h-full flex-col text-white">{children}</div>

          <span aria-hidden className="absolute left-1/2 top-2.5 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
          <span aria-hidden className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/70" />
        </div>
      </div>
    </div>
  );
}

export function StatusBar({ time = '9:41' }: { time?: string }) {
  return (
    <div className="flex items-center justify-between px-6 pt-3.5 text-[11px] font-semibold">
      <span>{time}</span>
      <span aria-hidden className="flex items-center gap-1">
        <svg viewBox="0 0 18 12" width="15" height="10" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M2 9a15 15 0 0 1 20 0M6 13.5a9 9 0 0 1 12 0M10 18a3 3 0 0 1 4 0" />
        </svg>
        <span className="relative h-[10px] w-[20px] rounded-[3px] border border-white/60 p-[1px]">
          <span className="block h-full w-4/5 rounded-[1.5px] bg-white" />
        </span>
      </span>
    </div>
  );
}

// Generic glyphs on coloured tiles: enough to read as a real home screen without
// imitating anyone's actual app icon.
const GLYPHS = [
  'M9 18V6l10-2v12M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3Zm10-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z',
  'M4 8h3l2-3h6l2 3h3v11H4zM12 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
  'M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  'M3 6h18v13H3zM3 7l9 7 9-7',
  'M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.6 1.5A3.3 3.3 0 0 1 17.5 18Z',
  'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  'M4 5h16v11H9l-5 4Z',
  'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2',
  'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9.5h.01',
  'M5 4h6a2 2 0 0 1 1 .3A2 2 0 0 1 13 4h6v15h-6a2 2 0 0 0-1 .3 2 2 0 0 0-1-.3H5ZM12 4.5V19',
];

const TINTS = [
  ['#FF8A5C', '#E2553A'],
  ['#6B7280', '#3F444D'],
  ['#34D399', '#059669'],
  ['#60A5FA', '#2563EB'],
  ['#7DD3FC', '#0EA5E9'],
  ['#F87171', '#DC2626'],
  ['#4ADE80', '#16A34A'],
  ['#3F3F46', '#18181B'],
  ['#C084FC', '#7C3AED'],
  ['#FBBF24', '#D97706'],
];

export function Tile({ i = 0, className = '' }: { i?: number; className?: string }) {
  const [from, to] = TINTS[i % TINTS.length];
  return (
    <div
      className={`flex items-center justify-center rounded-[24%] shadow-[0_3px_8px_rgba(0,0,0,.3),inset_0_0_0_.5px_rgba(255,255,255,.2)] ${className}`}
      style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={GLYPHS[i % GLYPHS.length]} />
      </svg>
    </div>
  );
}

const TABS: ReactNode[] = [
  <path key="today" d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />,
  <path key="practice" d="M7 8h10a4 4 0 0 1 4 4l.6 4a2.5 2.5 0 0 1-4.5 1.8L15.5 16h-7l-1.6 1.8A2.5 2.5 0 0 1 2.4 16L3 12a4 4 0 0 1 4-4ZM8 10.5v3M6.5 12h3M15.5 11h.01M17.5 13h.01" />,
  <path key="browse" d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4" />,
  <path key="settings" d="M4 7h10M18 7h2M4 17h2M10 17h10M16 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
];

// The app's floating tab bar: Today, Practice, Browse, Kana, Settings.
export function AppTabBar({ active }: { active: 'browse' | 'kana' }) {
  const on = (is: boolean) =>
    `flex h-7 w-10 items-center justify-center rounded-full ${is ? 'bg-accent text-[#15160F]' : 'text-white/60'}`;
  const icon = (node: ReactNode) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {node}
    </svg>
  );
  return (
    <div aria-hidden className="mt-3 flex items-center justify-between rounded-full border border-white/10 bg-[#1C1C1E] p-1">
      <span className={on(false)}>{icon(TABS[0])}</span>
      <span className={on(false)}>{icon(TABS[1])}</span>
      <span className={on(active === 'browse')}>{icon(TABS[2])}</span>
      <span className={`${on(active === 'kana')} font-jp text-[13px] font-bold`}>あ</span>
      <span className={on(false)}>{icon(TABS[3])}</span>
    </div>
  );
}
