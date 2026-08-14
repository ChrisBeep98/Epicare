"use client";

import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { asset } from '@/lib/asset';
import { EASE, DUR, EASE_CSS } from '@/lib/motion';
import SmartVideo from './SmartVideo';

export type SpotlightVariant = 'eppigo' | 'solutions';

type SpotlightConfig = {
  accentVar: string;
  videoLight: string;
  videoDark: string;
  posterLight: string;
  posterDark: string;
};

const SPOTLIGHTS: Record<SpotlightVariant, SpotlightConfig> = {
  eppigo: {
    accentVar: '--color-brand-orange',
    videoLight: asset('/Files/Features/Eppigo_Light_Final.mp4'),
    videoDark: asset('/Files/Features/Eppigo_Dark_Final.mp4'),
    posterLight: asset('/Files/Features/posters/Eppigo_Light_Final.webp'),
    posterDark: asset('/Files/Features/posters/Eppigo_Dark_Final.webp'),
  },
  solutions: {
    accentVar: '--color-brand-blue',
    videoLight: asset('/Files/Features/Solutions_Light_Final.mp4'),
    videoDark: asset('/Files/Features/Solutions_Dark_Final.mp4'),
    posterLight: asset('/Files/Features/posters/Solutions_Light_Final.webp'),
    posterDark: asset('/Files/Features/posters/Solutions_Dark_Final.webp'),
  },
};

const SPEC_KEYS = ['f1', 'f2', 'f3'] as const;

const DEBUG_BGS = [
  '/Files/Backgrounds/epicare_light_mesh_glass.jpg',
  '/Files/Backgrounds/epicare_minimal_mesh_brand_blue.jpg',
  '/Files/Backgrounds/epicare_bg_fluid_blue.jpg',
  '/Files/Backgrounds/epicare_bg_geometric_blue.jpg',
  '/Files/Backgrounds/epicare_bg_aura_blue.jpg',
  '/Files/Backgrounds/epicare_bg_aura_multi.jpg',
  '/Files/Backgrounds/epicare_bg_aura_wave.jpg',
  '/Files/Backgrounds/epicare_bg_aura_edges.jpg',
  '/Files/Backgrounds/epicare_bg_blue_multi.jpg',
  '/Files/Backgrounds/epicare_bg_blue_wave.jpg',
  '/Files/Backgrounds/epicare_bg_blue_edges.jpg',
  '/Files/Backgrounds/epicare_bg_liquid_glass.jpg',
];

export default function ProductSpotlightEpicare({ variant }: { variant: SpotlightVariant }) {
  const t = useTranslations(`landingV2.spotlight.${variant}`);
  const { accentVar, videoLight, videoDark, posterLight, posterDark } = SPOTLIGHTS[variant];
    
  const isEppigo = variant === 'eppigo';
  
  // Debug State (Hidden but kept in memory)
  const [bgIndex, setBgIndex] = useState(4); // epicare_bg_aura_blue.jpg
  const [hueRotate, setHueRotate] = useState(34);
  const [bgScale, setBgScale] = useState(2);
  const [bgOpacity, setBgOpacity] = useState(0.7);

  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoColRef = useRef<HTMLDivElement>(null);
  const rotatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        
        // 1. Video Reveal
        gsap.fromTo(videoColRef.current,
          { opacity: 0, x: isEppigo ? '3vw' : '-3vw' },
          { 
            opacity: 1, x: '0vw',
            duration: 1.5, ease: "power3.out", 
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse", 
            }
          }
        );

        // 2. Text Reveal (Staggered perfectly, targeting ONLY content to avoid breaking backdrop-blur performance)
        const textElements = contentRef.current?.children;
        if (textElements) {
          gsap.fromTo(textElements,
            { opacity: 0, y: '3vh' },
            { 
              opacity: 1, y: '0vh',
              duration: 1.2, stagger: 0.15, ease: "power2.out", delay: 0.2,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }

        // 3. Rotator
        const featureItems = gsap.utils.toArray('.feature-item') as HTMLElement[];
        if (featureItems.length > 0) {
          const rotatorTl = gsap.timeline({ repeat: -1 });
          featureItems.forEach((item) => {
            rotatorTl
              .fromTo(item, 
                { yPercent: 100, opacity: 0 }, 
                { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
              )
              .to(item, 
                { yPercent: -100, opacity: 0, duration: 0.6, ease: "power2.in", delay: 3 }
              );
          });
        }
      }, sectionRef);
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [isEppigo]);

  return (
    <section 
      ref={sectionRef} 
      id={variant} 
      className="relative w-full min-h-[100dvh] bg-white overflow-visible flex items-center justify-center py-20 lg:py-0"
    >
      {/* 
        FULL BLEED ASYMMETRIC SPLIT LAYOUT. 
        Video touches the absolute edge of the screen. 
      */}
      <div className={`relative z-10 w-full max-w-full flex flex-col ${isEppigo ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
        
        {/* TEXT COLUMN (Takes 50% viewport) */}
        <div ref={textColRef} className={`relative z-20 shrink-0 w-full lg:w-1/2 flex flex-col justify-center py-20 px-6 md:px-8 ${isEppigo ? 'lg:items-end' : 'lg:items-start'}`}>
          
          {/* Alignment Wrapper (Forces content into the max-w-section-lg boundary) */}
          <div className="w-full px-4 lg:px-8" style={{ maxWidth: 'calc(var(--max-w-section-lg, 1440px) / 2)' }}>
            
            {/* LIQUID GLASS TEXT CARD */}
            <div className={`relative z-10 w-full max-w-[540px] mx-auto lg:mx-0 ${isEppigo ? 'lg:mr-auto' : 'lg:ml-auto'} rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.05)] transform hover:-translate-y-1 transition-transform duration-500 overflow-hidden`}>
            
            {/* Glassmorphic Background Layer (Static) */}
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden -z-10 border border-[var(--color-border-Strokes-default)]">
            {/* Pure Background Mesh (Brand Blue) */}
            <img 
              src={asset(DEBUG_BGS[bgIndex])} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-300"
              style={{ 
                opacity: bgOpacity,
                filter: `hue-rotate(${hueRotate}deg)`,
                transform: `scale(${bgScale})`
              }}
            />
            
            {/* Clean Frosted Glass Refraction */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[20px] saturate-[1.5] pointer-events-none" />
            </div>

            {/* CONTENT (Relative to sit above glass) */}
            <div ref={contentRef} className="relative z-10 flex flex-col items-start gap-8 lg:gap-10 p-10 lg:p-12">
              
              {/* 1. PRODUCT NAME (Glass Pill) */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_8px_16px_rgba(0,0,0,0.03)]">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse shadow-sm" style={{ backgroundColor: `var(${accentVar})` }} />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900">
                {t('name')}
              </span>
            </div>

            {/* 2. THE VISION */}
            <h2 className="text-display-lg text-[var(--color-text-primary)] leading-[1.05]">
              {t('title')}
            </h2>

            <div className="w-16 h-[2px] rounded-full opacity-50" style={{ backgroundColor: `var(${accentVar})` }} />

            {/* 3. ROTATOR */}
            <div ref={rotatorRef} className="relative h-[2.5rem] overflow-hidden w-full">
              {SPEC_KEYS.map((key, i) => (
                <div key={key} className="feature-item absolute top-0 left-0 w-full h-full flex items-center gap-4" style={{ opacity: 0 }}>
                  <span aria-hidden="true" className="text-lg font-mono text-gray-400">
                    0{i + 1}
                  </span>
                  <span className="text-xl font-medium text-gray-700">
                    {t(`${key}Title`)}
                  </span>
                </div>
              ))}
            </div>

            {/* 4. CTA */}
            <div className="mt-2 w-full sm:w-auto">
              <a
                href="#unete"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full px-10 py-5 
                           bg-gray-900 text-white hover:bg-black
                           shadow-[0_15px_30px_rgba(0,0,0,0.15)]
                           transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="text-sm font-bold tracking-[0.2em] uppercase">{t('cta')}</span>
              </a>
            </div>

            </div>
          </div>
        </div>
        </div>
      
        {/* VIDEO COLUMN - GLUED TO THE EDGE */}
        <div ref={videoColRef} className={`relative z-10 shrink-0 w-full lg:w-1/2 flex ${isEppigo ? 'justify-end pr-0' : 'justify-start pl-0'} mt-12 lg:mt-0`}>
          {/* Shadow Container (No overflow-hidden) */}
          <div className={`relative w-full h-[75vh] lg:h-[90vh] max-h-[1000px] ${isEppigo ? 'rounded-l-[3rem] lg:rounded-l-[4rem] rounded-r-none' : 'rounded-r-[3rem] lg:rounded-r-[4rem] rounded-l-none'} shadow-[0_40px_100px_rgba(0,0,0,0.15)] transform-gpu`}>
            {/* Mask Container (Overflow-hidden to clip the video, but doesn't clip the outer shadow) */}
            <div className={`absolute inset-0 w-full h-full ${isEppigo ? 'rounded-l-[3rem] lg:rounded-l-[4rem] rounded-r-none' : 'rounded-r-[3rem] lg:rounded-r-[4rem] rounded-l-none'} overflow-hidden`}>
              <SmartVideo src={videoLight} poster={posterLight} className="absolute inset-0 w-full h-full object-cover object-center dark:hidden" />
              <SmartVideo src={videoDark} poster={posterDark} className="absolute inset-0 w-full h-full object-cover object-center hidden dark:block" />
            </div>
          </div>
        </div>

      </div>

      {/* DEBUG PANEL (Hidden but kept in memory for quick restoration) */}
      {false && isEppigo && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-gray-900/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4 text-white w-[320px]">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400">🔍 Testing de Fondos</div>
          
          {/* Background cycler */}
          <div className="flex items-center justify-between gap-3">
             <button onClick={() => setBgIndex(p => p > 0 ? p - 1 : DEBUG_BGS.length - 1)} className="px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors font-bold">&larr;</button>
             <div className="text-xs text-center flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono" title={DEBUG_BGS[bgIndex]}>
                {DEBUG_BGS[bgIndex].split('/').pop()}
             </div>
             <button onClick={() => setBgIndex(p => p < DEBUG_BGS.length - 1 ? p + 1 : 0)} className="px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors font-bold">&rarr;</button>
          </div>

          {/* Hue Slider */}
          <div className="flex flex-col gap-2">
             <div className="flex justify-between text-xs items-center">
                <span className="text-gray-300">Modificador de Tono (Hue)</span>
                <button onClick={() => setHueRotate(0)} className="text-[#35BBFD] hover:text-white transition-colors bg-[#35BBFD]/10 px-2 py-0.5 rounded">Reset</button>
             </div>
             <div className="flex items-center gap-3">
               <input type="range" min="-180" max="180" value={hueRotate} onChange={(e) => setHueRotate(Number(e.target.value))} className="w-full accent-[#35BBFD]" />
               <span className="text-xs font-mono w-10 text-right">{hueRotate}°</span>
             </div>
          </div>

          {/* Zoom Slider */}
          <div className="flex flex-col gap-2">
             <div className="flex justify-between text-xs items-center">
                <span className="text-gray-300">Zoom (Escala)</span>
                <button onClick={() => setBgScale(1)} className="text-[#35BBFD] hover:text-white transition-colors bg-[#35BBFD]/10 px-2 py-0.5 rounded">Reset</button>
             </div>
             <div className="flex items-center gap-3">
               <input type="range" min="1" max="3" step="0.1" value={bgScale} onChange={(e) => setBgScale(Number(e.target.value))} className="w-full accent-[#35BBFD]" />
               <span className="text-xs font-mono w-10 text-right">{bgScale.toFixed(1)}x</span>
             </div>
          </div>

          {/* Opacity Slider */}
          <div className="flex flex-col gap-2">
             <div className="flex justify-between text-xs items-center">
                <span className="text-gray-300">Opacidad</span>
                <button onClick={() => setBgOpacity(0.9)} className="text-[#35BBFD] hover:text-white transition-colors bg-[#35BBFD]/10 px-2 py-0.5 rounded">Reset</button>
             </div>
             <div className="flex items-center gap-3">
               <input type="range" min="0.1" max="1" step="0.05" value={bgOpacity} onChange={(e) => setBgOpacity(Number(e.target.value))} className="w-full accent-[#35BBFD]" />
               <span className="text-xs font-mono w-10 text-right">{(bgOpacity * 100).toFixed(0)}%</span>
             </div>
          </div>

          {/* Copy Button */}
          <button 
            onClick={() => {
              const cfg = `Imagen: ${DEBUG_BGS[bgIndex].split('/').pop()}\nHue: ${hueRotate}deg\nZoom: ${bgScale}x\nOpacidad: ${bgOpacity}`;
              navigator.clipboard.writeText(cfg);
              alert("¡Configuración copiada al portapapeles!\n\n" + cfg);
            }}
            className="mt-2 w-full py-2.5 bg-[#35BBFD] hover:bg-[#2da3de] text-gray-900 font-bold rounded-lg transition-colors text-sm shadow-[0_0_15px_rgba(53,187,253,0.3)]"
          >
            Copiar Configuración
          </button>
        </div>
      )}

    </section>
  );
}
