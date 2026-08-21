"use client";

import React, { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Calculator, 
  Users, 
  FileText,
  CurrencyDollar,
  UsersThree,
  Gear,
  CheckCircle
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const MODULES = [
  { id: 1, name: "Quote", icon: Calculator },
  { id: 2, name: "Customers", icon: Users },
  { id: 3, name: "Contracts", icon: FileText },
  { id: 4, name: "Commissions", icon: CurrencyDollar },
  { id: 5, name: "Downline", icon: UsersThree },
  { id: 6, name: "Settings", icon: Gear },
];

export default function DelegateUsersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Cinematic Architect Tilt
  useEffect(() => {
    if (!sceneRef.current) return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const xTo = gsap.quickTo(sceneRef.current, "rotationY", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(sceneRef.current, "rotationX", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 12; 
      const y = (clientY / window.innerHeight - 0.5) * -12;
      xTo(x);
      yTo(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Breathing Canvas pasivo
      gsap.to(".glass-matrix", { y: "-=10px", rotationZ: "0.5deg", repeat: -1, yoyo: true, duration: 5, ease: "sine.inOut" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        repeat: -1,
        repeatDelay: 1.5 
      });

      // ── RESET MAESTRO PARA EL LOOP ──
      tl.addLabel("reset")
        .set(".subtitle-content", { opacity: 0, y: 10 })
        .set(".glass-matrix", { opacity: 0, y: 60, scale: 0.95 })
        .set(".module-card", { opacity: 0, y: 30, scale: 0.8 }) 
        .set(".toggle-knob", { x: 0 })
        .set(".toggle-bg", { backgroundColor: "var(--color-surface-BG-3)", borderColor: "var(--color-border-Strokes-default)" })
        .set(".check-icon", { scale: 0, opacity: 0 });

      // ── ACTO 1: El Lienzo Seguro ──
      tl.addLabel("acto1", "+=0.2")
        .to(".subtitle-content", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "acto1")
        .to(".glass-matrix", { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }, "acto1")
        .to(".module-card", { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }, "acto1+=0.3");

      // ── ACTO 2: Delegación Quirúrgica ──
      tl.addLabel("acto2", "+=1.2")
        // Enciende Quote(1), Customers(2), Downline(5)
        .to([".toggle-knob-1", ".toggle-knob-2", ".toggle-knob-5"], { x: 16, duration: 0.4, stagger: 0.1, ease: "back.out(2)" }, "acto2")
        .to([".toggle-bg-1", ".toggle-bg-2", ".toggle-bg-5"], { backgroundColor: "rgba(53,187,253,0.15)", borderColor: "rgba(53,187,253,0.5)", duration: 0.4, stagger: 0.1 }, "acto2")
        .to([".check-1", ".check-2", ".check-5"], { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2)" }, "acto2+=0.1")
        .to([".module-1", ".module-2", ".module-5"], { scale: 1.05, boxShadow: "0 10px 20px rgba(53,187,253,0.1)", duration: 0.4, stagger: 0.1, ease: "power2.out" }, "acto2");

      // ── CIERRE ──
      tl.addLabel("end", "+=3") 
        .to([".module-1", ".module-2", ".module-5"], { scale: 1, boxShadow: "0 1px 2px rgba(0,0,0,0.05)", duration: 0.3 }, "end") 
        .to(".glass-matrix", { opacity: 0, y: -40, scale: 0.9, duration: 0.8, ease: "power3.in" }, "end")
        .to(".subtitle-content", { opacity: 0, duration: 0.3 }, "end");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="delegate-users"
      className="w-full bg-[var(--color-surface-BG-base)] relative z-10 pt-0 pb-section-md overflow-hidden"
    >
      <div className="w-full max-w-section-lg mx-auto px-gutter-md">
        <div className="grid-layout items-center gap-fluid-lg">
          
          {/* ── LADO IZQUIERDO: Copy Simple ── */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-fluid-sm relative z-20">
            <h2 className="text-display-lg text-[var(--color-text-primary)] leading-[1.1] tracking-tight mb-space-static-sm max-w-xl">
              Tu equipo entra <span className="text-[var(--color-text-accent-blue)]">con su propia cuenta.</span>
            </h2>
            
            <p className="subtitle-content text-body-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[400px]">
              Otorga permisos granulares a tu asistente. Mantén la <strong className="text-[var(--color-text-primary)] font-semibold">seguridad total</strong> de tu agencia eligiendo <strong className="text-[var(--color-text-primary)] font-semibold">exactamente a qué herramientas</strong> pueden acceder.
            </p>
          </div>

          {/* ── LADO DERECHO: The Storytelling Matrix (6 Squares) ── */}
          <div className="col-span-12 lg:col-span-6 relative flex justify-center items-center h-[600px] perspective-[1500px]">
            
            <div ref={sceneRef} className="relative w-full h-full flex justify-center items-center transform-style-3d">
              
              {/* MIDDLE LAYER: Glass Matrix */}
              <div className="glass-matrix absolute transform translate-z-[0px] w-[340px] flex flex-col gap-4">
                
                <div className="bg-white/50 backdrop-blur-3xl border border-white/60 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] p-5 relative overflow-hidden h-[340px]">
                  
                  {/* Grid de 6 Cuadros */}
                  <div className="grid grid-cols-2 grid-rows-3 gap-3 w-full h-full relative z-10">
                    {MODULES.map((mod) => {
                      const Icon = mod.icon;
                      return (
                        <div key={mod.id} className={`module-card module-${mod.id} bg-white/90 rounded-2xl p-4 flex flex-col justify-between border border-white/50 h-[92px] relative overflow-hidden shadow-sm`}>
                          
                          <div className={`check-icon check-${mod.id} absolute top-2 right-2 text-emerald-500`}>
                             <CheckCircle weight="fill" className="w-4 h-4" />
                          </div>
                          
                          <Icon weight="fill" className="w-5 h-5 text-[var(--color-brand-blue)]" />
                          <div>
                            <div className="text-sm font-semibold text-[var(--color-text-primary)] leading-none">{mod.name}</div>
                            <div className={`toggle-bg toggle-bg-${mod.id} w-9 h-5 mt-2.5 rounded-full border border-[var(--color-border-Strokes-default)] bg-[var(--color-surface-BG-3)] flex items-center px-0.5`}>
                              <div className={`toggle-knob toggle-knob-${mod.id} w-4 h-4 rounded-full bg-white shadow-sm`} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
