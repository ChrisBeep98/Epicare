import LoaderEpicare from "@/components/epicare/LoaderEpicare";
import HeroEpicare from "@/components/epicare/HeroEpicare";
import BrandsCarousel from "@/components/epicare/BrandsCarousel";
import MetricsEpicare from "@/components/epicare/MetricsEpicare";
import DarkGradientSection from "@/components/epicare/DarkGradientSection";
import BentoGridEpicare from "@/components/epicare/BentoGridEpicare";
import PeopleRevealEpicare from "@/components/epicare/PeopleRevealEpicare";
import ProductLinesEpicare from "@/components/epicare/ProductLinesEpicare";
import Coverage52Epicare from "@/components/epicare/Coverage52Epicare";
import ForWhoEpicare from "@/components/epicare/ForWhoEpicare";
import HowToJoinEpicare from "@/components/epicare/HowToJoinEpicare";
import FAQEpicare from "@/components/epicare/FAQEpicare";
import FooterEpicare from "@/components/epicare/FooterEpicare";

export default function EpicareLandingPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500">
      {/* ── S00 · Loader ── */}
      <div className="w-full order-1"><LoaderEpicare /></div>
      {/* ── S01 · Hero (HOOK · pin 1) ── */}
      <div className="w-full order-2"><HeroEpicare /></div>
      {/* ── S02 · BrandsCarousel (credibilidad) — solape sobre Hero pineado ── */}
      <div className="w-full order-3 mt-[-100vh] relative z-20"><BrandsCarousel /></div>
      {/* ── S03 · Metrics (prueba dura) ── */}
      <div className="w-full order-4"><MetricsEpicare /></div>
      {/* ── S04 · DarkGradient / La Plataforma (solución inmediata) ── */}
      <div className="w-full order-5"><DarkGradientSection /></div>
      {/* ── S05 · BentoGrid / Ecosistema GO (PICO 2 · pin) ── */}
      <div className="w-full order-6 pb-section-lg"><BentoGridEpicare /></div>
      {/* ── S07 · PeopleReveal (respiro humano) ── */}
      <div className="w-full order-8 pb-section-lg"><PeopleRevealEpicare /></div>
      {/* ── S08 · ProductLines (portafolio) ── */}
      <div className="w-full order-9"><ProductLinesEpicare /></div>
      {/* ── S09 · Coverage52 (mini-pico visual) ── */}
      <div className="w-full order-10"><Coverage52Epicare /></div>
      {/* ── S10 · ForWho (decisión) ── */}
      <div className="w-full order-11"><ForWhoEpicare /></div>
      {/* ── S13 · HowToJoin (fricción cero) ── */}
      <div className="w-full order-[13]"><HowToJoinEpicare /></div>
      {/* ── S14 · FAQ (objeciones) ── */}
      <div className="w-full order-[14]"><FAQEpicare /></div>
      {/* ── S15 · Footer (RESOLUCIÓN) ── */}
      <div className="w-full order-[15]"><FooterEpicare /></div>
    </main>
  );
}
