'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Contador fluido y elegante para números (Clásico y Profesional)
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
        start: "top 85%",
      },
      onUpdate: () => {
        if (nodeRef.current) {
          const currentVal = Math.floor(obj.val);
          // Formatear con comas si es necesario
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Nacimiento Tipográfico Premium (Water Mask + Inclinación) para el título
      gsap.fromTo(".title-line", 
        { 
          yPercent: 120, 
          rotateZ: 3,
          transformOrigin: "left top",
          opacity: 0 
        },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%"
          }
        }
      );

      // 2. Fade-up suave y elegante para las tarjetas (sin efectos complejos)
      gsap.fromTo(".metric-card", 
        { 
          opacity: 0, 
          y: 40 
        },
        {
          opacity: 1, 
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%"
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const metrics = [
    { value: "252+", label: t('carriers') },
    { value: "25+", label: t('years') },
    { value: "216+", label: t('agents') },
    { value: "24/7", label: t('platform') }
  ];

  return (
    <>
      <div 
        ref={sectionRef}
        id="metrics-layout"
        className="w-full mt-auto py-section-md"
      >
        <div className="max-w-section-lg mx-auto relative z-10 flex flex-col gap-fluid-lg w-full">
          {/* Título Display de 3 líneas con Water Mask en Grid de 12 columnas */}
          <div className="grid-layout w-full">
            <div className="col-start-1 col-span-6 md:col-start-1 md:col-span-10 flex flex-col justify-start items-start">
              {/* Desktop Version: 3 forced staggered lines */}
              <h2 className="hidden md:block text-display-xl text-left w-full font-medium text-[var(--color-text-Black-100)] tracking-tighter leading-[1.05]">
                <span className="block overflow-hidden pb-2"><span className="title-line block will-change-transform">{t('titleLine1')}</span></span>
                <span className="block overflow-hidden pb-2"><span className="title-line block will-change-transform">{t('titleLine2')}</span></span>
                <span className="block overflow-hidden pb-2"><span className="title-line block will-change-transform text-[var(--color-brand-blue)]">{t('titleLine3')}</span></span>
              </h2>
              
              {/* Mobile Version: Natural wrapping text in a single mask block */}
              <h2 className="block md:hidden text-display-xl text-left w-full font-medium text-[var(--color-text-Black-100)] tracking-tighter leading-[1.05]">
                <span className="block overflow-hidden pb-2">
                  <span className="title-line block will-change-transform">
                    {t('titleLine1')} {t('titleLine2')} <span className="text-[var(--color-brand-blue)]">{t('titleLine3')}</span>
                  </span>
                </span>
              </h2>
            </div>
          </div>

          {/* Grid de Métricas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-fluid-lg md:gap-fluid-md perspective-[1000px]">
            {metrics.map((metric, idx) => (
              <div key={idx} className="metric-card flex flex-col gap-static-sm will-change-transform">
                <div className="text-display-xl md:text-display-2xl font-light text-[var(--color-text-Black-100)] tracking-tighter tabular-nums">
                  <AnimatedNumber value={metric.value} />
                </div>
                <div className="text-ui-label text-[var(--color-text-muted)] uppercase tracking-widest border-t border-black/10 pt-static-sm w-fit pr-static-xl">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
