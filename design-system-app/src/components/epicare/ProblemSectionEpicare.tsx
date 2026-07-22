"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DOLORES = [
  { title: "Portales desconectados", desc: "Cada carrier exige su propio portal; cruzar datos y conciliar se ha vuelto un proceso 100% manual y propenso a errores." },
  { title: "Downline invisible", desc: "No tienes visibilidad en tiempo real de tu equipo, su volumen de producción ni las métricas de retención clave." },
  { title: "Spreadsheets como sistema", desc: "La información de tus clientes, comisiones y renovaciones sobrevive esparcida en docenas de archivos frágiles." },
  { title: "Soporte sin SLAs", desc: "La comunicación carece de sistema de tickets, no hay historial auditable y los tiempos de respuesta son una incógnita." },
  { title: "Licencias sin alerta", desc: "Te enteras de que una licencia estatal venció cuando el negocio ya se detuvo y perdiste la comisión." },
  { title: "Producción opaca", desc: "Tus datos viven secuestrados en sistemas legacy de terceros que no puedes auditar, controlar ni integrar." }
];

/** Flecha hacia abajo para el CTA */
const ArrowDown = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"
  >
    <path d="M12 5v14m0 0l-7-7m7 7l7-7" />
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
      gsap.from(".reveal-item", {
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
    <section id="el_problema" className="w-full bg-[var(--color-surface-BG-white)] pt-0 pb-section-lg overflow-hidden">
      <div ref={containerRef} className="w-full max-w-section-lg mx-auto px-gutter-md">
        
        {/* Encabezado Editorial Masivo */}
        <div className="mb-static-2xl reveal-item grid grid-cols-1 md:grid-cols-12 gap-fluid-sm border-b border-[var(--color-border-Strokes-default)] pb-static-lg items-end">
          <div className="md:col-span-8">
            <span className="text-overline text-[var(--color-status-red-main)] mb-4 block">El Problema</span>
            {/* Título forzado a 2 líneas */}
            <h2 className="text-display-lg md:text-display-xl text-[var(--color-text-primary)] tracking-tighter leading-none md:ml-[-6px]">
              ¿Reconoces estos<br className="hidden md:block"/> síntomas?
            </h2>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
             <p className="text-body-xl text-[var(--color-text-secondary)] pb-2 max-w-sm">
               Si tu operación diaria se ve así, la fragmentación del sistema está ahogando el crecimiento de tu agencia.
             </p>
          </div>
        </div>

        {/* Layout Interactivo Compacto */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-fluid-lg items-stretch">
          
          {/* Columna Izquierda: Índice Interactivo */}
          <div className="md:col-span-5 flex flex-col gap-fluid-xs reveal-item">
            {DOLORES.map((dolor, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  className={`group relative text-left transition-all duration-300 outline-none flex items-center py-2 cursor-pointer ${
                    isActive 
                      ? "text-[var(--color-text-primary)] translate-x-4" 
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:translate-x-2"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-status-red-main)] shadow-[0_0_8px_var(--color-status-red-main)]" />
                  )}
                  
                  <span className={`font-mono text-body-xs mr-4 transition-opacity ${isActive ? "opacity-100 text-[var(--color-status-red-main)]" : "opacity-40"}`}>
                    0{i+1}
                  </span>
                  <span className="text-h4 md:text-h3 tracking-tight">
                    {dolor.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Columna Derecha: Lectura Profunda y CTA */}
          <div className="md:col-span-7 md:pl-static-md lg:pl-static-lg border-t md:border-t-0 md:border-l border-[var(--color-border-Strokes-default)] pt-static-lg md:pt-0 reveal-item flex flex-col justify-center min-h-[300px]">
            
            {/* Contenido Cambiante */}
            <div ref={descRef} className="">
              <span className="text-overline text-[var(--color-status-red-main)] mb-6 block">
                {DOLORES[activeIndex].title}
              </span>
              <p className="text-h2 md:text-display-xs text-[var(--color-text-primary)] leading-tight font-medium">
                {DOLORES[activeIndex].desc}
              </p>
            </div>

            {/* Botón CTA Fijo */}
            <div className="mt-static-xl">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('epicare-jump', { detail: { index: 1 } }));
                }}
                className="group w-fit h-12 pl-6 pr-2 rounded-full flex items-center gap-3 bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-text)] shadow-elevation-2 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-elevation-4 cursor-pointer"
              >
                <span className="text-body-sm font-medium">Tenemos la solución</span>
                <span className="relative w-8 h-8 rounded-full bg-[var(--color-action-primary-text)] text-[var(--color-action-primary-bg)] flex items-center justify-center overflow-hidden shrink-0">
                  <ArrowDown className="absolute w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-y-5" />
                  <ArrowDown className="absolute w-4 h-4 -translate-y-5 transition-transform duration-300 ease-out group-hover:translate-y-0" />
                </span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
