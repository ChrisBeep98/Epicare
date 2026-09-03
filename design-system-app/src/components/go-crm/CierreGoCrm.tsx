"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, REVEAL, STAGGER } from "@/lib/motion";

export default function CierreGoCrm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // OVERLINE & SUBTEXT: standard fade up
      gsap.fromTo(
        ".cierre-fade-up",
        { opacity: 0, y: REVEAL.md },
        {
          opacity: 1,
          y: 0,
          duration: DUR.base,
          ease: EASE.out,
          stagger: STAGGER.base,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // H2: Text-Birth (Masked reveal)
      gsap.fromTo(
        ".cierre-title-line",
        { yPercent: REVEAL.birthPercent },
        {
          yPercent: 0,
          duration: DUR.birth,
          ease: EASE.dramatic,
          stagger: STAGGER.tight,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // INPUT LINE REVEAL
      gsap.fromTo(
        ".cierre-input-border",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: DUR.slow,
          ease: EASE.inOut,
          scrollTrigger: {
            trigger: ".cierre-form",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      
      // Error shake animation
      gsap.fromTo(
        formRef.current,
        { x: -8 },
        { x: 0, duration: DUR.microOut, ease: "elastic.out(2, 0.2)", clearProps: "x" }
      );
      return;
    }

    // Success transition
    setStatus("success");
    const tl = gsap.timeline();
    tl.to(".cierre-form-elements", {
      opacity: 0,
      y: -REVEAL.sm,
      duration: DUR.fast,
      ease: EASE.out,
    }).fromTo(
      ".cierre-success-msg",
      { opacity: 0, y: REVEAL.sm },
      { opacity: 1, y: 0, duration: DUR.base, ease: EASE.out },
      "-=0.2"
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col justify-center py-fluid-xl px-4 md:px-8 overflow-hidden bg-[var(--color-surface-BG-base)]"
    >
      {/* TEXTURE: Subtle noise overlay for editorial feel */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }} 
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-fluid-lg items-end">
        
        {/* TEXT COLUMN (Left) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
          <div className="cierre-fade-up">
            <span className="text-body-sm tracking-widest uppercase text-[var(--color-text-dimmed)] font-medium">
              Disponibilidad
            </span>
          </div>

          <div className="overflow-hidden">
            <h2 className="text-display-lg text-[var(--color-text-base)] m-0 pb-2 cierre-title-line origin-bottom">
              GO CRM está en construcción.
            </h2>
          </div>

          <p className="cierre-fade-up text-body-lg text-[var(--color-text-muted)] max-w-lg text-balance">
            Se libera en go.epicare.com. Déjanos tu correo y te avisamos el día que abra.
          </p>
        </div>

        {/* FORM COLUMN (Right / Bottom) */}
        <div className="col-span-1 lg:col-span-5 relative lg:pb-4 cierre-form">
          <form 
            ref={formRef} 
            onSubmit={handleSubmit}
            className="relative flex flex-col w-full group"
          >
            {/* The active form elements */}
            <div className={`cierre-form-elements relative flex flex-col w-full ${status === 'success' ? 'pointer-events-none' : ''}`}>
              
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Tu correo"
                  className="w-full bg-transparent outline-none text-h3 md:text-h2 text-[var(--color-text-base)] placeholder:text-[var(--color-text-dimmed)] py-4 pl-0 pr-32 transition-colors duration-300"
                  disabled={status === "success"}
                />
                
                {/* Submit Button (Absolute Right) */}
                <button
                  type="submit"
                  disabled={status === "success"}
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3 text-body-lg font-medium text-[var(--color-text-base)] hover:text-epicare-orange transition-colors duration-300 group/btn"
                >
                  Avísame
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border-base)] transition-all duration-300 ${isFocused ? 'bg-[var(--color-text-base)] text-[var(--color-surface-BG-base)] border-transparent' : 'bg-transparent text-[var(--color-text-base)] group-hover/btn:border-[var(--color-text-base)]'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Huge animated underline */}
              <div className="relative h-[2px] w-full bg-[var(--color-border-base)] mt-1 overflow-hidden">
                <div 
                  className="cierre-input-border absolute inset-0 bg-[var(--color-text-base)] origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
                {/* Focus indicator line */}
                <div 
                  className={`absolute inset-0 bg-epicare-orange origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isFocused ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </div>

              {/* Error Message */}
              <div className="h-8 mt-3 overflow-hidden">
                <p 
                  className={`text-body-sm text-[#F26023] transition-all duration-300 ${status === 'error' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                >
                  Ese correo no parece válido. Revísalo e inténtalo otra vez.
                </p>
              </div>
            </div>

            {/* Success Message overlay */}
            <div className="cierre-success-msg absolute inset-0 flex flex-col justify-center pointer-events-none opacity-0">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse" />
                <p className="text-h3 text-[var(--color-text-base)] m-0">
                  Listo. Te escribimos el día que GO CRM abra.
                </p>
              </div>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
