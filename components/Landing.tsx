import { Footer } from '@/components/chrome/Footer';
import { NavBar } from '@/components/chrome/NavBar';
import { Hero } from '@/components/hero/Hero';
import { BrowseSection } from '@/components/sections/BrowseSection';
import { Faq } from '@/components/sections/Faq';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { JlptLadder } from '@/components/sections/JlptLadder';
import { KanaSection } from '@/components/sections/KanaSection';
import { LockScreenSection } from '@/components/sections/LockScreenSection';
import { Pricing } from '@/components/sections/Pricing';
import { PrivacySection } from '@/components/sections/PrivacySection';
import { WidgetSection } from '@/components/sections/WidgetSection';
import { faqItems } from '@/lib/faq';
import { getDictionary, numberFormat, type Locale } from '@/lib/i18n';

// Every locale route renders this; the only difference is the dictionary and
// the number formatter, so the pages cannot drift structurally.
export function Landing({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const nf = numberFormat(locale);

  return (
    <>
      <NavBar locale={locale} t={t.nav} />
      {/* overflow-x: clip, because the illustration blooms in PhoneFrame
          deliberately spill past their phones, up to 184px beyond the right edge
          of the screen on a phone. body's overflow-x: hidden does not contain
          that on mobile: the browser widens the layout viewport to fit the spill
          (515px on a 390px iPhone) and the page pans sideways. Clipping here
          cuts at the same edge the screen already did, so nothing visible
          changes. `clip` rather than `hidden`, because hidden would make main a
          scroll container and break every position: sticky inside it. */}
      <main className="overflow-x-clip">
        <Hero locale={locale} t={t.hero} cta={t.cta} />
        <HowItWorks locale={locale} t={t.how} />
        <LockScreenSection locale={locale} t={t.lockScreen} />
        <WidgetSection locale={locale} t={t.homeScreen} />
        <Features t={t.features} />
        <KanaSection locale={locale} t={t.kana} />
        <JlptLadder locale={locale} t={t.levels} nf={nf} />
        <BrowseSection locale={locale} t={t.browse} nf={nf} />
        <Pricing locale={locale} t={t.pricing} cta={t.cta} nf={nf} words={t.levels.words} />
        <PrivacySection t={t.privacy} />
        {/* {price} stays a placeholder here: the FAQ fills it with the visitor's
            storefront price once it knows it. */}
        <Faq locale={locale} t={{ ...t.faq, items: faqItems(locale, t.faq, '{price}') }} />
      </main>
      <Footer locale={locale} t={t.footer} />
    </>
  );
}
