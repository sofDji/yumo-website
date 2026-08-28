// The Yumo mark, drawn rather than served as an image. It is a dozen strokes,
// so as SVG it costs less than the PNG it replaces, stays crisp at any size,
// and — the point of it — takes its colour from the text around it instead of
// arriving welded to a plate.
//
// The paths are lifted verbatim from public/icon.svg, which is the same mark
// on a terracotta plate for the app icon. Only two things differ here: the
// plate is gone, and the strokes are currentColor.
//
// The viewBox is the mark's own bounding box, measured off a render rather
// than guessed. icon.svg is a 1024 square laid out around the plate, and
// reusing that box would surround the logo with all the padding the plate used
// to fill.
const STROKES = [
  'M250,440 C256,512 276,562 306,598',
  'M360,438 C352,522 332,624 306,694 C292,732 266,750 238,742',
  'M378,442 C372,522 378,580 404,598 C432,616 462,592 472,554',
  'M474,438 C468,502 466,558 472,600',
  'M500,442 C498,500 500,550 502,598',
  'M500,478 C510,452 532,438 552,454 C568,466 570,496 570,522 C571,556 570,578 572,598',
  'M570,500 C578,470 598,444 620,454 C638,462 644,494 644,522 C645,556 644,578 646,598',
  'M739,433 C690,426 663,482 664,531 C672,581 703,612 741,607 C779,603 799,556 795,509 C790,464 768,440 739,433',
];

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="218 341 588 342" fill="none" aria-hidden className={className}>
      <g
        transform="translate(-5,-76)"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g strokeWidth={30}>
          {STROKES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {/* the smile inside the o */}
        <path d="M700,532 C714,506 752,504 764,528" strokeWidth={17} />
      </g>
    </svg>
  );
}
