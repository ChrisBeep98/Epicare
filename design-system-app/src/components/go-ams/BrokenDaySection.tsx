"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrokenDaySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".timeline-item", { opacity: 1, y: 0 });
        return;
      }

      // Stagger acumulativo
      // Cada item entra a medida que bajamos el scroll
      gsap.fromTo(
        ".timeline-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            // Con scrub se siente acumulativo y atado al scroll
            // toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full px-gutter-md pt-0 pb-section-md flex justify-center bg-[var(--color-surface-BG-base)] relative z-10"
    >
      <div className="w-full max-w-section-sm flex flex-col gap-fluid-lg">
        
        <div className="flex flex-col gap-2">
          <span className="text-overline text-[var(--color-text-accent-dark)] uppercase tracking-widest">
            La Realidad
          </span>
          <h2 className="text-display-lg font-semibold text-[var(--color-text-primary)] leading-tight tracking-tight">
            El día roto.
          </h2>
          <p className="text-body-lg text-[var(--color-text-secondary)] mt-2">
            La operación de seguros está fragmentada. Cuando los sistemas no se comunican, el trabajo del agente se convierte en copiar y pegar.
          </p>
        </div>

        <ul ref={listRef} className="flex flex-col border-l-2 border-[var(--color-border-Strokes-default)] ml-2 pl-static-lg gap-static-lg relative">
          
          <li className="timeline-item flex flex-col gap-1 relative">
            <div className="absolute -left-[calc(var(--spacing-static-lg)+9px)] top-1 w-4 h-4 rounded-full bg-[var(--color-surface-BG-2)] border-2 border-[var(--color-border-Strokes-default)]" />
            <span className="text-meta text-[var(--color-text-muted)] font-mono">08:00 AM</span>
            <p className="text-body-md text-[var(--color-text-primary)]">
              Descargar listado de clientes de un CRM. Importarlo en Excel. Cruzar datos para ver quién renueva.
            </p>
          </li>

          <li className="timeline-item flex flex-col gap-1 relative">
            <div className="absolute -left-[calc(var(--spacing-static-lg)+9px)] top-1 w-4 h-4 rounded-full bg-[var(--color-surface-BG-2)] border-2 border-[var(--color-border-Strokes-default)]" />
            <span className="text-meta text-[var(--color-text-muted)] font-mono">10:30 AM</span>
            <p className="text-body-md text-[var(--color-text-primary)]">
              Un cliente llama. Tienes que buscar su póliza en tres portales de carriers distintos porque no recuerdas dónde la emitiste.
            </p>
          </li>

          <li className="timeline-item flex flex-col gap-1 relative">
            <div className="absolute -left-[calc(var(--spacing-static-lg)+9px)] top-1 w-4 h-4 rounded-full bg-[var(--color-surface-BG-2)] border-2 border-[var(--color-border-Strokes-default)]" />
            <span className="text-meta text-[var(--color-text-muted)] font-mono">02:15 PM</span>
            <p className="text-body-md text-[var(--color-text-primary)]">
              Cotizando una póliza. El portal del carrier te cierra la sesión por inactividad mientras respondías un correo. Pierdes los datos.
            </p>
          </li>

          <li className="timeline-item flex flex-col gap-1 relative">
            <div className="absolute -left-[calc(var(--spacing-static-lg)+9px)] top-1 w-4 h-4 rounded-full bg-[var(--color-bg-warning)] shadow-[0_0_12px_var(--color-bg-warning)]" />
            <span className="text-meta text-[var(--color-text-warning)] font-mono">06:00 PM</span>
            <p className="text-body-md text-[var(--color-text-primary)] font-medium">
              Te das cuenta de que tu licencia venció ayer. Compliance nunca te avisó porque ese dato vive en otra hoja de cálculo.
            </p>
          </li>

        </ul>

      </div>
    </section>
  );
}
