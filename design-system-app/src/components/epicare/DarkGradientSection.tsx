"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DarkGradientSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium 3D Blur Reveal
      gsap.fromTo(".fade-up", 
        { opacity: 0, y: 60, rotationX: 15, scale: 0.9, filter: "blur(8px)" },
        {
          opacity: 1, 
          y: 0,
          rotationX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 98%"
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
      img: "innovation.mp4",
      imgLight: "innovation_Light.mp4",
      isVideo: true
    },
    { 
      step: "02 · Support", 
      title: "Expert guidance and broker support", 
      subtitle: "We walk with you every step.", 
      body: "Rely on our dedicated team of industry veterans to provide personalized coaching, operational support, and strategic advice whenever you need it.",
      img: "support_dark.png",
      imgLight: "support_LLight.png"
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
      img: "Dark_wireframe_3D_illustration_on_202606232200 1.png",
      imgLight: "Dark_wireframe_3D_illustration_on_202606232200 1.png"
    }
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const index = Math.round(scrollLeft / (container.scrollWidth / features.length));
    setActiveIndex(index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] py-section-sm md:py-section-lg z-20 overflow-hidden transition-colors duration-500 px-[14px] md:px-[clamp(1.5rem,4vw,3.5rem)]"
    >
      <div className="max-w-section-lg mx-auto w-full">
        
        <div className="relative w-full min-h-0 h-auto md:min-h-[75vh] rounded-[12px] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col justify-center items-start md:items-center text-left md:text-center px-[14px] py-12 md:p-12 lg:p-16 bg-transparent transition-colors duration-500">
          
          {/* Fondo Azul Suave (Light Mode) */}
          <div 
            className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-500 block dark:hidden"
            style={{
              background: "radial-gradient(ellipse at top, rgba(2,151,227, 0.10) 0%, rgba(2,151,227, 0.02) 60%, transparent 100%)"
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
          <div className="relative z-10 flex flex-col items-start md:items-center gap-6 md:gap-8 max-w-4xl w-full md:mx-auto pb-4 md:pb-8">
            
            <h2 className="fade-up opacity-0 text-display text-left md:text-center text-[var(--color-text-Black-100)] dark:text-white tracking-tighter leading-[1.05] transition-colors duration-500">
              Everything You Need to Succeed
            </h2>

            <p className="fade-up opacity-0 text-body text-left md:text-center text-[var(--color-text-Black-100)]/70 dark:text-white/70 max-w-2xl font-light transition-colors duration-500">
              We don’t just open doors — we provide the tools, support, and opportunities you need to succeed at every step.
            </p>

          </div>

          {/* Grid de Cards: Liquid Glass Edge-to-Edge */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="relative z-10 flex md:grid md:grid-cols-4 overflow-x-auto overflow-y-hidden md:overflow-x-visible md:overflow-y-visible scrollbar-none gap-[14px] md:gap-6 w-full mt-4 md:mt-12 md:perspective-[1000px]"
          >
            {features.map((card, idx) => (
              <div 
                key={idx} 
                className="fade-up opacity-0 flex flex-col shrink-0 w-[80vw] md:w-auto rounded-[8px] bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-base)] backdrop-blur-md border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 transition-all duration-500 shadow-[var(--shadow-elevation-1)] hover:shadow-[var(--shadow-elevation-3)] hover:md:-translate-y-2 cursor-pointer group overflow-hidden"
              >
                {/* Bloque de Texto Superior (Step, Título y Cuerpo Largo) */}
                <div className="flex flex-col p-[14px] md:p-6 w-full gap-3 text-left">
                  <span className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[var(--color-brand-blue)] font-medium">
                    {card.step}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-h5 md:text-h4 text-[var(--color-text-Black-100)] dark:text-white font-medium leading-tight tracking-tight transition-colors duration-500">
                      {card.title}
                    </h3>
                    <p className="text-body-sm text-[var(--color-text-Black-100)]/70 dark:text-white/60 font-light leading-relaxed transition-colors duration-500">
                      {card.body}
                    </p>
                  </div>
                </div>

                {/* Contenedor Visual (Medio, flex-1, Transparente) */}
                <div className="w-full flex-1 min-h-[200px] relative bg-transparent overflow-hidden transition-colors duration-500">
                  {card.isVideo ? (
                    <>
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        src={`/Files/Epicare_Landing/Features/${card.imgLight || card.img}`}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out block dark:hidden"
                      />
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        src={`/Files/Epicare_Landing/Features/${card.img}`}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out hidden dark:block"
                      />
                    </>
                  ) : (
                    <>
                      <img 
                        src={`/Files/Epicare_Landing/Features/${card.imgLight || card.img}`} 
                        alt={card.title} 
                        className="absolute inset-0 w-full h-full object-contain p-6 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out block dark:hidden" 
                      />
                      <img 
                        src={`/Files/Epicare_Landing/Features/${card.img}`} 
                        alt={card.title} 
                        className="absolute inset-0 w-full h-full object-contain p-6 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out hidden dark:block" 
                      />
                    </>
                  )}
                </div>
                
              </div>
            ))}
          </div>

          {/* Dots Indicator (Mobile Only) */}
          <div className="flex md:hidden justify-center gap-2 mt-6 z-10">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const container = scrollContainerRef.current;
                    const targetCard = container.children[idx] as HTMLElement;
                    if (targetCard) {
                      // Usar GSAP para animar el scroll horizontal de manera ultra-suave
                      gsap.to(container, {
                        scrollLeft: targetCard.offsetLeft - 14,
                        duration: 0.6,
                        ease: "power2.out"
                      });
                    }
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'bg-[var(--color-brand-blue)] w-4' 
                    : 'bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
        </div>
      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
