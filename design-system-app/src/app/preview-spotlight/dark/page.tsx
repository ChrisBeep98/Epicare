import ProductSpotlightEpicare from "@/components/epicare/ProductSpotlightEpicare";

// ── RUTA TEMPORAL DE INSPECCIÓN (dark) ──
// La app activa dark con la clase `.dark`, así que aquí se fuerza en un
// envoltorio. BORRAR junto con la ruta light al terminar la revisión.
export default function PreviewSpotlightDark() {
  return (
    <div className="dark">
      <main className="flex flex-col w-full bg-[var(--color-surface-BG-black)]">
        <ProductSpotlightEpicare variant="eppigo" />
        <ProductSpotlightEpicare variant="solutions" />
      </main>
    </div>
  );
}
