"use client";

import React, { useState } from "react";
import { Cloud, ShoppingCart, ShieldCheck, Database } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const PANELS = [
  {
    id: "01",
    titleKey: "panel1Title",
    subtitleKey: "panel1Subtitle",
    descKey: "panel1Desc",
    icon: Database,
    color: "bg-white dark:bg-[#0A0E17]",
    textColor: "text-gray-900 dark:text-white"
  },
  {
    id: "02",
    titleKey: "panel2Title",
    subtitleKey: "panel2Subtitle",
    descKey: "panel2Desc",
    icon: Cloud,
    color: "bg-gray-50 dark:bg-[#111827]",
    textColor: "text-gray-900 dark:text-white"
  },
  {
    id: "03",
    titleKey: "panel3Title",
    subtitleKey: "panel3Subtitle",
    descKey: "panel3Desc",
    icon: ShoppingCart,
    color: "bg-gray-100 dark:bg-[#1F2937]",
    textColor: "text-gray-900 dark:text-white"
  },
  {
    id: "04",
    titleKey: "panel4Title",
    subtitleKey: "panel4Subtitle",
    descKey: "panel4Desc",
    icon: ShieldCheck,
    color: "bg-[#1A1E21] dark:bg-[#0c1524]",
    textColor: "text-white dark:text-white"
  }
];

export default function ArchitectureSection() {
  const t = useTranslations('goAms.architecture');
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="architecture" className="w-full h-[85dvh] sm:h-[90dvh] min-h-[580px] md:h-[90vh] md:min-h-[600px] flex flex-col md:flex-row overflow-hidden bg-white dark:bg-[#0A0E17] mb-section-md select-none">
      {PANELS.map((panel, idx) => {
        const isActive = activeIndex === idx;
        const Icon = panel.icon;
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
            {/* Top Bar: Mobile Icon (Left) & Desktop Top Bar (Number + Dot) */}
            <div className="absolute top-3.5 sm:top-4 md:top-8 left-3.5 md:left-0 w-full flex justify-between px-3.5 md:px-8 z-20 pointer-events-none">
              {/* Desktop Number Indicator */}
              <span className="hidden md:inline font-mono text-xs md:text-sm tracking-widest opacity-40">{panel.id}</span>
              
              {/* Mobile Icon (Top Left) */}
              <div className={`md:hidden transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <Icon weight="duotone" className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--color-brand-blue)]" />
              </div>

              {/* Desktop Active Dot */}
              <div className={`hidden md:block w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-[var(--color-brand-blue)] dark:bg-white scale-100' : 'bg-transparent scale-0'}`} />
            </div>

            {/* Physical Rotating Title (with Number directly above it on mobile) */}
            <div 
              className={`absolute transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap origin-left z-30 ${
                isActive 
                  ? 'bottom-16 sm:bottom-20 md:bottom-1/2 left-3.5 md:left-16 rotate-0 opacity-100 md:translate-y-[-4vw]' 
                  : 'bottom-3.5 md:bottom-8 left-3.5 md:left-1/2 md:-translate-x-[2.5vw] md:-rotate-90 opacity-40 dark:opacity-20'
              }`}
            >
              {/* Number directly above Title on Mobile */}
              <span className={`block md:hidden font-mono text-[10px] tracking-widest mb-0.5 ${isActive ? 'text-[var(--color-brand-blue)] opacity-90' : 'opacity-40'}`}>
                {panel.id}
              </span>
              
              <h2 className={`font-display font-bold leading-none tracking-tighter transition-all duration-[800ms] ${isActive ? 'text-[7.5vw] sm:text-[6vw] md:text-[6vw]' : 'text-[5.5vw] md:text-[5vw]'}`}>
                {t(panel.titleKey as any)}
              </h2>
            </div>

            {/* Active State: Revealed Content (Bottom in mobile, lower half in desktop) */}
            <div 
              className={`absolute bottom-3.5 md:bottom-auto md:top-1/2 left-0 w-full flex flex-col justify-start px-3.5 md:px-16 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 md:translate-x-0' : 'opacity-0 translate-y-6 md:translate-y-0 md:translate-x-12 pointer-events-none'}`}
            >
              <div className="max-w-md md:mt-[2vw]">
                {/* Desktop Icon (Only visible on desktop) */}
                <div className="hidden md:block">
                  <Icon weight="duotone" className="w-16 h-16 mb-6 text-[var(--color-brand-blue)]" />
                </div>
                
                {/* Subtitle (Hidden on mobile, visible on desktop) */}
                <h3 className="hidden md:block text-2xl font-bold mb-4 opacity-90 leading-snug">
                  {t(panel.subtitleKey as any)}
                </h3>
                
                <p className="text-body-xs sm:text-body-sm md:text-body-lg font-light leading-relaxed opacity-75">
                  {t(panel.descKey as any)}
                </p>
              </div>
            </div>
            
          </div>
        );
      })}
    </section>
  );
}
