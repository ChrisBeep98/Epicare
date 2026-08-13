"use client";

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { asset } from '@/lib/asset';
import { EASE, DUR, STAGGER, REVEAL, SCRUB, TRIGGER, EASE_CSS } from '@/lib/motion';
import SmartVideo from './SmartVideo';

/**
 * PRODUCT SPOTLIGHT — Eppigo · Agency Solutions
 *
 * @description **Banda full-bleed: el vídeo va de borde a borde y ocupa la
 * mayor parte del viewport.** El texto se reduce al mínimo — etiqueta, titular
 * corto, tres marcas en mono y CTA. Ningún párrafo.
 *
 * TÉCNICA-FIRMA: curtain vertical sobre banda full-bleed + capacidades como
 * marcas mono. Libre en el mapa: el Bento usa cover-flow 3D pineado con orbe
 * morph y PeopleReveal usa slats + marquee + velocity skew.
 *
 * SIN PIN. Presupuesto agotado (Hero, BentoGrid, WhyEpicare) y la ley 3 del arco
 * prohíbe pinear una lista de features. Esta sección es un valle.
 *
 * REGLAS DEL ASSET (verificadas abriendo los archivos, no supuestas):
 *  · Ilustraciones isométricas sobre fondo sólido igual al de la página; light
 *    1:1 (1080²), dark 16:9 (1920×1080).
 *  · A full-bleed hay que RECORTAR, así que va `object-cover` con el encuadre
 *    anclado al centro, que es donde vive la escena en los cuatro archivos.
 *  · Nada de tinte detrás ni encima: el arte trae fondo opaco y cualquier color
 *    detrás delata el rectángulo.
 *  · El poster va como `<img>` ansioso debajo del vídeo: SmartVideo arranca en
 *    `preload="none"` y sin él la banda se ve vacía hasta que descargue.
 *  · Ningún tween de entrada toca `opacity` ni hace `immediateRender`: una
 *    animación decorativa no puede dejar la banda invisible si el trigger falla.
 *
 * CTA: apunta a `#unete` (sección Cómo unirse), no a `href="#"`. En neutro de
 * alto contraste porque el naranja como botón está reservado al cierre.
 *
 * @example <ProductSpotlightEpicare variant="eppigo" />
 */

export type SpotlightVariant = 'eppigo' | 'solutions';

type SpotlightConfig = {
  /** Acento crudo: solo superficies NO-texto (dot, reglas). */
  accentVar: string;
  /** Única variante apta para texto (bimodal, contraste corregido). */
  accentTextVar: string;
  videoLight: string;
  videoDark: string;
  posterLight: string;
  posterDark: string;
};

const SPOTLIGHTS: Record<SpotlightVariant, SpotlightConfig> = {
  eppigo: {
    accentVar: '--color-brand-orange',
    accentTextVar: '--color-accent-text-muted',
    videoLight: asset('/Files/Features/Eppigo_Light_Final.mp4'),
    videoDark: asset('/Files/Features/Eppigo_Dark_Final.mp4'),
    posterLight: asset('/Files/Features/posters/Eppigo_Light_Final.webp'),
    posterDark: asset('/Files/Features/posters/Eppigo_Dark_Final.webp'),
  },
  solutions: {
    accentVar: '--color-brand-blue',
    accentTextVar: '--color-text-accent-blue',
    videoLight: asset('/Files/Features/Solutions_Light_Final.mp4'),
    videoDark: asset('/Files/Features/Solutions_Dark_Final.mp4'),
    posterLight: asset('/Files/Features/posters/Solutions_Light_Final.webp'),
    posterDark: asset('/Files/Features/posters/Solutions_Dark_Final.webp'),
  },
};

const SPEC_KEYS = ['f1', 'f2', 'f3'] as const;

const ArrowUR = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export default function ProductSpotlightEpicare({ variant }: { variant: SpotlightVariant }) {
  const t = useTranslations(`landingV2.spotlight.${variant}`);
  const { accentVar, accentTextVar, videoLight, videoDark, posterLight, posterDark } =
    SPOTLIGHTS[variant];
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Lenis es global y ya está sincronizado con el ticker de GSAP.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ scrollTrigger: { trigger: sectionRef.current, start: TRIGGER.standard } })
          // La banda se abre como una cortina vertical + contra-zoom (§3).
          .from('.sp-band', {
            clipPath: 'inset(100% 0 0 0)',
            duration: DUR.slow,
            ease: EASE.inOut,
            immediateRender: false,
          })
          .from(
            '.sp-band img, .sp-band video',
            { scale: 1.1, duration: DUR.slow, ease: EASE.out, immediateRender: false },
            '<'
          )
          .from('.sp-rail', { y: -REVEAL.sm, opacity: 0, duration: DUR.base, ease: EASE.out }, '-=0.9')
          // El titular nace por palabra (§1).
          .from(
            '.sp-line',
            {
              yPercent: REVEAL.birthPercent,
              duration: DUR.birth,
              ease: EASE.dramatic,
              stagger: STAGGER.base,
            },
            '-=0.8'
          )
          .from(
            '.sp-mark',
            { y: REVEAL.sm, opacity: 0, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.base },
            '-=0.9'
          )
          .from('.sp-cta', { y: REVEAL.sm, opacity: 0, duration: DUR.base, ease: EASE.out }, '-=0.5');

        // Dos velocidades (§2): la banda deriva más lento que la lectura.
        gsap.fromTo(
          '.sp-band-inner',
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: EASE.none,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: TRIGGER.parallaxStart,
              end: TRIGGER.parallaxEnd,
              scrub: SCRUB.smooth,
              invalidateOnRefresh: true,
            },
          }
        );

        // Vida latente (§4), pausada fuera de viewport.
        const pulse = gsap.to('.sp-live', {
          opacity: 0.2,
          duration: 1.8,
          ease: EASE.breath,
          yoyo: true,
          repeat: -1,
          paused: true,
        });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: TRIGGER.parallaxStart,
          end: TRIGGER.parallaxEnd,
          onToggle: (self) => (self.isActive ? pulse.play() : pulse.pause()),
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={variant}
      ref={sectionRef}
      // Sin `justify-center`: centrar dentro de un `overflow-hidden` que ya no
      // da de sí empuja el pie fuera de la caja y lo recorta. El contenido fluye
      // de arriba abajo y la sección crece si hace falta.
      className="relative w-full min-h-dvh overflow-hidden bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500 flex flex-col py-section-xs"
    >
      {/* ── BANDA FULL-BLEED ── de borde a borde, sin contenedor ni márgenes */}
      {/* Banda alta a propósito: cuanto más se acerca la proporción de la banda
          a la del asset, menos recorta el `object-cover`. A 62vh se comía los
          tejados; a 72vh la escena entra casi entera. */}
      <div className="sp-band relative w-full h-[54vh] md:h-[66vh] overflow-hidden">
        {/* Capa con sobreancho mínimo: solo el necesario para que el parallax
            no descubra borde. Cada punto de escala es recorte extra. */}
        <div className="sp-band-inner absolute inset-0 scale-[1.04]">
          <img
            src={posterLight}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-center dark:hidden"
          />
          <img
            src={posterDark}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-center hidden dark:block"
          />
          <SmartVideo
            src={videoLight}
            poster={posterLight}
            className="absolute inset-0 w-full h-full object-cover object-center dark:hidden"
          />
          <SmartVideo
            src={videoDark}
            poster={posterDark}
            className="absolute inset-0 w-full h-full object-cover object-center hidden dark:block"
          />
        </div>
      </div>

      {/* ── PIE ── lo mínimo: etiqueta, titular, tres marcas y CTA. Sin párrafos. */}
      <div className="max-w-section-lg px-gutter-sm md:px-gutter-md pt-section-xs flex flex-col lg:flex-row lg:items-end lg:justify-between gap-fluid-sm">

        <div className="min-w-0">
          <span className="sp-rail flex items-center gap-2 text-meta uppercase text-[var(--color-text-muted)]">
            <span
              aria-hidden="true"
              className="sp-live w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: `var(${accentVar})` }}
            />
            {t('name')}
          </span>

          <h2 className="mt-static-sm text-display md:text-display-lg text-[var(--color-text-Black-100)] dark:text-[var(--color-text-White-100)] transition-colors duration-500 max-w-[16ch]">
            {t('title')
              .split(' ')
              .map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span className="sp-line inline-block">{word}&nbsp;</span>
                </span>
              ))}
          </h2>

          {/* Las tres capacidades, reducidas a marcas. Las descripciones largas
              salieron: en una banda full-bleed compiten con el producto. */}
          <ul className="mt-static-md flex flex-wrap items-center gap-x-5 gap-y-2">
            {SPEC_KEYS.map((key, i) => (
              <li key={key} className="sp-mark flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="text-meta tabular-nums"
                  style={{ color: `var(${accentTextVar})` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-ui-label text-[var(--color-text-Black-100)] dark:text-[var(--color-text-White-100)] transition-colors duration-500">
                  {t(`${key}Title`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA ── destino real (#unete) */}
        <a
          href="#unete"
          className="sp-cta group shrink-0 inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 bg-[var(--color-text-Black-100)] text-[var(--color-text-White-100)] dark:bg-[var(--color-text-White-100)] dark:text-[var(--color-text-Black-100)] text-ui-label transition-transform duration-[450ms] hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ transitionTimingFunction: EASE_CSS.ui, outlineColor: `var(${accentVar})` }}
        >
          {t('cta')}
          <span className="relative w-8 h-8 rounded-full bg-white/15 dark:bg-black/10 flex items-center justify-center overflow-hidden shrink-0">
            <ArrowUR className="absolute w-4 h-4 transition-transform duration-[400ms] group-hover:translate-x-6 group-hover:-translate-y-6" />
            <ArrowUR className="absolute w-4 h-4 -translate-x-6 translate-y-6 transition-transform duration-[400ms] group-hover:translate-x-0 group-hover:translate-y-0" />
          </span>
        </a>
      </div>
    </section>
  );
}
