"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  { id: 1, title: "DASHBOARD" },
  { id: 2, title: "CRM" },
  { id: 3, title: "COTIZADOR" },
];

export default function BackOfficeTourOscilloscope() {
  const containerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          setActive(Math.floor(self.progress * 2.99));
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020502] text-[#35BBFD] font-mono flex items-center justify-center overflow-hidden">
      {/* Radar Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(53,187,253,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Scanning line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-brand-blue)] shadow-[0_0_20px_#35BBFD] animate-[scan_3s_linear_infinite]" />
      
      <div className="z-10 text-center">
        <h2 className="text-display-md mb-8 tracking-[0.2em]">{PANELS[active]?.title || "SYSTEM"}</h2>
        
        {/* Fake Sine Wave / Oscilloscope Trace */}
        <div className="flex items-center gap-1 h-32">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="w-1 bg-[#35BBFD] transition-all duration-300 ease-out shadow-[0_0_8px_#35BBFD]"
              style={{
                height: `${Math.random() * (active * 20 + 20)}%`,
                opacity: Math.random() * 0.5 + 0.5
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </section>
  );
}
