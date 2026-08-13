import ProductSpotlightEpicare from "@/components/epicare/ProductSpotlightEpicare";

// ── RUTA TEMPORAL DE INSPECCIÓN (Solutions, light) — BORRAR al terminar. ──
export default function PreviewSolutions() {
  return (
    <main className="flex flex-col w-full bg-[var(--color-surface-BG-white)]">
      <ProductSpotlightEpicare variant="solutions" />
    </main>
  );
}
