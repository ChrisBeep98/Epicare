"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  { id: 1, title: "Dashboard", desc: "Métricas en tiempo real" },
  { id: 2, title: "CRM", desc: "Gestión de clientes y pólizas" },
  { id: 3, title: "Cotizador", desc: "Multi-carrier instantáneo" },
  { id: 4, title: "Comisiones", desc: "Tracking y pagos detallados" },
];

export default function BackOfficeTourA() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
        },
      });

      // Z-Stacking logic
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        // Initial state: Cards are pushed deep in Z-space and invisible, except the first one
        gsap.set(card, {
          z: i * -1500,
          scale: i === 0 ? 1 : 0.5,
          opacity: i === 0 ? 1 : 0,
        });

        // The timeline moves all cards forward on the Z axis
        tl.to(
          card,
          {
            z: 1500, // Move past the camera
            scale: 2,
            opacity: 0,
            ease: "none",
            duration: 1,
          },
          i * 0.4 // Staggered start times
        );

        // Bring the next card into focus smoothly
        if (i < cardsRef.current.length - 1) {
          tl.to(
            cardsRef.current[i + 1],
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              duration: 0.6,
            },
            i * 0.4 + 0.2
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] overflow-hidden flex items-center justify-center perspective-[1000px]"
    >
      <div className="absolute top-0 left-0 w-full px-fluid-md pt-section-md z-20 pointer-events-none text-center">
        <h2 className="text-display-lg font-bold tracking-tight">
          Concepto A: El Ascensor Óptico
        </h2>
        <p className="text-body-lg text-[var(--color-text-secondary)]">Viaje en profundidad Z-Stacking</p>
      </div>

      <div className="relative w-[80vw] max-w-4xl aspect-video transform-style-preserve-3d flex items-center justify-center">
        {PANELS.map((panel, i) => (
          <div
            key={panel.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="absolute inset-0 bg-[var(--color-surface-Surface-1)] border border-[var(--color-border-Strokes-default)] rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-static-md will-change-transform"
          >
            {/* Glassmorphic Backdrop */}
            <div className="absolute inset-0 -z-10 rounded-3xl">
              <div className="absolute inset-0 bg-[var(--color-surface-Surface-2)]/40 backdrop-blur-[24px]" />
              <div className="absolute inset-0 bg-[var(--color-brand-blue)]/5 backdrop-blur-[20px] saturate-[1.5]" />
            </div>
            
            <h3 className="text-display-md font-bold text-[var(--color-text-primary)]">{panel.title}</h3>
            <p className="text-body-lg text-[var(--color-text-secondary)]">{panel.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
