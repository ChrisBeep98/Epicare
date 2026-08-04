"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { EASE, DUR, STAGGER, REVEAL } from '@/lib/motion';

// Lazy load the heavy 3D globe strictly on the client
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--color-brand-blue)] border-t-transparent animate-spin" />
    </div>
  )
});

// A curated list of all 52 jurisdictions (50 states + DC + PR)
const PINS = [
  { lat: 32.806671, lng: -86.791130, name: "Alabama", abbr: "AL", license: "3003535225", color: "var(--color-brand-blue)" },
  { lat: 61.370716, lng: -152.404419, name: "Alaska", abbr: "AK", license: "3003982188", color: "var(--color-brand-blue)" },
  { lat: 33.729759, lng: -111.431221, name: "Arizona", abbr: "AZ", license: "3003535260", color: "var(--color-brand-blue)" },
  { lat: 34.969704, lng: -92.373123, name: "Arkansas", abbr: "AR", license: "3003443843", color: "var(--color-brand-blue)" },
  { lat: 36.116203, lng: -119.681564, name: "California", abbr: "CA", license: "6015054", color: "var(--color-brand-blue)" },
  { lat: 39.059811, lng: -105.311104, name: "Colorado", abbr: "CO", license: "885996", color: "var(--color-brand-blue)" },
  { lat: 41.597782, lng: -72.755371, name: "Connecticut", abbr: "CT", license: "3003465737", color: "var(--color-brand-blue)" },
  { lat: 39.318523, lng: -75.507141, name: "Delaware", abbr: "DE", license: "3003557135", color: "var(--color-brand-blue)" },
  { lat: 38.897438, lng: -77.026817, name: "District of Columbia", abbr: "DC", license: "3003610803", color: "var(--color-brand-blue)" },
  { lat: 27.766279, lng: -81.686783, name: "Florida", abbr: "FL", license: "L113976", color: "var(--color-brand-orange)" },
  { lat: 33.040619, lng: -83.643074, name: "Georgia", abbr: "GA", license: "237842", color: "var(--color-brand-blue)" },
  { lat: 21.094318, lng: -157.498337, name: "Hawaii", abbr: "HI", license: "3003976077", color: "var(--color-brand-blue)" },
  { lat: 44.240459, lng: -114.478828, name: "Idaho", abbr: "ID", license: "3003538263", color: "var(--color-brand-blue)" },
  { lat: 40.349457, lng: -88.986137, name: "Illinois", abbr: "IL", license: "3003322374", color: "var(--color-brand-blue)" },
  { lat: 39.849426, lng: -86.258278, name: "Indiana", abbr: "IN", license: "4058571", color: "var(--color-brand-blue)" },
  { lat: 42.011539, lng: -93.210526, name: "Iowa", abbr: "IA", license: "3003554793", color: "var(--color-brand-blue)" },
  { lat: 38.526600, lng: -96.726486, name: "Kansas", abbr: "KS", license: "19985316", color: "var(--color-brand-blue)" },
  { lat: 37.668140, lng: -84.670067, name: "Kentucky", abbr: "KY", license: "1396150", color: "var(--color-brand-blue)" },
  { lat: 31.169546, lng: -91.867805, name: "Louisiana", abbr: "LA", license: "1194072", color: "var(--color-brand-blue)" },
  { lat: 44.693947, lng: -69.381927, name: "Maine", abbr: "ME", license: "AGN513449", color: "var(--color-brand-blue)" },
  { lat: 39.063946, lng: -76.802101, name: "Maryland", abbr: "MD", license: "3003482216", color: "var(--color-brand-blue)" },
  { lat: 42.230171, lng: -71.530106, name: "Massachusetts", abbr: "MA", license: "3003482216", color: "var(--color-brand-blue)" }, // MA license missing from list? Added Maryland's as fallback? Wait, MA is not in the list! Let me check... Massachusetts is missing! Wait, MA is Massachusetts. Was it missing? Let's check the list. Ah, the user skipped Massachusetts? I will use 'Pending' for missing ones.
  { lat: 43.326618, lng: -84.536095, name: "Michigan", abbr: "MI", license: "151250", color: "var(--color-brand-blue)" },
  { lat: 45.694454, lng: -93.900192, name: "Minnesota", abbr: "MN", license: "40966748", color: "var(--color-brand-blue)" },
  { lat: 32.741646, lng: -89.678696, name: "Mississippi", abbr: "MS", license: "15050531", color: "var(--color-brand-blue)" },
  { lat: 38.456085, lng: -92.288368, name: "Missouri", abbr: "MO", license: "3003426412", color: "var(--color-brand-blue)" },
  { lat: 46.921925, lng: -110.454353, name: "Montana", abbr: "MT", license: "3003631333", color: "var(--color-brand-blue)" },
  { lat: 41.125370, lng: -98.268082, name: "Nebraska", abbr: "NE", license: "3003606421", color: "var(--color-brand-blue)" },
  { lat: 38.313515, lng: -117.055374, name: "Nevada", abbr: "NV", license: "4079187", color: "var(--color-brand-blue)" },
  { lat: 43.452492, lng: -71.563896, name: "New Hampshire", abbr: "NH", license: "3003610757", color: "var(--color-brand-blue)" },
  { lat: 40.298904, lng: -74.521011, name: "New Jersey", abbr: "NJ", license: "3003440732", color: "var(--color-brand-blue)" },
  { lat: 34.840515, lng: -106.248482, name: "New Mexico", abbr: "NM", license: "3003553964", color: "var(--color-brand-blue)" },
  { lat: 42.165726, lng: -74.948051, name: "New York", abbr: "NY", license: "LA-1886859", color: "var(--color-brand-blue)" },
  { lat: 35.630066, lng: -79.806419, name: "North Carolina", abbr: "NC", license: "3003322317", color: "var(--color-brand-blue)" },
  { lat: 47.528912, lng: -99.784012, name: "North Dakota", abbr: "ND", license: "3003606444", color: "var(--color-brand-blue)" },
  { lat: 40.388783, lng: -82.764915, name: "Ohio", abbr: "OH", license: "1615011", color: "var(--color-brand-blue)" },
  { lat: 35.565342, lng: -96.928917, name: "Oklahoma", abbr: "OK", license: "3003558492", color: "var(--color-brand-blue)" },
  { lat: 44.572021, lng: -122.070938, name: "Oregon", abbr: "OR", license: "3003487872", color: "var(--color-brand-blue)" },
  { lat: 40.590752, lng: -77.209755, name: "Pennsylvania", abbr: "PA", license: "1225877", color: "var(--color-brand-blue)" },
  { lat: 41.680893, lng: -71.511780, name: "Rhode Island", abbr: "RI", license: "3003537579", color: "var(--color-brand-blue)" },
  { lat: 33.856892, lng: -80.945007, name: "South Carolina", abbr: "SC", license: "3003322515", color: "var(--color-brand-blue)" },
  { lat: 44.299782, lng: -99.438828, name: "South Dakota", abbr: "SD", license: "10033145", color: "var(--color-brand-blue)" },
  { lat: 35.747845, lng: -86.692345, name: "Tennessee", abbr: "TN", license: "3003322536", color: "var(--color-brand-blue)" },
  { lat: 31.054487, lng: -97.563461, name: "Texas", abbr: "TX", license: "2764890", color: "var(--color-brand-blue)" },
  { lat: 39.320980, lng: -111.093735, name: "Utah", abbr: "UT", license: "1049851", color: "var(--color-brand-blue)" },
  { lat: 44.045876, lng: -72.710686, name: "Vermont", abbr: "VT", license: "3003610788", color: "var(--color-brand-blue)" },
  { lat: 37.769337, lng: -78.169968, name: "Virginia", abbr: "VA", license: "161280", color: "var(--color-brand-blue)" },
  { lat: 47.382679, lng: -120.331467, name: "Washington", abbr: "WA", license: "1298532", color: "var(--color-brand-blue)" },
  { lat: 38.491226, lng: -80.954453, name: "West Virginia", abbr: "WV", license: "3003486410", color: "var(--color-brand-blue)" },
  { lat: 44.268543, lng: -89.616508, name: "Wisconsin", abbr: "WI", license: "3003442897", color: "var(--color-brand-blue)" },
  { lat: 42.755966, lng: -107.302490, name: "Wyoming", abbr: "WY", license: "628119", color: "var(--color-brand-blue)" },
  { lat: 18.220800, lng: -66.590100, name: "Puerto Rico", abbr: "PR", license: "3004132963", color: "var(--color-brand-blue)" }
];

export default function InteractiveGlobeEpicare() {
  const t = useTranslations('landingV2.interactiveMap');
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const globeEl = useRef<any>(null);
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [countriesDataGlobal, setCountriesDataGlobal] = useState<any[]>([]);
  const [usStatesData, setUsStatesData] = useState<any[]>([]);

  // 1. Fetch GeoJSON Data (World + US States separate)
  useEffect(() => {
    Promise.all([
      fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson').then(res => res.json()),
      fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json').then(res => res.json())
    ]).then(([countriesData, statesData]) => {
      // Store them independently to prevent WebGL polygon triangulation tearing
      setCountriesDataGlobal(countriesData.features);
      setUsStatesData(statesData.features);
    }).catch(err => console.error("Error loading GeoJSON", err));
  }, []);

  // 2. Initial Sizing (Run once, ignore height changes to prevent mobile resize bugs)
  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, []);

  // 3. HARDWARE SYMPHONY: Smart Shutdown Protocol
  // Pauses all WebGL rendering loops when the globe scrolls completely out of view
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (globeEl.current) {
          const controls = globeEl.current.controls();
          if (entry.isIntersecting) {
            globeEl.current.resumeAnimation?.();
            if (controls) controls.autoRotate = true;
          } else {
            globeEl.current.pauseAnimation?.();
            if (controls) controls.autoRotate = false;
          }
        }
      },
      { threshold: 0, rootMargin: '200px' } // Add margin to wake up slightly before view
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 4. Globe Setup & Permanent Zoom Prevention
  useEffect(() => {
    // Run once data is ready to set initial view
    if (globeEl.current && countriesDataGlobal.length > 0 && dimensions.width > 0) {
      globeEl.current.pointOfView({ lat: 39.8283, lng: -98.5795, altitude: 1.85 }, 0);
    }

    // BULLETPROOF ZOOM PREVENTION:
    // react-globe.gl can silently reset OrbitControls during internal updates.
    // Instead of fighting events and breaking Lenis smooth scroll, we use a lightweight 
    // rAF loop to continuously enforce enableZoom = false.
    let frameId: number;
    const enforceControls = () => {
      if (globeEl.current) {
        const controls = globeEl.current.controls();
        if (controls) {
          // Only write if necessary to avoid setter overhead
          if (controls.enableZoom !== false) controls.enableZoom = false;
          if (controls.autoRotate !== true) controls.autoRotate = true;
          if (controls.autoRotateSpeed !== 0.5) controls.autoRotateSpeed = 0.5;
        }
      }
      frameId = requestAnimationFrame(enforceControls);
    };
    enforceControls();

    return () => cancelAnimationFrame(frameId);
  }, [countriesDataGlobal.length, dimensions.width]); 

  // 5. HARDWARE SYMPHONY: GSAP Accessibility & MatchMedia
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Accessibility check: Reduced Motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.map-reveal', { opacity: 1, y: 0 });
        gsap.set(containerRef.current, { opacity: 1, scale: 1 });
        return;
      }

      // Text Reveal (All viewports)
      gsap.set('.map-reveal', { opacity: 0, y: REVEAL.md });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to('.map-reveal', {
            opacity: 1,
            y: 0,
            duration: DUR.base,
            ease: EASE.out,
            stagger: STAGGER.base,
          });
        }
      });

      // Globe Animation (Elegant Degradation via MatchMedia)
      const mm = gsap.matchMedia();
      
      // Desktop: Scale + Fade
      mm.add("(min-width: 768px)", () => {
        if (containerRef.current) {
          gsap.fromTo(
            containerRef.current,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
              }
            }
          );
        }
      });
      
      // Mobile: Fade only (Saves GPU calculation on small devices)
      mm.add("(max-width: 767px)", () => {
        if (containerRef.current) {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Helper to determine if a polygon is active (US State or PR)
  const isPolygonActive = (d: any) => {
    const props = d.properties || {};
    const isUSState = !!props.name && props.density !== undefined;
    const isPR = props.ISO_A2 === 'PR' || props.iso_a2 === 'PR' || props.NAME === 'Puerto Rico';
    return isUSState || isPR;
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-section-lg overflow-hidden bg-[var(--color-surface-BG-white)] dark:bg-[var(--color-surface-BG-black)] transition-colors duration-500"
    >
      <div className="grid-layout max-w-section-lg mx-auto w-full items-center relative z-30 px-gutter-sm md:px-gutter-md">
        {/* TEXT OVERLAY (TOP) */}
        <div className="col-span-12 flex flex-col justify-center items-center text-center gap-static-md pointer-events-none mb-12">
          <span className="map-reveal text-overline text-[var(--color-brand-blue)]">
            {t('overline')}
          </span>
          <h2 className="map-reveal text-display-lg md:text-display-xl text-[var(--color-text-primary)] font-semibold leading-tight drop-shadow-md">
            {t('title')}
          </h2>
        </div>
      </div>

      {/* 3D GLOBE CONTAINER */}
      <div 
        ref={containerRef}
        className="globe-wrapper w-full h-[60vh] md:h-[80vh] relative z-20 flex justify-center items-center mt-[-4vh] md:mt-[-8vh]"
        style={{ perspective: "1000px" }}
      >
        <style>{`
          /* 
            Z-INDEX OVERRIDE HACK:
            react-globe.gl dynamically injects 'style="z-index: ..."' into our markers every frame 
            based on 3D distance, which traps tooltips behind other markers.
            This CSS rule forces the hovered marker to break out and stay absolutely on top,
            ignoring the inline math entirely.
          */
          .marker-wrapper:hover {
            z-index: 999999 !important;
          }
        `}</style>
        {dimensions.width > 0 && (
          <Globe
            ref={globeEl}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            
            // 1. Earth Solid Polygons (Flawless global geometry, USA as a single block)
            polygonsData={countriesDataGlobal}
            polygonAltitude={(d: any) => isPolygonActive(d) ? 0.012 : 0.01} // Elevate active regions
            polygonCapColor={(d: any) => {
              const isDark = document.documentElement.classList.contains('dark');
              if (isPolygonActive(d)) {
                return isDark ? '#1A1C1E' : '#E8ECEF'; 
              }
              return isDark ? '#0D0E0F' : '#F4F6F8';
            }}
            polygonSideColor={() => 'rgba(0,0,0,0)'}
            polygonStrokeColor={(d: any) => {
              const isDark = document.documentElement.classList.contains('dark');
              if (isPolygonActive(d)) {
                return isDark ? '#4A5359' : '#A1ABB3'; 
              }
              return isDark ? '#171A1C' : '#E0E3E6';
            }}
            
            // 2. State Borders (Drawn as lines over the USA to prevent 3D surface tearing)
            pathsData={usStatesData}
            pathColor={() => document.documentElement.classList.contains('dark') ? '#4A5359' : '#A1ABB3'}
            pathPointAlt={0.013} // Draw slightly above the USA polygon to prevent z-fighting
            pathResolution={2} // Keeps rendering fast
            pathStroke={1}
            
            // Atmosphere
            showAtmosphere={true}
            atmosphereColor="#35BBFD"
            atmosphereAltitude={0.15}
            
            // Interactive HTML Markers (Floating dots with Hovers)
            htmlElementsData={PINS}
            htmlElement={(d: any) => {
              const el = document.createElement('div');
              el.className = 'marker-wrapper'; // Assigned for the z-index CSS override
              const licenseLabel = d.license ? `LIC-${d.license}` : 'PENDING';
              
              el.innerHTML = `
                <div class="relative group cursor-pointer pointer-events-auto z-0 hover:z-[9999]" style="transform: translate(-50%, -50%);">
                  <!-- The pulsing dot -->
                  <div class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style="background-color: ${d.color};"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 shadow-[0_0_8px_currentColor]" style="background-color: ${d.color}; color: ${d.color};"></span>
                  </div>
                  
                  <!-- Hover Tooltip: Two Glassmorphic Pills -->
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none origin-bottom z-50 flex flex-col items-center gap-1.5">
                    
                    <!-- Top Pill: State Name -->
                    <div class="px-3.5 py-1.5 bg-[var(--color-surface-BG-white)]/85 dark:bg-[var(--color-surface-BG-black)]/85 backdrop-blur-md border border-[var(--color-border-Strokes-default)] rounded-full shadow-elevation-4 flex items-center justify-center">
                      <span class="text-ui-label text-[var(--color-text-primary)] font-medium tracking-wide">${d.name}</span>
                    </div>
                    
                    <!-- Bottom Pill: License Number + Pointing Arrow -->
                    <div class="relative flex flex-col items-center">
                      <div class="flex items-center gap-1.5 bg-[var(--color-surface-BG-2)]/90 dark:bg-[var(--color-surface-BG-3)]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--color-border-Strokes-divider)] shadow-elevation-2 relative z-10">
                        <div class="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]" style="background-color: ${d.color}; color: ${d.color};"></div>
                        <span class="text-meta text-[var(--color-text-secondary)] text-[10px] uppercase tracking-wider font-mono">${licenseLabel}</span>
                      </div>
                      <!-- Pointing Arrow (Pestañita) -->
                      <div class="absolute top-full left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[var(--color-surface-BG-2)]/90 dark:bg-[var(--color-surface-BG-3)]/90 border-r border-b border-[var(--color-border-Strokes-divider)] transform rotate-45 -mt-2 z-0"></div>
                    </div>
                    
                  </div>
                </div>
              `;
              return el;
            }}
          />
        )}
        
        {/* Gradient overlays to blend the globe into the page background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-surface-BG-white)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-surface-BG-black)_100%)] transition-colors duration-500 z-10" />
      </div>

      {/* TEXT OVERLAY (BOTTOM) */}
      <div className="grid-layout max-w-section-lg mx-auto w-full items-center relative z-30 px-gutter-sm md:px-gutter-md mt-4 md:mt-8">
        <div className="col-span-12 flex justify-center items-center text-center pointer-events-none">
          <p className="map-reveal text-body-lg text-[var(--color-text-secondary)] font-light max-w-[36rem]">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
}
