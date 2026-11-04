import type { Dictionary, Locale } from '@/lib/i18n';
import type { SiteWord } from '@/lib/select-words';
import { LEVEL_COLORS, LEVEL_LABELS } from '@/lib/tokens';
import { Panel, Stage } from './Stage';

// The Lock Screen, without the phone: the time, the widget and the Lock Screen
// sentence floating in space. The sentence is illustrative copy rather than one
// of the app's own, with the word in the app's lime on all three lines.
const LIVE_LIME = '#E9ECA5';

export function LockScreen({ word, locale, t }: { word: SiteWord; locale: Locale; t: Dictionary['lockScreen'] }) {
  const color = LEVEL_COLORS[word.level];

  return (
    <Stage glow={color}>
      <Panel plain x={14} y={5} w={72} delay={0.4} className="text-center">
        <p className="text-[3.6cqw] font-medium text-white/70">{t.date}</p>
        <p className="stage-clock mt-[0.5cqw] text-[25cqw] font-semibold leading-none tracking-[-0.04em]">9:41</p>
      </Panel>

      <Panel x={6} y={40} w={64} tilt="rotateY(16deg) rotateX(5deg) rotateZ(-2deg)" className="rounded-[4cqw] p-[4cqw]">
        <div className="flex items-center gap-[2.4cqw]">
          <span className="rounded-full px-[2cqw] py-[0.6cqw] text-[2.6cqw] font-bold text-white" style={{ background: color }}>
            {LEVEL_LABELS[word.level]}
          </span>
          <span lang="ja" className="font-jp text-[7cqw] font-medium leading-none">
            {word.kanji}
          </span>
        </div>
        <p className="mt-[2.2cqw] font-jp text-[3.3cqw] leading-tight text-white/65">
          {word.kana} · {word.romaji}
        </p>
        <p className="mt-[0.5cqw] text-[3.6cqw] font-medium leading-snug">{word.meaning[locale]}</p>
      </Panel>

      <Panel
        x={22}
        y={65}
        w={75}
        delay={1.2}
        z={2}
        tilt="rotateY(-13deg) rotateX(4deg) rotateZ(1.5deg)"
        className="glass-panel-dark rounded-[4cqw] p-[4cqw]"
      >
        <p lang="ja" className="font-jp text-[4.2cqw] font-semibold leading-snug">
          <span style={{ color: LIVE_LIME }} className="font-bold">
            月曜日
          </span>
          は法律で禁止すべきだ。
        </p>
        <p lang="ja-Latn" className="mt-[1.4cqw] text-[3cqw] italic leading-tight text-white/75">
          <span style={{ color: LIVE_LIME }} className="font-bold">
            getsuyoubi
          </span>{' '}
          wa houritsu de kinshi subeki da.
        </p>
        <p className="mt-[1.4cqw] text-[3.5cqw] leading-tight text-white/80">
          {t.sentence.before}
          <span style={{ color: LIVE_LIME }} className="font-bold">
            {t.sentence.word}
          </span>
          {t.sentence.after}
        </p>
      </Panel>
    </Stage>
  );
}
