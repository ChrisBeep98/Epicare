"use client";

import React, { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER, REVEAL, TRIGGER } from "@/lib/motion";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GoAmsProblemSection() {
  const t = useTranslations("goAms.problemSection");
  const sectionRef = useRef<HTMLElement>(null);

  const pains = [
    { title: t("pains.0.title"), description: t("pains.0.description") },
    { title: t("pains.1.title"), description: t("pains.1.description") },
    { title: t("pains.2.title"), description: t("pains.2.description") },
    { title: t("pains.3.title"), description: t("pains.3.description") },
    { title: t("pains.4.title"), description: t("pains.4.description") },
    { title: t("pains.5.title"), description: t("pains.5.description") },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    ScrollTrigger.config({ ignoreMobileResize: true });

    const el = sectionRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.blueprint-cell, .section-title-line, .section-eyebrow, .section-subtitle, .card-reveal', {
          opacity: 1, y: 0, scaleY: 1, yPercent: 0, clipPath: "inset(0% 0% 0% 0%)"
        });
        return;
      }

      // 1. Título de Sección con GPU Transform Reveal (Arquetipo 2 - Zero Repaint)
      gsap.fromTo('.section-title-line', 
        { yPercent: 120, opacity: 0, willChange: 'transform, opacity' },
        { 
          yPercent: 0, 
          opacity: 1,
          duration: DUR.slow, 
          stagger: STAGGER.base, 
          ease: EASE.dramatic, 
          force3D: true,
          clearProps: 'all',
          scrollTrigger: { trigger: el, start: TRIGGER.standard, toggleActions: 'play none none reverse' } 
        }
      );

      // 2. Subtítulos y Eyebrows (Arquetipo 2)
      gsap.fromTo(['.section-eyebrow', '.section-subtitle'], 
        { opacity: 0, y: REVEAL.md, willChange: 'transform, opacity' },
        { 
          opacity: 1, 
          y: 0, 
          duration: DUR.base, 
          ease: EASE.out, 
          stagger: STAGGER.base,
          clearProps: 'willChange',
          scrollTrigger: { trigger: el, start: TRIGGER.standard, toggleActions: 'play none none reverse' } 
        }
      );

      // 3. Reveal of the Blueprint Grid (Borders drawing themselves)
      const cells = gsap.utils.toArray<HTMLElement>('.blueprint-cell');
      gsap.fromTo(cells, 
        { borderColor: "rgba(0,0,0,0)" },
        { 
          borderColor: "var(--color-text-Black-100)", 
          duration: DUR.base, 
          stagger: STAGGER.tight, 
          ease: EASE.out,
          clearProps: "borderColor", // Para que tome el CSS hover/dark en peace
          scrollTrigger: {
            trigger: '.blueprint-grid',
            start: TRIGGER.standard,
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 4. Bento Grid Card Contents (Arquetipo 3 - Wave Stagger)
      const cardContents = gsap.utils.toArray<HTMLElement>('.card-reveal');
      gsap.fromTo(cardContents,
        { opacity: 0, y: REVEAL.md, willChange: 'transform, opacity' },
        {
          opacity: 1, 
          y: 0, 
          duration: DUR.base, 
          stagger: STAGGER.wave, // Ola fluida
          ease: EASE.out,
          force3D: true,
          clearProps: 'willChange',
          scrollTrigger: {
            trigger: '.blueprint-grid',
            start: TRIGGER.standard,
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 5. Vida Latente (B3): Un destello aleatorio en las celdas
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      tl.to(cells, {
        backgroundColor: "rgba(53, 187, 253, 0.02)",
        duration: 0.5,
        stagger: { amount: 1, from: "random" },
        ease: EASE.inOut,
        yoyo: true,
        repeat: 1
      });

    }, el);

    return () => ctx.revert();
  }, []);

  const getGridSpan = (index: number) => {
    switch(index) {
      case 0: return "md:col-start-3 md:row-start-1 md:col-span-1"; // Item 1
      case 1: return "md:col-start-4 md:row-start-1 md:col-span-1"; // Item 2
      case 2: return "md:col-start-5 md:row-start-1 md:col-span-1"; // Item 3
      case 3: return "md:col-start-3 md:row-start-2 md:col-span-1"; // Item 4
      case 4: return "md:col-start-4 md:row-start-2 md:col-span-1"; // Item 5
      case 5: return "md:col-start-5 md:row-start-2 md:col-span-1"; // Item 6
      default: return "";
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden transition-colors duration-700 bg-[var(--color-surface-BG-1)] dark:bg-[var(--color-surface-BG-black)] py-section-md">
      <div 
        className="container mx-auto px-gutter-md w-full relative z-10" 
        style={{ maxWidth: "1440px" }}
      >
        
        {/* AWWWARDS: THE BLUEPRINT GRID 
            Grid 5x2 explícito: 
            Izquierda: Header ocupa 2 columnas (40%) para darle más aire al texto.
            Derecha: Items 1 al 6 (3 columnas x 2 filas) en el 60% restante.
        */}
        <div className="blueprint-grid grid grid-cols-1 md:grid-cols-5 md:grid-rows-2 border-t border-l border-[var(--color-text-Black-100)]/10 dark:border-white/10">
          
          {/* CELL 0: Context Header (Left, spans 2 cols and 2 rows) */}
          <div className="blueprint-cell md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2 border-r border-b border-[var(--color-text-Black-100)]/10 dark:border-white/10 p-8 md:p-10 flex flex-col justify-between bg-[var(--color-brand-blue)]/5 dark:bg-white/[0.02] relative overflow-hidden">
             <div className="bp-content">
               <h2 className="section-eyebrow text-overline text-[var(--color-text-accent-blue)] mb-8 opacity-80">
                 {t("title")}
               </h2>
               <h3 className="section-subtitle text-display-xs md:text-display-sm font-medium text-[var(--color-text-primary)] dark:text-white leading-tight tracking-tight">
                 {t.rich("subtitle", {
                   blue: (chunks) => <span className="text-[var(--color-text-accent-blue)]">{chunks}</span>
                 })}
               </h3>
             </div>
             
             {/* Decoración técnica */}
             <div className="absolute top-4 right-4 w-2 h-2 border border-[var(--color-brand-blue)] opacity-50"></div>
             <div className="absolute bottom-4 right-4 w-2 h-2 border border-[var(--color-brand-blue)] opacity-50"></div>
          </div>

          {/* PAIN CELLS 1-6 */}
          {pains.map((pain, i) => {
            // AWWWARDS: Objeto Digital (Rounded Pill).
            // A petición, usamos el azul de la marca como fondo de la píldora,
            // manteniendo el gradiente de aura brillante en la esquina.
            if (i === 5) {
              return (
                <div key={i} className={cn(
                  "blueprint-cell border-r border-b border-[var(--color-text-Black-100)]/10 dark:border-white/10 p-3 md:p-4 flex flex-col group relative overflow-hidden cursor-pointer",
                  getGridSpan(i)
                )}>
                  <div className="relative z-10 w-full h-full bg-[var(--color-brand-blue)] text-white rounded-xl p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[0.98]">
                    
                    {/* Aura Glow animado en la esquina superior derecha (blanco para brillar sobre azul) */}
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-white opacity-20 group-hover:opacity-40 rounded-full blur-3xl transition-all duration-1000 ease-out group-hover:scale-150 group-hover:translate-x-4 group-hover:-translate-y-4"></div>
                    
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      {/* Botón Circular Glassmórfico */}
                      <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-md group-hover:bg-white group-hover:text-[var(--color-brand-blue)] transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-500 group-hover:translate-y-1">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                      </div>
                      
                      <div className="mt-8 transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
                        <h4 className="text-h4 font-medium tracking-tight leading-tight mb-3">
                          {pain.title}
                        </h4>
                        <p className="text-body-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                          {pain.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Ítems estándar (1 al 5)
            return (
              <div key={i} className={cn(
                "blueprint-cell border-r border-b border-[var(--color-text-Black-100)]/10 dark:border-white/10 p-6 md:p-8 flex flex-col group relative overflow-hidden cursor-crosshair hover:border-[var(--color-brand-blue)]/30 transition-colors duration-300",
                getGridSpan(i)
              )}>
                
                {/* Hover Kinetics (C1/C2) */}
                <div className="absolute inset-0 bg-[var(--color-brand-blue)] transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"></div>
                
                {/* Contenedor que no dicta altura extra por la descripción */}
                <div className="card-reveal relative z-10 w-full h-full flex flex-col">
                  
                  {/* Número: Se expulsa hacia arriba y desaparece al hover */}
                  <div className="text-meta text-[var(--color-text-accent-blue)] mb-4 transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-8 group-hover:opacity-0 group-hover:text-white/70">
                    [0{i + 1}]
                  </div>
                  
                  {/* Título: Sube solo lo necesario para ocupar el lugar del número, sin pegar en el techo */}
                  <h4 className="text-h5 md:text-h4 text-[var(--color-text-primary)] dark:text-white font-medium tracking-tight leading-tight transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-10 group-hover:text-white">
                    {pain.title}
                  </h4>
                  
                  {/* Descripción absoluta: Texto más grande (body-md) */}
                  <p className="absolute bottom-0 left-0 w-full text-body-md leading-relaxed text-white opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none">
                    {pain.description}
                  </p>
                </div>
              </div>
            );
          })}
          
        </div>

      </div>
    </section>
  );
}
