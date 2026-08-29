import { byRow, ROW_ROMAJI, type JlptWord } from '@/lib/jlpt/types';

/**
 * The vocabulary itself, grouped into gojūon rows.
 *
 * Plain HTML on purpose — no filter box, no client state. Seven hundred rows
 * of static markup is the whole value of the page to both a reader using
 * ctrl+F and a crawler reading it without running JavaScript; hiding them
 * behind a search input would cost both and buy neither.
 *
 * Every style below is written as a parent-scoped selector on the <ul> rather
 * than a class on each row. Repeating the class strings per entry is the
 * obvious way to write this and cost 700 kB of HTML for one page, most of it
 * the same few hundred bytes of Tailwind repeated 718 times. Declaring them
 * once collapses a row to roughly its own content. Same rendering, ~5x less
 * to download.
 */
const LIST = [
  'grid gap-x-8 gap-y-4 sm:grid-cols-2',
  '[&>li]:flex [&>li]:items-baseline [&>li]:gap-2 [&>li]:border-b [&>li]:border-line/60 [&>li]:pb-3',
  '[&_span:first-child]:text-[17px] [&_span:first-child]:font-medium [&_span:first-child]:text-ink',
  '[&_span:nth-child(2)]:text-[13px] [&_span:nth-child(2)]:text-muted',
  '[&_span:last-child]:ml-auto [&_span:last-child]:text-right [&_span:last-child]:text-[13px]',
  '[&_span:last-child]:leading-snug [&_span:last-child]:text-muted',
].join(' ');

export function WordTable({ words }: { words: JlptWord[] }) {
  const groups = byRow(words);

  return (
    <>
      {/* Jump links. 700 entries is more than a page-worth of scrolling, and
          the kana row is how a reader already thinks about finding a word. */}
      <nav
        aria-label="Jump to kana row"
        // Sticks below the NavBar, which floats at top-4 and is ~56px tall.
        // At top-0 the two overlap and the kana pills disappear behind it.
        className="sticky top-[80px] z-10 -mx-6 mb-12 bg-ground/90 px-6 py-3 backdrop-blur"
      >
        <ul className="flex flex-wrap gap-1.5">
          {groups.map(({ row, words: rowWords }) => (
            <li key={row}>
              <a
                href={`#row-${ROW_ROMAJI[row]}`}
                className="flex items-baseline gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                <span lang="ja" className="font-medium">
                  {row}
                </span>
                <span className="text-xs text-muted">{rowWords.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-14">
        {groups.map(({ row, words: rowWords }) => (
          <section
            key={row}
            id={`row-${ROW_ROMAJI[row]}`}
            /* Clears both sticky bars: the NavBar and the kana jump nav under
               it, or a jumped-to heading lands hidden behind them. */
            className="scroll-mt-[150px]"
          >
            <h2 className="mb-5 flex items-baseline gap-3 border-b border-line pb-3">
              <span lang="ja" className="text-2xl font-semibold">
                {row}
              </span>
              <span className="text-sm uppercase tracking-wider text-muted">{ROW_ROMAJI[row]}</span>
              <span className="ml-auto text-sm text-muted">{rowWords.length} words</span>
            </h2>

            {/* lang on the list, not the rows: the kanji and kana are Japanese,
                so only the gloss has to opt back out. */}
            <ul lang="ja" className={LIST}>
              {rowWords.map((word) => (
                <li key={`${word.kanji}-${word.kana}`}>
                  <span>{word.kanji}</span>
                  <span>{word.kana}</span>
                  <span lang="en">{word.en}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
