import ProductSpotlightEpicare from "@/components/epicare/ProductSpotlightEpicare";

// ── RUTA TEMPORAL DE INSPECCIÓN (light) ──
// BORRAR al terminar la revisión visual: no debe llegar a producción.
export default function PreviewSpotlight() {
  return (
    <main className="flex flex-col w-full bg-[var(--color-surface-BG-white)]">
      <ProductSpotlightEpicare variant="eppigo" />
      <ProductSpotlightEpicare variant="solutions" />
    </main>
  );
}
