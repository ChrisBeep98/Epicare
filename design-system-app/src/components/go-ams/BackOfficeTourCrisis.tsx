"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  { id: 1, title: "DASHBOARD", metric: "100%" },
  { id: 2, title: "CRM", metric: "ACT" },
  { id: 3, title: "QUOTE", metric: "0.2s" },
];

export default function BackOfficeTourCrisis() {
  const containerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          setActive(Math.floor(self.progress * 2.99));
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020202] text-[#35BBFD] font-mono flex items-center justify-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(53,187,253,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(53,187,253,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="absolute top-8 left-8">
        <h2 className="text-xs tracking-[0.5em] uppercase border-b border-[#35BBFD]/30 pb-2">Crisis Wall Protocol</h2>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 p-8 relative z-10">
        {PANELS.map((p, i) => (
          <div key={p.id} className={`border border-[#35BBFD] bg-black/50 p-6 flex flex-col gap-4 transition-all duration-300 ${active >= i ? "opacity-100 translate-y-0" : "opacity-20 translate-y-8"}`}>
            <div className="flex justify-between items-center border-b border-[#35BBFD]/50 pb-2">
              <span className="text-sm">SYS.{p.id}</span>
              <span className={`text-xs ${active === i ? "animate-pulse" : ""}`}>{active >= i ? "ONLINE" : "STANDBY"}</span>
            </div>
            <h3 className="text-4xl font-bold">{p.title}</h3>
            
            {/* Loading Bar */}
            <div className="w-full h-2 bg-[#35BBFD]/20 mt-auto">
              <div 
                className="h-full bg-[#35BBFD] transition-all duration-1000 ease-out" 
                style={{ width: active >= i ? "100%" : "0%" }} 
              />
            </div>
            <div className="text-right text-xs">VOL {p.metric}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
