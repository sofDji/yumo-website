import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/chrome/Footer';
import { NavBar } from '@/components/chrome/NavBar';
import { WordTable } from '@/components/jlpt/WordTable';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDictionary } from '@/lib/i18n';
import { N5_WORDS } from '@/lib/jlpt/n5';
import { jlptGraph } from '@/lib/schema';

const COUNT = N5_WORDS.length;

const TITLE = `JLPT N5 vocabulary list — all ${COUNT} words`;
const DESCRIPTION = `The complete JLPT N5 vocabulary list: ${COUNT} words with kanji, kana and English meanings, in dictionary order. Free, no sign-up, nothing to download.`;

// Answers to what people actually type before they find a page like this. Kept
// as data because the FAQ schema and the rendered section must not drift.
const FAQ = [
  {
    q: 'How many words do you need for JLPT N5?',
    a: `Around 800 is the figure usually quoted, and this list holds ${COUNT}. There is no exact number, because the examiners do not publish one — see below.`,
  },
  {
    q: 'Is there an official JLPT N5 vocabulary list?',
    a: 'No. The organisers published word lists for the old four-level exam, but discontinued them when the test was revised in 2010, and have not published one since. Every list you will find, including this one, is reconstructed from past papers and dictionary data.',
  },
  {
    q: 'What order is this list in?',
    a: 'Gojūon — the order a Japanese dictionary uses, by reading rather than by English spelling. Loanwords written in katakana are filed under the same row as their hiragana reading, so アパート sits in あ.',
  },
  {
    q: 'Do I need to know the kanji as well as the reading?',
    a: 'N5 expects roughly 100 kanji, far fewer than the words listed here. Many N5 words are written in kana in practice, so the reading is the part to learn first; the kanji column is here for when you meet the word written out.',
  },
  {
    q: 'What is the difference between N5 and N4?',
    a: 'N5 is the entry level of the five. N4 roughly doubles the vocabulary expected and adds the kanji to go with it, so the jump is mostly one of volume rather than of difficulty in kind.',
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/jlpt/n5' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/jlpt/n5',
    type: 'article',
  },
};

export default function JlptN5Page() {
  const t = getDictionary('en');

  return (
    <>
      <NavBar locale="en" t={t.nav} />

      <main className="mx-auto w-full max-w-4xl px-6 py-20">
        <JsonLd
          data={jlptGraph({ path: '/jlpt/n5', name: 'JLPT N5 vocabulary list', description: DESCRIPTION, faq: FAQ })}
        />

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Reference
        </p>
        <h1 className="text-[34px] font-semibold leading-tight tracking-tight md:text-[42px]">
          JLPT N5 vocabulary list
        </h1>

        <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-muted">
          <p>
            Every word on this page is vocabulary you would be expected to know at{' '}
            <strong className="text-ink">JLPT N5</strong>, the entry level of the
            Japanese-Language Proficiency Test — {COUNT} entries, each with its kanji,
            its reading in kana, and an English meaning. It is ordered the way a
            Japanese dictionary is ordered, by reading, so you can find a word from
            how it sounds rather than from how it is spelled in English.
          </p>
          <p>
            One thing worth knowing before you use any N5 list, including this one:{' '}
            <strong className="text-ink">there is no official list to compare it against.</strong>{' '}
            The examiners published vocabulary lists for the old four-level exam and
            stopped when the test was restructured in 2010. Every list since is a
            reconstruction. The figure usually quoted is around 800 words; treat that,
            and this page, as a well-informed approximation rather than a syllabus.
          </p>
        </div>

        <div className="mt-12">
          <WordTable words={N5_WORDS} />
        </div>

        <section className="mt-20 border-t border-line pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Questions about N5 vocabulary
          </h2>
          <dl className="mt-8 space-y-7">
            {FAQ.map((item) => (
              <div key={item.q}>
                <dt className="text-[15px] font-medium text-ink">{item.q}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <aside className="mt-16 rounded-2xl border border-line bg-surface p-8 shadow-soft">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            Learning them is the harder half
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            A list is a reference, not a method — reading one through tends not to
            stick. Yumo puts one of these words on your Lock Screen every few hours,
            so you meet them in the gaps of a day rather than in a study session. All{' '}
            {COUNT} N5 words are included free, offline, with no account.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-ink px-5 py-3 text-sm font-medium text-ground transition-opacity hover:opacity-90"
          >
            See how Yumo works
          </Link>
        </aside>

        <p className="mt-14 text-[13px] leading-relaxed text-muted">
          Readings and meanings are derived from{' '}
          <a
            href="https://www.edrdg.org/jmdict/j_jmdict.html"
            className="text-accent underline underline-offset-2"
          >
            JMdict/EDICT
          </a>{' '}
          by the Electronic Dictionary Research and Development Group, used under{' '}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            className="text-accent underline underline-offset-2"
          >
            CC BY-SA 4.0
          </a>
          . This page is shared under the same licence.
        </p>
      </main>

      <Footer locale="en" t={t.footer} />
    </>
  );
}
