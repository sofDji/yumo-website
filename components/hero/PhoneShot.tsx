import type { Shot } from '@/lib/shots';

// Plain <picture> rather than next/image: output:'export' with
// images:{unoptimized:true} means next/image adds no optimisation here, only
// wrapper markup. Explicit width/height reserve layout space so CLS stays 0.
//
// `fade` dissolves the screenshot's edges into the page instead of ending on
// a hard rectangle, so the phone reads as emerging from the background. One
// radial gradient does it — mask-composite of several gradients needs vendor
// prefixes and still disagrees between Safari and Chrome.
const FADE = 'radial-gradient(118% 92% at 50% 40%, #000 58%, rgba(0,0,0,0.55) 80%, transparent 100%)';

export function PhoneShot({
  shot,
  alt,
  className = '',
  priority = false,
  fade = false,
}: {
  shot: Shot;
  alt: string;
  className?: string;
  priority?: boolean;
  fade?: boolean;
}) {
  const img = (
    <img
      src={shot.src}
      alt={alt}
      width={shot.width}
      height={shot.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`h-auto w-full ${fade ? '' : 'rounded-[2rem]'} ${className}`}
      style={
        fade
          ? { maskImage: FADE, WebkitMaskImage: FADE }
          : { backgroundImage: `url(${shot.blur})`, backgroundSize: 'cover' }
      }
    />
  );

  if (!fade) {
    return (
      <picture>
        <source media="(max-width: 640px)" srcSet={shot.srcSmall} type="image/webp" />
        <source srcSet={shot.src} type="image/webp" />
        {img}
      </picture>
    );
  }

  return (
    <div className="relative">
      {/* A soft halo behind the phone so the faded edges dissolve into light
          rather than into nothing. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-18%] inset-y-[-6%] rounded-full opacity-70 blur-[70px]"
        style={{ background: 'radial-gradient(closest-side, #FFFFFF, transparent)' }}
      />
      <picture className="relative">
        <source media="(max-width: 640px)" srcSet={shot.srcSmall} type="image/webp" />
        <source srcSet={shot.src} type="image/webp" />
        {img}
      </picture>
    </div>
  );
}
