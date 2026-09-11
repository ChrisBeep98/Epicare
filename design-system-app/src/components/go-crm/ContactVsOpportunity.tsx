"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

export default function ContactVsOpportunity() {
  const t = useTranslations("goCrm.contactVsOpp");
  const comp = useRef<HTMLElement>(null);


  useLayoutEffect(() => {
    let mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: comp.current,
          pin: true,
          start: "top top",
          end: "+=200%",
          scrub: 1,
        }
      });

      // The top layer splits into 3 columns and slides down/up
      tl.to(".slice-left", { yPercent: 100, ease: "power2.inOut", duration: 1 }, 0);
      tl.to(".slice-center", { yPercent: -100, ease: "power2.inOut", duration: 1 }, 0.2);
      tl.to(".slice-right", { yPercent: 100, ease: "power2.inOut", duration: 1 }, 0.4);

      // The headline fades in
      tl.to(".slice-headline", { opacity: 1, y: 0, duration: 0.5 }, 1);
      
      // The cards stagger in completely asymmetrically: Left (1), then Right (3), then Center (2)
      tl.to(".opp-card:nth-child(1)", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.2);
      tl.to(".opp-card:nth-child(3)", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.35);
      tl.to(".opp-card:nth-child(2)", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.5);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={comp} className="w-full h-screen relative bg-slate-900 overflow-hidden font-sans">
      
      {/* Background Layer: The Unified Opportunity revealed */}
      <div className="absolute inset-0 bg-[#35BBFD] flex flex-col items-center justify-between pt-14 pb-3 px-gutter-md overflow-hidden">
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/10" />
        
        {/* Title Container (Pushed to top) */}
        <div className="relative z-10 w-full max-w-6xl mt-4">
          <div className="slice-headline opacity-0 translate-y-8 w-full">
            <h2 className="text-display-md md:text-display-lg text-white font-semibold tracking-tight text-left max-w-4xl mx-auto leading-[1.05] drop-shadow-md">
              {t("headline")}
            </h2>
          </div>
        </div>
          
        {/* The 3 Opportunities Cards (At the bottom, 12px away from edge due to pb-3 on parent) */}
        <div className="relative z-10 flex flex-col md:flex-row justify-center gap-3 w-full max-w-6xl mt-auto">
            
            {/* Opp 1: Dental */}
            <div className="opp-card opacity-0 translate-y-24 relative w-full md:w-[320px] shrink-0 h-[50vh] max-h-[420px] min-h-[300px] flex flex-col p-8 md:p-10 rounded-xl border border-white/40 shadow-elevation-4 overflow-hidden group">
              {/* STATIC BACKGROUND LAYER */}
              <div className="absolute inset-0 -z-10 rounded-xl transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[40px] saturate-[1.5]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/50 to-white/10" />
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,1)]" />
              </div>
              
              {/* CONTENT LAYER */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white mb-8 flex items-center justify-center text-[#35BBFD] shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.08)] shrink-0 transition-transform duration-500 group-hover:-translate-y-1">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21c-2 0-4-1.5-4.5-3.5-.5-1.5-.2-3 .5-4l1-1.5c.5-1 .8-2 .5-3-.3-1.5-1-2.5-2-3.5A5.5 5.5 0 0 1 7 2a5.5 5.5 0 0 1 5 4 5.5 5.5 0 0 1 5-4 5.5 5.5 0 0 1 5 3.5c-1 1-1.7 2-2 3.5-.3 1 0 2 .5 3l1 1.5c.7 1 .9 2.5.5 4C20 19.5 18 21 16 21c-2.5 0-3.5-1.5-4-3l-.5-1.5-.5 1.5c-.5 1.5-1.5 3-4 3z" /></svg>
                </div>
                <h3 className="text-h3 font-medium mb-4 tracking-tight text-slate-900">{t("opp1")}</h3>
                <p className="text-body-md text-slate-700 leading-relaxed mt-auto">{t("opp1Desc")}</p>
              </div>
            </div>

            {/* Opp 2: Auto */}
            <div className="opp-card opacity-0 translate-y-24 relative w-full md:w-[320px] shrink-0 h-[50vh] max-h-[420px] min-h-[300px] flex flex-col p-8 md:p-10 rounded-xl border border-white/40 shadow-elevation-4 overflow-hidden group">
              {/* STATIC BACKGROUND LAYER */}
              <div className="absolute inset-0 -z-10 rounded-xl transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[40px] saturate-[1.5]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/50 to-white/10" />
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,1)]" />
              </div>
              
              {/* CONTENT LAYER */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white mb-8 flex items-center justify-center text-[#35BBFD] shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.08)] shrink-0 transition-transform duration-500 group-hover:-translate-y-1">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                </div>
                <h3 className="text-h3 font-medium mb-4 tracking-tight text-slate-900">{t("opp2")}</h3>
                <p className="text-body-md text-slate-700 leading-relaxed mt-auto">{t("opp2Desc")}</p>
              </div>
            </div>

            {/* Opp 3: Vida */}
            <div className="opp-card opacity-0 translate-y-24 relative w-full md:w-[320px] shrink-0 h-[50vh] max-h-[420px] min-h-[300px] flex flex-col p-8 md:p-10 rounded-xl border border-white/40 shadow-elevation-4 overflow-hidden group">
              {/* STATIC BACKGROUND LAYER */}
              <div className="absolute inset-0 -z-10 rounded-xl transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[40px] saturate-[1.5]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/50 to-white/10" />
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,1)]" />
              </div>
              
              {/* CONTENT LAYER */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white mb-8 flex items-center justify-center text-[#35BBFD] shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.08)] shrink-0 transition-transform duration-500 group-hover:-translate-y-1">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
                <h3 className="text-h3 font-medium mb-4 tracking-tight text-slate-900">{t("opp3")}</h3>
                <p className="text-body-md text-slate-700 leading-relaxed mt-auto">{t("opp3Desc")}</p>
              </div>
            </div>

        </div>
      </div>

      {/* Foreground Layer: The Contact (Sliced via clip-path) */}
      <div className="absolute inset-0 pointer-events-none z-30 hidden md:block">
        
        {/* Left Slice */}
        <div className="slice-left absolute inset-0 bg-slate-900" style={{ clipPath: 'polygon(0 0, 33.33% 0, 33.33% 100%, 0 100%)' }}>
          <div className="absolute top-0 bottom-0 left-0 w-[33.33%] z-0">
             <img src="/client_auto.jpg" alt="Auto Client" className="w-full h-full object-cover opacity-[0.65]" />
          </div>
          <div className="absolute top-0 bottom-0 left-0 w-[33.33%] p-static-xl md:p-static-2xl pt-static-xl md:pt-[3.25rem] flex flex-col gap-fluid-lg border-r border-slate-800">
            
            {/* The Realistic Profile Card (Ultra-Glassmorphic Minimalist) */}
            <div className="relative z-10 w-full max-w-[320px] rounded-2xl border border-white/50 shadow-elevation-4 overflow-hidden">
              
              {/* STATIC BACKGROUND LAYER */}
              <div className="absolute inset-0 -z-10 rounded-2xl">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[40px] saturate-[1.5]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10" />
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]" />
              </div>

              {/* CONTENT LAYER */}
              <div className="relative z-10 p-static-md flex flex-col gap-static-sm">
                
                {/* Avatar + Name + Origin Channels */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-static-sm">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shadow-elevation-1 shrink-0">
                      <span className="text-body-sm font-medium text-white">ER</span>
                    </div>
                    <h3 className="text-h6 text-slate-900 font-semibold leading-tight">Elena Rojas</h3>
                  </div>
                  
                  {/* Origin Channels (FB + WA) */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#1877F2]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#25D366]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Minimal Contact Data */}
                <div className="flex flex-col gap-1 pt-static-sm border-t border-slate-900/10">
                  <span className="text-body-xs text-slate-700 font-mono">c.martinez@email.com</span>
                  <span className="text-body-xs text-slate-700 font-mono">+1 (555) 123-4567</span>
                </div>

                {/* Insurance Type Badge */}
                <div className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                    <circle cx="7" cy="17" r="2"/>
                    <path d="M9 17h6"/>
                    <circle cx="17" cy="17" r="2"/>
                  </svg>
                  <span className="text-body-xs text-slate-700 font-semibold tracking-tight">Auto Insurance</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Center Slice */}
        <div className="slice-center absolute inset-0 bg-slate-900" style={{ clipPath: 'polygon(33.33% 0, 66.66% 0, 66.66% 100%, 33.33% 100%)' }}>
          <div className="absolute top-0 bottom-0 left-[33.33%] w-[33.33%] z-0">
             <img src="/client_business.jpg" alt="Business Client" className="w-full h-full object-cover opacity-[0.65]" />
          </div>
          
          {/* Business Card Container (Bottom Positioned) */}
          <div className="absolute top-0 bottom-0 left-[33.33%] w-[33.33%] p-static-xl md:p-static-2xl pb-static-xl md:pb-[3.25rem] flex flex-col justify-end items-center border-r border-slate-800">
            
            {/* The Realistic Profile Card (Business) */}
            <div className="relative z-10 w-full max-w-[320px] rounded-2xl border border-white/50 shadow-elevation-4 overflow-hidden">
              <div className="absolute inset-0 -z-10 rounded-2xl">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[40px] saturate-[1.5]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10" />
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]" />
              </div>
              <div className="relative z-10 p-static-md flex flex-col gap-static-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-static-sm">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shadow-elevation-1 shrink-0">
                      <span className="text-body-sm font-medium text-white">DS</span>
                    </div>
                    <h3 className="text-h6 text-slate-900 font-semibold leading-tight">David Smith</h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#0077b5]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#25D366]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 pt-static-sm border-t border-slate-900/10">
                  <span className="text-body-xs text-slate-700 font-mono">david.smith@business.com</span>
                  <span className="text-body-xs text-slate-700 font-mono">+1 (555) 987-6543</span>
                </div>
                <div className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span className="text-body-xs text-slate-700 font-semibold tracking-tight">Business Insurance</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Slice */}
        <div className="slice-right absolute inset-0 bg-slate-900" style={{ clipPath: 'polygon(66.66% 0, 100% 0, 100% 100%, 66.66% 100%)' }}>
          <div className="absolute top-0 bottom-0 right-0 w-[33.33%] z-0">
             <img src="/client_family.jpg" alt="Family Client" className="w-full h-full object-cover opacity-[0.65]" />
          </div>
          
          {/* Family Card Container (Top Positioned) */}
          <div className="absolute top-0 bottom-0 right-0 w-[33.33%] p-static-xl md:p-static-2xl pt-static-xl md:pt-[3.25rem] flex flex-col items-center border-l border-slate-800">
            
            {/* The Realistic Profile Card (Family) */}
            <div className="relative z-10 w-full max-w-[320px] rounded-2xl border border-white/50 shadow-elevation-4 overflow-hidden">
              <div className="absolute inset-0 -z-10 rounded-2xl">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[40px] saturate-[1.5]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10" />
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]" />
              </div>
              <div className="relative z-10 p-static-md flex flex-col gap-static-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-static-sm">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shadow-elevation-1 shrink-0">
                      <span className="text-body-sm font-medium text-white">ML</span>
                    </div>
                    <h3 className="text-h6 text-slate-900 font-semibold leading-tight">Maria Lopez</h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#1877F2]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#25D366]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 pt-static-sm border-t border-slate-900/10">
                  <span className="text-body-xs text-slate-700 font-mono">m.lopez@family.com</span>
                  <span className="text-body-xs text-slate-700 font-mono">+1 (555) 345-6789</span>
                </div>
                <div className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span className="text-body-xs text-slate-700 font-semibold tracking-tight">Family Insurance</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Mobile Foreground Layer: Fallback */}
      <div className="slice-left absolute inset-0 pointer-events-none z-30 md:hidden bg-slate-900 flex flex-col items-center justify-center px-static-xl">
          <div className="absolute inset-0 z-0">
             <img src="/client_auto.jpg" alt="Auto Client" className="w-full h-full object-cover opacity-[0.45]" />
          </div>
          <div className="z-10 flex flex-col w-full p-static-xl pt-static-2xl max-w-sm mx-auto">
            
            {/* The Realistic Profile Card (Ultra-Glassmorphic Minimalist) */}
            <div className="relative z-10 w-full max-w-[320px] mx-auto rounded-2xl border border-white/50 shadow-elevation-4 overflow-hidden">
              
              {/* STATIC BACKGROUND LAYER */}
              <div className="absolute inset-0 -z-10 rounded-2xl">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[40px] saturate-[1.5]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10" />
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]" />
              </div>

              {/* CONTENT LAYER */}
              <div className="relative z-10 p-static-md flex flex-col gap-static-sm">
                
                {/* Avatar + Name + Origin Channels */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-static-sm">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shadow-elevation-1 shrink-0">
                      <span className="text-body-sm font-medium text-white">ER</span>
                    </div>
                    <h3 className="text-h6 text-slate-900 font-semibold leading-tight">Elena Rojas</h3>
                  </div>
                  
                  {/* Origin Channels (FB + WA) */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#1877F2]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#25D366]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Minimal Contact Data */}
                <div className="flex flex-col gap-1 pt-static-sm border-t border-slate-900/10">
                  <span className="text-body-xs text-slate-700 font-mono">c.martinez@email.com</span>
                  <span className="text-body-xs text-slate-700 font-mono">+1 (555) 123-4567</span>
                </div>

                {/* Insurance Type Badge */}
                <div className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                    <circle cx="7" cy="17" r="2"/>
                    <path d="M9 17h6"/>
                    <circle cx="17" cy="17" r="2"/>
                  </svg>
                  <span className="text-body-xs text-slate-700 font-semibold tracking-tight">Auto Insurance</span>
                </div>

              </div>
            </div>

          </div>
      </div>

    </section>
  );
}
