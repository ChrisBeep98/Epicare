'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  return <span ref={nodeRef} className="tabular-nums inline-block">{value}</span>;
};

export default function MetricsEpicare() {
  const t = useTranslations('landingV2.metrics');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const metricsData = [
    { value: "252+", label: t('carriers') },
    { value: "25+", label: t('years') },
    { value: "216+", label: t('agents') },
    { value: "24/7", label: t('platform') }
  ];

  // ── GSAP: The Blur Reveal & Title Animation ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Unified Title Reveal (Organic Wrapping)
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, 
            opacity: 1, 
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // 2. Bento Cards Reveal Animation
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative z-20 bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500 pt-0 pb-section-sm md:pb-section-md">
      <div className="max-w-section-lg px-[14px] md:px-[var(--space-gutter-md)]">
        
        {/* ── Header Section ── */}
        <div className="pb-section-xs max-w-4xl will-change-transform">
          <h2 ref={titleRef} className="text-display font-medium tracking-tight text-[var(--color-text-Black-100)] dark:text-white leading-[1.1]">
            {t('titleLine1')} <span className="text-[var(--color-text-muted)]">{t('titleLine2')}</span> <span className="text-[var(--color-brand-blue)]">{t('titleLine3')}</span>
          </h2>
        </div>

        {/* ── Layout: The Bento Box Grid ── */}
        {/* Mobile: 2 cols, 14px gap. Desktop: 4 cols, 24px (gap-6) gap. pb-6 to compensate for the translate-y-6 shift. */}
        <div className="metric-grid-container grid grid-cols-2 lg:grid-cols-4 gap-[14px] md:gap-fluid-xs pb-6 md:pb-0">
          {metricsData.map((metric, idx) => (
            <div 
              key={idx} 
              className="metric-bento-reveal will-change-transform group relative 
                         p-[14px] md:p-8 rounded-[12px] 
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
                <div className="text-display md:text-display-lg font-semibold tracking-tighter text-[var(--color-text-Black-100)] dark:text-white">
                  <AnimatedNumber value={metric.value} />
                </div>
                <div>
                  <div className="text-h6 md:text-subtitle font-medium text-[var(--color-text-Black-100)] dark:text-white/90 leading-tight whitespace-pre-line">
                    {metric.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
