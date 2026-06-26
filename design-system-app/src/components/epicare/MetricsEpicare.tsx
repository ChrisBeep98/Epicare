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
        className="w-full mt-0 md:mt-auto py-section-lg md:py-section-xl px-4"
      >
        <div className="max-w-section-lg mx-auto relative z-10 flex flex-col gap-fluid-lg w-full">


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
