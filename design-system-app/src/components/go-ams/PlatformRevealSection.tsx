"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PlatformRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".shot-bo, .shot-qe", { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, xPercent: 0 });
        return;
      }

      // 1. Entrada Limpia (Sin tocar 'y' para no pelear con el parallax)
      gsap.fromTo(
        ".shot-bo",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          }
        }
      );

      gsap.fromTo(
        ".shot-qe",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          }
        }
      );

      // 2. Parallax Interno de la Imagen (Original + Zoom sutil)
      gsap.fromTo(".bg-parallax-inner", 
        { yPercent: -8, scale: 1.05 },
        {
          yPercent: 8,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="s04 w-full pt-0 pb-section-md flex justify-center bg-[var(--color-surface-BG-base)] relative z-10 overflow-hidden perspective-[2500px]"
    >
      <div className="w-full flex flex-col gap-static-2xl items-center">
        
        {/* Copy del Reveal */}
        <div className="text-center w-full px-gutter-md max-w-4xl flex flex-col gap-3 relative z-20">
          <h2 className="text-display-lg font-semibold text-[var(--color-text-primary)] leading-[1.1] tracking-tight drop-shadow-2xl">
            Un sistema. <span className="text-[var(--color-text-accent-blue)]">Dos modos de trabajo.</span>
          </h2>
          <p className="text-body-lg text-[var(--color-text-secondary)] mx-auto max-w-[500px]">
            GO AMS separa lo que administras de lo que vendes. Cada modo tiene su propio espacio, su propia navegación, y un botón para cambiar entre ellos.
          </p>
        </div>

        {/* 2 Screenshots Gigantes (Strictly Squares touching the edges) */}
        <div className="w-full flex flex-col md:flex-row justify-between transform-style-preserve-3d">
          
          {/* Screenshot Back Office */}
          <div className="shot-bo group w-full md:w-[calc(50vw-0.5rem)] aspect-square bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] overflow-hidden relative rounded-3xl will-change-transform shrink-0">
            
            {/* Contenedor de máscara */}
            <div className="w-full h-full relative overflow-hidden bg-[var(--color-surface-BG-black)]">
              {/* Imagen con leve margen vertical para permitir parallax interno sin recortar mucho */}
              <div 
                className="bg-parallax-inner absolute top-[-10%] left-0 w-full h-[120%] bg-cover bg-center opacity-100" 
                style={{ backgroundImage: "url('/Files/Go_AMS/go-ams-backoffice.jpeg')" }}
              />
              
              {/* Pestaña flotante sobre la imagen */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center bg-[var(--color-surface-BG-1)]/90 backdrop-blur-md border border-t-0 border-[var(--color-border-Strokes-default)] rounded-none px-8 py-3 w-auto min-w-[180px] text-body-md font-semibold text-[var(--color-text-primary)] shadow-md z-20 transition-transform duration-500 group-hover:-translate-y-full">
                Back Office
              </div>

              {/* Hover Reveal Cards (Back Office) */}
              <div className="absolute bottom-0 left-0 w-full p-2 flex gap-2 z-30 pointer-events-none">
                
                {/* Card 1 */}
                <div className="flex-1 aspect-square relative rounded-2xl lg:rounded-[1.5rem] border border-[var(--color-border-Strokes-default)] shadow-elevation-3 overflow-hidden transform translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[100ms] group-hover:delay-[0ms] pointer-events-auto flex flex-col hover:-translate-y-1">
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[var(--color-surface-BG-1)]/80 backdrop-blur-xl" />
                    <div className="absolute inset-0 bg-white/5 saturate-150" />
                  </div>
                  <div className="relative z-10 p-4 flex flex-col h-full justify-between">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center text-[var(--color-brand-blue)] shrink-0">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <div>
                      <h3 className="text-body-md lg:text-body-lg font-semibold text-[var(--color-text-primary)] mb-1">¿Qué es Back Office?</h3>
                      <p className="text-body-sm text-[var(--color-text-secondary)] leading-snug">Es tu centro de control operativo. Una consola privada para administrar jerarquías, contratos y toda tu fuerza de ventas.</p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex-1 aspect-square relative rounded-2xl lg:rounded-[1.5rem] border border-[var(--color-border-Strokes-default)] shadow-elevation-3 overflow-hidden transform translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[50ms] group-hover:delay-[75ms] pointer-events-auto flex flex-col hover:-translate-y-1">
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[var(--color-surface-BG-1)]/80 backdrop-blur-xl" />
                    <div className="absolute inset-0 bg-white/5 saturate-150" />
                  </div>
                  <div className="relative z-10 p-4 flex flex-col h-full justify-between">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center text-[var(--color-brand-blue)] shrink-0">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </div>
                    <div>
                      <h3 className="text-body-md lg:text-body-lg font-semibold text-[var(--color-text-primary)] mb-1">Motor Financiero</h3>
                      <p className="text-body-sm text-[var(--color-text-secondary)] leading-snug">Controla y automatiza el pago de comisiones, conciliación de pólizas y reportes en tiempo real.</p>
                    </div>
                  </div>
                </div>

                {/* Card 3 (Visual) */}
                <div className="flex-1 aspect-square relative rounded-2xl lg:rounded-[1.5rem] border border-white/20 shadow-elevation-4 overflow-hidden transform translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[0ms] group-hover:delay-[150ms] pointer-events-auto hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#35BBFD] to-[#2F3437] opacity-90" />
                  <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                  <div className="relative z-10 flex h-full items-center justify-center">
                    <svg className="w-10 h-10 lg:w-12 lg:h-12 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Screenshot Quote & Enroll */}
          <div className="shot-qe group w-full md:w-[calc(50vw-0.5rem)] aspect-square bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] overflow-hidden relative rounded-3xl will-change-transform shrink-0">
            
            {/* Contenedor de máscara */}
            <div className="w-full h-full relative overflow-hidden bg-[var(--color-surface-BG-black)]">
              {/* Imagen con leve margen vertical para permitir parallax interno sin recortar mucho */}
              <div 
                className="bg-parallax-inner absolute top-[-10%] left-0 w-full h-[120%] bg-cover bg-center opacity-100" 
                style={{ backgroundImage: "url('/Files/Go_AMS/go-ams-quote.jpeg')" }}
              />
              
              {/* Pestaña flotante sobre la imagen */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center bg-[var(--color-surface-BG-1)]/90 backdrop-blur-md border border-t-0 border-[var(--color-border-Strokes-default)] rounded-none px-8 py-3 w-auto min-w-[180px] text-body-md font-semibold text-[var(--color-text-primary)] shadow-md z-20 transition-transform duration-500 group-hover:-translate-y-full">
                Quote & Enroll
              </div>

              {/* Hover Reveal Cards (Quote & Enroll) */}
              <div className="absolute bottom-0 left-0 w-full p-2 flex gap-2 z-30 pointer-events-none">
                
                {/* Card 1 */}
                <div className="flex-1 aspect-square relative rounded-2xl lg:rounded-[1.5rem] border border-[var(--color-border-Strokes-default)] shadow-elevation-3 overflow-hidden transform translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[100ms] group-hover:delay-[0ms] pointer-events-auto flex flex-col hover:-translate-y-1">
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[var(--color-surface-BG-1)]/80 backdrop-blur-xl" />
                    <div className="absolute inset-0 bg-white/5 saturate-150" />
                  </div>
                  <div className="relative z-10 p-4 flex flex-col h-full justify-between">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center text-[var(--color-text-accent-blue)] shrink-0">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-body-md lg:text-body-lg font-semibold text-[var(--color-text-primary)] mb-1">¿Qué es Quote & Enroll?</h3>
                      <p className="text-body-sm text-[var(--color-text-secondary)] leading-snug">Es tu motor de ventas. El entorno diseñado para cotizar planes de salud y vida frente al cliente en segundos.</p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex-1 aspect-square relative rounded-2xl lg:rounded-[1.5rem] border border-[var(--color-border-Strokes-default)] shadow-elevation-3 overflow-hidden transform translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[50ms] group-hover:delay-[75ms] pointer-events-auto flex flex-col hover:-translate-y-1">
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[var(--color-surface-BG-1)]/80 backdrop-blur-xl" />
                    <div className="absolute inset-0 bg-white/5 saturate-150" />
                  </div>
                  <div className="relative z-10 p-4 flex flex-col h-full justify-between">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center text-[var(--color-text-accent-blue)] shrink-0">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-body-md lg:text-body-lg font-semibold text-[var(--color-text-primary)] mb-1">Cierre Inmediato</h3>
                      <p className="text-body-sm text-[var(--color-text-secondary)] leading-snug">Compara +130 aseguradoras y completa la solicitud con firmas digitales integradas, todo en una pantalla.</p>
                    </div>
                  </div>
                </div>

                {/* Card 3 (Visual) */}
                <div className="flex-1 aspect-square relative rounded-2xl lg:rounded-[1.5rem] border border-white/20 shadow-elevation-4 overflow-hidden transform translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[0ms] group-hover:delay-[150ms] pointer-events-auto hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-blue)] to-[#2F3437] opacity-90" />
                  <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                  <div className="relative z-10 flex h-full items-center justify-center">
                    <svg className="w-10 h-10 lg:w-12 lg:h-12 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
