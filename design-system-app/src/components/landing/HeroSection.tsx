"use client";

import React, { useRef, useState, useEffect } from 'react';
import { GridLiveEditor, CardLiveEditor, TextLiveEditor, SectionLiveEditor, MediaLiveEditor, LiveEditorCopier } from '@/components/utils/LiveEditor';

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
  return (
    <div className="w-full flex flex-col bg-[var(--color-surface-BG-base)] min-h-screen text-[var(--color-text-primary)] relative overflow-x-hidden">
      
      {/* 1. Navbar */}
      <nav className="h-16 w-full bg-[var(--color-surface-BG-base)] border-b border-[var(--color-border-Strokes-default)] px-gutter-md flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-1">
          <span className="font-bold text-subtitle tracking-tight bg-[var(--color-text-primary)] text-[var(--color-surface-BG-base)] px-1.5 py-0.5 rounded-md leading-none">GO</span>
          <span className="font-normal text-subtitle tracking-widest text-[var(--color-text-secondary)]">AMS</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[var(--color-surface-BG-2)] rounded-full p-1 flex items-center shadow-inner cursor-pointer border border-[var(--color-border-Strokes-default)]">
            <div className="w-5 h-5 rounded-full bg-[var(--color-surface-BG-base)] shadow-sm"></div>
            <div className="w-5 h-5 rounded-full bg-transparent"></div>
          </div>
          <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <div className="flex items-center gap-3 pl-2 border-l border-[var(--color-border-Strokes-default)]">
            <div className="w-10 h-10 rounded-full border border-[var(--color-border-Strokes-strong)] overflow-hidden bg-[var(--color-surface-BG-1)] flex items-center justify-center">
              <span className="text-caption text-[var(--color-text-secondary)]">MD</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="text-body-sm font-bold leading-tight">Manuel Depool</span>
              <span className="text-caption text-[var(--color-brand-blue)] leading-tight">Admin</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Unified Hero Grid */}
      <SectionLiveEditor id="hero-main-section" initialPy="" initialPx="px-gutter-md" initialMaxW="max-w-section-xl" initialGap="" initialAlign="" className="w-full bg-[var(--color-surface-BG-base)] flex-1" innerClassName="grid-layout min-h-[calc(100vh-64px)] grid-rows-[auto_auto_1fr] pb-0">
          
        {/* Row 1: Eyebrow / Subtitle (R1, C1-6) */}
        <GridLiveEditor id="hero-eyebrow" initialStart={1} initialSpan={6} initialRowStart={1} initialRowSpan={1} className="flex items-end pb-4 pt-12">
          <TextLiveEditor id="eyebrow-text" initialToken="text-overline" className="text-[var(--color-text-secondary)] uppercase tracking-widest">
            El broker portal de Epicare Insurance Corp®
          </TextLiveEditor>
        </GridLiveEditor>

        {/* Row 2-3: Heading (R2-3, C1-6) */}
        <GridLiveEditor id="hero-heading" initialStart={1} initialSpan={6} initialRowStart={2} initialRowSpan={2} className="flex items-start pr-10">
          <TextLiveEditor id="hero-title" initialToken="text-display-xl" as="h1" className="italic font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'Georgia, serif' }}>
            Tu negocio<br />de seguros,<br />entero.
          </TextLiveEditor>
        </GridLiveEditor>

        {/* Row 2: CTA Block (R2, C8-11) */}
        <GridLiveEditor id="hero-cta" initialStart={8} initialSpan={4} initialRowStart={2} initialRowSpan={1} className="flex flex-col items-start justify-start gap-5">
          <TextLiveEditor id="cta-subtitle" initialToken="text-body-sm" className="text-[var(--color-text-secondary)] leading-relaxed">
            GO AMS es el portal operacional para agentes y agencias — donde gestionas contratos, clientes, producción y pagos, todo bajo una misma interfaz.
          </TextLiveEditor>
          <button className="bg-[var(--color-brand-blue)] text-[var(--color-surface-BG-base)] px-8 py-3 rounded-xl font-medium w-[150px] hover:bg-opacity-90 transition-all flex justify-center items-center">
            Opera Ya
          </button>
        </GridLiveEditor>

        {/* Row 3: Dark Panel (R3, C6-12) */}
        <GridLiveEditor id="visual-panel-wrapper" initialStart={6} initialSpan={7} initialRowStart={3} initialRowSpan={1} className="w-full h-full relative mt-12 min-h-[420px]">
          <BleedRight className="absolute top-0 bottom-0 left-0">
            <CardLiveEditor id="visual-panel" initialBg="bg-[var(--color-surface-BG-1)]" initialShadow="shadow-elevation-2" initialPStatic="p-section-xs" className="w-full h-full flex items-center justify-center rounded-tl-[20px] rounded-bl-none rounded-br-none rounded-tr-none overflow-hidden !p-0">
              
              {/* Bullet 1 - Top Left */}
              <div className="absolute top-[36px] left-[44px] flex gap-3 items-start z-10 hidden sm:flex">
                <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] mt-1.5 flex-shrink-0"></div>
                <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed max-w-[220px]">
                  Respaldado por 5 años de operación, 130+ carriers, 52 jurisdicciones
                </p>
              </div>

              {/* Bullet 2 - Bottom Left */}
              <div className="absolute bottom-[36px] left-[44px] flex gap-3 items-start z-10 hidden sm:flex">
                <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] mt-1.5 flex-shrink-0"></div>
                <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed max-w-[220px]">
                  Procesa millones en primas de manera automática
                </p>
              </div>

              {/* Media Editor (Video) */}
              <MediaLiveEditor id="hero-video" initialCw="100%" initialCh="100%" initialVw="100%" initialVh="100%" initialFit="object-cover" className="relative w-full h-full z-0 flex items-center justify-center">
                <video autoPlay loop muted playsInline>
                  <source src="/Files/Hero/Isometric_wireframe_illustration…_202606181624.mp4" type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
              </MediaLiveEditor>

            </CardLiveEditor>
          </BleedRight>
        </GridLiveEditor>

      </SectionLiveEditor>

      {/* Framework: Botón global para copiar estado */}
      <LiveEditorCopier />

    </div>
  );
}
