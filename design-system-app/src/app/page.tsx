import LoaderEpicare from "@/components/epicare/LoaderEpicare";
import HeroEpicare from "@/components/epicare/HeroEpicare";
import BrandsCarousel from "@/components/epicare/BrandsCarousel";
import DarkGradientSection from "@/components/epicare/DarkGradientSection";
import MetricsEpicare from "@/components/epicare/MetricsEpicare";
import BentoGridEpicare from "@/components/epicare/BentoGridEpicare";
import ProductLinesEpicare from "@/components/epicare/ProductLinesEpicare";

export default function EpicareLandingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500">
      <LoaderEpicare />
      <HeroEpicare />
      <BrandsCarousel />
      <DarkGradientSection />
      <MetricsEpicare />
      <BentoGridEpicare />
      <ProductLinesEpicare />
    </main>
  );
}
