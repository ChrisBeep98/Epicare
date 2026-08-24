"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR } from "@/lib/motion";
import { RoleMode } from "./types";
import { COMPARISON_IMAGES, AGENT_FEATURES, AGENCY_FEATURES } from "./data";
import { AgentAgencyHeader } from "./AgentAgencyHeader";
import { AgentAgencyImageShowcase } from "./AgentAgencyImageShowcase";
import { AgentAgencyFeatureCards } from "./AgentAgencyFeatureCards";

gsap.registerPlugin(ScrollTrigger);

export interface AgentAgencySectionProps {
  id?: string;
  title?: React.ReactNode;
  description?: string;
  className?: string;
}

/**
 * @description S07/S08 · Agente y Agencia (Audiencias y Vistas de Rol)
 * Conmutador interactivo de alta fidelidad, 12 columnas arquitectónicas,
 * showcase Bleed-Left al borde del body con tabs a la izquierda y mini cards interactivas a la derecha.
 */
export function AgentAgencySection({
  id = "s07-agent-agency",
  title,
  description,
  className = "",
}: AgentAgencySectionProps) {
  const [activeRole, setActiveRole] = useState<RoleMode>("agent");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const interactivePanelRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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
            trigger: el,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, el);

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
  const currentFeatures = isAgent ? AGENT_FEATURES : AGENCY_FEATURES;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`w-full bg-[var(--color-surface-BG-base)] py-section-md px-gutter-sm lg:px-gutter-md relative z-10 overflow-x-hidden ${className}`}
    >
      <div className="w-full max-w-section-xl mx-auto flex flex-col gap-fluid-xs">
        {/* ── 1. Cabecera Editorial & Selector de Rol (12 Columnas) ── */}
        <AgentAgencyHeader
          activeRole={activeRole}
          onRoleChange={handleRoleSwitch}
          title={title}
          description={description}
        />

        {/* ── 2. Panel Principal Dinámico Asimétrico ── */}
        <div
          ref={interactivePanelRef}
          className="w-full grid-layout gap-fluid-lg items-center relative"
        >
          {/* Columna Izquierda: Imagen Bleed-Left (Cols 1-6) */}
          <AgentAgencyImageShowcase
            images={COMPARISON_IMAGES}
            activeSlide={activeSlide}
            imageContainerRef={imageContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          />

          {/* Columna Derecha: Manifiesto de Rol & Mini Cards (Cols 7-12) */}
          <AgentAgencyFeatureCards
            isAgent={isAgent}
            features={currentFeatures}
            activeSlide={activeSlide}
            isPaused={isPaused}
            onSelectSlide={setActiveSlide}
          />
        </div>
      </div>
    </section>
  );
}

export default AgentAgencySection;
