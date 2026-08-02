'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedTitle, AnimatedTitleLine } from '@/components/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

// Contador fluido estándar
const AnimatedNumber = ({ value }: { value: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!nodeRef.current || initialized.current) return;
    const match = value.match(/([\d,\.]+)(.*)/);
    if (!match) return;

    const targetValue = parseFloat(match[1].replace(/,/g, ''));
    const suffix = match[2] || '';
    if (isNaN(targetValue)) return;

    initialized.current = true;
    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: targetValue,
      duration: 2.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: nodeRef.current,
        start: "top 90%",
      },
      onUpdate: () => {
        if (nodeRef.current) {
          const currentVal = Math.floor(obj.val);
          const formatted = currentVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          nodeRef.current.innerText = `${formatted}${suffix}`;
        }
      }
    });
  }, [value]);

  return <span ref={nodeRef} className="tabular-nums font-mono inline-block">{value}</span>;
};

export default function MetricsEpicare() {
  const t = useTranslations('landingV2.metrics');
  const sectionRef = useRef<HTMLDivElement>(null);

  const mobileElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const metricsData = [
    { value: "130+", label: t('carriers') },
    { value: "6,000+", label: t('years') },
    { value: "100+", label: t('agents') },
    { value: "2021", label: t('platform') }
  ];

  // ── GSAP: The Blur Reveal & Title Animation ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Unified Title Reveal is now handled by <AnimatedTitle>

      // 2. Bento Cards Reveal Animation (Desktop only actually visually, but logic applies to the class)
      gsap.fromTo(".metric-bento-reveal", 
        { 
          filter: "blur(20px)", 
          opacity: 0, 
          y: 40, 
          scale: 0.95 
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".metric-grid-container",
            start: "top 85%",
          },
          clearProps: "filter"
        }
      );

      // 3. Mobile Giant Metrics Reveal (Lateral Entry)
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        mobileElementsRef.current.forEach((el, i) => {
          if (!el) return;
          const isEven = i % 2 === 0;

          gsap.fromTo(el,
            {
              x: isEven ? "-100vw" : "100vw",
              clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
              opacity: 0
            },
            {
              x: "0vw",
              clipPath: "inset(0 -20% 0 -20%)",
              opacity: 1,
              ease: "none", 
              scrollTrigger: {
                trigger: el,
                start: "top 95%", 
                end: "top 60%",   
                scrub: 1 
              }
            }
          );
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative z-20 bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500 pt-0 pb-section-sm md:pb-section-md">
      <div className="max-w-section-lg px-gutter-sm md:px-gutter-md">
        
        {/* ── Header Section ── */}
        <div className="pb-section-xs max-w-4xl will-change-transform">
          <AnimatedTitle className="text-display-lg tracking-tight text-[var(--color-text-Black-100)] dark:text-white leading-[1.1]">
            <AnimatedTitleLine>{t('titleLine1')}</AnimatedTitleLine>
            <AnimatedTitleLine>{t('titleLine2')}</AnimatedTitleLine>
            <AnimatedTitleLine className="text-[var(--color-brand-blue)]">{t('titleLine3')}</AnimatedTitleLine>
          </AnimatedTitle>
        </div>

        {/* ── Layout: The Bento Box Grid (Desktop) ── */}
        <div className="metric-grid-container hidden md:grid grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-static-sm)] pb-6 md:pb-0">
          {metricsData.map((metric, idx) => (
            <div 
              key={idx} 
              className="metric-bento-reveal will-change-transform group relative 
                         p-static-md md:p-static-lg rounded-[12px] 
                         bg-[#ffffff] shadow-elevation-2 dark:bg-[#0a0a0a] 
                         border border-black/5 dark:border-white/10 dark:shadow-none dark:hover:border-white/20 
                         transition-transform duration-300 overflow-hidden
                         [&:nth-child(even)]:translate-y-6 md:[&:nth-child(even)]:translate-y-0"
            >
              {/* Blue Gradient Dots with Radial Diffusion (Light Mode Only) */}
              <div 
                className="absolute inset-0 pointer-events-none dark:hidden"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
                }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-purple)]"
                  style={{
                    opacity: 0.20,
                    maskImage: 'radial-gradient(black 1.5px, transparent 1.5px)',
                    maskSize: '16px 16px',
                    WebkitMaskImage: 'radial-gradient(black 1.5px, transparent 1.5px)',
                    WebkitMaskSize: '16px 16px',
                  }}
                />
              </div>
              
              {/* Dark Mode Hover Glow */}
              <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-transparent to-[var(--color-brand-blue)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-6 md:gap-12">
                <div className="text-display md:text-display-lg tracking-tighter text-[var(--color-text-Black-100)] dark:text-white">
                  <AnimatedNumber value={metric.value} />
                </div>
                <div>
                  <div className="text-h6 md:text-subtitle text-[var(--color-text-Black-100)] dark:text-white/90 leading-tight whitespace-pre-line">
                    {metric.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Layout: Mobile Giant Metrics (Hidden on Desktop) ── */}
        <div className="flex md:hidden flex-col mt-10 border-t border-b border-[var(--color-border-Strokes-default)] overflow-hidden w-full max-w-full relative z-10">
           {metricsData.map((m, i) => (
             <div key={`mobile-${i}`} className="w-full flex flex-col">
               <div 
                 ref={el => {
                   mobileElementsRef.current[i] = el;
                 }}
                 className="w-full flex flex-col py-10 leading-[0.85] transform-gpu"
               >
                 <span className="font-mono text-left text-[26vw] font-black tracking-tighter tabular-nums whitespace-nowrap text-[var(--color-text-Black-100)] dark:text-white opacity-95">
                   <AnimatedNumber value={m.value} />
                 </span>
                 <span className="text-left text-body-xl-light mt-1 opacity-70 uppercase text-[var(--color-text-Black-100)] dark:text-white">
                   {m.label}
                 </span>
               </div>
               {i !== metricsData.length - 1 && (
                 <div className="w-full h-px bg-[var(--color-border-Strokes-default)]" />
               )}
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
