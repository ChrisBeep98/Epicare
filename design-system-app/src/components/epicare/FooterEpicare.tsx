"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger);

export default function FooterEpicare() {
  const containerRef = useRef<HTMLElement>(null);
  const hillRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const footerLinksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. El Arco Masivo Orgánico (El Cerro Duolingo)
      // Empieza hundido desde mucho más abajo para que el scrub lo suba con más fuerza
      gsap.fromTo(
        hillRef.current,
        { y: "150vh", scaleY: 0.1 },
        {
          y: 0,
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            end: "max", // Termina exactamente en el límite físico inferior
            scrub: 1,
            invalidateOnRefresh: true
          }
        }
      );

      // 2. El Orbe (Sello de Marca)
      // Sale despedido hacia arriba desde adentro de la colina
      gsap.fromTo(
        orbRef.current,
        { y: 150, scale: 0.5, rotation: -20, opacity: 0 },
        { 
          y: -50,
          scale: 1, 
          rotation: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "max",
            scrub: 1.2,
            invalidateOnRefresh: true
          }
        }
      );

      // 3. Efecto de Gravedad para el Contenido
      // El contenido (links, logo) sube ligeramente después de que el cerro lo empuja
      gsap.fromTo(
        ".wy-footer-content",
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom bottom",
            scrub: 1,
          }
        }
      );

      // 4. Textos del CTA (Fade up en Cascada con toggle)
      const texts = textRef.current ? gsap.utils.toArray(textRef.current.children) : [];
      if (texts.length > 0) {
        gsap.fromTo(texts, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // 4. Links del Footer (Detalle fluido en cascada)
      gsap.fromTo(".footer-col", 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerLinksRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={containerRef} 
      className="relative w-full overflow-hidden bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] pt-32 pb-0"
    >
      {/* El Cerro / Curva Gigante estilo Duolingo */}
      <div 
        ref={hillRef} 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[200vw] md:w-[120vw] h-[1200px] bg-[var(--color-brand-blue)] rounded-[50%_50%_0_0] z-0 transform-gpu origin-bottom"
      ></div>

      {/* Contenido Flotante Principal */}
      <div className="relative z-10 w-full max-w-section-lg mx-auto px-gutter-md pt-0 flex flex-col items-center">
        
        {/* Forma / Sello Central (Mascot / Logo Orb) */}
        <div 
          ref={orbRef} 
          className="relative w-28 h-28 md:w-40 md:h-40 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-[24px] border border-white/40 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.15),inset_0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center z-20 overflow-visible"
        >
          {/* Núcleo interactivo sin fondo naranja */}
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-transparent flex items-center justify-center overflow-hidden relative group cursor-pointer transition-transform duration-500 hover:scale-110">
             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
             <img 
               src={asset("/short_logo.svg")}
               alt="GO AMS"
               className="w-16 h-16 md:w-20 md:h-20 drop-shadow-md object-contain pointer-events-none select-none transition-transform duration-300 group-hover:rotate-12"
             />
          </div>
        </div>

        {/* Bloque CTA */}
        <div ref={textRef} className="flex flex-col items-center text-center mt-static-xl md:mt-static-2xl mb-static-2xl md:mb-[120px] max-w-3xl">
          <h2 className="text-display md:text-display-lg text-white font-semibold tracking-tighter mb-4">
            Lleva tu agencia al siguiente nivel
          </h2>
          <p className="text-body-lg text-white/80 font-light mb-8 max-w-xl">
            Únete a cientos de agencias que ya centralizaron su operación y dispararon su retención de clientes con GO AMS.
          </p>
          <button className="group relative w-fit h-14 pl-8 pr-4 rounded-full flex items-center gap-4 bg-[var(--color-brand-orange)] text-white shadow-elevation-3 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(242,96,35,0.4)] cursor-pointer">
            <span className="text-body font-medium tracking-wide">Agendar Demo</span>
            <span className="relative w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center overflow-hidden shrink-0">
              <svg className="absolute w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-6 group-hover:-translate-y-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              <svg className="absolute w-5 h-5 -translate-x-6 translate-y-6 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </span>
          </button>
        </div>

        {/* Links del Footer con microinteracciones (slide right) */}
        <div ref={footerLinksRef} className="w-full grid grid-cols-2 md:grid-cols-4 gap-fluid-md border-t border-white/20 pt-static-xl pb-static-lg">
          <div className="footer-col flex flex-col gap-4">
            <span className="text-ui-label text-white/50 uppercase tracking-widest">Plataforma</span>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">GO AMS</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">GO CRM</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">Academy</span>
            </a>
          </div>
          <div className="footer-col flex flex-col gap-4">
            <span className="text-ui-label text-white/50 uppercase tracking-widest">Soluciones</span>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">Agencias (Nivel 1)</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">Brokers (Nivel 2)</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">Independientes</span>
            </a>
          </div>
          <div className="footer-col flex flex-col gap-4">
            <span className="text-ui-label text-white/50 uppercase tracking-widest">Recursos</span>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">Blog Oficial</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">Centro de Ayuda</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">Casos de Éxito</span>
            </a>
          </div>
          <div className="footer-col flex flex-col gap-4">
            <span className="text-ui-label text-white/50 uppercase tracking-widest">Legal</span>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">Privacidad</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">Términos de Uso</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-body-sm text-white/90 hover:text-white transition-all">
              <span className="transition-transform duration-300 group-hover:translate-x-1">Cookies</span>
            </a>
          </div>
        </div>

        {/* Fila Final (Copyright & Redes) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-6 pb-12 text-white/50 text-body-xs font-mono">
          <p>© {new Date().getFullYear()} GO AMS. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
