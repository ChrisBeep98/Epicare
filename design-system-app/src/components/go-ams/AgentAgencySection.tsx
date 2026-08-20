"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/asset";
import { 
  User, 
  Buildings, 
  CheckCircle, 
  Sparkle
} from "@phosphor-icons/react";
import { EASE, DUR } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type RoleMode = "agent" | "agency";

interface FeaturePill {
  title: string;
  description: string;
  badge: string;
}

const COMPARISON_IMAGES = [
  {
    id: "policies",
    src: asset("/Files/Go_AMS/comparison Agent_Agency/Agent_Policies.png"),
    alt: "GO AMS - Pólizas de Agente"
  },
  {
    id: "details",
    src: asset("/Files/Go_AMS/comparison Agent_Agency/Customer_Details.png"),
    alt: "GO AMS - Detalle de Clientes"
  },
  {
    id: "quote",
    src: asset("/Files/Go_AMS/comparison Agent_Agency/quote and enroll.png"),
    alt: "GO AMS - Quote and Enroll"
  }
];

const AGENT_FEATURES: FeaturePill[] = [
  {
    title: "Pólizas de Agente",
    description: "Acceso total a tus pólizas activas, renovaciones y análisis de cartera.",
    badge: "Policies"
  },
  {
    title: "Detalle de Clientes",
    description: "Expediente 360° del asegurado, historial de pólizas y documentos.",
    badge: "Details"
  },
  {
    title: "Quote & Enroll",
    description: "Cotización multicarrier y enrolamiento instantáneo con tus carriers.",
    badge: "Quote & Enroll"
  }
];

const AGENCY_FEATURES: FeaturePill[] = [
  {
    title: "Pólizas de Downline",
    description: "Supervisión consolidada de producción, volumen y estado de compliance.",
    badge: "Policies"
  },
  {
    title: "Detalle de Agentes & Clientes",
    description: "Gestión de estructura, onboarding de productores y expedientes de agencia.",
    badge: "Details"
  },
  {
    title: "Quote & Contracts",
    description: "Resumen centralizado de appointments, acuerdos y cotización de grupo.",
    badge: "Contracts"
  }
];

/**
 * @description Helper para que el contenedor de imagen sangre hacia el borde derecho del viewport (BleedRight)
 */
function BleedRight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const update = () => {
      if (ref.current && window.innerWidth >= 1024) {
        const originalRight = ref.current.style.right;
        ref.current.style.right = "0px";
        const rect = ref.current.getBoundingClientRect();
        const dist = document.documentElement.clientWidth - rect.right;
        ref.current.style.right = originalRight;
        setOffset(dist > 0 ? dist : 0);
      } else {
        setOffset(0);
      }
    };
    
    update();
    window.addEventListener("load", update);
    window.addEventListener("resize", update);
    
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener("load", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ right: offset > 0 ? `-${offset}px` : "0px" }} 
      className={className}
    >
      {children}
    </div>
  );
}

/**
 * @description S07/S08 · Agente y Agencia (Audiencias y Vistas de Rol)
 * Conmutador interactivo de alta fidelidad, 12 columnas arquitectónicas,
 * showcase Bleed-Right al borde del body con timer visual minimalista.
 */
export default function AgentAgencySection() {
  const [activeRole, setActiveRole] = useState<RoleMode>("agent");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const interactivePanelRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".role-reveal-elem", { opacity: 1, y: 0 });
        return;
      }

      // Reveal inicial al entrar en viewport
      gsap.fromTo(
        ".role-reveal-elem",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: DUR.base,
          stagger: 0.08,
          ease: EASE.out,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Timer automático de transición de imágenes (4.5 segundos)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % COMPARISON_IMAGES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, activeSlide]);

  // Transición visual suave entre imágenes
  useEffect(() => {
    if (!imageContainerRef.current) return;
    const activeImg = imageContainerRef.current.querySelector(".active-screen-img");
    if (activeImg) {
      gsap.fromTo(
        activeImg,
        { opacity: 0, scale: 1.02, filter: "blur(4px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: EASE.out }
      );
    }
  }, [activeSlide]);

  const handleRoleSwitch = (newRole: RoleMode) => {
    if (newRole === activeRole) return;
    setActiveRole(newRole);

    // Micro-animación de transición al cambiar de pestaña
    if (interactivePanelRef.current) {
      gsap.fromTo(
        interactivePanelRef.current,
        { opacity: 0.3, y: 12, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: DUR.fast, ease: EASE.snap }
      );
    }
  };

  const isAgent = activeRole === "agent";

  return (
    <section
      ref={sectionRef}
      id="s07-agent-agency"
      className="w-full bg-[var(--color-surface-BG-base)] pt-0 pb-section-md px-gutter-sm lg:px-gutter-md relative z-10 overflow-x-hidden"
    >
      <div className="w-full max-w-section-xl mx-auto flex flex-col gap-fluid-xs">
        
        {/* ── 1. Cabecera Editorial & Selector de Rol (12 Columnas) ── */}
        <div className="grid-layout items-end gap-y-fluid-md">
          
          <div className="col-span-6 md:col-span-8 lg:col-span-7 flex flex-col gap-3">
            <div className="role-reveal-elem flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                isAgent ? "bg-[var(--color-brand-blue)]" : "bg-[var(--color-brand-orange)]"
              }`} />
              <span className="text-overline text-[var(--color-text-accent-dark)] dark:text-[var(--color-text-secondary)]">
                Vistas Adaptables por Rol · GO AMS
              </span>
            </div>

            <h2 className="role-reveal-elem text-display-lg text-[var(--color-text-primary)] leading-[1.08] tracking-tight">
              Si tienes agencia,<br />
              <span className={isAgent ? "text-[var(--color-text-accent-blue)]" : "text-[var(--color-accent-main)]"}>
                el portal cambia contigo.
              </span>
            </h2>

            <p className="role-reveal-elem text-body-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[620px]">
              Un botón permanente en la barra superior alterna entre tu cuenta de productor individual y tu vista de agencia. Dos espacios optimizados dentro de la misma plataforma.
            </p>
          </div>

          {/* Selector de Pestañas Interactivo */}
          <div className="role-reveal-elem col-span-6 md:col-span-8 lg:col-span-5 flex lg:justify-end">
            <div className="p-1.5 rounded-2xl bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] flex items-center gap-1.5 shadow-elevation-1 w-full sm:w-auto">
              
              {/* Botón Agente */}
              <button
                onClick={() => handleRoleSwitch("agent")}
                aria-pressed={isAgent}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-ui-label transition-all duration-300 cursor-pointer ${
                  isAgent
                    ? "bg-[var(--color-brand-blue)] text-white shadow-elevation-2 font-semibold"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-BG-2)]"
                }`}
              >
                <User weight={isAgent ? "fill" : "bold"} className="w-4 h-4" />
                <span>Cuenta de Agente</span>
              </button>

              {/* Botón Agencia */}
              <button
                onClick={() => handleRoleSwitch("agency")}
                aria-pressed={!isAgent}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-ui-label transition-all duration-300 cursor-pointer ${
                  !isAgent
                    ? "bg-[var(--color-brand-orange)] text-white shadow-elevation-2 font-semibold"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-BG-2)]"
                }`}
              >
                <Buildings weight={!isAgent ? "fill" : "bold"} className="w-4 h-4" />
                <span>Cuenta de Agencia</span>
              </button>

            </div>
          </div>

        </div>

        {/* ── 2. Panel Principal Dinámico Asimétrico (Sin fondo/sombra de tarjeta) ── */}
        <div
          ref={interactivePanelRef}
          className="w-full grid-layout gap-fluid-lg items-center relative"
        >
          
          {/* Columna Izquierda: Manifiesto de Rol & Capacidades (Cols 1-6) */}
          <div className="col-span-6 md:col-span-8 lg:col-span-6 flex flex-col justify-between gap-6 py-2">
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-meta font-mono ${
                  isAgent
                    ? "bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/20"
                    : "bg-[var(--color-brand-orange)]/10 text-[var(--color-accent-main)] border border-[var(--color-brand-orange)]/20"
                }`}>
                  <Sparkle weight="fill" className="w-3.5 h-3.5" />
                  <span>{isAgent ? "Modo: Producción Directa" : "Modo: Gestión de Downline"}</span>
                </span>
                <span className="text-meta text-[var(--color-text-muted)] font-mono">
                  {isAgent ? "13 Módulos + Quote" : "Estructura & Compliance"}
                </span>
              </div>

              <h3 className="text-display-sm text-[var(--color-text-primary)] leading-snug">
                {isAgent ? "Tu negocio personal, sin intermediarios." : "Supervisión total de tu equipo en tiempo real."}
              </h3>
            </div>

            {/* 3 Cards Interactivas con Timer Visual Integrado */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              {(isAgent ? AGENT_FEATURES : AGENCY_FEATURES).map((f, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`p-3.5 rounded-2xl text-left flex flex-col justify-between gap-3 transition-all duration-300 min-h-[165px] cursor-pointer relative overflow-hidden ${
                      isActive
                        ? isAgent
                          ? "bg-[var(--color-surface-BG-2)] border-2 border-[var(--color-brand-blue)] shadow-elevation-2"
                          : "bg-[var(--color-surface-BG-2)] border-2 border-[var(--color-brand-orange)] shadow-elevation-2"
                        : "bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] hover:border-[var(--color-border-Strokes-strong)] hover:bg-[var(--color-surface-BG-2)]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <CheckCircle
                        weight="fill"
                        className={`w-5 h-5 flex-shrink-0 transition-colors ${
                          isActive
                            ? isAgent ? "text-[var(--color-brand-blue)]" : "text-[var(--color-brand-orange)]"
                            : "text-[var(--color-text-muted)]"
                        }`}
                      />
                      <span className={`text-meta font-mono px-2 py-0.5 rounded transition-colors ${
                        isActive
                          ? isAgent
                            ? "bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/30"
                            : "bg-[var(--color-brand-orange)]/10 text-[var(--color-accent-main)] border border-[var(--color-brand-orange)]/30"
                          : "bg-[var(--color-surface-BG-base)] text-[var(--color-text-muted)] border border-[var(--color-border-Strokes-default)]"
                      }`}>
                        {f.badge}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h4 className={`text-h6 font-semibold leading-snug transition-colors ${
                        isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"
                      }`}>
                        {f.title}
                      </h4>
                      <p className="text-caption text-[var(--color-text-secondary)] leading-relaxed">
                        {f.description}
                      </p>
                    </div>

                    {/* Barra de Progreso Minimalista Integrada al Fondo de la Card */}
                    <div className="w-full h-[2px] rounded-full bg-[var(--color-border-Strokes-default)] overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full ${
                          isAgent ? "bg-[var(--color-brand-blue)]" : "bg-[var(--color-brand-orange)]"
                        }`}
                        style={{
                          width: isActive ? "100%" : "0%",
                          transition: isActive && !isPaused ? "width 4500ms linear" : "none"
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Columna Derecha: Imagen Bleed-Right 100% limpia (Cols 7-12) */}
          <div 
            className="col-span-6 md:col-span-8 lg:col-span-6 w-full h-[400px] sm:h-[480px] lg:h-full lg:min-h-[580px] xl:min-h-[640px] relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <BleedRight className="w-full h-full lg:w-auto lg:absolute lg:top-0 lg:bottom-0 lg:left-0 overflow-hidden">
              <div 
                ref={imageContainerRef}
                className={`relative w-full h-full rounded-2xl lg:rounded-r-none lg:rounded-l-3xl overflow-hidden bg-[var(--color-surface-BG-1)] border-y border-l border-r lg:border-r-0 transition-colors duration-500 shadow-elevation-2 flex items-center justify-center ${
                  isAgent ? "border-[var(--color-brand-blue)]/20" : "border-[var(--color-brand-orange)]/20"
                }`}
              >
                {/* Imágenes Bleed-Right a gran escala sin overlays */}
                {COMPARISON_IMAGES.map((img, idx) => {
                  const isActive = idx === activeSlide;
                  if (!isActive) return null;
                  return (
                    <div key={img.id} className="active-screen-img absolute inset-0 w-full h-full">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-left-top"
                      />
                    </div>
                  );
                })}
              </div>
            </BleedRight>
          </div>

        </div>

      </div>
    </section>
  );
}
