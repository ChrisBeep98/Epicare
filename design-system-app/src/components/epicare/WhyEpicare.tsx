"use client";

/**
 * WhyEpicare — "La Declaración Dividida" v3
 * ──────────────────────────────────────────
 * Layout: 2 paneles 50/50 de altura 100dvh, pinned por GSAP durante 250vh.
 *
 * Panel IZQUIERDO (dark): Titular "No somos el intermediario. Somos la operación."
 *   fijo + en Fase 2 conmuta a kicker "Te unes a algo que ya funciona." + métricas.
 * Panel DERECHO (light): 4 pilares se revelan uno a uno con el scroll.
 *
 * Motion:
 *   §1  Text-Birth — titular en overflow:hidden, lines suben al entrar.
 *   §2  Layered Unveiling — cada pilar sube desde abajo, el anterior se apaga.
 *   §4  Breathing orb — drift suave del glow de fondo, pausado fuera del viewport.
 *   §5  Velocity skew — kicker lines reaccionan a la velocidad del scroll.
 *   §6  Light-up — borde izquierdo del pilar activo se ilumina en brand-blue.
 *
 * Pattern: gsap.context() + ScrollTrigger (scrub, pin)
 */
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCRUB } from "@/lib/motion";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger);

// ── DATOS ─────────────────────────────────────────────────────────────────
const IMAGE_1 = asset("/Files/Features/CRM_product_tablet_client_cards_202606242208.jpeg");

const METRICS = [
  { value: "6,000+", label: "Asegurados activos" },
  { value: "130+",   label: "Carrier appointments" },
  { value: "52",     label: "Jurisdicciones" },
  { value: "< 24h",  label: "SLA garantizado" },
];

export default function WhyEpicare() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const ctx = gsap.context(() => {
      // 1. Animación de ENTRADA del título (no ligada al scrub)
      if (!reduce) {
        gsap.from(".wy-title-line", {
          yPercent: 120,
          rotationZ: 3,
          opacity: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          }
        });
      }

      // 2. Parallax de Monolitos (sólo Desktop)
      if (!reduce && window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: ".wy-h-track",
          start: "top top",
          end: "bottom bottom",
          pin: ".wy-h-pinned",
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".wy-h-track",
            start: "top top",
            end: "bottom bottom",
            scrub: SCRUB.crisp,
          },
        });

        // Los monolitos suben a diferentes velocidades
        gsap.utils.toArray<HTMLElement>(".wy-h-monolith").forEach((mono, i) => {
          const speed = 1 + (i % 2 === 0 ? 0.5 : 0.8);
          tl.fromTo(mono,
            { y: "100vh" },
            { y: "-100vh", ease: "none" },
            0
          ).timeScale(speed);
        });

        // El título fijo en el centro se difumina y va hacia atrás lentamente
        tl.to(".wy-h-title", { opacity: 0.1, scale: 0.9, ease: "none" }, 0);
      }

    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} style={{ backgroundColor: "#FAFAFA", overflow: "hidden" }} aria-label="Por qué Epicare">
      
      {/* ── DESKTOP (The Floating Monoliths - Light Mode) ── */}
      <section className="wy-h-track hidden lg:block" style={{ height: "300vh", position: "relative" }}>
        
        <div
          className="wy-h-pinned"
          style={{ height: "100dvh", width: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* TÍTULO ANCLADO AL FONDO (4 líneas) */}
          <div className="wy-h-title" style={{ position: "absolute", zIndex: 1, textAlign: "center", width: "100%", padding: "0 2rem", willChange: "transform, opacity" }}>
            <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
              <span className="wy-title-line text-overline" style={{ color: "var(--color-brand-blue)", display: "block", letterSpacing: "0.2em" }}>
                INFRAESTRUCTURA EPICARE
              </span>
            </div>

            {[
              "NO SOMOS",
              "EL INTERMEDIARIO.",
              "SOMOS",
              "LA OPERACIÓN."
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
                <h2 
                  className="wy-title-line text-display-xl font-bold" 
                  style={{ 
                    color: i >= 2 ? "var(--color-brand-blue)" : "#111111", 
                    letterSpacing: "-0.04em", 
                    lineHeight: 0.95,
                    willChange: "transform, opacity"
                  }}
                >
                  {line}
                </h2>
              </div>
            ))}
          </div>

          {/* TARJETAS LIQUID GLASS (Light Mode) */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "grid", gridTemplateColumns: "20vw 20vw", gap: "2rem", justifyContent: "center", alignContent: "center", padding: "0" }}>
            {METRICS.map((m, i) => (
              <div 
                key={i} 
                className="wy-h-monolith"
                style={{ 
                  width: "20vw", 
                  height: "60vh",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 100%)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "2.5rem 2rem",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.08), inset 0 2px 20px rgba(255,255,255,0.5)",
                  willChange: "transform",
                }}
              >
                {/* Glow inferior azul muy suave (como reflejo interno del cristal) */}
                <div style={{ height: "50%", width: "100%", background: "linear-gradient(to top, rgba(53, 187, 253, 0.12), transparent)", position: "absolute", bottom: 0, left: 0, borderRadius: "0 0 20px 20px" }} />
                
                <div style={{ position: "relative", zIndex: 3 }}>
                  <div className="text-display-xl font-bold" style={{ color: "#000", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
                    {m.value}
                  </div>
                  <div className="text-heading" style={{ color: "rgba(0,0,0,0.6)", marginTop: "1rem", fontWeight: 500, letterSpacing: "-0.01em" }}>
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MOBILE (Grid Natural - Light Mode) ── */}
      <section className="lg:hidden" style={{ position: "relative", padding: "6rem 1.5rem", zIndex: 1 }}>
        <div style={{ position: "relative", zIndex: 2 }}>
            <span className="text-overline" style={{ color: "var(--color-brand-blue)", display: "block", marginBottom: "1rem", letterSpacing: "0.2em" }}>
              INFRAESTRUCTURA EPICARE
            </span>
            <h2 className="text-display-lg font-bold" style={{ color: "#111", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "4rem", textWrap: "balance" }}>
              NO SOMOS
              <br/>
              EL INTERMEDIARIO.
              <br/>
              <span style={{ color: "var(--color-brand-blue)" }}>SOMOS</span>
              <br/>
              <span style={{ color: "var(--color-brand-blue)" }}>LA OPERACIÓN.</span>
            </h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {METRICS.map((m, i) => (
                    <div 
                        key={i}
                        style={{ 
                            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            border: "1px solid rgba(255,255,255,0.7)",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            minHeight: "180px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.05), inset 0 2px 20px rgba(255,255,255,0.5)",
                        }}
                    >
                        <div style={{ height: "40%", width: "100%", background: "linear-gradient(to top, rgba(53, 187, 253, 0.08), transparent)", position: "absolute", bottom: 0, left: 0, borderRadius: "0 0 16px 16px" }} />
                        <div style={{ position: "relative", zIndex: 3 }}>
                          <div className="text-display-lg font-bold" style={{ color: "#000", marginBottom: "0.5rem", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", lineHeight: 1 }}>
                            {m.value}
                          </div>
                          <div className="text-heading" style={{ color: "rgba(0,0,0,0.6)", fontWeight: 500, letterSpacing: "-0.01em" }}>
                            {m.label}
                          </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tablet Image Mobile */}
            <div style={{ marginTop: "3rem", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                <img src={IMAGE_1} alt="CRM" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
        </div>
      </section>
    </div>
  );
}
