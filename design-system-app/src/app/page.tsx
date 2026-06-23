import HeroEpicare from "@/components/epicare/HeroEpicare";
import BrandsCarousel from "@/components/epicare/BrandsCarousel";

export default function EpicareLandingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-BG-black)] transition-colors duration-500">
      <HeroEpicare />
      <BrandsCarousel />
    </main>
  );
}
