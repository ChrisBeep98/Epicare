"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  EASE,
  DUR,
  STAGGER,
  REVEAL,
  TRIGGER,
} from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "¿Qué carriers o aseguradoras están disponibles?",
    a: "Proveemos acceso directo a los carriers más prestigiosos de nivel nacional y regional en salud, vida y property & casualty. Nuestro motor se actualiza mensualmente con nuevos nombramientos.",
  },
  {
    q: "¿Son dueños de mi Book of Business?",
    a: "Absolutamente no. Tú mantienes el 100% de la propiedad de tu cartera desde el día uno. Epicare es el motor tecnológico y tu socio operativo, no el dueño de tu trabajo.",
  },
  {
    q: "¿Existen tarifas ocultas de mantenimiento?",
    a: "Operamos bajo una estructura de costos 100% transparente. Tienes un fee claro por el uso del stack tecnológico (AMS/CRM) y tu split de comisiones acordado. Sin sorpresas.",
  },
  {
    q: "¿Qué pasa si ya tengo mi propio CRM?",
    a: "El ecosistema Epicare está diseñado para estar unificado. Sin embargo, nuestro sistema incluye APIs abiertas para exportación de datos si deseas mantener respaldos externos.",
  },
  {
    q: "¿Cuánto tiempo toma el onboarding completo?",
    a: "Si tienes todas tus licencias en regla, el proceso de alta, firma de contratos y aprovisionamiento del software toma entre 24 y 48 horas.",
  }
];

export default function FAQEpicare() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  
  // Estado para controlar qué acordeón está abierto. null = todos cerrados.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (listRef.current) {
        const items = listRef.current.querySelectorAll(".faq-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: REVEAL.sm },
          {
            opacity: 1,
            y: 0,
            duration: DUR.base,
            ease: EASE.out,
            stagger: STAGGER.base,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: TRIGGER.standard,
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Header standardization (Hardware Optimized)
      gsap.fromTo('.anim-head-line', { yPercent: 118, willChange: 'transform' },
        { yPercent: 0, duration: 1.15, stagger: 0.12, ease: 'power4.out', clearProps: 'willChange',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
      gsap.fromTo('.anim-head-fade', { opacity: 0, y: 26, willChange: 'transform, opacity' },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'willChange',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-section-md relative bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500 overflow-hidden"
    >
      <div className="mx-auto max-w-section-md px-[0.875rem] md:px-gutter-md">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-static-2xl">
          <span className="anim-head-fade text-overline text-[var(--color-brand-blue)] dark:text-[var(--color-brand-cyan)] mb-static-md block">
            F.A.Q.
          </span>
          <h2 className="overflow-hidden pb-static-xs text-display-xl font-semibold tracking-tight leading-[1] text-[var(--color-text-Black-100)] dark:text-white">
            <span className="anim-head-line block">
              Dudas Frecuentes
            </span>
          </h2>
        </div>

        {/* Premium Accordion List (Awwwards Level) */}
        <div ref={listRef} className="flex flex-col w-full border-t border-[var(--color-border-Strokes-default)]">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const num = (idx + 1).toString().padStart(2, '0');
            return (
              <div 
                key={idx} 
                className="faq-item group cursor-pointer border-b border-[var(--color-border-Strokes-default)] relative overflow-hidden"
                onClick={() => toggleAccordion(idx)}
              >
                {/* Liquid Hover Background (Hardware Accelerated) */}
                <div className={`absolute inset-0 w-full h-full bg-[var(--color-brand-blue)]/[0.02] dark:bg-[var(--color-brand-cyan)]/[0.03] transform origin-bottom transition-transform duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none z-0 ${
                  isOpen ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                }`}></div>

                <div className="py-8 md:py-10 flex flex-row items-center md:items-center justify-between gap-4 md:gap-6 relative z-10">
                  
                  {/* Left Side: Number + Question */}
                  <div className="flex flex-row items-center gap-4 md:gap-12 flex-1">
                    
                    {/* Rolling Text / Slot Machine Animation for Number */}
                    <div className="flex flex-col h-[1.2em] justify-start overflow-hidden relative font-mono text-body-sm md:text-body-lg text-[var(--color-text-muted)] transition-transform duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] transform-gpu shrink-0">
                      <div className={`flex flex-col transition-transform duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] transform-gpu ${
                        isOpen ? "-translate-y-1/2 delay-[400ms] md:delay-0" : "group-hover:-translate-y-1/2 delay-0"
                      }`}>
                        <span className="leading-tight h-[1.2em]">{num}</span>
                        <span className="leading-tight h-[1.2em]">{num}</span>
                      </div>
                    </div>
                    
                    {/* Massive Typography with Magnetic Shift */}
                    <h3 className={`text-h4 md:text-h3 font-medium tracking-tight leading-[1.15] transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] transform-gpu max-w-[90%] md:max-w-[85%] ${
                      isOpen 
                        ? "text-[var(--color-brand-blue)] dark:text-[var(--color-brand-cyan)] translate-x-2 md:translate-x-6" 
                        : "text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-blue)] dark:group-hover:text-[var(--color-brand-cyan)] group-hover:translate-x-2 md:group-hover:translate-x-6"
                    }`}>
                      {faq.q}
                    </h3>
                  </div>
                  
                  {/* Brutalist Plus/Cross Icon */}
                  <div className="relative w-6 h-6 md:w-10 md:h-10 flex items-center justify-center shrink-0 overflow-hidden">
                    {/* Horizontal */}
                    <span className={`absolute w-full h-[2px] bg-current transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] transform-gpu ${
                      isOpen 
                        ? "rotate-[135deg] text-[var(--color-brand-blue)] dark:text-[var(--color-brand-cyan)]" 
                        : "rotate-0 text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-blue)] dark:group-hover:text-[var(--color-brand-cyan)] group-hover:rotate-180"
                    }`}></span>
                    {/* Vertical */}
                    <span className={`absolute h-full w-[2px] bg-current transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] transform-gpu ${
                      isOpen 
                        ? "rotate-[135deg] text-[var(--color-brand-blue)] dark:text-[var(--color-brand-cyan)]" 
                        : "rotate-0 text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-blue)] dark:group-hover:text-[var(--color-brand-cyan)] group-hover:rotate-180"
                    }`}></span>
                  </div>
                </div>

                {/* Hardware-Accelerated Accordion Body via CSS Grid + Birth of Typography Reveal */}
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] relative z-10 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Inner wrapper for parallax/slide up effect */}
                    <div className={`transition-transform duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] transform-gpu ${
                      isOpen ? "translate-y-0" : "translate-y-8"
                    }`}>
                       <p className="text-body-md md:text-body-lg text-[var(--color-text-secondary)] font-normal leading-relaxed pb-10 md:pb-12 pl-[3.25rem] md:pl-[5.5rem] max-w-[95%] md:max-w-[75%]">
                         {faq.a}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
