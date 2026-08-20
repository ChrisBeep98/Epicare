"use client";

import { useState } from "react";

const PANELS = [
  { id: 1, title: "DASHBOARD", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, title: "CRM", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" },
  { id: 3, title: "COTIZADOR", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop" },
  { id: 4, title: "COMISIONES", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, title: "MARKETING", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop" },
  { id: 6, title: "SOPORTE", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop" },
  { id: 7, title: "REPORTES", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" },
  { id: 8, title: "AGENTES", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" },
  { id: 9, title: "SISTEMA", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop" },
];

export default function BackOfficeTour() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative w-full h-screen bg-[var(--color-surface-BG-black)] flex overflow-hidden mb-section-md">
      {/* 
        Hover Accordion (Flex Gallery)
        Cero Scroll. 100vh. Las imágenes están pegadas a los bordes superior e inferior.
        El usuario explora haciendo hover, lo que expande masivamente la imagen activa.
      */}
      <div className="flex w-full h-full p-2 gap-2">
        {PANELS.map((panel, i) => {
          const isActive = active === i;
          return (
            <div
              key={panel.id}
              onMouseEnter={() => setActive(i)}
              className={`relative h-full overflow-hidden rounded-[1rem] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive ? "flex-[10]" : "flex-[1] opacity-50 hover:opacity-80"
              }`}
            >
              {/* Imagen Gigante (Edge to Edge) */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[2000ms] ease-out"
                style={{ 
                  backgroundImage: `url('${panel.img}')`,
                  transform: isActive ? "scale(1)" : "scale(1.2)",
                  filter: isActive ? "grayscale(0%)" : "grayscale(80%) brightness(0.4)"
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              
              {/* Contenido (Solo visible cuando está activo) */}
              <div 
                className={`absolute bottom-8 left-8 w-max transition-all duration-500 delay-100 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >
                <span className="text-meta text-[var(--color-text-accent-blue)] tracking-[0.2em] block mb-2">
                  0{panel.id}
                </span>
                <h3 className="text-display-lg font-bold text-white uppercase tracking-tighter leading-none">
                  {panel.title}
                </h3>
              </div>

              {/* Título Vertical (Visible cuando NO está activo) */}
              <div 
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 origin-bottom-left -rotate-90 whitespace-nowrap transition-all duration-300 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="text-body-md font-bold tracking-widest text-white/50 uppercase">
                  {panel.title}
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
