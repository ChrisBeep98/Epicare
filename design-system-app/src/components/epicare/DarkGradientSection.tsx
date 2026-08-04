"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { asset } from "@/lib/asset";
import SmartVideo from "./SmartVideo";

gsap.registerPlugin(ScrollTrigger);

const FlipCard = ({ card, t }: { card: any, t: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="card-reveal opacity-0 shrink-0 w-[80vw] md:w-auto min-h-[440px] md:min-h-[492px] group cursor-pointer"
      style={{ perspective: '1500px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className="relative w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* FRONT */}
        <div 
          className="absolute inset-0 w-full h-full flex flex-col rounded-[8px] bg-white dark:bg-white/[0.03] backdrop-blur-xl border border-[var(--color-border-Strokes-default)] dark:border-white/10 hover:border-[var(--color-border-Strokes-Hover)] dark:hover:border-white/20 transition-all duration-500 shadow-[var(--shadow-elevation-2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[var(--shadow-elevation-4)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Bloque de Texto Superior (Sin body) */}
          <div className="flex flex-col p-[14px] md:p-6 w-full gap-3 text-left">
            <span className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[var(--color-brand-blue)] font-medium">
              {card.step}
            </span>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-h2 text-[var(--color-text-Black-100)] dark:text-white leading-tight tracking-tight transition-colors duration-500 pr-4">
                {card.title}
              </h3>
            </div>
          </div>

          {/* Contenedor Visual (Medio, flex-1, Transparente) */}
          <div className="w-full flex-1 min-h-[220px] relative bg-transparent overflow-hidden transition-colors duration-500 rounded-b-[8px]">
            {/* Elemento para Light Mode */}
            {card.isVideo || card.isVideoLight ? (
              <SmartVideo
                disablePictureInPicture
                src={asset((card.imgLight || card.img).startsWith('/') ? (card.imgLight || card.img) : `/Files/Epicare_Landing/Features/${card.imgLight || card.img}`)}
                className={`absolute inset-0 w-full h-full block dark:hidden ${card.imgClassLight || card.imgClass || "object-cover"}`}
                style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)' }}
              />
            ) : (
              <img 
                src={asset((card.imgLight || card.img).startsWith('/') ? (card.imgLight || card.img) : `/Files/Epicare_Landing/Features/${card.imgLight || card.img}`)}
                alt={card.title}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full opacity-90 block dark:hidden ${card.imgClass || "object-contain p-6"}`} 
              />
            )}

            {/* Elemento para Dark Mode */}
            {card.isVideo || card.isVideoDark ? (
              <SmartVideo
                disablePictureInPicture
                src={asset(card.img.startsWith('/') ? card.img : `/Files/Epicare_Landing/Features/${card.img}`)}
                className={`absolute inset-0 w-full h-full hidden dark:block ${card.imgClassDark || card.imgClass || "object-cover"}`}
                style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)' }}
              />
            ) : (
              <img 
                src={asset(card.img.startsWith('/') ? card.img : `/Files/Epicare_Landing/Features/${card.img}`)}
                alt={card.title}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full opacity-90 hidden dark:block ${card.imgClassDark || card.imgClass || "object-contain p-6"}`} 
              />
            )}
            
            {/* Footer Overlay: Label (Left) and Icon (Right) */}
            <div className="absolute bottom-5 right-5 flex items-center justify-end gap-2 z-20 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500">
               {/* Raw Label (sin pill) */}
               <span className="text-[10px] md:text-[11px] text-[var(--color-text-Black-100)] dark:text-white uppercase tracking-[0.1em] font-semibold mt-[2px]">
                  {t('tiltCard')}
               </span>
               
               {/* Animated Spinning Icon */}
               <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-[var(--color-border-Strokes-default)] dark:border-white/10 flex items-center justify-center text-[var(--color-text-Black-100)] dark:text-white group-hover:bg-[var(--color-brand-blue)] group-hover:text-white group-hover:border-[var(--color-brand-blue)] transition-all duration-500 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 animate-[spin_6s_linear_infinite]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
               </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div 
          className="absolute inset-0 w-full h-full flex flex-col items-start justify-start p-6 md:p-8 rounded-[8px] bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-2)] backdrop-blur-xl border border-[var(--color-border-Strokes-default)] dark:border-white/10 shadow-[var(--shadow-elevation-3)] overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
           <p className="text-body text-[var(--color-text-Black-100)]/80 dark:text-white/70 font-light leading-relaxed text-left">
              {card.body}
           </p>
           {/* Boton volver animado (Flechas de retorno) - Bottom Right */}
           <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[var(--color-text-Black-100)] dark:text-white/80 hover:bg-[var(--color-brand-blue)] hover:text-white transition-colors duration-300 shadow-sm cursor-pointer hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 animate-[spin_6s_linear_infinite]">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
           </div>
        </div>
      </div>
    </div>
  );
};

export default function DarkGradientSection() {
  const t = useTranslations('landingV2.darkGradient');
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Standard Header Entrance (Hardware Optimized)
      gsap.fromTo('.dg-head-line', { yPercent: 118, willChange: 'transform' },
        { yPercent: 0, duration: 1.15, stagger: 0.12, ease: 'power4.out', clearProps: 'willChange',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none reverse' } });
      gsap.fromTo('.dg-head-fade', { opacity: 0, y: 26, willChange: 'transform, opacity' },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'willChange',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });

      // Hardware Symphony: Pure GPU reveal (opacity + transform only). No filter: blur() to prevent mobile scroll lag.
      gsap.fromTo(".card-reveal", 
        { opacity: 0, y: 40, scale: 0.97, willChange: 'transform, opacity' },
        {
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          force3D: true, // Offloads composition strictly to GPU
          clearProps: 'willChange',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderRichBody = (key: any) => t.rich(key, { 
    b: (chunks) => <span className="font-semibold text-[var(--color-text-Black-100)] dark:text-white">{chunks}</span> 
  });

  const features = [
    { 
      step: t('feature1_step'), 
      title: t('feature1_title'), 
      subtitle: t('feature1_subtitle'), 
      body: renderRichBody('feature1_body'),
      img: "Card_01_INNOVATION-Dark.mp4",
      imgLight: "Innovation_card_Light.mp4",
      isVideo: true,
      imgClassDark: "object-cover scale-[1.15] origin-top"
    },
    { 
      step: t('feature2_step'), 
      title: t('feature2_title'), 
      subtitle: t('feature2_subtitle'), 
      body: renderRichBody('feature2_body'),
      img: "support_dark.mp4",
      imgLight: "Card 2_Support_light.mp4",
      isVideo: true,
      imgClass: "object-cover",
      imgClassDark: "object-contain scale-[1.4]"
    },
    { 
      step: t('feature3_step'), 
      title: t('feature3_title'), 
      subtitle: t('feature3_subtitle'), 
      body: renderRichBody('feature3_body'),
      img: "Earnings_V3_Dark.mp4",
      imgLight: "Earnings_V3_Ligh.mp4",
      isVideo: true,
      imgClass: "object-cover",
      imgClassLight: "object-contain scale-[1.4]",
      imgClassDark: "object-contain scale-[1.6]"
    },
    { 
      step: t('feature4_step'), 
      title: t('feature4_title'), 
      subtitle: t('feature4_subtitle'), 
      body: renderRichBody('feature4_body'),
      img: "Variety_dark.mp4",
      imgLight: "Variety_light.mp4",
      isVideo: true,
      imgClass: "object-cover"
    }
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const index = Math.round(scrollLeft / (container.scrollWidth / features.length));
    setActiveIndex(index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] pt-0 pb-section-sm md:pb-section-md z-20 overflow-hidden transition-colors duration-500 px-[14px] md:px-[clamp(1.5rem,4vw,3.5rem)]"
    >
      <div className="max-w-section-lg mx-auto w-full">
        
        <div className="relative w-full min-h-0 h-auto md:min-h-[75vh] rounded-[12px] border border-[var(--color-border-Strokes-default)] overflow-hidden flex flex-col justify-center items-start md:items-center text-left md:text-center px-[14px] pt-7 pb-12 md:p-12 lg:p-16 bg-transparent transition-colors duration-500">
          


          {/* Resplandor Azul (Dark Mode - Brand Blue Original) */}
          <div 
            className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[120%] md:w-[100%] h-[150%] opacity-50 z-0 pointer-events-none blur-[150px] transform-gpu transition-opacity duration-500 hidden dark:block"
            style={{
              background: "radial-gradient(circle at top, var(--color-brand-blue) 0%, rgba(5,72,235, 0.40) 25%, transparent 55%)"
            }}
          />

          {/* Contenido Central (Clases Congeladas - Purga Fase 2) */}
          <div className="relative z-10 flex flex-col items-start md:items-center gap-6 md:gap-8 max-w-4xl w-full md:mx-auto pb-5 md:pb-8">
            
            <h2 className="overflow-hidden pb-static-xs text-display text-left md:text-center text-[var(--color-text-Black-100)] dark:text-white tracking-tighter leading-[1.05] transition-colors duration-500">
              <span className="dg-head-line block">
                {t.rich('sectionTitle', {
                  span: (chunks) => <span className="text-[var(--color-brand-blue)]">{chunks}</span>
                })}
              </span>
            </h2>

            <p className="hidden md:block dg-head-fade text-body text-left md:text-center text-[var(--color-text-Black-100)]/70 dark:text-white/70 max-w-2xl font-light transition-colors duration-500">
              {t('sectionDesc')}
            </p>

          </div>

          {/* Grid de Cards: Liquid Glass Edge-to-Edge */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="relative z-10 flex md:grid md:grid-cols-4 overflow-x-auto overflow-y-hidden md:overflow-x-visible md:overflow-y-visible scrollbar-none gap-[14px] md:gap-fluid-xs w-[calc(100%+28px)] md:w-full md:mt-12 md:perspective-[1000px] py-12 md:py-0 -my-12 md:my-0 -mx-[14px] md:mx-0 px-[14px] md:px-0"
          >
            {features.map((card, idx) => (
              <FlipCard key={idx} card={card} t={t} />
            ))}
          </div>

          {/* Dots Indicator (Mobile Only) */}
          <div className="flex md:hidden justify-center gap-2 mt-6 z-10">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const container = scrollContainerRef.current;
                    const targetCard = container.children[idx] as HTMLElement;
                    if (targetCard) {
                      // Usar GSAP para animar el scroll horizontal de manera ultra-suave
                      gsap.to(container, {
                        scrollLeft: targetCard.offsetLeft - 14,
                        duration: 0.6,
                        ease: "power2.out"
                      });
                    }
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'bg-[var(--color-brand-blue)] w-4' 
                    : 'bg-black/15 dark:bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
        </div>
      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
