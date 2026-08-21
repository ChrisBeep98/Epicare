"use client";

import React, { useRef, useLayoutEffect } from "react";
import { DeviceMobile, Link, Mouse, QrCode, ArrowUpRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Import para Next Image
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: "01",
    title: "Smart Flow",
    desc: "Ingresa el teléfono. Epicare autocompleta el resto con nuestra base nacional.",
    icon: <DeviceMobile weight="duotone" className="w-8 h-8 text-[var(--color-text-primary)]" />
  },
  {
    id: "02",
    title: "Send Link",
    desc: "Envía un SMS. El cliente completa sus datos desde su celular sin presión.",
    icon: <Link weight="duotone" className="w-8 h-8 text-[var(--color-text-primary)]" />
  },
  {
    id: "03",
    title: "Data Entry",
    desc: "Control total. Llena cada campo manualmente mientras lideras la llamada.",
    icon: <Mouse weight="duotone" className="w-8 h-8 text-[var(--color-text-primary)]" />
  },
  {
    id: "04",
    title: "In-Person QR",
    desc: "Muestra un QR en tu tablet. Ideal para eventos o agencias físicas.",
    icon: <QrCode weight="duotone" className="w-8 h-8 text-[var(--color-text-primary)]" />
  }
];

export default function QuoteEnroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Monumental para el Título (Curtain effect + y)
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.querySelectorAll(".reveal-text"),
          { y: 60, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // 2. Subtle Reveal para las tarjetas (Faster and smoother)
      gsap.fromTo(cardsRef.current,
        { 
          y: 40, 
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full pt-0 pb-section-md overflow-hidden z-10"
    >
      {/* LAYER 0: IMMERSIVE BACKGROUND (Aura Glow Background) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/go-ams/quote-enroll-aura.jpg"
          alt="Aura Glow Background"
          fill
          className="object-cover opacity-60"
          quality={90}
        />
        {/* Overlay required by Aura Glow SKILL for text legibility in Dark Mode */}
        <div className="absolute inset-0 bg-[var(--color-surface-BG-base)]/80 backdrop-blur-[2px]" />
      </div>

      {/* LAYER 1: TEXT CONTENT & GLASS CARD WRAPPER */}
      <div className="relative z-20 mx-auto w-full px-gutter-md" style={{ maxWidth: 'var(--max-w-section-xl)' }}>
        
        {/* Título Monumental & Compacto (Strictly Tokenized) */}
        <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-end mb-static-xl gap-fluid-md">
          <h2 className="text-display-lg font-semibold text-[var(--color-text-primary)] tracking-tight leading-[1.05] max-w-2xl">
            <span className="block reveal-text pb-2">
              Cuatro formas de <span className="text-[var(--color-text-accent-blue)]">cerrar una venta.</span>
            </span>
          </h2>
          <p className="text-body-lg text-[var(--color-text-secondary)] max-w-sm reveal-text pb-2">
            Diseñado para la agencia moderna. Escoge el flujo perfecto para cada cliente y recupera tu tiempo.
          </p>
        </div>

        {/* GLASSMORPHIC GRID COMPACTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-static-sm)]">
          {FEATURES.map((feature, idx) => (
            <div 
              key={feature.id}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="group relative z-10 flex flex-col justify-between p-static-lg min-h-[320px] rounded-[2rem] border border-[var(--color-border-Strokes-strong)]/20 shadow-elevation-3 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
            >
              {/* STATIC BACKGROUND LAYER (Glassmorphic Skill: Separate from content for blur performance) */}
              <div className="absolute inset-0 -z-10 rounded-[2rem]">
                <div className="absolute inset-0 bg-[var(--color-surface-BG-1)]/30 backdrop-blur-[24px]" />
                <div className="absolute inset-0 bg-[var(--color-surface-BG-2)]/10 backdrop-blur-[20px] saturate-[1.5]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-BG-3)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* CONTENT LAYER */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-static-lg">
                    <div className="p-static-sm bg-[var(--color-surface-BG-3)]/50 rounded-2xl border border-[var(--color-border-Strokes-base)]/30 shadow-elevation-1">
                      {feature.icon}
                    </div>
                    <span className="text-h3 text-[var(--color-text-muted)] opacity-30 font-medium">
                      {feature.id}
                    </span>
                  </div>
                  
                  <h3 className="text-h4 text-[var(--color-text-primary)] mb-static-sm">
                    {feature.title}
                  </h3>
                  <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Interaction Element */}
                <div className="flex w-full justify-end mt-static-md">
                  <ArrowUpRight 
                    weight="regular" 
                    className="text-[var(--color-text-primary)] w-6 h-6 opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-text-accent-blue)]" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
