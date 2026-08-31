"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER, TRIGGER } from "@/lib/motion";
import { asset } from "@/lib/asset";

// --- ANIMATED SCENE ARCHITECT: Ultra Minimalist Illustrations ---
const IllusLink = () => (
  <div className="relative w-16 h-16 rounded-2xl bg-[var(--color-surface-BG-3)]/60 border border-[var(--color-border-Strokes-base)]/30 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-elevation-1 group-hover:border-[var(--color-brand-blue)]/40">
    <div className="absolute inset-0 bg-gradient-to-tl from-[var(--color-brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative flex items-center justify-center rotate-45 transition-transform duration-700 group-hover:scale-110">
      <div className="w-6 h-3.5 border-[1.5px] border-[var(--color-text-primary)]/30 rounded-full -mr-2 transition-all duration-500 group-hover:-translate-x-1 group-hover:border-[var(--color-text-primary)]/50" />
      <div className="w-6 h-3.5 border-[1.5px] border-[var(--color-brand-blue)]/80 rounded-full -ml-2 transition-all duration-500 group-hover:translate-x-1" />
    </div>
  </div>
);

const IllusDesktop = () => (
  <div className="relative w-16 h-16 rounded-2xl bg-[var(--color-surface-BG-3)]/60 border border-[var(--color-border-Strokes-base)]/30 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-elevation-1 group-hover:border-[var(--color-brand-blue)]/40">
    <div className="absolute inset-0 bg-gradient-to-bl from-[var(--color-brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[2px] opacity-10">
         {[...Array(9)].map((_, i) => <div key={i} className="bg-[var(--color-text-primary)] rounded-[1px]" />)}
      </div>
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[var(--color-text-primary)]/40 group-hover:text-[var(--color-text-primary)] transition-all duration-700 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 relative z-10">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="var(--color-brand-blue)" fillOpacity="0.2"/>
      </svg>
    </div>
  </div>
);

const IllusMobile = () => (
  <div className="relative w-16 h-16 rounded-2xl bg-[var(--color-surface-BG-3)]/60 border border-[var(--color-border-Strokes-base)]/30 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 shadow-elevation-1 group-hover:border-[var(--color-brand-blue)]/40">
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative w-7 h-10 border-[1.5px] border-[var(--color-text-primary)]/30 rounded-md flex flex-col items-center justify-between py-[4px] transition-transform duration-700 group-hover:-translate-y-1">
      <div className="w-3 h-[1px] bg-[var(--color-text-primary)]/30 rounded-full" />
      <div className="flex items-end gap-[2px] mb-px">
        {[5, 9, 4, 7, 5].map((h, i) => (
          <div key={i} className="w-[1.5px] bg-[var(--color-brand-blue)]/80 rounded-full animate-pulse" style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  </div>
);

const IllusSalesforce = () => (
  <div className="relative w-16 h-16 rounded-2xl bg-[var(--color-surface-BG-3)]/60 border border-[var(--color-border-Strokes-base)]/30 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-elevation-1 group-hover:border-[var(--color-brand-blue)]/40">
    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[var(--color-text-primary)]/40 group-hover:text-[var(--color-brand-blue)] transition-colors duration-500">
            <path d="M7 16a4 4 0 0 1-.88-7.9c.41-4.04 4.54-5.95 7.6-3.8 2.37-1.63 5.42-.51 5.92 2.7A4 4 0 0 1 17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
            <path d="M12 12v9m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
  </div>
);

export default function QuoteEnroll() {
  const t = useTranslations('goAms.quoteWays');
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const features = [
    { id: "01", title: t('card1Title'), desc: t('card1Desc'), icon: <IllusLink /> },
    { id: "02", title: t('card2Title'), desc: t('card2Desc'), icon: <IllusDesktop /> },
    { id: "03", title: t('card3Title'), desc: t('card3Desc'), icon: <IllusMobile /> },
    { id: "04", title: t('card4Title'), desc: t('card4Desc'), icon: <IllusSalesforce /> }
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const el = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const track = trackRef.current;
    if (!el || !pinWrapper || !track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".qw-reveal, .qw-card, .qw-aura", { opacity: 1, y: 0, yPercent: 0, scale: 1 });
        return;
      }

      // 1. Initial Reveal of Centered Text Content
      gsap.fromTo(
        ".qw-reveal",
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: DUR.base,
          stagger: STAGGER.base,
          ease: EASE.out,
          scrollTrigger: {
            trigger: pinWrapper,
            start: TRIGGER.standard,
            toggleActions: "play none none reverse"
          }
        }
      );

      // 2. Aura Parallax
      gsap.to(".qw-aura", {
        yPercent: 15,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      const mm = gsap.matchMedia(el);

      // DESKTOP: PIN & HORIZONTAL SCROLL OVER CENTERED TEXT
      mm.add("(min-width: 1024px)", () => {
        // Track width relative to viewport
        const scrollWidth = track.scrollWidth;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapper,
            start: "center center",
            end: () => `+=${scrollWidth}`, 
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const total = features.length;
              
              // Parallax on the giant numbers inside cards for memorable detail
              gsap.utils.toArray('.card-bg-number').forEach((num: any, i) => {
                 const cardProgress = (progress * total) - i;
                 gsap.set(num, { x: cardProgress * -30 }); 
              });
              
              // Fade out the title slightly as the cards cover it
              gsap.to(".qw-center-content", {
                 opacity: 1 - (progress * 1.5),
                 scale: 1 - (progress * 0.05),
                 ease: "none",
                 duration: 0.1
              });
            }
          }
        });

        // The horizontal move. Move from left: 85vw all the way to off-screen left.
        // We move exactly the track's scrollWidth + 20vw to ensure it clears the screen.
        tl.to(track, {
          x: () => -(scrollWidth + window.innerWidth * 0.2), 
          ease: "none"
        });

        // Cards entrance animation
        gsap.fromTo(
          ".qw-card",
          { opacity: 0, x: 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: EASE.out,
            scrollTrigger: {
              trigger: pinWrapper,
              start: "top 60%",
            }
          }
        );
      });

      // MOBILE: NATIVE SNAP SCROLL
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".qw-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: DUR.base,
            stagger: STAGGER.wave,
            ease: EASE.out,
            scrollTrigger: {
              trigger: track,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, el);

    return () => ctx.revert();
  }, [features.length]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[var(--color-surface-BG-base)]">
      
      {/* PIN WRAPPER */}
      <div 
        ref={pinWrapperRef} 
        className="w-full flex flex-col items-center justify-center relative overflow-hidden lg:h-screen lg:py-0 py-section-md"
      >
        
        {/* LAYER 0: IMMERSIVE BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[var(--color-surface-BG-base)]">
          <div className="qw-aura absolute inset-0 w-full h-full opacity-60 dark:opacity-40 mix-blend-screen dark:mix-blend-plus-lighter transform scale-110 origin-bottom">
            <img 
              src={asset("/landing/go-ams/quote_enroll_aura.jpg")} 
              alt="Abstract Aura Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface-BG-base)] via-transparent to-[var(--color-surface-BG-base)]" />
        </div>

        {/* CENTERED CONTENT (Title & Subtitle) */}
        <div className="qw-center-content w-full px-gutter-sm md:px-gutter-md z-10 flex flex-col items-center lg:absolute lg:top-1/2 lg:-translate-y-1/2 pointer-events-none">
          
          <div className="w-full max-w-3xl mx-auto flex flex-col items-start text-left">
            <div className="overflow-hidden mb-6">
              <div className="qw-reveal inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--color-brand-blue)]/20 bg-[var(--color-brand-blue)]/5 backdrop-blur-md">
                 <div className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] animate-pulse" />
                 <span className="text-body-sm font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
                   Plataforma Unificada
                 </span>
              </div>
            </div>

            <div className="overflow-hidden mt-2">
              <h2 className="qw-reveal text-h2 md:text-display lg:text-display-lg font-bold tracking-tight leading-[1.05]">
                <span className="text-[var(--color-text-primary)]">{t('title1')}</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-brand-blue)] to-blue-400">{t('title2')}</span>
              </h2>
            </div>
          </div>
        </div>

        {/* SCROLLING TRACK (Cards) */}
        {/* On Desktop: Positioned absolute starting at 80vw so only the tip of card 1 is visible initially */}
        <div className="w-full lg:w-max h-auto lg:h-[70vh] relative lg:absolute lg:left-[80vw] flex items-center mt-10 lg:mt-0 z-20">
          
          <div 
            ref={trackRef} 
            className="flex gap-4 md:gap-fluid-sm lg:gap-fluid-md items-stretch lg:items-center w-full lg:w-max px-gutter-sm md:px-gutter-md lg:px-0 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-none py-6 lg:py-0"
          >
            {features.map((feature, idx) => (
              <div 
                key={feature.id}
                className="qw-card relative w-[85vw] max-w-[360px] lg:w-[420px] shrink-0 snap-center rounded-[2.5rem] border border-[var(--color-border-Strokes-strong)]/20 shadow-elevation-3 hover:shadow-elevation-5 overflow-hidden group select-none transition-transform duration-700 hover:-translate-y-4"
              >
                {/* GLASS BACKGROUND LAYER */}
                <div className="absolute inset-0 -z-10 bg-[var(--color-surface-BG-1)]/50 dark:bg-black/40 backdrop-blur-[24px]" />
                <div className="absolute inset-0 -z-10 bg-white/30 dark:bg-white/5 backdrop-blur-[16px] saturate-[1.5]" />
                <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-b from-white/40 to-transparent dark:from-white/10 opacity-70 pointer-events-none" />

                {/* HUGE NUMBER */}
                <div className="card-bg-number absolute -bottom-10 -right-8 text-[14rem] leading-none font-display font-bold text-[var(--color-text-primary)] opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none z-0 transition-colors duration-500 group-hover:text-[var(--color-brand-blue)]">
                  {feature.id}
                </div>

                {/* HOVER AURA */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-brand-blue)]/15 blur-[50px] rounded-full translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col h-full justify-between p-8 lg:p-12 min-h-[400px] lg:min-h-[500px]">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      {feature.icon}
                      <div className="flex gap-1.5 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-Strokes-strong)]/40 group-hover:bg-[var(--color-brand-blue)]/40 transition-colors duration-500 delay-100" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-Strokes-strong)]/40 group-hover:bg-[var(--color-brand-blue)]/70 transition-colors duration-500 delay-200" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-Strokes-strong)]/40 group-hover:bg-[var(--color-brand-blue)] transition-colors duration-500 delay-300" />
                      </div>
                    </div>
                    <h3 className="text-h2 text-[var(--color-text-primary)] mb-4 font-semibold tracking-tight leading-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-body-md text-[var(--color-text-secondary)] leading-relaxed relative">
                    <span className="absolute -left-4 lg:-left-6 top-1 bottom-1 w-[2px] bg-[var(--color-border-Strokes-strong)]/20 rounded-full overflow-hidden">
                       <span className="absolute inset-0 bg-[var(--color-brand-blue)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out" />
                    </span>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
