import Image from 'next/image';

// The lettering as drawn, not as redrawn. An earlier version rebuilt the mark
// from icon.svg's stroke paths; those are uniform 30px strokes and lose the
// brush modulation — the thick downstrokes and hairline joins — that the real
// artwork is made of.
//
// public/logo-mark.png is generated from the app's source art
// (assets/source-art/1e8290f3-e116-4641-a394-50e3a792b961.png), which is white
// lettering on a black plate. The plate is not keyed out after the fact: the
// artwork's own luminance becomes the alpha channel, so every anti-aliased
// edge survives intact, with a floor at 8 to discard the plate's noise (a third
// of it sits at luminance 1, not 0) and a ceiling at 230 so the strokes are
// fully opaque. The colour is the site's ink.
const SRC_W = 720;
const SRC_H = 458;

export function Logo({
  height = 24,
  priority = false,
  className = '',
}: {
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      width={Math.round((height * SRC_W) / SRC_H)}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
