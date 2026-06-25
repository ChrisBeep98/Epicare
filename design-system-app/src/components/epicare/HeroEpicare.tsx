"use client";

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

export default function HeroEpicare() {
  const t = useTranslations('landingV2.hero');
  const [isDark, setIsDark] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHeaderForcedDark, setIsHeaderForcedDark] = useState(false);
  const [isHeaderPill, setIsHeaderPill] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navBgRef = useRef<HTMLDivElement>(null);
  const logoARef = useRef<HTMLDivElement>(null);
  const logoBRef = useRef<HTMLDivElement>(null);
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

      // Configurar z-indexes iniciales y estado del logo handoff
      gsap.set(navBgRef.current, { zIndex: 1 });
      gsap.set(logoBRef.current, { opacity: 0, pointerEvents: 'none' });
      gsap.set(logoARef.current, { opacity: 1, pointerEvents: 'auto' });

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

      // Acto 1 -> Asegurar z-indexes durante la animación de expansión
      tl.set(navBgRef.current, { zIndex: 1 }, 0);

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

      // Acto 1 -> El logo viaja al Navbar flotante (Centrado dinámicamente)
      tl.to(logoARef.current, {
        top: "18px",
        left: () => {
          const img = logoBRef.current?.querySelector('img');
          const rect = img ? img.getBoundingClientRect() : logoBRef.current?.getBoundingClientRect();
          return rect ? rect.left : 24;
        },
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // Acto 1 -> Logo handoff crossfade (de 0.9 a 1.0)
      tl.to(logoARef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.1,
        ease: "power2.inOut"
      }, 0.9);

      tl.to(logoBRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.1,
        ease: "power2.inOut"
      }, 0.9);

      // Acto 1 -> Swap de z-indexes al completar la expansión (time 1.0)
      tl.set(navBgRef.current, { zIndex: 999998 }, 1.0);

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

  const navLayoutClass = isHeaderPill
    ? "top-2 h-14 md:h-16"
    : "top-4 md:top-6 h-16";

  const navBgClass = isHeaderPill
    ? (isHeaderForcedDark 
        ? "bg-black/20 border-white/10 dark:border-white/5 shadow-elevation-2 rounded-full border backdrop-blur-md" 
        : "bg-white/50 dark:bg-black/20 border-black/10 dark:border-white/5 shadow-elevation-2 rounded-full border backdrop-blur-md")
    : "bg-transparent border-transparent shadow-none rounded-none";

  const iconColorClass = (isHeaderForcedDark || isDark)
    ? "text-white hover:text-white/80"
    : "text-[var(--color-text-Black-100)] hover:opacity-80";

  const logoColorClass = (isHeaderForcedDark || isDark)
    ? "brightness-100"
    : "brightness-0 dark:brightness-100";

  return (
    <div className="w-full overflow-x-hidden bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)]">
      
      {/* Background Pill Layer (z-[10] inicialmente para quedar detrás del video/Logo A) */}
      <div 
        ref={navBgRef}
        className={`fixed left-[var(--space-gutter-sm)] right-[var(--space-gutter-sm)] lg:left-[var(--space-gutter-md)] lg:right-[var(--space-gutter-md)] pointer-events-none transition-all duration-300 ${navLayoutClass} ${navBgClass}`}
      />

      {/* Controls & Logo B Layer (z-[999999] siempre al frente) */}
      <nav 
        ref={navRef} 
        className={`fixed left-[var(--space-gutter-sm)] right-[var(--space-gutter-sm)] lg:left-[var(--space-gutter-md)] lg:right-[var(--space-gutter-md)] flex justify-between items-center px-4 md:px-6 z-[999999] pointer-events-auto transition-all duration-300 ${navLayoutClass}`}
      >
        {/* Logo B (Empieza invisible, se muestra mediante crossfade al final del Acto 1) */}
        <div 
          ref={logoBRef}
          id="fixed-navbar-logo" 
          className="w-[120px] md:w-[150px] flex-shrink-0 flex items-center opacity-0 pointer-events-none"
        >
          <img 
            src="/epicare_logo.svg" 
            alt="Epicare Insurance Logo" 
            className={`h-[36px] md:h-[44px] w-auto object-contain drop-shadow-lg transition-all duration-300 ${logoColorClass}`}
          />
        </div>
        
        {/* Botones de acción */}
        <div className={`flex items-center gap-fluid-xs transition-colors duration-300 ${iconColorClass}`}>
          <button 
            type="button" 
            onClick={toggleTheme} 
            className="w-10 h-10 flex items-center justify-center cursor-pointer relative z-50 transition-transform duration-300 hover:scale-110 active:scale-95"
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
          <button type="button" className="w-10 h-10 flex items-center justify-center cursor-pointer relative z-50 transition-opacity hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

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
            {/* EL ÚNICO LOGO: Vive permanentemente aquí adentro. 
                Tiene padding simétrico en el Acto 1. 
                Al expandirse el video, GSAP mueve este logo sutilmente 
                para que quede perfectamente alineado con el Navbar en el Acto 2. */}
            <div 
              ref={logoARef}
              id="epicare-logo-container"
              className="absolute top-static-lg left-static-lg md:top-static-xl md:left-static-xl z-[1000000] pointer-events-auto will-change-transform"
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
