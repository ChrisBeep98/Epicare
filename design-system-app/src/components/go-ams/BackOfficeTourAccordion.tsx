"use client";

import { useState } from "react";

const PANELS = [
  { id: 1, title: "DASHBOARD", desc: "Métricas en tiempo real." },
  { id: 2, title: "CRM", desc: "Gestión de clientes y pólizas." },
  { id: 3, title: "COTIZADOR", desc: "Multi-carrier instantáneo." },
  { id: 4, title: "COMISIONES", desc: "Tracking y pagos." },
  { id: 5, title: "MARKETING", desc: "Campañas automáticas." },
];

export default function BackOfficeTourAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section className="relative w-full min-h-[90vh] bg-[var(--color-surface-BG-base)] flex flex-col justify-center px-fluid-md py-section-md">
      <div className="mb-static-xl">
        <h2 className="text-display-md font-bold">La Salida Estándar (Accordion)</h2>
        <p className="text-[var(--color-text-secondary)] mt-static-xs">Elegante, sin scroll-hijacking, 100% nativo CSS.</p>
      </div>

      <div className="flex w-full h-[60vh] gap-2 md:gap-4 overflow-hidden rounded-3xl group">
        {PANELS.map((panel, i) => {
          const isActive = hoveredIndex === i;
          
          return (
            <div
              key={panel.id}
              onMouseEnter={() => setHoveredIndex(i)}
              className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden border border-[var(--color-border-Strokes-default)] rounded-2xl flex flex-col justify-end p-static-md
                ${isActive ? "flex-[5] bg-[var(--color-surface-Surface-2)]" : "flex-[1] bg-[var(--color-surface-Surface-1)]"}
              `}
            >
              {/* Background Fade */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`} />
              
              {/* Content */}
              <div className={`relative z-20 transition-all duration-500 ${isActive ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-8"}`}>
                <div className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)]/20 text-[var(--color-accent-main)] flex items-center justify-center font-bold mb-3">
                  {panel.id}
                </div>
                <h3 className="text-h3 font-bold text-white whitespace-nowrap">{panel.title}</h3>
                <p className="text-body-md text-white/70 whitespace-nowrap">{panel.desc}</p>
              </div>

              {/* Title when collapsed */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center transition-all duration-300 ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <span className="text-overline tracking-[0.2em] whitespace-nowrap font-bold text-[var(--color-text-secondary)]">
                  {panel.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
