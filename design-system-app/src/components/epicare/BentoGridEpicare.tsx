"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { 
  SectionLiveEditor, 
  GridLiveEditor, 
  TextLiveEditor, 
  LiveEditorCopier 
} from "@/components/utils/LiveEditor";

export default function BentoGridEpicare() {
  const t = useTranslations('landingV2.bento');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Layered Unveiling: Cards swimming up
      gsap.fromTo(".bento-card", 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.96
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <LiveEditorCopier />
      <SectionLiveEditor 
        id="bento-section"
        initialPy="pt-0 pb-section-md"
        initialPx="px-gutter-md"
        initialMaxW="max-w-section-lg"
        className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] z-20 transition-colors duration-500"
      >
        {/* CSS Grid (Blueprint Map Style) */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-12 auto-rows-auto border-l border-t border-[var(--color-border-Strokes-default)] w-full">
          
          {/* Fila 1 */}
          <GridLiveEditor 
            id="bento-card-1" 
            initialStart={1}
            initialSpan={5} 
            initialRowStart={1}
            initialMSpan={12}
            className="bento-card relative overflow-hidden border-r border-b border-[var(--color-border-Strokes-default)] bg-transparent hover:bg-black/[0.02] dark:hover:bg-[var(--color-surface-BG-base-Opacity)] transition-colors duration-500 h-[400px] group will-change-transform"
          >
            <div className="absolute inset-0 dot-pattern opacity-10 dark:opacity-30 pointer-events-none" />
            <ArrowIcon className="absolute top-static-lg left-static-lg w-4 h-4 text-black/50 dark:text-[var(--color-text-muted)] group-hover:text-[var(--color-text-Black-100)] dark:group-hover:text-[var(--color-text-White-100)] transition-colors duration-500" />
            <div className="absolute bottom-static-lg left-static-lg flex flex-col gap-2">
              <TextLiveEditor id="card-1-title" initialToken="text-h2" as="h3" className="font-medium text-[var(--color-text-Black-100)] dark:text-[var(--color-text-White-100)] tracking-tight">
                {t('itemDiTitle')}
              </TextLiveEditor>
              <TextLiveEditor id="card-1-desc" initialToken="text-body-xs" as="p" className="text-black/60 dark:text-[var(--color-text-muted)] font-light max-w-[300px] leading-relaxed">
                {t('itemDiDesc')}
              </TextLiveEditor>
            </div>
          </GridLiveEditor>

          <GridLiveEditor 
            id="bento-card-2" 
            initialStart={6}
            initialSpan={7} 
            initialRowStart={1}
            initialMSpan={12}
            className="bento-card relative overflow-hidden border-r border-b border-[var(--color-border-Strokes-default)] bg-transparent hover:bg-black/[0.02] dark:hover:bg-[var(--color-surface-BG-base-Opacity)] transition-colors duration-500 h-[400px] will-change-transform"
          >
            <div className="absolute inset-0 dot-pattern opacity-10 dark:opacity-30 pointer-events-none" />
          </GridLiveEditor>

          {/* Fila 2 */}
          <GridLiveEditor 
            id="bento-card-3" 
            initialStart={1}
            initialSpan={8} 
            initialRowStart={2}
            initialMSpan={12}
            justify="center"
            align="center"
            className="bento-card relative overflow-hidden border-r border-b border-[var(--color-border-Strokes-default)] bg-transparent hover:bg-black/[0.02] dark:hover:bg-[var(--color-surface-BG-base-Opacity)] transition-colors duration-500 h-[400px] will-change-transform group"
          >
            {/* Ilustration Placeholder */}
            <div className="w-[70%] h-[60%] border border-[var(--color-border-Strokes-default)] rounded-xl flex items-center justify-center bg-gradient-to-tr from-black/[0.02] dark:from-[var(--color-surface-BG-base-Opacity)] to-transparent group-hover:scale-105 transition-transform duration-1000 ease-out">
              <TextLiveEditor id="card-3-text" initialToken="text-body-xs" className="text-black/30 dark:text-[var(--color-text-disabled)]">
                Wireframe Illustration
              </TextLiveEditor>
            </div>
          </GridLiveEditor>

          <GridLiveEditor 
            id="bento-card-4" 
            initialStart={9}
            initialSpan={4} 
            initialRowStart={2}
            initialMSpan={12}
            className="bento-card relative overflow-hidden border-r border-b border-[var(--color-border-Strokes-default)] bg-transparent hover:bg-black/[0.02] dark:hover:bg-[var(--color-surface-BG-base-Opacity)] transition-colors duration-500 h-[400px] group will-change-transform"
          >
            <div className="absolute inset-0 dot-pattern opacity-10 dark:opacity-30 pointer-events-none" />
            <ArrowIcon className="absolute top-static-lg right-static-lg w-4 h-4 text-black/50 dark:text-[var(--color-text-muted)] group-hover:text-[var(--color-text-Black-100)] dark:group-hover:text-[var(--color-text-White-100)] transition-colors duration-500" />
            <div className="absolute bottom-static-lg left-static-lg flex flex-col gap-2">
              <TextLiveEditor id="card-4-title" initialToken="text-h2" as="h3" className="font-medium text-[var(--color-text-Black-100)] dark:text-[var(--color-text-White-100)] tracking-tight">
                {t('itemOmsTitle')}
              </TextLiveEditor>
              <TextLiveEditor id="card-4-desc" initialToken="text-body-xs" as="p" className="text-black/60 dark:text-[var(--color-text-muted)] font-light max-w-[220px] leading-relaxed">
                {t('itemOmsDesc')}
              </TextLiveEditor>
            </div>
          </GridLiveEditor>

          {/* Fila 3 */}
          {[1, 2, 3].map((item, i) => (
            <GridLiveEditor 
              key={item} 
              id={`bento-card-${5+i}`} 
              initialStart={1 + (i * 4)}
              initialSpan={4} 
              initialRowStart={3}
              initialMSpan={12}
              flexDir="column"
              justify="flex-end"
              align="center"
              className="bento-card relative overflow-hidden border-r border-b border-[var(--color-border-Strokes-default)] bg-transparent hover:bg-black/[0.02] dark:hover:bg-[var(--color-surface-BG-base-Opacity)] transition-colors duration-500 h-[300px] group will-change-transform"
            >
              <ArrowIcon className="absolute top-static-lg left-static-lg w-4 h-4 text-black/50 dark:text-[var(--color-text-muted)] group-hover:text-[var(--color-text-Black-100)] dark:group-hover:text-[var(--color-text-White-100)] transition-colors duration-500 z-10" />
              <div className="w-[80%] h-[60%] border border-[var(--color-border-Strokes-default)] rounded-t-xl flex items-center justify-center bg-gradient-to-t from-black/[0.02] dark:from-[var(--color-surface-BG-base-Opacity)] to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <TextLiveEditor id={`card-${5+i}-text`} initialToken="text-body-xs" className="text-black/30 dark:text-[var(--color-text-disabled)]">
                  Wireframe
                </TextLiveEditor>
              </div>
            </GridLiveEditor>
          ))}

        </div>
      </SectionLiveEditor>

      <style>{`
        .dot-pattern {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 16px 16px;
        }
      `}</style>
    </>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}
