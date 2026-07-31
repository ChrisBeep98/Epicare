"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTranslations } from "next-intl";

const BrandIsotype = () => (
  <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12 transition-colors duration-300">
    <path d="M26.9285 2.25869H8.07172C4.86133 2.25869 2.25879 4.86123 2.25879 8.07162V26.9284C2.25879 30.1388 4.86133 32.7413 8.07172 32.7413H26.9285C30.1389 32.7413 32.7414 30.1388 32.7414 26.9284V8.07162C32.7414 4.86123 30.1389 2.25869 26.9285 2.25869Z" fill="currentColor"/>
    <path d="M15.2695 20.88L26.7871 16.2409C27.1128 16.1098 27.2994 15.762 27.2225 15.4189C26.2319 10.9885 22.2717 7.62417 17.5476 7.62417C15.1324 7.62417 12.7487 8.30639 11.201 9.92566C10.9782 10.1591 10.7943 10.4206 10.7943 10.4206C10.6284 10.7096 10.5569 10.8881 10.5007 11.1249C10.4291 11.4272 10.4331 11.7416 10.5027 12.0446C10.601 12.4706 10.7348 12.8913 10.9053 13.3033C11.2344 14.0966 11.6819 14.8149 12.2263 15.441C13.069 13.3548 15.1592 11.8412 17.547 11.8412C19.1609 11.8412 20.5347 12.4312 21.5701 13.5107L17.7476 15.0537C15.4856 15.9647 14.376 18.5738 15.2695 20.8807V20.88Z" fill="var(--color-surface-BG-base)"/>
    <path d="M26.8841 20.8399C26.9289 20.7222 26.8667 20.5911 26.7463 20.5543C25.9891 20.3229 24.511 19.8787 24.3919 19.8433C24.1699 19.7824 23.485 19.5122 22.6215 19.9343C21.7313 20.3516 20.8056 22.3461 18.9924 22.8344C15.6381 23.6744 12.9554 21.5221 12.1989 19.1009C11.8805 18.0802 11.9661 16.9151 11.9909 16.6977C10.193 14.6611 9.5108 12.3603 9.45194 12.0064C8.3838 13.5809 7.75977 15.4811 7.75977 17.5278C7.75977 22.9668 12.1688 27.3758 17.6078 27.3758C21.8169 27.3758 25.4721 24.5613 26.8841 20.8399Z" fill="var(--color-surface-BG-base)"/>
  </svg>
);

const Sparkle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="inline-block w-[0.5em] h-[0.5em] mx-[0.4em] -translate-y-[0.15em]">
    <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
  </svg>
);

export default function FooterEpicare() {
  const t = useTranslations("landingV2.nav");
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. KINETIC MARQUEE VERTICAL EN COLUMNA IZQUIERDA
      if (marqueeRef.current) {
        gsap.to(".marquee-track-vertical", {
          yPercent: -50,
          ease: "none",
          duration: 100, // Ralentizado de 30 a 100 para que sea ambiental y no maree
          repeat: -1,
        });
      }

      // 2. PARALLAX EDITORIAL (El texto principal sube mientras scrolleas)
      gsap.fromTo(
        ".editorial-text",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const marqueeContent = Array.from({ length: 8 }).map((_, i) => (
    <React.Fragment key={i}>
      EPICARE <Sparkle /> SHAPE THE FUTURE <Sparkle />{" "}
    </React.Fragment>
  ));

  return (
    <div 
      ref={wrapperRef}
      className="relative w-full h-[100dvh]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 left-0 w-full h-[100dvh]">
        <footer
          ref={containerRef}
          className="relative w-full h-full bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] border-t border-[var(--color-border-Strokes-default)] overflow-hidden z-20 flex flex-col"
        >
          {/* 
            ========================================================================
            SPLIT-SCREEN EDITORIAL LAYOUT
            ========================================================================
          */}
          <div className="flex flex-col md:flex-row-reverse w-full flex-1 relative z-10 border-b border-[var(--color-border-Strokes-default)]">
        
        <div 
          ref={leftColumnRef} 
          className="w-full md:w-1/2 shrink-0 md:shrink flex-[0.8] md:flex-1 py-[var(--space-fluid-sm)] px-[var(--space-fluid-md)] border-b md:border-b-0 md:border-l border-[var(--color-border-Strokes-default)] relative flex flex-col justify-between overflow-hidden bg-[var(--color-surface-BG-base)]/20 backdrop-blur-3xl group"
        >
           {/* Kinetic Vertical Marquee (Ahora es el protagonista) */}
           <div ref={marqueeRef} className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden mix-blend-overlay flex items-center">
             <div className="marquee-track-vertical flex flex-col gap-fluid-lg text-[16vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none text-[var(--color-text-primary)]">
               <div className="text-center md:text-left">{marqueeContent}</div>
               <div className="text-center md:text-left">{marqueeContent}</div>
             </div>
           </div>
        </div>

        {/* COLUMNA ENLACES: CTA + Sitemap */}
        <div className="w-full md:w-1/2 flex-[1.2] md:flex-1 flex flex-col bg-[var(--color-surface-BG-base)]/20 backdrop-blur-3xl">
           
           {/* Block 0: CTA Gigante */}
           <div className="flex-[1.5] py-[var(--space-fluid-md)] pl-[var(--space-fluid-lg)] pr-[var(--space-fluid-md)] border-b border-[var(--color-border-Strokes-default)] transition-colors duration-500 flex flex-col justify-center items-start gap-fluid-sm">
              <p className="text-display-sm md:text-display-md lg:text-display-lg font-medium text-[var(--color-text-primary)] w-full max-w-none leading-tight">
                 Elevate your<br />insurance agency.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-fluid-xs">
                 <button className="group w-fit h-12 pl-6 pr-2 rounded-full flex items-center gap-3 bg-[var(--color-brand-blue)] text-white shadow-elevation-2 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-elevation-4 active:scale-[0.96] active:opacity-80 active:duration-150">
                   <span className="text-body-sm font-medium">Get Started</span>
                   <span className="relative w-8 h-8 rounded-full bg-white text-[var(--color-brand-blue)] flex items-center justify-center overflow-hidden shrink-0">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="absolute w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="absolute w-4 h-4 -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
                   </span>
                 </button>
                 <button className="group w-fit h-12 px-6 rounded-full flex items-center justify-center border border-[var(--color-border-Strokes-default)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-surface-BG-base)] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.96]">
                   <span className="text-body-sm font-medium">Contact Us</span>
                 </button>
              </div>
           </div>

           {/* Block 1: SITEMAP (GOHUB + SOLUTIONS + COMPANY) */}
           <div className="flex-1 py-[var(--space-fluid-sm)] pl-[var(--space-fluid-lg)] pr-[var(--space-fluid-md)] transition-colors duration-500 flex flex-col justify-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-fluid-md">
                 
                 {/* GOHUB */}
                 <div className="flex flex-col gap-fluid-xs">
                    <h4 className="text-meta uppercase font-bold text-[var(--color-text-muted)] tracking-widest mb-1">{t("gohub")}</h4>
                    <div className="flex flex-col gap-2">
                      <Link href="#" className="inline-flex items-center gap-1 w-fit border-b border-[var(--color-border-Strokes-default)] pb-0.5 hover:border-[var(--color-text-primary)] transition-all group/link text-body-md">
                        {t("gohubCrm")} <span className="text-[0.8em] opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">↗</span>
                      </Link>
                      <Link href="#" className="inline-flex items-center gap-1 w-fit border-b border-[var(--color-border-Strokes-default)] pb-0.5 hover:border-[var(--color-text-primary)] transition-all group/link text-body-md">
                        {t("gohubAms")} <span className="text-[0.8em] opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">↗</span>
                      </Link>
                      <Link href="#" className="inline-flex items-center gap-1 w-fit border-b border-[var(--color-border-Strokes-default)] pb-0.5 hover:border-[var(--color-text-primary)] transition-all group/link text-body-md">
                        {t("gohubCalls")} <span className="text-[0.8em] opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">↗</span>
                      </Link>
                      <Link href="#" className="inline-flex items-center gap-1 w-fit border-b border-[var(--color-border-Strokes-default)] pb-0.5 hover:border-[var(--color-text-primary)] transition-all group/link text-body-md">
                        {t("gohubAcademy")} <span className="text-[0.8em] opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">↗</span>
                      </Link>
                    </div>
                 </div>

                 {/* SOLUTIONS */}
                 <div className="flex flex-col gap-fluid-xs">
                    <h4 className="text-meta uppercase font-bold text-[var(--color-text-muted)] tracking-widest mb-1">{t("solutions")}</h4>
                    <div className="flex flex-col gap-2">
                      <Link href="#" className="inline-flex items-center gap-1 w-fit border-b border-[var(--color-border-Strokes-default)] pb-0.5 hover:border-[var(--color-text-primary)] transition-all group/link text-body-md">
                        {t("solMarketing")} <span className="text-[0.8em] opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">↗</span>
                      </Link>
                      <Link href="#" className="inline-flex items-center gap-1 w-fit border-b border-[var(--color-border-Strokes-default)] pb-0.5 hover:border-[var(--color-text-primary)] transition-all group/link text-body-md">
                        {t("solTech")} <span className="text-[0.8em] opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">↗</span>
                      </Link>
                    </div>
                 </div>

                 {/* COMPANY */}
                 <div className="flex flex-col gap-fluid-xs">
                    <h4 className="text-meta uppercase font-bold text-[var(--color-text-muted)] tracking-widest mb-1">{t("about")}</h4>
                    <div className="flex flex-col gap-2">
                      <Link href="#" className="inline-flex items-center gap-1 w-fit border-b border-[var(--color-border-Strokes-default)] pb-0.5 hover:border-[var(--color-text-primary)] transition-all group/link text-body-md">
                        {t("aboutCompany")} <span className="text-[0.8em] opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">↗</span>
                      </Link>
                      <Link href="#" className="inline-flex items-center gap-1 w-fit border-b border-[var(--color-border-Strokes-default)] pb-0.5 hover:border-[var(--color-text-primary)] transition-all group/link text-body-md">
                        {t("aboutTeam")} <span className="text-[0.8em] opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">↗</span>
                      </Link>
                      <Link href="#" className="inline-flex items-center gap-1 w-fit border-b border-[var(--color-border-Strokes-default)] pb-0.5 hover:border-[var(--color-text-primary)] transition-all group/link text-body-md">
                        {t("aboutLicensing")} <span className="text-[0.8em] opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">↗</span>
                      </Link>
                    </div>
                 </div>

              </div>
           </div>
        </div>

      </div>

      {/* 
        ========================================================================
        BOTTOM META BAR
        ========================================================================
      */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center text-meta uppercase tracking-widest text-[var(--color-text-muted)] py-static-md md:py-static-lg pl-[var(--space-fluid-lg)] pr-gutter-lg bg-[var(--color-surface-BG-base)]/60 backdrop-blur-2xl relative z-20">
         <div className="flex items-center gap-4 mb-static-md md:mb-0">
            <span className="text-[var(--color-text-primary)] hover:text-[var(--color-brand-blue)] transition-colors cursor-pointer flex-shrink-0">
               <BrandIsotype />
            </span>
            <span className="text-body-md font-medium">© {new Date().getFullYear()} EPICARE</span>
         </div>
         <div className="flex items-center gap-fluid-md">
            <Link href="#" className="hover:text-[var(--color-accent-main)] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[var(--color-brand-blue)] transition-colors">Terms</Link>
         </div>
      </div>

        </footer>
      </div>
    </div>
  );
}
