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
    <main className="flex flex-col w-full min-h-screen bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500">
      <div className="w-full order-1"><LoaderEpicare /></div>
      <div className="w-full order-2"><HeroEpicare /></div>
      <div className="w-full order-3 mt-[-100vh] relative z-20"><BrandsCarousel /></div>
      <div className="w-full order-4"><MetricsEpicare /></div>
      <div className="w-full order-5"><BentoGridEpicare /></div>
      
      {/* 
        ==================================================
        UNIVERSAL ORDER OVERRIDE 
        ==================================================
        Both Mobile & Desktop: PeopleReveal -> Problem -> DarkGradient
      */}
      <div className="w-full order-6"><PeopleRevealEpicare /></div>
      <div className="w-full order-7"><ProblemSectionEpicare /></div>
      <div className="w-full order-8"><DarkGradientSection /></div>
      {/* ================================================== */}

      <div className="w-full order-9"><ProductLinesEpicare /></div>
      <div className="w-full order-10"><Coverage52Epicare /></div>
      <div className="w-full order-11"><ForWhoEpicare /></div>
      <div className="w-full order-12"><WhyEpicare /></div>
      <div className="w-full order-[13]"><HowToJoinEpicare /></div>
      <div className="w-full order-[14]"><FAQEpicare /></div>
      <div className="w-full order-[15]"><FooterEpicare /></div>
    </main>
  );
}
