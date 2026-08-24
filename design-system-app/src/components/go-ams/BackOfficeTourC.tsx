"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  { id: 1, title: "Dashboard", desc: "Métricas en tiempo real" },
  { id: 2, title: "CRM", desc: "Gestión de clientes y pólizas" },
  { id: 3, title: "Cotizador", desc: "Multi-carrier instantáneo" },
  { id: 4, title: "Comisiones", desc: "Tracking y pagos detallados" },
  { id: 5, title: "Marketing", desc: "Campañas y automatización" },
  { id: 6, title: "Soporte", desc: "Tickets y atención prioritaria" },
];

export default function BackOfficeTourC() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (!trackRef.current) return;

      const getScrollAmount = () => {
        const trackHeight = trackRef.current?.scrollHeight || 0;
        return -(trackHeight - window.innerHeight);
      };

      gsap.to(trackRef.current, {
        y: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            cardsRef.current.forEach((card) => { if (card) card.style.willChange = "transform, opacity"; });
          },
          onLeave: () => {
            cardsRef.current.forEach((card) => { if (card) card.style.willChange = "auto"; });
          },
          onEnterBack: () => {
            cardsRef.current.forEach((card) => { if (card) card.style.willChange = "transform, opacity"; });
          },
          onLeaveBack: () => {
            cardsRef.current.forEach((card) => { if (card) card.style.willChange = "auto"; });
          },
          onUpdate: () => {
            const windowCenter = window.innerHeight / 2;
            
            cardsRef.current.forEach((card) => {
              if (!card) return;
              const rect = card.getBoundingClientRect();
              const cardCenter = rect.top + rect.height / 2;
              
              // Normalize distance from the vertical center
              const dist = (cardCenter - windowCenter) / windowCenter;
              
              // Slot machine curve (Vertical rotation)
              const zOffset = -Math.pow(Math.abs(dist), 2) * 500; 
              const rotationX = dist * -45; // Bend away at top and bottom
              const opacity = 1 - Math.abs(dist) * 0.8;

              gsap.set(card, {
                z: zOffset,
                rotationX: rotationX,
                opacity: opacity,
                transformOrigin: "center center",
              });
            });
          },
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] flex overflow-hidden perspective-[1500px]"
    >
      <div className="absolute top-0 left-0 w-full px-fluid-md pt-static-md z-20 pointer-events-none text-center opacity-50">
        <h2 className="text-body-md font-bold uppercase tracking-widest">
          Concepto C: La Rueda Cilíndrica Vertical
        </h2>
      </div>

      {/* Left Static Side */}
      <div className="hidden md:flex w-1/3 h-full flex-col justify-center px-fluid-md z-10 bg-gradient-to-r from-[var(--color-surface-BG-base)] to-transparent">
        <h2 className="text-display-md font-bold">Slot Machine</h2>
        <p className="text-body-lg text-[var(--color-text-secondary)] mt-static-sm">
          Desplaza la rueda para revelar el ecosistema completo apilado verticalmente en el lado derecho.
        </p>
      </div>

      {/* Right Scrolling Drum */}
      <div className="w-full md:w-2/3 h-full relative perspective-[1500px] flex items-center justify-center transform-style-preserve-3d">
        <div ref={trackRef} className="flex flex-col gap-fluid-lg w-full max-w-xl mx-auto py-[100vh]">
          {PANELS.map((panel, i) => (
            <div
              key={panel.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="relative w-full aspect-[16/10] bg-[var(--color-surface-Surface-1)] border border-[var(--color-border-Strokes-default)] rounded-3xl p-static-lg flex flex-col justify-end shadow-2xl"
            >
               {/* Glassmorphic Backdrop */}
              <div className="absolute inset-0 -z-10 rounded-3xl">
                <div className="absolute inset-0 bg-[var(--color-surface-Surface-2)]/60 backdrop-blur-[24px]" />
              </div>
              <h3 className="text-h3 font-bold">{panel.title}</h3>
              <p className="text-body-md text-[var(--color-text-secondary)]">{panel.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
