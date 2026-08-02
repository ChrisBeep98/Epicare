"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DOLORES = [
  { title: "Portales desconectados", desc: "Cada carrier exige su propio portal, su propio login y su propio formato. Cruzar datos es trabajo manual y el error es cuestión de tiempo." },
  { title: "Downline invisible", desc: "No sabes qué produjo tu equipo esta semana hasta que alguien arma el reporte. Para entonces ya no puedes hacer nada al respecto." },
  { title: "Spreadsheets como sistema", desc: "Clientes, comisiones y renovaciones repartidos en docenas de archivos. Uno se corrompe y no hay copia." },
  { title: "Soporte sin SLAs", desc: "Mandas un correo y esperas. Sin ticket, sin historial, sin idea de cuándo te contestan." },
  { title: "Licencias sin alerta", desc: "Te enteras de que una licencia estatal venció cuando el negocio ya se cayó y la comisión se fue." },
  { title: "Producción opaca", desc: "Tus datos viven en sistemas de terceros que no puedes auditar ni exportar. Son tuyos, pero no los controlas." }
];

/** Flecha hacia arriba para el CTA (ya que la plataforma está arriba) */
const ArrowUp = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"
  >
    <path d="M12 19V5m0 0l-7 7m7-7l7 7" />
  </svg>
);

export default function ProblemSectionEpicare() {
  const [activeIndex, setActiveIndex] = useState(0);
  const descRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 15, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
      );
    }, descRef);
    return () => ctx.revert();
  }, [activeIndex]);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header standardization (Hardware Optimized)
      gsap.fromTo('.anim-head-line', { yPercent: 118, willChange: 'transform' },
        { yPercent: 0, duration: 1.15, stagger: 0.12, ease: 'power4.out', clearProps: 'willChange',
          scrollTrigger: { trigger: containerRef.current, start: 'top 82%' } });
      gsap.fromTo('.anim-head-fade', { opacity: 0, y: 26, willChange: 'transform, opacity' },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'willChange',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } });

      gsap.from(".reveal-item:not(.grid)", { // exclude the header grid from the old animation
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="el_problema" className="w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] pt-0 pb-section-lg overflow-hidden transition-colors duration-500">
      <div ref={containerRef} className="w-full max-w-section-lg mx-auto px-gutter-md">
        
        {/* Encabezado Editorial Masivo */}
        <div className="mb-static-xl md:mb-static-2xl grid grid-cols-1 md:grid-cols-12 gap-fluid-sm border-b border-[var(--color-border-Strokes-default)] pb-static-lg items-end">
          <div className="md:col-span-8">
            <span className="anim-head-fade text-overline text-[var(--color-status-red-main)] mb-4 block">El Problema</span>
            {/* Título forzado a 2 líneas */}
            <h2 className="overflow-hidden pb-static-xs text-display-lg md:text-display-xl text-[var(--color-text-primary)] tracking-tighter leading-none md:ml-[-6px]">
              <span className="anim-head-line block">
                Así se ve una operación<br className="hidden md:block"/> que nadie construyó.
              </span>
            </h2>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end mt-4 md:mt-0">
             <p className="anim-head-fade text-body-lg md:text-body-xl text-[var(--color-text-secondary)] pb-2 max-w-sm">
               No es falta de disciplina. Es que cada pieza de tu negocio vive en un sistema distinto y ninguno habla con los demás.
             </p>
          </div>
        </div>

        {/* Layout Interactivo Compacto */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-fluid-lg items-stretch">
          
          {/* Columna Izquierda: Índice Interactivo (Cinta en móvil, Lista en desktop) */}
          <div className="md:col-span-5 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-3 md:gap-fluid-xs reveal-item scrollbar-none snap-x snap-mandatory w-[calc(100vw-2rem)] md:w-auto -ml-4 pl-4 md:ml-0 md:pl-0 pr-4 md:pr-0">
            {DOLORES.map((dolor, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onMouseEnter={() => {
                    if (window.innerWidth >= 768) setActiveIndex(i);
                  }}
                  onClick={(e) => {
                    setActiveIndex(i);
                    // Scroll into view on mobile so the active tab is centered
                    if (window.innerWidth < 768) {
                      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                  }}
                  className={`group relative text-left transition-all duration-300 outline-none flex items-center py-2.5 md:py-2 shrink-0 snap-center md:snap-align-none rounded-full md:rounded-none px-5 md:px-0 border md:border-y-0 md:border-r-0 md:border-l-0 ${
                    isActive 
                      ? "text-[var(--color-text-primary)] md:translate-x-4 border-[var(--color-status-red-main)] bg-[var(--color-status-red-main)]/10 md:bg-transparent" 
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] md:hover:translate-x-2 border-[var(--color-border-Strokes-default)] md:border-transparent"
                  }`}
                >
                  {isActive && (
                    <div className="hidden md:block absolute left-[-20px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-status-red-main)] shadow-[0_0_8px_var(--color-status-red-main)]" />
                  )}
                  
                  <span className={`font-mono text-body-xs mr-2 md:mr-4 transition-opacity ${isActive ? "opacity-100 text-[var(--color-status-red-main)]" : "opacity-40"}`}>
                    0{i+1}
                  </span>
                  <span className="text-body-sm md:text-h4 lg:text-h3 tracking-tight whitespace-nowrap md:whitespace-normal font-medium md:font-normal">
                    {dolor.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Columna Derecha: Lectura Profunda y CTA */}
          <div className="md:col-span-7 md:pl-static-md lg:pl-static-lg border-t md:border-t-0 md:border-l border-[var(--color-border-Strokes-default)] pt-static-md md:pt-0 reveal-item flex flex-col justify-start md:justify-center min-h-[220px] md:min-h-[300px]">
            
            {/* Contenido Cambiante */}
            <div ref={descRef} className="">
              <span className="text-overline text-[var(--color-status-red-main)] mb-3 md:mb-6 block hidden md:block">
                {DOLORES[activeIndex].title}
              </span>
              <p className="text-h3 md:text-h2 lg:text-display-xs text-[var(--color-text-primary)] leading-tight font-medium">
                {DOLORES[activeIndex].desc}
              </p>
            </div>

            {/* Botón CTA Fijo - Preparado para el flujo de Registro */}
            <div className="mt-static-lg md:mt-static-xl">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Conectar con el modal/flujo de registro cuando exista
                }}
                className="group w-fit h-12 pl-6 pr-2 rounded-full flex items-center gap-3 bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-text)] shadow-elevation-2 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-elevation-4 active:scale-[0.96] active:opacity-80 active:duration-150 cursor-pointer"
              >
                <span className="text-body-sm font-medium">Así lo resolvemos</span>
                <span className="relative w-8 h-8 rounded-full bg-[var(--color-action-primary-text)] text-[var(--color-action-primary-bg)] flex items-center justify-center overflow-hidden shrink-0">
                  {/* Flecha lateral - Animación Grow */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="absolute w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-5" aria-hidden="true">
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="absolute w-4 h-4 -translate-x-5 transition-transform duration-300 ease-out group-hover:translate-x-0" aria-hidden="true">
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>

          </div>

        </div>
      </div>
      
      {/* Esconder scrollbar en móvil pero mantener funcionalidad */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
