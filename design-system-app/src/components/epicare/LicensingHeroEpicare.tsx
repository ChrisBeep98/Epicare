"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import HeaderEpicare from './HeaderEpicare';
import { asset } from "@/lib/asset";
import { EASE, DUR, STAGGER, REVEAL } from '@/lib/motion';

/** Up-right arrow used inside the CTA bubbles. */
const ArrowDown = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"
  >
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

export default function LicensingHeroEpicare() {
  const t = useTranslations('landingV2.licensingHero');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation targets
  const textContentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Ignore mobile resize for stable ScrollTrigger (Mobile 100vh bug fix)
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      // Text Elements: Birth effect (masked from bottom)
      gsap.set('.licensing-text-reveal', {
        yPercent: REVEAL.birthPercent,
        opacity: 0,
        clipPath: "inset(0% 0% 100% 0%)",
      });
      
      // CTA Button: Scale and pop
      gsap.set('.licensing-cta-reveal', {
        opacity: 0,
        y: REVEAL.md,
        scale: 0.95
      });

      // Gallery Images: Soft blur & translate
      gsap.set('.licensing-gallery-item', {
        opacity: 0,
        y: REVEAL.lg,
        scale: 1.05,
        filter: `blur(${REVEAL.blurBase}px)`
      });

      // 2. Entrance Animation Timeline
      const tl = gsap.timeline({ delay: 0.2 });

      // Layered Unveiling for Text
      tl.to('.licensing-text-reveal', {
        yPercent: 0,
        opacity: 1,
        clipPath: "inset(-20% -10% -20% -10%)", // Negative margin for descenders
        duration: DUR.birth,
        ease: EASE.dramatic,
        stagger: STAGGER.base,
        clearProps: "clipPath" // Clean up to avoid cropping hover states or shadows
      });

      // Reveal CTA
      tl.to('.licensing-cta-reveal', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DUR.base,
        ease: EASE.out
      }, "-=0.9"); // Overlap with text

      // Stagger Gallery Images with a premium feel
      tl.to('.licensing-gallery-item', {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: DUR.slow,
        ease: EASE.out,
        stagger: STAGGER.wave,
        clearProps: "filter" // GPU performance
      }, "-=1.1"); // Start while text is still entering

      // 3. Parallax Effect for Gallery on Scroll
      gsap.to('.licensing-gallery-item[data-speed="slow"]', {
        yPercent: 15,
        ease: EASE.none,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
      gsap.to('.licensing-gallery-item[data-speed="fast"]', {
        yPercent: -15,
        ease: EASE.none,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll logic strictly through Lenis
  const handleScrollToLicenses = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.scrollTo('#licensing-grid', { offset: -80, duration: 1.2 });
    }
  };

  return (
    <div className="w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500 overflow-hidden">
      
      {/* Standard Header */}
      <HeaderEpicare isHeaderPill={false} isHeaderForcedDark={false} />

      <section 
        ref={containerRef} 
        className="relative w-full pt-[140px] md:pt-[180px] pb-section-lg px-gutter-sm md:px-gutter-md lg:px-gutter-xl"
      >
        <div className="grid-layout max-w-section-xl mx-auto w-full items-center">
          
          {/* LEFT COLUMN: Typography and Content (7 cols desktop, 12 cols mobile) */}
          <div ref={textContentRef} className="col-span-12 md:col-span-7 lg:col-span-6 flex flex-col gap-static-xl mb-12 md:mb-0 z-10">
            
            <div className="flex flex-col gap-static-md">
              <h1 className="licensing-text-reveal text-display-xl lg:text-display-2xl text-[var(--color-text-primary)] font-semibold leading-[0.95] tracking-tight">
                {t('title')}
              </h1>
              <p className="licensing-text-reveal text-body-lg text-[var(--color-text-secondary)] font-light max-w-[42rem] mt-2">
                {t('description')}
              </p>
            </div>

            <div className="licensing-cta-reveal pt-2">
              <button 
                onClick={handleScrollToLicenses}
                className="group w-fit h-14 pl-6 pr-2 rounded-full flex items-center gap-4 bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-text)] shadow-elevation-2 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-elevation-4 active:scale-[0.96]"
              >
                <span className="text-body-md font-medium tracking-wide">{t('cta')}</span>
                <span className="relative w-10 h-10 rounded-full bg-[var(--color-action-primary-text)] text-[var(--color-action-primary-bg)] flex items-center justify-center overflow-hidden shrink-0">
                  <ArrowDown className="absolute w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-y-6" />
                  <ArrowDown className="absolute w-5 h-5 -translate-y-6 transition-transform duration-300 ease-out group-hover:translate-y-0" />
                </span>
              </button>
            </div>
            
          </div>

          {/* RIGHT COLUMN: Institutional Image Gallery (5 cols desktop, 12 cols mobile) */}
          <div ref={galleryRef} className="col-span-12 md:col-span-5 lg:col-span-6 grid grid-cols-2 gap-fluid-xs md:gap-fluid-sm h-[50vh] md:h-[70vh] lg:h-[80vh] relative z-0">
            
            {/* Left Image column (Parallax Slow/Down) */}
            <div className="flex flex-col gap-fluid-xs md:gap-fluid-sm pt-8 md:pt-16">
              <div className="licensing-gallery-item relative w-full h-[60%] rounded-2xl overflow-hidden shadow-elevation-2" data-speed="slow">
                <img 
                  src={asset("/Files/Epicare_Landing/Hero/team_collaboration.jpg")} 
                  alt="Epicare agents training" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" aria-hidden="true" />
              </div>
              <div className="licensing-gallery-item relative w-full h-[40%] rounded-2xl overflow-hidden shadow-elevation-2" data-speed="slow">
                <img 
                  src={asset("/Files/Epicare_Landing/Hero/technology_support.jpg")} 
                  alt="Epicare technology platform" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Image column (Parallax Fast/Up) */}
            <div className="flex flex-col gap-fluid-xs md:gap-fluid-sm pb-8 md:pb-16">
              <div className="licensing-gallery-item relative w-full h-[40%] rounded-2xl overflow-hidden shadow-elevation-2" data-speed="fast">
                <img 
                  src={asset("/Files/Epicare_Landing/Hero/corporate_office.jpg")} 
                  alt="Epicare corporate headquarters" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="licensing-gallery-item relative w-full h-[60%] rounded-2xl overflow-hidden shadow-elevation-2" data-speed="fast">
                <img 
                  src={asset("/Files/Epicare_Landing/Hero/agent_support.jpg")} 
                  alt="Agent receiving dedicated support" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-blue)]/20 to-transparent mix-blend-overlay pointer-events-none" aria-hidden="true" />
              </div>
            </div>
            
          </div>
          
        </div>
      </section>
    </div>
  );
}
