'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyEpicare() {
  const t = useTranslations('landingV2.whyEpicare');
  const sectionRef = useRef<HTMLElement>(null);
  
  const pillars = [
    { title: t('pillar1Title'), desc: t('pillar1Desc') },
    { title: t('pillar2Title'), desc: t('pillar2Desc') },
    { title: t('pillar3Title'), desc: t('pillar3Desc') },
    { title: t('pillar4Title'), desc: t('pillar4Desc') }
  ];

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.we-line, .we-border, .we-row-content', { opacity: 1, yPercent: 0, scaleX: 1, y: 0 });
        return;
      }
      
      // 1. TEXT BIRTH (The Water Mask for Title)
      gsap.fromTo('.we-line', 
        { yPercent: 120, rotateZ: 2 },
        { 
          yPercent: 0, 
          rotateZ: 0,
          duration: 1.8, 
          stagger: 0.15, 
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } 
        }
      );

      // 2. STRUCTURAL UNVEILING (Horizontal lines expand like architecture)
      gsap.fromTo('.we-border',
        { scaleX: 0 },
        { 
          scaleX: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: 'power4.inOut',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: '.we-list', start: 'top 85%' }
        }
      );

      // 3. TYPOGRAPHIC APPEARANCE (Text blocks fade and slide up)
      gsap.fromTo('.we-row-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.we-list', start: 'top 80%' }
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      // PURE SOPHISTICATED MINIMALISM - No dark modes, no color blocks.
      className="relative w-full bg-[#fcfcfd] pt-section-2xl pb-section-3xl overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] px-6 md:px-12 lg:px-16 mx-auto w-full">
        
        {/* ── MASSIVE EDITORIAL HEADER ── */}
        <header className="mb-32 md:mb-48 max-w-5xl">
          <h2 className="text-[12vw] md:text-[8vw] font-serif font-medium tracking-tight text-[var(--color-text-Black-100)] leading-[0.9]">
            <span className="block overflow-hidden pb-4">
              <span className="we-line inline-block origin-bottom-left">{t('headlineLine1')}</span>
            </span>
            <span className="block overflow-hidden pb-4">
              <span className="we-line inline-block origin-bottom-left text-[#A40EBB] italic">{t('headlineLine2')}</span>
            </span>
          </h2>
        </header>

        {/* ── THE TYPOGRAPHIC APPARATUS ── */}
        {/* We completely abandon "Cards" and "Grids". We use raw architectural lines and space. */}
        <div className="we-list flex flex-col w-full relative">
          
          {/* Top Master Border */}
          <div className="we-border h-[1px] w-full bg-black/20 origin-left" />
          
          {pillars.map((pillar, i) => (
            <div 
              key={i} 
              className="group relative flex flex-col w-full cursor-default hover:bg-black/[0.02] transition-colors duration-700"
            >
              <div className="we-row-content flex flex-col md:flex-row md:items-start py-12 md:py-24 relative z-10 w-full">
                
                {/* Column 1: Number */}
                <div className="w-full md:w-[15%] mb-8 md:mb-0 flex items-start">
                  <span className="text-h6 md:text-h5 font-serif text-black/30 group-hover:text-[#A40EBB] transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Column 2: Massive Typography */}
                <div className="w-full md:w-[45%] pr-4 md:pr-12 mb-6 md:mb-0">
                  <h3 className="text-h2 md:text-[4vw] font-medium tracking-tighter text-[var(--color-text-Black-100)] leading-[1] md:group-hover:translate-x-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {pillar.title}
                  </h3>
                </div>
                
                {/* Column 3: Prose Description */}
                <div className="w-full md:w-[40%] flex md:justify-end md:mt-2">
                  <p className="text-body-lg md:text-h6 text-black/50 font-light leading-relaxed max-w-md group-hover:text-black/80 transition-colors duration-700">
                    {pillar.desc}
                  </p>
                </div>

              </div>
              
              {/* Separator Border */}
              <div className="we-border h-[1px] w-full bg-black/10 origin-left" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
