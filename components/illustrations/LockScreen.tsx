import type { Dictionary, Locale } from '@/lib/i18n';
import type { SiteWord } from '@/lib/select-words';
import { LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';
import { PhoneFrame, StatusBar } from './PhoneFrame';

// The Live Activity's sentence, as the widget extension draws it: black at 75 %,
// the word in the app's lime on all three lines. Illustrative copy rather than
// one of the app's own sentences. Colours are literal because the card keeps
// them whatever the page's theme, as it does on a real Lock Screen.
const LIVE_LIME = '#E9ECA5';

// The accessoryRectangular widget, which is the placement the app's own store
// name leads with. Rendered flat and translucent the way iOS renders Lock
// Screen accessories, rather than as a full-colour tile like the home screen.
export function LockScreen({ word, locale, t }: { word: SiteWord; locale: Locale; t: Dictionary['lockScreen'] }) {
  const color = LEVEL_COLORS[word.level];

  return (
    <PhoneFrame bloom={color} tone="dusk">
      <StatusBar time="9:41" />

      <div className="flex flex-1 flex-col items-center px-5 pb-8 pt-12">
        <p className="text-[11px] font-medium text-ink/60">{t.date}</p>
        <p className="mt-0.5 text-[62px] font-semibold leading-none tracking-tight text-ink/85">
          9:41
        </p>

        {/* the rectangular accessory */}
        <div className="mt-7 w-full rounded-[0.9rem] border border-white/90 bg-white/80 px-3 py-2.5 shadow-[0_4px_14px_-8px_rgba(58,46,34,.4)]">
          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-1.5 py-0.5 text-[8px] font-bold text-white"
              style={{ background: color }}
            >
              {LEVEL_LABELS[word.level]}
            </span>
            <span className="font-jp text-[17px] font-medium leading-none">{word.kanji}</span>
          </div>
          <p className="mt-1.5 font-jp text-[10px] leading-tight text-muted">
            {word.kana} · {word.romaji}
          </p>
          <p className="text-[10px] font-medium leading-snug">{word.meaning[locale]}</p>
        </div>

        {/* The Lock Screen sentence (Yumo Pro) */}
        <div
          className="mt-3 w-full rounded-[1rem] px-3 py-2.5 text-left"
          style={{ background: 'rgba(0,0,0,.75)', boxShadow: 'inset 0 0 0 .5px rgba(255,255,255,.25)' }}
        >
          <p lang="ja" className="font-jp text-[12.5px] font-semibold leading-snug text-white">
            <span style={{ color: LIVE_LIME }} className="font-bold">
              月曜日
            </span>
            は法律で禁止すべきだ。
          </p>
          <p lang="ja-Latn" className="mt-1 text-[8.5px] italic leading-tight" style={{ color: 'rgba(255,255,255,.74)' }}>
            <span style={{ color: LIVE_LIME }} className="font-bold">
              getsuyoubi
            </span>{' '}
            wa houritsu de kinshi subeki da.
          </p>
          <p className="mt-1 text-[10px] leading-tight" style={{ color: 'rgba(255,255,255,.74)' }}>
            {t.sentence.before}
            <span style={{ color: LIVE_LIME }} className="font-bold">
              {t.sentence.word}
            </span>
            {t.sentence.after}
          </p>
        </div>

        <div className="mt-auto flex w-full items-center justify-between">
          <span aria-hidden className="h-9 w-9 rounded-full border border-white/80 bg-white/65" />
          <span aria-hidden className="h-9 w-9 rounded-full border border-white/80 bg-white/65" />
        </div>
        <div className="mt-4 h-1 w-24 rounded-full bg-ink/25" />
      </div>
    </PhoneFrame>
  );
}
