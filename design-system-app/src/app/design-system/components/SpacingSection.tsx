"use client";

import React from "react";
import { useState } from "react";
import SpacingCard from "./SpacingCard";

export default function SpacingSection() {
  const [activeInternalGap, setActiveInternalGap] = useState("gap-2");
  const [activeSectionPadding, setActiveSectionPadding] = useState("py-section-md");
  const [activeFluidGap, setActiveFluidGap] = useState("gap-fluid-md");
  const [activePageGutter, setActivePageGutter] = useState("px-gutter-md");

  return (
    <>
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
    </>
  );
}