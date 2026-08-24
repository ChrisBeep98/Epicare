"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  TreeStructure, 
  Sparkle,
  Certificate,
  UserPlus,
  ShieldStar,
  Lightning,
  ShieldCheck
} from "@phosphor-icons/react";
import { asset } from "@/lib/asset";
import { EASE, DUR } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * @description S08 / S09 · Agency Downline Experience
 * Paradigma: Pinned Horizontal Scrollytelling con Screenshots Reales de Producto Full-Width,
 * alineación matemática exacta con el margen del título y eliminación de textos redundantes.
 */
export default function DownlineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [leftOffset, setLeftOffset] = useState<number>(24);

  // Calcular la alineación fija de las imágenes al contenedor base (sin moverse con el título)
  useEffect(() => {
    const updateOffset = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(headerRef.current);
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 24;
        setLeftOffset(rect.left + paddingLeft > 0 ? rect.left + paddingLeft : 24);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    window.addEventListener("load", updateOffset);

    return () => {
      window.removeEventListener("resize", updateOffset);
      window.removeEventListener("load", updateOffset);
    };
  }, []);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // ── DESKTOP & TABLET: Pinned Horizontal Scroll ──
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track || !pinSectionRef.current) return;

        const getScrollDistance = () => {
          return track.scrollWidth - window.innerWidth + leftOffset + 80;
        };

        const horizontalTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                gsap.set(progressBarRef.current, { scaleX: self.progress });
              }
            }
          }
        });

        horizontalTl.to(track, {
          x: () => -getScrollDistance(),
          ease: "none"
        });
      });

      // ── MOBILE: Entrada Vertical Staggered ──
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".mobile-downline-card",
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: DUR.base,
            stagger: 0.15,
            ease: EASE.out,
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              once: true,
            }
          }
        );
      });

    }, el);

    return () => ctx.revert();
  }, [leftOffset]);

  return (
    <div 
      ref={containerRef} 
      id="s08-downline" 
      className="w-full bg-[var(--color-surface-BG-base)] relative z-10 mb-section-md"
    >
      {/* ── SECCIÓN PINEADA CON SCROLL HORIZONTAL (Desktop / Tablet) ── */}
      <section
        ref={pinSectionRef}
        className="w-full h-screen flex flex-col justify-between overflow-hidden relative pt-6 pb-8"
      >
        {/* ── 1. Top Bar de Control & Progreso (Título corrido 2 columnas a la derecha) ── */}
        <div 
          ref={headerRef}
          className="w-full max-w-section-xl mx-auto px-gutter-sm lg:px-gutter-md grid-layout items-end relative z-20 shrink-0 pb-4"
        >
          {/* Bloque de Título (Desplazado 2 columnas: col-start-3 en 12 cols) */}
          <div className="col-span-6 md:col-span-6 lg:col-start-3 lg:col-span-7 flex flex-col items-start gap-1.5 text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] animate-pulse" />
              <span className="text-overline text-[var(--color-brand-blue)]">
                Agency Downline & Ecosystem
              </span>
            </div>
            
            <h2 className="text-display-lg text-[var(--color-text-primary)] leading-[1.08] tracking-tight">
              Ves a tu equipo sin<br />
              <span className="text-[var(--color-text-accent-blue)]">tener que preguntarle.</span>
            </h2>
          </div>

          {/* Indicador de Desplazamiento Horizontal (Flujo natural a la derecha) */}
          <div className="col-span-6 md:col-span-2 lg:col-start-11 lg:col-span-2 flex flex-col items-start md:items-end gap-2 shrink-0 pb-1">
            <div className="flex items-center gap-2 text-meta text-[var(--color-text-muted)] font-mono">
              <Sparkle weight="fill" className="w-3.5 h-3.5 text-[var(--color-brand-blue)]" />
              <span>Scroll down</span>
            </div>
            {/* Barra de Progreso */}
            <div className="w-40 sm:w-48 h-1 rounded-full bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] overflow-hidden">
              <div 
                ref={progressBarRef} 
                className="w-full h-full bg-[var(--color-brand-blue)] origin-left scale-x-0 transition-transform duration-75"
              />
            </div>
          </div>
        </div>

        {/* ── 2. Track de Scroll Horizontal Alineado con el Título ── */}
        <div className="w-full flex-1 flex items-center relative z-20 overflow-visible">
          <div
            ref={trackRef}
            style={{ paddingLeft: `${leftOffset}px` }}
            className="flex items-center gap-6 lg:gap-8 pr-[20vw] will-change-transform"
          >
            
            {/* ════ TARJETA 01: DOWNLINE EN TIEMPO REAL ════ */}
            <div className="mobile-downline-card relative w-[90vw] sm:w-[80vw] md:w-[68vw] lg:w-[58vw] max-w-[840px] aspect-[16/10] rounded-[2rem] border border-[var(--color-border-Strokes-default)]/80 dark:border-white/10 shadow-elevation-3 overflow-hidden flex flex-col shrink-0 bg-[var(--color-surface-BG-1)] group">
              
              {/* Header de Tarjeta */}
              <div className="p-4 sm:p-5 md:p-6 flex items-center justify-between border-b border-[var(--color-border-Strokes-default)] bg-[var(--color-surface-BG-1)]/95 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/20">
                    <TreeStructure weight="duotone" className="w-5 h-5" />
                  </div>
                  <h3 className="text-h4 text-[var(--color-text-primary)] font-semibold">Downline en Tiempo Real</h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] text-meta text-[var(--color-text-accent-blue)] font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] animate-ping" />
                  <span>8 Agentes Activos · Salesforce</span>
                </div>
              </div>

              {/* Screenshot Real: Full Width sin márgenes */}
              <div className="relative w-full flex-1 overflow-hidden bg-[var(--color-surface-BG-base)]">
                <img
                  src={asset("/Files/Go_AMS/downline_and ecosystem/downline 1.png")}
                  alt="Downline en Tiempo Real · Métricas de Producción por Agente"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>


            {/* ════ TARJETA 02: LICENCIAS & COMPLIANCE ════ */}
            <div className="mobile-downline-card relative w-[90vw] sm:w-[80vw] md:w-[68vw] lg:w-[58vw] max-w-[840px] aspect-[16/10] rounded-[2rem] border border-[var(--color-border-Strokes-default)]/80 dark:border-white/10 shadow-elevation-3 overflow-hidden flex flex-col shrink-0 bg-[var(--color-surface-BG-1)] group">
              
              {/* Header */}
              <div className="p-4 sm:p-5 md:p-6 flex items-center justify-between border-b border-[var(--color-border-Strokes-default)] bg-[var(--color-surface-BG-1)]/95 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/20">
                    <Certificate weight="duotone" className="w-5 h-5" />
                  </div>
                  <h3 className="text-h4 text-[var(--color-text-primary)] font-semibold">Licencias & Continuing Education</h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] text-meta text-[var(--color-text-accent-blue)] font-mono text-[11px]">
                  <ShieldStar weight="fill" className="w-3.5 h-3.5" />
                  <span>NIPR Sincronizado</span>
                </div>
              </div>

              {/* Screenshot Real: Full Width sin márgenes */}
              <div className="relative w-full flex-1 overflow-hidden bg-[var(--color-surface-BG-base)]">
                <img
                  src={asset("/Files/Go_AMS/downline_and ecosystem/locense_details.png")}
                  alt="Detalles de Licencias y Vigencia por Estado"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>


            {/* ════ TARJETA 03: ONBOARDING DIGITAL DE AGENTES ════ */}
            <div className="mobile-downline-card relative w-[90vw] sm:w-[80vw] md:w-[68vw] lg:w-[58vw] max-w-[840px] aspect-[16/10] rounded-[2rem] border border-[var(--color-border-Strokes-default)]/80 dark:border-white/10 shadow-elevation-3 overflow-hidden flex flex-col shrink-0 bg-[var(--color-surface-BG-1)] group">
              
              {/* Header */}
              <div className="p-4 sm:p-5 md:p-6 flex items-center justify-between border-b border-[var(--color-border-Strokes-default)] bg-[var(--color-surface-BG-1)]/95 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/20">
                    <UserPlus weight="duotone" className="w-5 h-5 text-[var(--color-brand-blue)]" />
                  </div>
                  <h3 className="text-h4 text-[var(--color-text-primary)] font-semibold">Onboarding de Nuevos Agentes</h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-blue)]/10 border border-[var(--color-brand-blue)]/20 text-meta text-[var(--color-text-accent-blue)] font-mono text-[11px]">
                  <Lightning weight="fill" className="w-3.5 h-3.5" />
                  <span>Invitación en 1 Clic</span>
                </div>
              </div>

              {/* Screenshot Real: Full Width sin márgenes */}
              <div className="relative w-full flex-1 overflow-hidden bg-[var(--color-surface-BG-base)]">
                <img
                  src={asset("/Files/Go_AMS/downline_and ecosystem/Invite to downline.png")}
                  alt="Onboarding e Invitación de Nuevos Productores a la Agencia"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}
