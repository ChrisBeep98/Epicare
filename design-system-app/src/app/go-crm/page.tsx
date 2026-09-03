"use client";

import { useEffect, useState } from "react";
import LoaderEpicare from "@/components/epicare/LoaderEpicare";
import HeaderEpicare from "@/components/epicare/HeaderEpicare";
import FooterEpicare from "@/components/epicare/FooterEpicare";
import HeroGoCrm from "@/components/go-crm/HeroGoCrm";
import ProblemGoCrm from "@/components/go-crm/ProblemGoCrm";
import SalesLayerGoCrm from "@/components/go-crm/SalesLayerGoCrm";
import DayVsListContainer from "@/components/go-crm/day-vs-list";
import CierreGoCrm from "@/components/go-crm/CierreGoCrm";

export default function GoCrmPage() {
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
    <main className="min-h-screen bg-[var(--color-surface-BG-base)] transition-colors duration-500 overflow-x-clip relative">
      {/* ── GLOBAL HEADER & LOADER ── */}
      <LoaderEpicare />
      <HeaderEpicare isHeaderPill={isHeaderPill} />

      {/* ── GO CRM SECTIONS ── */}
      <HeroGoCrm />
      <ProblemGoCrm />
      <SalesLayerGoCrm />
      <DayVsListContainer />
      <CierreGoCrm />

      {/* ── GLOBAL FOOTER ── */}
      <FooterEpicare />
    </main>
  );
}
