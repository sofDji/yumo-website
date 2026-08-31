import type { ReactNode } from 'react';

// No device bezel. These read as part of the page rather than as photographs
// of hardware: the screen surface dissolves into the ground at the bottom, so
// the UI appears to rise out of the site instead of sitting on top of it.
//
// The aspect is a real phone's (9:19.5, an iPhone 14 Pro is 1179x2556). An
// earlier version squashed it to 9:17 to hide empty space, which just made
// the device look wrong — the fix is to fill the height with content.
const DISSOLVE = 'linear-gradient(to bottom, #000 0%, #000 74%, rgba(0,0,0,0.55) 90%, transparent 100%)';

// The blooms are painted as gradients rather than as blurred circles. Safari
// draws a large `filter: blur()` into a finite rectangle around the element
// and clips whatever falls outside it, so on macOS the glow ended in straight
// edges — the "faint rounded rectangle" the bloom layer below is written to
// avoid. Blink spills far enough that it never showed in Chrome.
//
// A gradient has no filter region to run out of, so there is nothing to clip,
// and it costs a gradient fill instead of a large convolution on every paint.
//
// The stops are not hand-picked: they are the measured radial alpha of the
// blur they replace, sampled off a Chromium render at 1/6 of the radius, so
// browsers that were already correct see the same wash they saw before. That
// is also why the peak is 0.167 rather than the old 0.20 — a 64px blur spreads
// a 224px disc thin enough that its centre never reached full opacity.
function bloomGradient(hex: string, stops: readonly number[]) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const ramp = stops
    .map((a, i) => `rgba(${r},${g},${b},${a}) ${((i * 100) / (stops.length - 1)).toFixed(1)}%`)
    .join(', ');
  return `radial-gradient(circle closest-side, ${ramp})`;
}

// Measured off `224px @ blur(64px) @ .20` and `208px @ blur(66px) @ .13`.
const GREEN_STOPS = [0.1674, 0.1548, 0.1192, 0.0753, 0.0377, 0.0126, 0] as const;
const VIOLET_STOPS = [0.0982, 0.092, 0.0736, 0.0491, 0.0276, 0.0123, 0] as const;

export function PhoneFrame({
  children,
  bloom = '#10B981',
  tone = 'light',
  wallpaper = false,
  className = '',
}: {
  children: ReactNode;
  bloom?: string;
  tone?: 'light' | 'dusk';
  /** Draw a screen surface behind the UI. Off by default: without it the
   *  elements sit straight on the page ground, which is the point. */
  wallpaper?: boolean;
  className?: string;
}) {
  const surface =
    tone === 'dusk'
      ? 'linear-gradient(165deg, #ECE7F1 0%, #F2EAEC 40%, #F8F2EC 72%, #FAF6EF 100%)'
      : 'linear-gradient(160deg, #F1F6F4 0%, #EDF1F7 36%, #F5F0F4 68%, #FAF6EF 100%)';

  return (
    <div className={`relative mx-auto w-full max-w-[272px] ${className}`}>
      <div className="relative aspect-[9/19.5] w-full">
        {/* Ambient light only — no screen. The blooms stay because they tie
            these back to the hero's, and without any glow the UI reads as
            floating rectangles rather than as a lit surface. */}
        {wallpaper && (
          <div
            aria-hidden
            className="absolute inset-0 overflow-hidden rounded-[2.3rem]"
            style={{ background: surface, maskImage: DISSOLVE, WebkitMaskImage: DISSOLVE }}
          />
        )}

        {/* Ambient light, deliberately NOT clipped to the phone's bounds. A
            clipped glow draws a faint rounded rectangle — the ghost of the
            screen we just removed — which defeats the point. Spilling past
            the edges reads as page light instead.

            Each box is sized to the full extent of the wash it carries and
            centred where the blurred circle it replaces used to sit, so the
            light lands in the same place it always did. */}
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

// Abstract marks, not imitations of real app icons. Empty white squares read
// as placeholder boxes once the screen behind them is gone — a tile needs
// something in it to be read as an icon rather than a gap.
const MARKS = [
  <span key="a" className="h-1/3 w-1/3 rounded-full border-2 border-ink/20" />,
  <span key="b" className="h-1/4 w-1/4 rounded-full bg-ink/20" />,
  <span key="c" className="h-[3px] w-1/2 rounded-full bg-ink/18" />,
  <span key="d" className="h-1/3 w-1/3 rounded-[4px] border-2 border-ink/18" />,
  <span key="e" className="h-1/3 w-[3px] rounded-full bg-ink/18" />,
  <span key="f" className="h-1/4 w-2/5 rounded-full border-2 border-ink/18" />,
];

const TINTS = ['#10B981', '#3B82F6', '#8B5CF6', '#F43F5E', '#14B8A6'];

export function Tile({ i = 0, className = '' }: { i?: number; className?: string }) {
  // A few tiles carry a whisper of level colour so the grid is not uniformly
  // grey; the rest stay neutral so the Yumo widget keeps the only real colour.
  const tinted = i % 5 === 2;
  const tint = TINTS[i % TINTS.length];

  return (
    <div
      className={`flex items-center justify-center rounded-[24%] border border-white/90 shadow-[0_2px_6px_rgba(58,46,34,.07)] ${className}`}
      style={{
        background: tinted
          ? `linear-gradient(150deg, ${tint}1F, rgba(255,255,255,.85))`
          : 'rgba(255,255,255,.8)',
      }}
    >
      {MARKS[i % MARKS.length]}
    </div>
  );
}
