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
        start: "top 90%", // Start earlier
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

  const metricsData = [
    { value: "252+", label: t('carriers'), desc: "Integrated insurance carriers" },
    { value: "25+", label: t('years'), desc: "Years of market leadership" },
    { value: "216+", label: t('agents'), desc: "Active enterprise agents" },
    { value: "24/7", label: t('platform'), desc: "Uptime & support reliability" }
  ];

  // ── GSAP: The Blur Reveal (Apple Style) ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Usar fromTo asegura que si hay problemas de hidratación, 
      // los estilos iniciales se fuercen y luego se limpien hacia el estado final.
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
            trigger: sectionRef.current,
            start: "top 85%", // Trigger un poco más abajo en pantalla para asegurar que se vea
            toggleActions: "play none none none"
          },
          clearProps: "filter" // Evita bugs visuales de Safari al terminar la animación
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative z-20 bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500 py-section-lg">
      <div className="max-w-[1400px] mx-auto px-gutter-md">
        
        {/* ── Header Section ── */}
        <div className="mb-12 max-w-2xl metric-bento-reveal will-change-transform">
          <h2 className="text-display font-medium tracking-tight text-[var(--color-text-Black-100)] dark:text-white">
            Built for Scale
          </h2>
          <p className="text-body-lg text-[var(--color-text-muted)] mt-4">
            Our infrastructure powers the modern insurance ecosystem.
          </p>
        </div>

        {/* ── Layout: The Bento Box Grid (Stripe/Vercel Style) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, idx) => (
            <div 
              key={idx} 
              className="metric-bento-reveal will-change-transform group relative p-8 rounded-3xl bg-[var(--color-surface-BG-1)] dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--color-brand-blue)]/0 to-[var(--color-brand-blue)]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                <div className="text-display-xl font-semibold tracking-tighter text-[var(--color-text-Black-100)] dark:text-white">
                  <AnimatedNumber value={metric.value} />
                </div>
                <div>
                  <div className="text-subtitle font-medium text-[var(--color-text-Black-100)] dark:text-white/90">
                    {metric.label}
                  </div>
                  <div className="text-body-sm text-[var(--color-text-muted)] mt-1">
                    {metric.desc}
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
