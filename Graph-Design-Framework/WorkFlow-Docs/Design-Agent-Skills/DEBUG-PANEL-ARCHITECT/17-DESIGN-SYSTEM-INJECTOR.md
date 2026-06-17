# 🎨 17. Design System Injector (Mandatory UI Sync)

**MANDATO ESTRICTO:** Cada vez que el Agente cree un panel de debug, DEBE OBLIGATORIAMENTE incluir controles (`<select>`, sliders, etc.) para **TODOS** los tokens existentes en el inventario del Design System (`Design-System.md`). El usuario debe poder alterar colores, tipografías, anchos máximos y espaciados dinámicamente.

## 1. 🧪 Inyección de Estado (React State)
Incluye estos estados en el bloque de inicialización:

```tsx
// Tokens de Tipografía
const [__dbgTextDisplay, __setDbgTextDisplay] = useState('text-display-sm');
const [__dbgTextBody, __setDbgTextBody] = useState('text-body');

// Tokens de Espaciado (Zero Px Policy)
const [__dbgPxGutter, __setDbgPxGutter] = useState('px-gutter-md');
const [__dbgPySection, __setDbgPySection] = useState('py-section-md');
const [__dbgGapFluid, __setDbgGapFluid] = useState('gap-fluid-md');

// Max Widths
const [__dbgMaxWidth, __setDbgMaxWidth] = useState('var(--max-w-section-lg)');

// Colores (Backgrounds, Borders, Textos)
const [__dbgBgColor, __setDbgBgColor] = useState('var(--color-surface-BG-1)');
const [__dbgTextColor, __setDbgTextColor] = useState('var(--color-text-primary)');
const [__dbgBorderColor, __setDbgBorderColor] = useState('var(--color-border-Strokes-default)');
```

## 2. 🎛️ Inyección de Controles UI (Tabs: Layout & Visuals)
Agrega estos fragmentos de JSX dentro de los Tabs correspondientes en tu Panel:

### En el Tab `visuals` (Colores y Tipografía):
```tsx
{/* Selector de Tipografías */}
<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Títulos (Display / H)</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgTextDisplay} onChange={e => __setDbgTextDisplay(e.target.value)}>
    <option value="text-display-3xl">text-display-3xl (Giant)</option>
    <option value="text-display-2xl">text-display-2xl (Huge)</option>
    <option value="text-display-xl">text-display-xl</option>
    <option value="text-display-lg">text-display-lg</option>
    <option value="text-display-sm">text-display-sm</option>
    <option value="text-h1">text-h1</option>
    <option value="text-h2">text-h2</option>
    <option value="text-h3">text-h3</option>
  </select>
</div>

{/* Selector de Colores */}
<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Fondo (Surface BG)</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgBgColor} onChange={e => __setDbgBgColor(e.target.value)}>
    <option value="var(--color-surface-BG-1)">BG-1 (Main)</option>
    <option value="var(--color-surface-BG-2)">BG-2</option>
    <option value="var(--color-surface-BG-3)">BG-3</option>
    <option value="var(--color-surface-BG-4)">BG-4</option>
    <option value="var(--color-surface-BG-base)">BG-Base</option>
    <option value="var(--color-action-primary-bg)">Action Primary BG</option>
    <option value="var(--color-brand-blue)">Brand Blue</option>
    <option value="var(--color-brand-dark)">Brand Dark</option>
  </select>
</div>
```

### En el Tab `layout` (Espaciado y Max Width):
```tsx
{/* Selector de Max Width */}
<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Max Width Global</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgMaxWidth} onChange={e => __setDbgMaxWidth(e.target.value)}>
    <option value="var(--max-w-section-sm)">sm (768px)</option>
    <option value="var(--max-w-section-md)">md (1024px)</option>
    <option value="var(--max-w-section-lg)">lg (1280px)</option>
    <option value="var(--max-w-section-xl)">xl (1536px)</option>
    <option value="100%">100% (Fluid)</option>
  </select>
</div>

{/* Selector de Paddings / Gaps */}
<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Gutter (Padding X)</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgPxGutter} onChange={e => __setDbgPxGutter(e.target.value)}>
    <option value="px-gutter-sm">px-gutter-sm</option>
    <option value="px-gutter-md">px-gutter-md</option>
    <option value="px-gutter-lg">px-gutter-lg</option>
    <option value="px-gutter-xl">px-gutter-xl</option>
  </select>
</div>

<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Gaps Flex/Grid</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgGapFluid} onChange={e => __setDbgGapFluid(e.target.value)}>
    <option value="gap-fluid-xs">gap-fluid-xs</option>
    <option value="gap-fluid-sm">gap-fluid-sm</option>
    <option value="gap-fluid-md">gap-fluid-md</option>
    <option value="gap-fluid-lg">gap-fluid-lg</option>
  </select>
</div>
```

## 3. 📦 Aplicación en el Componente
Aplica el estado dinámico al elemento objetivo interpolando las clases y estilos:

```tsx
<div 
  className={`w-full ${__dbgPxGutter} ${__dbgPySection}`}
  style={{ backgroundColor: __dbgBgColor }}
>
  <div 
    className={`mx-auto flex flex-col ${__dbgGapFluid}`}
    style={{ maxWidth: __dbgMaxWidth }}
  >
    <h1 
      className={`${__dbgTextDisplay}`}
      style={{ color: __dbgTextColor }}
    >
      Texto del Componente
    </h1>
  </div>
</div>
```

> **IMPORTANTE:** Si el usuario requiere testear *otros* colores del inventario (ej. los bordes de status, acentos, u overlays), el Agente DEBE agregarlos dinámicamente en las opciones del `<select>`.
