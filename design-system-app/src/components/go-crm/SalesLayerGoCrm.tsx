"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { 
  UsersThree, 
  CheckSquareOffset, 
  Lightning, 
  ChartLineUp 
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export default function SalesLayerGoCrm() {
  const t = useTranslations("goCrm.salesLayer");
  const sectionRef = useRef<HTMLDivElement>(null);

  // ── NORIA PHYSICS ENGINE SETTINGS ──
  // Calibrated via Debug Panel
  const params = {
    rX: 265,        // Curvatura (Arco X 1)
    rX2: 520,       // Curvatura Extrema (Arco X 2)
    rY: 270,        // Separación Vertical (Radio Y)
    angle: 28,      // Inclinación 3D (Z Angle)
    scaleOff: 0.60, // Escala fondo
    opacOff: 0.30,  // Opacidad fondo
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".noria-card");
      
      // INITIAL SETUP (4 CARDS)
      gsap.set(cards[0], { y: 0, x: 0, rotateZ: 0, scale: 1, opacity: 1, zIndex: 40 });
      gsap.set(cards[1], { y: params.rY, x: params.rX, rotateZ: -params.angle, scale: params.scaleOff, opacity: params.opacOff, zIndex: 30 });
      gsap.set(cards[2], { y: params.rY * 2, x: params.rX2, rotateZ: -(params.angle * 2), scale: params.scaleOff - 0.15, opacity: 0, zIndex: 20 });
      gsap.set(cards[3], { y: params.rY * 3, x: params.rX2, rotateZ: -(params.angle * 3), scale: params.scaleOff - 0.3, opacity: 0, zIndex: 10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        }
      });

      // TRANSITION 1 (Scroll step 1)
      tl.to(cards[0], { y: -params.rY, x: params.rX, rotateZ: params.angle, scale: params.scaleOff, opacity: params.opacOff, ease: "power1.inOut" }, 0);
      tl.to(cards[1], { y: 0, x: 0, rotateZ: 0, scale: 1, opacity: 1, ease: "power1.inOut" }, 0);
      tl.to(cards[2], { y: params.rY, x: params.rX, rotateZ: -params.angle, scale: params.scaleOff, opacity: params.opacOff, ease: "power1.inOut" }, 0);
      tl.to(cards[3], { y: params.rY * 2, x: params.rX2, rotateZ: -(params.angle * 2), scale: params.scaleOff - 0.15, opacity: 0, ease: "power1.inOut" }, 0);
      
      tl.set(cards[0], { zIndex: 30 }, 0.5);
      tl.set(cards[1], { zIndex: 40 }, 0.5);

      // TRANSITION 2 (Scroll step 2)
      tl.to(cards[0], { y: -(params.rY * 2), x: params.rX2, rotateZ: params.angle * 2, scale: params.scaleOff - 0.15, opacity: 0, ease: "power1.inOut" }, 1);
      tl.to(cards[1], { y: -params.rY, x: params.rX, rotateZ: params.angle, scale: params.scaleOff, opacity: params.opacOff, ease: "power1.inOut" }, 1);
      tl.to(cards[2], { y: 0, x: 0, rotateZ: 0, scale: 1, opacity: 1, ease: "power1.inOut" }, 1);
      tl.to(cards[3], { y: params.rY, x: params.rX, rotateZ: -params.angle, scale: params.scaleOff, opacity: params.opacOff, ease: "power1.inOut" }, 1);
      
      tl.set(cards[1], { zIndex: 30 }, 1.5);
      tl.set(cards[2], { zIndex: 40 }, 1.5);

      // TRANSITION 3 (Scroll step 3)
      tl.to(cards[0], { y: -(params.rY * 3), x: params.rX2, rotateZ: params.angle * 3, scale: params.scaleOff - 0.3, opacity: 0, ease: "power1.inOut" }, 2);
      tl.to(cards[1], { y: -(params.rY * 2), x: params.rX2, rotateZ: params.angle * 2, scale: params.scaleOff - 0.15, opacity: 0, ease: "power1.inOut" }, 2);
      tl.to(cards[2], { y: -params.rY, x: params.rX, rotateZ: params.angle, scale: params.scaleOff, opacity: params.opacOff, ease: "power1.inOut" }, 2);
      tl.to(cards[3], { y: 0, x: 0, rotateZ: 0, scale: 1, opacity: 1, ease: "power1.inOut" }, 2);
      
      tl.set(cards[2], { zIndex: 30 }, 2.5);
      tl.set(cards[3], { zIndex: 40 }, 2.5);

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const icons = [
    <UsersThree key="1" weight="duotone" className="w-8 h-8 text-[#F26023]" />,
    <CheckSquareOffset key="2" weight="duotone" className="w-8 h-8 text-[#35BBFD]" />,
    <Lightning key="3" weight="duotone" className="w-8 h-8 text-yellow-500" />,
    <ChartLineUp key="4" weight="duotone" className="w-8 h-8 text-emerald-500" />
  ];

  return (
    <div ref={sectionRef} className="relative w-full h-screen bg-[var(--color-surface-BG-1)] flex items-center overflow-hidden">
      
      {/* ── LAYOUT ── */}
      <div className="w-full max-w-section-lg mx-auto px-gutter-sm md:px-gutter-md flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Copy */}
        <div className="w-full lg:w-5/12 z-20 relative">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-surface-BG-3)] text-[var(--color-text-primary)] font-mono text-ui-label mb-6 border border-[var(--color-border-Strokes-default)]">
            {t("overline")}
          </div>
          <h2 className="text-display lg:text-display-lg font-bold leading-[1.1] text-[var(--color-text-primary)] mb-2">
            {t("featuresTitle")}
          </h2>
          <h2 className="text-display lg:text-display-lg font-bold leading-[1.1] text-[var(--color-brand-blue)]">
            {t("cierre")}
          </h2>
        </div>

        {/* Right Noria (Ferris Wheel) Deck */}
        <div className="w-full lg:w-6/12 h-[600px] relative perspective-[1500px]">
          {[1, 2, 3, 4].map((num, i) => (
            <div 
              key={i} 
              className="noria-card absolute top-1/2 left-0 lg:left-12 -translate-y-1/2 w-full max-w-[460px] bg-white border border-[var(--color-border-Strokes-default)] rounded-[32px] p-10 shadow-elevation-4 flex flex-col justify-center h-auto min-h-[340px] transform-style-3d will-change-transform"
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-BG-2)] flex items-center justify-center mb-6">
                {icons[i]}
              </div>
              <h3 className="text-h2 font-semibold text-[var(--color-text-primary)] leading-tight mb-4">
                {t(`feature${num}Title`)}
              </h3>
              <p className="text-body-md text-[var(--color-text-secondary)] leading-relaxed">
                {t(`feature${num}Desc`)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
