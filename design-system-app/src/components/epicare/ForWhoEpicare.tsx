'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

gsap.registerPlugin(ScrollTrigger);

// ── CONFIG (No Magic Inline) ──────────────────────────────────────────────
type AudienceKey = 'agent' | 'agency';

const AUDIENCE_ORDER: AudienceKey[] = ['agent', 'agency'];

/** Brand accent per panel — Agent = blue, Agency = orange. */
const ACCENT: Record<AudienceKey, string> = {
  agent: 'var(--color-brand-blue)',
  agency: 'var(--color-brand-orange)',
};

/** Panel background image (cover). */
const HERO: Record<AudienceKey, string> = {
  agent: asset('/Files/for-who/agent-hero.jpeg'),
  agency: asset('/Files/for-who/agency-hero.jpeg'),
};

/**
 * @description "Choose your path" — an immersive dual-panel audience split. Two full-bleed
 * cinematic panels (Agent = blue, Agency = orange) sit side by side; each is a cover image
 * under a scrim with oversized kinetic type. Hovering a panel expands it and reveals its
 * capabilities in a glass sheet over the image; the other yields. A centered headline is
 * born through a mask, panels rise with a clip-path curtain and their giant numerals
 * parallax on scroll. Bimodal, tokenized, 60fps, reduced-motion aware; stacks on mobile.
 */
export default function ForWhoEpicare() {
  const t = useTranslations('landingV2.forWho');
  const sectionRef = useRef<HTMLElement>(null);

  const audiences = AUDIENCE_ORDER.map((key, i) => ({
    key,
    index: `0${i + 1}`,
    title: t(`${key}Title`),
    kicker: t(`${key}Kicker`),
    items: t.raw(`${key}Items`) as string[],
    heroAlt: t(`${key}Img1Alt`),
  }));

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.fw-head, .fw-line, .fw-panel, .fw-num', { opacity: 1, y: 0, yPercent: 0 });
        gsap.set('.fw-curtain', { clipPath: 'inset(0% 0% 0% 0%)' });
        return;
      }
      // Headline text-birth.
      gsap.fromTo('.fw-line', { yPercent: 118 },
        { yPercent: 0, duration: 1.15, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
      gsap.fromTo('.fw-head', { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

      // Panels — clip-path curtain reveal.
      gsap.utils.toArray<HTMLElement>('.fw-curtain').forEach((panel, i) => {
        gsap.fromTo(panel, { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.out', delay: i * 0.12,
            scrollTrigger: { trigger: '.fw-stage', start: 'top 80%' } });
      });

      // Giant numerals — parallax + cover image drift.
      gsap.utils.toArray<HTMLElement>('.fw-num').forEach((num) => {
        gsap.fromTo(num, { yPercent: 20 }, { yPercent: -20, ease: 'none',
          scrollTrigger: { trigger: '.fw-stage', start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>('.fw-cover').forEach((img) => {
        gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] pt-0 pb-section-sm md:pb-section-lg transition-colors duration-500"
    >
      {/* ── CENTERED HEADER ── */}
      <div className="max-w-section-lg mx-auto w-full px-gutter-sm md:px-gutter-md pt-section-sm md:pt-section-md">
        <header className="text-center max-w-4xl mx-auto">
          <span className="fw-head block text-overline text-[var(--color-brand-blue)] mb-6">
            {t('overline')}
          </span>
          <h2 className="text-display-xl font-semibold tracking-tight leading-[1] text-[var(--color-text-Black-100)] dark:text-white">
            <span className="block overflow-hidden pb-static-xs">
              <span className="fw-line inline-block">{t('titleLine1')}</span>
            </span>
            <span className="block overflow-hidden pb-static-xs">
              <span className="fw-line inline-block text-[var(--color-text-muted)]">{t('titleLine2')}</span>
            </span>
          </h2>
          <p className="fw-head text-body-lg font-light text-[var(--color-text-Black-100)]/60 dark:text-white/55 mt-8 mx-auto max-w-2xl">
            {t('desc')}
          </p>
        </header>
      </div>

      {/* ── DUAL PANELS ── */}
      <div className="fw-stage mt-14 md:mt-20 flex flex-col lg:flex-row w-full max-w-section-lg mx-auto gap-3 px-gutter-sm md:px-gutter-md">
        {audiences.map((aud) => {
          const accent = ACCENT[aud.key];
          return (
            <article
              key={aud.key}
              className="fw-panel fw-curtain group relative overflow-hidden rounded-3xl h-[62vh] lg:h-[82vh] flex-1 lg:grow lg:basis-0 lg:hover:grow-[1.9] transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex-grow]"
            >
              {/* Cover image + parallax */}
              <img src={HERO[aud.key]} alt={aud.heroAlt} loading="lazy"
                className="fw-cover absolute inset-0 w-full h-full object-cover object-center scale-[1.15]" />

              {/* Scrims — dark base + brand tint that intensifies on hover */}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
              <div aria-hidden="true"
                className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700 mix-blend-soft-light"
                style={{ background: `linear-gradient(160deg, ${accent} 0%, transparent 60%)` }} />

              {/* Giant index numeral — top */}
              <span aria-hidden="true"
                className="fw-num absolute top-6 right-7 z-10 text-display-2xl font-semibold tabular-nums leading-none text-[var(--color-text-White-100)]/15">
                {aud.index}
              </span>

              {/* Content — anchored bottom */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-static-xl md:p-static-2xl flex flex-col">
                <span className="inline-flex items-center gap-2 text-overline text-[var(--color-text-White-100)]/70 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                  {aud.kicker}
                </span>
                <h3 className="text-display-sm md:text-display font-semibold tracking-tight text-[var(--color-text-White-100)]">
                  {aud.title}
                </h3>

                {/* Capabilities — hidden until this panel is hovered/expanded */}
                <ul className="mt-6 max-w-xl grid gap-y-0 opacity-0 translate-y-6 max-h-0 overflow-hidden
                  group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-[34rem]
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  {aud.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 py-2.5 border-t border-[var(--color-text-White-100)]/15">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                        className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accent }}>
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                      <span className="text-body-sm font-light text-[var(--color-text-White-100)]/85">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover hint (fades out on hover) */}
                <span className="mt-5 text-caption text-[var(--color-text-White-100)]/50 opacity-100 group-hover:opacity-0 transition-opacity duration-300 hidden lg:block">
                  {t('hoverHint')}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
