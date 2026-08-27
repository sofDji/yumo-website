import type { Shot } from '@/lib/shots';

// Plain <picture> rather than next/image: output:'export' with
// images:{unoptimized:true} means next/image adds no optimisation here, only
// wrapper markup. Explicit width/height reserve layout space so CLS stays 0.
export function PhoneShot({
  shot,
  alt,
  className = '',
  priority = false,
}: {
  shot: Shot;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={shot.srcSmall} type="image/webp" />
      <source srcSet={shot.src} type="image/webp" />
      <img
        src={shot.src}
        alt={alt}
        width={shot.width}
        height={shot.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`h-auto w-full rounded-[2rem] ${className}`}
        style={{ backgroundImage: `url(${shot.blur})`, backgroundSize: 'cover' }}
      />
    </picture>
  );
}
