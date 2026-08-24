"use client";

import React, { useState } from "react";
import { Cloud, ShoppingCart, ShieldCheck, Database } from "@phosphor-icons/react";

export default function ArchitectureSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const panels = [
    {
      id: "01",
      title: "GO AMS CORE",
      subtitle: "El motor principal.",
      desc: "Lee y escribe datos en la operación real sin fricción ni lag. Sincronización 100% nativa con Epicare.",
      icon: <Database weight="duotone" className="w-10 h-10 md:w-16 md:h-16 mb-4 md:mb-8 text-[var(--color-brand-blue)]" />,
      color: "bg-white dark:bg-[#0A0E17]",
      textColor: "text-gray-900 dark:text-white"
    },
    {
      id: "02",
      title: "CONTRATOS",
      subtitle: "Sync Bidireccional.",
      desc: "Los contratos y licencias viven en Epicare y se sincronizan en tiempo real. Lo que firmas aparece instantáneamente.",
      icon: <Cloud weight="duotone" className="w-10 h-10 md:w-16 md:h-16 mb-4 md:mb-8 text-gray-900 dark:text-gray-300" />,
      color: "bg-gray-50 dark:bg-[#111827]",
      textColor: "text-gray-900 dark:text-white"
    },
    {
      id: "03",
      title: "COTIZACIONES",
      subtitle: "Precios 1:1.",
      desc: "El mismo catálogo y los mismos precios. La arquitectura garantiza que veas exactamente lo mismo que el cliente.",
      icon: <ShoppingCart weight="duotone" className="w-10 h-10 md:w-16 md:h-16 mb-4 md:mb-8 text-[var(--color-brand-blue)]" />,
      color: "bg-gray-100 dark:bg-[#1F2937]",
      textColor: "text-gray-900 dark:text-white"
    },
    {
      id: "04",
      title: "SEGURIDAD",
      subtitle: "Cero Retención.",
      desc: "SSN y pagos viajan directo al carrier mediante túneles cifrados. GO AMS nunca guarda tus datos sensibles.",
      icon: <ShieldCheck weight="duotone" className="w-10 h-10 md:w-16 md:h-16 mb-4 md:mb-8 text-[var(--color-brand-blue)]" />,
      color: "bg-[#1A1E21] dark:bg-[#0c1524]",
      textColor: "text-white dark:text-white"
    }
  ];

  return (
    <section id="architecture" className="w-full h-[90vh] min-h-[600px] flex flex-col md:flex-row overflow-hidden bg-white dark:bg-[#0A0E17] mb-section-md">
      {panels.map((panel, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div
            key={panel.id}
            onMouseEnter={() => setActiveIndex(idx)}
            onClick={() => setActiveIndex(idx)}
            className={`relative flex flex-col justify-between transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/5 ${panel.color} ${panel.textColor}`}
            style={{ 
              flexGrow: isActive ? 6 : 1,
              flexShrink: 1,
              flexBasis: 0
            }}
          >
            {/* Number Indicator */}
            <div className="absolute top-4 md:top-8 left-4 md:left-0 w-full flex justify-start md:justify-between md:px-8 z-20">
              <span className="font-mono text-xs md:text-sm tracking-widest opacity-40">{panel.id}</span>
              <div className={`hidden md:block w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-[var(--color-brand-blue)] dark:bg-white scale-100' : 'bg-transparent scale-0'}`} />
            </div>

            {/* Physical Rotating Title */}
            <div 
              className={`absolute transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap origin-left z-30 ${
                isActive 
                  ? 'bottom-[40%] md:bottom-1/2 left-8 md:left-16 rotate-0 opacity-100 translate-y-[-4vw]' 
                  : 'bottom-4 md:bottom-8 left-4 md:left-1/2 md:-translate-x-[2.5vw] md:-rotate-90 opacity-40 dark:opacity-20'
              }`}
            >
              <h2 className={`font-display font-bold leading-none tracking-tighter transition-all duration-[800ms] ${isActive ? 'text-[10vw] md:text-[6vw]' : 'text-[8vw] md:text-[5vw]'}`}>
                {panel.title}
              </h2>
            </div>

            {/* Active State: Revealed Content (without title) */}
            <div 
              className={`absolute top-1/2 md:top-1/2 left-0 w-full flex flex-col justify-start px-8 md:px-16 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 md:translate-x-0' : 'opacity-0 translate-y-8 md:translate-y-0 md:translate-x-12 pointer-events-none'}`}
            >
              <div className="max-w-md mt-4 md:mt-[2vw]">
                {panel.icon}
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 opacity-90">{panel.subtitle}</h3>
                <p className={`text-sm md:text-lg font-light leading-relaxed opacity-70`}>
                  {panel.desc}
                </p>
              </div>
            </div>
            
          </div>
        );
      })}
    </section>
  );
}
