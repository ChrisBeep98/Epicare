"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { 
  TreeStructure, 
  Sparkle,
  Certificate,
  UserPlus,
  ShieldStar,
  Lightning,
} from "@phosphor-icons/react";
import { asset } from "@/lib/asset";
import { EASE, DUR, STAGGER, REVEAL, TRIGGER, SCRUB } from "@/lib/motion";

/**
 * @description S08 / S09 · Agency Downline Experience
 * Paradigma: Pinned Horizontal Scrollytelling (Arquetipo 4) con Hardware Symphony,
 * Line-by-Line Header Reveal y adaptación responsive fluida.
 */
export default function DownlineSection() {
  const t = useTranslations('goAms.downline');
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [leftOffset, setLeftOffset] = useState<number>(24);

  // Calcular la alineación fija de las imágenes al contenedor base
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".dl-title-line, .dl-eyebrow, .dl-hint, .mobile-downline-card", {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)"
        });
        return;
      }

      // ── 1. Entrada del Header (Line-by-Line Clip + Eyebrow) ──
      gsap.fromTo(
        ".dl-title-line",
        { yPercent: REVEAL.birthPercent, opacity: 0, clipPath: "inset(0% 0% 100% 0%)", willChange: "transform, opacity, clip-path" },
        {
          yPercent: 0,
          opacity: 1,
          clipPath: "inset(-20% -10% -20% -10%)",
          duration: 0.8,
          stagger: STAGGER.base,
          ease: EASE.dramatic,
          clearProps: "clipPath,willChange",
          scrollTrigger: {
            trigger: el,
            start: TRIGGER.standard,
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".dl-eyebrow, .dl-hint",
        { opacity: 0, y: REVEAL.sm, willChange: "transform, opacity" },
        {
          opacity: 1,
          y: 0,
          duration: DUR.fast,
          stagger: STAGGER.base,
          ease: EASE.out,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: el,
            start: TRIGGER.standard,
            toggleActions: "play none none reverse",
          },
        }
      );

      const mm = gsap.matchMedia();

      // ── 2. DESKTOP & TABLET: Pinned Horizontal Scrollytelling (Arquetipo 4) ──
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
            scrub: SCRUB.crisp, // 1.0 para respuesta inmediata al dedo
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
          ease: EASE.none,
          force3D: true,
          willChange: "transform",
          clearProps: "willChange"
        });
      });

      // ── 3. MOBILE: Entrada Vertical en Cascada (Arquetipo 3 Wave Stagger) ──
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".mobile-downline-card",
          { opacity: 0, y: REVEAL.md, scale: 0.97, willChange: "transform, opacity" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: DUR.base,
            stagger: STAGGER.wave,
            ease: EASE.out,
            force3D: true,
            clearProps: "willChange",
            scrollTrigger: {
              trigger: el,
              start: TRIGGER.standard,
              toggleActions: "play none none reverse",
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
        className="w-full min-h-dvh flex flex-col justify-between overflow-hidden relative pt-6 pb-8"
      >
        {/* ── 1. Top Bar de Control & Progreso ── */}
        <div 
          ref={headerRef}
          className="w-full max-w-section-xl mx-auto px-gutter-sm lg:px-gutter-md grid-layout items-end relative z-20 shrink-0 pb-4"
        >
          {/* Bloque de Título */}
          <div className="col-span-6 md:col-span-8 lg:col-span-8 flex flex-col items-start gap-1.5 text-left">
            <div className="dl-eyebrow flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] animate-pulse" />
              <span className="text-overline text-[var(--color-brand-blue)]">
                {t('overline')}
              </span>
            </div>
            
            <h2 className="text-display-lg text-[var(--color-text-primary)]">
              <span className="dl-title-line block">{t('title1')}</span>
              <span className="dl-title-line block text-[var(--color-text-accent-blue)]">
                {t('title2')}
              </span>
            </h2>
          </div>

          {/* Indicador de Desplazamiento Horizontal */}
          <div className="dl-hint col-span-6 md:col-span-4 lg:col-span-4 flex flex-col items-start md:items-end gap-2 shrink-0 pb-1">
            <div className="flex items-center gap-2 text-meta text-[var(--color-text-muted)] font-mono">
              <Sparkle weight="fill" className="w-3.5 h-3.5 text-[var(--color-brand-blue)]" />
              <span>{t('scrollHint')}</span>
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
            <div className="mobile-downline-card relative w-[90vw] sm:w-[80vw] md:w-[68vw] lg:w-[58vw] max-w-[840px] aspect-[16/10] rounded-[2rem] border border-[var(--color-border-Strokes-default)] shadow-elevation-3 overflow-hidden flex flex-col shrink-0 bg-[var(--color-surface-BG-1)] group">
              
              {/* Header de Tarjeta Compacto */}
              <div className="py-2.5 px-4 sm:py-3 sm:px-5 flex items-center justify-between border-b border-[var(--color-border-Strokes-default)] bg-[var(--color-surface-BG-1)]/95 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-xl bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/20">
                    <TreeStructure weight="duotone" className="w-4 h-4" />
                  </div>
                  <h3 className="text-body-md text-[var(--color-text-primary)] font-semibold">{t('card1Title')}</h3>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] text-meta text-[var(--color-text-accent-blue)] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-blue)] animate-ping" />
                  <span>{t('card1Badge')}</span>
                </div>
              </div>

              {/* Screenshot Real */}
              <div className="relative w-full flex-1 overflow-hidden bg-[var(--color-surface-BG-base)]">
                <img
                  src={asset("/Files/Go_AMS/downline_and ecosystem/downline 1.png")}
                  alt={t('card1Alt')}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>

            {/* ════ TARJETA 02: LICENCIAS & COMPLIANCE ════ */}
            <div className="mobile-downline-card relative w-[90vw] sm:w-[80vw] md:w-[68vw] lg:w-[58vw] max-w-[840px] aspect-[16/10] rounded-[2rem] border border-[var(--color-border-Strokes-default)] shadow-elevation-3 overflow-hidden flex flex-col shrink-0 bg-[var(--color-surface-BG-1)] group">
              
              {/* Header de Tarjeta Compacto */}
              <div className="py-2.5 px-4 sm:py-3 sm:px-5 flex items-center justify-between border-b border-[var(--color-border-Strokes-default)] bg-[var(--color-surface-BG-1)]/95 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-xl bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/20">
                    <Certificate weight="duotone" className="w-4 h-4" />
                  </div>
                  <h3 className="text-body-md text-[var(--color-text-primary)] font-semibold">{t('card2Title')}</h3>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] text-meta text-[var(--color-text-accent-blue)] font-mono">
                  <ShieldStar weight="fill" className="w-3.5 h-3.5" />
                  <span>{t('card2Badge')}</span>
                </div>
              </div>

              {/* Screenshot Real */}
              <div className="relative w-full flex-1 overflow-hidden bg-[var(--color-surface-BG-base)]">
                <img
                  src={asset("/Files/Go_AMS/downline_and ecosystem/locense_details.png")}
                  alt={t('card2Alt')}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>

            {/* ════ TARJETA 03: ONBOARDING DIGITAL DE AGENTES ════ */}
            <div className="mobile-downline-card relative w-[90vw] sm:w-[80vw] md:w-[68vw] lg:w-[58vw] max-w-[840px] aspect-[16/10] rounded-[2rem] border border-[var(--color-border-Strokes-default)] shadow-elevation-3 overflow-hidden flex flex-col shrink-0 bg-[var(--color-surface-BG-1)] group">
              
              {/* Header de Tarjeta Compacto */}
              <div className="py-2.5 px-4 sm:py-3 sm:px-5 flex items-center justify-between border-b border-[var(--color-border-Strokes-default)] bg-[var(--color-surface-BG-1)]/95 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-xl bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/20">
                    <UserPlus weight="duotone" className="w-4 h-4 text-[var(--color-brand-blue)]" />
                  </div>
                  <h3 className="text-body-md text-[var(--color-text-primary)] font-semibold">{t('card3Title')}</h3>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-brand-blue)]/10 border border-[var(--color-brand-blue)]/20 text-meta text-[var(--color-text-accent-blue)] font-mono">
                  <Lightning weight="fill" className="w-3.5 h-3.5" />
                  <span>{t('card3Badge')}</span>
                </div>
              </div>

              {/* Screenshot Real */}
              <div className="relative w-full flex-1 overflow-hidden bg-[var(--color-surface-BG-base)]">
                <img
                  src={asset("/Files/Go_AMS/downline_and ecosystem/Invite to downline.png")}
                  alt={t('card3Alt')}
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
