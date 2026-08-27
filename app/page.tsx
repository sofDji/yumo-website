import { Footer } from '@/components/chrome/Footer';
import { NavBar } from '@/components/chrome/NavBar';
import { Hero } from '@/components/hero/Hero';
import { BrowseSection } from '@/components/sections/BrowseSection';
import { Faq } from '@/components/sections/Faq';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { JlptLadder } from '@/components/sections/JlptLadder';
import { Pricing } from '@/components/sections/Pricing';
import { PrivacySection } from '@/components/sections/PrivacySection';
import { WidgetSection } from '@/components/sections/WidgetSection';

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <HowItWorks />
        <WidgetSection />
        <Features />
        <JlptLadder />
        <BrowseSection />
        <Pricing />
        <PrivacySection />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
