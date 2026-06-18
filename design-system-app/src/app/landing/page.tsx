"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/landing/HeroSection";

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // The design system forces dark mode for the landing page
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-surface-BG-base)] transition-colors duration-500">
      <HeroSection />
    </main>
  );
}
