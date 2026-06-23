"use client";

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroEpicare() {
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

      // El navbar ahora solo contiene los botones de la derecha
      gsap.set(navRef.current, { 
        opacity: 0, 
        pointerEvents: 'none' 
      });

      // Asegurar que la viñeta oscura empiece invisible
      gsap.set(vignetteRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Tarda 1.5 pantallas en hacer la expansión completa
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
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // Acto 1 -> El logo ajusta su padding para alinearse perfectamente con el Navbar
      tl.to("#epicare-logo-container", {
        top: "10px",
        left: "var(--space-gutter-md)", // En mobile será ligeramente distinto si usamos medias, pero esto asegura la posición final
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // Acto 1 -> Aparece la viñeta oscura
      tl.to(vignetteRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // Acto 2 -> Revelación del Hero y los botones del Navbar
      tl.to([navRef.current, heroContentRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1
      }, 0.6);

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
    if (isExpanded || !videoWrapperRef.current) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;
    
    gsap.to(videoWrapperRef.current, {
      rotationY: xPos * 10,
      rotationX: -yPos * 10,
      x: xPos * 20,
      y: yPos * 20,
      ease: 'power2.out',
      duration: 0.6
    });
  };

  const handleMouseLeave = () => {
    if (isExpanded || !videoWrapperRef.current) return;
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
    <div className="w-full overflow-x-hidden bg-black">
      <div ref={containerRef} className="w-full relative bg-black text-[var(--color-text-primary)]">
        
        {/* Viewport Fijo para la experiencia cinemática */}
        <div 
          className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-black"
          style={{ perspective: "1200px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* EL VIDEO (ACTO 1: Pequeño y sin viñeta -> ACTO 2: Fullscreen con viñeta) */}
          <div 
            ref={videoWrapperRef} 
            className="relative w-[90vw] md:w-[60vw] h-[45dvh] md:h-[60dvh] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 will-change-transform z-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* EL ÚNICO LOGO: Vive permanentemente aquí adentro. 
                Tiene padding simétrico en el Acto 1. 
                Al expandirse el video, GSAP mueve este logo sutilmente 
                para que quede perfectamente alineado con el Navbar en el Acto 2. */}
            <div 
              id="epicare-logo-container"
              className="absolute top-6 left-6 md:top-8 md:left-8 z-[60] pointer-events-auto will-change-transform"
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
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-[60] pointer-events-none"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-light">Scroll Down</span>
            <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden">
              <div ref={scrollLineRef} className="w-full h-full bg-white opacity-80" />
            </div>
          </div>

          {/* UI LAYER SUPERPUESTA */}
          <div className="absolute inset-0 w-full h-full z-10 flex flex-col pointer-events-none">
            
            {/* Navbar Real (Aparece en el Acto 2, pero sin el Logo, solo los botones) */}
            <nav ref={navRef} className="h-16 w-full flex-shrink-0 border-b border-[var(--color-border-Strokes-default)] border-opacity-30 px-[var(--space-gutter-sm)] lg:px-[var(--space-gutter-md)] flex justify-end items-center bg-transparent z-[9999]">
              <div className="flex items-center gap-4 pointer-events-auto">
                <button type="button" onClick={toggleTheme} className="bg-black/50 backdrop-blur-md rounded-full p-1 flex items-center shadow-inner cursor-pointer border border-white/20 relative z-50">
                  <div className={`w-5 h-5 rounded-full shadow-sm transition-colors ${!isDark ? 'bg-white' : 'bg-transparent'}`}></div>
                  <div className={`w-5 h-5 rounded-full shadow-sm transition-colors ${isDark ? 'bg-white' : 'bg-transparent'}`}></div>
                </button>
              </div>
            </nav>

            {/* Hero Content Original */}
            <section ref={heroContentRef} className="w-full flex-1 px-[var(--space-gutter-sm)] lg:px-[var(--space-gutter-md)] flex flex-col pt-[120px] pb-[40px] md:pb-[60px] relative">
              <div className="grid-layout flex-1 max-w-section-xl w-full mx-auto pointer-events-auto">
                
                {/* Fila 2: Titular Principal */}
                <div className="col-start-1 col-span-12 md:col-start-1 md:col-span-7 row-start-2 md:row-start-5 row-span-1 flex flex-row justify-start items-end pb-8">
                  <h1 className="text-display-xl text-white drop-shadow-lg leading-none mb-4">
                    La Nueva Era<br/>De La Protección Inteligente.
                  </h1>
                </div>

                {/* Fila 3: Subtítulo y CTA */}
                <div className="col-start-1 col-span-12 md:col-start-1 md:col-span-5 row-start-3 md:row-start-6 row-span-1 flex flex-col justify-start items-start gap-8">
                  <p className="text-body-lg text-white/80 leading-relaxed font-light">
                    Epicare Insurance Corp protege a más de 1 millón de familias a través de tecnología disruptiva, productos accesibles y una red nacional de agentes potenciados por inteligencia artificial.
                  </p>
                  
                  <div className="flex gap-4">
                    <button className="bg-[var(--color-brand-blue)] text-white px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all flex justify-center items-center backdrop-blur-md">
                      Descubre Nuestros Planes
                    </button>
                    <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all flex justify-center items-center backdrop-blur-md">
                      Para Agentes
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
