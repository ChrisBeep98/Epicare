"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { EASE, DUR, STAGGER, REVEAL, TRIGGER } from "@/lib/motion";

const FAQ_ITEMS = [
  { qKey: "q1", aKey: "a1" },
  { qKey: "q2", aKey: "a2" },
  { qKey: "q3", aKey: "a3" },
  { qKey: "q4", aKey: "a4" },
  { qKey: "q5", aKey: "a5" },
  { qKey: "q6", aKey: "a6" },
];

export default function FaqSection() {
  const t = useTranslations('goAms.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".faq-title-line, .faq-subtitle, .faq-row", {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)"
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: TRIGGER.standard,
          toggleActions: "play none none reverse"
        }
      });

      // 1. Título de Sección con Line-by-Line Clip
      tl.fromTo(
        ".faq-title-line",
        {
          yPercent: REVEAL.birthPercent,
          opacity: 0,
          clipPath: "inset(0% 0% 100% 0%)",
          willChange: "transform, opacity, clip-path"
        },
        {
          yPercent: 0,
          opacity: 1,
          clipPath: "inset(-20% -10% -20% -10%)",
          duration: DUR.base,
          ease: EASE.dramatic,
          clearProps: "clipPath,willChange"
        }
      );

      // 2. Subtítulo
      tl.fromTo(
        ".faq-subtitle",
        { opacity: 0, y: REVEAL.sm, willChange: "transform, opacity" },
        {
          opacity: 1,
          y: 0,
          duration: DUR.fast,
          ease: EASE.out,
          clearProps: "willChange"
        },
        "-=0.4"
      );

      // 3. Entrada en Cascada Escalonada para las Filas del Acordeón
      tl.fromTo(
        ".faq-row",
        { 
          opacity: 0, 
          y: REVEAL.md, 
          scale: 0.98,
          willChange: "transform, opacity" 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: DUR.base,
          stagger: STAGGER.tight,
          ease: EASE.out,
          force3D: true,
          clearProps: "willChange"
        },
        "-=0.3"
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="faq"
      className="w-full py-section-sm md:py-section-md bg-[var(--color-surface-BG-1)] relative border-t border-[var(--color-border-Strokes-strong)] overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto px-3.5 sm:px-gutter-sm md:px-gutter-md">
        
        {/* ── CABECERA ── */}
        <div className="mb-12 sm:mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div>
            <h2 className="text-display-lg font-display uppercase tracking-tighter text-[var(--color-text-primary)] leading-[0.9]">
              <span className="faq-title-line block">{t('title')}</span>
            </h2>
          </div>
          <p className="faq-subtitle text-body-md sm:text-body-lg text-[var(--color-text-secondary)] max-w-sm md:max-w-[200px] text-left md:text-right pb-2">
            {t('subtitle')}
          </p>
        </div>

        {/* ── LISTA DE ACORDEÓN ── */}
        <div className="border-t border-[var(--color-border-Strokes-default)]">
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="faq-row border-b border-[var(--color-border-Strokes-strong)] group">
                
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full py-6 md:py-10 flex items-center justify-between gap-6 md:gap-8 text-left outline-none cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <h3 className={`text-h5 md:text-h4 font-display uppercase tracking-tight transition-colors duration-300 ${isOpen ? 'text-[var(--color-brand-blue)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-blue)]'}`}>
                    {t(faq.qKey as any)}
                  </h3>
                  
                  {/* Icono animado (+ a -) */}
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center relative">
                    {/* Línea horizontal */}
                    <span className={`absolute w-full h-[2px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-180 bg-[var(--color-brand-blue)]' : 'bg-[var(--color-text-muted)] group-hover:bg-[var(--color-brand-blue)]'}`} />
                    {/* Línea vertical */}
                    <span className={`absolute h-full w-[2px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-90 scale-0 bg-[var(--color-brand-blue)]' : 'rotate-0 scale-100 bg-[var(--color-text-muted)] group-hover:bg-[var(--color-brand-blue)]'}`} />
                  </div>
                </button>
                
                {/* Contenedor colapsable (CSS Grid dinámico) */}
                <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="pb-8 pt-2 md:pb-10 text-body-lg md:text-body-xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
                      {t(faq.aKey as any)}
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
