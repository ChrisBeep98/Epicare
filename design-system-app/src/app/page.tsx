import LoaderEpicare from "@/components/epicare/LoaderEpicare";
import HeroEpicare from "@/components/epicare/HeroEpicare";
import BrandsCarousel from "@/components/epicare/BrandsCarousel";
import MetricsEpicare from "@/components/epicare/MetricsEpicare";
import ProblemSectionEpicare from "@/components/epicare/ProblemSectionEpicare";
import DarkGradientSection from "@/components/epicare/DarkGradientSection";
import BentoGridEpicare from "@/components/epicare/BentoGridEpicare";
import PeopleRevealEpicare from "@/components/epicare/PeopleRevealEpicare";
import ProductLinesEpicare from "@/components/epicare/ProductLinesEpicare";
import Coverage52Epicare from "@/components/epicare/Coverage52Epicare";
import ForWhoEpicare from "@/components/epicare/ForWhoEpicare";
import WhyEpicare from "@/components/epicare/WhyEpicare";
import HowToJoinEpicare from "@/components/epicare/HowToJoinEpicare";
import FAQEpicare from "@/components/epicare/FAQEpicare";
import FooterEpicare from "@/components/epicare/FooterEpicare";

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
      <Coverage52Epicare />
      <ForWhoEpicare />
      <WhyEpicare />
      <HowToJoinEpicare />
      <FAQEpicare />
      <FooterEpicare />
    </main>
  );
}
