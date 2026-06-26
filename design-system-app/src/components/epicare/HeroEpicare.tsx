"use client";

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import HeaderEpicare from './HeaderEpicare';

export default function HeroEpicare() {
  const t = useTranslations('landingV2.hero');
  const [isDark, setIsDark] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHeaderForcedDark, setIsHeaderForcedDark] = useState(false);
  const [isHeaderPill, setIsHeaderPill] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Fix para móvil: ignorar el resize de la barra de direcciones
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    const isDarkTheme = document.documentElement.classList.contains('dark');
    setIsDark(isDarkTheme);

    const ctx = gsap.context(() => {
      // Animación infinita de la línea de scroll
      gsap.fromTo(scrollLineRef.current, 
        { yPercent: -100 }, 
        { yPercent: 100, duration: 1.5, ease: "power2.inOut", repeat: -1 }
      );

      // Ocultar la UI del Hero y el Navbar real al inicio
      gsap.set(heroContentRef.current, { 
        opacity: 0, 
        pointerEvents: 'none', 
        y: 30,
        scale: 0.98 
      });

      // Asegurar que la viñeta oscura empiece invisible
      gsap.set(vignetteRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // Tarda 1.5 pantallas en hacer la expansión completa + 1.0 pantalla anclada para que el Carousel pase por encima
          pin: true,
          scrub: 1, // Suavizado
          onUpdate: (self) => {
            // Desactivar el efecto 3D del mouse en cuanto el usuario empiece a scrollear
            if (self.progress > 0.05) {
              setIsExpanded(true);
            } else {
              setIsExpanded(false);
            }

            // Force dark header style during Act 2 expansion (when background video is fullscreen behind header)
            if (self.progress >= 0.35 && self.progress < 0.95) {
              setIsHeaderForcedDark(true);
            } else {
              setIsHeaderForcedDark(false);
            }

            // Header becomes a pill from Act 2 onwards (progress >= 0.35)
            if (self.progress >= 0.35) {
              setIsHeaderPill(true);
            } else {
              setIsHeaderPill(false);
            }
          }
        }
      });

      // Acto 1 -> Desaparece el indicador de scroll apenas se mueve la rueda
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out"
      }, 0);

      // Acto 1 -> Expansión del Video a Full Screen
      tl.to(videoWrapperRef.current, {
        width: "100%", // Se usa 100% en vez de 100vw para evitar scroll horizontal por culpa de la barra de desplazamiento
        height: "100dvh", // Uso de dvh para evitar saltos en móvil
        borderRadius: "0px",
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0,
        borderWidth: "0px",
        boxShadow: "0 0px 0px rgba(0,0,0,0)",
        force3D: true,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // Acto 1 -> Aparece la viñeta oscura
      tl.to(vignetteRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // Acto 2 -> Revelación del Hero
      tl.to(heroContentRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1
      }, 0.6);

      // Acto 3 (Invisible) -> Mantenemos el Hero pineado sin hacer nada durante 100vh adicionales 
      // para que la siguiente sección con margin-top negativo se deslice por encima.
      tl.to({}, { duration: 0.8 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Efecto 3D que sigue al mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isExpanded || !videoWrapperRef.current || window.innerWidth < 768) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;
    
    gsap.to(videoWrapperRef.current, {
      rotationY: xPos * 3,
      rotationX: -yPos * 3,
      x: xPos * 8,
      y: yPos * 8,
      ease: 'power2.out',
      duration: 0.6
    });
  };

  const handleMouseLeave = () => {
    if (isExpanded || !videoWrapperRef.current || window.innerWidth < 768) return;
    gsap.to(videoWrapperRef.current, {
      rotationY: 0,
      rotationX: 0,
      x: 0,
      y: 0,
      ease: 'power3.out',
      duration: 1
    });
  };

  return (
    <div className="w-full overflow-x-hidden bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)]">
      
      {/* Header Reutilizable y Autogestionado */}
      <HeaderEpicare isHeaderPill={isHeaderPill} isHeaderForcedDark={isHeaderForcedDark} />

      <div ref={containerRef} className="w-full relative z-10 bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] text-[var(--color-text-primary)]">
        
        {/* Viewport Fijo para la experiencia cinemática */}
        <div 
          className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)]"
          style={{ perspective: "1200px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* EL VIDEO (ACTO 1: Pequeño y sin viñeta -> ACTO 2: Fullscreen con viñeta) */}
          <div 
            ref={videoWrapperRef} 
            className="relative w-[95vw] md:w-full h-[64dvh] md:h-[70dvh] rounded-[2rem] md:rounded-[4px] overflow-hidden shadow-elevation-2 bg-[var(--color-surface-BG-black)] will-change-transform z-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen scale-[1.05]"
            >
              <source src="/Files/Epicare_Landing/Hero/epicare_landing_hero.mp4" type="video/mp4" />
            </video>
            {/* Overlay gradient que empieza oculto y aparece en pantalla completa */}
            <div ref={vignetteRef} className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none opacity-0 z-[50]" />
          </div>

          {/* INDICADOR DE SCROLL MINIMALISTA (ACTO 1) */}
          <div 
            ref={scrollIndicatorRef}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-static-md z-[60] pointer-events-none"
          >
            <span className="text-[0.5625rem] uppercase tracking-[0.4em] text-[var(--color-text-primary)] font-light">
              {t('scrollDown')}
            </span>
            <div className="w-[1px] h-10 bg-[var(--color-border-Strokes-default)] relative overflow-hidden">
              <div ref={scrollLineRef} className="w-full h-full bg-[var(--color-brand-blue)] opacity-80" />
            </div>
          </div>

          {/* UI LAYER SUPERPUESTA */}
          <div className="absolute inset-0 w-full h-full z-[200] flex flex-col pointer-events-none">
            
            {/* Hero Content Original */}
            <section ref={heroContentRef} className="w-full flex-1 px-[var(--space-gutter-sm)] lg:px-[var(--space-gutter-md)] flex flex-col pt-[120px] pb-[40px] md:pb-[60px] relative">
              <div className="grid-layout flex-1 max-w-section-xl w-full mx-auto pointer-events-auto">
                
                {/* Fila 2: Titular Principal */}
                <div className="col-start-1 col-span-12 md:col-start-1 md:col-span-7 row-start-2 md:row-start-5 row-span-1 flex flex-row justify-start items-end pb-8">
                  <h1 className="text-display-xl text-white drop-shadow-lg leading-none mb-4">
                    {t('title1')}<br/>{t('title2')}
                  </h1>
                </div>

                {/* Fila 3: Subtítulo y CTA */}
                <div className="col-start-1 col-span-12 md:col-start-1 md:col-span-5 row-start-3 md:row-start-6 row-span-1 flex flex-col justify-start items-start gap-fluid-sm">
                  <p className="hidden md:block text-body-lg text-[var(--color-text-White-100)] leading-relaxed font-light">
                    {t('description')}
                  </p>
                  <p className="md:hidden text-body-md text-[var(--color-text-White-100)] leading-relaxed font-light">
                    {t('descriptionMobile')}
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-static-md md:gap-fluid-xs">
                    <button className="w-fit bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-text)] px-static-xl py-static-md rounded-full text-ui-label hover:opacity-90 transition-all flex justify-center items-center shadow-elevation-2">
                      {t('ctaPlans')}
                    </button>
                    <button className="w-fit bg-white/10 border border-[var(--color-border-Strokes-White-100)] text-[var(--color-text-White-100)] px-static-xl py-static-md rounded-full text-ui-label hover:bg-white/20 transition-all flex justify-center items-center shadow-elevation-1">
                      {t('ctaAgents')}
                    </button>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
