import LoaderEpicare from "@/components/epicare/LoaderEpicare";
import LicensingHeroEpicare from "@/components/epicare/LicensingHeroEpicare";
import InteractiveGlobeEpicare from "@/components/epicare/InteractiveGlobeEpicare";
import LicensingGridEpicare from "@/components/epicare/LicensingGridEpicare";
import FooterEpicare from "@/components/epicare/FooterEpicare";
import { SITE_URL } from "../layout";

// Note: The rest of the sections (Corporate Info, Map, Grid) will be imported here as they are built.

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/licensing/#webpage`,
  "url": `${SITE_URL}/licensing`,
  "name": "Epicare Licensing",
  "description": "Epicare Insurance holds the necessary state licenses to conduct insurance business.",
  "inLanguage": "en-US"
};

export default function LicensingPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* ── S00 · Loader ── */}
      <div className="w-full order-1"><LoaderEpicare /></div>
      
      {/* ── S01 · Licensing Hero ── */}
      <div className="w-full order-2"><LicensingHeroEpicare /></div>
      
      {/* ── S02 · Interactive Globe (Map) ── */}
      <div id="interactive-globe" className="w-full order-3 relative z-10"><InteractiveGlobeEpicare /></div>
      
      {/* ── S03 · Licensing Grid ── */}
      <div id="licensing-grid" className="w-full order-4 relative z-10"><LicensingGridEpicare /></div>
      
      {/* ── S04 · Footer ── */}
      <div className="w-full order-[15]"><FooterEpicare /></div>
    </main>
  );
}
