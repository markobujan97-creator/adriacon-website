import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { Challenges } from '@/components/sections/Challenges';
import { Services } from '@/components/sections/Services';
import { MySteuerhelfer } from '@/components/sections/MySteuerhelfer';
import { KursfinderSection } from '@/components/sections/KursfinderSection';
import { RadarSection } from '@/components/sections/RadarSection';
import { Pricing } from '@/components/sections/Pricing';
import { Process } from '@/components/sections/Process';
import { About } from '@/components/sections/About';
import { JahreskursSection } from '@/components/sections/JahreskursSection';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="inhalt">
        <Hero />
        <TrustBar />
        <Challenges />
        <Services />
        <MySteuerhelfer />
        <KursfinderSection />
        <RadarSection />
        <Pricing />
        <Process />
        <About />
        <JahreskursSection />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
