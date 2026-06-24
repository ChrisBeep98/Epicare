"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DarkGradientSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up sutil y profesional
      gsap.fromTo(".fade-up", 
        { opacity: 0, y: 40 },
        {
          opacity: 1, 
          y: 0,
          duration: 1.6,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { 
      step: "01 · Innovation", 
      title: "Top marketing and tech solutions", 
      subtitle: "Equip your business with modern tools.", 
      body: "Access state-of-the-art marketing platforms and tech stacks designed to accelerate your growth and streamline your operations seamlessly.",
      img: "Dark_wireframe_3D_illustration_on_202606232157 1.png" 
    },
    { 
      step: "02 · Support", 
      title: "Expert guidance and broker support", 
      subtitle: "We walk with you every step.", 
      body: "Rely on our dedicated team of industry veterans to provide personalized coaching, operational support, and strategic advice whenever you need it.",
      img: "Dark_wireframe_3D_illustration_on_202606232159 (1) 1 [Vectorized].png" 
    },
    { 
      step: "03 · Earnings", 
      title: "Top and transparent compensation", 
      subtitle: "Maximize your true potential.", 
      body: "Enjoy industry-leading commission structures with zero hidden fees. Our transparent models ensure you get rewarded fairly for every success.",
      img: "Dark_wireframe_3D_illustration_on_202606232159 1 [Vectorized].png" 
    },
    { 
      step: "04 · Variety", 
      title: "Diverse portfolio of products", 
      subtitle: "Solutions for every single client.", 
      body: "Offer a comprehensive suite of insurance products from top-rated carriers, allowing you to tailor coverage perfectly to your clients' unique needs.",
      img: "Dark_wireframe_3D_illustration_on_202606232200 1.png" 
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] py-20 md:py-32 z-20 overflow-hidden transition-colors duration-500 px-[14px] md:px-[clamp(1.5rem,4vw,3.5rem)]"
    >
      <div className="max-w-section-lg mx-auto w-full">
        
        {/* Contenedor Transparente (Toma el fondo dinámico de la sección) */}
        <div className="relative w-full min-h-[60vh] md:min-h-[75vh] rounded-[12px] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col justify-center items-center text-center px-[14px] py-12 md:p-12 lg:p-16 bg-transparent transition-colors duration-500">
          
          {/* Fondo Azul Completo (Light Mode - Expansión total sin transparencia final) */}
          <div 
            className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-500 block dark:hidden"
            style={{
              background: "radial-gradient(ellipse at top, rgba(2,151,227, 0.15) 0%, rgba(2,151,227, 0.03) 100%)"
            }}
          />

          {/* Resplandor Azul (Dark Mode - Brand Blue Original) */}
          <div 
            className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[120%] md:w-[100%] h-[150%] opacity-50 z-0 pointer-events-none blur-[150px] transform-gpu transition-opacity duration-500 hidden dark:block"
            style={{
              background: "radial-gradient(circle at top, var(--color-brand-blue) 0%, rgba(5,72,235, 0.40) 25%, transparent 55%)"
            }}
          />

          {/* Contenido Central (Clases Congeladas - Purga Fase 2) */}
          <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 max-w-4xl mx-auto pb-4 md:pb-8">
            
            <h2 className="fade-up text-display-lg text-center text-[var(--color-text-Black-100)] dark:text-white tracking-tighter leading-[1.05] transition-colors duration-500">
              Everything You Need to Succeed
            </h2>

            <p className="fade-up text-body text-center text-[var(--color-text-Black-100)]/70 dark:text-white/70 max-w-2xl font-light transition-colors duration-500">
              At Epicare, we don’t just open doors to the insurance industry — we walk with you every step of the way. Whether you’re just getting started or looking to grow, we provide the tools, support, and opportunities you need.
            </p>

          </div>

          {/* Grid de Cards: Liquid Glass Edge-to-Edge */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] md:gap-6 w-full mt-4 md:mt-12 perspective-[1000px]">
            {features.map((card, idx) => (
              <div 
                key={idx} 
                className="fade-up flex flex-col rounded-[8px] bg-[#0A0A0A] dark:bg-transparent backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 shadow-sm hover:shadow-[0_16px_48px_rgba(5,72,235,0.15)] hover:-translate-y-2 cursor-pointer group overflow-hidden"
              >
                {/* Bloque de Texto Superior (Step, Título y Cuerpo Largo) */}
                <div className="flex flex-col p-[14px] md:p-6 w-full gap-3 text-left">
                  <span className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[var(--color-brand-blue)] font-medium">
                    {card.step}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-h5 md:text-h4 text-white font-medium leading-tight tracking-tight transition-colors duration-500">
                      {card.title}
                    </h3>
                    <p className="text-body-sm text-white/60 font-light leading-relaxed transition-colors duration-500">
                      {card.body}
                    </p>
                  </div>
                </div>

                {/* Contenedor Visual (Medio, flex-1, Transparente) */}
                <div className="w-full flex-1 min-h-[200px] relative bg-transparent p-4 md:p-6 overflow-hidden transition-colors duration-500">
                  <img 
                    src={`/Files/Epicare_Landing/Features/${card.img}`} 
                    alt={card.title} 
                    className="absolute inset-0 w-full h-full object-contain p-6 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                  />
                </div>

                {/* Subtítulo Corto (Abajo) */}
                <div className="flex flex-col p-[14px] md:p-6 w-full text-left bg-white/[0.02] transition-colors duration-500">
                  <p className="text-ui-label md:text-body-sm text-white/90 font-medium tracking-wide transition-colors duration-500">
                    {card.subtitle}
                  </p>
                </div>
                
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
