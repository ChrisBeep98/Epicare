"use client";

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

export default function HeroEpicare() {
  const t = useTranslations('landingV2.hero');
  const [isDark, setIsDark] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Fix para móvil: ignorar el resize de la barra de direcciones
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      setIsDark(true);
    }

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
      // Al expandirse, el logo (que está dentro del video) viaja orgánicamente hasta la esquina de la pantalla.
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

      // Acto 1 -> El logo ajusta su padding para alinearse perfectamente con el Navbar
      const isMobile = window.innerWidth < 768;
      tl.to("#epicare-logo-container", {
        top: "10px",
        left: isMobile ? "var(--space-gutter-sm)" : "var(--space-gutter-md)", // En mobile será ligeramente distinto si usamos medias, pero esto asegura la posición final
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
      // (1.2s de animación previa equivale a 150vh. Para sumar 100vh, agregamos 0.8s de idle).
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
      rotationY: xPos * 4,
      rotationX: -yPos * 4,
      x: xPos * 10,
      y: yPos * 10,
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
    <div className="w-full overflow-x-hidden bg-[var(--color-surface-BG-black)]">
      <div ref={containerRef} className="w-full relative bg-[var(--color-surface-BG-black)] text-[var(--color-text-primary)]">
        
        {/* Viewport Fijo para la experiencia cinemática */}
        <div 
          className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[var(--color-surface-BG-black)]"
          style={{ perspective: "1200px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* EL VIDEO (ACTO 1: Pequeño y sin viñeta -> ACTO 2: Fullscreen con viñeta) */}
          <div 
            ref={videoWrapperRef} 
            className="relative w-[95vw] md:w-[90vw] h-[64dvh] md:h-[60dvh] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 will-change-transform z-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* EL ÚNICO LOGO: Vive permanentemente aquí adentro. 
                Tiene padding simétrico en el Acto 1. 
                Al expandirse el video, GSAP mueve este logo sutilmente 
                para que quede perfectamente alineado con el Navbar en el Acto 2. */}
            <div 
              id="epicare-logo-container"
              className="absolute top-static-lg left-static-lg md:top-static-xl md:left-static-xl z-[60] pointer-events-auto will-change-transform"
            >
              <img src="/epicare_logo.svg" alt="Epicare Insurance Logo" className="h-[36px] md:h-[44px] w-auto object-contain drop-shadow-lg" />
            </div>

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
            <span className="text-[0.5625rem] uppercase tracking-[0.4em] text-[var(--color-text-White-100)] font-light">
              {t('scrollDown')}
            </span>
            <div className="w-[1px] h-10 bg-[var(--color-border-Strokes-default)] relative overflow-hidden">
              <div ref={scrollLineRef} className="w-full h-full bg-[var(--color-brand-blue)] opacity-80" />
            </div>
          </div>

          {/* UI LAYER SUPERPUESTA */}
          <div className="absolute inset-0 w-full h-full z-10 flex flex-col pointer-events-none">
            
            {/* Navbar (Visible desde el Acto 1 con Theme Switch y Hamburger Menu) */}
            <nav ref={navRef} className="h-16 w-full flex-shrink-0 px-[var(--space-gutter-sm)] lg:px-[var(--space-gutter-md)] flex justify-end items-center bg-transparent z-[9999] pointer-events-none">
              <div className="flex items-center gap-fluid-xs pointer-events-auto">
                <button 
                  type="button" 
                  onClick={toggleTheme} 
                  className="text-[var(--color-text-primary)] w-10 h-10 flex items-center justify-center cursor-pointer relative z-50 transition-transform duration-300 hover:scale-110 active:scale-95"
                >
                  {isDark ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  )}
                </button>
                <button type="button" className="text-[var(--color-text-primary)] w-10 h-10 flex items-center justify-center cursor-pointer relative z-50 transition-opacity hover:opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </nav>

            {/* Hero Content Original */}
            <section ref={heroContentRef} className="w-full flex-1 px-[var(--space-gutter-sm)] lg:px-[var(--space-gutter-md)] flex flex-col pt-[120px] pb-[40px] md:pb-[60px] relative">
              <div className="grid-layout flex-1 max-w-section-xl w-full mx-auto pointer-events-auto">
                
                {/* Fila 2: Titular Principal */}
                <div className="col-start-1 col-span-12 md:col-start-1 md:col-span-7 row-start-2 md:row-start-5 row-span-1 flex flex-row justify-start items-end pb-8">
                  <h1 className="text-display-xl text-[var(--color-text-primary)] drop-shadow-lg leading-none mb-4">
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
                    <button className="w-fit bg-white/10 border border-[var(--color-border-Strokes-White-100)] text-[var(--color-text-primary)] px-static-xl py-static-md rounded-full text-ui-label hover:bg-white/20 transition-all flex justify-center items-center shadow-elevation-1">
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
