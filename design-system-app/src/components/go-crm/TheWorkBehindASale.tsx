"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  {
    id: "tasks",
    title: "Tasks",
    desc: "Actions assigned with a strict deadline. The engine that prevents lost sales.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop",
    color: "#10B981"
  },
  {
    id: "activities",
    title: "Activities",
    desc: "Every interaction, email, and stage change recorded in a single timeline.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    color: "var(--color-brand-blue)"
  },
  {
    id: "notes",
    title: "Notes",
    desc: "The critical context and preferences that make the next conversation warmer.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop",
    color: "#F59E0B"
  },
  {
    id: "followup",
    title: "Follow-up",
    desc: "Consistent contact until a decision. Where most fail, the system persists.",
    image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200&auto=format&fit=crop",
    color: "var(--color-brand-orange)"
  }
];

export default function TheWorkBehindASale() {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Horizontal Scroll Mechanism
      const trackWidth = track.current!.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollDistance = trackWidth - windowWidth;

      gsap.to(track.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // B2: Image Inner Parallax
      const images = gsap.utils.toArray<HTMLElement>(".parallax-image");
      images.forEach((img) => {
        gsap.to(img, {
          x: "20%", // Image moves slightly right while container moves left
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1,
          }
        });
      });

      // B1: Initial Text Reveal
      gsap.fromTo(".intro-text-line",
        { yPercent: 100, opacity: 0 },
        { 
          yPercent: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%"
          }
        }
      );

      // B3: Latent Life (Continuous Slow Breathing on Images)
      gsap.to(".parallax-image", {
        scale: 1.15,
        duration: 15,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full h-screen bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] overflow-hidden flex items-center border-y border-[var(--color-border-Strokes-default)]">
      
      {/* The Horizontal Track */}
      <div ref={track} className="flex h-full w-max items-center pl-[5vw] lg:pl-[10vw]">
        
        {/* Intro Panel (Static relative to the track) */}
        <div className="w-[85vw] lg:w-[40vw] h-full flex flex-col justify-center shrink-0 pr-12 lg:pr-24">
          <div className="overflow-hidden mb-4">
            <p className="intro-text-line text-overline text-[var(--color-brand-blue)] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-blue)]" />
              06 — THE WORK BEHIND A SALE
            </p>
          </div>
          <div className="overflow-hidden mb-8">
            <h2 className="intro-text-line text-display-xl lg:text-[4.5vw] font-bold tracking-tighter leading-[0.95] text-[var(--color-text-primary)]">
              Every opportunity creates work.
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="intro-text-line text-body-lg text-[var(--color-text-secondary)] leading-relaxed max-w-md">
              Tasks, activities, notes and follow-up keep the sales process moving around a specific opportunity.
            </p>
          </div>
        </div>

        {/* The 4 Image Panels */}
        {PANELS.map((panel, i) => (
          <div key={panel.id} className="relative w-[85vw] lg:w-[50vw] h-[60vh] lg:h-[75vh] shrink-0 mr-8 lg:mr-16 rounded-2xl overflow-hidden shadow-elevation-4 border border-[var(--color-border-Strokes-strong)] bg-[#0A0D14] group">
            
            {/* Image Parallax Container */}
            <div className="absolute inset-0 w-[120%] -left-[10%] h-full z-0 overflow-hidden">
              <div className="absolute inset-0 bg-black/30 z-10 mix-blend-overlay pointer-events-none transition-opacity duration-500 group-hover:opacity-10" />
              <img 
                src={panel.image} 
                alt={panel.title} 
                className="parallax-image absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" 
              />
            </div>

            {/* Content Inside Panel */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.3)]" style={{ backgroundColor: panel.color }} />
                <h3 className="text-display-sm font-semibold tracking-tight text-white uppercase">
                  {panel.title}
                </h3>
              </div>
              <p className="text-body text-white/80 max-w-md leading-relaxed border-l-2 border-white/20 pl-4">
                {panel.desc}
              </p>
            </div>
            
          </div>
        ))}

        {/* End Buffer to allow scrolling past the last card smoothly */}
        <div className="w-[10vw] shrink-0 h-full" />

      </div>

    </section>
  );
}
