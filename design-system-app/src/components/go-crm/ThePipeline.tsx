import React from "react";
import { useTranslations } from "next-intl";

export default function ThePipeline() {
  const t = useTranslations("goCrm.pipeline");

  return (
    <section className="relative w-full min-h-[80vh] bg-[var(--color-surface-BG-base)] border-y border-[var(--color-border-Strokes-default)] overflow-hidden flex items-center">
      
      <div className="w-full max-w-section-xl mx-auto px-gutter-md py-section-md flex flex-col md:flex-row items-center gap-fluid-lg">
        
        {/* Left Column: Typography */}
        <div className="w-full md:w-5/12 flex flex-col relative z-10 shrink-0">
          <div className="flex items-center gap-static-sm mb-static-md">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)]" />
            <p className="text-overline text-[var(--color-text-accent-blue)] uppercase">{t("overline")}</p>
          </div>
          
          <h2 className="text-display-lg font-bold tracking-tighter leading-[0.9] text-[var(--color-text-primary)]">
            {t("headline")}
          </h2>
          
          <p className="mt-static-lg text-body-lg text-[var(--color-text-secondary)] max-w-md">
            {t("description")}
          </p>
        </div>

      </div>

      {/* Right Column: Dashboard Image (Desktop - Flush to right edge) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[85vw] md:w-[55vw] lg:w-[50vw] h-[60vh] md:h-[70vh] rounded-l-2xl border-y border-l border-[var(--color-border-Strokes-default)] shadow-elevation-4 bg-[var(--color-surface-BG-1)] overflow-hidden hidden md:block z-0">
         {/* Simple Browser Chrome */}
         <div className="absolute top-0 left-0 right-0 h-10 bg-[var(--color-surface-BG-2)] border-b border-[var(--color-border-Strokes-default)] flex items-center px-gutter-sm gap-static-xs z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-surface-BG-4)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-surface-BG-4)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-surface-BG-4)]" />
         </div>
         
         {/* Image */}
         <div className="absolute inset-0 pt-10">
            <img 
              src="/pipeline_ui_light.jpg" 
              alt="Pipeline UI" 
              className="w-full h-full object-cover object-left-top" 
            />
         </div>
      </div>

      {/* Mobile Image (Visible only on small screens) */}
      <div className="w-full px-gutter-md pb-section-sm md:hidden mt-static-lg relative z-10">
        <div className="w-full aspect-[4/3] rounded-xl border border-[var(--color-border-Strokes-default)] shadow-elevation-3 bg-[var(--color-surface-BG-1)] overflow-hidden relative">
           <div className="absolute top-0 left-0 right-0 h-8 bg-[var(--color-surface-BG-2)] border-b border-[var(--color-border-Strokes-default)] flex items-center px-static-sm gap-static-xs z-20">
              <div className="w-2 h-2 rounded-full bg-[var(--color-surface-BG-4)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--color-surface-BG-4)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--color-surface-BG-4)]" />
           </div>
           <div className="absolute inset-0 pt-8">
              <img 
                src="/pipeline_ui_light.jpg" 
                alt="Pipeline UI" 
                className="w-full h-full object-cover object-left-top" 
              />
           </div>
        </div>
      </div>

    </section>
  );
}
