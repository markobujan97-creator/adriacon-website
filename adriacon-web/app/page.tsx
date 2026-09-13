import { Hero } from '@/components/home/Hero';
import { TrustRow } from '@/components/home/TrustRow';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { PackagesTeaser } from '@/components/home/PackagesTeaser';
import { StepsPreview } from '@/components/home/StepsPreview';
import { ToolsTeaser } from '@/components/home/ToolsTeaser';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { CtaBand } from '@/components/ui/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRow />
      <ServicesOverview />
      <PackagesTeaser />
      <StepsPreview />
      <ToolsTeaser />
      <AboutTeaser />
      <CtaBand />
    </>
  );
}
