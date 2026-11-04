import { Reveal } from '@/components/layout/Reveal';
import { ReviewSlider } from './ReviewSlider';
import type { Dictionary, Locale } from '@/lib/i18n';
import { fill } from '@/lib/i18n';
import { reviewFor, REVIEWS } from '@/lib/reviews';
import { APP_STORE_RATING } from '@/lib/site';

export function ReviewsSection({
  locale,
  t,
  rated,
  onStore,
}: {
  locale: Locale;
  t: Dictionary['reviews'];
  rated: string;
  onStore: string;
}) {
  return (
    <section id="reviews" className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4" aria-label={fill(rated, { rating: APP_STORE_RATING })}>
            <p aria-hidden className="text-[64px] font-semibold leading-none tracking-[-0.03em] text-accent">
              {APP_STORE_RATING}
            </p>
            <div aria-hidden>
              <p className="tracking-[0.1em] text-accent">★★★★★</p>
              <p className="mt-1 text-sm text-muted">{onStore}</p>
            </div>
          </div>
          <h2 className="text-[34px] font-semibold leading-tight tracking-[-0.025em] md:text-[44px]">
            {t.titleLead} <span className="font-serif font-normal italic text-accent">{t.titleAccent}</span> {t.titleEnd}
          </h2>
        </div>
      </Reveal>

      <ReviewSlider prev={t.prev} next={t.next}>
        {REVIEWS.map((review) => {
          const shown = reviewFor(review, locale, t);
          return (
            <figure
              key={review.author}
              className="flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-white/[0.05] p-6 md:w-[calc(50%-8px)] lg:w-[calc((100%-32px)/3)]"
            >
                <p aria-hidden className="text-sm tracking-[0.1em] text-accent">
                  {'★'.repeat(review.stars)}
                </p>
                <h3 className="mt-3 text-[17px] font-semibold leading-snug">{shown.title}</h3>
                <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{shown.body}</blockquote>
                <figcaption className="mt-5 text-[13px] text-muted">
                  {review.author}
                  {shown.translatedNote && <span className="opacity-70"> · {shown.translatedNote}</span>}
                </figcaption>
            </figure>
          );
        })}
      </ReviewSlider>
    </section>
  );
}
