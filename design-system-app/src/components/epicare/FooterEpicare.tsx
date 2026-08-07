"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FooterEpicare() {
  const t = useTranslations("landingV2.nav");
  const tc = useTranslations("landingV2.footerCta");
  
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!textRef.current || !containerRef.current) return;
    
    // Animación Editorial: Suave, prístina y controlada
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, 
        { y: 50, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        { 
          y: 0, 
          opacity: 1, 
          clipPath: "inset(0% 0 0 0)", 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current, // Usamos el footer fijo como trigger
            start: "top 90%"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[900px] md:min-h-[700px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
      
      <footer ref={containerRef} className="fixed bottom-0 left-0 w-full h-screen min-h-[900px] md:min-h-[700px] bg-[var(--color-surface-BG-black)] -z-10">
        
        <div className="w-full h-full flex flex-col justify-between max-w-[var(--max-w-section-xl)] mx-auto px-gutter-sm md:px-gutter-xl pt-section-lg pb-section-md relative z-10">
            
          {/* TOP SECTION: Massive Editorial Typography */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full border-b border-white/15 pb-static-xl">
            <h2 ref={textRef} className="text-[12vw] md:text-[8vw] text-white font-black uppercase tracking-tighter leading-[0.8] m-0">
              EPICARE
            </h2>
            <div className="flex flex-col items-start md:items-end gap-static-sm mt-static-lg md:mt-0">
              <div className="flex items-center gap-static-sm mb-static-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-green-main)]"></span>
                <p className="text-overline tracking-[0.2em] text-white/50 uppercase">System Online</p>
              </div>
              <a href="mailto:contact@epicare.io" className="text-h4 md:text-h3 font-light text-white hover:text-[var(--color-brand-blue)] transition-colors duration-500">
                contact@epicare.io
              </a>
            </div>
          </div>

          {/* MIDDLE SECTION: Strict Swiss Grid (Centrada Automáticamente) */}
          <div className="w-full grid grid-cols-12 gap-x-gutter-md gap-y-static-xl my-auto py-static-xl md:py-static-2xl">
            
            {/* Column 1: GoHub */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-static-lg">
              <h4 className="text-meta tracking-[0.2em] text-white/40 border-b border-white/10 pb-static-sm">01 / {t("gohub")}</h4>
              <div className="flex flex-col gap-static-md">
                <Link href="#" className="text-body-lg font-light text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300">{t("gohubCrm")}</Link>
                <Link href="#" className="text-body-lg font-light text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300">{t("gohubAms")}</Link>
                <Link href="#" className="text-body-lg font-light text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300">{t("gohubCalls")}</Link>
                <Link href="#" className="text-body-lg font-light text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300">{t("gohubAcademy")}</Link>
              </div>
            </div>

            {/* Column 2: Solutions */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-static-lg">
              <h4 className="text-meta tracking-[0.2em] text-white/40 border-b border-white/10 pb-static-sm">02 / {t("solutions")}</h4>
              <div className="flex flex-col gap-static-md">
                <Link href="#" className="text-body-lg font-light text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300">{t("solMarketing")}</Link>
                <Link href="#" className="text-body-lg font-light text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300">{t("solTech")}</Link>
              </div>
            </div>

            {/* Column 3: About & Address */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-static-lg">
              <h4 className="text-meta tracking-[0.2em] text-white/40 border-b border-white/10 pb-static-sm">03 / {t("about")}</h4>
              <div className="flex flex-col gap-static-md mb-static-xl">
                <Link href="#" className="text-body-lg font-light text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300">{t("aboutCompany")}</Link>
                <Link href="#" className="text-body-lg font-light text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300">{t("aboutTeam")}</Link>
                <Link href="#" className="text-body-lg font-light text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300">{t("aboutLicensing")}</Link>
              </div>
              
              <div className="flex flex-col gap-static-xs mt-auto">
                <p className="text-meta text-white/40">HEADQUARTERS</p>
                <p className="text-body-md font-light text-white/60">One World Trade Center<br/>New York, NY 10007</p>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: Legal */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-static-md pt-static-xl border-t border-white/15">
            <p className="text-meta text-white/40">© {new Date().getFullYear()} EPICARE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-static-lg">
              <Link href="#" className="text-meta text-white/40 hover:text-white transition-colors">{tc("privacy")}</Link>
              <Link href="#" className="text-meta text-white/40 hover:text-white transition-colors">{tc("terms")}</Link>
            </div>
          </div>

        </div>

      </footer>
    </div>
  );
}
