"use client";

import { useEffect } from "react";
import HeroSection from "@/components/go-ams/HeroSection";

export default function GoAmsPage() {
  // Esta ruta se diseñó solo en dark. No hay estado React asociado: el tema vive
  // en la clase del <html>, así que guardarlo también en useState era una segunda
  // fuente de verdad que además disparaba un render en cascada al montar.
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-surface-BG-base)] transition-colors duration-500">
      <HeroSection />
    </main>
  );
}
