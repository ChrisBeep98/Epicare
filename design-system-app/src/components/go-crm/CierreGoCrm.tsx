"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, REVEAL, STAGGER } from "@/lib/motion";

export default function CierreGoCrm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background Image Parallax
      gsap.fromTo(
        ".cierre-bg-aura",
        { scale: 1.1, yPercent: -5 },
        {
          scale: 1,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Glass Card Reveal
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: REVEAL.lg },
        {
          opacity: 1,
          y: 0,
          duration: DUR.slow,
          ease: EASE.out,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Text Elements Stagger Reveal
      gsap.fromTo(
        ".cierre-content-item",
        { opacity: 0, y: REVEAL.md },
        {
          opacity: 1,
          y: 0,
          duration: DUR.base,
          ease: EASE.out,
          stagger: STAGGER.base,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // H2: Text-Birth
      gsap.fromTo(
        ".cierre-title-line",
        { yPercent: REVEAL.birthPercent },
        {
          yPercent: 0,
          duration: DUR.birth,
          ease: EASE.dramatic,
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
      
      // Error micro-shake animation
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
      className="relative w-full min-h-[90dvh] flex items-center justify-center overflow-hidden z-10 px-4 py-16 md:p-8 bg-[var(--color-surface-BG-base)]"
    >
      {/* LAYER 1: GLASS CARD WRAPPER */}
      <div className="relative z-20 w-full max-w-4xl flex flex-col items-center">
        
        {/* THE GLASS CARD (Parent owns border to prevent Webkit clipping) */}
        <div 
          ref={cardRef}
          className="relative z-10 w-full rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          
          {/* THE CLIPPED BACKGROUND (Liquid Glass perfectly clipped to card bounds) */}
          <div className="absolute inset-0 -z-20 flex items-center justify-center bg-[var(--color-surface-BG-base)]">
            <img 
              src="/Files/Backgrounds/cierre_white_blue_blobs.jpg" 
              alt="White and Blue Blobs Background" 
              className="cierre-bg-aura absolute w-[100vw] h-[100dvh] max-w-none object-cover opacity-90" 
            />
          </div>

          {/* STATIC BACKGROUND LAYER (Separated for blur performance) */}
          <div className="absolute inset-0 -z-10 rounded-[2.5rem]">
            {/* Brighten the glass and boost saturation so the liquid colors pop powerfully */}
            <div className="absolute inset-0 bg-white/5 dark:bg-[#0A0D14]/20 backdrop-blur-[32px] saturate-[1.5]" />
          </div>

          {/* CONTENT LAYER */}
          <div className="relative z-10 p-8 md:p-16 lg:px-24 flex flex-col items-center text-center">
            
            <div className="cierre-content-item mb-4">
              <span className="text-body-sm tracking-widest uppercase text-[var(--color-text-dimmed)] font-medium">
                Disponibilidad
              </span>
            </div>

            <div className="overflow-hidden mb-6">
              <h2 className="text-display-lg text-[var(--color-text-base)] m-0 pb-2 cierre-title-line origin-bottom leading-tight">
                GO CRM está en construcción.
              </h2>
            </div>

            <p className="cierre-content-item text-body-lg text-[var(--color-text-muted)] max-w-lg text-balance mb-12">
              Se libera en go.epicare.com. Déjanos tu correo y te avisamos el día que abra.
            </p>

            {/* THE FORM */}
            <form 
              ref={formRef} 
              onSubmit={handleSubmit}
              className="cierre-content-item relative w-full max-w-md group"
            >
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
                    className="w-full bg-transparent outline-none text-h3 text-[var(--color-text-base)] placeholder:text-[var(--color-text-dimmed)] py-4 pl-0 pr-32 transition-colors duration-300"
                    disabled={status === "success"}
                  />
                  
                  {/* Submit Button */}
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

                {/* Animated underline */}
                <div className="relative h-[1px] w-full bg-[var(--color-border-base)] mt-1 overflow-hidden">
                  <div 
                    className={`absolute inset-0 bg-[var(--color-text-base)] origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isFocused ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </div>

                {/* Error Message */}
                <div className="h-8 mt-3 overflow-hidden text-left">
                  <p 
                    className={`text-body-sm text-[#F26023] transition-all duration-300 ${status === 'error' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                  >
                    Ese correo no parece válido. Revísalo e inténtalo otra vez.
                  </p>
                </div>
              </div>

              {/* Success Message overlay */}
              <div className="cierre-success-msg absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse" />
                  <p className="text-h4 md:text-h3 text-[var(--color-text-base)] m-0 font-medium">
                    Listo. Te escribimos el día que GO CRM abra.
                  </p>
                </div>
              </div>

            </form>

            <div className="cierre-content-item mt-12 opacity-50 text-body-sm text-[var(--color-text-muted)]">
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
