"use client";

import React, { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { 
  Calculator, 
  Users, 
  FileText,
  CurrencyDollar,
  UsersThree,
  Gear,
  CheckCircle,
  LockKey,
  ShieldCheck,
  ArrowRight
} from "@phosphor-icons/react";
import { EASE, DUR, STAGGER, REVEAL, TRIGGER } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function DelegateUsersSection() {
  const t = useTranslations('goAms.delegateUsers');
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const modules = [
    { id: 1, nameKey: "modQuote", icon: Calculator },
    { id: 2, nameKey: "modCustomers", icon: Users },
    { id: 3, nameKey: "modContracts", icon: FileText },
    { id: 4, nameKey: "modCommissions", icon: CurrencyDollar },
    { id: 5, nameKey: "modDownline", icon: UsersThree },
    { id: 6, nameKey: "modSettings", icon: Gear },
  ];

  // Cinematic Architect Tilt (Desktop)
  useEffect(() => {
    if (!sceneRef.current) return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const xTo = gsap.quickTo(sceneRef.current, "rotationY", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(sceneRef.current, "rotationX", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 12; 
      const y = (clientY / window.innerHeight - 0.5) * -12;
      xTo(x);
      yTo(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // ── ENTRADA DEL COPY IZQUIERDO (Timeline directa con trigger en el bloque de texto) ──
      const copyTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".copy-column",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      copyTl
        .fromTo(
          ".delegate-eyebrow",
          { opacity: 0, y: REVEAL.sm, willChange: "transform, opacity" },
          {
            opacity: 1,
            y: 0,
            duration: DUR.fast,
            ease: EASE.out,
            clearProps: "willChange"
          }
        )
        .fromTo(
          ".delegate-title-line",
          {
            yPercent: 120,
            opacity: 0,
            willChange: "transform, opacity"
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: DUR.base,
            stagger: STAGGER.base,
            ease: EASE.dramatic,
            force3D: true,
            clearProps: "all"
          },
          "-=0.2"
        )
        .fromTo(
          ".delegate-subtitle",
          { opacity: 0, y: REVEAL.md, willChange: "transform, opacity" },
          {
            opacity: 1,
            y: 0,
            duration: DUR.base,
            ease: EASE.out,
            clearProps: "willChange"
          },
          "-=0.4"
        );

      // Smart Shutdown: Solo correr animación infinita si está visible en viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 0%",
          toggleActions: "play pause resume pause"
        },
        repeat: -1,
        repeatDelay: 0.2 
      });

      // ── RESET MAESTRO INICIAL (SOLO PARA LA TARJETA VISUAL) ──
      tl.addLabel("reset")
        .set(".glass-matrix", { opacity: 0, y: REVEAL.md, scale: 0.96, rotateY: 0 })
        .set(".scene-act-1", { opacity: 0, pointerEvents: "auto" })
        .set(".scene-act-2", { opacity: 0, pointerEvents: "none" })
        .set(".act2-item", { opacity: 0, y: 15, scale: 0.95 })
        .set(".scene-act-3", { opacity: 0, pointerEvents: "none" })
        .set(".module-card", { opacity: 0, y: REVEAL.sm, scale: 0.88 }) 
        .set(".toggle-knob", { x: 0 })
        .set(".toggle-bg", { backgroundColor: "var(--color-surface-BG-3)", borderColor: "var(--color-border-Strokes-default)" })
        .set(".check-icon", { scale: 0, opacity: 0 })
        .set(".pulse-center-icon", { scale: 0.85, opacity: 0 });

      // ── ENTRADA DEL LIENZO DE CRISTAL ──
      tl.addLabel("enter", "+=0.05")
        .to(".glass-matrix", { opacity: 1, y: 0, scale: 1, duration: DUR.base, ease: EASE.dramatic, force3D: true }, "enter");

      // ════════════════════════════════════════════════════════════════════════
      // ── ACTO 1: LA MATRIZ DE 6 MÓDULOS (Rápido y Secuencial) ──
      // ════════════════════════════════════════════════════════════════════════
      tl.addLabel("acto1", "+=0.05")
        .to(".scene-act-1", { opacity: 1, duration: DUR.fast }, "acto1")
        .to(".module-card", { opacity: 1, y: 0, scale: 1, duration: DUR.fast, stagger: STAGGER.tight, ease: EASE.snap, force3D: true }, "acto1")
        .to([".toggle-knob-1", ".toggle-knob-2", ".toggle-knob-5"], { x: 16, duration: DUR.fast, stagger: STAGGER.tight, ease: EASE.snap }, "acto1+=0.3")
        .to([".toggle-bg-1", ".toggle-bg-2", ".toggle-bg-5"], { backgroundColor: "rgba(53,187,253,0.15)", borderColor: "rgba(53,187,253,0.5)", duration: DUR.fast, stagger: STAGGER.tight }, "acto1+=0.3")
        .to([".check-1", ".check-2", ".check-5"], { scale: 1, opacity: 1, duration: DUR.fast, stagger: STAGGER.tight, ease: EASE.snap }, "acto1+=0.4")
        .to([".module-1", ".module-2", ".module-5"], { scale: 1.04, borderColor: "rgba(53,187,253,0.4)", duration: DUR.fast, stagger: STAGGER.tight, ease: EASE.out }, "acto1+=0.4");

      // ════════════════════════════════════════════════════════════════════════
      // ── GIRO 3D FLIP COMPLETO: ACTO 1 ➔ ACTO 2 ──
      // ════════════════════════════════════════════════════════════════════════
      tl.addLabel("flip1_2", "+=2.4")
        .to(".glass-matrix", { rotateY: 90, scale: 0.93, duration: 0.4, ease: "power2.in", force3D: true }, "flip1_2")
        .set(".scene-act-1", { opacity: 0, pointerEvents: "none" }, "flip1_2+=0.4")
        .set(".scene-act-2", { opacity: 1, pointerEvents: "auto" }, "flip1_2+=0.4")
        .fromTo(".glass-matrix", 
          { rotateY: -90 }, 
          { rotateY: 0, scale: 1, duration: 0.5, ease: "power2.out", force3D: true }, 
          "flip1_2+=0.4"
        )
        .to(".act2-item", { opacity: 1, y: 0, scale: 1, duration: DUR.fast, stagger: STAGGER.tight, ease: EASE.out, force3D: true }, "flip1_2+=0.6");

      // ════════════════════════════════════════════════════════════════════════
      // ── GIRO 3D FLIP COMPLETO: ACTO 2 ➔ ACTO 3 ──
      // ════════════════════════════════════════════════════════════════════════
      tl.addLabel("flip2_3", "+=2.6")
        .to(".glass-matrix", { rotateY: 90, scale: 0.93, duration: 0.4, ease: "power2.in", force3D: true }, "flip2_3")
        .set(".scene-act-2", { opacity: 0, pointerEvents: "none" }, "flip2_3+=0.4")
        .set(".scene-act-3", { opacity: 1, pointerEvents: "auto" }, "flip2_3+=0.4")
        .fromTo(".glass-matrix", 
          { rotateY: -90 }, 
          { rotateY: 0, scale: 1, duration: 0.5, ease: "power2.out", force3D: true }, 
          "flip2_3+=0.4"
        )
        .to(".pulse-center-icon", { scale: 1, opacity: 1, duration: DUR.fast, ease: EASE.snap }, "flip2_3+=0.55");

      // ── CIERRE DEL CICLO & REINICIO (SOLO DE LA MATRIZ DE CRISTAL) ──
      tl.addLabel("end", "+=2.2")
        .to(".glass-matrix", { opacity: 0, y: -REVEAL.sm, scale: 0.96, duration: DUR.fast, ease: EASE.out }, "end");

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="delegate-users"
      className="w-full bg-[var(--color-surface-BG-base)] relative z-10 py-section-sm md:py-section-md overflow-hidden"
    >
      <div className="w-full max-w-section-lg mx-auto px-gutter-sm md:px-gutter-md">
        <div className="grid-layout items-center gap-y-8 md:gap-fluid-lg">
          
          {/* ── LADO IZQUIERDO: Copy Simple Permanente ── */}
          <div className="copy-column col-span-12 lg:col-span-6 flex flex-col justify-center relative z-20 text-left">
            <div className="delegate-eyebrow flex items-center gap-2 mb-space-static-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] animate-pulse" />
              <span className="text-overline text-[var(--color-brand-blue)]">
                {t('overline')}
              </span>
            </div>

            <h2 className="text-display-sm sm:text-display md:text-display-lg font-semibold text-[var(--color-text-primary)] leading-[1.1] tracking-tight mb-space-static-sm max-w-xl">
              <span className="block overflow-hidden pb-1">
                <span className="delegate-title-line block">{t('title1')}</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="delegate-title-line block text-[var(--color-text-accent-blue)]">{t('title2')}</span>
              </span>
            </h2>
            
            <p className="delegate-subtitle text-body-sm sm:text-body-md md:text-body-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[420px]">
              {t.rich('subtitle', {
                bold: (chunks) => <strong className="text-[var(--color-text-primary)] font-semibold">{chunks}</strong>
              })}
            </p>
          </div>

          {/* ── LADO DERECHO: Tarjeta 3D Completa con Giro 100% Fluido ── */}
          <div className="col-span-12 lg:col-span-6 relative flex justify-center items-center h-[420px] sm:h-[480px] lg:h-[600px] perspective-[1500px]">
            
            <div ref={sceneRef} className="relative w-full h-full flex justify-center items-center transform-style-3d">
              
              {/* MIDDLE LAYER: Glass Matrix Container (340px ancho, más alto para parecer teléfono) */}
              <div className="glass-scene-wrapper relative w-[320px] sm:w-[340px] h-[420px] sm:h-[460px]">
                
                <div className="glass-matrix w-full h-full bg-white/50 backdrop-blur-3xl border border-white/60 rounded-[32px] sm:rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] p-5 relative overflow-hidden will-change-transform">
                  
                  {/* ══════════════════════════════════════════════════════════
                      HARDWARE: MOBILE NOTCH (Persistente)
                     ══════════════════════════════════════════════════════════ */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none drop-shadow-md">
                    <svg width="130" height="24" viewBox="0 0 130 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0 H130 C130 0 126 0 122 0 C114 0 110 6 110 14 C110 19.5228 105.523 24 100 24 H30 C24.4772 24 20 19.5228 20 14 C20 6 16 0 8 0 C4 0 0 0 0 0 Z" fill="#171717"/>
                      <rect x="52" y="9" width="26" height="4" rx="2" fill="#0A0A0A" />
                      <circle cx="90" cy="11" r="4" fill="#050505" />
                      <circle cx="90" cy="11" r="1.5" fill="#14143a" />
                      <circle cx="90.5" cy="10.5" r="0.5" fill="#ffffff" opacity="0.4" />
                    </svg>
                  </div>

                  {/* ══════════════════════════════════════════════════════════
                      ACTO 1: Matriz de 6 Módulos (Rápido y Secuencial)
                     ══════════════════════════════════════════════════════════ */}
                  <div className="scene-act-1 absolute inset-0 p-5 pt-8 grid grid-cols-2 gap-3 content-center w-full h-full z-10 will-change-transform">
                    {modules.map((mod) => {
                      const Icon = mod.icon;
                      return (
                        <div 
                          key={mod.id} 
                          className={`module-card module-${mod.id} bg-white/90 rounded-2xl p-3 flex flex-col justify-between border border-white/50 h-[92px] relative overflow-hidden shadow-sm select-none`}
                        >
                          <div className={`check-icon check-${mod.id} absolute top-2 right-2 text-emerald-500`}>
                             <CheckCircle weight="fill" className="w-4 h-4" />
                          </div>
                          
                          <Icon weight="fill" className="w-5 h-5 text-[var(--color-brand-blue)]" />
                          <div className="flex flex-col justify-end gap-2.5">
                            <div className="text-[0.8125rem] font-semibold text-[var(--color-text-primary)] leading-none truncate tracking-tight">{t(mod.nameKey as any)}</div>
                            <div className={`toggle-bg toggle-bg-${mod.id} w-9 h-5 rounded-full border border-[var(--color-border-Strokes-default)] bg-[var(--color-surface-BG-3)] flex items-center px-0.5`}>
                              <div className={`toggle-knob toggle-knob-${mod.id} w-4 h-4 rounded-full bg-white shadow-sm`} />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Mobile Home Indicator (Bottom Mark) */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
                      <div className="w-24 h-[3px] rounded-full bg-black/15" />
                    </div>
                  </div>

                  {/* ══════════════════════════════════════════════════════════
                      ACTO 2: Perfil Asignado & Separación (Cara 2)
                     ══════════════════════════════════════════════════════════ */}
                  <div className="scene-act-2 absolute inset-0 p-5 flex flex-col justify-center gap-6 w-full h-full z-10 will-change-transform pt-8">
                    
                    {/* Tarjeta 1: Perfil del Asistente */}
                    <div className="act2-item bg-white/90 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between border border-white/50 shadow-sm h-[72px]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[var(--color-brand-blue)]/15 border border-[var(--color-brand-blue)]/30 flex items-center justify-center text-caption font-bold text-[var(--color-text-accent-blue)] shrink-0">
                          SR
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-body-sm font-semibold text-[var(--color-text-primary)] leading-none">{t('act1Name')}</span>
                          <span className="text-[0.6875rem] text-[var(--color-text-muted)] mt-1 truncate">{t('act1Email')}</span>
                        </div>
                      </div>
                      <span className="text-[0.5625rem] font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg uppercase">
                        {t('statusActive')}
                      </span>
                    </div>

                    {/* Grid de 2 Tarjetas: Autorizados vs Protegidos */}
                    <div className="grid grid-cols-2 gap-3 h-[210px]">
                      
                      {/* Tarjeta Autorizados */}
                      <div className="act2-item bg-white/90 rounded-2xl p-3.5 flex flex-col justify-between border border-white/50 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start">
                          <ShieldCheck weight="fill" className="w-5 h-5 text-[var(--color-brand-blue)]" />
                          <CheckCircle weight="fill" className="w-4 h-4 text-emerald-500" />
                        </div>
                        
                        <div className="flex flex-col gap-1.5 my-auto">
                          <span className="text-[0.625rem] font-mono text-emerald-600 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded w-fit">{t('modQuote')}</span>
                          <span className="text-[0.625rem] font-mono text-emerald-600 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded w-fit">{t('modCustomers')}</span>
                          <span className="text-[0.625rem] font-mono text-emerald-600 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded w-fit">{t('modDownline')}</span>
                        </div>

                        <div className="text-caption font-semibold text-[var(--color-text-primary)] leading-none">
                          {t('threeModules')}
                        </div>
                      </div>

                      {/* Tarjeta Protegidos */}
                      <div className="act2-item bg-white/90 rounded-2xl p-3.5 flex flex-col justify-between border border-white/50 shadow-sm relative overflow-hidden opacity-75">
                        <div className="flex justify-between items-start">
                          <LockKey weight="fill" className="w-5 h-5 text-rose-500" />
                          <span className="text-[0.5rem] font-mono text-rose-600 bg-rose-500/10 px-1.5 py-0.5 rounded font-bold">{t('off')}</span>
                        </div>
                        
                        <div className="flex flex-col gap-1.5 my-auto">
                          <span className="text-[0.625rem] font-mono text-rose-600 line-through bg-rose-50/50 px-2 py-0.5 rounded w-fit">{t('modCommissions')}</span>
                          <span className="text-[0.625rem] font-mono text-rose-600 line-through bg-rose-50/50 px-2 py-0.5 rounded w-fit">{t('modContracts')}</span>
                          <span className="text-[0.625rem] font-mono text-rose-600 line-through bg-rose-50/50 px-2 py-0.5 rounded w-fit">{t('modSettings')}</span>
                        </div>

                        <div className="text-caption font-semibold text-rose-600 leading-none">
                          {t('restricted')}
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* ══════════════════════════════════════════════════════════
                      ACTO 3: CIRCULAR PULSE WAVE (Cara 3)
                     ══════════════════════════════════════════════════════════ */}
                  <div className="scene-act-3 absolute inset-0 p-5 flex items-center justify-center text-center w-full h-full z-10 overflow-hidden will-change-transform">
                    
                    {/* Ondas Circulares de Pulso */}
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                      
                      {/* Onda 3 Expansiva (Grande) */}
                      <div className="absolute w-56 h-56 rounded-full border border-emerald-500/25 bg-emerald-500/[0.03] animate-[ping_3.2s_cubic-bezier(0,0,0.2,1)_infinite_1.6s] pointer-events-none" />
                      
                      {/* Onda 2 Expansiva (Media) */}
                      <div className="absolute w-40 h-40 rounded-full border border-[var(--color-brand-blue)]/35 bg-[var(--color-brand-blue)]/[0.04] animate-[ping_3.2s_cubic-bezier(0,0,0.2,1)_infinite_0.8s] pointer-events-none" />
                      
                      {/* Onda 1 Expansiva (Cercana) */}
                      <div className="absolute w-24 h-24 rounded-full border border-[var(--color-brand-blue)]/50 bg-[var(--color-brand-blue)]/[0.08] animate-[ping_3.2s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />

                      {/* Anillo Fijo de Cristal Hairline */}
                      <div className="absolute w-48 h-48 rounded-full border border-white/60 pointer-events-none" />
                      <div className="absolute w-32 h-32 rounded-full border border-[var(--color-brand-blue)]/20 pointer-events-none" />

                      {/* Icono Central Emisor del Pulso */}
                      <div className="pulse-center-icon relative z-20 w-16 h-16 rounded-3xl bg-white/95 border border-white shadow-[0_12px_32px_rgba(53,187,253,0.25)] flex items-center justify-center text-emerald-600">
                        <ShieldCheck weight="fill" className="w-9 h-9 text-[var(--color-brand-blue)]" />
                      </div>
                    </div>

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
