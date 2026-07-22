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
 * Pattern: gsap.context() + ScrollTrigger (scrub, pin) — igual que ProductLinesEpicare.
 * Todos los valores de motion de src/lib/motion.ts.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER, REVEAL, SCRUB } from "@/lib/motion";
import { LiveEditorCopier } from "@/components/utils/LiveEditor";

gsap.registerPlugin(ScrollTrigger);

// ── DATOS ─────────────────────────────────────────────────────────────────
const METRICS = [
  { value: "6,000+", label: "Asegurados" },
  { value: "130+",   label: "Carriers" },
  { value: "52",     label: "Jurisdicciones" },
  { value: "< 24h",  label: "SLA" },
];

export default function WhyEpicare() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".wy-act-1, .wy-act-2", { opacity: 1, y: 0, position: "relative" });
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: viewportRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: SCRUB.crisp,
          invalidateOnRefresh: true,
        },
      });

      // ─ FASE 1: Entra Acto 1 (Izquierda)
      const titleLines = gsap.utils.toArray<HTMLElement>(".wy-title-line");
      titleLines.forEach((line, i) => {
        tl.fromTo(
          line,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: EASE.none, duration: 0.08 },
          i * 0.05
        );
      });

      // ─ TRANSICIÓN: Sale Acto 1, Entra Acto 2 (40% - 60%)
      tl.to(".wy-act-1", { opacity: 0, y: -40, ease: EASE.none, duration: 0.15 }, 0.40);

      const act2Lines = gsap.utils.toArray<HTMLElement>(".wy-kicker-line");
      act2Lines.forEach((line, i) => {
        tl.fromTo(
          line,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: EASE.none, duration: 0.08 },
          0.45 + i * 0.05
        );
      });

      const metricEls = gsap.utils.toArray<HTMLElement>(".wy-metric");
      metricEls.forEach((m, i) => {
        tl.fromTo(
          m,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: EASE.none, duration: 0.08 },
          0.55 + i * 0.04
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        style={{ height: "200vh", position: "relative", backgroundColor: "var(--color-surface-BG-base)" }}
        aria-label="Por qué Epicare"
        className="hidden lg:block"
      >
        <div
          ref={viewportRef}
          className="container-fluid"
          style={{
            height: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Contenedor Maestro Centrado */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1000px",
              height: "100%",
            }}
          >
            {/* ════ ACTO 1 ════ */}
            <div
              className="wy-act-1"
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
                textAlign: "left",
                zIndex: 2,
                width: "100%",
              }}
            >
              <span
                className="text-overline wy-title-line"
                style={{
                  color: "var(--color-brand-blue)",
                  display: "block",
                  marginBottom: "clamp(1rem, 2vw, 1.5rem)",
                  opacity: 0,
                }}
              >
                Por qué Epicare
              </span>
              {[
                { text: "No somos",         accent: false },
                { text: "el intermediario.", accent: false },
                { text: "Somos",             accent: true  },
                { text: "la operación.",     accent: true  },
              ].map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <div
                    className="wy-title-line text-display-lg font-semibold"
                    style={{
                      color: line.accent ? "var(--color-brand-blue)" : "var(--color-text-primary)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.05,
                      willChange: "transform, opacity",
                      opacity: 0,
                    }}
                  >
                    {line.text}
                  </div>
                </div>
              ))}
            </div>

            {/* ════ ACTO 2 ════ */}
            <div
              className="wy-act-2"
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
                textAlign: "left",
                zIndex: 2,
                pointerEvents: "none",
                width: "100%",
              }}
            >
              <span
                className="text-overline wy-kicker-line"
                style={{
                  color: "var(--color-text-accent-blue)",
                  display: "block",
                  marginBottom: "clamp(1rem, 2vw, 1.5rem)",
                  opacity: 0,
                }}
              >
                Epicare Infrastructure
              </span>
              {[
                "Te unes a algo",
                "que ya funciona.",
              ].map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <span
                    className="wy-kicker-line text-display-lg font-semibold"
                    style={{
                      display: "block",
                      color: "var(--color-text-primary)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.05,
                      willChange: "transform, opacity",
                      opacity: 0,
                    }}
                  >
                    {line}
                  </span>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  gap: "clamp(2rem, 5vw, 6rem)",
                  justifyContent: "flex-start",
                  marginTop: "clamp(3rem, 5vw, 4rem)",
                  pointerEvents: "auto",
                }}
              >
                {METRICS.map((m, i) => (
                  <div key={i} className="wy-metric" style={{ opacity: 0, willChange: "transform, opacity" }}>
                    <span
                      className="text-display font-semibold"
                      style={{
                        display: "block",
                        color: "var(--color-text-primary)",
                        fontVariantNumeric: "tabular-nums",
                        lineHeight: 1,
                        marginBottom: "0.25rem",
                        letterSpacing: "-0.02em"
                      }}
                    >
                      {m.value}
                    </span>
                    <span className="text-body" style={{ color: "var(--color-text-secondary)" }}>
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE ──────────────────────────────────────────────── */}
      <section
        className="lg:hidden container-fluid"
        style={{
          paddingTop: "clamp(4rem, 10vw, 6rem)",
          paddingBottom: "clamp(4rem, 10vw, 6rem)",
          backgroundColor: "var(--color-surface-BG-base)",
          textAlign: "left",
        }}
        aria-label="Por qué Epicare"
      >
        <span
          className="text-overline"
          style={{ color: "var(--color-brand-blue)", display: "block", marginBottom: "1rem" }}
        >
          Por qué Epicare
        </span>
        <h2
          className="text-display-lg font-semibold"
          style={{
            color: "var(--color-text-primary)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: "4rem",
          }}
        >
          No somos el intermediario.{" "}
          <span style={{ color: "var(--color-brand-blue)", display: "block" }}>
            Somos la operación.
          </span>
        </h2>

        <h2
          className="text-display-lg font-semibold"
          style={{
            color: "var(--color-text-primary)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: "3rem",
          }}
        >
          Te unes a algo{" "}
          <span style={{ display: "block" }}>que ya funciona.</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            width: "100%",
          }}
        >
          {METRICS.map((m, i) => (
            <div key={i} style={{ textAlign: "left" }}>
              <span
                className="text-display-sm font-semibold"
                style={{
                  display: "block",
                  color: "var(--color-text-primary)",
                  fontVariantNumeric: "tabular-nums",
                  marginBottom: "0.25rem"
                }}
              >
                {m.value}
              </span>
              <span className="text-body" style={{ color: "var(--color-text-secondary)" }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <LiveEditorCopier />
    </>
  );
}
