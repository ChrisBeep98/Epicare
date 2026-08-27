"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import { DeviceMobile, Link, Mouse, QrCode } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER, REVEAL, TRIGGER } from "@/lib/motion";
import { asset } from "@/lib/asset";

// --- ANIMATED SCENE ARCHITECT: Ultra Minimalist Illustrations ---

// 1. App/Mobile (DeviceMobile)
const IllusMobile = () => (
  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--color-surface-BG-3)]/60 border border-[var(--color-border-Strokes-base)]/30 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 shadow-elevation-1 group-hover:border-[var(--color-brand-blue)]/40">
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative w-6 h-9 border-[1px] border-[var(--color-text-primary)]/30 rounded-md flex flex-col items-center justify-between py-[3px] transition-transform duration-700 group-hover:-translate-y-0.5">
      <div className="w-2.5 h-[1px] bg-[var(--color-text-primary)]/30 rounded-full" />
      <div className="flex items-end gap-[1.5px] mb-px">
        {[4, 7, 3, 6, 4].map((h, i) => (
          <div key={i} className="w-[1.5px] bg-[var(--color-brand-blue)]/80 rounded-full animate-pulse" style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  </div>
);

// 2. Shareable Link (Link)
const IllusLink = () => (
  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--color-surface-BG-3)]/60 border border-[var(--color-border-Strokes-base)]/30 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-elevation-1 group-hover:border-[var(--color-brand-blue)]/40">
    <div className="absolute inset-0 bg-gradient-to-tl from-[var(--color-brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative flex items-center justify-center rotate-45 transition-transform duration-700 group-hover:scale-105">
      <div className="w-5 h-3 border-[1.5px] border-[var(--color-text-primary)]/30 rounded-full -mr-1.5 transition-all duration-500 group-hover:-translate-x-0.5 group-hover:border-[var(--color-text-primary)]/50" />
      <div className="w-5 h-3 border-[1.5px] border-[var(--color-brand-blue)]/80 rounded-full -ml-1.5 transition-all duration-500 group-hover:translate-x-0.5" />
    </div>
  </div>
);

// 3. Web Portal (Mouse)
const IllusDesktop = () => (
  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--color-surface-BG-3)]/60 border border-[var(--color-border-Strokes-base)]/30 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-elevation-1 group-hover:border-[var(--color-brand-blue)]/40">
    <div className="absolute inset-0 bg-gradient-to-bl from-[var(--color-brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[1.5px] opacity-5">
         {[...Array(9)].map((_, i) => <div key={i} className="bg-[var(--color-text-primary)] rounded-[1px]" />)}
      </div>
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-text-primary)]/40 group-hover:text-[var(--color-text-primary)] transition-all duration-700 -translate-x-1.5 translate-y-1.5 group-hover:-translate-x-0 group-hover:translate-y-0 relative z-10">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="var(--color-brand-blue)" fillOpacity="0.2"/>
      </svg>
      <div className="absolute bottom-2.5 left-2.5 w-1.5 h-[1.5px] bg-[var(--color-brand-blue)]/60 -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150" />
    </div>
  </div>
);

// 4. QR Scan (QrCode)
const IllusQR = () => (
  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--color-surface-BG-3)]/60 border border-[var(--color-border-Strokes-base)]/30 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-elevation-1 group-hover:border-[var(--color-brand-blue)]/40">
    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-700 group-hover:scale-105">
      <div className="absolute top-0 left-0 w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-[var(--color-text-primary)]/30 rounded-tl-[2px]" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-[var(--color-text-primary)]/30 rounded-tr-[2px]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[1.5px] border-l-[1.5px] border-[var(--color-text-primary)]/30 rounded-bl-[2px]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-[var(--color-text-primary)]/30 rounded-br-[2px]" />
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[var(--color-brand-blue)] shadow-[0_0_8px_var(--color-brand-blue)] animate-[ping_2.5s_ease-in-out_infinite] opacity-30 group-hover:opacity-100 group-hover:animate-none group-hover:translate-y-6 transition-all duration-1000" />
      <div className="absolute top-1.5 left-1.5 w-[3px] h-[3px] bg-[var(--color-brand-blue)]/70 rounded-[1px]" />
      <div className="absolute bottom-1.5 right-1.5 w-[3px] h-[3px] bg-[var(--color-text-primary)]/20 rounded-[1px]" />
    </div>
  </div>
);

export default function QuoteEnroll() {
  const t = useTranslations('goAms.quoteWays');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      id: "01",
      title: t('card1Title'),
      desc: t('card1Desc'),
      icon: <IllusMobile />
    },
    {
      id: "02",
      title: t('card2Title'),
      desc: t('card2Desc'),
      icon: <IllusLink />
    },
    {
      id: "03",
      title: t('card3Title'),
      desc: t('card3Desc'),
      icon: <IllusDesktop />
    },
    {
      id: "04",
      title: t('card4Title'),
      desc: t('card4Desc'),
      icon: <IllusQR />
    }
  ];

  // Listener para el scroll horizontal en mobile
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const firstCard = cardsRef.current[0];
    const cardWidth = firstCard ? firstCard.offsetWidth + 14 : container.clientWidth * 0.82;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), features.length - 1));
  };

  const scrollToCard = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".qw-title-line, .qw-subtitle, .qw-card", {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1
        });
        return;
      }

      // 1. Título con GPU Transform Reveal (Arquetipo 2: Section Reveal)
      gsap.fromTo(
        ".qw-title-line",
        { yPercent: 120, opacity: 0, willChange: "transform, opacity" },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: STAGGER.base,
          ease: EASE.dramatic,
          force3D: true,
          clearProps: "all",
          scrollTrigger: {
            trigger: el,
            start: TRIGGER.standard,
            toggleActions: "play none none reverse"
          }
        }
      );

      // 2. Subtítulo suave
      gsap.fromTo(
        ".qw-subtitle",
        { opacity: 0, y: REVEAL.md, willChange: "transform, opacity" },
        {
          opacity: 1,
          y: 0,
          duration: DUR.base,
          ease: EASE.out,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: el,
            start: TRIGGER.standard,
            toggleActions: "play none none reverse"
          }
        }
      );

      // 3. Tarjetas con Wave Stagger (Arquetipo 3: Cards)
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        const mm = gsap.matchMedia(el);

        // Desktop: Stagger individual cards with scale (safe because grid has no snap scroll)
        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(
            validCards,
            {
              opacity: 0,
              y: REVEAL.md,
              scale: 0.98,
              willChange: "transform, opacity"
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: DUR.base,
              stagger: STAGGER.wave,
              ease: EASE.out,
              force3D: true,
              clearProps: "willChange",
              scrollTrigger: {
                trigger: el,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // Mobile: Animate the ENTIRE scroll wrapper to avoid breaking native CSS snap physics
        mm.add("(max-width: 767px)", () => {
          if (scrollContainerRef.current) {
            gsap.fromTo(
              scrollContainerRef.current,
              { opacity: 0, y: 15, willChange: "transform, opacity" },
              {
                opacity: 1,
                y: 0,
                duration: DUR.base,
                ease: EASE.out,
                force3D: true,
                clearProps: "all",
                scrollTrigger: {
                  trigger: el,
                  start: "top 75%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full pt-0 pb-section-md overflow-hidden z-10 bg-[var(--color-surface-BG-base)]"
    >
      {/* WRAPPER CON MARGEN RESPONSIVE UNIFICADO */}
      <div className="relative z-20 mx-auto w-full px-gutter-sm md:px-gutter-md max-w-section-xl">
        
        {/* Título & Subtítulo Alineados */}
        <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-static-lg md:mb-static-xl gap-4 md:gap-fluid-md">
          <h2 className="text-display-lg font-semibold text-[var(--color-text-primary)] tracking-tight leading-[1.05] max-w-2xl text-left">
            <span className="block overflow-hidden pb-2">
              <span className="qw-title-line block">
                {t('title1')} <span className="text-[var(--color-text-accent-blue)]">{t('title2')}</span>
              </span>
            </span>
          </h2>
          <p className="qw-subtitle text-body-md md:text-body-lg text-[var(--color-text-secondary)] max-w-sm text-left">
            {t('subtitle')}
          </p>
        </div>

        {/* CARDS: SCROLL HORIZONTAL EN MOBILE / GRID EN DESKTOP (TILES CON AURA PANORÁMICA INTERNA) */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-[var(--spacing-static-sm)] overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-gutter-sm px-gutter-sm md:mx-0 md:px-0 py-2"
        >
          {features.map((feature, idx) => (
            <div 
              key={feature.id}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="qw-card relative z-10 flex flex-col justify-between p-5 sm:p-static-lg min-h-[300px] sm:min-h-[320px] w-[82vw] max-w-[340px] md:w-auto shrink-0 snap-center md:shrink rounded-[2rem] border border-[var(--color-border-Strokes-strong)]/20 shadow-elevation-2 overflow-hidden select-none"
            >
              {/* STATIC BACKGROUND LAYER (Panoramic Aura Slice - Estricto dentro de la card) */}
              <div className="absolute inset-0 -z-10 rounded-[2rem] overflow-hidden pointer-events-none">
                {/* Sliced slice of the shared panoramic aura (Desktop: 4-column span, Mobile: standalone) */}
                <img 
                  src={asset('/Files/Backgrounds/epicare_bg_aura_blue.jpg')} 
                  alt="" 
                  className="absolute top-0 left-0 md:left-[var(--tile-offset)] h-full w-full md:w-[400%] max-w-none object-cover pointer-events-none"
                  style={{ 
                    '--tile-offset': `${-idx * 100}%`,
                    opacity: 0.30,
                    filter: 'hue-rotate(31deg)',
                    transform: 'scale(1.22)'
                  } as React.CSSProperties}
                />
                
                {/* Clean Frosted Glass Refraction */}
                <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-[24px] saturate-[1.4] pointer-events-none" />
              </div>

              {/* CONTENT LAYER */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4 sm:mb-static-lg">
                    {feature.icon}
                    <span className="text-h3 text-[var(--color-text-muted)] opacity-35 font-mono font-medium">
                      {feature.id}
                    </span>
                  </div>
                  
                  <h3 className="text-h4 text-[var(--color-text-primary)] mb-2 sm:mb-static-sm font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE PAGINATION DOTS */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-5">
          {features.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-6 h-1.5 bg-[var(--color-brand-blue)] shadow-[0_0_8px_rgba(53,187,253,0.6)]"
                    : "w-1.5 h-1.5 bg-[var(--color-border-Strokes-strong)]/40 hover:bg-[var(--color-border-Strokes-strong)]"
                }`}
              />
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
