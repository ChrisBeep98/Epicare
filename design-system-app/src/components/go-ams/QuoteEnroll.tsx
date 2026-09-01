"use client";

import React, { useRef, useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER, TRIGGER } from "@/lib/motion";
import { asset } from "@/lib/asset";

// --- CONTEXTUAL MICRO-UI BADGES (Premium Image Pills) ---
const InlineGraphic = ({ type, rotate = "0" }: { type: 'clients' | 'unify', rotate?: string }) => (
  <>
    <style suppressHydrationWarning>{`
      @keyframes float-s {
        0%, 100% { transform: translateY(0) rotate(var(--rot)); }
        50% { transform: translateY(-8%) rotate(var(--rot)); }
      }
      @keyframes wave {
        0% { transform: scale(0.1); opacity: 1; }
        100% { transform: scale(1.1); opacity: 0; }
      }
    `}</style>
    <span 
      className={`inline-flex items-center justify-center align-middle mx-[0.15em] -translate-y-[0.1em] transition-transform duration-700 hover:scale-110`}
      style={{ '--rot': rotate.replace('rotate-', '').replace('-', '-').includes('rotate') ? rotate : '0deg', animation: 'float-s 6s ease-in-out infinite' } as React.CSSProperties}
    >
      <span className={rotate}>
        
        {type === 'unify' && (
          <span className="inline-flex items-center justify-center align-middle mx-[0.1em] text-[var(--color-brand-blue)] group">
             <svg viewBox="0 0 24 24" fill="none" className="w-[1.2em] h-[1.2em] drop-shadow-[0_0_12px_rgba(53,187,253,0.6)] transition-transform duration-700 group-hover:scale-110" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="origin-center" style={{ animation: 'wave 3s cubic-bezier(0,0,0.2,1) infinite', willChange: 'transform, opacity' }} />
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="origin-center" style={{ animation: 'wave 3s cubic-bezier(0,0,0.2,1) infinite -1s', willChange: 'transform, opacity' }} />
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="origin-center" style={{ animation: 'wave 3s cubic-bezier(0,0,0.2,1) infinite -2s', willChange: 'transform, opacity' }} />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
             </svg>
          </span>
        )}

        {type === 'clients' && (
          <span className="w-max h-[0.7em] rounded-full bg-white/5 border-[0.05em] border-[var(--color-border-Strokes-strong)]/30 backdrop-blur-md flex items-center justify-center px-[0.06em] shadow-elevation-1 group">
             <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Client" className="w-[0.55em] h-[0.55em] rounded-full object-cover border-[0.05em] border-[var(--color-surface-BG-base)] z-30 transition-transform duration-500 group-hover:scale-110" />
             <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" className="w-[0.55em] h-[0.55em] rounded-full object-cover border-[0.05em] border-[var(--color-surface-BG-base)] -ml-[0.2em] z-20 transition-transform duration-500 group-hover:scale-110" style={{ transitionDelay: '50ms' }} />
             <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Client" className="w-[0.55em] h-[0.55em] rounded-full object-cover border-[0.05em] border-[var(--color-surface-BG-base)] -ml-[0.2em] z-10 transition-transform duration-500 group-hover:scale-110" style={{ transitionDelay: '100ms' }} />
          </span>
        )}
      </span>
    </span>
  </>
);

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

    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // 1. Initial Reveal (Title text)
      gsap.fromTo(
        ".qw-reveal",
        { y: 50, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(-20% 0 -20% 0)",
          duration: DUR.base,
          stagger: STAGGER.words,
          ease: EASE.out,
          scrollTrigger: {
            trigger: pinWrapper,
            start: "top 75%",
          }
        }
      );

      // 2. Aura Parallax
      gsap.to(".qw-aura", {
        yPercent: 15,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: pinWrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      const mm = gsap.matchMedia(el);

      // DESKTOP: PIN & VERTICAL SCROLL OVER CENTERED TEXT
      mm.add("(min-width: 1024px)", () => {
        const scrollDistance = track.offsetHeight;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapper,
            start: "top top",
            end: () => `+=${scrollDistance}`, 
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const total = features.length;

              // Parallax on the giant numbers inside cards for memorable detail
              gsap.utils.toArray('.card-bg-number').forEach((num: any, i) => {
                 const cardProgress = (progress * total) - i;
                 gsap.set(num, { y: cardProgress * -20 }); 
              });
            }
          }
        });

        // The vertical move. Move the grid UP from below the screen.
        tl.to(track, {
          y: () => -(scrollDistance + window.innerHeight * 0.2), 
          ease: "none"
        });
      });

      // MOBILE: NATIVE SNAP SCROLL WITH GSAP REVEAL
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".qw-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: DUR.base,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: track,
              start: "top 80%",
            }
          }
        );
      });

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[var(--color-surface-BG-base)]">
      
      {/* PIN WRAPPER */}
      <div 
        ref={pinWrapperRef} 
        className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
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

        {/* CENTERED CONTENT (Title) */}
        <div className="qw-center-content absolute inset-0 flex flex-col items-center justify-center z-10 px-gutter-sm md:px-gutter-md pointer-events-none">
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
              <h2 className="qw-reveal text-h2 md:text-display lg:text-display-lg font-bold tracking-tight leading-[1.1]">
                <span className="text-[var(--color-text-primary)]">
                  {t('title1_1')} 
                  <InlineGraphic type="unify" rotate="-rotate-3" /> 
                  {t('title1_2')} {t('title1_3')}
                </span>
                
                <span> </span>

                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-brand-blue)] to-blue-400">
                  {t('title2_1')}
                </span>
                
                <InlineGraphic type="clients" rotate="-rotate-1" /> 
                
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-brand-blue)] to-blue-400">
                  {t('title2_2')} {t('title2_3')}
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* CARDS GRID (GSAP scrubs this up from below) */}
        <div 
          ref={trackRef}
          className="absolute top-[100vh] left-0 w-full z-20 flex justify-center px-gutter-sm md:px-gutter-md pb-[20vh]"
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-20 w-full max-w-6xl mx-auto">
            
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6 md:gap-12 lg:gap-20 w-full md:w-1/2">
              {features.filter((_, i) => i % 2 === 0).map((feature) => (
                <div 
                  key={feature.id}
                  className="qw-card relative w-full rounded-[2.5rem] border border-[var(--color-border-Strokes-strong)]/20 shadow-elevation-3 hover:shadow-elevation-5 overflow-hidden group transition-transform duration-700 hover:-translate-y-4"
                >
                  <div className="absolute inset-0 -z-10 bg-[var(--color-surface-BG-1)]/50 dark:bg-black/40 backdrop-blur-[24px]" />
                  <div className="absolute inset-0 -z-10 bg-white/30 dark:bg-white/5 backdrop-blur-[16px] saturate-[1.5]" />
                  <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-b from-white/40 to-transparent dark:from-white/10 opacity-70 pointer-events-none" />

                  <div className="card-bg-number absolute -bottom-4 -right-4 text-[12rem] lg:text-[16rem] leading-none font-display font-bold text-[var(--color-text-primary)] opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none z-0 transition-colors duration-500 group-hover:text-[var(--color-brand-blue)]">
                    {feature.id}
                  </div>

                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-brand-blue)]/15 blur-[50px] rounded-full translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full justify-between p-8 lg:p-12 min-h-[470px] lg:min-h-[570px]">
                    <div>
                      <div className="flex justify-between items-start mb-8 lg:mb-10">
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

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6 md:gap-12 lg:gap-20 w-full md:w-1/2 md:mt-48 lg:mt-96">
              {features.filter((_, i) => i % 2 !== 0).map((feature) => (
                <div 
                  key={feature.id}
                  className="qw-card relative w-full rounded-[2.5rem] border border-[var(--color-border-Strokes-strong)]/20 shadow-elevation-3 hover:shadow-elevation-5 overflow-hidden group transition-transform duration-700 hover:-translate-y-4"
                >
                  <div className="absolute inset-0 -z-10 bg-[var(--color-surface-BG-1)]/50 dark:bg-black/40 backdrop-blur-[24px]" />
                  <div className="absolute inset-0 -z-10 bg-white/30 dark:bg-white/5 backdrop-blur-[16px] saturate-[1.5]" />
                  <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-b from-white/40 to-transparent dark:from-white/10 opacity-70 pointer-events-none" />

                  <div className="card-bg-number absolute -bottom-4 -right-4 text-[12rem] lg:text-[16rem] leading-none font-display font-bold text-[var(--color-text-primary)] opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none z-0 transition-colors duration-500 group-hover:text-[var(--color-brand-blue)]">
                    {feature.id}
                  </div>

                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-brand-blue)]/15 blur-[50px] rounded-full translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full justify-between p-8 lg:p-12 min-h-[470px] lg:min-h-[570px]">
                    <div>
                      <div className="flex justify-between items-start mb-8 lg:mb-10">
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

      </div>
    </section>
  );
}
