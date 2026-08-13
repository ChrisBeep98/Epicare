import ProductSpotlightEpicare from "@/components/epicare/ProductSpotlightEpicare";

// ── RUTA TEMPORAL DE INSPECCIÓN (Solutions, dark) — BORRAR al terminar. ──
export default function PreviewSolutionsDark() {
  return (
    <div className="dark">
      <main className="flex flex-col w-full bg-[var(--color-surface-BG-black)]">
        <ProductSpotlightEpicare variant="solutions" />
      </main>
    </div>
  );
}
