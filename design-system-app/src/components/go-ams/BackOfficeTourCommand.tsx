"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  { id: 1, title: "DASHBOARD", desc: "Telemetría en tiempo real." },
  { id: 2, title: "CRM", desc: "Gestión de clientes activa." },
  { id: 3, title: "COTIZADOR", desc: "Conexión multi-carrier." },
  { id: 4, title: "COMISIONES", desc: "Flujo de pagos auditado." },
  { id: 5, title: "MARKETING", desc: "Campañas automáticas." },
  { id: 6, title: "SOPORTE", desc: "Línea prioritaria." },
  { id: 7, title: "REPORTES", desc: "Análisis de datos." },
  { id: 8, title: "AGENTES", desc: "Jerarquías de red." },
  { id: 9, title: "SISTEMA", desc: "Configuración raíz." },
];

export default function BackOfficeTourCommand() {
  const containerRef = useRef<HTMLElement>(null);
  const screensRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.5,
        },
      });

      screensRef.current.forEach((screen, i) => {
        if (!screen) return;
        tl.to(
          screen,
          {
            opacity: 1,
            scale: 1,
            boxShadow: "0 0 40px rgba(53,187,253,0.3)", // var(--color-brand-blue) glow
            borderColor: "rgba(53,187,253,0.6)",
            duration: 0.5,
          },
          i * 0.3
        ).to(
          screen,
          {
            opacity: 0.4,
            boxShadow: "none",
            borderColor: "rgba(255,255,255,0.1)",
            duration: 0.5,
          },
          i * 0.3 + 0.8 // Se vuelve a apagar un poco después
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-fluid-md overflow-hidden">
      <div className="text-center mb-static-2xl">
        <h2 className="text-display-lg font-bold">Centro de Comando.</h2>
        <p className="text-[var(--color-text-secondary)] mt-static-sm">Todo el sistema operando a simple vista.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-static-md w-full max-w-6xl aspect-[16/7]">
        {PANELS.map((panel, i) => (
          <div
            key={panel.id}
            ref={(el) => {
              screensRef.current[i] = el;
            }}
            className="relative rounded-xl border border-white/10 bg-white/5 flex flex-col p-static-md opacity-20 scale-95 transition-transform"
            style={{ willChange: "transform, opacity, box-shadow" }}
          >
            <div className="flex items-center gap-2 mb-auto">
              <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] animate-pulse" />
              <span className="text-xs font-mono text-[var(--color-text-muted)]">SYS.{panel.id}</span>
            </div>
            
            <h3 className="text-body-lg font-bold tracking-widest uppercase">{panel.title}</h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{panel.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
