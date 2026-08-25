"use client";

import React from "react";

export default function CtaFinalSection() {
  return (
    <section className="w-full relative bg-[var(--color-surface-BG-1)] pt-0 pb-section-lg">
      {/* 
        Center Monolith Concept 
        Aumentamos el width a max-w-5xl (antes 4xl) para mayor presencia 
      */}
      <div className="w-full max-w-6xl mx-auto pt-8 pb-16 px-4 md:px-8">
        <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-elevation-4 border border-white/10">
          
          <div className="absolute inset-0 z-0">
            <img 
              src="/Files/S14_cta_swiss_blue.jpg"
              alt="GO AMS Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Ligero oscurecimiento para maximizar el contraste de la tipografía blanca */}
            <div className="absolute inset-0 bg-black/15" />
          </div>

          <div className="relative z-10 text-center px-6 py-12 md:py-16 flex flex-col items-center">
            
            <span className="text-meta font-mono tracking-widest text-white/50 mb-4 uppercase border-b border-white/20 pb-1">
              Epicare Insurance Corp™
            </span>
            
            {/* Nuevo Título basado en la narrativa de la landing */}
            <h2 className="text-display-md md:text-display-lg font-display font-bold text-white leading-[0.9] tracking-tighter mb-4 drop-shadow-sm">
              Un solo portal.<br />Todo tu negocio.
            </h2>
            
            <p className="text-body-lg text-white/90 max-w-2xl mb-8 leading-relaxed">
              El proceso de contracting toma días, no horas. Aplica ahora para tener tu cuenta de GO AMS lista desde el primer día, sin costo de plataforma.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-static-md md:gap-fluid-xs w-full justify-center max-w-md">
              {/* Primary CTA (Epicare Hero Style) */}
              <button className="group w-fit mx-auto sm:mx-0 h-12 pl-6 pr-2 rounded-full flex items-center gap-3 bg-[var(--color-brand-blue)] text-[var(--color-surface-BG-base)] shadow-elevation-2 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-elevation-4 active:scale-[0.96] active:opacity-80 active:duration-150">
                <span className="text-body-sm font-medium">Aplicar Ya</span>
                <span className="relative w-8 h-8 rounded-full bg-[var(--color-surface-BG-base)] text-[var(--color-brand-blue)] flex items-center justify-center overflow-hidden shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute w-4 h-4 -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </span>
              </button>

              {/* Secondary CTA (Epicare Hero Style) */}
              <button className="group w-fit mx-auto sm:mx-0 h-12 pl-6 pr-2 rounded-full flex items-center gap-3 bg-white/10 border border-white/20 text-white shadow-elevation-1 md:backdrop-blur-sm transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/20 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.96] active:opacity-80 active:duration-150">
                <span className="text-body-sm font-medium">Contactar</span>
                <span className="relative w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center overflow-hidden shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute w-4 h-4 -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </span>
              </button>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
