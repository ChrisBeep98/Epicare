"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  { id: 1, title: "Dashboard", desc: "Métricas en tiempo real" },
  { id: 2, title: "CRM", desc: "Gestión de clientes y pólizas" },
  { id: 3, title: "Cotizador", desc: "Multi-carrier instantáneo" },
  { id: 4, title: "Comisiones", desc: "Tracking y pagos detallados" },
];

export default function BackOfficeTourB() {
  const containerRef = useRef<HTMLElement>(null);
  const leftItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Calculate which index is active based on progress
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * PANELS.length),
            PANELS.length - 1
          );
          if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
            
            // Crossfade right side image
            gsap.fromTo(
              rightImageRef.current,
              { opacity: 0, scale: 0.98 },
              { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
            );
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] px-fluid-md py-section-md flex flex-col md:flex-row gap-fluid-lg"
    >
      <div className="absolute top-0 left-0 w-full px-fluid-md pt-static-md z-20 pointer-events-none text-center opacity-50">
        <h2 className="text-body-md font-bold uppercase tracking-widest">
          Concepto B: El Manifiesto Tipográfico
        </h2>
      </div>

      {/* Left List (Teleprompter) */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center gap-static-xl z-10">
        {PANELS.map((panel, i) => (
          <div
            key={panel.id}
            ref={(el) => {
              leftItemsRef.current[i] = el;
            }}
            className={`transition-all duration-500 transform ${
              activeIndex === i
                ? "opacity-100 translate-x-4 border-l-4 border-[var(--color-accent-main)] pl-static-md"
                : "opacity-30 translate-x-0 border-l-0 pl-0"
            }`}
          >
            <h3 className={`text-display-md font-bold transition-colors ${activeIndex === i ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"}`}>
              {panel.title}
            </h3>
            <p className={`text-body-lg mt-static-sm ${activeIndex === i ? "text-[var(--color-text-secondary)]" : "hidden"}`}>
              {panel.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Right Fixed Glass Container */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center perspective-[1000px]">
        <div 
          ref={rightImageRef}
          className="relative w-full aspect-[4/5] md:aspect-square rounded-[3rem] border border-[var(--color-border-Strokes-default)] shadow-[var(--shadow-shadow-glow-primary)] flex flex-col items-center justify-center p-static-lg"
        >
          {/* Glassmorphic Backdrop */}
          <div className="absolute inset-0 -z-10 rounded-[3rem]">
            <div className="absolute inset-0 bg-[var(--color-surface-Surface-2)]/60 backdrop-blur-[30px]" />
            <div className="absolute inset-0 bg-[var(--color-brand-orange)]/5 backdrop-blur-[20px] saturate-[2]" />
          </div>

          <h4 className="text-display-sm text-[var(--color-text-accent-blue)]">
            Screenshot del paso {activeIndex + 1}
          </h4>
          <p className="text-body-md text-[var(--color-text-muted)] mt-static-sm">
            {PANELS[activeIndex].title} View
          </p>
        </div>
      </div>
    </section>
  );
}
