import HeroEpicare from "@/components/epicare/HeroEpicare";
import BrandsCarousel from "@/components/epicare/BrandsCarousel";
import DarkGradientSection from "@/components/epicare/DarkGradientSection";
import MetricsEpicare from "@/components/epicare/MetricsEpicare";
import BentoGridEpicare from "@/components/epicare/BentoGridEpicare";

export default function EpicareLandingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500">
      <HeroEpicare />
      <BrandsCarousel />
      <div className="flex flex-col">
        <div className="order-2 md:order-1">
          <DarkGradientSection />
        </div>
        <div className="order-1 md:order-2">
          <MetricsEpicare />
        </div>
      </div>
      <BentoGridEpicare />
    </main>
  );
}
