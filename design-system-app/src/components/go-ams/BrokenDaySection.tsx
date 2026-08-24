"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TIMELINE_DATA = [
  { id: "01", time: "08:00 AM", title: "Silos de Data", text: "Exportar listas desde el CRM para importarlas a Excel y cruzar renovaciones manualmente." },
  { id: "02", time: "10:30 AM", title: "Bsqueda Ciega", text: "Rastrear el estatus de una pliza requiere autenticarse en tres portales de carriers distintos." },
  { id: "03", time: "02:15 PM", title: "Prdida de Sesin", text: "El portal del carrier expira por inactividad. Toda la cotizacin ingresada se pierde." },
  { id: "04", time: "06:00 PM", title: "Riesgo Legal", text: "La licencia venci ayer. Al estar aislada en una hoja de clculo, no hubo alertas." }
];

/* =========================================================================
   CONCEPTO 13: THE PRINT EXHIBITION (Galera Horizontal Pura)
   Emula una revista impresa de alta gama. Fondo blanco clnico, lneas de 1px,
   espacio en blanco extremo y scroll horizontal mecnico.
   ========================================================================= */
function Concept13PrintExhibition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen bg-[#FDFDFD] text-[#111] overflow-hidden flex items-center relative">
      <div className="absolute top-12 left-12 md:left-24">
        <span className="font-mono text-meta tracking-widest uppercase opacity-40">Operacin Manual</span>
      </div>

      <div ref={trackRef} className="flex flex-row items-center h-[60vh] pl-[10vw] pr-[20vw]">
        
        {/* Intro Ttulo */}
        <div className="w-[80vw] md:w-[50vw] shrink-0 border-l border-black/10 pl-12 h-full flex flex-col justify-center">
          <h2 className="text-[8vw] font-bold tracking-tighter leading-[0.9]">El da<br/>roto.</h2>
        </div>

        {/* Tarjetas Editoriales */}
        {TIMELINE_DATA.map((item, i) => (
          <div key={i} className="w-[85vw] md:w-[40vw] shrink-0 h-full flex flex-col justify-between border-l border-black/10 pl-12 py-8 mr-12">
            <span className="text-display-md font-mono text-black/10">{item.id}</span>
            <div>
              <span className="font-mono text-meta text-[var(--color-brand-blue)] mb-4 block">{item.time}</span>
              <h3 className="text-h2 font-semibold tracking-tight mb-4">{item.title}</h3>
              <p className="text-body-xl text-black/60 font-light leading-relaxed max-w-md">{item.text}</p>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}

/* =========================================================================
   CONCEPTO 14: THE ARCHITECT'S LEDGER (Tabla Clnica Animada)
   Una tabla masiva estilo "blueprint" o factura arquitectnica. 
   Lneas de 1px precisas, animacin de mscara (Curtain Reveal) quirrgica.
   ========================================================================= */
function Concept14ArchitectLedger() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      
      // Animación de las líneas divisorias
      gsap.fromTo(".ledger-line", 
        { scaleX: 0 }, 
        { scaleX: 1, stagger: 0.1, ease: "expo.out", duration: 1.5, scrollTrigger: { trigger: el, start: "top 75%" } }
      );

      // Curtain Reveal para el texto
      const rows = gsap.utils.toArray<HTMLElement>(".ledger-row");
      rows.forEach(row => {
        const textNodes = row.querySelectorAll(".reveal-mask");
        gsap.fromTo(textNodes,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white text-black py-48 px-4 md:px-12">
      <div className="max-w-screen-2xl mx-auto flex flex-col">
        
        <div className="mb-24 overflow-hidden">
          <h2 className="reveal-mask text-display-xl font-bold tracking-tighter leading-none">El da roto.</h2>
        </div>

        <div className="flex flex-col w-full border-b border-black/15">
          {/* Header de Tabla */}
          <div className="hidden md:flex flex-row w-full pb-4 px-4 font-mono text-meta text-black/40 uppercase tracking-widest">
            <div className="w-1/6">ID / Hora</div>
            <div className="w-2/6">Friccin</div>
            <div className="w-3/6">Impacto en el flujo</div>
          </div>

          {/* Filas de la Tabla */}
          {TIMELINE_DATA.map((item, i) => (
            <div key={i} className="ledger-row relative flex flex-col md:flex-row w-full py-8 md:py-16 px-4 group hover:bg-[#F9F9F9] transition-colors duration-500">
              {/* Lnea Top */}
              <div className="ledger-line absolute top-0 left-0 w-full h-[1px] bg-black/15 origin-left" />
              
              <div className="w-full md:w-1/6 flex md:flex-col gap-4 mb-4 md:mb-0 overflow-hidden">
                <span className="reveal-mask font-mono text-body-sm opacity-50">{item.id}</span>
                <span className="reveal-mask font-mono text-body-sm text-[var(--color-brand-blue)]">{item.time}</span>
              </div>
              
              <div className="w-full md:w-2/6 mb-4 md:mb-0 pr-8 overflow-hidden">
                <h3 className="reveal-mask text-h3 font-semibold tracking-tight">{item.title}</h3>
              </div>
              
              <div className="w-full md:w-3/6 overflow-hidden">
                <p className="reveal-mask text-body-xl font-light text-black/70 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   CONCEPTO 15: THE TYPOGRAPHIC ANCHOR (Pin Asimtrico Parallax)
   Ttulo masivo anclado a la izquierda. Los items fluyen por la derecha
   con un parallax sutil en los nmeros gigantes de fondo.
   ========================================================================= */
function Concept15TypographicAnchor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        pin: leftRef.current,
        pinSpacing: false,
      });

      // Parallax en los números de fondo de cada item
      const numbers = gsap.utils.toArray<HTMLElement>(".bg-number");
      numbers.forEach(num => {
        gsap.to(num, {
          y: -100, // Se mueven un poco más rápido que el scroll normal
          ease: "none",
          scrollTrigger: {
            trigger: num.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative bg-[#FAFAFA] text-[#0A0A0A] flex flex-col md:flex-row pb-32">
      
      {/* Columna Izquierda (Anclada) */}
      <div ref={leftRef} className="w-full md:w-5/12 h-screen relative flex flex-col justify-center px-8 md:px-16 lg:px-24 border-r border-black/5">
        <span className="font-mono text-meta tracking-widest text-black/40 uppercase block mb-8">El Problema</span>
        <h2 className="text-display-xl font-bold tracking-tighter leading-[0.9]">
          El da<br/>roto.
        </h2>
      </div>

      {/* Columna Derecha (Scroll) */}
      <div className="w-full md:w-7/12 flex flex-col pt-[50vh] pb-[50vh]">
        {TIMELINE_DATA.map((item, i) => (
          <div key={i} className="relative w-full py-32 px-8 md:px-24 flex flex-col justify-center min-h-[60vh] overflow-hidden">
            
            {/* Nmero Parallax de Fondo */}
            <div className="absolute top-1/2 left-8 md:left-24 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
              <span className="bg-number text-[25vw] md:text-[15vw] font-bold leading-none tracking-tighter block">{item.id}</span>
            </div>

            {/* Contenido */}
            <div className="relative z-10">
              <span className="font-mono text-body-sm text-[var(--color-brand-blue)] mb-6 block border-b border-black/10 pb-4 w-fit">{item.time}</span>
              <h3 className="text-display-sm font-semibold tracking-tight mb-6">{item.title}</h3>
              <p className="text-body-xl text-black/60 font-light leading-relaxed max-w-lg">{item.text}</p>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
}


/* =========================================================================
   MAIN COMPONENT + DEBUG PANEL (VER. EDITORIAL SUIZO MINIMALISTA LIGHT)
   ========================================================================= */
export default function BrokenDaySection() {
  const [activeConcept, setActiveConcept] = useState<number>(14);

  return (
    <div className="relative w-full">
      {/* Renderizado Dinmico */}
      {activeConcept === 13 && <Concept13PrintExhibition />}
      {activeConcept === 14 && <Concept14ArchitectLedger />}
      {activeConcept === 15 && <Concept15TypographicAnchor />}

      {/* Debug Panel Flotante - Swiss Minimalist Light */}
      <div className="fixed bottom-6 right-6 z-[9999] bg-white border border-black p-4 shadow-[12px_12px_0px_rgba(0,0,0,1)] text-black max-w-[340px] font-sans rounded-none">
        <div className="flex items-center gap-2 mb-3 border-b border-black pb-2">
          <div className="w-3 h-3 bg-black" />
          <h4 className="text-body-sm font-bold tracking-widest uppercase">Swiss Light V5</h4>
        </div>
        
        <p className="text-meta text-black/70 mb-4 leading-relaxed font-medium">
          Editorial Suizo Autntico: Blanco clnico, alto contraste tipogrfico, lneas crudas (1px) y animacin sutil.
        </p>

        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveConcept(13)}
            className={`text-left px-4 py-3 text-body-xs font-bold uppercase tracking-wide transition-all border ${
              activeConcept === 13 ? 'bg-black text-white border-black' : 'bg-transparent text-black border-black/20 hover:border-black'
            }`}
          >
            13. Print Exhibition<br/>
            <span className="font-normal opacity-70 normal-case tracking-normal">Scroll horizontal puro estilo museo.</span>
          </button>
          
          <button 
            onClick={() => setActiveConcept(14)}
            className={`text-left px-4 py-3 text-body-xs font-bold uppercase tracking-wide transition-all border ${
              activeConcept === 14 ? 'bg-black text-white border-black' : 'bg-transparent text-black border-black/20 hover:border-black'
            }`}
          >
            14. Architect's Ledger<br/>
            <span className="font-normal opacity-70 normal-case tracking-normal">Tabla masiva con curtain reveals (Miper favorito).</span>
          </button>

          <button 
            onClick={() => setActiveConcept(15)}
            className={`text-left px-4 py-3 text-body-xs font-bold uppercase tracking-wide transition-all border ${
              activeConcept === 15 ? 'bg-black text-white border-black' : 'bg-transparent text-black border-black/20 hover:border-black'
            }`}
          >
            15. Typographic Anchor<br/>
            <span className="font-normal opacity-70 normal-case tracking-normal">Pin asimtrico + nmeros en parallax.</span>
          </button>
        </div>
      </div>
    </div>
  );
}
