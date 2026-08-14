"use client";

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { asset } from '@/lib/asset';
import { EASE, DUR, EASE_CSS } from '@/lib/motion';
import SmartVideo from './SmartVideo';

export type SpotlightVariant = 'eppigo' | 'solutions';

type SpotlightConfig = {
  accentVar: string;
  accentTextVar: string;
  videoLight: string;
  videoDark: string;
  posterLight: string;
  posterDark: string;
};

const SPOTLIGHTS: Record<SpotlightVariant, SpotlightConfig> = {
  eppigo: {
    accentVar: '--color-brand-orange',
    accentTextVar: '--color-accent-text-muted',
    videoLight: asset('/Files/Features/Eppigo_Light_Final.mp4'),
    videoDark: asset('/Files/Features/Eppigo_Dark_Final.mp4'),
    posterLight: asset('/Files/Features/posters/Eppigo_Light_Final.webp'),
    posterDark: asset('/Files/Features/posters/Eppigo_Dark_Final.webp'),
  },
  solutions: {
    accentVar: '--color-brand-blue',
    accentTextVar: '--color-text-accent-blue',
    videoLight: asset('/Files/Features/Solutions_Light_Final.mp4'),
    videoDark: asset('/Files/Features/Solutions_Dark_Final.mp4'),
    posterLight: asset('/Files/Features/posters/Solutions_Light_Final.webp'),
    posterDark: asset('/Files/Features/posters/Solutions_Dark_Final.webp'),
  },
};

const SPEC_KEYS = ['f1', 'f2', 'f3'] as const;

const ArrowUR = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export default function ProductSpotlightEpicare({ variant }: { variant: SpotlightVariant }) {
  const t = useTranslations(`landingV2.spotlight.${variant}`);
  const { accentVar, accentTextVar, videoLight, videoDark, posterLight, posterDark } =
    SPOTLIGHTS[variant];
    
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);
  const rotatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        
        // EFECTO CINEMÁTICO APPLE (Elegante, Suave, Blur)
        gsap.fromTo(videoWrapperRef.current,
          { 
            scale: 1.15, 
            opacity: 0,
            filter: 'blur(20px)'
          },
          {
            scale: 1, 
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.8,
            ease: "power2.out", 
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse", 
            }
          }
        );

        // Tarjeta Glassmorphic
        gsap.fromTo(cardRef.current,
          { 
            y: '10vh', 
            opacity: 0, 
            scale: 0.9 
          },
          {
            y: '0vh', 
            opacity: 1, 
            scale: 1,
            duration: 1.2,
            delay: 0.2, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Rotador de Features (AWWWARDS MOTION: Birth of Typography)
        const featureItems = gsap.utils.toArray('.feature-item') as HTMLElement[];
        if (featureItems.length > 0) {
          const rotatorTl = gsap.timeline({ repeat: -1 });
          featureItems.forEach((item) => {
            rotatorTl
              // Nace desde abajo (Birth)
              .fromTo(item, 
                { yPercent: 100, opacity: 0 }, 
                { yPercent: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
              )
              // Se lee y luego desaparece hacia arriba
              .to(item, 
                { yPercent: -100, opacity: 0, duration: 0.6, ease: "power3.in", delay: 2.5 }
              );
          });
        }

        // Pulse animation for the live dot
        const pulse = gsap.to(pulseRef.current, {
          opacity: 0.2, duration: 1.8, ease: EASE.breath, yoyo: true, repeat: -1, paused: true
        });
        ScrollTrigger.create({
          trigger: sectionRef.current, start: "top bottom", end: "bottom top",
          onToggle: (self) => self.isActive ? pulse.play() : pulse.pause()
        });

      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} id={variant} className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500">
      
      {/* Container Full Viewport */}
      <div ref={containerRef} className="relative w-full h-[100dvh] md:h-screen flex items-center justify-center overflow-hidden">
        
        {/* VIDEO WRAPPER (Protagonist) */}
        <div 
          ref={videoWrapperRef} 
          className="absolute inset-0 z-0 overflow-hidden transform-gpu will-change-transform md:border-none bg-black"
        >
          <img src={posterLight} alt="" aria-hidden="true" fetchPriority="high" decoding="sync" className="absolute inset-0 w-full h-full object-cover object-center dark:hidden" />
          <img src={posterDark} alt="" aria-hidden="true" fetchPriority="high" decoding="sync" className="absolute inset-0 w-full h-full object-cover object-center hidden dark:block" />
          
          <SmartVideo src={videoLight} poster={posterLight} className="absolute inset-0 w-full h-full object-cover object-center dark:hidden" />
          <SmartVideo src={videoDark} poster={posterDark} className="absolute inset-0 w-full h-full object-cover object-center hidden dark:block" />
        </div>

        {/* GLASSMORPHIC FLOATING CARD */}
        <div className="absolute inset-0 flex items-end justify-center z-20 pb-[8vh] px-gutter-sm pointer-events-none">
          <div 
            ref={cardRef} 
            className="w-full max-w-5xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] 
                       bg-black/20 dark:bg-black/40 backdrop-blur-3xl 
                       border border-white/10 
                       shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                       transform-gpu will-change-transform pointer-events-auto
                       flex flex-col md:flex-row md:items-end justify-between gap-12"
          >
            <div className="flex flex-col min-w-0 flex-1">
              
              {/* Dot en vivo */}
              <div className="flex items-center gap-2 mb-2">
                <span ref={pulseRef} aria-hidden="true" className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: `var(${accentVar})`, color: `var(${accentVar})` }} />
                <span className="text-meta uppercase text-white/60 tracking-widest">En Vivo</span>
              </div>
              
              {/* Título Masivo (Eppigo / Solutions) */}
              <h3 className="text-[4rem] md:text-[6rem] lg:text-[7rem] font-bold tracking-tighter text-white leading-[0.85] mb-6">
                {t('name')}
              </h3>
              
              {/* Título descriptivo original intacto */}
              <h2 className="text-display-sm md:text-display max-w-[15ch] text-white font-semibold leading-[1.05] tracking-tight mb-8">
                {t('title')}
              </h2>

              {/* Rotador Dinámico de Features (AWWWARDS MOTION) */}
              <div ref={rotatorRef} className="relative h-8 overflow-hidden w-full max-w-[35ch]">
                {SPEC_KEYS.map((key, i) => (
                  <div key={key} className="feature-item absolute top-0 left-0 w-full h-full flex items-center gap-3" style={{ opacity: 0 }}>
                    <span aria-hidden="true" className="text-meta tabular-nums font-mono opacity-80" style={{ color: `var(${accentVar})` }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body-md font-medium text-white">
                      {t(`${key}Title`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#unete"
              className="group shrink-0 inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 transition-all duration-[450ms] hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ transitionTimingFunction: EASE_CSS.ui, outlineColor: `var(${accentVar})` }}
            >
              <span className="text-body-md font-medium">{t('cta')}</span>
              <span className="relative w-10 h-10 rounded-full bg-white text-black flex items-center justify-center overflow-hidden shrink-0">
                <ArrowUR className="absolute w-5 h-5 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-6 group-hover:-translate-y-6" />
                <ArrowUR className="absolute w-5 h-5 -translate-x-6 translate-y-6 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
