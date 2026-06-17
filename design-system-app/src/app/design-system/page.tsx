"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function DesignSystemPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [sandboxBg, setSandboxBg] = useState("bg-[var(--color-surface-BG-base)]");
  const [sandboxTextColor, setSandboxTextColor] = useState("text-[var(--color-text-primary)]");
  const [previewFont, setPreviewFont] = useState("dmsans");
  const [previewSecondaryFont, setPreviewSecondaryFont] = useState("dmsans");
  
  // Spacing States
  const [activeInternalGap, setActiveInternalGap] = useState("gap-2");
  const [activeMaxWidth, setActiveMaxWidth] = useState("max-w-section-md");
  const [activeSectionPadding, setActiveSectionPadding] = useState("py-section-md");
  const [activeFluidGap, setActiveFluidGap] = useState("gap-fluid-md");
  const [activePageGutter, setActivePageGutter] = useState("px-gutter-md");

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-fade-up", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.to(".breathing-card", {
        y: "-=0.5rem",
        yoyo: true,
        repeat: -1,
        duration: 4,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] transition-colors duration-500"
    >
      {/* BACKGROUND TEXTURE SIMULATION */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* THEME TOGGLE */}
      <div className="fixed top-6 right-6 z-50 animate-fade-up">
        <button 
          onClick={toggleTheme}
          className="organic-glass-panel px-4 py-2 flex items-center gap-2 hover:bg-[var(--color-surface-BG-1)] transition-colors"
        >
          <span className="text-[1.125rem]">{isDark ? '🌙' : '☀️'}</span>
          <span className="text-ui-label text-[var(--color-text-primary)] hidden sm:block">
            {isDark ? 'Dark Theme' : 'Light Theme'}
          </span>
        </button>
      </div>

      <div className="max-w-[87.5rem] mx-auto px-gutter-md py-24 relative z-10">
        
        {/* --- HEADER --- */}
        <header className="mb-24 text-center max-w-3xl mx-auto animate-fade-up">
          <p className="text-overline text-[var(--color-brand-orange)] mb-4">
            Premium Framework
          </p>
          <h1 className="text-display mb-6">Modern Design System</h1>
          <p className="text-subtitle text-[var(--color-text-muted)]">
            A visual reference for developers and AI agents. This page demonstrates the fusion of 
            premium artisanal coffee aesthetics with modern, tactile glassmorphism.
            <br/><br/>
            <strong>Currently exploring:</strong> {isDark ? 'Dark Theme (Dark)' : 'Light Theme (Light)'}
          </p>
        </header>

        {/* --- SECTION 1: COLOR PALETTE --- */}
        <section className="mb-32 animate-fade-up">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-h1">1. Complete Color Palette</h2>
            <div className="h-[0.0625rem] flex-1 bg-[var(--color-border-Strokes-default)]" />
          </div>

          <div className="mb-16">
            <h3 className="text-h3 text-[var(--color-text-primary)] mb-6">Brand Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <ColorCard name="brand-blue" variable="--color-brand-blue" hex={isDark ? "#35BBFD" : "#35BBFD"} colorClass="bg-[var(--color-brand-blue)]" textWhite={true} />
              <ColorCard name="brand-dark" variable="--color-brand-dark" hex={isDark ? "#2F3437" : "#2F3437"} colorClass="bg-[var(--color-brand-dark)]" textWhite={true} />
              <ColorCard name="brand-orange" variable="--color-brand-orange" hex={isDark ? "#F26023" : "#F26023"} colorClass="bg-[var(--color-brand-orange)]" textWhite={true} />
              <ColorCard name="brand-Logo-Main-color" variable="--color-brand-Logo-Main-color" hex={isDark ? "#FFFFFF" : "#626D72"} colorClass="bg-[var(--color-brand-Logo-Main-color)]" textWhite={true} />
              <ColorCard name="brand-Logo-Secondary-color" variable="--color-brand-Logo-Secondary-color" hex={isDark ? "#626D72" : "#626D72"} colorClass="bg-[var(--color-brand-Logo-Secondary-color)]" textWhite={true} />
            </div>
          </div>
          <div className="mb-16">
            <h3 className="text-h3 text-[var(--color-text-primary)] mb-6">Surface Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <ColorCard name="surface-BG-1" variable="--color-surface-BG-1" hex={isDark ? "#202122" : "#F7F7F7"} colorClass="bg-[var(--color-surface-BG-1)]" textWhite={false} />
              <ColorCard name="surface-BG-2" variable="--color-surface-BG-2" hex={isDark ? "#28292A" : "#EBECEC"} colorClass="bg-[var(--color-surface-BG-2)]" textWhite={false} />
              <ColorCard name="surface-BG-3" variable="--color-surface-BG-3" hex={isDark ? "#3D3E3F" : "#E7E8E9"} colorClass="bg-[var(--color-surface-BG-3)]" textWhite={false} />
              <ColorCard name="surface-BG-4" variable="--color-surface-BG-4" hex={isDark ? "#4A4C4F" : "#D1D5DB"} colorClass="bg-[var(--color-surface-BG-4)]" textWhite={false} />
              <ColorCard name="surface-BG-base" variable="--color-surface-BG-base" hex={isDark ? "#191A1A" : "#F2F2F2"} colorClass="bg-[var(--color-surface-BG-base)]" textWhite={false} />
              <ColorCard name="surface-BG-base-Opacity" variable="--color-surface-BG-base-Opacity" hex={isDark ? "#1E1F1F" : "#F5F5F5"} colorClass="bg-[var(--color-surface-BG-base-Opacity)]" textWhite={false} />
            </div>
          </div>
          <div className="mb-16">
            <h3 className="text-h3 text-[var(--color-text-primary)] mb-6">Text Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <ColorCard name="text-disabled" variable="--color-text-disabled" hex={isDark ? "#363E46" : "#D1D5DB"} colorClass="bg-[var(--color-text-disabled)]" textWhite={true} />
              <ColorCard name="text-hint" variable="--color-text-hint" hex={isDark ? "#8D9CAB" : "#6A767C"} colorClass="bg-[var(--color-text-hint)]" textWhite={true} />
              <ColorCard name="text-primary" variable="--color-text-primary" hex={isDark ? "#E8ECEF" : "#1A1E21"} colorClass="bg-[var(--color-text-primary)]" textWhite={true} />
              <ColorCard name="text-secondary" variable="--color-text-secondary" hex={isDark ? "#A3A5A8" : "#60707C"} colorClass="bg-[var(--color-text-secondary)]" textWhite={true} />
              <ColorCard name="text-muted" variable="--color-text-muted" hex={isDark ? "#6B6E71" : "#9AA5B1"} colorClass="bg-[var(--color-text-muted)]" textWhite={true} />
              <ColorCard name="text-primary-Reverted" variable="--color-text-primary-Reverted" hex={isDark ? "#1A1E21" : "#E8ECEF"} colorClass="bg-[var(--color-text-primary-Reverted)]" textWhite={true} />
              <ColorCard name="text-Blue-Vivid" variable="--color-text-Blue-Vivid" hex={isDark ? "#7DD3FC" : "#0297E3"} colorClass="bg-[var(--color-text-Blue-Vivid)]" textWhite={true} />
              <ColorCard name="text-White-100" variable="--color-text-White-100" hex={isDark ? "#FFFFFF" : "#FFFFFF"} colorClass="bg-[var(--color-text-White-100)]" textWhite={true} />
              <ColorCard name="text-Black-100" variable="--color-text-Black-100" hex={isDark ? "#1A1E21" : "#1A1E21"} colorClass="bg-[var(--color-text-Black-100)]" textWhite={true} />
            </div>
          </div>
          <div className="mb-16">
            <h3 className="text-h3 text-[var(--color-text-primary)] mb-6">Border Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <ColorCard name="border-Strokes-default" variable="--color-border-Strokes-default" hex={isDark ? "#383B3D" : "#E3E6E8"} colorClass="bg-[var(--color-border-Strokes-default)]" textWhite={true} />
              <ColorCard name="border-Strokes-Hover" variable="--color-border-Strokes-Hover" hex={isDark ? "#7D8C9B" : "#B5BDC5"} colorClass="bg-[var(--color-border-Strokes-Hover)]" textWhite={true} />
              <ColorCard name="border-Strokes-focus" variable="--color-border-Strokes-focus" hex={isDark ? "#35BBFD" : "#35BBFD"} colorClass="bg-[var(--color-border-Strokes-focus)]" textWhite={true} />
              <ColorCard name="border-Strokes-input" variable="--color-border-Strokes-input" hex={isDark ? "#383B3D" : "#D1D5DB"} colorClass="bg-[var(--color-border-Strokes-input)]" textWhite={true} />
              <ColorCard name="border-Strokes-input _ Hover" variable="--color-border-Strokes-input---Hover" hex={isDark ? "#5D6265" : "#A6AEBA"} colorClass="bg-[var(--color-border-Strokes-input---Hover)]" textWhite={true} />
              <ColorCard name="border-Strokes-strong" variable="--color-border-Strokes-strong" hex={isDark ? "#494C50" : "#AFB6C0"} colorClass="bg-[var(--color-border-Strokes-strong)]" textWhite={true} />
            </div>
          </div>
          <div className="mb-16">
            <h3 className="text-h3 text-[var(--color-text-primary)] mb-6">Action Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <ColorCard name="action-destructive" variable="--color-action-destructive" hex={isDark ? "#EF4444" : "#EF4444"} colorClass="bg-[var(--color-action-destructive)]" textWhite={true} />
              <ColorCard name="action-destructive-hover" variable="--color-action-destructive-hover" hex={isDark ? "#F87171" : "#DC2626"} colorClass="bg-[var(--color-action-destructive-hover)]" textWhite={true} />
              <ColorCard name="action-destructive-text" variable="--color-action-destructive-text" hex={isDark ? "#FFFFFF" : "#FFFFFF"} colorClass="bg-[var(--color-action-destructive-text)]" textWhite={true} />
              <ColorCard name="action-focus-ring" variable="--color-action-focus-ring" hex={isDark ? "#38BDF8" : "#38BDF8"} colorClass="bg-[var(--color-action-focus-ring)]" textWhite={true} />
              <ColorCard name="action-link" variable="--color-action-link" hex={isDark ? "#38BDF8" : "#35BBFD"} colorClass="bg-[var(--color-action-link)]" textWhite={true} />
              <ColorCard name="action-link-hover" variable="--color-action-link-hover" hex={isDark ? "#7DD3FC" : "#0284C7"} colorClass="bg-[var(--color-action-link-hover)]" textWhite={true} />
              <ColorCard name="action-primary-bg" variable="--color-action-primary-bg" hex={isDark ? "#49B4E9" : "#49B4E9"} colorClass="bg-[var(--color-action-primary-bg)]" textWhite={false} />
              <ColorCard name="action-primary-hover" variable="--color-action-primary-hover" hex={isDark ? "#35BBFD" : "#35BBFD"} colorClass="bg-[var(--color-action-primary-hover)]" textWhite={true} />
              <ColorCard name="action-primary-subtle-hover" variable="--color-action-primary-subtle-hover" hex={isDark ? "#232324" : "#FCFCFD"} colorClass="bg-[var(--color-action-primary-subtle-hover)]" textWhite={true} />
              <ColorCard name="action-Primary-Medium-hover" variable="--color-action-Primary-Medium-hover" hex={isDark ? "#262627" : "#F2F2F2"} colorClass="bg-[var(--color-action-Primary-Medium-hover)]" textWhite={true} />
              <ColorCard name="action-Primary-Strong-hover" variable="--color-action-Primary-Strong-hover" hex={isDark ? "#2D2D2E" : "#EAEBEB"} colorClass="bg-[var(--color-action-Primary-Strong-hover)]" textWhite={true} />
              <ColorCard name="action-primary-subtle-active" variable="--color-action-primary-subtle-active" hex={isDark ? "#2D2D2F" : "#E9EBEC"} colorClass="bg-[var(--color-action-primary-subtle-active)]" textWhite={true} />
              <ColorCard name="action-primary-text" variable="--color-action-primary-text" hex={isDark ? "#1A1E21" : "#FFFFFF"} colorClass="bg-[var(--color-action-primary-text)]" textWhite={true} />
              <ColorCard name="action-secondary-bg" variable="--color-action-secondary-bg" hex={isDark ? "#C6C6C8" : "#686B6C"} colorClass="bg-[var(--color-action-secondary-bg)]" textWhite={false} />
              <ColorCard name="action-secondary-Strong" variable="--color-action-secondary-Strong" hex={isDark ? "#C6C6C8" : "#2D2D2E"} colorClass="bg-[var(--color-action-secondary-Strong)]" textWhite={true} />
              <ColorCard name="action-secondary-hover" variable="--color-action-secondary-hover" hex={isDark ? "#D0D0D2" : "#D8D8D8"} colorClass="bg-[var(--color-action-secondary-hover)]" textWhite={true} />
              <ColorCard name="action-secondary-text" variable="--color-action-secondary-text" hex={isDark ? "#1A1E21" : "#1A1E21"} colorClass="bg-[var(--color-action-secondary-text)]" textWhite={true} />
            </div>
          </div>
          <div className="mb-16">
            <h3 className="text-h3 text-[var(--color-text-primary)] mb-6">Accent Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <ColorCard name="accent-border" variable="--color-accent-border" hex={isDark ? "#EA580C" : "#FB923C"} colorClass="bg-[var(--color-accent-border)]" textWhite={true} />
              <ColorCard name="accent-main" variable="--color-accent-main" hex={isDark ? "#F26023" : "#F26023"} colorClass="bg-[var(--color-accent-main)]" textWhite={true} />
              <ColorCard name="accent-surface-muted" variable="--color-accent-surface-muted" hex={isDark ? "#FB923C" : "#FB923C"} colorClass="bg-[var(--color-accent-surface-muted)]" textWhite={false} />
              <ColorCard name="accent-surface-strong" variable="--color-accent-surface-strong" hex={isDark ? "#FB923C" : "#FB923C"} colorClass="bg-[var(--color-accent-surface-strong)]" textWhite={false} />
              <ColorCard name="accent-surface-subtle" variable="--color-accent-surface-subtle" hex={isDark ? "#7C2D12" : "#FFF7ED"} colorClass="bg-[var(--color-accent-surface-subtle)]" textWhite={false} />
              <ColorCard name="accent-text-muted" variable="--color-accent-text-muted" hex={isDark ? "#F68950" : "#EA580C"} colorClass="bg-[var(--color-accent-text-muted)]" textWhite={true} />
              <ColorCard name="accent-text-strong" variable="--color-accent-text-strong" hex={isDark ? "#FFEDD5" : "#7C2D12"} colorClass="bg-[var(--color-accent-text-strong)]" textWhite={true} />
            </div>
          </div>
          <div className="mb-16">
            <h3 className="text-h3 text-[var(--color-text-primary)] mb-6">Status Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <ColorCard name="status-amber-border" variable="--color-status-amber-border" hex={isDark ? "#F59E0B" : "#FBBF24"} colorClass="bg-[var(--color-status-amber-border)]" textWhite={true} />
              <ColorCard name="status-amber-main" variable="--color-status-amber-main" hex={isDark ? "#FBBF24" : "#FBBF24"} colorClass="bg-[var(--color-status-amber-main)]" textWhite={true} />
              <ColorCard name="status-amber-surface-muted" variable="--color-status-amber-surface-muted" hex={isDark ? "#FCD87B" : "#FDE095"} colorClass="bg-[var(--color-status-amber-surface-muted)]" textWhite={false} />
              <ColorCard name="status-amber-surface-strong" variable="--color-status-amber-surface-strong" hex={isDark ? "#FDE68A" : "#FDE68A"} colorClass="bg-[var(--color-status-amber-surface-strong)]" textWhite={false} />
              <ColorCard name="status-amber-surface-subtle" variable="--color-status-amber-surface-subtle" hex={isDark ? "#78350F" : "#FFFBEB"} colorClass="bg-[var(--color-status-amber-surface-subtle)]" textWhite={false} />
              <ColorCard name="status-amber-text-Medium" variable="--color-status-amber-text-Medium" hex={isDark ? "#FBBF24" : "#B48303"} colorClass="bg-[var(--color-status-amber-text-Medium)]" textWhite={true} />
              <ColorCard name="status-amber-text-strong" variable="--color-status-amber-text-strong" hex={isDark ? "#B45309" : "#B45309"} colorClass="bg-[var(--color-status-amber-text-strong)]" textWhite={true} />
              <ColorCard name="status-blue-border" variable="--color-status-blue-border" hex={isDark ? "#35BBFD" : "#38BDF8"} colorClass="bg-[var(--color-status-blue-border)]" textWhite={true} />
              <ColorCard name="status-blue-main" variable="--color-status-blue-main" hex={isDark ? "#38BDF8" : "#38BDF8"} colorClass="bg-[var(--color-status-blue-main)]" textWhite={true} />
              <ColorCard name="status-blue-surface-muted" variable="--color-status-blue-surface-muted" hex={isDark ? "#38BDF8" : "#38BDF8"} colorClass="bg-[var(--color-status-blue-surface-muted)]" textWhite={false} />
              <ColorCard name="status-blue-surface-strong" variable="--color-status-blue-surface-strong" hex={isDark ? "#0369A1" : "#B9E6FE"} colorClass="bg-[var(--color-status-blue-surface-strong)]" textWhite={false} />
              <ColorCard name="status-blue-surface-subtle" variable="--color-status-blue-surface-subtle" hex={isDark ? "#0C4A6E" : "#F0F9FF"} colorClass="bg-[var(--color-status-blue-surface-subtle)]" textWhite={false} />
              <ColorCard name="status-blue-text-Medium" variable="--color-status-blue-text-Medium" hex={isDark ? "#21B2FD" : "#0284C7"} colorClass="bg-[var(--color-status-blue-text-Medium)]" textWhite={true} />
              <ColorCard name="status-blue-text-strong" variable="--color-status-blue-text-strong" hex={isDark ? "#0C4A6E" : "#0C4A6E"} colorClass="bg-[var(--color-status-blue-text-strong)]" textWhite={true} />
              <ColorCard name="status-green-border" variable="--color-status-green-border" hex={isDark ? "#67E595" : "#4ADE80"} colorClass="bg-[var(--color-status-green-border)]" textWhite={true} />
              <ColorCard name="status-green-main" variable="--color-status-green-main" hex={isDark ? "#4ADE80" : "#4ADE80"} colorClass="bg-[var(--color-status-green-main)]" textWhite={true} />
              <ColorCard name="status-green-surface-muted" variable="--color-status-green-surface-muted" hex={isDark ? "#49DD7F" : "#4ADE80"} colorClass="bg-[var(--color-status-green-surface-muted)]" textWhite={false} />
              <ColorCard name="status-green-surface-strong" variable="--color-status-green-surface-strong" hex={isDark ? "#15803D" : "#BBF7D0"} colorClass="bg-[var(--color-status-green-surface-strong)]" textWhite={false} />
              <ColorCard name="status-green-surface-subtle" variable="--color-status-green-surface-subtle" hex={isDark ? "#14532D" : "#F0FDF4"} colorClass="bg-[var(--color-status-green-surface-subtle)]" textWhite={false} />
              <ColorCard name="status-green-text-Medium" variable="--color-status-green-text-Medium" hex={isDark ? "#39E478" : "#16A34A"} colorClass="bg-[var(--color-status-green-text-Medium)]" textWhite={true} />
              <ColorCard name="status-green-text-strong" variable="--color-status-green-text-strong" hex={isDark ? "#14532D" : "#14532D"} colorClass="bg-[var(--color-status-green-text-strong)]" textWhite={true} />
              <ColorCard name="status-purple-border" variable="--color-status-purple-border" hex={isDark ? "#8B5CF6" : "#A78BFA"} colorClass="bg-[var(--color-status-purple-border)]" textWhite={true} />
              <ColorCard name="status-purple-main" variable="--color-status-purple-main" hex={isDark ? "#A78BFA" : "#A78BFA"} colorClass="bg-[var(--color-status-purple-main)]" textWhite={true} />
              <ColorCard name="status-purple-surface-muted" variable="--color-status-purple-surface-muted" hex={isDark ? "#CBBBFC" : "#A78BFA"} colorClass="bg-[var(--color-status-purple-surface-muted)]" textWhite={false} />
              <ColorCard name="status-purple-surface-strong" variable="--color-status-purple-surface-strong" hex={isDark ? "#6D28D9" : "#DDD6FE"} colorClass="bg-[var(--color-status-purple-surface-strong)]" textWhite={false} />
              <ColorCard name="status-purple-surface-subtle" variable="--color-status-purple-surface-subtle" hex={isDark ? "#4C1D95" : "#F5F3FF"} colorClass="bg-[var(--color-status-purple-surface-subtle)]" textWhite={false} />
              <ColorCard name="status-purple-text-Medium" variable="--color-status-purple-text-Medium" hex={isDark ? "#A87CF3" : "#7C3AED"} colorClass="bg-[var(--color-status-purple-text-Medium)]" textWhite={true} />
              <ColorCard name="status-purple-text-strong" variable="--color-status-purple-text-strong" hex={isDark ? "#4C1D95" : "#4C1D95"} colorClass="bg-[var(--color-status-purple-text-strong)]" textWhite={true} />
              <ColorCard name="status-red-border" variable="--color-status-red-border" hex={isDark ? "#EF4444" : "#F87171"} colorClass="bg-[var(--color-status-red-border)]" textWhite={true} />
              <ColorCard name="status-red-main" variable="--color-status-red-main" hex={isDark ? "#F87171" : "#F87171"} colorClass="bg-[var(--color-status-red-main)]" textWhite={true} />
              <ColorCard name="status-red-surface-muted" variable="--color-status-red-surface-muted" hex={isDark ? "#FF4A4A" : "#F87171"} colorClass="bg-[var(--color-status-red-surface-muted)]" textWhite={false} />
              <ColorCard name="status-red-surface-strong" variable="--color-status-red-surface-strong" hex={isDark ? "#B91C1C" : "#FECACA"} colorClass="bg-[var(--color-status-red-surface-strong)]" textWhite={false} />
              <ColorCard name="status-red-surface-subtle" variable="--color-status-red-surface-subtle" hex={isDark ? "#7F1D1D" : "#FEF2F2"} colorClass="bg-[var(--color-status-red-surface-subtle)]" textWhite={false} />
              <ColorCard name="status-red-text-Medium" variable="--color-status-red-text-Medium" hex={isDark ? "#EF5D5D" : "#DC2626"} colorClass="bg-[var(--color-status-red-text-Medium)]" textWhite={true} />
              <ColorCard name="status-red-text-strong" variable="--color-status-red-text-strong" hex={isDark ? "#7F1D1D" : "#7F1D1D"} colorClass="bg-[var(--color-status-red-text-strong)]" textWhite={true} />
            </div>
          </div>
          <div className="mb-16">
            <h3 className="text-h3 text-[var(--color-text-primary)] mb-6">Overlay Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <ColorCard name="overlay-backdrop" variable="--color-overlay-backdrop" hex={isDark ? "#000000" : "#000000"} colorClass="bg-[var(--color-overlay-backdrop)]" textWhite={true} />
              <ColorCard name="overlay-tooltip-bg" variable="--color-overlay-tooltip-bg" hex={isDark ? "#434C56" : "#1A1E21"} colorClass="bg-[var(--color-overlay-tooltip-bg)]" textWhite={false} />
            </div>
          </div>

        </section>

        {/* --- SECTION 2: SEMANTIC TEXT COLORS --- */}
        <section className="mb-32 animate-fade-up">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-h1">2. Semantic Text Colors</h2>
            <div className="h-[0.0625rem] flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            <ColorCard name="Primary" variable="text-[var(--color-text-primary)]" hex="Dynamic" colorClass="bg-[var(--color-text-primary)]" textWhite={isDark ? false : true} />
            <ColorCard name="Secondary" variable="text-[var(--color-text-secondary)]" hex="Dynamic" colorClass="bg-[var(--color-text-primary)]-secondary" textWhite={isDark ? false : true} />
            <ColorCard name="Tertiary" variable="text-[var(--color-text-muted)]" hex="Dynamic" colorClass="bg-[var(--color-text-primary)]-tertiary" textWhite />
            <ColorCard name="Muted" variable="text-[var(--color-text-muted)]" hex="Dynamic" colorClass="bg-muted" textWhite />
            <ColorCard name="Accent" variable="text-[var(--color-brand-orange)]" hex="Dynamic" colorClass="bg-[var(--color-brand-orange)]" textWhite />
            <ColorCard name="Inverse" variable="text-[var(--color-text-primary-Reverted)]" hex="Dynamic" colorClass="bg-[var(--color-surface-BG-base)]" textWhite={isDark ? true : false} />
          </div>

          <div className="organic-glass-panel p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 pb-8 border-b border-[var(--color-border-Strokes-default)]/50">
              <div className="max-w-md">
                <h3 className="text-h3 text-[var(--color-text-primary)] mb-2">Typography Sandbox</h3>
                <p className="text-body-sm text-[var(--color-text-muted)]">
                  Test how our semantic text tokens adapt to different backgrounds.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col gap-3">
                  <span className="text-ui-label text-[var(--color-text-muted)]">1. Select Text Color</span>
                  <div className="flex flex-wrap items-center gap-2 max-w-[15.625rem]">
                    {[
                      { id: "text-[var(--color-text-primary)]", label: "Primary" },
                      { id: "text-[var(--color-text-secondary)]", label: "Secondary" },
                      { id: "text-[var(--color-text-muted)]", label: "Muted" },
                      { id: "text-[var(--color-text-hint)]", label: "Hint" },
                      { id: "text-[var(--color-brand-orange)]", label: "Brand Orange" },
                      { id: "text-[var(--color-brand-blue)]", label: "Brand Blue" },
                      { id: "text-[var(--color-text-primary-Reverted)]", label: "Inverse" }
                    ].map((tc) => (
                      <button 
                        key={tc.id}
                        onClick={() => setSandboxTextColor(tc.id)}
                        className={`px-3 py-1 rounded-full text-caption font-medium transition-all border ${sandboxTextColor === tc.id ? 'bg-[var(--color-text-primary)] text-[var(--color-text-primary-Reverted)] border-foreground shadow-md' : 'bg-transparent text-[var(--color-text-primary)] border-[var(--color-border-Strokes-default)] hover:bg-[var(--color-surface-BG-1)]'}`}
                      >
                        {tc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-ui-label text-[var(--color-text-muted)]">2. Select Background</span>
                  <div className="flex items-center gap-3">
                    {["bg-[var(--color-surface-BG-base)]", "bg-[var(--color-surface-BG-1)]", "bg-[var(--color-surface-BG-2)]", "bg-[var(--color-surface-BG-3)]", "bg-[var(--color-brand-dark)]", "bg-[var(--color-brand-orange)]"].map(bg => (
                      <button 
                        key={bg}
                        onClick={() => setSandboxBg(bg)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${sandboxBg === bg ? "border-[var(--color-brand-orange)] scale-110" : "border-[var(--color-border-Strokes-default)]/30 hover:scale-105"} ${bg}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-10 md:p-16 rounded-3xl transition-colors duration-500 ${sandboxBg} ${['bg-[var(--color-surface-BG-2)]', 'bg-[var(--color-surface-BG-3)]'].includes(sandboxBg) ? 'dark shadow-2xl' : 'shadow-sm border border-[var(--color-border-Strokes-default)]/50'}`}>
              <div className="max-w-3xl mx-auto flex flex-col gap-8 items-start">
                <div className="inline-block px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full mb-2">
                  <span className="text-caption font-mono opacity-60">Applied class: {sandboxTextColor}</span>
                </div>
                <h4 className={`text-display-sm leading-[1.1] transition-colors duration-300 ${sandboxTextColor}`}>
                  The true cost of <span className="italic font-light text-[var(--color-brand-orange)]">Craftsmanship</span>
                </h4>
                <p className={`text-h4 leading-snug transition-colors duration-300 ${sandboxTextColor}`}>
                  When you hold a cup of SalentoCoffee, you are not just holding a beverage. You are holding three generations of relentless dedication to the earth.
                </p>
                <p className={`text-body leading-relaxed max-w-2xl transition-colors duration-300 ${sandboxTextColor}`}>
                  Our beans are carefully hand-picked by local farmers who have dedicated their lives to perfecting the art of the harvest. We believe in sustainable practices that honor both the mountain and the cup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: TYPOGRAPHY --- */}
        <section className="mb-32 relative">
          <div className="sticky top-0 z-40 bg-[var(--color-surface-BG-base)]/90 backdrop-blur-xl pt-6 pb-4 mb-10 border-b border-[var(--color-border-Strokes-default)] flex flex-col md:flex-row md:items-end justify-between gap-6 transition-colors duration-500">
            <div>
              <h2 className="text-h1 mb-2">3. Cognitive Typography</h2>
              <p className="text-body-sm text-[var(--color-text-muted)] max-w-lg">
                Preview our premium serif and display fonts.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 shrink-0">
            </div>
          </div>

          
          
          
          <div className="organic-glass-panel p-8 md:p-12 flex flex-col gap-12">
            {[
              { token: ".text-display-xl", name: "Display XL", text: "GO AMS Portal", details: `Size: clamp(3.5rem, 6vw, 6rem)
Weight: 700
Line-height: 1.1` },
              { token: ".text-display-lg", name: "Display LG", text: "Agent Dashboard", details: `Size: clamp(3rem, 5vw, 4.5rem)
Weight: 700
Line-height: 1.1` },
              { token: ".text-display", name: "Display", text: "Sales Performance", details: `Size: clamp(2.5rem, 4vw, 3.5rem)
Weight: 700
Line-height: 1.15` },
              { token: ".text-display-sm", name: "Display SM", text: "Client Portfolio", details: `Size: clamp(2rem, 3vw, 2.5rem)
Weight: 700
Line-height: 1.2` },
              { token: ".text-h1", name: "H1 Section", text: "Commission Tracking", details: `Size: clamp(1.75rem, 2.5vw, 2.25rem)
Weight: 700
Line-height: 1.2` },
              { token: ".text-h2", name: "H2 Sub-section", text: "Active Policies", details: `Size: clamp(1.5rem, 2vw, 1.875rem)
Weight: 600
Line-height: 1.3` },
              { token: ".text-h3", name: "H3 Card", text: "Lead Generation", details: `Size: clamp(1.25rem, 1.5vw, 1.5rem)
Weight: 600
Line-height: 1.3` },
              { token: ".text-h4", name: "H4 Subtitle", text: "Monthly Targets", details: `Size: clamp(1.125rem, 1.25vw, 1.25rem)
Weight: 600
Line-height: 1.4` },
              { token: ".text-h5", name: "H5 Small", text: "Approved", details: `Size: 1.125rem
Weight: 500
Line-height: 1.5` },
              { token: ".text-h6", name: "H6 Micro", text: "Policy ID #4092", details: `Size: 1rem
Weight: 500
Line-height: 1.5` }
            ].map(item => (
              <TypeRow key={item.token} {...item} font={previewFont} overrideFont={previewFont} />
            ))}
            <TypeRow token=".text-overline" name="Overline" font={previewSecondaryFont} text="AGENT OVERVIEW" overrideFont={previewSecondaryFont} details={`Size: 0.875rem
Weight: 600
Tracking: 0.1em`} />
            <TypeRow token=".text-subtitle" name="Subtitle" font={previewSecondaryFont} text="Manage your insurance portfolio, track daily sales metrics, and connect with your high-value clients." overrideFont={previewSecondaryFont} details={`Size: clamp(1.125rem, 2vw, 1.5rem)
Weight: 400
Line-height: 1.5`} />
            <TypeRow token=".text-body-2xl" name="Body 2XL" font={previewSecondaryFont} text="Your sales performance this quarter has exceeded targets by 15%, maintaining a strong retention rate across all premium insurance packages." overrideFont={previewSecondaryFont} details={`Size: 1.5rem
Weight: 400
Line-height: 1.5`} />
            <TypeRow token=".text-body-2xl-light" name="Body 2XL Light" font={previewSecondaryFont} text="Review the latest policy updates and ensure all client documentation is properly submitted for final underwriting approval." overrideFont={previewSecondaryFont} details={`Size: 1.5rem
Weight: 200
Line-height: 1.5`} />
            <TypeRow token=".text-body-xl" name="Body XL" font={previewSecondaryFont} text="Please review the attached life insurance policy details before sending the digital signature request to the client." overrideFont={previewSecondaryFont} details={`Size: 1.25rem
Weight: 400
Line-height: 1.5`} />
            <TypeRow token=".text-body-lg" name="Body LG" font={previewSecondaryFont} text="The dashboard provides a real-time overview of your active health and auto policies, including pending renewals." overrideFont={previewSecondaryFont} details={`Size: 1.125rem
Weight: 400
Line-height: 1.6`} />
            <TypeRow token=".text-body-lg-light" name="Body LG Light" font={previewSecondaryFont} text="Agent commissions are automatically calculated at the end of each billing cycle based on successfully bound policies." overrideFont={previewSecondaryFont} details={`Size: 1.125rem
Weight: 200
Line-height: 1.6`} />
            <TypeRow token=".text-body-md" name="Body MD" font={previewSecondaryFont} text="Select a specific agent from the directory to view their historical conversion rates and overall client satisfaction scores." overrideFont={previewSecondaryFont} details={`Size: 1rem
Weight: 400
Line-height: 1.6`} />
            <TypeRow token=".text-body" name="Body" font={previewSecondaryFont} text="The GO AMS platform centralizes all lead management, allowing agents to instantly follow up on new quote requests and process applications." overrideFont={previewSecondaryFont} details={`Size: 1rem
Weight: 400
Line-height: 1.6`} />
            <TypeRow token=".text-body-light" name="Body Light" font={previewSecondaryFont} text="Ensure that the beneficiary information is accurate and fully verified before submitting the final contract." overrideFont={previewSecondaryFont} details={`Size: 1rem
Weight: 200
Line-height: 1.6`} />
            <TypeRow token=".text-body-sm" name="Body SM" font={previewSecondaryFont} text="This policy requires an additional medical examination before the underwriting department can issue a final approval." overrideFont={previewSecondaryFont} details={`Size: 0.875rem
Weight: 400
Line-height: 1.6`} />
            <TypeRow token=".text-body-sm-light" name="Body SM Light" font={previewSecondaryFont} text="The premium calculation includes a standard multi-policy discount applied to the client’s home and auto bundle." overrideFont={previewSecondaryFont} details={`Size: 0.875rem
Weight: 200
Line-height: 1.6`} />
            <TypeRow token=".text-body-xs" name="Body XS" font={previewSecondaryFont} text="Terms and conditions apply. Policy cancellation requires a 30-day prior written notice." overrideFont={previewSecondaryFont} details={`Size: 0.75rem
Weight: 400
Line-height: 1.6`} />
            <TypeRow token=".text-ui-label" name="UI Label" font={previewSecondaryFont} text="Generate Quote" overrideFont={previewSecondaryFont} details={`Size: 0.875rem
Weight: 500
Tracking: 0.05em`} />
            <TypeRow token=".text-data" name="Data" font="geist-mono" text="$14,500.00 YTD" details={`Size: 1rem
Font: Monospace`} />
            <TypeRow token=".text-caption" name="Caption" font={previewSecondaryFont} text="Last updated today at 14:30 EST. Secured via 256-bit encryption." overrideFont={previewSecondaryFont} details={`Size: 0.75rem
Weight: 400
Line-height: 1.5`} />
          </div>



        </section>

        {/* --- SECTION 4: SPACING & RHYTHM STUDIO --- */}
        <section className="mb-32 animate-fade-up">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-h1">4. Spacing & Rhythm Studio</h2>
            <div className="h-[0.0625rem] flex-1 bg-border" />
          </div>

          {/* Spacing Overview (Restored 3 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            <SpacingCard 
              label="1. Component Internal" 
              token={activeInternalGap}
              value={activeInternalGap === 'gap-1' ? '0.25rem' : activeInternalGap === 'gap-2' ? '0.5rem' : activeInternalGap === 'gap-4' ? '1rem' : '1.5rem'} 
              usage="Densidad interna de botones y tarjetas."
              options={['gap-1', 'gap-2', 'gap-4', 'gap-6']}
              activeOption={activeInternalGap}
              onOptionChange={setActiveInternalGap}
              visual={
                <div className={`flex flex-col ${activeInternalGap} p-4 bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] rounded-xl w-full transition-all duration-300`}>
                  <div className={`flex ${activeInternalGap} items-center`}>
                    <div className="w-4 h-4 bg-[var(--color-brand-orange)] rounded-full shrink-0"></div>
                    <div className="h-2 w-16 bg-muted/30 rounded shrink-0"></div>
                  </div>
                  <div className="h-3 w-full bg-muted/20 rounded"></div>
                </div>
              }
            />
            <SpacingCard 
              label="2. Layout Fluid Gaps" 
              token={activeFluidGap} 
              value={activeFluidGap === 'gap-fluid-xs' ? '0.5rem — 1.5rem' : activeFluidGap === 'gap-fluid-sm' ? '1rem — 2.5rem' : activeFluidGap === 'gap-fluid-md' ? '2rem — 5rem' : '3rem — 8rem'}
              usage="Espacio dinámico entre columnas de layout."
              options={['gap-fluid-xs', 'gap-fluid-sm', 'gap-fluid-md', 'gap-fluid-lg']}
              activeOption={activeFluidGap}
              onOptionChange={setActiveFluidGap}
              visual={
                <div className={`flex ${activeFluidGap} p-2 w-full h-20 items-stretch transition-all duration-300`}>
                  <div className="flex-1 bg-[var(--color-surface-BG-3)]/10 border border-dashed border-salento-moss/30 rounded-lg"></div>
                  <div className="flex-1 bg-[var(--color-surface-BG-3)]/10 border border-dashed border-salento-moss/30 rounded-lg"></div>
                </div>
              }
            />
            <SpacingCard 
              label="3. Section Padding" 
              token={activeSectionPadding}
              value={activeSectionPadding === 'py-section-xs' ? '2rem — 4rem' : activeSectionPadding === 'py-section-sm' ? '4rem — 6rem' : activeSectionPadding === 'py-section-md' ? '6rem — 10rem' : '8rem — 15rem'}
              usage="El ritmo vertical entre grandes bloques."
              options={['py-section-xs', 'py-section-sm', 'py-section-md', 'py-section-lg']}
              activeOption={activeSectionPadding}
              onOptionChange={setActiveSectionPadding}
              visual={
                <div className="flex flex-col w-full border border-dashed border-salento-mocha/30 rounded-lg overflow-hidden transition-all duration-300">
                  <div className={`${activeSectionPadding === 'py-section-xs' ? 'h-2' : activeSectionPadding === 'py-section-sm' ? 'h-4' : activeSectionPadding === 'py-section-md' ? 'h-8' : 'h-12'} bg-[var(--color-surface-BG-2)]/10 border-b border-dashed border-salento-mocha/20 transition-all`}></div>
                  <div className="h-12 flex items-center justify-center text-[0.625rem] text-[var(--color-text-muted)] uppercase">Contenido</div>
                  <div className={`${activeSectionPadding === 'py-section-xs' ? 'h-2' : activeSectionPadding === 'py-section-sm' ? 'h-4' : activeSectionPadding === 'py-section-md' ? 'h-8' : 'h-12'} bg-[var(--color-surface-BG-2)]/10 border-t border-dashed border-salento-mocha/20 transition-all`}></div>
                </div>
              }
            />
          </div>

          <div className="border border-dashed border-[var(--color-brand-orange)]/50 rounded-3xl p-6 md:p-12 bg-[var(--color-brand-orange)]/5 relative overflow-hidden flex flex-col gap-20">
            <div className="absolute top-4 left-4 text-[var(--color-brand-orange)] font-mono text-[0.625rem] uppercase tracking-widest font-bold">
              Architectural Playground v2.0
            </div>
            
            <div className="mt-8">
              <h4 className="text-h3 mb-4">Live Studio</h4>
              <p className="text-body text-[var(--color-text-muted)] mb-12 max-w-2xl">
                Controla y visualiza la estructura de SalentoCoffee en tiempo real.
              </p>

              <div className="flex flex-col gap-20">
                {/* 01: Gutters */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h5 className="text-h5 text-[var(--color-text-primary)] flex items-center gap-3">
                      <span className="w-6 h-6 bg-[var(--color-text-primary)] text-[var(--color-text-primary-Reverted)] rounded-full flex items-center justify-center text-[0.625rem]">01</span>
                      Page Frame Strategy
                    </h5>
                    <div className="flex gap-1 bg-[var(--color-surface-BG-1)] p-1 rounded-xl w-fit shadow-sm">
                      {['px-gutter-sm', 'px-gutter-md', 'px-gutter-lg', 'px-gutter-xl'].map(opt => (
                        <button key={opt} onClick={() => setActivePageGutter(opt)} className={`px-3 py-1 rounded-lg text-[0.625rem] font-bold uppercase transition-all ${activePageGutter === opt ? 'bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}>
                          {opt.replace('px-gutter-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="w-full bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] rounded-2xl relative h-48 overflow-hidden flex items-center justify-center shadow-xl transition-all duration-500">
                    <div className="absolute inset-y-0 left-0 bg-salento-terracotta/10 border-r border-dashed border-salento-terracotta/30 flex items-center justify-center transition-all duration-500" style={{ width: `var(--space-gutter-${activePageGutter.replace('px-gutter-', '')})` }}>
                      <span className="text-[0.625rem] font-mono text-[var(--color-brand-orange)] rotate-90 whitespace-nowrap">{activePageGutter}</span>
                    </div>
                    <div className="absolute inset-y-0 right-0 bg-salento-terracotta/10 border-l border-dashed border-salento-terracotta/30 flex items-center justify-center transition-all duration-500" style={{ width: `var(--space-gutter-${activePageGutter.replace('px-gutter-', '')})` }}>
                      <span className="text-[0.625rem] font-mono text-[var(--color-brand-orange)] rotate-90 whitespace-nowrap">{activePageGutter}</span>
                    </div>
                    <div className="text-ui-label text-[var(--color-text-muted)] uppercase tracking-widest">Main Layout Area (87.5rem)</div>
                  </div>
                </div>

                {/* 02: Section Padding */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h5 className="text-h5 text-[var(--color-text-primary)] flex items-center gap-3">
                      <span className="w-6 h-6 bg-[var(--color-text-primary)] text-[var(--color-text-primary-Reverted)] rounded-full flex items-center justify-center text-[0.625rem]">02</span>
                      Vertical Section Rhythm
                    </h5>
                    <div className="flex gap-1 bg-[var(--color-surface-BG-1)] p-1 rounded-xl w-fit shadow-sm">
                      {['py-section-xs', 'py-section-sm', 'py-section-md', 'py-section-lg'].map(opt => (
                        <button key={opt} onClick={() => setActiveSectionPadding(opt)} className={`px-3 py-1 rounded-lg text-[0.625rem] font-bold uppercase transition-all ${activeSectionPadding === opt ? 'bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}>
                          {opt.replace('py-section-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] rounded-2xl overflow-hidden shadow-xl transition-all duration-500">
                    <div className="bg-[var(--color-surface-BG-2)]/10 border-b border-dashed border-salento-mocha/30 flex items-center justify-center transition-all duration-500" style={{ height: `var(--space-section-${activeSectionPadding.replace('py-section-', '')})` }}>
                      <span className="text-[0.625rem] font-mono text-salento-mocha uppercase font-bold">{activeSectionPadding}</span>
                    </div>
                    <div className="py-16 text-center text-body text-[var(--color-text-muted)] uppercase tracking-[0.5em] opacity-30">Website Content Block</div>
                    <div className="bg-[var(--color-surface-BG-2)]/10 border-t border-dashed border-salento-mocha/30 flex items-center justify-center transition-all duration-500" style={{ height: `var(--space-section-${activeSectionPadding.replace('py-section-', '')})` }}>
                      <span className="text-[0.625rem] font-mono text-salento-mocha uppercase font-bold">{activeSectionPadding}</span>
                    </div>
                  </div>
                </div>

                {/* 03: Fluid Gaps */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h5 className="text-h5 text-[var(--color-text-primary)] flex items-center gap-3">
                      <span className="w-6 h-6 bg-[var(--color-text-primary)] text-[var(--color-text-primary-Reverted)] rounded-full flex items-center justify-center text-[0.625rem]">03</span>
                      Column Separation
                    </h5>
                    <div className="flex gap-1 bg-[var(--color-surface-BG-1)] p-1 rounded-xl w-fit shadow-sm">
                      {['gap-fluid-xs', 'gap-fluid-sm', 'gap-fluid-md', 'gap-fluid-lg'].map(opt => (
                        <button key={opt} onClick={() => setActiveFluidGap(opt)} className={`px-3 py-1 rounded-lg text-[0.625rem] font-bold uppercase transition-all ${activeFluidGap === opt ? 'bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}>
                          {opt.replace('gap-fluid-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={`flex ${activeFluidGap} p-8 border border-dashed border-salento-moss/30 bg-[var(--color-surface-BG-3)]/5 rounded-2xl relative min-h-[18rem] transition-all duration-500 items-stretch`}>
                    <div className="flex-1 bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] shadow-md rounded-xl flex items-center justify-center">
                      <span className="text-caption text-[var(--color-text-muted)] font-mono uppercase">Column A</span>
                    </div>
                    <div className="flex-1 bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] shadow-md rounded-xl flex items-center justify-center relative">
                      <span className="text-caption text-[var(--color-text-muted)] font-mono uppercase">Column B</span>
                      <div className="absolute -left-[calc(var(--space-fluid-md)/2)] top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-surface-BG-3)] text-[var(--color-text-primary-Reverted)] px-4 py-1.5 rounded-full text-[0.625rem] font-mono z-20 whitespace-nowrap shadow-lg font-bold">
                        {activeFluidGap}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 04: Micro Gaps */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h5 className="text-h5 text-[var(--color-text-primary)] flex items-center gap-3">
                      <span className="w-6 h-6 bg-[var(--color-text-primary)] text-[var(--color-text-primary-Reverted)] rounded-full flex items-center justify-center text-[0.625rem]">04</span>
                      Micro-Spacing
                    </h5>
                    <div className="flex gap-1 bg-[var(--color-surface-BG-1)] p-1 rounded-xl w-fit shadow-sm">
                      {['gap-1', 'gap-2', 'gap-4', 'gap-6'].map(opt => (
                        <button key={opt} onClick={() => setActiveInternalGap(opt)} className={`px-3 py-1 rounded-lg text-[0.625rem] font-bold uppercase transition-all ${activeInternalGap === opt ? 'bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}>
                          {opt.replace('gap-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={`organic-glass-panel p-8 flex flex-col ${activeInternalGap} transition-all duration-300 shadow-xl max-w-md`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-salento-terracotta/20 flex items-center justify-center text-[var(--color-brand-orange)] font-bold italic">S</div>
                      <div className="flex flex-col gap-1">
                        <div className="h-3 w-24 bg-[var(--color-text-primary)]/80 rounded"></div>
                        <div className="h-2 w-16 bg-muted/40 rounded"></div>
                      </div>
                    </div>
                    <p className="text-body-sm text-[var(--color-text-muted)]">Demostración del token <strong>{activeInternalGap}</strong>.</p>
                    <button className="btn-secondary w-full py-2">Test</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 5: INTERACTIVE & GLASS --- */}
        <section className="mb-32 animate-fade-up">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-h1">5. Interactive & Glass</h2>
            <div className="h-[0.0625rem] flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-2">
              <h3 className="text-h3">Action Buttons</h3>
              <p className="text-body-sm text-[var(--color-text-muted)] mb-6">Awwwards Kinetic Architecture.</p>
              <div className="relative rounded-3xl overflow-hidden py-12 px-6 bg-transparent border border-[var(--color-border-Strokes-default)] flex flex-col justify-center items-center gap-8 min-h-[25rem] bg-repeat" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"2\" cy=\"2\" r=\"2\"/%3E%3C/g%3E%3C/svg%3E')"}}>
                
                {/* Awwwards Liquid Reveal Perfecto (Now standard primary) */}
                <button className="btn-primary w-full max-w-[18rem]">
                  <span>Primary Button</span>
                </button>
                
                {/* Awwwards Kinetic Slide Perfecto */}
                <button className="btn-kinetic-primary w-full max-w-[18rem]">
                  <span className="text-wrapper">
                    <span className="text-main">Kinetic Slide</span>
                    <span className="text-clone">Kinetic Slide</span>
                  </span>
                </button>
                
                {/* Awwwards Iconic Glass */}
                <button className="btn-magnetic-glass w-full max-w-[18rem] flex justify-between group">
                  <span>Breathing Glass</span>
                  <div className="icon-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>

              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden p-12 flex items-center justify-center min-h-[25rem] bg-[var(--color-surface-BG-2)]">
              <div className="absolute top-10 right-10 w-48 h-48 bg-salento-terracotta rounded-full mix-blend-screen filter blur-2xl opacity-50" />
              <div className="absolute bottom-10 left-10 w-64 h-64 bg-salento-gold rounded-full mix-blend-screen filter blur-3xl opacity-30" />
              <div className="organic-glass-panel breathing-card w-full max-w-sm p-8 relative z-10">
                <p className="text-overline text-[var(--color-brand-orange)] mb-2">Signature Glass</p>
                <h4 className="text-h3 mb-4 text-[var(--color-text-primary)]">Soft Organic Card</h4>
                <p className="text-body-sm text-[var(--color-text-muted)] mb-6">Foundation of our liquid organic interface.</p>
                <button className="btn-secondary w-full">Interact</button>
              </div>
            </div>
          </div>
        </section>
      </div>

                        {/* --- SECTION 6: LAYOUT MAX WIDTHS --- */}
        <section className="mb-32">
          <div className="mb-12 text-center">
            <h2 className="text-h1">6. Desktop Layout Max-Width</h2>
            <p className="text-body-lg text-[var(--color-text-muted)] mt-4 max-w-2xl mx-auto">
              Restricciones de ancho máximo para mantener la legibilidad y estructura del contenido en pantallas grandes. (Escala Real)
            </p>
          </div>

          <div className="flex flex-col gap-12 items-center w-full">
            {/* Control Panel */}
            <div className="w-full max-w-3xl flex flex-col gap-8">
              <SpacingCard 
                label="Max Widths"
                token={activeMaxWidth}
                value={activeMaxWidth === 'max-w-section-sm' ? '48rem (768px)' : activeMaxWidth === 'max-w-section-md' ? '64rem (1024px)' : activeMaxWidth === 'max-w-section-lg' ? '80rem (1280px)' : '96rem (1536px)'}
                usage={activeMaxWidth === 'max-w-section-sm' ? 'Formularios, login, y settings enfocados.' : activeMaxWidth === 'max-w-section-md' ? 'Artículos y vistas de detalle estándar.' : activeMaxWidth === 'max-w-section-lg' ? 'Dashboards principales de GO AMS.' : 'Tablas de datos extensas y gráficas complejas.'}
                options={['max-w-section-sm', 'max-w-section-md', 'max-w-section-lg', 'max-w-section-xl']}
                activeOption={activeMaxWidth}
                onOptionChange={setActiveMaxWidth}
                visual={
                  <div className="w-full bg-[var(--color-surface-BG-1)] h-24 rounded-lg flex items-center justify-center p-4">
                     <div className={`h-full bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] rounded transition-all duration-500`} style={{ width: activeMaxWidth === 'max-w-section-sm' ? '40%' : activeMaxWidth === 'max-w-section-md' ? '60%' : activeMaxWidth === 'max-w-section-lg' ? '80%' : '100%' }}></div>
                  </div>
                }
              />
            </div>

            {/* Interactive Demo at Real Scale */}
            <div className="w-full bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] rounded-3xl py-16 overflow-x-auto relative">
               {/* Resizing Container (Forced Real Scale) */}
               <div 
                  className="bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] rounded-2xl p-6 shadow-2xl transition-all duration-500 mx-auto flex flex-col"
                  style={{ width: `var(--${activeMaxWidth})` }}
               >
                 {/* Fake UI Header */}
                 <div className="flex justify-between items-center border-b border-[var(--color-border-Strokes-default)]/50 pb-4 mb-6">
                   <div className="flex flex-col">
                     <span className="text-h4">GO AMS Dashboard</span>
                     <span className="text-caption text-[var(--color-text-muted)]">Active Policies Overview</span>
                   </div>
                   <div className="flex gap-2">
                     <div className="w-8 h-8 rounded-full bg-[var(--color-surface-BG-2)]"></div>
                     <div className="w-8 h-8 rounded-full bg-[var(--color-surface-BG-2)]"></div>
                   </div>
                 </div>
                 
                 {/* Fake Data Grid */}
                 <div className="flex gap-4 mb-4">
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl"></div>
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl"></div>
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl"></div>
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl"></div>
                 </div>
                 <div className="flex-1 bg-[var(--color-surface-BG-1)] rounded-xl flex items-center justify-center min-h-[200px]">
                    <p className="text-body-sm text-[var(--color-text-hint)] text-center">
                       Contenido a tamaño real: <br/>
                       <strong>{activeMaxWidth}</strong>
                    </p>
                 </div>
               </div>
            </div>
          </div>
        </section>

    </main>
  );
}

// --- Helper Components ---

function ColorCard({ name, variable, hex, colorClass, textWhite = false }: { name: string, variable: string, hex: string, colorClass: string, textWhite?: boolean }) {
  return (
    <div className="group cursor-pointer">
      <div className={`w-full aspect-square rounded-2xl mb-4 shadow-sm border border-[var(--color-border-Strokes-default)] transition-transform duration-300 group-hover:scale-105 ${colorClass}`} />
      <div>
        <p className="text-body font-medium">{name}</p>
        <p className="text-caption text-[var(--color-text-muted)] font-mono">{variable}</p>
        <p className="text-caption text-[var(--color-text-muted)] font-mono">{hex}</p>
      </div>
    </div>
  );
}

function TypeRow({ token, name, font, text, overrideFont, details }: { token: string, name: string, font: string, text: string, overrideFont?: string, details?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 border-b border-[var(--color-border-Strokes-default)]/50 pb-8 last:border-0 last:pb-0">
      <div className="w-64 shrink-0">
        <p className="text-ui-label text-[var(--color-text-muted)] mb-1">{name}</p>
        <p className="text-caption font-mono bg-[var(--color-surface-BG-1)] px-2 py-1 rounded inline-block">{token}</p>
        <p className="text-caption text-[var(--color-text-muted)] mt-2 uppercase">{font}</p>
        {details && <p className="text-caption text-[var(--color-text-hint)] mt-2 whitespace-pre-line leading-relaxed border-t border-[var(--color-border-Strokes-default)]/30 pt-2">{details}</p>}
      </div>
      <div className="flex-1">
        <p className={token.replace(".", "")} style={overrideFont ? { fontFamily: `var(--font-${overrideFont})` } : {}}>{text}</p>
      </div>
    </div>
  );
}

function SpacingCard({ 
  label, 
  token, 
  value, 
  usage, 
  visual, 
  options, 
  activeOption, 
  onOptionChange 
}: { 
  label: string, 
  token: string, 
  value: string, 
  usage: string, 
  visual: React.ReactNode,
  options?: string[],
  activeOption?: string,
  onOptionChange?: (opt: string) => void
}) {
  return (
    <div className="p-6 border border-[var(--color-border-Strokes-default)]/50 rounded-2xl bg-[var(--color-surface-BG-base)] flex flex-col justify-between min-h-[15.625rem]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-ui-label text-[var(--color-text-muted)]">{label}</span>
          {options && onOptionChange && (
            <div className="flex gap-1 bg-[var(--color-surface-BG-1)] p-0.5 rounded-lg">
              {options.map(opt => (
                <button
                  key={opt}
                  onClick={() => onOptionChange(opt)}
                  className={`px-2 py-0.5 rounded-md text-[0.625rem] font-bold uppercase transition-all ${activeOption === opt ? 'bg-[var(--color-surface-BG-base)] text-[var(--color-text-primary)] shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
                >
                  {opt.replace('py-section-', '').replace('gap-', '').replace('px-gutter-', '')}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-h5 text-[var(--color-text-primary)] mb-1">{token}</p>
        <p className="text-caption text-[var(--color-text-muted)] font-mono mb-4">{value}</p>
        <p className="text-caption text-[var(--color-text-muted)] italic mb-6 leading-relaxed">{usage}</p>
      </div>
      <div className="w-full flex items-center justify-center p-4 bg-[var(--color-surface-BG-1)]/30 rounded-xl overflow-hidden min-h-[6.25rem]">
        {visual}
      </div>
    </div>
  );
}