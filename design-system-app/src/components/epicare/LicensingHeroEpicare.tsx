"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import HeaderEpicare from './HeaderEpicare';
import { asset } from "@/lib/asset";
import { EASE, DUR, STAGGER, REVEAL } from '@/lib/motion';

/** Minimalist Down Arrow for the CTA buttons */
const ArrowDownMinimal = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"
  >
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

/** Minimalist Info Icon for the secondary button */
const InfoIcon = ({ className = '' }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const VISUAL_IMAGES = [
  asset("/Files/Epicare_Landing/Hero/technology_support.jpg"),
  asset("/Files/Epicare_Landing/Hero/team_collaboration.jpg"),
  asset("/Files/Epicare_Landing/Hero/corporate_office.jpg")
];

export default function LicensingHeroEpicare() {
  const t = useTranslations('landingV2.licensingHero');
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    // Crossfade Logic
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % VISUAL_IMAGES.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set('.licensing-title-char', {
        yPercent: REVEAL.birthPercent,
        opacity: 0,
        clipPath: "inset(0% 0% 100% 0%)",
      });

      gsap.set('.licensing-text', { opacity: 0, y: REVEAL.md });

      gsap.set('.licensing-visual', {
        opacity: 0,
        y: REVEAL.lg,
        scale: 0.96,
        filter: `blur(${REVEAL.blurBase}px)`
      });
      
      gsap.set('.licensing-visual-img', { scale: 1.1 });
      gsap.set('.licensing-btn', { opacity: 0, scale: 0.8, x: -REVEAL.sm });

      // 2. Entrance Timeline
      const tl = gsap.timeline({ delay: 0.1 });

      tl.to('.licensing-title-char', {
        yPercent: 0,
        opacity: 1,
        clipPath: "inset(-20% -10% -20% -10%)",
        duration: DUR.birth,
        ease: EASE.dramatic,
        stagger: STAGGER.tight,
        clearProps: "clipPath"
      });

      tl.to('.licensing-text', {
        opacity: 1,
        y: 0,
        duration: DUR.base,
        ease: EASE.out
      }, "-=1.0");

      tl.to('.licensing-visual', {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: DUR.slow,
        ease: EASE.dramatic,
        clearProps: "filter"
      }, "-=0.8");

      tl.to('.licensing-btn', {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: DUR.base,
        ease: EASE.snap,
        stagger: STAGGER.base
      }, "-=1.0");

      // 3. Scroll Interactions
      gsap.to('.licensing-visual-img', {
        scale: 1,
        ease: EASE.none,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToLicenses = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.scrollTo('#interactive-globe', { offset: -80, duration: 1.2 });
    }
  };

  const titleText = t('title') || "Licensing";
  const titleChars = titleText.split('').map((char, index) => (
    <span key={index} className="licensing-title-char inline-block whitespace-pre">
      {char}
    </span>
  ));

  return (
    <div className="w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500 overflow-hidden">
      
      <HeaderEpicare isHeaderPill={false} isHeaderForcedDark={false} />

      <section 
        ref={containerRef} 
        className="relative w-full py-section-md px-gutter-sm md:px-gutter-md"
      >
        <div className="grid-layout max-w-section-xl mx-auto w-full gap-y-static-2xl md:gap-y-static-md">
          
          {/* ROW 1: TITLE */}
          {/* start: 5, span: 9, flexDir: row, justify: flex-start, align: flex-start */}
          <div className="col-span-12 md:col-start-5 md:col-span-9 md:row-start-1 z-10 flex flex-row justify-start items-start md:pb-8">
            <h1 className="text-display-2xl md:text-display-3xl text-left text-[var(--color-text-primary)] font-semibold leading-[0.9] tracking-tight">
              {titleChars}
            </h1>
          </div>

          {/* ROW 2: TEXT & BUTTONS (Wrapped for mobile flex, contents for desktop grid) */}
          <div className="col-span-12 flex flex-row justify-between items-end gap-5 md:contents">
            {/* TEXT */}
            <div className="flex-1 md:col-start-1 md:col-span-4 md:row-start-2 z-10 flex flex-row justify-start items-end pb-0 md:pb-12 md:pr-8">
              <p className="licensing-text text-subtitle text-left text-[var(--color-text-secondary)] font-light">
                Epicare Insurance holds the necessary <span className="font-medium text-[var(--color-action-primary-bg)]">state licenses</span> to conduct insurance business. All insurance transactions are carried out through <span className="font-medium text-[var(--color-action-primary-bg)]">licensed agents</span> in compliance with state regulations.
              </p>
            </div>
            
            {/* BUTTONS */}
            <div className="flex-none md:col-start-6 md:col-span-1 md:row-start-2 z-10 flex flex-col justify-end items-end pb-0 md:pb-12">
              <button 
                onClick={handleScrollToLicenses}
                className="licensing-btn group relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-text)] shadow-elevation-2 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-elevation-4 active:scale-95"
                aria-label="Scroll to Licenses"
              >
                <div className="absolute inset-0 rounded-full border border-white/20 scale-100 group-hover:scale-[1.15] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                <span className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
                  {/* Arrow Leaving (Down) */}
                  <ArrowDownMinimal className="absolute w-5 h-5 transition-transform duration-[600ms] ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] group-hover:translate-y-10" />
                  {/* Arrow Entering (From Top) */}
                  <ArrowDownMinimal className="absolute w-5 h-5 -translate-y-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] group-hover:translate-y-0" />
                </span>
              </button>
            </div>
          </div>

          {/* ROW 2: VISUAL (Floating Bento without container) */}
          {/* start: 7, span: 6 */}
          <div className="col-span-12 md:col-start-7 md:col-span-6 md:row-start-2 z-0 relative w-full aspect-[4/3] md:aspect-[16/10]">
            {VISUAL_IMAGES.map((src, idx) => {
              const posIdx = (idx - currentImgIndex + 3) % 3;
              let styles: React.CSSProperties = {};
              
              // Math based grid positions (Gap: 16px to breathe without container)
              if (posIdx === 0) { // Main (Left)
                styles = { left: '0%', top: '0%', width: 'calc(65% - 8px)', height: '100%' };
              } else if (posIdx === 1) { // Top Right
                styles = { left: 'calc(65% + 8px)', top: '0%', width: 'calc(35% - 8px)', height: 'calc(50% - 8px)' };
              } else { // Bottom Right
                styles = { left: 'calc(65% + 8px)', top: 'calc(50% + 8px)', width: 'calc(35% - 8px)', height: 'calc(50% - 8px)' };
              }

              return (
                <div 
                  key={idx}
                  className="licensing-visual absolute rounded-[2rem] overflow-hidden shadow-elevation-3 transition-all duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] hover:shadow-elevation-5 hover:scale-[1.02] border border-[var(--color-border-Strokes-default)] group cursor-pointer"
                  style={styles}
                >
                  <img 
                    src={src}
                    alt={`Epicare Licensing ${idx}`} 
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="licensing-visual-img w-full h-full object-cover origin-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-110"
                  />
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0px_0px_20px_rgba(0,0,0,0.05)] pointer-events-none" />
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
