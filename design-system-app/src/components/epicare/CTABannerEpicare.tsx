"use client";

import React, { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CTABannerEpicareProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTABannerEpicare({
  title,
  description,
  buttonText = "Get contracted today",
  buttonHref = "#"
}: CTABannerEpicareProps) {
  const t = useTranslations('landingV2.ctaBanner'); // We will mock this or use literal if not in i18n
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Defaults if not provided (matching the Licensing page)
  const defaultTitle = (
    <>Ready to scale your <span className="text-[var(--color-brand-blue)]">agency</span>?</>
  );
  const defaultDescription = "Join the network of top-tier insurance professionals and get access to all 52 states.";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax solo en desktop para garantizar 60fps en móviles
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      if (!containerRef.current || !bgRef.current) return;
      
      gsap.fromTo(bgRef.current,
        { yPercent: -20 },
        {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full relative bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500 pt-0 pb-section-md px-gutter-md"
    >
      <div className="mx-auto max-w-section-lg w-full">
        {/* Contenedor principal de la tarjeta */}
        <div className="relative rounded-[2rem] overflow-hidden group w-full flex flex-col shadow-elevation-3">
          
          {/* BACKGROUND - Experimento con Parallax */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div ref={bgRef} className="absolute -inset-[20%] w-[140%] h-[140%] will-change-transform">
              <Image
                src="/banners/cta-bg-experiment.jpg"
                alt="Experimental texture"
                fill
                className="object-cover object-center scale-[1.02] transition-transform duration-[2s] group-hover:scale-100"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>

          {/* MARGEN CREATIVO: Bordes sutiles */}
          <div className="absolute inset-0 z-20 border border-[var(--color-border-Strokes-default)] rounded-[2rem] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />

          {/* CONTENT */}
          <div className="relative z-10 w-full flex flex-col justify-center min-h-[40vh] py-section-sm px-gutter-md">
            <div className="mx-auto max-w-section-xl w-full flex flex-col gap-fluid-sm items-center text-center justify-center">
              <h2 className="text-display-lg text-white font-semibold tracking-tight max-w-[800px] leading-[1.1]">
                {title || defaultTitle}
              </h2>
              <p className="text-body-lg text-white/80 font-light max-w-[500px]">
                {description || defaultDescription}
              </p>
              
              <div>
                <button className="group relative h-14 pl-8 pr-3 rounded-full flex items-center gap-4 bg-white text-black shadow-elevation-3 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-elevation-4">
                  <span className="text-body-md font-medium">{buttonText}</span>
                  <span className="relative w-9 h-9 rounded-full bg-black text-white flex items-center justify-center overflow-hidden shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-6 group-hover:-translate-y-6" aria-hidden="true">
                      <path d="M7 17 17 7M7 7h10v10"></path>
                    </svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute w-4 h-4 -translate-x-6 translate-y-6 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden="true">
                      <path d="M7 17 17 7M7 7h10v10"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
