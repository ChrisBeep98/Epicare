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
          <span className="anim-head-fade text-overline text-[var(--color-text-muted)] mb-static-md block">
            06 // F.A.Q
          </span>
          <h2 className="overflow-hidden pb-static-xs text-h2 text-[var(--color-text-primary)]">
            <span className="anim-head-line block">
              Dudas Frecuentes
            </span>
          </h2>
        </div>

        {/* Lista de Acordeón */}
        <div ref={listRef} className="flex flex-col border-t border-[var(--color-border-Strokes-default)]">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="faq-item border-b border-[var(--color-border-Strokes-default)] group cursor-pointer"
                onClick={() => toggleAccordion(idx)}
              >
                <div className="py-static-lg flex items-center justify-between gap-static-md">
                  <h3 className={`text-h5 transition-colors duration-300 ${isOpen ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]"}`}>
                    {faq.q}
                  </h3>
                  
                  {/* Icono de cruz/menos animado */}
                  <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <span className="absolute w-full h-[2px] bg-[var(--color-text-primary)] rounded-full"></span>
                    <span 
                      className={`absolute w-full h-[2px] bg-[var(--color-text-primary)] rounded-full transition-transform duration-[400ms] ease-in-out ${isOpen ? "rotate-0" : "rotate-90"}`}
                    ></span>
                  </div>
                </div>

                {/* Contenedor colapsable vía Grid de Tailwind */}
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-body-md text-[var(--color-text-secondary)] pb-static-lg max-w-[90%]">
                      {faq.a}
                    </p>
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
