import LoaderEpicare from "@/components/epicare/LoaderEpicare";
import HeroEpicare from "@/components/epicare/HeroEpicare";
import BrandsCarousel from "@/components/epicare/BrandsCarousel";
import MetricsEpicare from "@/components/epicare/MetricsEpicare";
import ProblemSectionEpicare from "@/components/epicare/ProblemSectionEpicare";
import DarkGradientSection from "@/components/epicare/DarkGradientSection";
import BentoGridEpicare from "@/components/epicare/BentoGridEpicare";
import PeopleRevealEpicare from "@/components/epicare/PeopleRevealEpicare";
import ProductLinesEpicare from "@/components/epicare/ProductLinesEpicare";
import ForWhoEpicare from "@/components/epicare/ForWhoEpicare";
import WhyEpicare from "@/components/epicare/WhyEpicare";

export default function EpicareLandingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500">
      <LoaderEpicare />
      <HeroEpicare />
      <BrandsCarousel />
      <MetricsEpicare />
      <ProblemSectionEpicare />
      <DarkGradientSection />
      <BentoGridEpicare />
      <PeopleRevealEpicare />
      <ProductLinesEpicare />
      <ForWhoEpicare />
      <WhyEpicare />
    </main>
  );
}
