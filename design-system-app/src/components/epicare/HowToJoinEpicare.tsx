"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger);

const ZONE1_IMAGES = [
  asset('/Files/how-to-join/zone1-step1.jpeg'),
  asset('/Files/how-to-join/zone1-step2.jpeg'),
  asset('/Files/how-to-join/zone1-step3.jpeg'),
];

const ZONE2_IMAGES = [
  asset('/Files/how-to-join/zone2-step1.jpeg'),
  asset('/Files/how-to-join/zone2-step2.jpeg'),
  asset('/Files/how-to-join/zone2-step3.jpeg'),
];

function StatusCarousel({ images, id, accentClass }: { images: string[], id: string, accentClass: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <style>{`
        @keyframes status-progress-${id} {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
      {/* Status Bars (Liquid Glass) */}
      <div className="absolute top-6 left-6 right-6 z-20 flex gap-2">
        {images.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden liquid-glass bg-black/20 shadow-sm border border-white/10">
            <div 
              className="h-full bg-white"
              style={{
                width: i < activeIndex ? '100%' : '0%',
                animation: i === activeIndex ? `status-progress-${id} 5s linear forwards` : 'none'
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Images */}
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt={`Step visual ${i}`}
          className={`c-img-${id} absolute inset-0 w-full h-full object-cover object-[75%_center] transition-opacity duration-1000 ease-in-out ${
            i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      {/* Soft dark overlay for readability */}
      <div className="absolute inset-0 bg-[var(--color-surface-BG-black)]/20 z-20"></div>
      {/* Brand Color Tint */}
      <div className={`absolute inset-0 mix-blend-color opacity-30 z-20 ${accentClass}`}></div>
    </div>
  );
}

const STEPS = [
  { num: "01", title: "El Primer Contacto", desc: "Todo nace en nuestro portal hiper-optimizado. Datos base y validación de identidad en tiempo récord, sin fricción burocrática." },
  { num: "02", title: "Background Check", desc: "Nuestros nodos se conectan con bases de datos federales. Un proceso que tomaba semanas, ahora resuelto en milisegundos." },
  { num: "03", title: "Firma Electrónica", desc: "Olvídate del papel. Tu onboarding comercial se sella criptográficamente en nuestra bóveda transparente." },
  { num: "04", title: "Aprovisionamiento", desc: "El ecosistema despierta. Tus accesos al CRM, AMS y la plataforma educativa se generan automáticamente." },
  { num: "05", title: "Emisión Activa", desc: "El fin del proceso es el inicio de tu negocio. Estás listo para emitir tu primera póliza." },
];

export default function HowToJoinEpicare() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Light-up animado de los textos al scrollear
      gsap.utils.toArray<HTMLElement>(".c-text-block").forEach(block => {
        gsap.fromTo(block, 
          { opacity: 0.2, filter: "blur(4px)", x: 20 },
          {
            opacity: 1, filter: "blur(0px)", x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: block,
              start: "top 60%",
              end: "top 40%",
              scrub: 1
            }
          }
        );
      });

      // Animación sutil de las imágenes sticky (Diegetic effect)
      gsap.to(".c-img-1", {
        scale: 1.1,
        scrollTrigger: { trigger: ".c-zone-1", scrub: true, start: "top top", end: "bottom top" }
      });
      gsap.to(".c-img-2", {
        scale: 1.1,
        scrollTrigger: { trigger: ".c-zone-2", scrub: true, start: "top top", end: "bottom top" }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)]">
      
      {/* ── ZONA 1: Izquierda Fija / Derecha Scrollea (Pasos 1-3) ── */}
      <div className="c-zone-1 flex flex-col md:flex-row w-full relative">
        {/* Panel Izquierdo: Sticky Visual */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 overflow-hidden border-r border-[var(--color-border-Strokes-default)]">
          <StatusCarousel images={ZONE1_IMAGES} id="1" accentClass="bg-[var(--color-brand-blue)]" />
        </div>
        
        {/* Panel Derecho: Scroll de Textos */}
        <div className="w-full md:w-1/2 py-[20vh] px-8 md:px-[8vw] flex flex-col gap-[30vh]">
          {STEPS.slice(0, 3).map((step, idx) => (
            <div key={idx} className="c-text-block max-w-lg">
              <span className="text-display-md text-[var(--color-brand-blue)] opacity-50 block mb-4">{step.num}</span>
              <h3 className="text-h2 text-[var(--color-text-primary)] mb-6">{step.title}</h3>
              <p className="text-subtitle text-[var(--color-text-secondary)] font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ZONA 2: EL SWAP - Izquierda Scrollea / Derecha Fija (Pasos 4-5) ── */}
      <div className="c-zone-2 flex flex-col-reverse md:flex-row w-full relative">
        {/* Panel Izquierdo: Scroll de Textos */}
        <div className="w-full md:w-1/2 py-[20vh] px-8 md:px-[8vw] flex flex-col justify-end gap-[30vh]">
          {STEPS.slice(3, 5).map((step, idx) => (
            <div key={idx} className="c-text-block max-w-lg">
              <span className="text-display-md text-[var(--color-brand-orange)] opacity-50 block mb-4">{step.num}</span>
              <h3 className="text-h2 text-[var(--color-text-primary)] mb-6">{step.title}</h3>
              <p className="text-subtitle text-[var(--color-text-secondary)] font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Panel Derecho: Sticky Visual */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 overflow-hidden border-l border-[var(--color-border-Strokes-default)]">
          <StatusCarousel images={ZONE2_IMAGES} id="2" accentClass="bg-[var(--color-brand-orange)]" />
        </div>
      </div>

    </section>
  );
}
