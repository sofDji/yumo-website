// Three static radial washes that give the flat beige depth. Never animated —
// a blurred element animating every frame is the reliable way to make this
// page stutter on mobile Safari.
export function Blooms() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
