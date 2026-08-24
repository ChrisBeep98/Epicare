"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faqs = [
  {
    q: "¿Cuánto cuesta GO AMS?",
    a: "Nada. Está incluido en tu contrato de productor con Epicare."
  },
  {
    q: "¿Hay app móvil?",
    a: "En el lanzamiento funciona en navegador, desde cualquier dispositivo. La app nativa está planeada para una fase posterior."
  },
  {
    q: "¿Puedo cotizar con los 130+ carriers?",
    a: "Los appointments con los 130+ los administras en GO AMS. La cotización directa dentro del portal está disponible con los carriers integrados vía API - hoy cinco, y la lista crece."
  },
  {
    q: "¿Qué pasa con el book que ya tengo?",
    a: "Tus pólizas existentes se cargan desde los reportes de tus uplines. Empiezas con tu historial, no desde cero."
  },
  {
    q: "¿Mi asistente puede tener acceso?",
    a: "Sí, con cuenta propia y permisos que defines tú."
  },
  {
    q: "¿Alguien de Epicare puede entrar a mi cuenta?",
    a: "Solo el equipo autorizado, cuando resuelve un caso tuyo. Cada acción queda registrada y visible para ti."
  },
  {
    q: "¿En qué idioma está?",
    a: "En inglés en su primera versión."
  },
  {
    q: "¿Cuándo está disponible?",
    a: "El lanzamiento es el 14 de julio de 2026."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // El primero abierto por defecto
  const sectionRef = useRef<HTMLElement>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Entrada en cascada elegante para las filas del acordeón
      gsap.from(".faq-row", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-0 pb-section-md bg-[var(--color-surface-BG-1)] relative border-t border-[var(--color-border-Strokes-strong)]">
      <div className="w-full max-w-4xl mx-auto px-gutter-md pt-24 md:pt-32">
        
        {/* CABECERA */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-display-lg font-display uppercase tracking-tighter text-[var(--color-text-primary)] leading-[0.9]">
              FAQ
            </h2>
          </div>
          <p className="text-body-lg text-[var(--color-text-secondary)] max-w-sm text-left md:text-right pb-2">
            Ocho preguntas específicas del producto.
          </p>
        </div>

        {/* LISTA DE ACORDEÓN */}
        <div className="border-t-[2px] border-[var(--color-text-primary)]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="faq-row border-b border-[var(--color-border-Strokes-strong)] group">
                
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full py-8 md:py-10 flex items-center justify-between gap-8 text-left outline-none cursor-pointer"
                >
                  <h3 className={`text-h5 md:text-h4 font-display uppercase tracking-tight transition-colors duration-300 ${isOpen ? 'text-[var(--color-brand-blue)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-blue)]'}`}>
                    {faq.q}
                  </h3>
                  
                  {/* Icono animado (+ a -) */}
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center relative">
                    {/* Línea horizontal */}
                    <span className={`absolute w-full h-[2px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-180 bg-[var(--color-brand-blue)]' : 'bg-[var(--color-text-muted)] group-hover:bg-[var(--color-brand-blue)]'}`} />
                    {/* Línea vertical */}
                    <span className={`absolute h-full w-[2px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-90 scale-0 bg-[var(--color-brand-blue)]' : 'rotate-0 scale-100 bg-[var(--color-text-muted)] group-hover:bg-[var(--color-brand-blue)]'}`} />
                  </div>
                </button>
                
                {/* Contenedor colapsable (Usando CSS Grid para altura dinámica ultra-suave) */}
                <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="pb-10 pt-2 text-body-lg md:text-body-xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
