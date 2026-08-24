"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: "100%", label: "De tu book of business" },
  { value: "$0",     label: "Costo de plataforma" },
  { value: "< 24h",  label: "Respuesta de soporte" },
];

export default function WhyEpicare() {
  const container = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    let ctx = gsap.context(() => {
      
      elementsRef.current.forEach((el, i) => {
        if (!el) return;
        const isEven = i % 2 === 0;

        // 1. Entrada Lateral Original (del Commit) + Máscara
        gsap.fromTo(el,
          {
            x: isEven ? "-100vw" : "100vw",
            clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", // La máscara solicitada
            opacity: 0
          },
          {
            x: "0vw",
            clipPath: "inset(0 -20% 0 -20%)",
            opacity: 1,
            ease: "none", // El suavizado lineal que preferías del commit
            scrollTrigger: {
              trigger: el,
              start: "top 95%", 
              end: "top 60%",   
              scrub: 1
            }
          }
        );
      });

    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container} 
      className="w-full py-section-lg bg-[#FAFAFA] dark:bg-[#050505] overflow-hidden flex flex-col justify-center relative px-gutter-lg"
    >
      <div className="mx-auto max-w-section-lg w-full gap-0">
        <div className="relative z-10 w-full flex flex-col gap-[var(--spacing-static-lg)] md:gap-[var(--spacing-static-sm)] mix-blend-difference text-white">
           {METRICS.map((m, i) => (
             <div 
               key={i} 
               ref={el => {
                 elementsRef.current[i] = el;
               }}
               className="w-full flex flex-col md:flex-row md:items-baseline leading-[0.85] transform-gpu"
             >
               <span className="font-mono text-left text-[25vw] md:text-[18vw] font-black tracking-tighter tabular-nums whitespace-nowrap opacity-95">
                 {m.value}
               </span>
               <span className="text-left text-body-xl-light md:text-body-2xl-light md:ml-8 mt-2 md:mt-0 opacity-70 uppercase md:normal-case">
                 {m.label}
               </span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
