"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const brands = [
  "68b074e0f62ece962b5d26cb_12.avif",
  "6924b5293a338aeb5544780c_Carriers-07.png",
  "6924b529602b1dc08277528a_Carriers-06.png",
  "6924b529870154589b85171e_Carriers-02.png",
  "6924b529ad93e22a034f7896_Carriers-03.png",
  "6924b529bdf06074e564bab8_Carriers-01.png",
  "6924b529de9cbd3ce5419ddd_Carriers-05.png",
  "6924b529dec6bcff21cf0180_Carriers-08.png",
  "6924b529f48d522301d4f678_Carriers-04.png",
  "6924b52b07df3dbb09496d62_Carriers-09.png",
  "6924b62f10c87c8220173143_Carriers-15.png",
  "6924b62fece2299037e45a6a_Carriers-10.png",
  "6924b6303794cef9459e4a43_Carriers-17.png",
  "6924b6304dd06c62ed8cc5ec_Carriers-16.png",
  "6924b6306a3bd757ac2d534c_Carriers-11.png",
  "6924b6309e1edf2d8c679001_Carriers-14.png"
];

export default function BrandsCarousel() {
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrack1Ref = useRef<HTMLDivElement>(null);
  const mobileTrack2Ref = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      let cleanupHover = () => {};

      // Velocidades base ultra-suaves (Premium feeling)
      const baseDurationDesktop = 45; 
      const baseDurationMobile = 70; // Ultra lento en mobile para contrarrestar la densidad visual

      if (isMobile) {
        if (mobileTrack1Ref.current && mobileTrack2Ref.current) {
          // Fila 1 Móvil: Izquierda, muy lento
          gsap.to(mobileTrack1Ref.current, {
            xPercent: -33.33333,
            ease: "none",
            duration: baseDurationMobile,
            repeat: -1
          });
          
          // Fila 2 Móvil: Derecha, muy lento
          gsap.fromTo(mobileTrack2Ref.current, 
            { xPercent: -33.33333 },
            { xPercent: 0, ease: "none", duration: baseDurationMobile, repeat: -1 }
          );
        }
      } else {
        if (desktopTrackRef.current) {
          const marqueeTween = gsap.to(desktopTrackRef.current, {
            xPercent: -33.33333,
            ease: "none",
            duration: baseDurationDesktop,
            repeat: -1
          });

          const track = desktopTrackRef.current;
          // Hover ultra elegante: reduce a 20% de velocidad suavemente
          const onEnter = () => gsap.to(marqueeTween, { timeScale: 0.2, duration: 1.2, ease: "power2.out" });
          const onLeave = () => gsap.to(marqueeTween, { timeScale: 1, duration: 1.2, ease: "power2.inOut" });

          track.addEventListener('mouseenter', onEnter);
          track.addEventListener('mouseleave', onLeave);

          cleanupHover = () => {
            track.removeEventListener('mouseenter', onEnter);
            track.removeEventListener('mouseleave', onLeave);
          };
        }
      }

      // Parallax de Scrub con el Scroll (Sutil y elegante)
      if (scrollWrapperRef.current) {
        gsap.to(scrollWrapperRef.current, {
          x: isMobile ? "-1vw" : "-8vw", // Desplazamiento mínimo solo para inercia
          ease: "none",
          scrollTrigger: {
            trigger: scrollWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2 // Scrub alto para máxima sedosidad
          }
        });
      }

      return cleanupHover;
    });

    return () => ctx.revert();
  }, []);

  const half1 = brands.slice(0, 8);
  const half2 = brands.slice(8, 16);

  const renderLogos = (arr: string[], keyPrefix: string) => (
    <>
      {[1, 2, 3].map((setIndex) => (
        <React.Fragment key={`${keyPrefix}-set${setIndex}`}>
          {arr.map((b, i) => (
            <img 
              key={`${keyPrefix}-set${setIndex}-${i}`} 
              src={`/Files/Epicare_Landing/Brand_icons/${b}`} 
              alt="Carrier Logo" 
              className="h-[60px] md:h-[70px] w-auto object-contain grayscale opacity-[0.86] hover:grayscale-0 hover:opacity-100 transition-all duration-300 dark:invert" 
            />
          ))}
        </React.Fragment>
      ))}
    </>
  );

  return (
    <section className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] text-[var(--color-text-Black-100)] dark:text-white z-20 mt-[-100vh] flex flex-col justify-start pt-[8vh] md:pt-[15vh] pb-[8vh] md:pb-[10vh] transition-colors duration-500">
      
      <div className="w-full flex flex-col items-center px-4">
        
        {/* Marquee Container with Centered Peak Gradient Mask */}
        <div className="relative w-full overflow-hidden flex carousel-mask">
          
          {/* Scroll Parallax Wrapper */}
          <div ref={scrollWrapperRef} className="flex flex-col will-change-transform">
            
            {/* --- DESKTOP TRACK (1 ROW) --- */}
            <div ref={desktopTrackRef} className="hidden md:flex w-max items-center gap-fluid-md px-8 py-4 will-change-transform">
              {renderLogos(brands, 'desktop')}
            </div>

            {/* --- MOBILE TRACKS (2 ROWS) --- */}
            <div className="flex md:hidden flex-col gap-fluid-xs w-max py-4">
              {/* Row 1: Left */}
              <div ref={mobileTrack1Ref} className="flex w-max items-center gap-fluid-md px-4 will-change-transform">
                {renderLogos(half1, 'mob1')}
              </div>
              {/* Row 2: Right */}
              <div ref={mobileTrack2Ref} className="flex w-max items-center gap-fluid-md px-4 will-change-transform ml-[-15vw]">
                {renderLogos(half2, 'mob2')}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .carousel-mask {
          /* Mobile curve: wider plateau, sharper fade */
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 10%, black 25%, black 75%, rgba(0,0,0,0.2) 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 10%, black 25%, black 75%, rgba(0,0,0,0.2) 90%, transparent 100%);
        }
        @media (min-width: 768px) {
          .carousel-mask {
            /* Desktop curve: original */
            mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, black 35%, black 65%, rgba(0,0,0,0.2) 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, black 35%, black 65%, rgba(0,0,0,0.2) 85%, transparent 100%);
          }
        }
      `}</style>
    </section>
  );
}
