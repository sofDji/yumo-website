// Three static radial washes that give the flat beige depth. Never animated —
// a blurred element animating every frame is the reliable way to make this
// page stutter on mobile Safari.

// The hero clips its overflow, and a clipped blur is not a soft edge — it is a
// straight horizontal line across the full width of the page, which read as a
// seam between the hero and the section below it. The green and blue washes
// die out on their own well above the boundary; the violet one sits at 420px
// and is still going at the cut. So the layer dissolves over its own last
// third and the clip lands where there is nothing left to cut.
//
// Nothing here changes colour — the washes are the same three, at the same
// opacities. Only the bottom of the layer stops abruptly.
const DISSOLVE =
  'linear-gradient(to bottom, #000 0%, #000 68%, rgba(0,0,0,0.55) 86%, transparent 100%)';

export function Blooms() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ maskImage: DISSOLVE, WebkitMaskImage: DISSOLVE }}
    >
      <div
        className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full opacity-[0.18] blur-[110px]"
        style={{ background: '#10B981' }}
      />
      <div
        className="absolute -right-24 top-40 h-[380px] w-[380px] rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: '#3B82F6' }}
      />
      <div
        className="absolute left-1/3 top-[420px] hidden h-[360px] w-[360px] rounded-full opacity-[0.12] blur-[130px] md:block"
        style={{ background: '#8B5CF6' }}
      />
    </div>
  );
}
