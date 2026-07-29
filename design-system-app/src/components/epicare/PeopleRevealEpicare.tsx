'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Professional bezier for the slat reveal — smooth ease-in-out (cubic 0.65,0.05,0.36,1).
const REVEAL_EASE = 'M0,0 C0.65,0.05 0.36,1 1,1';

// ── CONFIG (No Magic Inline) ──────────────────────────────────────────────
/** PLACEHOLDER — a fitting people/team photo. Swap for the real one when ready. */
const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80';
/** Times the statement repeats inside one marquee group. */
const REPEATS = Array.from({ length: 5 });
/** Vertical slats in the full-bleed reveal mask. */
const SLATS = Array.from({ length: 9 });

/**
 * @description "Kinetic Marquee Portrait" — a full-bleed people band. Interlocking
 * slats (alternating up/down, from the centre) collapse on scroll to unveil the
 * photo, while the statement runs as an infinite marquee ON TOP, blended into the
 * image and skewing with scroll velocity. Bimodal, reduced-motion aware.
 */
export default function PeopleRevealEpicare() {
  const t = useTranslations('landingV2.peopleReveal');
  const sectionRef = useRef<HTMLElement>(null);

  const Group = ({ hidden = false }: { hidden?: boolean }) => (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {REPEATS.map((_, i) => (
        <span key={i} className="flex items-center">
          <span className="px-[0.15em]">{t('statement')}</span>
          <span className="px-[0.15em] text-[var(--color-brand-blue)]">&#10022;</span>
        </span>
      ))}
    </div>
  );

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.pr-slat', { scaleY: 0, opacity: 0 });
        return;
      }

      // Full-bleed photo — interlocking slat reveal: bars collapse AND fade out.
      // Long scroll window + pro bezier + high scrub = slow, buttery, no jumps.
      const proReveal = CustomEase.create('proReveal', REVEAL_EASE);
      
      // Filtrar sólo los cuadritos (slats) visibles para que el cálculo del centro ('from: center') sea perfecto
      const visibleSlats = gsap.utils.toArray('.pr-slat').filter((el: any) => getComputedStyle(el).display !== 'none');

      gsap.to(visibleSlats, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: (i: number) => (i % 2 === 0 ? 'top center' : 'bottom center'),
        ease: proReveal,
        stagger: { each: 0.07, from: 'center', ease: proReveal },
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', end: '+=85%', scrub: 3 },
      });

      // Photo — very gentle parallax drift, smoothed.
      gsap.fromTo('.pr-img',
        { yPercent: -5 },
        {
          yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
        }
      );

      // Marquee — driven by scroll (scrub), very subtle drift and heavily smoothed.
      gsap.fromTo('.pr-marquee-inner',
        { xPercent: 0 },
        {
          xPercent: -12, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 3 },
        }
      );

      // Velocity skew — barely perceptible, just a touch of life.
      const proxy = { skew: 0 };
      const setSkew = gsap.quickSetter('.pr-marquee-inner', 'skewX', 'deg');
      const clamp = gsap.utils.clamp(-3.5, 3.5);
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = clamp(self.getVelocity() / -1000);
          if (Math.abs(v) > Math.abs(proxy.skew)) {
            proxy.skew = v;
            gsap.to(proxy, {
              skew: 0, duration: 1, ease: 'power3', overwrite: true,
              onUpdate: () => setSkew(proxy.skew),
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] z-20 transition-colors duration-500 h-[72vh] md:h-screen"
    >
      {/* Full-bleed photo (PLACEHOLDER — replace with the real people photo) */}
      <img
        src={PLACEHOLDER_IMG}
        alt={t('imageAlt')}
        className="pr-img absolute inset-0 w-full h-full object-cover scale-[1.18] will-change-transform"
      />

      {/* Slat reveal mask — page-coloured bars that collapse to unveil the photo */}
      <div className="absolute inset-0 flex pointer-events-none z-10" aria-hidden="true">
        {SLATS.map((_, i) => (
          <div
            key={i}
            // En móvil solo dejamos 4 columnas vivas. El resto se esconden y GSAP las ignora en el array.
            className={`pr-slat flex-1 h-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] will-change-transform ${
              i >= 4 ? 'hidden md:block' : 'block'
            }`}
          />
        ))}
      </div>

      {/* Kinetic marquee ON TOP of the image, along the bottom */}
      <div className="absolute inset-x-0 bottom-6 md:bottom-10 z-20 flex whitespace-nowrap pointer-events-none select-none mix-blend-difference">
        <div className="pr-marquee-inner flex will-change-transform text-display-2xl md:text-display-3xl tracking-tighter leading-none text-white">
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
