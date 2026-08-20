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
    <div className="w-full flex flex-col bg-[var(--color-surface-BG-base)] min-h-screen text-[var(--color-text-primary)] relative overflow-x-hidden">
      
      {/* 2. Unified Hero Grid */}
      <section id="hero-main-section" className="relative w-full bg-[var(--color-surface-BG-base)] flex-1 px-gutter-sm lg:px-gutter-md pt-[100px] md:pt-[140px]">
        <div className="mx-auto max-w-section-xl w-full grid-layout min-h-[100vh] grid-rows-[auto_auto_1fr] pb-section-md">
          
        {/* Row 1: Eyebrow / Subtitle */}
        <div id="hero-eyebrow" className="max-lg:col-start-1 max-lg:col-span-6 max-lg:row-start-1 max-lg:row-span-1 lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-1 flex items-end pb-0 lg:pb-4 pt-[var(--space-fluid-md)]">
          <p id="eyebrow-text" className="text-ui-label text-[var(--color-text-secondary)] uppercase tracking-widest">
            El broker portal de Epicare Insurance Corp®
          </p>
        </div>

        {/* Row 2-3: Heading */}
        <div id="hero-heading" className="max-lg:col-start-1 max-lg:col-span-6 max-lg:row-start-2 max-lg:row-span-1 lg:col-start-1 lg:col-span-6 lg:row-start-2 lg:row-span-2 flex items-start max-lg:!py-section-sm lg:pr-10">
          <h1 id="hero-title" className="text-display-xl text-[var(--color-text-primary)]">
            Una plataforma<br />para todo tu negocio<br />de seguros.
          </h1>
        </div>

        {/* Row 2: CTA Block */}
        <div id="hero-cta" className="max-lg:col-start-1 max-lg:col-span-6 max-lg:row-start-3 max-lg:row-span-1 lg:col-start-8 lg:col-span-4 lg:row-start-2 lg:row-span-1 flex flex-col items-start justify-start gap-5 mt-4 lg:mt-0">
          <p id="cta-subtitle" className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
            GO AMS es el portal operacional para agentes y agencias — donde gestionas contratos, clientes, producción y pagos, todo bajo una misma interfaz.
          </p>
          <button className="bg-[var(--color-brand-blue)] text-[var(--color-surface-BG-base)] px-8 py-3 rounded-xl font-medium w-[150px] hover:bg-opacity-90 transition-all flex justify-center items-center">
            Opera Ya
          </button>
        </div>

        {/* Row 3: Dark Panel */}
        <div id="visual-panel-wrapper" className="max-lg:col-start-1 max-lg:col-span-6 max-lg:row-start-4 max-lg:row-span-1 lg:col-start-6 lg:col-span-7 lg:row-start-3 lg:row-span-1 w-full h-full relative mt-8 lg:mt-12 max-lg:h-[360px] max-lg:min-h-[360px] lg:h-auto lg:min-h-[420px]">
          <BleedRight className="absolute top-0 bottom-0 left-0 mobile-bleed overflow-hidden">
            <div id="visual-panel" className="relative bg-[var(--color-surface-BG-1)] shadow-elevation-2 w-full h-full flex items-center justify-center rounded-tl-[20px] rounded-bl-none rounded-br-none rounded-tr-none max-lg:!bg-transparent overflow-hidden !p-0">
              
              {/* Bullet 1 - Top Left (Desktop Only) */}
              <div className="absolute top-[36px] left-[44px] gap-3 items-start z-10 hidden lg:flex">
                <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] mt-1.5 flex-shrink-0"></div>
                <p className="text-body-xs text-[var(--color-text-muted)] leading-relaxed max-w-[220px]">
                  Respaldado por 5 años de operación, 130+ carriers, 52 jurisdicciones
                </p>
              </div>

              {/* Bullet 2 - Bottom Left (Desktop Only) */}
              <div className="absolute bottom-[36px] left-[44px] gap-3 items-start z-10 hidden lg:flex">
                <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] mt-1.5 flex-shrink-0"></div>
                <p className="text-body-xs text-[var(--color-text-muted)] leading-relaxed max-w-[220px]">
                  Procesa millones en primas de manera automática
                </p>
              </div>

              {/* Media Editor (Video) */}
              <div id="hero-video" className="relative z-0 flex items-center justify-center max-lg:!h-full max-lg:!w-full max-lg:!rounded-[24px] overflow-hidden w-full h-[110%]">
                <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover max-lg:!rounded-[24px]">
                  <source src={asset("/Files/Hero/Isometric_wireframe_illustration…_202606181624.mp4")} type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
                {/* Textura de ruido optimizada sobre el video */}
                <div className="absolute inset-0 bg-noise pointer-events-none z-10 mix-blend-overlay opacity-80 max-lg:!rounded-[24px]" />
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
