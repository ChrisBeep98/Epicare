"use client";

import React, { useState, useEffect } from 'react';

// Global state para recolectar todos los layouts activos
const layoutState: Record<string, any> = {};

// Helper: update state and notify
const updateState = (id: string, state: any) => {
  layoutState[id] = { ...layoutState[id], ...state };
  window.dispatchEvent(new Event('layoutStateUpdated'));
};

const removeState = (id: string) => {
  delete layoutState[id];
  window.dispatchEvent(new Event('layoutStateUpdated'));
};

function CopyStateButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button 
      onClick={() => {
        navigator.clipboard.writeText(JSON.stringify({ [id]: layoutState[id] }, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={`ml-2 text-[10px] ${copied ? 'text-green-400' : 'text-[var(--color-text-muted)] hover:text-white'} transition-colors cursor-pointer flex-shrink-0`}
      title="Copiar solo este componente"
    >
      {copied ? '✓' : '📋'}
    </button>
  );
}

// ==========================================
// 1. SECTION LIVE EDITOR (Rhythm & Wrappers)
// ==========================================
export function SectionLiveEditor({ id, initialPy = 'py-section-md', initialPx = 'px-gutter-md', initialMaxW = 'max-w-section-xl', initialGap = '', initialAlign = '', children, className = "", innerClassName = "" }: { id: string, initialPy?: string, initialPx?: string, initialMaxW?: string, initialGap?: string, initialAlign?: string, children: React.ReactNode, className?: string, innerClassName?: string }) {
  const [py, setPy] = useState(initialPy);
  const [px, setPx] = useState(initialPx);
  const [maxW, setMaxW] = useState(initialMaxW);
  const [gap, setGap] = useState(initialGap);
  const [align, setAlign] = useState(initialAlign);

  useEffect(() => {
    updateState(id, { type: 'Section', py, px, maxW, gap, align });
    return () => removeState(id);
  }, [id, py, px, maxW, gap, align]);

  return (
    <section className={`relative group/section ${className} ${py} ${px}`}>
      <div className={`mx-auto ${maxW} ${gap} ${align} ${innerClassName} w-full`}>
        {/* Float Control */}
        <div className="absolute top-2 left-2 opacity-0 group-hover/section:opacity-100 bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-strong)] rounded flex flex-col gap-2 px-3 py-2 z-[9997] text-[10px] shadow-elevation-5 pointer-events-auto">
          <div className="flex justify-between items-center border-b border-[var(--color-border-Strokes-default)] pb-1 mb-1">
            <span className="text-[var(--color-brand-blue)] font-bold uppercase tracking-widest">{id} (Section)</span>
            <CopyStateButton id={id} />
          </div>
          
          <div className="flex gap-2">
            <select value={py} onChange={e => setPy(e.target.value)} className="bg-[var(--color-surface-BG-2)] text-white outline-none rounded px-1 py-1">
              <option value="">PY: None</option><option value="py-section-xs">PY: XS</option><option value="py-section-sm">PY: SM</option><option value="py-section-md">PY: MD</option><option value="py-section-lg">PY: LG</option>
            </select>
            <select value={px} onChange={e => setPx(e.target.value)} className="bg-[var(--color-surface-BG-2)] text-white outline-none rounded px-1 py-1">
              <option value="">PX: None</option><option value="px-gutter-sm">PX: SM</option><option value="px-gutter-md">PX: MD</option><option value="px-gutter-lg">PX: LG</option>
            </select>
            <select value={maxW} onChange={e => setMaxW(e.target.value)} className="bg-[var(--color-surface-BG-2)] text-white outline-none rounded px-1 py-1">
              <option value="w-full">MaxW: Full</option><option value="max-w-section-sm">MaxW: SM</option><option value="max-w-section-md">MaxW: MD</option><option value="max-w-section-lg">MaxW: LG</option><option value="max-w-section-xl">MaxW: XL</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <select value={gap} onChange={e => setGap(e.target.value)} className="bg-[var(--color-surface-BG-2)] text-white outline-none rounded px-1 py-1">
              <option value="">Gap: Inherit</option><option value="gap-0">Gap: 0</option><option value="gap-fluid-sm">Gap: SM</option><option value="gap-fluid-md">Gap: MD</option><option value="gap-fluid-lg">Gap: LG</option>
            </select>
            <select value={align} onChange={e => setAlign(e.target.value)} className="bg-[var(--color-surface-BG-2)] text-white outline-none rounded px-1 py-1">
              <option value="">Align: None</option><option value="items-start">Align: Start</option><option value="items-center">Align: Center</option><option value="items-end">Align: End</option>
            </select>
          </div>
          
        </div>
        <div className="absolute inset-0 border-4 border-dashed border-[var(--color-brand-blue)]/0 group-hover/section:border-[var(--color-brand-blue)]/20 pointer-events-none transition-colors z-40"></div>
        {children}
      </div>
    </section>
  );
}

// ==========================================
// 2. GRID LIVE EDITOR (Placement & Flex)
// ==========================================
export function GridLiveEditor({ 
  id, 
  initialStart = 1, initialSpan = 12, initialRowStart = 1, initialRowSpan = 1, 
  initialMStart = 1, initialMSpan = 6, initialMRowStart = 1, initialMRowSpan = 1,
  children, className = "", flexDir = "row", justify = "flex-start", align = "flex-start", gap = "" 
}: { 
  id: string, initialStart?: number, initialSpan?: number, initialRowStart?: number, initialRowSpan?: number, 
  initialMStart?: number, initialMSpan?: number, initialMRowStart?: number, initialMRowSpan?: number,
  children: React.ReactNode, className?: string, flexDir?: "row"|"column", justify?: string, align?: string, gap?: string 
}) {
  const [start, setStart] = useState(initialStart);
  const [span, setSpan] = useState(initialSpan);
  const [rowStart, setRowStart] = useState(initialRowStart);
  const [rowSpan, setRowSpan] = useState(initialRowSpan);

  const [mStart, setMStart] = useState(initialMStart);
  const [mSpan, setMSpan] = useState(initialMSpan);
  const [mRowStart, setMRowStart] = useState(initialMRowStart);
  const [mRowSpan, setMRowSpan] = useState(initialMRowSpan);

  const [editMode, setEditMode] = useState<'desktop'|'mobile'>('desktop');

  useEffect(() => {
    updateState(id, { type: 'Grid', start, span, rowStart, rowSpan, mStart, mSpan, mRowStart, mRowSpan, flexDir, justify, align, gap });
    return () => removeState(id);
  }, [id, start, span, rowStart, rowSpan, mStart, mSpan, mRowStart, mRowSpan, flexDir, justify, align, gap]);

  return (
    <div className={`relative group/grid live-grid-responsive flex ${className} ${gap}`} style={{ 
      '--tw-grid-col-start': start, 
      '--tw-grid-col-span': span, 
      '--tw-grid-row-start': rowStart, 
      '--tw-grid-row-span': rowSpan,
      '--tw-m-grid-col-start': mStart, 
      '--tw-m-grid-col-span': mSpan, 
      '--tw-m-grid-row-start': mRowStart, 
      '--tw-m-grid-row-span': mRowSpan,
      flexDirection: flexDir, justifyContent: justify, alignItems: align 
    } as React.CSSProperties}>
      <div className="absolute -top-[50px] left-0 opacity-0 group-hover/grid:opacity-100 bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-strong)] rounded flex flex-col gap-1 px-3 py-2 z-[9998] text-[10px] shadow-elevation-5 pointer-events-auto">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-brand-orange)] font-bold uppercase tracking-wider mr-2">{id}</span>
            <button onClick={() => setEditMode('desktop')} className={`px-2 py-0.5 rounded ${editMode === 'desktop' ? 'bg-[var(--color-brand-blue)] text-white' : 'bg-[var(--color-surface-BG-2)] text-gray-400'}`}>💻</button>
            <button onClick={() => setEditMode('mobile')} className={`px-2 py-0.5 rounded ${editMode === 'mobile' ? 'bg-[var(--color-brand-orange)] text-white' : 'bg-[var(--color-surface-BG-2)] text-gray-400'}`}>📱</button>
          </div>
          <CopyStateButton id={id} />
        </div>

        {editMode === 'desktop' ? (
          <div className="flex gap-3 mb-1">
            <div className="flex items-center gap-1">CStart: <button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setStart(s => Math.max(1, s-1))}>-</button><span className="w-3 text-center">{start}</span><button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setStart(s => Math.min(12, s+1))}>+</button></div>
            <div className="flex items-center gap-1">CSpan: <button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setSpan(s => Math.max(1, s-1))}>-</button><span className="w-3 text-center">{span}</span><button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setSpan(s => Math.min(12, s+1))}>+</button></div>
            <div className="flex items-center gap-1 ml-2 border-l border-[var(--color-border-Strokes-strong)] pl-2">RStart: <button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setRowStart(s => Math.max(1, s-1))}>-</button><span className="w-3 text-center">{rowStart}</span><button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setRowStart(s => s+1)}>+</button></div>
            <div className="flex items-center gap-1">RSpan: <button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setRowSpan(s => Math.max(1, s-1))}>-</button><span className="w-3 text-center">{rowSpan}</span><button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setRowSpan(s => s+1)}>+</button></div>
          </div>
        ) : (
          <div className="flex gap-3 mb-1">
            <div className="flex items-center gap-1">mStart: <button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setMStart(s => Math.max(1, s-1))}>-</button><span className="w-3 text-center">{mStart}</span><button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setMStart(s => Math.min(6, s+1))}>+</button></div>
            <div className="flex items-center gap-1">mSpan: <button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setMSpan(s => Math.max(1, s-1))}>-</button><span className="w-3 text-center">{mSpan}</span><button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setMSpan(s => Math.min(6, s+1))}>+</button></div>
            <div className="flex items-center gap-1 ml-2 border-l border-[var(--color-border-Strokes-strong)] pl-2">mRStart: <button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setMRowStart(s => Math.max(1, s-1))}>-</button><span className="w-3 text-center">{mRowStart}</span><button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setMRowStart(s => s+1)}>+</button></div>
            <div className="flex items-center gap-1">mRSpan: <button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setMRowSpan(s => Math.max(1, s-1))}>-</button><span className="w-3 text-center">{mRowSpan}</span><button className="bg-[var(--color-surface-BG-2)] w-4 h-4 rounded" onClick={() => setMRowSpan(s => s+1)}>+</button></div>
          </div>
        )}
      </div>
      <div className="absolute inset-0 border-2 border-dashed border-[var(--color-brand-orange)]/0 group-hover/grid:border-[var(--color-brand-orange)]/50 pointer-events-none transition-colors z-40"></div>
      {children}
    </div>
  );
}

// ==========================================
// 3. CARD LIVE EDITOR (Surfaces & Shadows)
// ==========================================
export function CardLiveEditor({ id, initialBg = 'bg-[var(--color-surface-BG-1)]', initialShadow = 'shadow-elevation-2', initialPStatic = 'p-section-xs', children, className = "" }: { id: string, initialBg?: string, initialShadow?: string, initialPStatic?: string, children: React.ReactNode, className?: string }) {
  const [bg, setBg] = useState(initialBg);
  const [shadow, setShadow] = useState(initialShadow);
  const [pStatic, setPStatic] = useState(initialPStatic);

  useEffect(() => {
    updateState(id, { type: 'Card', bg, shadow, pStatic });
    return () => removeState(id);
  }, [id, bg, shadow, pStatic]);

  return (
    <div className={`relative group/card ${className} ${bg} ${shadow} ${pStatic} rounded-2xl`}>
      <div className="absolute -top-6 right-2 opacity-0 group-hover/card:opacity-100 bg-[var(--color-surface-BG-2)] border border-[var(--color-border-Strokes-strong)] rounded flex gap-2 px-2 py-1 z-[9999] text-[10px] shadow-elevation-3 pointer-events-auto">
        <div className="flex items-center mr-1">
          <span className="text-green-400 font-bold">{id}</span>
          <CopyStateButton id={id} />
        </div>
        <select value={bg} onChange={e => setBg(e.target.value)} className="bg-transparent text-white outline-none cursor-pointer">
          <option value="bg-transparent">BG: None</option><option value="bg-[var(--color-surface-BG-base)]">BG: Base</option><option value="bg-[var(--color-surface-BG-1)]">BG: Lvl1</option><option value="bg-[var(--color-surface-BG-2)]">BG: Lvl2</option>
        </select>
        <select value={shadow} onChange={e => setShadow(e.target.value)} className="bg-transparent text-white outline-none cursor-pointer">
          <option value="shadow-none">Sh: 0</option><option value="shadow-elevation-1">Sh: 1</option><option value="shadow-elevation-2">Sh: 2</option><option value="shadow-elevation-4">Sh: 4</option>
        </select>
        <select value={pStatic} onChange={e => setPStatic(e.target.value)} className="bg-transparent text-white outline-none cursor-pointer">
          <option value="p-0">P: 0</option><option value="p-section-xs">P: XS</option><option value="p-section-sm">P: SM</option>
        </select>
      </div>
      <div className="absolute inset-0 border-2 border-dashed border-green-400/0 group-hover/card:border-green-400/50 pointer-events-none transition-colors z-40 rounded-2xl"></div>
      {children}
    </div>
  );
}

// ==========================================
// 4. MEDIA LIVE EDITOR (Manual Width/Height & Fit)
// ==========================================
export function MediaLiveEditor({ id, initialCw = '100%', initialCh = '100%', initialVw = '100%', initialVh = '100%', initialFit = 'object-cover', children, className = "" }: { id: string, initialCw?: string, initialCh?: string, initialVw?: string, initialVh?: string, initialFit?: string, children: React.ReactNode, className?: string }) {
  const [cw, setCw] = useState(initialCw);
  const [ch, setCh] = useState(initialCh);
  const [vw, setVw] = useState(initialVw);
  const [vh, setVh] = useState(initialVh);
  const [fit, setFit] = useState(initialFit);

  useEffect(() => {
    updateState(id, { type: 'Media', cw, ch, vw, vh, fit });
    return () => removeState(id);
  }, [id, cw, ch, vw, vh, fit]);

  return (
    <div className={`relative group/media ${className} flex items-center justify-center`} style={{ width: cw, height: ch }}>
      <div className="absolute top-4 right-4 opacity-0 group-hover/media:opacity-100 bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-strong)] rounded flex flex-col gap-2 px-3 py-2 z-[10001] text-[10px] shadow-elevation-4 text-white pointer-events-auto">
        <div className="flex justify-between items-center border-b border-[var(--color-border-Strokes-default)] pb-1 mb-1">
          <span className="font-bold text-purple-400 uppercase">{id}</span>
          <CopyStateButton id={id} />
        </div>
        
        <div className="flex gap-2 items-center">
          <span className="text-[var(--color-text-muted)] w-8">Cont:</span>
          W <input value={cw} onChange={e => setCw(e.target.value)} className="bg-[var(--color-surface-BG-2)] outline-none rounded px-1 w-12 text-center border border-[var(--color-border-Strokes-default)]" />
          H <input value={ch} onChange={e => setCh(e.target.value)} className="bg-[var(--color-surface-BG-2)] outline-none rounded px-1 w-12 text-center border border-[var(--color-border-Strokes-default)]" />
        </div>
        
        <div className="flex gap-2 items-center">
          <span className="text-[var(--color-text-muted)] w-8">Video:</span>
          W <input value={vw} onChange={e => setVw(e.target.value)} className="bg-[var(--color-surface-BG-2)] outline-none rounded px-1 w-12 text-center border border-[var(--color-border-Strokes-default)]" />
          H <input value={vh} onChange={e => setVh(e.target.value)} className="bg-[var(--color-surface-BG-2)] outline-none rounded px-1 w-12 text-center border border-[var(--color-border-Strokes-default)]" />
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-[var(--color-text-muted)] w-8">Fit:</span>
          <select value={fit} onChange={e => setFit(e.target.value)} className="bg-[var(--color-surface-BG-2)] outline-none rounded px-1 cursor-pointer w-full border border-[var(--color-border-Strokes-default)] py-0.5">
            <option value="object-cover">Cover</option><option value="object-contain">Contain</option><option value="object-fill">Fill</option><option value="object-none">None</option>
          </select>
        </div>
      </div>
      
      {/* Visual outline for the media box */}
      <div className="absolute inset-0 border-2 border-dashed border-purple-400/0 group-hover/media:border-purple-400/50 pointer-events-none transition-colors z-40 rounded-xl"></div>
      
      {/* We inject the fit class and manual dimensions into the children if it's a single valid element */}
      {React.isValidElement<{ className?: string, style?: any }>(children)
        ? React.cloneElement(children, {
            className: `${children.props.className || ''} ${fit}`,
            style: { ...children.props.style, width: vw, height: vh }
          })
        : children}
    </div>
  );
}

// ==========================================
// 5. TEXT LIVE EDITOR (Typography Tokens)
// ==========================================
export function TextLiveEditor({ id, initialToken = "text-body", children, as: Tag = "span", className = "" }: { id: string, initialToken?: string, children: React.ReactNode, as?: any, className?: string }) {
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    updateState(id, { type: 'Text', token });
    return () => removeState(id);
  }, [id, token]);

  return (
    <Tag className={`relative group/text ${className} ${token} inline-block`}>
      <div className="absolute -top-7 left-0 opacity-0 group-hover/text:opacity-100 bg-[var(--color-brand-blue)] rounded flex items-center px-2 py-1 z-[10000] text-[11px] shadow-elevation-5 text-white whitespace-nowrap pointer-events-auto">
        <div className="flex items-center mr-2">
          <span className="font-bold uppercase">{id}</span>
          <CopyStateButton id={id} />
        </div>
        <select value={token} onChange={e => setToken(e.target.value)} className="bg-[var(--color-surface-BG-2)] border border-[var(--color-border-Strokes-strong)] rounded text-white outline-none cursor-pointer px-1 py-0.5">
          <optgroup label="Displays">
            <option value="text-display-3xl">Display 3XL</option><option value="text-display-2xl">Display 2XL</option><option value="text-display-xl">Display XL</option><option value="text-display-lg">Display LG</option><option value="text-display">Display Base</option>
          </optgroup>
          <optgroup label="Headings">
            <option value="text-h1">H1</option><option value="text-h2">H2</option><option value="text-h3">H3</option><option value="text-h4">H4</option>
          </optgroup>
          <optgroup label="Body">
            <option value="text-subtitle">Subtitle</option><option value="text-body-xl">Body XL</option><option value="text-body-lg">Body LG</option><option value="text-body">Body Base</option><option value="text-body-sm">Body SM</option>
          </optgroup>
          <optgroup label="Micro">
            <option value="text-caption">Caption</option><option value="text-overline">Overline</option><option value="text-ui-label">UI Label</option>
          </optgroup>
        </select>
      </div>
      <div className="absolute inset-0 border-2 border-dashed border-[var(--color-brand-blue)]/0 group-hover/text:border-[var(--color-brand-blue)] pointer-events-none transition-colors z-40"></div>
      {children}
    </Tag>
  );
}

// ==========================================
// 5. GLOBAL COPIER & GRID VISUALIZER
// ==========================================
export function LiveEditorCopier() {
  const [copied, setCopied] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(layoutState, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-[9000] w-full h-full">
          <div className="w-full h-full px-gutter-md">
            <div className="w-full max-w-section-xl mx-auto h-full grid-layout border-x border-dashed border-[var(--color-brand-blue)]/30">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-full bg-[var(--color-brand-blue)]/[0.03] border-x border-[var(--color-brand-blue)]/[0.05] flex justify-center pt-2">
                  <span className="text-[10px] text-[var(--color-brand-blue)]/50 font-mono">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 left-6 z-[9999] flex items-center gap-2">
        <button onClick={() => setShowGrid(!showGrid)} className={`px-4 py-3 rounded-xl text-xs font-bold shadow-elevation-4 transition-all hover:-translate-y-1 ${showGrid ? 'bg-[var(--color-brand-blue)] text-white' : 'bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-strong)] text-[var(--color-text-primary)]'}`}>
          {showGrid ? 'Hide Grid' : 'Show Grid'}
        </button>
        <button onClick={handleCopy} className={`px-5 py-3 rounded-xl text-xs font-bold shadow-elevation-4 transition-all hover:-translate-y-1 flex items-center gap-2 ${copied ? 'bg-[var(--color-brand-orange)] text-white' : 'bg-[var(--color-surface-BG-2)] border border-[var(--color-border-Strokes-strong)] text-[var(--color-text-primary)]'}`}>
          <span className={`w-2 h-2 rounded-full ${copied ? 'bg-white' : 'bg-[var(--color-brand-orange)] animate-pulse'}`}></span>
          {copied ? 'JSON Copied!' : 'Copy Final Layout'}
        </button>
      </div>
    </>
  );
}
