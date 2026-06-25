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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Título: Animación de líneas (desktop) y palabras (mobile)
      gsap.fromTo([".title-line", ".title-word"], 
        { 
          yPercent: 120,
          rotateZ: 2,
          opacity: 0
        },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.08, // Stagger rápido para que fluya como agua
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%"
          }
        }
      );

      // 2. Métricas: Revelado Awwwards Premium (ClipPath + Y transform)
      // Esto crea el efecto de que las tarjetas son "desenfundadas" del fondo de manera extremadamente suave
      gsap.fromTo(".metric-card", 
        { 
          y: 80,
          clipPath: "inset(100% 0% 0% 0%)", // La máscara empieza cubriendo todo desde abajo
          scale: 0.98
        },
        {
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)", // Se abre revelando el contenido
          scale: 1,
          duration: 1.8,
          stagger: {
            amount: 0.4,
            ease: "power2.out"
          },
          ease: "expo.out",
          delay: 0.2, // Solapado con el título
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
    <section className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] text-[var(--color-text-Black-100)] dark:text-white transition-colors duration-500 z-20">
      <div 
        ref={sectionRef}
        id="metrics-layout"
        className="w-full mt-0 md:mt-auto pt-section-sm pb-0 md:py-section-lg px-4"
      >
        <div className="max-w-section-lg mx-auto relative z-10 flex flex-col gap-fluid-lg w-full">
          {/* Título Display de 3 líneas con Water Mask en Grid de 12 columnas */}
          <div className="grid-layout w-full">
            <div className="col-start-1 col-span-6 md:col-start-1 md:col-span-10 flex flex-col justify-start items-start">
              {/* Desktop Version: Animación por línea estricta forzada */}
              <h2 className="hidden md:block text-display text-left w-full font-medium text-[var(--color-text-Black-100)] dark:text-white tracking-tighter leading-[1.05] transition-colors duration-500">
                <span className="block overflow-hidden pb-2"><span className="title-line block will-change-transform">{t('titleLine1')}</span></span>
                <span className="block overflow-hidden pb-2"><span className="title-line block will-change-transform">{t('titleLine2')}</span></span>
                <span className="block overflow-hidden pb-2"><span className="title-line block will-change-transform text-[var(--color-brand-blue)]">{t('titleLine3')}</span></span>
              </h2>

              {/* Mobile Version: Water Mask Palabra por Palabra (flujo natural) */}
              <h2 className="block md:hidden text-display text-left w-full font-medium text-[var(--color-text-Black-100)] dark:text-white tracking-tighter leading-[1.05] flex flex-wrap gap-y-1 transition-colors duration-500">
                {t('titleLine1').split(" ").map((word, i) => (
                  <span key={`w1-${i}`} className="inline-flex overflow-hidden align-bottom mr-[0.25em]">
                    <span className="title-word inline-block will-change-transform">{word}</span>
                  </span>
                ))}
                {t('titleLine2').split(" ").map((word, i) => (
                  <span key={`w2-${i}`} className="inline-flex overflow-hidden align-bottom mr-[0.25em]">
                    <span className="title-word inline-block will-change-transform">{word}</span>
                  </span>
                ))}
                {t('titleLine3').split(" ").map((word, i) => (
                  <span key={`w3-${i}`} className="inline-flex overflow-hidden align-bottom mr-[0.25em]">
                    <span className="title-word inline-block will-change-transform text-[var(--color-brand-blue)]">{word}</span>
                  </span>
                ))}
              </h2>
            </div>
          </div>

          {/* Grid de Métricas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-fluid-lg md:gap-fluid-md perspective-[1000px] mt-8 md:mt-0">
            {metrics.map((metric, idx) => (
              <div key={idx} className="metric-card flex flex-col gap-static-sm will-change-transform">
                <div className="text-display-xl md:text-display-2xl font-light text-[var(--color-text-Black-100)] dark:text-white tracking-tighter tabular-nums transition-colors duration-500">
                  <AnimatedNumber value={metric.value} />
                </div>
                <div className="text-ui-label text-[var(--color-text-muted)] dark:text-white/60 uppercase tracking-widest border-t border-black/10 dark:border-white/10 pt-static-sm w-fit pr-static-xl transition-colors duration-500">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
