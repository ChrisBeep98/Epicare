"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DarkGradientSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up sutil y profesional
      gsap.fromTo(".fade-up", 
        { opacity: 0, y: 40 },
        {
          opacity: 1, 
          y: 0,
          duration: 1.6,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] py-20 md:py-32 z-20 overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-section-lg mx-auto w-full">
        
        {/* Contenedor Premium con Base Azul Noche y Resplandor Transparente */}
        <div className="relative w-full min-h-[60vh] md:min-h-[75vh] rounded-[12px] border border-[var(--color-brand-blue)]/20 overflow-hidden flex flex-col justify-center items-center text-center p-10 md:p-24 bg-gradient-to-b from-[#030e2b] to-[#010512]">
          
          {/* Resplandor Azul (Centro más brillante, caída ultra suave) */}
          <div 
            className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[140%] h-[150%] opacity-40 z-0 pointer-events-none blur-[120px] md:blur-[200px] transform-gpu"
            style={{
              background: "radial-gradient(ellipse at top, var(--color-brand-blue) 0%, rgba(5,72,235, 0.08) 35%, rgba(5,72,235, 0) 70%)"
            }}
          />

          {/* Contenido Central (Clases Congeladas - Purga Fase 2) */}
          <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 max-w-4xl mx-auto">
            
            <h2 className="fade-up text-display-lg text-center text-white tracking-tighter leading-[1.05]">
              Everything You Need to Succeed
            </h2>

            <p className="fade-up text-body text-center text-white/70 max-w-2xl font-light">
              At Epicare, we don’t just open doors to the insurance industry — we walk with you every step of the way. Whether you’re just getting started or looking to grow, we provide the tools, support, and opportunities you need.
            </p>

          </div>
          
        </div>
      </div>
    </section>
  );
}
