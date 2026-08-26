import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import FeaturesGrid from '@/components/FeaturesGrid';
import Privacy from '@/components/Privacy';
import JlptLevels from '@/components/JlptLevels';
import Pricing from '@/components/Pricing';
import WhatsComing from '@/components/WhatsComing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturesGrid />
        <Privacy />
        <JlptLevels />
        <Pricing />
        <WhatsComing />
      </main>
      <Footer />
    </>
  );
}
