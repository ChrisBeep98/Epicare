"use client";

import React from "react";
import { Cloud, ShoppingCart, ShieldCheck } from "@phosphor-icons/react";

export default function ArchitectureSection() {
  
  // Custom CSS for infinite hardware-accelerated marquee
  const marqueeStyle = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 30s linear infinite;
      will-change: transform;
    }
    .group:hover .animate-marquee {
      animation-play-state: paused;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-marquee {
        animation: none;
        transform: translateX(0);
      }
    }
  `;

  return (
    <section id="architecture" className="w-full bg-[var(--color-surface-BG-base)] py-section-xl flex flex-col gap-4 overflow-hidden relative transition-colors duration-500">
      <style dangerouslySetInnerHTML={{__html: marqueeStyle}} />
      
      <div className="px-gutter-md mb-8 md:mb-12">
        <span className="text-ui-label text-[var(--color-brand-blue)] tracking-[0.2em] mb-4 block">
          ARQUITECTURA DEL SISTEMA
        </span>
      </div>

      {/* Row 1: Contratos */}
      <div className="group w-full h-[120px] md:h-[160px] hover:h-[300px] md:hover:h-[450px] bg-gray-50 dark:bg-[#1A1E21] hover:bg-white dark:hover:bg-gray-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden flex items-center cursor-pointer border-t border-b border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white">
        
        {/* Marquee Text (Hides on hover) */}
        <div className="absolute inset-0 flex items-center whitespace-nowrap opacity-100 group-hover:opacity-0 transition-opacity duration-500">
          <div className="animate-marquee flex gap-12 md:gap-16 font-display text-[12vw] md:text-[100px] font-bold text-gray-900 dark:text-white tracking-tighter uppercase pointer-events-none transition-colors">
            <span>CONTRATOS Y LICENCIAS</span><span>—</span><span>CONTRATOS Y LICENCIAS</span><span>—</span><span>CONTRATOS Y LICENCIAS</span><span>—</span>
          </div>
        </div>
        
        {/* Expanded Content (Reveals on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 translate-y-10 group-hover:translate-y-0">
          <div className="max-w-5xl px-gutter-md flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-2xl md:rounded-[32px] flex items-center justify-center shrink-0 shadow-inner">
              <Cloud weight="duotone" className="w-12 h-12 md:w-16 md:h-16 text-gray-900" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-display-xs md:text-display-sm font-bold text-gray-900 mb-2 md:mb-4">Sincronización Total.</h3>
              <p className="text-body-lg md:text-body-xl text-gray-600 leading-relaxed max-w-2xl">
                Tus contratos viven en Epicare. GO AMS simplemente crea un túnel transparente para que puedas gestionarlos sin latencia y sin bases de datos separadas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Cotizaciones */}
      <div className="group w-full h-[120px] md:h-[160px] hover:h-[300px] md:hover:h-[450px] bg-gray-50 dark:bg-[#1A1E21] hover:bg-[#2F3437] dark:hover:bg-[#2F3437] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden flex items-center cursor-pointer border-b border-gray-200 dark:border-white/5 hover:border-[#2F3437] dark:hover:border-[#2F3437]">
        
        <div className="absolute inset-0 flex items-center whitespace-nowrap opacity-100 group-hover:opacity-0 transition-opacity duration-500">
          <div className="animate-marquee flex gap-12 md:gap-16 font-display text-[12vw] md:text-[100px] font-bold text-[var(--color-brand-blue)] dark:text-[var(--color-brand-blue)] tracking-tighter uppercase pointer-events-none transition-colors" style={{ animationDirection: "reverse" }}>
            <span>COTIZACIONES EXACTAS 1:1</span><span>—</span><span>COTIZACIONES EXACTAS 1:1</span><span>—</span><span>COTIZACIONES EXACTAS 1:1</span><span>—</span>
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 translate-y-10 group-hover:translate-y-0">
          <div className="max-w-5xl px-gutter-md flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-2xl md:rounded-[32px] flex items-center justify-center shrink-0 shadow-inner">
              <ShoppingCart weight="duotone" className="w-12 h-12 md:w-16 md:h-16 text-[var(--color-brand-blue)]" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-display-xs md:text-display-sm font-bold text-white mb-2 md:mb-4">El mismo catálogo.</h3>
              <p className="text-body-lg md:text-body-xl text-white/80 leading-relaxed max-w-2xl">
                No hay discrepancias. Lo que tú ves en GO AMS es matemáticamente lo mismo que procesa Epicare. Mismos planes, mismos precios, misma exactitud.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Seguridad */}
      <div className="group w-full h-[120px] md:h-[160px] hover:h-[300px] md:hover:h-[450px] bg-gray-50 dark:bg-[#1A1E21] hover:bg-[var(--color-brand-blue)] dark:hover:bg-[var(--color-brand-blue)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden flex items-center cursor-pointer border-b border-gray-200 dark:border-white/5 hover:border-[var(--color-brand-blue)] dark:hover:border-[var(--color-brand-blue)]">
        
        <div className="absolute inset-0 flex items-center whitespace-nowrap opacity-100 group-hover:opacity-0 transition-opacity duration-500">
          <div className="animate-marquee flex gap-12 md:gap-16 font-display text-[12vw] md:text-[100px] font-bold text-gray-900 dark:text-white tracking-tighter uppercase pointer-events-none transition-colors">
            <span>CIFRADO A NIVEL DE DATO</span><span>—</span><span>CIFRADO A NIVEL DE DATO</span><span>—</span><span>CIFRADO A NIVEL DE DATO</span><span>—</span>
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 translate-y-10 group-hover:translate-y-0">
          <div className="max-w-5xl px-gutter-md flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-black/20 rounded-2xl md:rounded-[32px] flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck weight="duotone" className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-display-xs md:text-display-sm font-bold text-white mb-2 md:mb-4">Cero Retención.</h3>
              <p className="text-body-lg md:text-body-xl text-white/90 leading-relaxed max-w-2xl">
                Datos de pago y números de seguro social se transmiten directamente al carrier mediante túneles cifrados. GO AMS jamás almacena información sensible.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
