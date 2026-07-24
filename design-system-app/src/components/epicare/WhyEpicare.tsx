"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: "6,000+", label: "Asegurados activos" },
  { value: "130+",   label: "Carrier appointments" },
  { value: "52",     label: "Jurisdicciones" },
  { value: "< 24h",  label: "SLA garantizado" },
];

export default function WhyEpicare() {
  const container = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax scroll on the giant texts based on velocity/scroll position
      gsap.utils.toArray<HTMLElement>(".wy-huge-text").forEach((text, i) => {
        gsap.to(text, {
          yPercent: -40 * (i + 1), // Different speeds for extreme parallax
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="w-full min-h-[200vh] bg-[#FAFAFA] dark:bg-[#050505] overflow-hidden flex flex-col justify-center px-6 md:px-12 py-32 relative">
      

      <div className="relative z-10 w-full flex flex-col gap-12 md:-gap-8 mix-blend-difference text-white pt-[30vh]">
         {METRICS.map((m, i) => (
           <div key={i} className="wy-huge-text flex flex-col md:flex-row md:items-baseline leading-[0.85] mb-16 md:mb-0 transform-gpu">
             <span className="text-[25vw] md:text-[18vw] font-black tracking-tighter tabular-nums whitespace-nowrap opacity-95">
               {m.value}
             </span>
             <span className="text-h4 md:text-h2 font-medium tracking-tight md:ml-8 mt-2 md:mt-0 opacity-80 uppercase md:normal-case">
               {m.label}
             </span>
           </div>
         ))}
      </div>
    </section>
  );
}
