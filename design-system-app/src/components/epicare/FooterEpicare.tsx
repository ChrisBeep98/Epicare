"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";

export default function FooterEpicare() {
  const t = useTranslations("landingV2.nav");
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !containerRef.current || !parallaxRef.current) return;

    const ctx = gsap.context(() => {
      
      // 1. SCROLLING AVANZADO: CURTAIN REVEAL PERFECTO
      // El contenedor tiene overflow-hidden. El footer se traslada internamente 
      // sincronizado con el scroll para lograr el efecto telón clásico de Awwwards, 
      // 100% seguro sin z-index invasivo.
      gsap.fromTo(parallaxRef.current,
        { yPercent: -100 }, 
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
          }
        }
      );

      // 2. ENTRADA EDITORIAL (Stagger Reveal)
      // Los elementos aparecen con elegancia a medida que el telón se levanta
      gsap.fromTo(".editorial-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: 1
          }
        }
      );

      // 3. JUEGO DE LETRAS ANTIGRAVITY (Elegante y Premium)
      const letters = document.querySelectorAll(".footer-letter");
      letters.forEach((letter) => {
        letter.addEventListener("mouseenter", () => {
          gsap.to(letter, { 
            yPercent: -15, 
            color: "var(--color-brand-blue)",
            scale: 1.05,
            duration: 0.4, 
            ease: "power3.out" 
          });
        });
        letter.addEventListener("mouseleave", () => {
          gsap.to(letter, { 
            yPercent: 0, 
            color: "white", 
            scale: 1,
            duration: 0.6, 
            ease: "power3.out" 
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const word = "EPICARE".split("");

  return (
    // CONTENEDOR 100DVH (Garantiza que todo quepa en una sola pantalla)
    <div ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-transparent z-10 border-t border-[var(--color-surface-BG-black)]">
      
      {/* CAPA PARALLAX (Telón) */}
      <div 
        ref={parallaxRef} 
        className="absolute top-0 left-0 w-full h-[100dvh] bg-[var(--color-surface-BG-black)] flex flex-col justify-between will-change-transform pt-section-xs md:pt-section-sm pb-6"
      >
        
        {/* =========================================
            EDITORIAL HERO (Minimalismo Extremo)
        ========================================= */}
        <div className="w-full px-gutter-md flex flex-col md:flex-row justify-between items-start md:items-end gap-fluid-md editorial-reveal">
          <h2 className="text-display-lg md:text-display-2xl font-semibold text-white tracking-tighter leading-[0.9] max-w-[1200px]">
            El estándar <br/>
            <span className="italic font-light text-white/50">definitivo.</span>
          </h2>
          
          {/* Editorial CTA Circle */}
          <Link 
            href="/contacto" 
            className="group flex items-center justify-center w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full border border-white/20 hover:bg-white transition-colors duration-700 flex-shrink-0"
          >
            <span className="text-ui-label text-white group-hover:text-black transition-colors duration-700 uppercase tracking-widest">
              Iniciar
            </span>
          </Link>
        </div>

        {/* =========================================
            EDITORIAL GRID LINKS (Swiss Design)
        ========================================= */}
        <div className="w-full px-gutter-md mt-auto mb-fluid-md editorial-reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-y border-white/15">
            
            <div className="flex flex-col gap-4 py-8 border-b md:border-b-0 md:border-r border-white/15 pr-4 md:pr-8">
              <span className="text-overline text-white/40">{t("about")}</span>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">{t("aboutCompany")}</Link>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">{t("aboutTeam")}</Link>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">{t("aboutLicensing")}</Link>
            </div>
            
            <div className="flex flex-col gap-4 py-8 border-b md:border-b-0 md:border-r border-white/15 px-4 md:px-8">
              <span className="text-overline text-white/40">{t("gohub")}</span>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">{t("gohubCrm")}</Link>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">{t("gohubAms")}</Link>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">{t("gohubCalls")}</Link>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">{t("gohubAcademy")}</Link>
            </div>
            
            <div className="flex flex-col gap-4 py-8 border-b md:border-b-0 border-white/15 px-4 md:px-8 lg:border-r">
              <span className="text-overline text-white/40">{t("solutions")}</span>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">{t("solMarketing")}</Link>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">{t("solTech")}</Link>
            </div>
            
            <div className="flex flex-col gap-4 py-8 pl-4 md:pl-8">
              <span className="text-overline text-white/40">Soporte</span>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">Centro de Ayuda</Link>
              <Link href="#" className="text-body-sm text-white/80 hover:text-white transition-colors">Contacto</Link>
            </div>

          </div>
        </div>

        {/* =========================================
            LEGAL & TYPOGRAPHY
        ========================================= */}
        <div className="w-full px-gutter-md flex flex-col gap-6 editorial-reveal">
          
          <div className="flex flex-col md:flex-row justify-between items-center text-meta text-white/40 gap-4">
            <span className="flex items-center gap-3 uppercase">
              <img src={asset("/short_logo.svg")} alt="Epicare" className="h-4 brightness-0 invert opacity-50" />
              © {new Date().getFullYear()} EPICARE SYSTEMS
            </span>
            <div className="flex gap-6 uppercase">
              <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

          <div className="flex justify-between items-end w-full">
            {word.map((char, idx) => (
              <span 
                key={idx} 
                className="footer-letter cursor-crosshair text-[14.5vw] font-black tracking-tighter leading-[0.75] text-white select-none transform-gpu will-change-transform"
              >
                {char}
              </span>
            ))}
          </div>

        </div>
        
      </div>
    </div>
  );
}
