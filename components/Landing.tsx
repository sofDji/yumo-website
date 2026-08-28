import { Footer } from '@/components/chrome/Footer';
import { NavBar } from '@/components/chrome/NavBar';
import { Hero } from '@/components/hero/Hero';
import { BrowseSection } from '@/components/sections/BrowseSection';
import { Faq } from '@/components/sections/Faq';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { JlptLadder } from '@/components/sections/JlptLadder';
import { LockScreenSection } from '@/components/sections/LockScreenSection';
import { Pricing } from '@/components/sections/Pricing';
import { PrivacySection } from '@/components/sections/PrivacySection';
import { WidgetSection } from '@/components/sections/WidgetSection';
import { getDictionary, type Locale } from '@/lib/i18n';

// Both locale routes render this; the only difference is the dictionary and
// the number formatter, so the two pages cannot drift structurally.
export function Landing({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const nf = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US');

  return (
    <>
      <NavBar locale={locale} t={t.nav} />
      <main>
        <Hero locale={locale} t={t.hero} cta={t.cta} />
        <HowItWorks locale={locale} t={t.how} />
        <LockScreenSection locale={locale} t={t.lockScreen} />
        <WidgetSection locale={locale} t={t.homeScreen} />
        <Features t={t.features} />
        <JlptLadder locale={locale} t={t.levels} nf={nf} />
        <BrowseSection locale={locale} t={t.browse} nf={nf} />
        <Pricing t={t.pricing} cta={t.cta} nf={nf} words={t.levels.words} />
        <PrivacySection t={t.privacy} />
        <Faq t={t.faq} />
      </main>
      <Footer locale={locale} t={t.footer} />
    </>
  );
}
