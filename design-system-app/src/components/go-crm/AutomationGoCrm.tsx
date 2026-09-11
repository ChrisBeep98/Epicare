"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

export default function AutomationGoCrm() {
  const t = useTranslations("goCrm.automation");
  const container = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      
      // Pin the entire split-screen container
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
        }
      });

      // 1. Slot machine scroll on the right
      tl.to(".v3-right-strip", { yPercent: -66.666, ease: "power2.inOut", duration: 3 });

      // textTl drives the stepper logic
      const textTl = tl;
      textTl
      // Segment 1 -> 2
        .to(".v3-text-1", { opacity: 0.3, duration: 0.5 }, 0.5)
        .to(".v3-stepper-progress", { xPercent: 100, duration: 0.5 }, 0.5)
        .to(".v3-text-2", { opacity: 1, duration: 0.5 }, 0.5)
      // Segment 2 -> 3
        .to(".v3-text-2", { opacity: 0.3, duration: 0.5 }, 2.0)
        .to(".v3-stepper-progress", { xPercent: 200, duration: 0.5 }, 2.0)
        .to(".v3-text-3", { opacity: 1, duration: 0.5 }, 2.0);


      // --- MICRO-INTERACTIONS WITHIN VISUALS (Independent of scroll, loopeable) ---

      // Case 1: Campaign Overlapping UI Animation
      const campTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      
      // 1. Arrow is natively animated via CSS bounce now.
      // 2. The data beam shoots across
      campTl.to(".new-opp-card", { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.out" })
            .to(".new-opp-card", { x: 50, opacity: 0, duration: 0.3, ease: "power2.in" })
      // 3. The CRM card reacts
            .to(".crm-foreground-card", { scale: 1.02, rotation: 0, duration: 0.3, ease: "power2.out", yoyo: true, repeat: 1 }, "-=0.2");

      // Case 2: Appointment Reminders
      const remTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      remTl.to(".rem-clock", { rotation: 360, duration: 2, ease: "none" }, 0)
           .fromTo(".rem-bubble-1", { y: 20, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, 0.5)
           .fromTo(".rem-bubble-2", { y: 20, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, 1.5)
           .to(".rem-bubble-1, .rem-bubble-2", { opacity: 0, y: -10, duration: 0.3 }, 3);

      // Case 3: SmartTags Mutation
      const tagTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      // Time-based tag disappears
      tagTl.to(".tag-time-bar", { scaleX: 0, transformOrigin: "left center", duration: 2, ease: "none" }, 0)
           .to(".tag-time", { scale: 0, opacity: 0, duration: 0.3, ease: "back.in(2)" }, 2)
      // Action-based tag mutates
           .to(".tag-action-icon", { rotation: -20, scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 }, 3)
           .to(".tag-action", { backgroundColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.3)", color: "#10B981", duration: 0.3 }, 3.2)
           .to(".tag-action-text", { innerHTML: "CALLED", duration: 0.1 }, 3.2)
           .to(".tag-time, .tag-action", { scale: 1, opacity: 1, backgroundColor: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.3)", color: "#EF4444", duration: 0 }, 5)
           .to(".tag-action-text", { innerHTML: "NO CALL", duration: 0 }, 5);

    }, container);

    return () => ctx.revert();
  }, []);


  // VISUAL COMPONENT 1: Campaign to Opportunity (Radical Overlapping Redesign)
  const VisualCampaign = () => (
    <div className="relative w-full max-w-lg h-96 flex items-center justify-center perspective-[1200px]">
      
      {/* Background Ad Layer (The Source) */}
      <div className="absolute left-0 top-10 w-64 bg-[var(--color-surface-BG-2)] border border-[var(--color-border-Strokes-strong)] rounded-2xl shadow-elevation-2 overflow-hidden transform rotate-[-5deg] scale-90">
        {/* Fake Ad Header */}
        <div className="flex items-center gap-2 p-3 border-b border-[var(--color-border-Strokes-default)]">
          <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center shrink-0">
             <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z"/></svg>
          </div>
          <div className="flex flex-col">
            <div className="h-1.5 w-16 bg-[var(--color-text-primary)] opacity-80 rounded-full mb-1"></div>
            <div className="h-1 w-10 bg-[var(--color-text-primary)] opacity-30 rounded-full"></div>
          </div>
        </div>
        {/* Fake Ad Image / Animated Arrow Drop */}
        <div className="w-full h-32 bg-[var(--color-surface-BG-3)] flex flex-col items-center justify-center relative overflow-hidden">
          <svg className="w-8 h-8 text-[var(--color-brand-blue)] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        {/* Fake Ad CTA */}
        <div className="p-4 flex justify-between items-center bg-[var(--color-surface-BG-1)]">
          <div className="h-2 w-20 bg-[var(--color-text-primary)] opacity-40 rounded-full"></div>
          <div className="px-3 py-1 bg-[var(--color-text-primary)] rounded text-[var(--color-surface-BG-base)] text-[8px] font-bold">GET QUOTE</div>
        </div>
      </div>

      {/* The Extraction Beam / Pulse */}
      <div className="absolute left-32 z-10 w-32 h-1 bg-gradient-to-r from-[#1877F2] to-[var(--color-brand-orange)] rounded-full opacity-0 scale-0 transform origin-left new-opp-card shadow-[0_0_20px_rgba(242,96,35,0.8)]"></div>

      {/* Foreground CRM Layer (The Destination) */}
      <div className="crm-foreground-card absolute right-0 bottom-10 w-72 bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-strong)] rounded-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] p-5 transform rotate-[2deg] z-20 flex flex-col gap-5 backdrop-blur-xl">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-[var(--color-surface-BG-3)] overflow-hidden shrink-0">
               <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Client" className="w-full h-full object-cover" />
             </div>
             <div>
               <p className="text-sm font-bold text-[var(--color-text-primary)]">Sarah Jenkins</p>
               <p className="text-[10px] font-mono text-[var(--color-brand-orange)] uppercase tracking-wider">New Opportunity</p>
             </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-[var(--color-border-Strokes-default)] flex items-center justify-center bg-[var(--color-surface-BG-2)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>

        {/* Data Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--color-surface-BG-2)] p-2.5 rounded-lg border border-[var(--color-border-Strokes-default)]">
            <p className="text-[9px] text-[var(--color-text-muted)] uppercase mb-1">Source</p>
            <p className="text-xs font-semibold text-[var(--color-text-primary)] flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#1877F2]"></span> Facebook</p>
          </div>
          <div className="bg-[var(--color-surface-BG-2)] p-2.5 rounded-lg border border-[var(--color-border-Strokes-default)]">
            <p className="text-[9px] text-[var(--color-text-muted)] uppercase mb-1">Value Est.</p>
            <p className="text-xs font-bold text-[var(--color-text-primary)]">$18,400</p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="w-full bg-[var(--color-text-primary)] text-[var(--color-surface-BG-base)] rounded-md py-2 text-center text-[10px] font-bold tracking-widest uppercase shadow-elevation-2">
          Pipeline Updated
        </div>
      </div>
    </div>
  );

  // VISUAL COMPONENT 2: Appointment to Reminder
  const VisualAppointment = () => (
    <div className="relative w-full max-w-md h-96 flex justify-center items-center">
      {/* Calendar Anchor */}
      <div className="absolute top-10 w-48 bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-strong)] rounded-2xl shadow-elevation-4 p-4 flex items-center gap-4 z-10">
        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex flex-col items-center justify-center overflow-hidden border border-red-500/20">
          <div className="w-full h-3 bg-red-500"></div>
          <span className="text-body font-bold text-red-500 mt-0.5">14</span>
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--color-text-primary)]">Meeting</p>
          <div className="flex items-center gap-1 mt-1 text-[var(--color-text-muted)]">
            <svg className="rem-clock w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span className="text-[10px]">10:00 AM</span>
          </div>
        </div>
      </div>

      {/* Orbiting Reminders */}
      <div className="absolute top-32 w-full flex flex-col items-center gap-6 z-20">
        <div className="rem-bubble-1 w-64 bg-[var(--color-surface-BG-2)]/80 backdrop-blur-md border border-[var(--color-border-Strokes-default)] rounded-2xl p-3 shadow-elevation-3 flex items-center gap-3 transform -translate-x-8">
          <div className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path></svg>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[var(--color-brand-blue)] uppercase">2 Days Before</p>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">Automated Email</p>
          </div>
        </div>

        <div className="rem-bubble-2 w-64 bg-[var(--color-surface-BG-2)]/80 backdrop-blur-md border border-[var(--color-border-Strokes-default)] rounded-2xl p-3 shadow-elevation-3 flex items-center gap-3 transform translate-x-8">
          <div className="w-8 h-8 rounded-full bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[var(--color-brand-orange)] uppercase">3 Hours Before</p>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">SMS Alert</p>
          </div>
        </div>
      </div>
    </div>
  );

  // VISUAL COMPONENT 3: SmartTags Mutation
  const VisualSmartTags = () => (
    <div className="relative w-full max-w-md h-96 flex items-center justify-center">
      
      {/* Client Profile Card */}
      <div className="w-80 bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-strong)] rounded-3xl shadow-elevation-5 p-6 relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-[var(--color-surface-BG-3)] overflow-hidden shrink-0">
             <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Client" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="h-3 w-24 bg-[var(--color-text-primary)] rounded-full opacity-30 mb-2"></div>
            <div className="h-2 w-16 bg-[var(--color-text-primary)] rounded-full opacity-10"></div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Tag 1: Expiration (Time) */}
          <div className="tag-time flex items-center justify-between w-full bg-[var(--color-surface-BG-2)] border border-[var(--color-border-Strokes-default)] rounded-xl p-3 relative overflow-hidden">
            <div className="tag-time-bar absolute bottom-0 left-0 h-1 bg-[var(--color-brand-blue)] w-full opacity-50"></div>
            <div className="flex items-center gap-2 relative z-10">
               <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] animate-pulse"></span>
               <span className="text-xs font-bold text-[var(--color-text-primary)]">NEW LEAD</span>
            </div>
            <span className="text-[10px] font-mono text-[var(--color-brand-blue)] relative z-10">24H</span>
          </div>

          {/* Tag 2: Action Mutation */}
          <div className="tag-action flex items-center justify-between w-full bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl p-3 transition-colors">
            <div className="flex items-center gap-2">
               <svg className="tag-action-icon w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
               <span className="tag-action-text text-xs font-bold uppercase tracking-wider">NO CALL</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );


  return (
    <section ref={container} className="relative w-full h-screen bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] overflow-hidden border-y border-[var(--color-border-Strokes-default)]">
      
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT PANEL: Sticky Typography */}
        <div className="h-full flex flex-col justify-center relative border-r border-[var(--color-border-Strokes-default)] z-20 bg-[var(--color-surface-BG-base)]">
          <div className="w-full max-w-2xl ml-auto px-gutter-md md:pl-gutter-lg md:pr-16">
            <p className="text-overline text-[var(--color-text-accent-blue)] uppercase tracking-widest mb-4">10 — AUTOMATION</p>
            <h2 className="text-display-lg font-bold tracking-tighter leading-[0.9] text-[var(--color-text-primary)] mb-12 max-w-md">
              Set it once. Keep it moving.
            </h2>
            
            {/* 3 Square Cards (Horizontal Layout) */}
            <div className="w-full mt-8">
              <div className="flex gap-4 w-full">
                {/* Case 01 */}
                <div className="v3-text-1 aspect-square flex-1 bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-strong)] rounded-2xl p-5 flex flex-col justify-between shadow-elevation-2">
                  <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">01. Campaign → Opp</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] leading-snug">The CRM captures the ad click and instantly builds the Contact and Opportunity without data entry.</p>
                </div>
                
                {/* Case 02 */}
                <div className="v3-text-2 aspect-square flex-1 bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-strong)] rounded-2xl p-5 flex flex-col justify-between opacity-30 shadow-elevation-2">
                  <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">02. Appt → Reminder</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] leading-snug">Once scheduled, the cadence runs itself. Pre-meeting SMS and emails fire automatically based on timeline.</p>
                </div>
                
                {/* Case 03 */}
                <div className="v3-text-3 aspect-square flex-1 bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-strong)] rounded-2xl p-5 flex flex-col justify-between opacity-30 shadow-elevation-2">
                  <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">03. SmartTags</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] leading-snug">The UI mutates based on reality. Tags expire over time or instantly update when an action is logged.</p>
                </div>
              </div>

              {/* Horizontal Scrollbar / Indicator */}
              <div className="w-full h-1 bg-[var(--color-border-Strokes-default)] rounded-full mt-6 relative overflow-hidden">
                <div className="v3-stepper-progress absolute left-0 top-0 bottom-0 w-1/3 bg-[var(--color-text-primary)] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Visual Demonstrations (Slot machine) */}
        <div className="h-full relative overflow-hidden bg-[var(--color-brand-blue)] border-l flex flex-col justify-center">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-brand-blue)]/5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* The scrolling strip */}
          <div className="v3-right-strip absolute top-0 w-full h-[300vh] flex flex-col">
            
            <div className="h-[100vh] flex items-center justify-center p-12 relative">
              <VisualCampaign />
            </div>
            
            <div className="h-[100vh] flex items-center justify-center p-12 bg-gradient-to-b from-[var(--color-surface-BG-1)] to-[var(--color-surface-BG-base)] relative">
              <VisualAppointment />
            </div>
            
            <div className="h-[100vh] flex items-center justify-center p-12 relative">
              <VisualSmartTags />
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
