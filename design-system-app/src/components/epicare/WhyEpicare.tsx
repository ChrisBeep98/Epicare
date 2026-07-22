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
    { title: t('pillar1Title'), desc: t('pillar1Desc'), accent: 'var(--color-brand-blue)' },
    { title: t('pillar2Title'), desc: t('pillar2Desc'), accent: 'var(--color-brand-orange)' },
    { title: t('pillar3Title'), desc: t('pillar3Desc'), accent: 'var(--color-brand-blue)' },
    { title: t('pillar4Title'), desc: t('pillar4Desc'), accent: 'var(--color-brand-orange)' }
  ];

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.we-line, .we-desc, .we-pillar', { opacity: 1, yPercent: 0, y: 0 });
        return;
      }
      
      // Mega-typography Text-Birth
      gsap.fromTo('.we-line', 
        { yPercent: 120 },
        { 
          yPercent: 0, 
          duration: 1.6, 
          stagger: 0.1, 
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } 
        }
      );

      // Layered Unveiling for the Grid
      gsap.fromTo('.we-pillar',
        { opacity: 0, y: 80 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          stagger: 0.15, 
          ease: 'power4.out',
          scrollTrigger: { 
            trigger: '.we-grid', 
            start: 'top 85%' 
          } 
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] pt-section-lg pb-section-xl overflow-hidden transition-colors duration-500"
    >
      <div className="relative max-w-section-lg px-gutter-sm md:px-gutter-md">
        {/* ── MASSIVE ASYMMETRICAL HEADER ── */}
        <header className="mb-24 md:mb-40 grid-layout">
          <div className="col-start-1 col-span-6 row-start-1 md:col-start-1 md:col-span-12 md:row-start-1 flex flex-col">
            <h2 className="text-[12vw] md:text-[6.5vw] font-bold tracking-tighter text-[var(--color-text-Black-100)] dark:text-white leading-[0.9]">
              <span className="block overflow-hidden pb-static-sm">
                <span className="we-line inline-block">{t('headlineLine1')}</span>
              </span>
              <span className="block overflow-hidden pb-static-sm">
                <span className="we-line inline-block text-[var(--color-brand-orange)]">{t('headlineLine2')}</span>
              </span>
            </h2>
          </div>
        </header>

        {/* ── MINIMALIST 4-COL GRID ── */}
        <div className="we-grid grid-layout gap-y-16 md:gap-y-24 mt-20 md:mt-32">
          {/* Pillar 1 */}
          <article className="we-pillar col-start-1 col-span-6 row-start-1 md:col-start-1 md:col-span-3 md:row-start-1 flex flex-col pt-6 md:pt-8 border-t border-[var(--color-border-Strokes-default)]">
            <div className="flex items-center justify-between mb-8 md:mb-12 w-full">
              <span className="text-data text-[var(--color-text-muted)] font-medium">01</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pillars[0].accent }} aria-hidden="true" />
            </div>
            <h3 className="text-h5 md:text-h4 font-medium tracking-tight text-[var(--color-text-Black-100)] dark:text-white mb-4 text-left">
              {pillars[0].title}
            </h3>
            <p className="text-body-md text-[var(--color-text-muted)] font-light leading-relaxed max-w-sm text-left">
              {pillars[0].desc}
            </p>
          </article>

          {/* Pillar 2 */}
          <article className="we-pillar col-start-1 col-span-6 row-start-2 md:col-start-7 md:col-span-3 md:row-start-1 flex flex-col pt-6 md:pt-8 border-t border-[var(--color-border-Strokes-default)]">
            <div className="flex items-center justify-between mb-8 md:mb-12 w-full">
              <span className="text-data text-[var(--color-text-muted)] font-medium">02</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pillars[1].accent }} aria-hidden="true" />
            </div>
            <h3 className="text-h5 md:text-h4 font-medium tracking-tight text-[var(--color-text-Black-100)] dark:text-white mb-4 text-left">
              {pillars[1].title}
            </h3>
            <p className="text-body-md text-[var(--color-text-muted)] font-light leading-relaxed max-w-sm text-left">
              {pillars[1].desc}
            </p>
          </article>

          {/* Pillar 3 */}
          <article className="we-pillar col-start-1 col-span-6 row-start-3 md:col-start-4 md:col-span-3 md:row-start-1 flex flex-col pt-6 md:pt-8 border-t border-[var(--color-border-Strokes-default)]">
            <div className="flex items-center justify-between mb-8 md:mb-12 w-full">
              <span className="text-data text-[var(--color-text-muted)] font-medium">03</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pillars[2].accent }} aria-hidden="true" />
            </div>
            <h3 className="text-h5 md:text-h4 font-medium tracking-tight text-[var(--color-text-Black-100)] dark:text-white mb-4 text-left">
              {pillars[2].title}
            </h3>
            <p className="text-body-md text-[var(--color-text-muted)] font-light leading-relaxed max-w-sm text-left">
              {pillars[2].desc}
            </p>
          </article>

          {/* Pillar 4 */}
          <article className="we-pillar col-start-1 col-span-6 row-start-4 md:col-start-10 md:col-span-3 md:row-start-1 flex flex-col pt-6 md:pt-8 border-t border-[var(--color-border-Strokes-default)]">
            <div className="flex items-center justify-between mb-8 md:mb-12 w-full">
              <span className="text-data text-[var(--color-text-muted)] font-medium">04</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pillars[3].accent }} aria-hidden="true" />
            </div>
            <h3 className="text-h5 md:text-h4 font-medium tracking-tight text-[var(--color-text-Black-100)] dark:text-white mb-4 text-left">
              {pillars[3].title}
            </h3>
            <p className="text-body-md text-[var(--color-text-muted)] font-light leading-relaxed max-w-sm text-left">
              {pillars[3].desc}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
