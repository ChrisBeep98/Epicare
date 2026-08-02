"use client";

import React, { useRef, useLayoutEffect } from "react";
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

const STATES_DATA = [
  { id: "AL", name: "Alabama" }, { id: "AK", name: "Alaska" }, { id: "AZ", name: "Arizona" },
  { id: "AR", name: "Arkansas" }, { id: "CA", name: "California" }, { id: "CO", name: "Colorado" },
  { id: "CT", name: "Connecticut" }, { id: "DE", name: "Delaware" }, { id: "FL", name: "Florida" },
  { id: "GA", name: "Georgia" }, { id: "HI", name: "Hawaii" }, { id: "ID", name: "Idaho" },
  { id: "IL", name: "Illinois" }, { id: "IN", name: "Indiana" }, { id: "IA", name: "Iowa" },
  { id: "KS", name: "Kansas" }, { id: "KY", name: "Kentucky" }, { id: "LA", name: "Louisiana" },
  { id: "ME", name: "Maine" }, { id: "MD", name: "Maryland" }, { id: "MA", name: "Massachusetts" },
  { id: "MI", name: "Michigan" }, { id: "MN", name: "Minnesota" }, { id: "MS", name: "Mississippi" },
  { id: "MO", name: "Missouri" }, { id: "MT", name: "Montana" }, { id: "NE", name: "Nebraska" },
  { id: "NV", name: "Nevada" }, { id: "NH", name: "New Hampshire" }, { id: "NJ", name: "New Jersey" },
  { id: "NM", name: "New Mexico" }, { id: "NY", name: "New York" }, { id: "NC", name: "North Carolina" },
  { id: "ND", name: "North Dakota" }, { id: "OH", name: "Ohio" }, { id: "OK", name: "Oklahoma" },
  { id: "OR", name: "Oregon" }, { id: "PA", name: "Pennsylvania" }, { id: "RI", name: "Rhode Island" },
  { id: "SC", name: "South Carolina" }, { id: "SD", name: "South Dakota" }, { id: "TN", name: "Tennessee" },
  { id: "TX", name: "Texas" }, { id: "UT", name: "Utah" }, { id: "VT", name: "Vermont" },
  { id: "VA", name: "Virginia" }, { id: "WA", name: "Washington" }, { id: "WV", name: "West Virginia" },
  { id: "WI", name: "Wisconsin" }, { id: "WY", name: "Wyoming" }, { id: "DC", name: "Washington D.C." },
  { id: "PR", name: "Puerto Rico" }
];

export default function Coverage52Epicare() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal del Header
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: REVEAL.sm,
        },
        {
          opacity: 1,
          y: 0,
          duration: DUR.base,
          ease: EASE.out,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: TRIGGER.standard,
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Staggered Light-up de los 52 badges
      if (gridRef.current) {
        const badges = gridRef.current.querySelectorAll(".state-badge");
        gsap.fromTo(
          badges,
          {
            opacity: 0,
            scale: 0.9,
            y: 10,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: DUR.fast,
            ease: EASE.out,
            stagger: {
              each: STAGGER.tight,
              from: "random",
            },
            scrollTrigger: {
              trigger: gridRef.current,
              start: TRIGGER.early,
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full pb-section-md relative border-b border-[var(--color-border-Strokes-default)] overflow-hidden"
    >
      <div className="mx-auto max-w-section-xl px-[0.875rem] md:px-gutter-md">
        
        {/* Header de la sección */}
        <div ref={headerRef} className="flex flex-col gap-fluid-xs mb-static-2xl items-center text-center">
          <span className="text-overline text-[var(--color-text-muted)]">
            Alcance nacional
          </span>
          <h2 className="text-h2 text-[var(--color-text-primary)]">
            52 jurisdicciones.
          </h2>
          <p className="text-subtitle text-[var(--color-text-secondary)] max-w-section-md">
            50 estados, Washington DC y Puerto Rico. Licenciados y operando en todas — no en proceso, no próximamente.
          </p>
        </div>

        {/* Matriz de Datos (Grid de Badges Mono) */}
        <div 
          ref={gridRef}
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-[4px] md:gap-fluid-xs justify-center"
        >
          {STATES_DATA.map((state) => (
            <div
              key={state.id}
              className="state-badge relative flex items-center justify-center p-static-sm border border-[var(--color-border-Strokes-default)] bg-[var(--color-surface-BG-1)] transition-colors duration-500 hover:bg-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] group cursor-default"
            >
              {/* Liquid Glass Tooltip Expandido */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-[400ms] pointer-events-none z-20 px-static-md py-static-sm rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-elevation-4 whitespace-nowrap overflow-hidden flex items-center justify-center">
                {/* Brillo interno del cristal */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 dark:from-white/0 dark:via-white/5 dark:to-white/0"></div>
                
                {/* Texto del estado */}
                <span className="relative text-ui-label text-black dark:text-white drop-shadow-sm">
                  {state.name}
                </span>
              </div>

              {/* Abreviación del Estado */}
              <span className="text-meta text-[var(--color-text-muted)] group-hover:text-[var(--color-surface-BG-base)] transition-colors duration-300">
                {state.id}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
