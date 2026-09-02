"use client";

/**
 * @file HeroGoCrm.tsx
 * @description Master Hero component for the GO CRM product page.
 * Implements a 12-column editorial grid, masked line-by-line text reveal,
 * clean BleedRight SaaS UI mockup container with ambient lighting, and strict Zero Px Policy.
 */

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, STAGGER, REVEAL } from "@/lib/motion";
import { asset } from "@/lib/asset";

/** Up-right arrow used inside the CTA button bubble */
const ArrowUR = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

/** Helper to make a container break out of the right side of the grid and touch the viewport edge */
function BleedRight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024 && ref.current) {
        const originalRight = ref.current.style.right;
        ref.current.style.right = "0px";
        const rect = ref.current.getBoundingClientRect();
        const dist = document.documentElement.clientWidth - rect.right;
        ref.current.style.right = originalRight;
        setOffset(dist > 0 ? dist : 0);
      } else {
        setOffset(0);
      }
    };

    update();
    window.addEventListener("load", update);
    window.addEventListener("resize", update);

    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("load", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ right: offset > 0 ? `-${offset}px` : undefined }}
      className={`${className} min-w-[100%] w-full lg:w-full`}
    >
      {children}
    </div>
  );
}

export default function HeroGoCrm() {
  const t = useTranslations("goCrm.hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tl: gsap.core.Timeline;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          ".crm-hero-eyebrow, .crm-hero-title-line, .crm-hero-subtitle, .crm-hero-cta, .crm-hero-microcopy, .crm-hero-showcase",
          {
            opacity: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
            filter: "none",
          }
        );
        return;
      }

      // Initial state
      gsap.set(".crm-hero-eyebrow", { opacity: 0, y: REVEAL.sm });
      gsap.set(".crm-hero-title-line", { yPercent: 120, opacity: 0 });
      gsap.set(".crm-hero-subtitle", { opacity: 0, y: REVEAL.md });
      gsap.set(".crm-hero-cta", { opacity: 0, scale: 0.9, y: REVEAL.sm });
      gsap.set(".crm-hero-microcopy", { opacity: 0, y: 10 });
      gsap.set(".crm-hero-showcase", { opacity: 0, y: 40, scale: 0.98 });

      // Entrance timeline
      tl = gsap.timeline({ paused: true });

      tl.to(".crm-hero-eyebrow", {
        opacity: 1,
        y: 0,
        duration: DUR.fast,
        ease: EASE.out,
      })
        .to(
          ".crm-hero-title-line",
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            ease: EASE.dramatic,
            stagger: STAGGER.base,
            force3D: true,
          },
          "-=0.2"
        )
        .to(
          ".crm-hero-microcopy",
          {
            opacity: 1,
            y: 0,
            duration: DUR.fast,
            ease: EASE.out,
          },
          "-=0.5"
        )
        .to(
          ".crm-hero-subtitle",
          {
            opacity: 1,
            y: 0,
            duration: DUR.base,
            ease: EASE.out,
          },
          "-=0.4"
        )
        .to(
          ".crm-hero-cta",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: DUR.base,
            ease: EASE.snap,
          },
          "-=0.3"
        )
        .to(
          ".crm-hero-showcase",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: DUR.slow,
            ease: EASE.dramatic,
            force3D: true,
          },
          "-=0.5"
        );
    }, el);

    // Synchronize with Epicare Loader
    const playHeroEntrance = () => {
      requestAnimationFrame(() => {
        if (tl && tl.paused()) tl.play();
      });
    };

    if ((window as unknown as { epicareLoaderFinished?: boolean }).epicareLoaderFinished) {
      playHeroEntrance();
    } else {
      window.addEventListener("epicareLoaderFinished", playHeroEntrance, { once: true });
    }

    const fallbackId = setTimeout(playHeroEntrance, 4000);

    return () => {
      window.removeEventListener("epicareLoaderFinished", playHeroEntrance);
      clearTimeout(fallbackId);
      ctx.revert();
    };
  }, []);

  const handleCtaClick = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="hero-wrapper"
      ref={containerRef}
      className="w-full flex flex-col bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] relative overflow-x-hidden pt-[calc(var(--space-section-md)+20px)] lg:pt-section-md pb-section-lg"
    >
      {/* ── BACKGROUND AMBIENT GLOWS ── */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(95vw,900px)] h-[min(95vw,600px)] rounded-full pointer-events-none opacity-25 dark:opacity-35 blur-[140px] bg-[radial-gradient(ellipse_at_center,var(--color-brand-blue)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 right-[-10%] w-[min(60vw,500px)] h-[min(60vw,500px)] rounded-full pointer-events-none opacity-15 dark:opacity-20 blur-[120px] bg-[radial-gradient(circle,var(--color-brand-orange)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* ── 12-COLUMN UNIFIED HERO GRID ── */}
      <section className="relative w-full flex-1 px-gutter-sm lg:px-gutter-md">
        <div className="mx-auto max-w-section-xl w-full grid-layout gap-y-static-lg lg:gap-y-static-xl">
          
          {/* ── TOP EDITORIAL ROW ── */}
          
          {/* Col 1-8: Eyebrow + Headline + Microcopy (Directly Underneath Title) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col items-start justify-start gap-static-xs lg:pr-4">
            {/* Eyebrow */}
            <div className="crm-hero-eyebrow inline-flex items-center gap-static-sm px-static-md py-static-xs rounded-full border border-[var(--color-border-Strokes-default)] bg-[var(--color-surface-BG-1)]/80 backdrop-blur-md mb-static-xs shadow-elevation-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] animate-pulse" />
              <span className="text-overline text-[var(--color-text-accent-blue)]">
                {t("overline")}
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-display-xl font-bold tracking-tight text-[var(--color-text-primary)] w-full">
              <span className="block overflow-hidden pb-1">
                <span className="crm-hero-title-line block">
                  {t.rich("title", {
                    blue: (chunks) => (
                      <span className="text-[var(--color-text-accent-blue)]">
                        {chunks}
                      </span>
                    ),
                  })}
                </span>
              </span>
            </h1>

            {/* Microcopy with Status Pulse (Directly Under Title) */}
            <div className="crm-hero-microcopy flex items-center gap-static-xs pt-static-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-orange)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-orange)]"></span>
              </span>
              <p className="text-caption text-[var(--color-text-muted)]">
                {t("microcopy")}
              </p>
            </div>
          </div>

          {/* Col 9-12: Subhead + CTA (Right Side) */}
          <div className="col-span-12 lg:col-start-9 lg:col-span-4 flex flex-col items-start justify-end gap-static-md">
            {/* Subtitle: 1 Token Down (text-body-lg) + Expanded Width (max-w-[400px]) + Bold */}
            <p className="crm-hero-subtitle text-body-lg text-[var(--color-text-secondary)] max-w-[400px] leading-relaxed">
              {t.rich("subhead", {
                bold: (chunks) => (
                  <strong className="font-semibold text-[var(--color-text-primary)]">
                    {chunks}
                  </strong>
                ),
              })}
            </p>

            {/* Primary CTA */}
            <div className="crm-hero-cta flex flex-col items-start gap-static-xs w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCtaClick}
                className="group w-fit h-12 pl-6 pr-2 rounded-full flex items-center gap-3 bg-[var(--color-brand-blue)] text-white shadow-elevation-2 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-elevation-4 active:scale-[0.96] active:opacity-80 active:duration-150 cursor-pointer"
              >
                <span className="text-body-sm font-medium">
                  {copied ? "✓ Registrado" : t("cta")}
                </span>
                <span className="relative w-8 h-8 rounded-full bg-white text-[var(--color-brand-blue)] flex items-center justify-center overflow-hidden shrink-0">
                  <ArrowUR className="absolute w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5" />
                  <ArrowUR className="absolute w-4 h-4 -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
              </button>
            </div>
          </div>

          {/* ── LOWER PART: UI SHOWCASE PANEL (BLEED-RIGHT TO VIEWPORT EDGE) ── */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-11 w-full mt-static-md lg:mt-static-lg">
            <BleedRight className="relative w-full h-auto">
              <div className="crm-hero-showcase relative w-full rounded-l-2xl lg:rounded-l-[24px] rounded-r-none border border-[var(--color-border-Strokes-default)] border-r-0 bg-[var(--color-surface-BG-1)] shadow-elevation-3 overflow-hidden p-0">
                <img
                  src={asset("/Files/Go_CRM/CRM_Hero.png")}
                  alt="GO CRM Interface Pipeline Preview"
                  loading="eager"
                  className="w-full h-auto block rounded-l-2xl lg:rounded-l-[24px] rounded-r-none"
                />
              </div>
            </BleedRight>
          </div>

        </div>
      </section>
    </div>
  );
}
