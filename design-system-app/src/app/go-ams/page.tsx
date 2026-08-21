"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/go-ams/HeroSection";
import ContextSection from "@/components/go-ams/ContextSection";
import BrokenDaySection from "@/components/go-ams/BrokenDaySection";
import PlatformRevealSection from "@/components/go-ams/PlatformRevealSection";
import BackOfficeTour from "@/components/go-ams/BackOfficeTour";
import QuoteEnroll from "@/components/go-ams/QuoteEnroll";
import AgentAgencySection from "@/components/go-ams/AgentAgencySection";
import DownlineSection from "@/components/go-ams/DownlineSection";
import DelegateUsersSection from "@/components/go-ams/DelegateUsersSection";
import ArchitectureSection from "@/components/go-ams/ArchitectureSection";
import LoaderEpicare from "@/components/epicare/LoaderEpicare";
import HeaderEpicare from "@/components/epicare/HeaderEpicare";

export default function GoAmsPage() {
  const [isHeaderPill, setIsHeaderPill] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsHeaderPill(true);
      } else {
        setIsHeaderPill(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-surface-BG-base)] transition-colors duration-500 overflow-x-hidden">
      <LoaderEpicare />
      <HeaderEpicare isHeaderPill={isHeaderPill} />
      <HeroSection />
      <ContextSection />
      <BrokenDaySection />
      <PlatformRevealSection />
      
      {/* Acto II: Demostración (Core Pins) */}
      <BackOfficeTour />
      <QuoteEnroll />

      {/* Acto III: Audiencia & Adaptabilidad */}
      <AgentAgencySection />
      <DownlineSection />
      <DelegateUsersSection />
      <ArchitectureSection />
    </main>
  );
}
