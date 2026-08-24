"use client";

import React, { useRef, useState, useEffect } from 'react';
import { asset } from "@/lib/asset";

// Helper to make a container break out of the right side of the grid and touch the viewport edge
function BleedRight({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const originalRight = ref.current.style.right;
        ref.current.style.right = '0px';
        const rect = ref.current.getBoundingClientRect();
        const dist = document.documentElement.clientWidth - rect.right;
        ref.current.style.right = originalRight;
        setOffset(dist > 0 ? dist : 0);
      }
    };
    
    // Initial calculate
    update();
    
    // Recalculate on load (for fonts/images) and resize
    window.addEventListener('load', update);
    window.addEventListener('resize', update);
    
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('load', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, []);

  return <div ref={ref} style={{ right: offset > 0 ? `-${offset}px` : '0px' }} className={className}>{children}</div>;
}

export default function HeroSection() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Sync state with DOM on mount
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div id="hero-wrapper" className="w-full flex flex-col bg-[var(--color-surface-BG-base)] min-h-screen text-[var(--color-text-primary)] relative overflow-x-hidden">
      
      {/* 2. Unified Hero Grid */}
      <section id="hero-main-section" className="relative w-full bg-[var(--color-surface-BG-base)] flex-1 px-gutter-sm lg:px-gutter-md pt-[48px] md:pt-[88px]">
        <div className="mx-auto max-w-section-xl w-full grid-layout min-h-[100vh] grid-rows-[auto_auto_1fr] pb-section-md">
          
        {/* Row 1: Eyebrow / Subtitle */}
        <div id="hero-eyebrow" className="max-lg:col-start-1 max-lg:col-span-6 max-lg:row-start-1 max-lg:row-span-1 lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-1 flex items-end pb-0 lg:pb-4 pt-[var(--space-fluid-md)]">
          <p id="eyebrow-text" className="text-ui-label text-[var(--color-text-secondary)] uppercase tracking-widest">
            Portal de Epicare<span className="inline-block -translate-y-[4px]">&trade;</span>
          </p>
        </div>

        {/* Row 2-3: Heading */}
        <div id="hero-heading" className="max-lg:col-start-1 max-lg:col-span-6 max-lg:row-start-2 max-lg:row-span-1 lg:col-start-1 lg:col-span-6 lg:row-start-2 lg:row-span-1 flex items-start max-lg:!py-section-sm lg:pr-10">
          <h1 id="hero-title" className="text-display-xl text-[var(--color-text-primary)] leading-[1.05] tracking-tight">
            <span className="text-[var(--color-brand-blue)]">GO AMS.</span><br />
            Tu negocio de seguros.
          </h1>
        </div>

        {/* Row 2: CTA Block */}
        <div id="hero-cta" className="max-lg:col-start-1 max-lg:col-span-6 max-lg:row-start-3 max-lg:row-span-1 lg:col-start-8 lg:col-span-4 lg:row-start-2 lg:row-span-1 flex flex-col items-start justify-start gap-5 mt-4 lg:mt-0">
          <p id="cta-subtitle" className="text-body-md text-[var(--color-text-secondary)] leading-relaxed">
            GO AMS es el <strong className="font-semibold text-[var(--color-text-primary)]">portal operacional</strong> para agentes y agencias — donde gestionas <strong className="font-semibold text-[var(--color-text-primary)]">contratos, clientes, producción y pagos</strong>, todo bajo una <strong className="font-semibold text-[var(--color-text-primary)]">misma interfaz</strong>.
          </p>
          <button className="bg-[var(--color-brand-blue)] text-[var(--color-surface-BG-base)] px-8 py-3 rounded-xl font-medium w-[150px] hover:bg-opacity-90 transition-all flex justify-center items-center">
            Opera Ya
          </button>
        </div>

        {/* Row 3: Dark Panel */}
        <div id="visual-panel-wrapper" className="max-lg:col-start-1 max-lg:col-span-6 max-lg:row-start-4 max-lg:row-span-1 lg:col-start-4 lg:col-span-9 lg:row-start-3 lg:row-span-1 w-full h-auto relative mt-8 lg:mt-12 lg:-translate-y-[104px]">
          
          <BleedRight className="relative w-full h-full mobile-bleed">
            
            {/* Scroll Down Button - Separacion de 20px exacta */}
            <div className="absolute top-[124px] left-[-20px] -translate-x-full z-20 hidden lg:flex">
              <button 
                onClick={() => {
                  const nextSection = document.getElementById("hero-wrapper")?.nextElementSibling;
                  if (nextSection) {
                    const top = nextSection.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[var(--color-brand-blue)] text-white shadow-elevation-2 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-elevation-4 active:scale-95"
                aria-label="Scroll down"
              >
                <div className="absolute inset-0 rounded-full border border-white/20 scale-100 group-hover:scale-[1.15] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                <span className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="absolute w-5 h-5 transition-transform duration-[600ms] ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] group-hover:translate-y-10" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="absolute w-5 h-5 -translate-y-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] group-hover:translate-y-0" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </span>
              </button>
            </div>

            <div id="visual-panel" className="relative bg-[var(--color-surface-BG-1)] shadow-elevation-2 w-full h-full flex items-center justify-center rounded-l-[12px] rounded-r-none max-lg:!bg-transparent overflow-hidden !p-0">
              
              {/* Media Editor (Video) */}
              <div id="hero-video" className="relative z-0 flex items-center justify-center max-lg:!w-full overflow-hidden rounded-l-[12px] rounded-r-none w-full h-auto">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  preload="auto"
                  className="w-full h-auto block object-top rounded-l-[12px] rounded-r-none"
                >
                  <source src={asset("/Files/Go_AMS/Hero/go_ams_hero.mp4")} type="video/mp4" />
                </video>
                {/* Textura de ruido optimizada sobre la imagen */}
                <div className="absolute inset-0 bg-noise pointer-events-none z-10 mix-blend-overlay opacity-80 rounded-l-[12px] rounded-r-none" />
              </div>

            </div>
          </BleedRight>
        </div>

        {/* Row 4: Mobile Bullets (Mobile Only) */}
        <div id="mobile-bullets" className="max-lg:col-start-1 max-lg:col-span-6 max-lg:row-start-5 max-lg:row-span-1 lg:col-start-1 lg:col-span-12 lg:row-start-4 lg:row-span-1 flex lg:hidden flex-row items-start justify-between gap-4 mt-6 pb-24">
          <div className="flex gap-2 items-start w-1/2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] mt-1.5 flex-shrink-0"></div>
            <p className="text-caption text-[var(--color-text-muted)] leading-relaxed">
              Respaldado por 5 años, 130+ carriers, 52 juris.
            </p>
          </div>
          <div className="flex gap-2 items-start w-1/2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] mt-1.5 flex-shrink-0"></div>
            <p className="text-caption text-[var(--color-text-muted)] leading-relaxed">
              Procesa millones en primas de manera automática
            </p>
          </div>
        </div>

        </div>
      </section>

    </div>
  );
}
