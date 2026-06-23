"use client";

import React, { useEffect, useState } from 'react';

export default function HeroEpicare() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen text-[var(--color-text-primary)] relative overflow-x-hidden bg-[var(--color-surface-BG-base)]">
      
      {/* Navbar Minimalista */}
      <nav className="h-16 w-full absolute top-0 left-0 border-b border-[var(--color-border-Strokes-default)] border-opacity-30 px-[var(--space-gutter-sm)] lg:px-[var(--space-gutter-md)] flex justify-between items-center z-[9999]">
        <div className="flex items-center h-full py-2">
          <img src="/epicare_logo.svg" alt="Epicare Insurance Logo" className="h-full w-auto max-h-[44px] object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={toggleTheme} className="bg-black/50 backdrop-blur-md rounded-full p-1 flex items-center shadow-inner cursor-pointer border border-white/20 relative z-50 touch-manipulation">
            <div className={`w-5 h-5 rounded-full shadow-sm transition-colors ${!isDark ? 'bg-white' : 'bg-transparent'}`}></div>
            <div className={`w-5 h-5 rounded-full shadow-sm transition-colors ${isDark ? 'bg-white' : 'bg-transparent'}`}></div>
          </button>
        </div>
      </nav>

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        >
          <source src="/Files/Epicare_Landing/Hero/epicare_landing_hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay static */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <section className="w-full flex-1 px-[var(--space-gutter-sm)] lg:px-[var(--space-gutter-md)] z-10 flex flex-col pt-[160px] pb-[var(--space-fluid-lg)]">
        <div className="grid-layout flex-1 max-w-section-xl w-full mx-auto">
          
          {/* Fila 2: Titular Principal */}
          <div className="col-start-1 col-span-6 row-start-2 row-span-1 md:col-start-1 md:col-span-7 md:row-start-5 md:row-span-1 flex flex-row justify-start items-end pb-8">
            <h1 className="text-display-xl text-white drop-shadow-lg leading-none mb-4">
              La Nueva Era<br/>De La Protección Inteligente.
            </h1>
          </div>

          {/* Fila 3: Subtítulo y CTA */}
          <div className="col-start-1 col-span-6 row-start-3 row-span-1 md:col-start-1 md:col-span-5 md:row-start-6 md:row-span-1 flex flex-col justify-start items-start gap-8">
            <p className="text-body-lg text-white/80 leading-relaxed font-light">
              Epicare Insurance Corp protege a más de 1 millón de familias a través de tecnología disruptiva, productos accesibles y una red nacional de agentes potenciados por inteligencia artificial.
            </p>
            
            <div className="flex gap-4">
              <button className="bg-[var(--color-brand-blue)] text-white px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all flex justify-center items-center backdrop-blur-md">
                Descubre Nuestros Planes
              </button>
              <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all flex justify-center items-center backdrop-blur-md">
                Para Agentes
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
