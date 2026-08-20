"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PlatformRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".shot-bo, .shot-qe", { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, xPercent: 0 });
        return;
      }

      // 1. Entrada Limpia (Sin tocar 'y' para no pelear con el parallax)
      gsap.fromTo(
        ".shot-bo",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      gsap.fromTo(
        ".shot-qe",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. Parallax Interno de la Imagen (Original + Zoom sutil)
      gsap.fromTo(".bg-parallax-inner", 
        { yPercent: -8, scale: 1.05 },
        {
          yPercent: 8,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="s04 w-full pt-0 pb-section-md flex justify-center bg-[var(--color-surface-BG-base)] relative z-10 overflow-hidden perspective-[2500px]"
    >
      <div className="w-full flex flex-col gap-fluid-xl items-center">
        
        {/* Copy del Reveal */}
        <div className="text-center w-full px-gutter-md max-w-section-sm flex flex-col gap-3 relative z-20">
          <h2 className="text-display-xl font-semibold text-[var(--color-text-primary)] leading-[1.1] tracking-tight drop-shadow-2xl">
            Un sistema.<br/>
            <span className="text-[var(--color-text-accent-blue)]">Dos modos de trabajo.</span>
          </h2>
          <p className="text-body-lg text-[var(--color-text-secondary)] mx-auto max-w-[500px]">
            GO AMS separa lo que administras de lo que vendes. Cada modo tiene su propio espacio, su propia navegación, y un botón para cambiar entre ellos.
          </p>
        </div>

        {/* 2 Screenshots Gigantes (Más altos: aspect 4/3 o 1/1) */}
        <div className="w-[130vw] md:w-[120vw] flex flex-col md:flex-row justify-center gap-fluid-md mt-[100px] md:mt-[180px] transform-style-preserve-3d">
          
          {/* Screenshot Back Office */}
          <div className="shot-bo w-full md:w-[55vw] bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col aspect-[4/5] md:aspect-video relative rounded-3xl will-change-transform">
            
            {/* Contenedor de máscara */}
            <div className="flex-1 relative overflow-hidden bg-[var(--color-surface-BG-black)]">
              {/* Imagen con leve margen vertical para permitir parallax interno sin recortar mucho */}
              <div className="bg-parallax-inner absolute top-[-10%] left-0 w-full h-[120%] bg-[url('/Files/Go_AMS/go-ams-backoffice.jpeg')] bg-cover bg-center opacity-100" />
              
              {/* Pestaña flotante sobre la imagen */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center bg-[var(--color-surface-BG-1)]/90 backdrop-blur-md border border-t-0 border-[var(--color-border-Strokes-default)] rounded-none px-8 py-3 w-auto min-w-[180px] text-body-md font-semibold text-[var(--color-text-primary)] shadow-md z-20">
                Back Office
              </div>
            </div>
          </div>

          {/* Screenshot Quote & Enroll */}
          <div className="shot-qe w-full md:w-[55vw] bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col aspect-[4/5] md:aspect-video relative rounded-3xl will-change-transform">
            
            {/* Contenedor de máscara */}
            <div className="flex-1 relative overflow-hidden bg-[var(--color-surface-BG-black)]">
              {/* Imagen con leve margen vertical para permitir parallax interno sin recortar mucho */}
              <div className="bg-parallax-inner absolute top-[-10%] left-0 w-full h-[120%] bg-[url('/Files/Go_AMS/go-ams-quote.jpeg')] bg-cover bg-center opacity-100" />
              
              {/* Pestaña flotante sobre la imagen */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center bg-[var(--color-surface-BG-1)]/90 backdrop-blur-md border border-t-0 border-[var(--color-border-Strokes-default)] rounded-none px-8 py-3 w-auto min-w-[180px] text-body-md font-semibold text-[var(--color-text-primary)] shadow-md z-20">
                Quote & Enroll
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
