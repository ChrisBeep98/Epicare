"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const PANELS = [
  { id: 1, title: "DASHBOARD", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", desc: "Métricas globales en tiempo real. Control centralizado de toda tu agencia." },
  { id: 2, title: "CRM", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop", desc: "Gestión inteligente de pólizas. El núcleo de retención de tu negocio." },
  { id: 3, title: "COTIZADOR", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop", desc: "Multi-carrier pricing instantáneo. Cierra más tratos en segundos." },
  { id: 4, title: "COMISIONES", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop", desc: "Trazabilidad financiera absoluta y proyecciones de ingresos." },
  { id: 5, title: "MARKETING", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop", desc: "Campañas automáticas y embudos de conversión integrados." },
  { id: 6, title: "SOPORTE", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop", desc: "Resolución de tickets y asistencia continua para tus agentes." },
  { id: 7, title: "REPORTES", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", desc: "Business Intelligence y exportación avanzada de datos." },
  { id: 8, title: "AGENTES", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop", desc: "Métricas de rendimiento y gestión estructural de equipos." },
  { id: 9, title: "SISTEMA", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop", desc: "Configuraciones globales y control absoluto de permisos." },
];

export default function BackOfficeTour() {
  const [idx, setIdx] = useState(0);

  const magnetRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const handleNext = () => setIdx((prev) => (prev + 1) % PANELS.length);

  // Auto-Play optimizado (5 segundos por slide) que se reinicia si el usuario interactúa
  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % PANELS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [idx]);

  useEffect(() => {
    if (!magnetRef.current || !btnRef.current) return;
    
    // GSAP quickTo para rendimiento a 60fps constantes
    // Usamos una curva elástica para ese "bounce" magnético característico de Awwwards
    const xTo = gsap.quickTo(btnRef.current, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(btnRef.current, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = magnetRef.current!.getBoundingClientRect();
      
      // Calcular el centro exacto de la zona magnética (el contenedor grande)
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Distancia del ratón al centro
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Movemos el botón físico una fracción de esa distancia (fuerza magnética)
      xTo(distanceX * 0.4);
      yTo(distanceY * 0.4);
    };

    const handleMouseLeave = () => {
      // Al salir de la zona, el botón regresa violentamente al centro (efecto muelle)
      xTo(0);
      yTo(0);
    };

    const trigger = magnetRef.current;
    trigger.addEventListener("mousemove", handleMouseMove);
    trigger.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      trigger.removeEventListener("mousemove", handleMouseMove);
      trigger.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative w-full h-[90vh] bg-[#050505] text-white flex overflow-hidden border-y border-white/20 mb-section-lg">
      
      {/* ── BOTÓN CENTRAL MAGNÉTICO (Awwwards Style) ── */}
      <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
        
        {/* Zona Magnética (El Área de Trigger - más grande que el botón) */}
        <div 
           ref={magnetRef}
           className="w-48 h-48 pointer-events-auto cursor-pointer flex items-center justify-center rounded-full group"
           onClick={handleNext}
        >
           {/* El Botón Físico (El que se mueve con GSAP) */}
           <div 
             ref={btnRef}
             className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white text-white"
           >
             <span className="text-2xl font-bold transition-transform duration-300 group-hover:scale-125 group-hover:translate-x-1">→</span>
           </div>
        </div>
      </div>

      {/* ── BARRA DE PROGRESO INFERIOR ── */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 z-50">
         <div 
           className="h-full bg-[var(--color-brand-blue)] transition-all duration-[1.2s] ease-[cubic-bezier(0.85,0,0.15,1)]"
           style={{ width: `${((idx + 1) / PANELS.length) * 100}%` }}
         />
      </div>

      {/* ── LADO IZQUIERDO (TEXTO) - SE MUEVE HACIA ARRIBA ── */}
      <div className="w-1/2 h-full relative overflow-hidden bg-black border-r border-white/10">
        <div 
          className="absolute inset-x-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col"
          style={{ transform: `translateY(-${idx * 90}vh)` }}
        >
          {PANELS.map((panel) => (
            <div key={panel.id} className="w-full h-[90vh] flex-shrink-0 flex flex-col justify-center p-12 lg:p-24">
              <span className="text-h2 font-bold text-white/60 mb-2 block select-none tracking-widest">
                0{panel.id}.
              </span>
              <h2 className="text-display-xl font-black uppercase tracking-tighter text-white mb-6">
                {panel.title}
              </h2>
              <p className="text-body-xl font-medium text-white/70 max-w-lg leading-relaxed">
                {panel.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── LADO DERECHO (IMÁGENES) - SE MUEVE HACIA ABAJO ── */}
      <div className="w-1/2 h-full relative overflow-hidden bg-[#0A0A0A]">
        <div 
          className="absolute inset-x-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col"
          style={{ transform: `translateY(-${(PANELS.length - 1 - idx) * 90}vh)` }}
        >
          {[...PANELS].reverse().map((panel) => (
            <div key={`img-${panel.id}`} className="w-full h-[90vh] flex-shrink-0 relative overflow-hidden group">
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
                 style={{ backgroundImage: `url('${panel.img}')` }}
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
