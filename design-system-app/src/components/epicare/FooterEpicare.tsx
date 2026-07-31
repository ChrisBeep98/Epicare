"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function FooterEpicare() {
  const t = useTranslations("landingV2.nav");
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. KINETIC MARQUEE INFINITO
      if (marqueeRef.current) {
        // Asumiendo que clonamos el contenido en el DOM para que fluya perfecto
        gsap.to(".marquee-track", {
          xPercent: -50,
          ease: "none",
          duration: 15,
          repeat: -1,
        });
      }

      // 2. BRUTALIST REVEAL (Secciones revelándose en bloque)
      gsap.fromTo(
        ".brutalist-block",
        { y: 50, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
      
      // 3. PARALLAX DEL FONDO GIGANTE EPICARE
      gsap.fromTo(
        ".giant-bg-text",
        { yPercent: 50 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Texto del marquee
  const marqueeText = "EPICARE ✦ NEXT GEN INSURANCE ✦ ".repeat(6);

  return (
    <footer
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white flex flex-col pt-24 md:pt-32 overflow-hidden z-20"
    >
      {/* 
        ========================================================================
        1. KINETIC MARQUEE
        Una cinta infinita agresiva en la parte superior que grita el statement.
        ========================================================================
      */}
      <div 
        ref={marqueeRef}
        className="w-full border-y border-white/15 py-4 md:py-6 flex whitespace-nowrap overflow-hidden bg-[#050505]"
      >
        <div className="marquee-track flex gap-8 items-center text-display-lg md:text-display-3xl font-black uppercase tracking-tighter">
          <span className="text-white">{marqueeText}</span>
          <span className="text-white">{marqueeText}</span>
        </div>
      </div>

      {/* 
        ========================================================================
        2. BRUTALIST EDITORIAL GRID
        Bordes afilados (0px radius), división estricta, colores invertidos en hover.
        ========================================================================
      */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 border-b border-white/15">
        
        {/* LADO IZQUIERDO: Massive CTA Block (Span 8) */}
        <div className="brutalist-block md:col-span-8 p-8 md:p-16 lg:p-24 border-b md:border-b-0 md:border-r border-white/15 flex flex-col justify-between group cursor-pointer bg-[#050505] hover:bg-white hover:text-black transition-colors duration-500">
          <h2 className="text-[12vw] md:text-[8vw] uppercase font-black leading-[0.85] tracking-tighter mix-blend-difference">
            Ready to <br/>Evolve?
          </h2>
          <div className="flex justify-between items-end mt-16 md:mt-32">
             <span className="text-body-lg uppercase font-bold tracking-widest">Start your journey today</span>
             <span className="text-6xl transform group-hover:translate-x-6 transition-transform duration-500">→</span>
          </div>
        </div>

        {/* LADO DERECHO: Navigation Tags (Span 4) */}
        <div className="md:col-span-4 flex flex-col">
            
            {/* Nav Block 1 */}
            <div className="brutalist-block flex-1 p-8 md:p-12 border-b border-white/15 bg-[#050505] hover:bg-[var(--color-brand-blue)] hover:text-white transition-colors duration-300">
                <h3 className="text-display-md uppercase font-black mb-6 tracking-tight">GoHub Ecosystem</h3>
                <div className="flex flex-wrap gap-3">
                   <span className="border border-current rounded-full px-5 py-2 text-sm uppercase font-bold tracking-widest">CRM</span>
                   <span className="border border-current rounded-full px-5 py-2 text-sm uppercase font-bold tracking-widest">AMS</span>
                   <span className="border border-current rounded-full px-5 py-2 text-sm uppercase font-bold tracking-widest">Calls</span>
                   <span className="border border-current rounded-full px-5 py-2 text-sm uppercase font-bold tracking-widest">Academy</span>
                </div>
            </div>
            
            {/* Nav Block 2 */}
            <div className="brutalist-block flex-1 p-8 md:p-12 border-b border-white/15 bg-[#050505] hover:bg-[var(--color-brand-orange)] hover:text-white transition-colors duration-300">
                <h3 className="text-display-md uppercase font-black mb-6 tracking-tight">Solutions</h3>
                <div className="flex flex-wrap gap-3">
                   <span className="border border-current rounded-full px-5 py-2 text-sm uppercase font-bold tracking-widest">Marketing</span>
                   <span className="border border-current rounded-full px-5 py-2 text-sm uppercase font-bold tracking-widest">Tech</span>
                </div>
            </div>
            
            {/* Nav Block 3 */}
            <div className="brutalist-block flex-1 p-8 md:p-12 bg-[#050505] hover:bg-white hover:text-black transition-colors duration-300">
                <h3 className="text-display-md uppercase font-black mb-6 tracking-tight">Company</h3>
                <div className="flex flex-wrap gap-3">
                   <span className="border border-current rounded-full px-5 py-2 text-sm uppercase font-bold tracking-widest">About Us</span>
                   <span className="border border-current rounded-full px-5 py-2 text-sm uppercase font-bold tracking-widest">Team</span>
                   <span className="border border-current rounded-full px-5 py-2 text-sm uppercase font-bold tracking-widest">Contact</span>
                </div>
            </div>

        </div>
      </div>

      {/* 
        ========================================================================
        3. BOTTOM META & GIANT BACKGROUND TEXT
        Legal info + "EPICARE" parpadeando en el fondo del bloque inferior.
        ========================================================================
      */}
      <div className="w-full flex flex-col items-center justify-center pt-16 pb-8 px-8 md:px-16 overflow-hidden relative min-h-[300px]">
        
        {/* Info Legal y Contacto Superior al texto */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-sm md:text-base uppercase tracking-widest font-bold text-white/50 mb-16 z-10 gap-8">
           <div className="flex gap-8">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
           </div>
           <a href="mailto:hello@epicare.io" className="hover:text-white transition-colors text-xl md:text-base">
              hello@epicare.io
           </a>
           <span>© {new Date().getFullYear()} EPICARE</span>
        </div>

        {/* Texto Masivo Parallax */}
        <div className="absolute bottom-[-10%] md:bottom-[-20%] left-0 w-full flex justify-center pointer-events-none select-none">
           <h1 className="giant-bg-text text-[30vw] md:text-[25vw] font-black leading-[0.8] tracking-tighter text-white/[0.04] text-center w-full">
              EPICARE
           </h1>
        </div>

      </div>

    </footer>
  );
}
