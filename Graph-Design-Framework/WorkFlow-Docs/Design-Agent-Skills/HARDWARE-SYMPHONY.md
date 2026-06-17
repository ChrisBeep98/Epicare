---
name: Hardware Symphony
description: Performance gatekeeper ensuring 60fps on all devices. Smart Shutdown protocol, elegant degradation, legal animated properties, and accessibility.
---

# 🖥️ Agent Skill: THE HARDWARE SYMPHONY (Extreme Performance)

**Level:** Systems Architect / Master-Class
**Stack:** React, GSAP, CSS, Next.js, IntersectionObserver
**Objective:** Ensure GO AMS AI's Awwwards-level animations run at a flawless 60fps on both an M3 Max MacBook and a 4-year-old Android phone.

---

> *"A beautiful animation that stutters is not an animation; it's a glitch. Performance is the ultimate luxury."*

This skill is the **Gatekeeper**. It dictates the engineering practices required to pull off our *AWWWARDS-MOTION Dynamics* without burning the user's CPU or draining their battery. 

Whenever you implement heavy visual effects (Parallax, Glassmorphism, GSAP logic), you MUST adhere to the Hardware Symphony protocol:

## 1. THE "SMART SHUTDOWN" PROTOCOL (Intersection Observers)
Never run math or animations on elements the user cannot see.

*   **The Rule:** If an element enters the viewport, animate it. If it leaves the viewport by 1px, **PAUSE** its animation and ticker.
*   **Implementation (React):** Use Intersection Observers (or `framer-motion`'s `useInView`, or GSAP's native ScrollTrigger toggles) to suspend heavy loops, Canvas repaints, or continuous CSS animations.
*   **Glassmorphism Quarantine:** `backdrop-filter: blur()` is a GPU killer. If a glass element (like GO AMS's *Aurora Glass*) is out of view, its blur must mathematically cease rendering.

## 2. ELEGANT DEGRADATION (Mobile vs. Desktop)
Do not force a mobile phone to run a desktop's WebGL or heavy DOM manipulation.

*   **Mobile Simplification:** On viewports under `768px`, heavily animated 3D cards or complex DOM-based Parallaxes should degrade elegantly into simpler CSS transitions (`opacity` and `transform`).
*   **Disable on Resize:** GSAP ScrollTriggers must be configured using `gsap.matchMedia()` so memory-heavy ScrollTriggers are killed completely on smaller breakpoints, not just hidden with CSS.

## 3. ACCESSIBILITY FIRST (`prefers-reduced-motion`)
Some users experience motion sickness. We must respect the OS-level flag.

*   **The Rule:** Before firing any GSAP Master Timeline or complex Lenis smooth scroll, check for `prefers-reduced-motion: reduce`.
*   **Implementation:** If true, instantly kill the timeline and default all elements to `opacity: 1, transform: none`. 

## 4. THE ONLY LEGAL ANIMATED PROPERTIES
To maintain 60fps, we strictly control what the browser calculates.

*   **DO ANIMATE:** `transform` (translate, scale, rotate, skew) and `opacity`. These are handled by the GPU (Compositor thread).
*   **NEVER ANIMATE:** `width`, `height`, `margin`, `padding`, `top`, `left`, `box-shadow`. These trigger Layout Recalculations and Paint, destroying framerates.
*   **Will-Change:** Apply `will-change: transform` or `will-change: opacity`, but *only* dynamically via JS just before the animation starts, and remove it after. Leaving it on statically consumes excessive VRAM.

## 5. IMAGE & VIDEO HYGIENE
*   **Videos:** Must NOT have audio tracks unless requested. Must use `playsInline`, `muted`, `loop`, and `preload="none"` (or `metadata`).
*   **Images:** Must use modern formats (WebP/AVIF), strict `sizes` attributes for `next/image`, and `priority={true}` ONLY for the LCP (Largest Contentful Paint) hero image.

## 🤖 AI PROMPT DIRECTIVES
When writing front-end code for GO AMS:
1. *"Did I just animate a `box-shadow` or `width`? If yes, rewrite it to animate a pseudo-element's `opacity` or `transform: scale`."*
2. *"Is this infinite CSS keyframe animation running off-screen? If yes, wrap it in an Intersection Observer."*
3. *"Did I wrap my GSAP ScrollTriggers in a `gsap.matchMedia()` block? If not, do it now."*
