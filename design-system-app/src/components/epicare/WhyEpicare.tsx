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
      
      // Subtitle Reveal
      gsap.fromTo('.we-desc', 
        { opacity: 0, x: 40 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.4, 
          ease: 'power3.out', 
          delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } 
        }
      );

      // Layered Unveiling for the Asymmetric Grid
      gsap.fromTo('.we-pillar',
        { opacity: 0, y: 80 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          stagger: 0.2, 
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
      <div className="max-w-section-lg mx-auto w-full px-gutter-sm md:px-gutter-md">
        
        {/* ── MASSIVE ASYMMETRICAL HEADER ── */}
        <header className="mb-24 md:mb-40 flex flex-col">
          <h2 className="text-[12vw] md:text-[6.5vw] font-bold tracking-tighter text-[var(--color-text-Black-100)] dark:text-white leading-[0.9]">
            <span className="block overflow-hidden pb-static-sm">
              <span className="we-line inline-block">{t('headlineLine1')}</span>
            </span>
            <span className="block overflow-hidden pb-static-sm">
              <span className="we-line inline-block text-[var(--color-brand-orange)]">{t('headlineLine2')}</span>
            </span>
          </h2>
          
          <div className="mt-12 md:mt-16 w-full max-w-2xl md:ml-auto md:mr-[10%]">
            <p className="we-desc text-body-xl md:text-[1.75rem] font-light text-[var(--color-text-Black-100)]/80 dark:text-white/80 leading-snug text-balance">
              {t('subtitle')}
            </p>
          </div>
        </header>

        {/* ── RAW EDITORIAL 2x2 GRID ── */}
        <div className="we-grid grid grid-cols-1 md:grid-cols-2 gap-x-fluid-xl gap-y-16 md:gap-y-fluid-xl">
          {pillars.map((pillar, i) => (
            <article 
              key={i} 
              className={`we-pillar flex flex-col ${i % 2 === 1 ? 'md:mt-32' : ''}`}
            >
              <h3 
                className="text-display-sm md:text-display font-semibold tracking-tight text-[var(--color-text-Black-100)] dark:text-white mb-6"
                style={{ color: pillar.accent === 'var(--color-brand-blue)' ? 'var(--color-brand-blue)' : pillar.accent === 'var(--color-brand-orange)' ? 'var(--color-brand-orange)' : undefined }}
              >
                {pillar.title}
              </h3>
              <p className="text-body-lg text-[var(--color-text-muted)] font-light leading-relaxed max-w-md">
                {pillar.desc}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
