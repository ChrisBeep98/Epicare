"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import { DeviceMobile, Link, Mouse, QrCode, ArrowUpRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER, REVEAL, TRIGGER } from "@/lib/motion";

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
      icon: <DeviceMobile weight="duotone" className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--color-text-primary)]" />
    },
    {
      id: "02",
      title: t('card2Title'),
      desc: t('card2Desc'),
      icon: <Link weight="duotone" className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--color-text-primary)]" />
    },
    {
      id: "03",
      title: t('card3Title'),
      desc: t('card3Desc'),
      icon: <Mouse weight="duotone" className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--color-text-primary)]" />
    },
    {
      id: "04",
      title: t('card4Title'),
      desc: t('card4Desc'),
      icon: <QrCode weight="duotone" className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--color-text-primary)]" />
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
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)"
        });
        return;
      }

      // 1. Título con Line-by-Line Clip (Arquetipo 2: Section Reveal)
      gsap.fromTo(
        ".qw-title-line",
        { yPercent: REVEAL.birthPercent, opacity: 0, clipPath: "inset(0% 0% 100% 0%)", willChange: "transform, opacity, clip-path" },
        {
          yPercent: 0,
          opacity: 1,
          clipPath: "inset(-20% -10% -20% -10%)",
          duration: 0.8,
          stagger: STAGGER.base,
          ease: EASE.dramatic,
          clearProps: "clipPath,willChange",
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
        gsap.fromTo(
          validCards,
          { 
            y: REVEAL.md, 
            opacity: 0,
            scale: 0.97,
            willChange: "transform, opacity"
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: DUR.base,
            stagger: STAGGER.wave,
            ease: EASE.out,
            force3D: true,
            clearProps: "willChange",
            scrollTrigger: {
              trigger: el,
              start: TRIGGER.standard,
              toggleActions: "play none none reverse"
            }
          }
        );
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
            <span className="qw-title-line block">{t('title1')}</span>
            <span className="qw-title-line block text-[var(--color-text-accent-blue)]">
              {t('title2')}
            </span>
          </h2>
          <p className="qw-subtitle text-body-md md:text-body-lg text-[var(--color-text-secondary)] max-w-sm text-left">
            {t('subtitle')}
          </p>
        </div>

        {/* CARDS: SCROLL HORIZONTAL EN MOBILE / GRID EN DESKTOP */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-[var(--spacing-static-sm)] overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-gutter-sm px-gutter-sm md:mx-0 md:px-0 py-2"
        >
          {features.map((feature, idx) => (
            <div 
              key={feature.id}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="qw-card group relative z-10 flex flex-col justify-between p-5 sm:p-static-lg min-h-[300px] sm:min-h-[320px] w-[82vw] max-w-[340px] md:w-auto shrink-0 snap-center md:shrink rounded-[2rem] border border-[var(--color-border-Strokes-strong)]/20 shadow-elevation-3 overflow-hidden transform md:hover:-translate-y-2 transition-transform duration-300 cursor-pointer select-none"
            >
              {/* STATIC BACKGROUND LAYER (Glassmorphism) */}
              <div className="absolute inset-0 -z-10 rounded-[2rem]">
                <div className="absolute inset-0 bg-[var(--color-surface-BG-1)]/40 backdrop-blur-[24px]" />
                <div className="absolute inset-0 bg-[var(--color-surface-BG-2)]/20 backdrop-blur-[20px] saturate-[1.5]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* CONTENT LAYER */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4 sm:mb-static-lg">
                    <div className="p-2.5 sm:p-static-sm bg-[var(--color-surface-BG-3)]/60 rounded-2xl border border-[var(--color-border-Strokes-base)]/30 shadow-elevation-1">
                      {feature.icon}
                    </div>
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

                {/* Interaction Element */}
                <div className="flex w-full justify-end mt-4 sm:mt-static-md">
                  <ArrowUpRight 
                    weight="bold" 
                    className="text-[var(--color-text-primary)] w-5 h-5 sm:w-6 sm:h-6 opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-text-accent-blue)]" 
                  />
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
