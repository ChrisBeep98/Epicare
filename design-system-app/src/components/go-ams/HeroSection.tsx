"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { EASE, DUR, STAGGER, REVEAL } from '@/lib/motion';
import { asset } from "@/lib/asset";

// Helper to make a container break out of the right side of the grid and touch the viewport edge
function BleedRight({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const originalRight = ref.current.style.right;
        ref.current.style.right = '0px';
        const rect = ref.current.getBoundingClientRect();
        const dist = document.documentElement.clientWidth - rect.right;
        ref.current.style.right = originalRight;
        setOffset(dist > 0 ? dist : 0);
      }
    };
    
    // Initial calculate
    update();
    
    // Recalculate on load (for fonts/images) and resize
    window.addEventListener('load', update);
    window.addEventListener('resize', update);
    
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('load', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, []);

  return <div ref={ref} style={{ right: offset > 0 ? `-${offset}px` : '0px' }} className={className}>{children}</div>;
}

export default function HeroSection() {
  const t = useTranslations('goAms.hero');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    let tl: gsap.core.Timeline;

    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.hero-eyebrow-text, .hero-title-line, .hero-text, .hero-btn, .hero-video-wrap, .hero-bullets', {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
          filter: "none"
        });
        return;
      }

      // 1. Initial State (Line-by-line reveal via GPU transform)
      gsap.set('.hero-title-line', {
        yPercent: 120,
        opacity: 0
      });

      gsap.set('.hero-eyebrow-text', { opacity: 0, y: REVEAL.sm });
      gsap.set('.hero-text', { opacity: 0, y: REVEAL.md });
      gsap.set('.hero-btn', { opacity: 0, scale: 0.8, x: -REVEAL.sm });
      gsap.set('.hero-bullets', { opacity: 0, y: REVEAL.sm });

      gsap.set('.hero-video-card', {
        opacity: 0,
        y: 30,
        scale: 0.98
      });

      // 2. Entrance Timeline (Paused on mount, played via trigger)
      tl = gsap.timeline({ paused: true });

      tl.to('.hero-eyebrow-text', {
        opacity: 1,
        y: 0,
        duration: DUR.fast,
        ease: EASE.out,
        clearProps: "willChange"
      });

      tl.to('.hero-title-line', {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: EASE.dramatic,
        stagger: STAGGER.base,
        force3D: true,
        clearProps: "all"
      }, "-=0.3");

      tl.to('.hero-text', {
        opacity: 1,
        y: 0,
        duration: DUR.base,
        ease: EASE.out,
        willChange: "transform, opacity",
        clearProps: "willChange"
      }, "-=0.6");

      tl.to('.hero-btn', {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: DUR.base,
        ease: EASE.snap,
        stagger: STAGGER.base,
        willChange: "transform, opacity",
        clearProps: "willChange"
      }, "-=0.8");

      tl.to('.hero-bullets', {
        opacity: 1,
        y: 0,
        duration: DUR.base,
        ease: EASE.out,
        stagger: STAGGER.tight,
        clearProps: "willChange"
      }, "-=0.6");

      tl.to('.hero-video-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DUR.slow,
        ease: EASE.dramatic,
        force3D: true,
        willChange: "transform, opacity",
        clearProps: "all"
      }, "-=0.8");

    }, el);

    // 3. Ultra-safe cinematic trigger
    const playHeroEntrance = () => {
      requestAnimationFrame(() => {
        if (tl && tl.paused()) tl.play();
      });
    };

    if ((window as any).epicareLoaderFinished) {
      playHeroEntrance();
    } else {
      window.addEventListener('epicareLoaderFinished', playHeroEntrance, { once: true });
    }

    // Safety fallback: if something fails or loader takes long, play after 5s
    const fallbackId = setTimeout(playHeroEntrance, 5000);

    return () => {
      window.removeEventListener('epicareLoaderFinished', playHeroEntrance);
      clearTimeout(fallbackId);
      ctx.revert();
    };
  }, []);

  return (
    <div id="hero-wrapper" className="w-full flex flex-col bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] relative overflow-x-hidden">
      
      {/* 2. Unified Hero Grid */}
      <section 
        ref={containerRef}
        id="hero-main-section" 
        className="relative w-full bg-[var(--color-surface-BG-base)] flex-1 px-gutter-sm lg:px-gutter-md pt-[calc(var(--space-section-md)+16px)] lg:pt-section-md pb-section-sm lg:pb-section-md"
      >
        <div className="mx-auto max-w-section-xl w-full grid-layout lg:min-h-[calc(100dvh-120px)] lg:grid-rows-[auto_auto_1fr] gap-y-static-md lg:gap-y-0">
          
          {/* Row 1: Eyebrow / Subtitle */}
          <div id="hero-eyebrow" className="col-span-12 lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-1 flex items-end pb-0 lg:pb-4 pt-0">
            <p id="eyebrow-text" className="hero-eyebrow-text text-ui-label text-[var(--color-text-secondary)]">
              {t('overline')}<span className="inline-block -translate-y-[4px]">&trade;</span>
            </p>
          </div>

          {/* Row 2: Heading */}
          <div id="hero-heading" className="col-span-12 lg:col-start-1 lg:col-span-6 lg:row-start-2 lg:row-span-1 flex items-start lg:pr-10">
            <h1 id="hero-title" className="text-display-xl text-[var(--color-text-primary)]">
              <span className="block overflow-hidden pb-1">
                <span className="hero-title-line block text-[var(--color-text-accent-blue)]">
                  {t('title1')}
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-title-line block">
                  {t('title2')}
                </span>
              </span>
            </h1>
          </div>

          {/* Row 3 (Desktop Row 2 Right): CTA Block */}
          <div id="hero-cta" className="col-span-12 lg:col-start-8 lg:col-span-4 lg:row-start-2 lg:row-span-1 flex flex-col items-start justify-start gap-fluid-xs">
            <p id="cta-subtitle" className="hero-text text-body-md text-[var(--color-text-secondary)]">
              {t.rich('description', {
                bold: (chunks) => <strong className="font-semibold text-[var(--color-text-primary)]">{chunks}</strong>
              })}
            </p>
            <button className="hero-btn bg-[var(--color-brand-blue)] text-[var(--color-surface-BG-base)] px-static-xl py-static-md rounded-xl text-ui-label w-fit hover:bg-opacity-90 transition-all flex justify-center items-center cursor-pointer">
              {t('cta')}
            </button>
          </div>

          {/* Row 4 (Desktop Row 3): Dark Panel / Video Showcase */}
          <div id="visual-panel-wrapper" className="col-span-12 lg:col-start-2 lg:col-span-11 lg:row-start-3 lg:row-span-1 w-full h-auto relative mt-6 lg:mt-6">
            
            <BleedRight className="relative w-full h-full">
              
              {/* Scroll Down Button (Desktop Only) */}
              <div className="absolute top-[140px] left-[-24px] -translate-x-full z-20 hidden lg:flex">
                <button 
                  onClick={() => {
                    const nextSection = document.getElementById("hero-wrapper")?.nextElementSibling;
                    if (nextSection) {
                      const top = nextSection.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                  className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[var(--color-brand-blue)] text-white shadow-elevation-2 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-elevation-4 active:scale-95 cursor-pointer"
                  aria-label="Scroll down"
                >
                  <div className="absolute inset-0 rounded-full border border-white/20 scale-100 group-hover:scale-[1.15] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                  <span className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="absolute w-5 h-5 transition-transform duration-[600ms] ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] group-hover:translate-y-10" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="absolute w-5 h-5 -translate-y-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] group-hover:translate-y-0" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                  </span>
                </button>
              </div>

              <div id="visual-panel" className="hero-video-card relative bg-[var(--color-surface-BG-1)] shadow-elevation-3 w-full h-auto flex items-center justify-center rounded-2xl lg:rounded-l-[16px] lg:rounded-r-none border border-[var(--color-border-Strokes-default)]/60 overflow-hidden p-0">
                
                {/* Media Editor (Video) */}
                <div id="hero-video" className="relative z-0 flex items-center justify-center w-full overflow-hidden rounded-2xl lg:rounded-l-[16px] lg:rounded-r-none h-auto">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    preload="auto"
                    className="w-full h-auto block object-contain rounded-2xl lg:rounded-l-[16px] lg:rounded-r-none"
                  >
                    <source src={asset("/Files/Go_AMS/Hero/go_ams_hero.mp4")} type="video/mp4" />
                  </video>
                  {/* Textura de ruido optimizada */}
                  <div className="absolute inset-0 bg-noise pointer-events-none z-10 mix-blend-overlay opacity-80 rounded-2xl lg:rounded-l-[16px] lg:rounded-r-none" />
                </div>

              </div>
            </BleedRight>
          </div>

          {/* Row 5: Mobile Bullets (Mobile Only) */}
          <div id="mobile-bullets" className="col-span-12 flex lg:hidden flex-row items-start justify-between gap-fluid-sm pt-2">
            <div className="hero-bullets flex gap-2 items-start w-1/2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] mt-1.5 flex-shrink-0"></div>
              <p className="text-caption text-[var(--color-text-muted)]">
                {t('bullet1')}
              </p>
            </div>
            <div className="hero-bullets flex gap-2 items-start w-1/2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] mt-1.5 flex-shrink-0"></div>
              <p className="text-caption text-[var(--color-text-muted)]">
                {t('bullet2')}
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
