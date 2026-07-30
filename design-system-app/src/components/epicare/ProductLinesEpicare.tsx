'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── CONFIG (No Magic Inline) ──────────────────────────────────────────────
const CATEGORY_KEYS = ['cat1', 'cat2', 'cat3'] as const;

interface ProductCategory {
  /** Localized category name (e.g. "Life" / "Vida"). */
  name: string;
  /** Short editorial description of the category. */
  desc: string;
  /** Product line names (industry-standard, kept in English across locales). */
  items: string[];
  /** Localized mini-descriptions, index-aligned with `items`. */
  descs: string[];
}

/**
 * @description Editorial "Portfolio Index" section for Epicare's three core
 * insurance product lines. A 12-column layout pairs a pinned, oversized category
 * marker (giant index number + name that swaps on scroll) with a scroll-linked
 * product list that "lights up" line by line as it enters the reading zone.
 * Minimalist, bimodal (Light/Dark), tokenized, and reduced-motion aware.
 */
export default function ProductLinesEpicare() {
  const t = useTranslations('landingV2.productLines');
  const sectionRef = useRef<HTMLElement>(null);
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Build categories from the i18n dictionary ──
  const categories: ProductCategory[] = CATEGORY_KEYS.map((key) => ({
    name: t(`${key}_name`),
    desc: t(`${key}_desc`),
    items: t.raw(`${key}_items`) as string[],
    descs: t.raw(`${key}_descs`) as string[],
  }));

  // ── GSAP: header reveal + scroll-linked line light-up + active tracking ──
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>('.pl-block');

      if (reduce) {
        gsap.set('.pl-head, .pl-line, .pl-pill', { opacity: 1, y: 0, filter: 'none' });
      } else {
        // Headline text-birth (Hardware Optimized)
        gsap.fromTo('.pl-head-line', { yPercent: 118, willChange: 'transform' },
          { yPercent: 0, duration: 1.15, stagger: 0.12, ease: 'power4.out', clearProps: 'willChange',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.fromTo('.pl-head', { opacity: 0, y: 26, willChange: 'transform, opacity' },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'willChange',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

        // Per-line scroll-linked "light up" (scrollytelling reading reveal).
        gsap.utils.toArray<HTMLElement>('.pl-line').forEach((line) => {
          gsap.fromTo(line,
            { opacity: 0.18, y: 26 },
            {
              opacity: 1, y: 0, ease: 'none',
              scrollTrigger: { trigger: line, start: 'top 90%', end: 'top 55%', scrub: true },
            }
          );
        });

        // Mobile pills — staggered reveal per category group.
        gsap.utils.toArray<HTMLElement>('.pl-mgroup').forEach((group) => {
          gsap.fromTo(group.querySelectorAll('.pl-pill'),
            { opacity: 0, y: 12 },
            {
              opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: 'power3.out',
              scrollTrigger: { trigger: group, start: 'top 85%' },
            }
          );
        });
      }

      // Active-category tracking drives the giant marker (always runs).
      blocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToBlock = (i: number) => {
    blockRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] py-section-sm md:py-section-md z-20 transition-colors duration-500 px-[14px] md:px-[clamp(1.5rem,4vw,3.5rem)]"
    >
      {/* Ambient glow — circular, isolated in its own clipped layer (keeps the
          section overflow visible so the sticky left rail can pin). */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[min(90vw,760px)] aspect-square rounded-full opacity-[0.14] dark:opacity-[0.20] blur-[130px]"
          style={{ background: 'radial-gradient(circle, var(--color-brand-blue) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10 max-w-section-lg mx-auto w-full">

        {/* ── HEADER (12-col on desktop; flex column on mobile to avoid the
            12-track gap forcing an overflow on narrow phones) ── */}
        <header className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-fluid-md lg:items-end mb-16 md:mb-24">
          <div className="col-span-12 lg:col-span-8">
            <span className="pl-head block text-overline text-[var(--color-brand-blue)] mb-6">
              {t('overline')}
            </span>
            <h2 className="overflow-hidden pb-static-xs text-display-xl font-semibold tracking-tight leading-[1] text-[var(--color-text-Black-100)] dark:text-white">
              <span className="pl-head-line block">
                {t('titleLine1')} <span className="text-[var(--color-text-muted)]">{t('titleLine2')}</span>
              </span>
            </h2>
          </div>
          <p className="pl-head col-span-12 lg:col-span-4 text-body-lg font-light text-[var(--color-text-Black-100)]/60 dark:text-white/55">
            {t('desc')}
          </p>
        </header>

        {/* ── EDITORIAL INDEX (12-col on desktop; flex column on mobile) ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-fluid-md">

          {/* LEFT rail — oversized pinned category marker (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-[16vh]">
              <div className="relative min-h-[18rem]">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToBlock(i)}
                    aria-label={`Go to ${cat.name}`}
                    className={`absolute inset-x-0 top-0 flex flex-col text-left transition-all duration-700 ease-out ${
                      activeIndex === i
                        ? 'opacity-100 blur-0 translate-y-0'
                        : 'opacity-0 blur-[5px] translate-y-4 pointer-events-none'
                    }`}
                  >
                    <span className="text-display-3xl font-semibold tracking-tighter leading-[0.85] text-[var(--color-brand-blue)] tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="text-h2 font-medium tracking-tight text-[var(--color-text-Black-100)] dark:text-white mt-6">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT — product lines */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">

            {/* ── MOBILE: all categories, minimal pills ── */}
            <div className="lg:hidden flex flex-col gap-10">
              {categories.map((cat, i) => (
                <div key={i} className="pl-mgroup">
                  <div className="flex items-baseline gap-2.5 mb-4">
                    <span className="text-caption tabular-nums text-[var(--color-brand-blue)] font-medium">
                      0{i + 1}
                    </span>
                    <h3 className="text-h4 font-medium tracking-tight text-[var(--color-text-Black-100)] dark:text-white">
                      {cat.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="pl-pill inline-flex max-w-full rounded-full border border-[var(--color-border-Strokes-default)] px-3.5 py-2 text-body-sm font-medium tracking-tight text-[var(--color-text-Black-100)]/80 dark:text-white/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── DESKTOP: scroll-linked editorial lists ── */}
            <div className="hidden lg:block">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  ref={(el) => { blockRefs.current[i] = el; }}
                  className="pl-block min-h-[68vh] flex flex-col justify-start pt-2 scroll-mt-[14vh]"
                >
                  <ul>
                    {cat.items.map((item, j) => (
                      <li
                        key={item}
                        className="pl-line group border-t border-[var(--color-border-Strokes-default)] last:border-b cursor-default"
                      >
                        {/* Row: number + name + toggle */}
                        <div className="flex items-center justify-between gap-4 py-6">
                          <div className="flex items-baseline gap-7">
                            <span className="text-caption tabular-nums text-[var(--color-text-muted)] w-6 shrink-0">
                              {String(j + 1).padStart(2, '0')}
                            </span>
                            <span className="text-h2 font-medium tracking-tight text-[var(--color-text-Black-100)] dark:text-white transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:text-[var(--color-brand-blue)]">
                              {item}
                            </span>
                          </div>
                          <span
                            aria-hidden="true"
                            className="text-h4 text-[var(--color-text-muted)] shrink-0 transition-all duration-300 ease-out group-hover:text-[var(--color-brand-blue)] group-hover:rotate-45"
                          >
                            +
                          </span>
                        </div>

                        {/* Accordion mini-description: grid-rows 0fr → 1fr on hover */}
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                          <div className="overflow-hidden">
                            <p className="text-body-sm font-light text-[var(--color-text-Black-100)]/55 dark:text-white/45 max-w-xl pl-[3.25rem] pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                              {cat.descs[j]}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
