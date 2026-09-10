"use client";

import React, { useRef, useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProblemGoCrm() {
  const t = useTranslations("goCrm.problem");
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  const points = [
    { num: "01", title: t("p1"), desc: t("p1_desc"), image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop" },
    { num: "02", title: t("p2"), desc: t("p2_desc"), image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop" },
    { num: "03", title: t("p3"), desc: t("p3_desc"), image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" },
    { num: "04", title: t("p4"), desc: t("p4_desc"), image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop" },
    { num: "05", title: t("p5"), desc: t("p5_desc"), image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop" },
    { num: "06", title: t("p6"), desc: t("p6_desc"), image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1200&auto=format&fit=crop" },
    { num: "07", title: t("p7"), desc: t("p7_desc"), image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" }
  ];

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Horizontal Scroll
      gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1, 
          start: "top top",
          end: () => "+=" + (track.current!.scrollWidth),
          invalidateOnRefresh: true
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="h-screen w-full bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] overflow-hidden flex items-center">
      
      {/* Track Horizontal que contiene el Título y las columnas */}
      <div ref={track} className="flex h-full w-max items-stretch">
        
        {/* Panel 0: Título Masivo (Acto 0) */}
        <div className="w-[100vw] lg:w-[45vw] h-full flex flex-col justify-center px-8 lg:pr-16 lg:pl-[8vw] xl:pl-[12vw] border-r border-[var(--color-border-Strokes-default)] shrink-0">
          <p className="text-meta uppercase tracking-[0.2em] text-[var(--color-brand-blue)] mb-8 font-mono">
            {t("overline")}
          </p>
          <h2 className="text-display-md lg:text-[4vw] font-medium tracking-tight leading-[1.05] max-w-4xl">
            {t("h2")}
          </h2>
        </div>

        {/* Paneles 1 al 7: Columnas expansibles al hover */}
        {points.map((pt, i) => (
          <div 
            key={i} 
            className="group relative h-full flex flex-col justify-end border-r border-[var(--color-border-Strokes-strong)] shrink-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] w-[85vw] lg:w-[22vw] hover:w-[85vw] hover:lg:w-[45vw] bg-[var(--color-surface-BG-base)]"
          >
            {/* Imagen de Fondo (Se revela en Hover) */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-black/70 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]"></div>
              <img 
                src={pt.image} 
                alt={pt.title}
                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] grayscale mix-blend-luminosity" 
              />
            </div>

            {/* Contenido (Textos) */}
            <div className="relative z-10 w-full h-full flex flex-col p-8 lg:p-12">
              <span className="block text-meta font-mono mb-8 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-blue)] transition-colors duration-500">
                {pt.num}
              </span>
              
              <div className="mt-auto mb-6">
                <h3 className="text-display-xs lg:text-display-sm font-medium tracking-tight text-[var(--color-text-primary)] group-hover:text-white transition-colors duration-500">
                  {pt.title}
                </h3>
              </div>

              {/* Subtítulo Largo (Acordeón Vertical en Hover) */}
              <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100">
                <div className="overflow-hidden">
                  <div className="w-[80vw] lg:w-[35vw] pb-4">
                    <p className="text-body-lg text-white/80 font-light leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Espacio final (buffer amplio para absorber las expansiones sin cortar la última tarjeta) */}
        <div className="w-[15vw] lg:w-[30vw] h-full shrink-0 bg-[var(--color-surface-BG-base)]" />

      </div>
    </section>
  );
}
