"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function DarkGradientSection() {
  const t = useTranslations('landingV2.darkGradient');
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium 3D Blur Reveal
      gsap.fromTo(".fade-up", 
        { opacity: 0, y: 60, rotationX: 15, scale: 0.9, filter: "blur(8px)" },
        {
          opacity: 1, 
          y: 0,
          rotationX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 98%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { 
      step: t('feature1_step'), 
      title: t('feature1_title'), 
      subtitle: t('feature1_subtitle'), 
      body: t('feature1_body'),
      img: "Card_01_INNOVATION-Dark.mp4",
      imgLight: "Innovation_card_Light.mp4",
      isVideo: true,
      imgClassDark: "object-cover scale-[1.15] origin-top"
    },
    { 
      step: t('feature2_step'), 
      title: t('feature2_title'), 
      subtitle: t('feature2_subtitle'), 
      body: t('feature2_body'),
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
      body: t('feature3_body'),
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
      body: t('feature4_body'),
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
      className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] py-section-sm md:py-section-lg z-20 overflow-hidden transition-colors duration-500 px-[14px] md:px-[clamp(1.5rem,4vw,3.5rem)]"
    >
      <div className="max-w-section-lg mx-auto w-full">
        
        <div className="relative w-full min-h-0 h-auto md:min-h-[75vh] rounded-[12px] border border-[var(--color-border-Strokes-default)] overflow-hidden flex flex-col justify-center items-start md:items-center text-left md:text-center px-[14px] py-12 md:p-12 lg:p-16 bg-transparent shadow-[var(--shadow-elevation-2)] transition-colors duration-500">
          
          {/* Fondo Light Mode: Glow Ambient + Textura de Puntos */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none block dark:hidden overflow-hidden bg-transparent">
            {/* Ambient Glow Superior (Luz difusa de anclaje) */}
            <div 
              className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[120%] md:w-[100%] h-[120%] opacity-40 blur-[120px]"
              style={{
                background: "radial-gradient(circle at top, var(--color-brand-blue) 0%, rgba(53,187,253,0.15) 40%, transparent 70%)"
              }}
            />
            
            {/* Textura de Puntos (Fade de arriba hacia abajo) */}
            <div 
              className="absolute inset-0 w-full h-full opacity-30"
              style={{
                backgroundImage: "radial-gradient(var(--color-brand-blue) 1.5px, transparent 1.5px)",
                backgroundSize: "24px 24px",
                backgroundPosition: "center center",
                maskImage: "radial-gradient(ellipse at top, black 0%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 80%)"
              }}
            />
          </div>

          {/* Resplandor Azul (Dark Mode - Brand Blue Original) */}
          <div 
            className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[120%] md:w-[100%] h-[150%] opacity-50 z-0 pointer-events-none blur-[150px] transform-gpu transition-opacity duration-500 hidden dark:block"
            style={{
              background: "radial-gradient(circle at top, var(--color-brand-blue) 0%, rgba(5,72,235, 0.40) 25%, transparent 55%)"
            }}
          />

          {/* Contenido Central (Clases Congeladas - Purga Fase 2) */}
          <div className="relative z-10 flex flex-col items-start md:items-center gap-6 md:gap-8 max-w-4xl w-full md:mx-auto pb-4 md:pb-8">
            
            <h2 className="fade-up opacity-0 text-display text-left md:text-center text-[var(--color-text-Black-100)] dark:text-white tracking-tighter leading-[1.05] transition-colors duration-500">
              {t('sectionTitle')}
            </h2>

            <p className="fade-up opacity-0 text-body text-left md:text-center text-[var(--color-text-Black-100)]/70 dark:text-white/70 max-w-2xl font-light transition-colors duration-500">
              {t('sectionDesc')}
            </p>

          </div>

          {/* Grid de Cards: Liquid Glass Edge-to-Edge */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="relative z-10 flex md:grid md:grid-cols-4 overflow-x-auto overflow-y-hidden md:overflow-x-visible md:overflow-y-visible scrollbar-none gap-[14px] md:gap-fluid-xs w-full mt-4 md:mt-12 md:perspective-[1000px]"
          >
            {features.map((card, idx) => (
              <div 
                key={idx} 
                className="fade-up opacity-0 flex flex-col shrink-0 w-[80vw] md:w-auto rounded-[8px] bg-white dark:bg-white/[0.03] backdrop-blur-xl border border-[var(--color-border-Strokes-default)] dark:border-white/10 hover:border-[var(--color-border-Strokes-Hover)] dark:hover:border-white/20 dark:hover:bg-white/[0.06] transition-all duration-500 shadow-[var(--shadow-elevation-2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[var(--shadow-elevation-4)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.8)] hover:md:-translate-y-2 cursor-pointer group overflow-hidden"
              >
                {/* Bloque de Texto Superior (Step, Título y Cuerpo Largo) */}
                <div className="flex flex-col p-[14px] md:p-6 w-full gap-3 text-left">
                  <span className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[var(--color-brand-blue)] font-medium">
                    {card.step}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-h5 md:text-h4 text-[var(--color-text-Black-100)] dark:text-white font-medium leading-tight tracking-tight transition-colors duration-500">
                      {card.title}
                    </h3>
                    <p className="text-body-sm text-[var(--color-text-Black-100)]/70 dark:text-white/60 font-light leading-relaxed transition-colors duration-500">
                      {card.body}
                    </p>
                  </div>
                </div>

                {/* Contenedor Visual (Medio, flex-1, Transparente) */}
                <div className="w-full flex-1 min-h-[220px] relative bg-transparent overflow-hidden transition-colors duration-500 rounded-b-[8px]">
                  {/* Elemento para Light Mode */}
                  {card.isVideo || (card as any).isVideoLight ? (
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      disablePictureInPicture
                      src={(card.imgLight || card.img).startsWith('/') ? (card.imgLight || card.img) : `/Files/Epicare_Landing/Features/${card.imgLight || card.img}`}
                      className={`absolute inset-0 w-full h-full block dark:hidden ${(card as any).imgClassLight || card.imgClass || "object-cover"}`}
                      style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)'
                      }}
                    />
                  ) : (
                    <img 
                      src={(card.imgLight || card.img).startsWith('/') ? (card.imgLight || card.img) : `/Files/Epicare_Landing/Features/${card.imgLight || card.img}`} 
                      alt={card.title} 
                      className={`absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out block dark:hidden ${card.imgClass || "object-contain p-6"}`} 
                    />
                  )}

                  {/* Elemento para Dark Mode */}
                  {card.isVideo || (card as any).isVideoDark ? (
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      disablePictureInPicture
                      src={card.img.startsWith('/') ? card.img : `/Files/Epicare_Landing/Features/${card.img}`}
                      className={`absolute inset-0 w-full h-full hidden dark:block ${(card as any).imgClassDark || card.imgClass || "object-cover"}`}
                      style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)'
                      }}
                    />
                  ) : (
                    <img 
                      src={card.img.startsWith('/') ? card.img : `/Files/Epicare_Landing/Features/${card.img}`} 
                      alt={card.title} 
                      className={`absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out hidden dark:block ${(card as any).imgClassDark || card.imgClass || "object-contain p-6"}`} 
                    />
                  )}
                </div>
                
              </div>
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
