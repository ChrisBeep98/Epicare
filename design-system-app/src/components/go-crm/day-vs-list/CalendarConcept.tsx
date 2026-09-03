"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Phone, 
  EnvelopeSimple, 
  WarningCircle, 
  CalendarBlank,
  MagnifyingGlass,
  Plus,
  SquaresFour,
  Bell,
  Gear,
  Clock,
  CheckCircle,
  FileText,
  Sparkle,
  ShieldCheck,
  CalendarCheck
} from "@phosphor-icons/react";
import { asset } from "@/lib/asset";
import { EASE, DUR } from "@/lib/motion";

/**
 * @description Fondo unificado Glassmorphic con Aura Glow para todas las tarjetas.
 * Garantiza consistencia visual absoluta en las 3 columnas del tablero Kanban.
 */
function CardGlassBackground() {
  return (
    <div className="absolute inset-0 -z-10 rounded-2xl overflow-hidden pointer-events-none">
      <img 
        src={asset('/Files/Backgrounds/epicare_bg_aura_blue.jpg')} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-15 rounded-2xl pointer-events-none" 
      />
      <div className="absolute inset-0 bg-white/80 dark:bg-[#121518]/90 backdrop-blur-[24px] rounded-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent dark:from-white/[0.06] dark:to-transparent rounded-2xl pointer-events-none" />
    </div>
  );
}

/**
 * @description Componente visual Glassmorphic para la sección "Diferencia" de GO CRM.
 * - Mismo fondo Aura Glow unificado en todas las tarjetas de las 3 columnas.
 * - Pills de colores suaves y legibles sin mayúsculas.
 * - Blindaje estricto contra scrollbars fantasma (overflow-y-hidden, overflow-hidden por columna).
 * - Aislamiento GPU e integridad de border-radius sin flashes.
 */
export default function CalendarConcept() {
  const container = useRef<HTMLDivElement>(null);

  // Contadores animados
  const counterHoy = useRef<HTMLSpanElement>(null);
  const counterAtrasado = useRef<HTMLSpanElement>(null);
  const counterLimbo = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const masterCtx = gsap.context(() => {
      
      // 1. REVEAL CINEMÁTICO AL ENTRAR AL VIEWPORT
      gsap.fromTo(".crm-window", 
        { y: 40, opacity: 0, scale: 0.98 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: DUR.slow, 
          ease: EASE.out, 
          scrollTrigger: { 
            trigger: container.current, 
            start: "top 75%" 
          } 
        }
      );

      // 2. COREOGRAFÍA AUTOMÁTICA EN BUCLE
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, delay: 1.8 });
      
      // Altura de tarjeta (152px) + Gap vertical (16px) = 168px exactos
      const moveY = 168; 

      // ── ACTO 1: Resolver la tarea atrasada (Columna 2) ──
      tl.to(".col2-task1", { 
          borderColor: "rgba(34, 197, 94, 0.5)", 
          boxShadow: "0 0 25px rgba(34, 197, 94, 0.2)",
          scale: 1.01,
          y: -2,
          duration: 0.35,
          ease: EASE.snap
        })
        .to(".col2-task1-badge", { 
          backgroundColor: "rgba(34, 197, 94, 0.15)", 
          color: "#16a34a", 
          borderColor: "rgba(34, 197, 94, 0.3)",
          duration: 0.3 
        }, "<")
        .set(".col2-task1-badge-text", { innerHTML: "Resuelto" }, "<")
        .to(".col2-task1-title", { 
          textDecoration: "line-through", 
          opacity: 0.45, 
          duration: 0.3 
        }, "<")
        // Salida limpia hacia la derecha
        .to(".col2-task1", { 
          x: 45, 
          opacity: 0, 
          scale: 0.96,
          duration: 0.45, 
          ease: "power2.in" 
        }, "+=0.7")
        // Ascenso fluido de las tarjetas 2 y 3
        .to([".col2-task2", ".col2-task3"], { 
          y: -moveY, 
          duration: 0.65, 
          ease: EASE.out 
        }, "<0.1")
        // Bounce sutil en el contador numérico
        .fromTo(counterAtrasado.current, 
          { scale: 1.35, color: "var(--color-brand-orange)" }, 
          { scale: 1, color: "inherit", duration: 0.4, ease: "back.out(2)" }, 
          "<0.1"
        )
        .set(counterAtrasado.current, { innerHTML: "2" }, "<");

      // ── ACTO 2: Entra nueva tarea prioritaria en Vence Hoy (Columna 1) ──
      tl.to([".col1-task1", ".col1-task2", ".col1-task3"], { 
          y: moveY, 
          duration: 0.65, 
          ease: EASE.out 
        }, "+=0.6")
        .to(".col1-task3", { opacity: 0, duration: 0.4 }, "<")
        .fromTo(".col1-task-new", 
          { y: -25, opacity: 0, scale: 0.95 }, 
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 0.55, 
            ease: EASE.out,
            borderColor: "var(--color-brand-blue)",
            boxShadow: "0 0 25px rgba(53, 187, 253, 0.25)"
          }, 
          "<0.05"
        )
        .to(".col1-task-new", {
          borderColor: "rgba(0,0,0,0.1)",
          boxShadow: "none",
          duration: 0.8,
          ease: EASE.out
        }, "+=0.2")
        .fromTo(counterHoy.current, 
          { scale: 1.35, color: "var(--color-brand-blue)" }, 
          { scale: 1, color: "inherit", duration: 0.4, ease: "back.out(2)" }, 
          "<"
        )
        .set(counterHoy.current, { innerHTML: "4" }, "<");

      // ── ACTO 3: Lead sin agendar se programa (Columna 3) ──
      tl.to(".col3-task1", { 
          borderColor: "var(--color-brand-blue)", 
          borderStyle: "solid",
          boxShadow: "0 0 25px rgba(53, 187, 253, 0.2)",
          scale: 1.01,
          y: -2,
          duration: 0.35, 
          ease: EASE.snap 
        }, "+=0.8")
        .to(".col3-task1-badge", { 
          backgroundColor: "rgba(53, 187, 253, 0.15)", 
          color: "var(--color-brand-blue)", 
          borderColor: "rgba(53, 187, 253, 0.3)",
          duration: 0.3 
        }, "<")
        .set(".col3-task1-badge-text", { innerHTML: "Agendado" }, "<")
        // Salida hacia el pipeline activo
        .to(".col3-task1", { 
          x: -45, 
          opacity: 0, 
          scale: 0.96, 
          duration: 0.5, 
          ease: "power2.in" 
        }, "+=0.6")
        .to([".col3-task2", ".col3-task3"], { 
          y: -moveY, 
          duration: 0.65, 
          ease: EASE.out 
        }, "<0.1")
        .fromTo(counterLimbo.current, 
          { scale: 1.35, color: "var(--color-brand-blue)" }, 
          { scale: 1, color: "inherit", duration: 0.4, ease: "back.out(2)" }, 
          "<0.1"
        )
        .set(counterLimbo.current, { innerHTML: "2" }, "<");

      // ── ACTO 4: Sincronización continua y reinicio seguro (Sin glitches ni saltos de scroll) ──
      tl.to(".crm-columns-container", { opacity: 0.3, duration: 0.4, ease: EASE.inOut }, "+=1.8")
        .set([".col2-task1", ".col2-task2", ".col2-task3"], { x: 0, y: 0, opacity: 1, scale: 1, borderColor: "" })
        .set(".col2-task1-title", { textDecoration: "none", opacity: 1 })
        .set(".col2-task1-badge", { backgroundColor: "", color: "", borderColor: "" })
        .set(".col2-task1-badge-text", { innerHTML: "Urgente" })
        .set([".col1-task1", ".col1-task2", ".col1-task3"], { x: 0, y: 0, opacity: 1, scale: 1 })
        .set(".col1-task-new", { y: -25, opacity: 0, scale: 0.95, borderColor: "" })
        .set([".col3-task1", ".col3-task2", ".col3-task3"], { x: 0, y: 0, opacity: 1, scale: 1, borderColor: "" })
        .set(".col3-task1-badge", { backgroundColor: "", color: "", borderColor: "" })
        .set(".col3-task1-badge-text", { innerHTML: "Prospecto web" })
        .set(counterAtrasado.current, { innerHTML: "3" })
        .set(counterHoy.current, { innerHTML: "3" })
        .set(counterLimbo.current, { innerHTML: "3" })
        .to(".crm-columns-container", { opacity: 1, duration: 0.45, ease: EASE.out });

    }, container);

    return () => masterCtx.revert();
  }, []);

  return (
    <section 
      ref={container} 
      className="relative w-full bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] pt-28 pb-40 md:pt-36 md:pb-52 border-t border-[var(--color-border-Strokes-default)] overflow-hidden transition-colors duration-500"
    >
      {/* ── AMBIENT AURA GLOWS DE FONDO (Volumetric Blooms) ── */}
      <div className="absolute top-[8%] left-[15%] w-[45vw] aspect-square bg-[var(--color-brand-blue)]/10 dark:bg-[var(--color-brand-blue)]/[0.06] rounded-full blur-[140px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen transition-opacity" />
      <div className="absolute top-[25%] right-[15%] w-[35vw] aspect-square bg-[var(--color-brand-orange)]/10 dark:bg-[var(--color-brand-orange)]/[0.05] rounded-full blur-[130px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen transition-opacity" />

      {/* ── HEADER EDITORIAL (Zero Px Policy & 3 Familias) ── */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16 md:mb-20 relative z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--color-brand-blue)]/25 bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] mb-6 shadow-elevation-1">
          <CalendarBlank size={14} weight="bold" />
          <span className="font-mono text-meta font-bold tracking-[0.15em] uppercase">
            La Diferencia
          </span>
        </div>

        <h2 className="text-display md:text-display-xl font-semibold tracking-tight leading-[1.08] mb-6 text-[var(--color-text-primary)]">
          La mayoría te da una lista.<br />
          <span className="text-[var(--color-brand-blue)]">GO CRM te arma el día.</span>
        </h2>

        <p className="text-subtitle md:text-body-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto font-normal">
          Cualquier sistema te muestra a quién tienes. Nosotros organizamos a quién llamar primero. Entras y tu día ya está resuelto y en movimiento.
        </p>
      </div>

      {/* ── UI WINDOW: GLASSMORPHIC ARCHITECTURE (Skill) ── */}
      <div className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Contenedor Principal Glassmorphic con Aislamiento GPU y Overflow Estricto */}
        <div className="crm-window relative w-full rounded-3xl border border-black/10 dark:border-white/10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_35px_100px_-20px_rgba(0,0,0,0.6)] flex flex-col md:flex-row overflow-hidden isolate transform-gpu">
          
          {/* Capa estática de fondo para la ventana */}
          <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-white/80 dark:bg-[#0C0E10]/90 backdrop-blur-[30px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/[0.04] dark:to-transparent" />
          </div>

          {/* ── SIDEBAR MINIMALISTA ── */}
          <div className="hidden md:flex w-20 bg-black/[0.02] dark:bg-white/[0.02] border-r border-black/[0.06] dark:border-white/[0.08] flex-col items-center py-8 gap-7 shrink-0 relative">
            {/* Isotipo con glow azul */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0297E3] to-[#35BBFD] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(53,187,253,0.45)]">
              G
            </div>

            {/* Iconos de navegación sobrios */}
            <div className="flex flex-col gap-5 text-[var(--color-text-muted)]">
              <button className="w-10 h-10 rounded-xl bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10 text-[var(--color-brand-blue)] flex items-center justify-center transition-transform hover:scale-105">
                <SquaresFour size={20} weight="fill" />
              </button>
              <button className="w-10 h-10 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center transition-colors">
                <CalendarBlank size={20} />
              </button>
              <button className="w-10 h-10 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center relative transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--color-brand-orange)] rounded-full border border-white dark:border-[#0E1113]" />
              </button>
            </div>

            <div className="mt-auto text-[var(--color-text-muted)] w-10 h-10 flex items-center justify-center hover:text-[var(--color-text-primary)] transition-colors">
              <Gear size={20} />
            </div>
          </div>

          {/* ── CONTENIDO DEL TABLERO ── */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            
            {/* Header de la Aplicación */}
            <div className="h-20 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between px-6 md:px-10 bg-black/[0.01] dark:bg-white/[0.01]">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <h3 className="font-display font-semibold text-h5 md:text-h4 text-[var(--color-text-primary)] tracking-tight">
                  Planificador Diario
                </h3>

                <div className="h-6 w-px bg-black/10 dark:bg-white/10 hidden sm:block" />

                <div className="inline-flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] shadow-[0_0_8px_rgba(53,187,253,0.8)] animate-pulse" />
                  <span className="font-display font-semibold text-h5 md:text-h4 text-[var(--color-text-primary)] tracking-tight">
                    14 Febrero 2026
                  </span>
                </div>
              </div>

              {/* Controles de Búsqueda y Acción */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] rounded-full px-4 py-2 gap-2.5 text-[var(--color-text-muted)] w-56 lg:w-64 text-body-sm">
                  <MagnifyingGlass size={15} />
                  <span className="text-[12.5px] truncate">Buscar póliza o lead...</span>
                </div>
                <button className="h-9 px-4 rounded-full bg-[var(--color-brand-blue)] hover:bg-[#0297E3] text-white font-medium text-ui-label tracking-wide flex items-center gap-1.5 shadow-[0_4px_14px_rgba(53,187,253,0.35)] transition-all hover:scale-105 active:scale-95">
                  <Plus size={16} weight="bold" />
                  <span className="hidden sm:inline">Nueva Tarea</span>
                </button>
              </div>
            </div>

            {/* Tablero Kanban de 3 Columnas (Blindaje con overflow-y-hidden y scrollbar oculta) */}
            <div className="crm-columns-container flex-1 p-6 md:p-10 bg-black/[0.015] dark:bg-black/20 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-6 md:gap-8 min-w-[980px] lg:min-w-0 justify-center">
                
                {/* ══════════════════════════════════════════════════════════════ */}
                {/* ── COLUMNA 1: VENCE HOY (Brand Blue) ── */}
                {/* ══════════════════════════════════════════════════════════════ */}
                <div className="w-[340px] flex flex-col gap-4">
                  {/* Column Header */}
                  <div className="flex items-center justify-between px-1 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-blue)] shadow-[0_0_10px_rgba(53,187,253,0.8)]" />
                      <h4 className="font-display text-ui-label font-semibold tracking-wider uppercase text-[var(--color-text-primary)]">
                        Vence Hoy
                      </h4>
                    </div>
                    <span 
                      ref={counterHoy} 
                      className="font-mono text-meta font-bold bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] border border-[var(--color-brand-blue)]/25 px-2.5 py-0.5 rounded-full"
                    >
                      3
                    </span>
                  </div>

                  {/* Task Stack Container (overflow-hidden estricto para impedir scrollbars fantasma) */}
                  <div className="relative h-[504px] w-full overflow-hidden rounded-2xl">
                    
                    {/* TARJETA NUEVA (Drop-in animado) */}
                    <div className="col1-task-new opacity-0 absolute top-0 left-0 right-0 h-[152px] rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden isolate transform-gpu z-30">
                      <CardGlassBackground />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--color-brand-blue)]/15 text-[var(--color-brand-blue)] border border-[var(--color-brand-blue)]/25 font-medium">
                            <Sparkle size={12} weight="fill" /> Alta prioridad
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)] flex items-center gap-1">
                            <Clock size={12} /> 11:30 AM
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-[15px] text-[var(--color-text-primary)] leading-snug">
                            Reunión de Cierre
                          </h5>
                          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                            Vida Universal • Prima $6,200/yr
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[12px]">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            Grupo Empresarial
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] border border-[var(--color-brand-blue)]/20 font-mono text-[10.5px] font-medium">
                            Nuevo
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TARJETA 1 */}
                    <div className="col1-task1 absolute top-0 left-0 right-0 h-[152px] rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden isolate transform-gpu z-20">
                      <CardGlassBackground />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--color-brand-blue)]/12 text-[var(--color-brand-blue)] border border-[var(--color-brand-blue)]/20 font-medium">
                            <Phone size={12} weight="fill" /> Llamada
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)] flex items-center gap-1">
                            <Clock size={12} /> 10:00 AM
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-[15px] text-[var(--color-text-primary)] leading-snug">
                            Renovación Póliza Auto
                          </h5>
                          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                            Cobertura Amplia • Co-pago $250
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[12px]">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            Juan Pérez
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)]">
                            Póliza #4821
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TARJETA 2 */}
                    <div className="col1-task2 absolute top-[168px] left-0 right-0 h-[152px] rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden isolate transform-gpu z-10">
                      <CardGlassBackground />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/12 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-medium">
                            <EnvelopeSimple size={12} weight="fill" /> Cotización
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)] flex items-center gap-1">
                            <Clock size={12} /> 14:30 PM
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-[15px] text-[var(--color-text-primary)] leading-snug">
                            Seguro de Vida Individual
                          </h5>
                          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                            Término 30 Años • $450k Capital
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[12px]">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            Ana Torres
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)]">
                            Prospecto
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TARJETA 3 */}
                    <div className="col1-task3 absolute top-[336px] left-0 right-0 h-[152px] rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden isolate transform-gpu z-10">
                      <CardGlassBackground />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/12 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-medium">
                            <CalendarCheck size={12} weight="fill" /> Revisión anual
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)] flex items-center gap-1">
                            <Clock size={12} /> 16:00 PM
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-[15px] text-[var(--color-text-primary)] leading-snug">
                            Ajuste de Primas Colectivas
                          </h5>
                          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                            Salud Colectiva • 14 Titulares
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[12px]">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            Equipo Comercial
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)]">
                            Interno
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ══════════════════════════════════════════════════════════════ */}
                {/* ── COLUMNA 2: ATRASADO (Brand Orange) ── */}
                {/* ══════════════════════════════════════════════════════════════ */}
                <div className="w-[340px] flex flex-col gap-4">
                  {/* Column Header */}
                  <div className="flex items-center justify-between px-1 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-orange)] shadow-[0_0_10px_rgba(242,96,35,0.8)]" />
                      <h4 className="font-display text-ui-label font-semibold tracking-wider uppercase text-[var(--color-text-primary)]">
                        Atrasado
                      </h4>
                    </div>
                    <span 
                      ref={counterAtrasado} 
                      className="font-mono text-meta font-bold bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] border border-[var(--color-brand-orange)]/25 px-2.5 py-0.5 rounded-full"
                    >
                      3
                    </span>
                  </div>

                  <div className="relative h-[504px] w-full overflow-hidden rounded-2xl">
                    
                    {/* TARJETA 1: Se resuelve animadamente */}
                    <div className="col2-task1 absolute top-0 left-0 right-0 h-[152px] rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden isolate transform-gpu z-20">
                      <CardGlassBackground />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="col2-task1-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--color-brand-orange)]/15 text-[var(--color-brand-orange)] border border-[var(--color-brand-orange)]/25 font-medium transition-colors">
                            <WarningCircle size={12} weight="bold" />
                            <span className="col2-task1-badge-text">Urgente</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20 font-mono text-[10.5px] font-medium">
                            Ayer
                          </span>
                        </div>

                        <div>
                          <h5 className="col2-task1-title font-display font-semibold text-[15px] text-[var(--color-text-primary)] leading-snug transition-all">
                            Firmar Endoso Salud
                          </h5>
                          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                            Salud Élite • Requiere Firma Digital
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[12px]">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            Carlos Morales
                          </span>
                          <span className="col2-task1-status font-mono text-meta text-[var(--color-brand-orange)] font-medium">
                            <span className="col2-task1-status-text">Pendiente</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TARJETA 2 */}
                    <div className="col2-task2 absolute top-[168px] left-0 right-0 h-[152px] rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden isolate transform-gpu z-10">
                      <CardGlassBackground />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/12 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
                            <FileText size={12} weight="fill" /> Documento
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)]">
                            Hace 2 días
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-[15px] text-[var(--color-text-primary)] leading-snug">
                            Recibir DNI Actualizado
                          </h5>
                          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                            Validación KYC • Póliza #8492
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[12px]">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            María López
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)]">
                            En espera
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TARJETA 3 */}
                    <div className="col2-task3 absolute top-[336px] left-0 right-0 h-[152px] rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden isolate transform-gpu z-10">
                      <CardGlassBackground />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/12 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-medium">
                            <Phone size={12} weight="fill" /> Seguimiento
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)]">
                            Hace 3 días
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-[15px] text-[var(--color-text-primary)] leading-snug">
                            Confirmar Pago de Prima
                          </h5>
                          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                            Cuota Mensual • $890.00
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[12px]">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            Roberto Fernández
                          </span>
                          <span className="font-mono text-meta text-[var(--color-brand-orange)] font-medium">
                            Cobro
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ══════════════════════════════════════════════════════════════ */}
                {/* ── COLUMNA 3: SIN AGENDAR (Mismo Fondo Unificado) ── */}
                {/* ══════════════════════════════════════════════════════════════ */}
                <div className="w-[340px] flex flex-col gap-4">
                  {/* Column Header */}
                  <div className="flex items-center justify-between px-1 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-text-muted)]/50" />
                      <h4 className="font-display text-ui-label font-semibold tracking-wider uppercase text-[var(--color-text-muted)]">
                        Sin Siguiente Paso
                      </h4>
                    </div>
                    <span 
                      ref={counterLimbo} 
                      className="font-mono text-meta font-bold bg-black/[0.04] dark:bg-white/[0.06] text-[var(--color-text-muted)] border border-black/10 dark:border-white/10 px-2.5 py-0.5 rounded-full"
                    >
                      3
                    </span>
                  </div>

                  <div className="relative h-[504px] w-full overflow-hidden rounded-2xl">
                    
                    {/* TARJETA 1: Pasa a agendada */}
                    <div className="col3-task1 absolute top-0 left-0 right-0 h-[152px] rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden isolate transform-gpu z-20 transition-all">
                      <CardGlassBackground />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="col3-task1-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/12 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-medium transition-colors">
                            <span className="col3-task1-badge-text">Prospecto web</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 font-mono text-[10.5px] text-[var(--color-text-muted)] font-medium">
                            Sin agendar
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-[15px] text-[var(--color-text-primary)] leading-snug">
                            Seguro Hogar Premium
                          </h5>
                          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                            Cotización ingresada sin seguimiento
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[12px]">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            Laura González
                          </span>
                          <span className="font-mono text-meta text-[var(--color-brand-orange)] font-medium">
                            Acción requerida
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TARJETA 2 */}
                    <div className="col3-task2 absolute top-[168px] left-0 right-0 h-[152px] rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden isolate transform-gpu z-10">
                      <CardGlassBackground />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/12 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-medium">
                            Lead web
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 font-mono text-[10.5px] text-[var(--color-text-muted)] font-medium">
                            Sin agendar
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-[15px] text-[var(--color-text-primary)] leading-snug">
                            Cotización Flotas
                          </h5>
                          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                            Comercial • 18 Vehículos
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[12px]">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            Transportes Andina
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)]">
                            En espera
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TARJETA 3 */}
                    <div className="col3-task3 absolute top-[336px] left-0 right-0 h-[152px] rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden isolate transform-gpu z-10">
                      <CardGlassBackground />

                      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/12 text-violet-600 dark:text-violet-400 border border-violet-500/20 font-medium">
                            Referido
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 font-mono text-[10.5px] text-[var(--color-text-muted)] font-medium">
                            Sin agendar
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-[15px] text-[var(--color-text-primary)] leading-snug">
                            Seguro Médico Privado
                          </h5>
                          <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                            Recomendado por Dr. Silva
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[12px]">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            Familia Silva M.
                          </span>
                          <span className="font-mono text-meta text-[var(--color-text-muted)]">
                            Por asignar
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Footer de la Ventana / Status Bar */}
            <div className="h-14 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between px-6 md:px-10 text-meta font-mono text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)] font-medium">
                <CheckCircle size={15} weight="fill" className="text-[var(--color-brand-blue)]" />
                <span>Flujo diario organizado sin prospectos perdidos</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[var(--color-brand-blue)]" />
                  Reglas 100% automáticas
                </span>
                <span className="opacity-40">•</span>
                <span>Motor Epicare CRM</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
