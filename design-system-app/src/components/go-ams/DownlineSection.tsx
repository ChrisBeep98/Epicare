"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  TreeStructure, 
  FileText, 
  UserPlus, 
  ShieldCheck, 
  Sparkle,
  ArrowRight,
  CheckCircle,
  Lightning,
  ShieldStar
} from "@phosphor-icons/react";
import { EASE, DUR } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * @description S08 / S09 · Agency Downline Experience
 * Paradigma: Pinned Horizontal Scrollytelling con Tarjetas Glassmorphic Gigantes,
 * Diagramas SVG Vectoriales Animados y Tracking de Progreso en Tiempo Real.
 */
export default function DownlineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // ── DESKTOP & TABLET: Pinned Horizontal Scroll ──
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;

        // Calcular la distancia exacta de desplazamiento horizontal
        const getScrollDistance = () => {
          return track.scrollWidth - window.innerWidth + (window.innerWidth * 0.12);
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

        // 1. Mover el track horizontalmente de derecha a izquierda
        horizontalTl.to(track, {
          x: () => -getScrollDistance(),
          ease: "none"
        });

        // 2. Animar los trazos de los SVGs dentro de cada tarjeta durante el scroll
        const svgLines = track.querySelectorAll(".animated-svg-stroke");
        svgLines.forEach((path) => {
          const pathElem = path as SVGPathElement;
          const len = pathElem.getTotalLength ? pathElem.getTotalLength() : 300;
          gsap.set(pathElem, { strokeDasharray: len, strokeDashoffset: len });

          horizontalTl.to(pathElem, {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: "none"
          }, "<+=0.1");
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
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="s08-downline" 
      className="w-full bg-[var(--color-surface-BG-base)] relative z-10"
    >
      {/* ── SECCIÓN PINEADA CON SCROLL HORIZONTAL (Desktop / Tablet) ── */}
      <section
        ref={pinSectionRef}
        className="w-full h-screen flex flex-col justify-between overflow-hidden relative pt-6 pb-8"
      >
        {/* Glow de Fondo Atmosférico Ambient */}
        <div 
          className="absolute top-1/3 left-1/3 w-[50vw] h-[40vw] rounded-full pointer-events-none opacity-20 dark:opacity-15 blur-[140px] bg-gradient-to-tr from-[var(--color-brand-orange)] via-[var(--color-brand-blue)] to-transparent" 
          aria-hidden="true" 
        />

        {/* ── 1. Top Bar de Control & Progreso (Fijo durante el pin) ── */}
        <div className="w-full max-w-section-xl mx-auto px-gutter-sm lg:px-gutter-md flex items-end justify-between gap-6 relative z-20 shrink-0 pb-3">
          
          <div className="flex flex-col gap-1.5 max-w-[640px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-orange)] animate-pulse" />
              <span className="text-overline text-[var(--color-brand-orange)]">
                Agency Downline & Ecosystem
              </span>
            </div>
            
            <h2 className="text-display-lg text-[var(--color-text-primary)] leading-[1.08] tracking-tight">
              Ves a tu equipo sin<br className="hidden sm:inline" />
              <span className="text-[var(--color-accent-main)]"> tener que preguntarle.</span>
            </h2>
          </div>

          {/* Indicador de Desplazamiento Horizontal */}
          <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-2 text-meta text-[var(--color-text-muted)] font-mono">
              <Sparkle weight="fill" className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
              <span>Desliza para explorar 3 pilares de agencia</span>
            </div>
            {/* Barra de Progreso */}
            <div className="w-48 h-1 rounded-full bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] overflow-hidden">
              <div 
                ref={progressBarRef} 
                className="w-full h-full bg-[var(--color-brand-orange)] origin-left scale-x-0 transition-transform duration-75"
              />
            </div>
          </div>

        </div>

        {/* ── 2. Track de Scroll Horizontal con Tarjetas Gigantes Glassmorphic ── */}
        <div className="w-full flex-1 flex items-center relative z-20 overflow-visible">
          <div
            ref={trackRef}
            className="flex items-center gap-6 lg:gap-10 pl-[var(--space-gutter-sm)] md:pl-[var(--space-gutter-md)] pr-[20vw] will-change-transform"
          >
            
            {/* ════ TARJETA 01: EL ÁRBOL NEURAL EN VIVO (Downline Matrix) ════ */}
            <div className="mobile-downline-card relative w-[90vw] sm:w-[80vw] md:w-[68vw] lg:w-[58vw] max-w-[820px] aspect-[16/11] md:aspect-[16/10] rounded-[2.5rem] border border-[var(--color-border-Strokes-default)]/80 dark:border-white/10 shadow-elevation-3 overflow-hidden flex flex-col justify-between p-6 md:p-10 shrink-0 group">
              
              {/* Capa Glassmorphic Separada (Pattern Skill) */}
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[var(--color-surface-BG-1)]/70 dark:bg-[#0c0d0e]/75 backdrop-blur-[28px]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 dark:from-white/5 to-transparent backdrop-blur-[16px] saturate-[1.4]" />
              </div>

              {/* Header de Tarjeta */}
              <div className="flex items-center justify-between relative z-10 border-b border-[var(--color-border-Strokes-default)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[var(--color-brand-orange)]/10 text-[var(--color-accent-main)] border border-[var(--color-brand-orange)]/20">
                    <TreeStructure weight="duotone" className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-meta text-[var(--color-text-muted)] font-mono">PILAR 01</span>
                    <h3 className="text-h3 text-[var(--color-text-primary)] font-semibold">Downline en Tiempo Real</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] text-meta text-[var(--color-text-accent-blue)] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] animate-ping" />
                  <span>Red Activa: 28 Agentes</span>
                </div>
              </div>

              {/* Gran Diagrama SVG Neural Jerárquico */}
              <div className="relative w-full flex-1 flex items-center justify-center my-2">
                <svg viewBox="0 0 700 200" className="w-full h-full max-h-[190px]" fill="none">
                  <defs>
                    <linearGradient id="treeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-brand-orange)" />
                      <stop offset="100%" stopColor="var(--color-brand-blue)" />
                    </linearGradient>
                  </defs>

                  {/* Curvas Bézier de flujo animado */}
                  <path d="M 120 100 C 240 100, 260 40, 380 40" stroke="url(#treeGrad)" strokeWidth="2.5" className="animated-svg-stroke" />
                  <path d="M 120 100 C 240 100, 260 100, 380 100" stroke="url(#treeGrad)" strokeWidth="2.5" className="animated-svg-stroke" />
                  <path d="M 120 100 C 240 100, 260 160, 380 160" stroke="url(#treeGrad)" strokeWidth="2.5" className="animated-svg-stroke" />

                  {/* Conectores a Nivel 3 */}
                  <path d="M 480 40 C 530 40, 540 25, 590 25" stroke="var(--color-brand-blue)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                  <path d="M 480 40 C 530 40, 540 55, 590 55" stroke="var(--color-brand-blue)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                  <path d="M 480 160 C 530 160, 540 175, 590 175" stroke="var(--color-brand-orange)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />

                  {/* Nodo Raíz: Agency Owner */}
                  <g transform="translate(40, 70)">
                    <rect width="110" height="60" rx="16" fill="var(--color-surface-BG-base)" stroke="var(--color-brand-orange)" strokeWidth="2" />
                    <text x="55" y="27" textAnchor="middle" fill="var(--color-text-primary)" fontSize="12" fontWeight="700" fontFamily="sans-serif">TÚ (Agency Owner)</text>
                    <text x="55" y="44" textAnchor="middle" fill="var(--color-accent-main)" fontSize="11" fontWeight="600" fontFamily="monospace">$184,200 YTD</text>
                  </g>

                  {/* Nodo Productor 1: Carlos R. (Top) */}
                  <g transform="translate(380, 16)">
                    <rect width="105" height="48" rx="12" fill="var(--color-surface-BG-2)" stroke="var(--color-border-Strokes-default)" strokeWidth="1.5" />
                    <text x="12" y="21" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" fontFamily="sans-serif">Carlos R. (FL)</text>
                    <text x="12" y="37" fill="var(--color-text-accent-blue)" fontSize="10" fontFamily="monospace">34 Pólizas · $48k</text>
                  </g>

                  {/* Nodo Productor 2: Elena M. */}
                  <g transform="translate(380, 76)">
                    <rect width="105" height="48" rx="12" fill="var(--color-surface-BG-2)" stroke="var(--color-border-Strokes-default)" strokeWidth="1.5" />
                    <text x="12" y="21" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" fontFamily="sans-serif">Elena M. (TX)</text>
                    <text x="12" y="37" fill="var(--color-text-accent-blue)" fontSize="10" fontFamily="monospace">26 Pólizas · $32k</text>
                  </g>

                  {/* Nodo Productor 3: David S. */}
                  <g transform="translate(380, 136)">
                    <rect width="105" height="48" rx="12" fill="var(--color-surface-BG-2)" stroke="var(--color-border-Strokes-default)" strokeWidth="1.5" />
                    <text x="12" y="21" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" fontFamily="sans-serif">David S. (GA)</text>
                    <text x="12" y="37" fill="var(--color-text-accent-blue)" fontSize="10" fontFamily="monospace">15 Pólizas · $19k</text>
                  </g>
                </svg>
              </div>

              {/* Footer Explicativo */}
              <div className="flex items-center justify-between text-body-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border-Strokes-default)] pt-3">
                <span>Ves quién crece, quién necesita apoyo y el volumen agregado de tu red.</span>
                <span className="text-meta text-[var(--color-text-muted)] font-mono shrink-0">Live Telemetry</span>
              </div>

            </div>


            {/* ════ TARJETA 02: CONTRACTS & WRITING AGREEMENTS ════ */}
            <div className="mobile-downline-card relative w-[90vw] sm:w-[80vw] md:w-[68vw] lg:w-[58vw] max-w-[820px] aspect-[16/11] md:aspect-[16/10] rounded-[2.5rem] border border-[var(--color-border-Strokes-default)]/80 dark:border-white/10 shadow-elevation-3 overflow-hidden flex flex-col justify-between p-6 md:p-10 shrink-0 group">
              
              {/* Capa Glassmorphic */}
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[var(--color-surface-BG-1)]/70 dark:bg-[#0c0d0e]/75 backdrop-blur-[28px]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 dark:from-white/5 to-transparent backdrop-blur-[16px] saturate-[1.4]" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between relative z-10 border-b border-[var(--color-border-Strokes-default)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/20">
                    <FileText weight="duotone" className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-meta text-[var(--color-text-muted)] font-mono">PILAR 02</span>
                    <h3 className="text-h3 text-[var(--color-text-primary)] font-semibold">Contracts & Writing Numbers</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] text-meta text-[var(--color-accent-main)] font-mono">
                  <ShieldStar weight="fill" className="w-4 h-4" />
                  <span>130+ Carriers Conectados</span>
                </div>
              </div>

              {/* Grid Visual de Acuerdos Carrier */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-2">
                {[
                  { carrier: "Florida Blue", writing: "WN-88219", status: "Aprobado Directo", level: "Top Tier" },
                  { carrier: "Humana Medicare", writing: "WN-44012", status: "Sincronizado", level: "Senior 110%" },
                  { carrier: "UnitedHealthcare", writing: "WN-39910", status: "Sincronizado", level: "General" },
                  { carrier: "Ambetter ACA", writing: "WN-77218", status: "Aprobado Directo", level: "Top Tier" },
                  { carrier: "Cigna Healthcare", writing: "WN-61102", status: "Sincronizado", level: "Senior 105%" },
                  { carrier: "Aetna Health", writing: "WN-90412", status: "Sincronizado", level: "General" },
                ].map((c, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[var(--color-surface-BG-base)]/80 border border-[var(--color-border-Strokes-default)] flex flex-col justify-between gap-1.5 shadow-sm hover:border-[var(--color-brand-blue)]/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm font-semibold text-[var(--color-text-primary)]">{c.carrier}</span>
                      <CheckCircle weight="fill" className="w-3.5 h-3.5 text-[var(--color-brand-blue)]" />
                    </div>
                    <div className="flex items-center justify-between text-meta font-mono text-[var(--color-text-muted)] border-t border-[var(--color-border-Strokes-default)]/60 pt-1.5">
                      <span>{c.writing}</span>
                      <span className="text-[var(--color-text-accent-blue)]">{c.level}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Explicativo */}
              <div className="flex items-center justify-between text-body-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border-Strokes-default)] pt-3">
                <span>Modo lectura unificado de contratos carrier para evitar duplicidad de solicitudes.</span>
                <span className="text-meta text-[var(--color-text-muted)] font-mono shrink-0">NIPR Verified</span>
              </div>

            </div>


            {/* ════ TARJETA 03: ONBOARDING DIGITAL EN 1 CLIC ════ */}
            <div className="mobile-downline-card relative w-[90vw] sm:w-[80vw] md:w-[68vw] lg:w-[58vw] max-w-[820px] aspect-[16/11] md:aspect-[16/10] rounded-[2.5rem] border border-[var(--color-border-Strokes-default)]/80 dark:border-white/10 shadow-elevation-3 overflow-hidden flex flex-col justify-between p-6 md:p-10 shrink-0 group">
              
              {/* Capa Glassmorphic */}
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[var(--color-surface-BG-1)]/70 dark:bg-[#0c0d0e]/75 backdrop-blur-[28px]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 dark:from-white/5 to-transparent backdrop-blur-[16px] saturate-[1.4]" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between relative z-10 border-b border-[var(--color-border-Strokes-default)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[var(--color-text-accent-dark)]/10 text-[var(--color-text-primary)] border border-[var(--color-border-Strokes-default)]">
                    <UserPlus weight="duotone" className="w-6 h-6 text-[var(--color-brand-orange)]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-meta text-[var(--color-text-muted)] font-mono">PILAR 03</span>
                    <h3 className="text-h3 text-[var(--color-text-primary)] font-semibold">Onboarding de Nuevos Agentes</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-orange)]/10 border border-[var(--color-brand-orange)]/20 text-meta text-[var(--color-accent-main)] font-mono">
                  <Lightning weight="fill" className="w-3.5 h-3.5" />
                  <span>Activación en 24-48h</span>
                </div>
              </div>

              {/* Flujo Visual Conectivo de 3 Pasos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
                
                <div className="p-4 rounded-2xl bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] flex flex-col justify-between gap-3 shadow-sm">
                  <span className="w-7 h-7 rounded-xl bg-[var(--color-brand-orange)] text-white flex items-center justify-center font-mono font-bold text-meta">1</span>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-body-md font-semibold text-[var(--color-text-primary)]">Envías Invitación</h4>
                    <p className="text-body-xs text-[var(--color-text-secondary)] leading-relaxed">El productor recibe un link único para registrar sus licencias NIPR.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] flex flex-col justify-between gap-3 shadow-sm">
                  <span className="w-7 h-7 rounded-xl bg-[var(--color-brand-blue)] text-white flex items-center justify-center font-mono font-bold text-meta">2</span>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-body-md font-semibold text-[var(--color-text-primary)]">Firma con Epicare</h4>
                    <p className="text-body-xs text-[var(--color-text-secondary)] leading-relaxed">Firma digital de acuerdo institucional sin intermediarios físicos.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] flex flex-col justify-between gap-3 shadow-sm">
                  <span className="w-7 h-7 rounded-xl bg-[var(--color-surface-BG-2)] text-[var(--color-text-primary)] border border-[var(--color-border-Strokes-default)] flex items-center justify-center font-mono font-bold text-meta">3</span>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-body-md font-semibold text-[var(--color-text-primary)]">Bajo tu Upline</h4>
                    <p className="text-body-xs text-[var(--color-text-secondary)] leading-relaxed">El agente se vincula a tu Downline para cotizar y registrar producción.</p>
                  </div>
                </div>

              </div>

              {/* Footer Explicativo */}
              <div className="flex items-center justify-between text-body-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border-Strokes-default)] pt-3">
                <span>El contrato siempre es con Epicare; tu agencia queda como upline oficial.</span>
                <span className="text-meta text-[var(--color-text-muted)] font-mono shrink-0">1-Click Pipeline</span>
              </div>

            </div>

          </div>
        </div>

        {/* ── 3. Banner de Confianza y Privacidad Blindada ── */}
        <div className="w-full max-w-section-xl mx-auto px-gutter-sm lg:px-gutter-md relative z-20 shrink-0">
          <div className="w-full p-static-md rounded-2xl bg-[var(--color-surface-BG-1)]/90 backdrop-blur-md border border-[var(--color-border-Strokes-default)] flex items-center justify-between gap-4 text-body-sm text-[var(--color-text-secondary)] shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck weight="fill" className="w-5 h-5 text-[var(--color-brand-blue)] shrink-0" />
              <span>
                <strong className="text-[var(--color-text-primary)]">Autonomía y Privacidad:</strong> Ves las métricas agregadas de tu equipo, pero sus cuentas individuales permanecen 100% privadas.
              </span>
            </div>
            <span className="text-meta font-mono text-[var(--color-text-muted)] hidden md:inline shrink-0">
              Audit Log Transparent
            </span>
          </div>
        </div>

      </section>
    </div>
  );
}
