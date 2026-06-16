"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function DesignSystemPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [sandboxBg, setSandboxBg] = useState("bg-background");
  const [sandboxTextColor, setSandboxTextColor] = useState("text-foreground");
  const [previewFont, setPreviewFont] = useState("bebas");
  const [previewSecondaryFont, setPreviewSecondaryFont] = useState("inter");
  
  // Spacing States
  const [activeInternalGap, setActiveInternalGap] = useState("gap-2");
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
      className="min-h-screen bg-background text-foreground transition-colors duration-500"
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
          className="organic-glass-panel px-4 py-2 flex items-center gap-2 hover:bg-secondary transition-colors"
        >
          <span className="text-[1.125rem]">{isDark ? '🌙' : '☀️'}</span>
          <span className="text-ui-label text-foreground hidden sm:block">
            {isDark ? 'Midnight Roast' : 'Amanecer Cafetero'}
          </span>
        </button>
      </div>

      <div className="max-w-[87.5rem] mx-auto px-gutter-md py-24 relative z-10">
        
        {/* --- HEADER --- */}
        <header className="mb-24 text-center max-w-3xl mx-auto animate-fade-up">
          <p className="text-overline text-salento-terracotta mb-4">
            Organic Liquid Glass UI Kit
          </p>
          <h1 className="text-display mb-6">SalentoCoffee Design System</h1>
          <p className="text-subtitle text-muted">
            A visual reference for developers and AI agents. This page demonstrates the fusion of 
            premium artisanal coffee aesthetics with modern, tactile glassmorphism.
            <br/><br/>
            <strong>Currently exploring:</strong> {isDark ? 'Midnight Roast (Dark)' : 'Amanecer Cafetero (Light)'}
          </p>
        </header>

        {/* --- SECTION 1: COLOR PALETTE --- */}
        <section className="mb-32 animate-fade-up">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-h1">1. Midnight & Amanecer Palette</h2>
            <div className="h-[0.0625rem] flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ColorCard name="Oatmeal (Bg Light)" variable="--color-oatmeal" hex="#F7F2E7" colorClass="bg-[#F7F2E7]" />
            <ColorCard name="Obsidian (Bg Dark)" variable="--color-obsidian" hex="#111111" colorClass="bg-[#111111]" textWhite />
            <ColorCard name="Almond (Sec Light)" variable="--color-almond" hex="#EAD8C0" colorClass="bg-[#EAD8C0]" />
            <ColorCard name="Charcoal (Sec Dark)" variable="--color-charcoal" hex="#1A1A1A" colorClass="bg-[#1A1A1A]" textWhite />
            
            <ColorCard name="Mocha" variable="--color-mocha" hex="#4E3B31" colorClass="bg-salento-mocha" textWhite />
            <ColorCard name="Terracotta" variable="--color-terracotta" hex="#C35B48" colorClass="bg-salento-terracotta" textWhite />
            <ColorCard name="Premium Gold" variable="--color-gold" hex="#D4AF37" colorClass="bg-salento-gold" textWhite />
            <ColorCard name="Moss Green" variable="--color-moss" hex="#4A5D23" colorClass="bg-salento-moss" textWhite />
          </div>
        </section>

        {/* --- SECTION 2: SEMANTIC TEXT COLORS --- */}
        <section className="mb-32 animate-fade-up">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-h1">2. Semantic Text Colors</h2>
            <div className="h-[0.0625rem] flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            <ColorCard name="Primary" variable="text-foreground" hex="Dynamic" colorClass="bg-foreground" textWhite={isDark ? false : true} />
            <ColorCard name="Secondary" variable="text-foreground-secondary" hex="Dynamic" colorClass="bg-foreground-secondary" textWhite={isDark ? false : true} />
            <ColorCard name="Tertiary" variable="text-foreground-tertiary" hex="Dynamic" colorClass="bg-foreground-tertiary" textWhite />
            <ColorCard name="Muted" variable="text-muted" hex="Dynamic" colorClass="bg-muted" textWhite />
            <ColorCard name="Accent" variable="text-accent" hex="Dynamic" colorClass="bg-accent" textWhite />
            <ColorCard name="Inverse" variable="text-inverse" hex="Dynamic" colorClass="bg-inverse" textWhite={isDark ? true : false} />
          </div>

          <div className="organic-glass-panel p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 pb-8 border-b border-border/50">
              <div className="max-w-md">
                <h3 className="text-h3 text-foreground mb-2">Typography Sandbox</h3>
                <p className="text-body-sm text-muted">
                  Test how our semantic text tokens adapt to different backgrounds.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col gap-3">
                  <span className="text-ui-label text-muted">1. Select Text Color</span>
                  <div className="flex flex-wrap items-center gap-2 max-w-[15.625rem]">
                    {[
                      { id: "text-foreground", label: "Primary" },
                      { id: "text-foreground-secondary", label: "Secondary" },
                      { id: "text-foreground-tertiary", label: "Tertiary" },
                      { id: "text-muted", label: "Muted" },
                      { id: "text-accent", label: "Accent" }
                    ].map((tc) => (
                      <button 
                        key={tc.id}
                        onClick={() => setSandboxTextColor(tc.id)}
                        className={`px-3 py-1 rounded-full text-caption font-medium transition-all border ${sandboxTextColor === tc.id ? 'bg-foreground text-inverse border-foreground shadow-md' : 'bg-transparent text-foreground border-border hover:bg-secondary'}`}
                      >
                        {tc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-ui-label text-muted">2. Select Background</span>
                  <div className="flex items-center gap-3">
                    {["bg-background", "bg-secondary", "bg-salento-mocha", "bg-salento-moss"].map(bg => (
                      <button 
                        key={bg}
                        onClick={() => setSandboxBg(bg)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${sandboxBg === bg ? "border-accent scale-110" : "border-border/30 hover:scale-105"} ${bg}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-10 md:p-16 rounded-3xl transition-colors duration-500 ${sandboxBg} ${['bg-salento-mocha', 'bg-salento-moss'].includes(sandboxBg) ? 'dark shadow-2xl' : 'shadow-sm border border-border/50'}`}>
              <div className="max-w-3xl mx-auto flex flex-col gap-8 items-start">
                <div className="inline-block px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full mb-2">
                  <span className="text-caption font-mono opacity-60">Applied class: {sandboxTextColor}</span>
                </div>
                <h4 className={`text-display-sm leading-[1.1] transition-colors duration-300 ${sandboxTextColor}`}>
                  The true cost of <span className="italic font-light text-accent">Craftsmanship</span>
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
          <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl pt-6 pb-4 mb-10 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-6 transition-colors duration-500">
            <div>
              <h2 className="text-h1 mb-2">3. Cognitive Typography</h2>
              <p className="text-body-sm text-muted max-w-lg">
                Preview our premium serif and display fonts.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 shrink-0">


              <div className="flex flex-col gap-2">
                <span className="text-ui-label text-muted">Secondary Body Font</span>
                <div className="flex bg-secondary p-1 rounded-xl w-fit shadow-sm">
                  <select 
                    className="bg-transparent text-foreground text-body-sm font-medium px-4 py-2 outline-none cursor-pointer"
                    value={previewSecondaryFont}
                    onChange={(e) => setPreviewSecondaryFont(e.target.value)}
                  >
                    <option value="inter">Inter</option>
                    <option value="montserrat">Montserrat</option>
                    <option value="lato">Lato</option>
                    <option value="tenor-sans">Tenor Sans</option>
                    <option value="syne">Syne</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="organic-glass-panel p-8 md:p-12 flex flex-col gap-12">
            {[
              { token: ".text-display-xl", name: "Display XL", text: "Artisanal Coffee" },
              { token: ".text-display-lg", name: "Display LG", text: "Mastering Craft" },
              { token: ".text-display", name: "Display", text: "Heritage" },
              { token: ".text-display-sm", name: "Display SM", text: "A Legacy" },
              { token: ".text-h1", name: "H1 Section", text: "Our Origins" },
              { token: ".text-h2", name: "H2 Sub-section", text: "The Terroir" },
              { token: ".text-h3", name: "H3 Card", text: "Espresso" },
              { token: ".text-h4", name: "H4 Subtitle", text: "Tasting Notes" },
              { token: ".text-h5", name: "H5 Small", text: "Roasted" },
              { token: ".text-h6", name: "H6 Micro", text: "Aroma Profile" }
            ].map(item => (
              <TypeRow key={item.token} {...item} font={previewFont} overrideFont={previewFont} />
            ))}
            <TypeRow token=".text-overline" name="Overline" font={previewSecondaryFont} text="Premium Selection" overrideFont={previewSecondaryFont} />
            <TypeRow token=".text-subtitle" name="Subtitle" font={previewSecondaryFont} text="A smooth, balanced cup that reflects the rich volcanic soils." overrideFont={previewSecondaryFont} />
            <TypeRow token=".text-body-2xl" name="Body 2XL" font={previewSecondaryFont} text="This is the largest body text, used for premium reading experiences." overrideFont={previewSecondaryFont} />
            <TypeRow token=".text-body-xl" name="Body XL" font={previewSecondaryFont} text="Extra large body text, providing excellent legibility." overrideFont={previewSecondaryFont} />
            <TypeRow token=".text-body-lg" name="Body LG" font={previewSecondaryFont} text="Large body text, offering a comfortable reading rhythm." overrideFont={previewSecondaryFont} />
            <TypeRow token=".text-body-md" name="Body MD" font={previewSecondaryFont} text="Medium body text, the standard for article paragraphs." overrideFont={previewSecondaryFont} />
            <TypeRow token=".text-body" name="Body" font={previewSecondaryFont} text="Our beans are carefully hand-picked by local farmers who have dedicated generations." overrideFont={previewSecondaryFont} />
            <TypeRow token=".text-body-sm" name="Body SM" font={previewSecondaryFont} text="Small body text, used for secondary descriptions and minor details." overrideFont={previewSecondaryFont} />
            <TypeRow token=".text-body-xs" name="Body XS" font={previewSecondaryFont} text="Extra small body text, for dense information areas." overrideFont={previewSecondaryFont} />
            <TypeRow token=".text-ui-label" name="UI Label" font={previewSecondaryFont} text="Add to Cart" overrideFont={previewSecondaryFont} />
            <TypeRow token=".text-data" name="Data" font="geist-mono" text="$24.00 USD" />
            <TypeRow token=".text-caption" name="Caption" font={previewSecondaryFont} text="Footnotes, timestamps, and tiny details." overrideFont={previewSecondaryFont} />
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
                <div className={`flex flex-col ${activeInternalGap} p-4 bg-background border border-border rounded-xl w-full transition-all duration-300`}>
                  <div className={`flex ${activeInternalGap} items-center`}>
                    <div className="w-4 h-4 bg-accent rounded-full shrink-0"></div>
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
                  <div className="flex-1 bg-salento-moss/10 border border-dashed border-salento-moss/30 rounded-lg"></div>
                  <div className="flex-1 bg-salento-moss/10 border border-dashed border-salento-moss/30 rounded-lg"></div>
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
                  <div className={`${activeSectionPadding === 'py-section-xs' ? 'h-2' : activeSectionPadding === 'py-section-sm' ? 'h-4' : activeSectionPadding === 'py-section-md' ? 'h-8' : 'h-12'} bg-salento-mocha/10 border-b border-dashed border-salento-mocha/20 transition-all`}></div>
                  <div className="h-12 flex items-center justify-center text-[0.625rem] text-muted uppercase">Contenido</div>
                  <div className={`${activeSectionPadding === 'py-section-xs' ? 'h-2' : activeSectionPadding === 'py-section-sm' ? 'h-4' : activeSectionPadding === 'py-section-md' ? 'h-8' : 'h-12'} bg-salento-mocha/10 border-t border-dashed border-salento-mocha/20 transition-all`}></div>
                </div>
              }
            />
          </div>

          <div className="border border-dashed border-accent/50 rounded-3xl p-6 md:p-12 bg-accent/5 relative overflow-hidden flex flex-col gap-20">
            <div className="absolute top-4 left-4 text-accent font-mono text-[0.625rem] uppercase tracking-widest font-bold">
              Architectural Playground v2.0
            </div>
            
            <div className="mt-8">
              <h4 className="text-h3 mb-4">Live Studio</h4>
              <p className="text-body text-muted mb-12 max-w-2xl">
                Controla y visualiza la estructura de SalentoCoffee en tiempo real.
              </p>

              <div className="flex flex-col gap-20">
                {/* 01: Gutters */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h5 className="text-h5 text-foreground flex items-center gap-3">
                      <span className="w-6 h-6 bg-foreground text-inverse rounded-full flex items-center justify-center text-[0.625rem]">01</span>
                      Page Frame Strategy
                    </h5>
                    <div className="flex gap-1 bg-secondary p-1 rounded-xl w-fit shadow-sm">
                      {['px-gutter-sm', 'px-gutter-md', 'px-gutter-lg', 'px-gutter-xl'].map(opt => (
                        <button key={opt} onClick={() => setActivePageGutter(opt)} className={`px-3 py-1 rounded-lg text-[0.625rem] font-bold uppercase transition-all ${activePageGutter === opt ? 'bg-background text-foreground shadow-md' : 'text-muted hover:text-foreground'}`}>
                          {opt.replace('px-gutter-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="w-full bg-background border border-border rounded-2xl relative h-48 overflow-hidden flex items-center justify-center shadow-xl transition-all duration-500">
                    <div className="absolute inset-y-0 left-0 bg-salento-terracotta/10 border-r border-dashed border-salento-terracotta/30 flex items-center justify-center transition-all duration-500" style={{ width: `var(--space-gutter-${activePageGutter.replace('px-gutter-', '')})` }}>
                      <span className="text-[0.625rem] font-mono text-salento-terracotta rotate-90 whitespace-nowrap">{activePageGutter}</span>
                    </div>
                    <div className="absolute inset-y-0 right-0 bg-salento-terracotta/10 border-l border-dashed border-salento-terracotta/30 flex items-center justify-center transition-all duration-500" style={{ width: `var(--space-gutter-${activePageGutter.replace('px-gutter-', '')})` }}>
                      <span className="text-[0.625rem] font-mono text-salento-terracotta rotate-90 whitespace-nowrap">{activePageGutter}</span>
                    </div>
                    <div className="text-ui-label text-muted uppercase tracking-widest">Main Layout Area (87.5rem)</div>
                  </div>
                </div>

                {/* 02: Section Padding */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h5 className="text-h5 text-foreground flex items-center gap-3">
                      <span className="w-6 h-6 bg-foreground text-inverse rounded-full flex items-center justify-center text-[0.625rem]">02</span>
                      Vertical Section Rhythm
                    </h5>
                    <div className="flex gap-1 bg-secondary p-1 rounded-xl w-fit shadow-sm">
                      {['py-section-xs', 'py-section-sm', 'py-section-md', 'py-section-lg'].map(opt => (
                        <button key={opt} onClick={() => setActiveSectionPadding(opt)} className={`px-3 py-1 rounded-lg text-[0.625rem] font-bold uppercase transition-all ${activeSectionPadding === opt ? 'bg-background text-foreground shadow-md' : 'text-muted hover:text-foreground'}`}>
                          {opt.replace('py-section-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-xl transition-all duration-500">
                    <div className="bg-salento-mocha/10 border-b border-dashed border-salento-mocha/30 flex items-center justify-center transition-all duration-500" style={{ height: `var(--space-section-${activeSectionPadding.replace('py-section-', '')})` }}>
                      <span className="text-[0.625rem] font-mono text-salento-mocha uppercase font-bold">{activeSectionPadding}</span>
                    </div>
                    <div className="py-16 text-center text-body text-muted uppercase tracking-[0.5em] opacity-30">Website Content Block</div>
                    <div className="bg-salento-mocha/10 border-t border-dashed border-salento-mocha/30 flex items-center justify-center transition-all duration-500" style={{ height: `var(--space-section-${activeSectionPadding.replace('py-section-', '')})` }}>
                      <span className="text-[0.625rem] font-mono text-salento-mocha uppercase font-bold">{activeSectionPadding}</span>
                    </div>
                  </div>
                </div>

                {/* 03: Fluid Gaps */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h5 className="text-h5 text-foreground flex items-center gap-3">
                      <span className="w-6 h-6 bg-foreground text-inverse rounded-full flex items-center justify-center text-[0.625rem]">03</span>
                      Column Separation
                    </h5>
                    <div className="flex gap-1 bg-secondary p-1 rounded-xl w-fit shadow-sm">
                      {['gap-fluid-xs', 'gap-fluid-sm', 'gap-fluid-md', 'gap-fluid-lg'].map(opt => (
                        <button key={opt} onClick={() => setActiveFluidGap(opt)} className={`px-3 py-1 rounded-lg text-[0.625rem] font-bold uppercase transition-all ${activeFluidGap === opt ? 'bg-background text-foreground shadow-md' : 'text-muted hover:text-foreground'}`}>
                          {opt.replace('gap-fluid-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={`flex ${activeFluidGap} p-8 border border-dashed border-salento-moss/30 bg-salento-moss/5 rounded-2xl relative min-h-[18rem] transition-all duration-500 items-stretch`}>
                    <div className="flex-1 bg-background border border-border shadow-md rounded-xl flex items-center justify-center">
                      <span className="text-caption text-muted font-mono uppercase">Column A</span>
                    </div>
                    <div className="flex-1 bg-background border border-border shadow-md rounded-xl flex items-center justify-center relative">
                      <span className="text-caption text-muted font-mono uppercase">Column B</span>
                      <div className="absolute -left-[calc(var(--space-fluid-gap-md)/2)] top-1/2 -translate-x-1/2 -translate-y-1/2 bg-salento-moss text-inverse px-4 py-1.5 rounded-full text-[0.625rem] font-mono z-20 whitespace-nowrap shadow-lg font-bold">
                        {activeFluidGap}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 04: Micro Gaps */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h5 className="text-h5 text-foreground flex items-center gap-3">
                      <span className="w-6 h-6 bg-foreground text-inverse rounded-full flex items-center justify-center text-[0.625rem]">04</span>
                      Micro-Spacing
                    </h5>
                    <div className="flex gap-1 bg-secondary p-1 rounded-xl w-fit shadow-sm">
                      {['gap-1', 'gap-2', 'gap-4', 'gap-6'].map(opt => (
                        <button key={opt} onClick={() => setActiveInternalGap(opt)} className={`px-3 py-1 rounded-lg text-[0.625rem] font-bold uppercase transition-all ${activeInternalGap === opt ? 'bg-background text-foreground shadow-md' : 'text-muted hover:text-foreground'}`}>
                          {opt.replace('gap-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={`organic-glass-panel p-8 flex flex-col ${activeInternalGap} transition-all duration-300 shadow-xl max-w-md`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-salento-terracotta/20 flex items-center justify-center text-salento-terracotta font-bold italic">S</div>
                      <div className="flex flex-col gap-1">
                        <div className="h-3 w-24 bg-foreground/80 rounded"></div>
                        <div className="h-2 w-16 bg-muted/40 rounded"></div>
                      </div>
                    </div>
                    <p className="text-body-sm text-muted">Demostración del token <strong>{activeInternalGap}</strong>.</p>
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
              <p className="text-body-sm text-muted mb-6">Awwwards Kinetic Architecture.</p>
              <div className="relative rounded-3xl overflow-hidden py-12 px-6 bg-transparent border border-border flex flex-col justify-center items-center gap-8 min-h-[25rem] bg-repeat" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"2\" cy=\"2\" r=\"2\"/%3E%3C/g%3E%3C/svg%3E')"}}>
                
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
            <div className="relative rounded-3xl overflow-hidden p-12 flex items-center justify-center min-h-[25rem] bg-salento-mocha">
              <div className="absolute top-10 right-10 w-48 h-48 bg-salento-terracotta rounded-full mix-blend-screen filter blur-2xl opacity-50" />
              <div className="absolute bottom-10 left-10 w-64 h-64 bg-salento-gold rounded-full mix-blend-screen filter blur-3xl opacity-30" />
              <div className="organic-glass-panel breathing-card w-full max-w-sm p-8 relative z-10">
                <p className="text-overline text-salento-terracotta mb-2">Signature Glass</p>
                <h4 className="text-h3 mb-4 text-foreground">Soft Organic Card</h4>
                <p className="text-body-sm text-muted mb-6">Foundation of our liquid organic interface.</p>
                <button className="btn-secondary w-full">Interact</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// --- Helper Components ---

function ColorCard({ name, variable, hex, colorClass, textWhite = false }: { name: string, variable: string, hex: string, colorClass: string, textWhite?: boolean }) {
  return (
    <div className="group cursor-pointer">
      <div className={`w-full aspect-square rounded-2xl mb-4 shadow-sm border border-border transition-transform duration-300 group-hover:scale-105 ${colorClass}`} />
      <div>
        <p className="text-body font-medium">{name}</p>
        <p className="text-caption text-muted font-mono">{variable}</p>
        <p className="text-caption text-muted font-mono">{hex}</p>
      </div>
    </div>
  );
}

function TypeRow({ token, name, font, text, overrideFont }: { token: string, name: string, font: string, text: string, overrideFont?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 border-b border-border/50 pb-8 last:border-0 last:pb-0">
      <div className="w-48 shrink-0">
        <p className="text-ui-label text-muted mb-1">{name}</p>
        <p className="text-caption font-mono bg-secondary px-2 py-1 rounded inline-block">{token}</p>
        <p className="text-caption text-muted mt-2 uppercase">{font}</p>
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
    <div className="p-6 border border-border/50 rounded-2xl bg-background flex flex-col justify-between min-h-[15.625rem]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-ui-label text-muted">{label}</span>
          {options && onOptionChange && (
            <div className="flex gap-1 bg-secondary p-0.5 rounded-lg">
              {options.map(opt => (
                <button
                  key={opt}
                  onClick={() => onOptionChange(opt)}
                  className={`px-2 py-0.5 rounded-md text-[0.625rem] font-bold uppercase transition-all ${activeOption === opt ? 'bg-background text-foreground shadow-sm' : 'text-muted hover:text-foreground'}`}
                >
                  {opt.replace('py-section-', '').replace('gap-', '').replace('px-gutter-', '')}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-h5 text-foreground mb-1">{token}</p>
        <p className="text-caption text-muted font-mono mb-4">{value}</p>
        <p className="text-caption text-muted italic mb-6 leading-relaxed">{usage}</p>
      </div>
      <div className="w-full flex items-center justify-center p-4 bg-secondary/30 rounded-xl overflow-hidden min-h-[6.25rem]">
        {visual}
      </div>
    </div>
  );
}