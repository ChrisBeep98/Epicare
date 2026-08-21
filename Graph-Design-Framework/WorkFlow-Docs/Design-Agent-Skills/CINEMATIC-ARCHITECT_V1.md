---
name: Cinematic Architect
description: Builds narrative-driven web experiences using DOM-based 3D, Diegetic UI, and the Tunnel Transition. Concept-over-layout philosophy.
---

# The Cinematic Architect (Mastery of High-End Web Experiences)

> "The screen is not a document; it is a window into a world."

This skill definition instructs the agent to go beyond "creative motion" and embrace the role of a **Cinematic Technologist**. It captures the workflow used to build complex, narrative-driven interfaces like "The Liquid Reveal" or "The Glass Canvas".

## 1. The Mindset: Concept Over Layout
Don't start with columns and rows. Start with a **Metaphor**.
*   **The Crystal Core:** A central, glowing element of truth (AI) wrapped in clean, transparent layers.
*   **The Infinite Canvas:** A limitless white space where UI elements float and assemble smoothly.
*   **The Portal:** A masking effect where the user looks *through* the typography or a glass element into the vibrant workflow.

**Directive:** Always name the concept before writing the code. "I am building [Concept Name]."

## 2. Advanced Techniques & "The Secret Sauce"

### Diegetic UI (Narrative Interfaces)
Don't just add a "Scroll Down" text. Make it part of the world.
*   *Instead of:* A simple arrow.
*   *Do this:* A clean, pill-shaped indicator with a subtle glowing dot and a "Discover Flows" micro-text that updates based on scroll progress.
*   *Why:* It turns the user into an active participant.

### DOM-Based 3D (The "No-Canvas" 3D)
You don't always need Three.js. You can achieve AAA results with CSS3D + GSAP.
*   **The Sandwich Technique:** Layer elements in Z-space (`translateZ`).
    *   *Back:* Outline Text (`-100px`)
    *   *Middle:* Image/Video Card (`0px`)
    *   *Front:* Solid Text (`+100px`)
*   **The Tilt:** Bind mouse coordinates to `rotateX` and `rotateY` of a container with `perspective: 1000px`. Use `gsap.quickTo` for zero-lag physics.

### The "Tunnel" Transition
The most powerful scroll effect is **Scale + Penetration**.
*   Start with a framed element (a window).
*   As the user scrolls, scale it to cover the viewport (`width: 100vw`, `height: 100vh`).
*   Fade out the "world" around it (decorations, UI).
*   *Result:* The user feels they have physically entered the content.

## 3. Performance & Optimization (The "60fps Rule")
A beautiful animation that lags is a failure.
*   **Math-Based Smoothing:** Never bind `mousemove` directly to DOM styles. Use `gsap.quickTo` or Linear Interpolation (Lerp).
*   **Will-Change:** Use sparingly, but essential for 3D transforms (`will-change: transform`).
*   **Debouncing:** Never run heavy logic (like `getBoundingClientRect`) inside a scroll loop without throttling.
*   **Clean Up:** If an element leaves the screen, `display: none` it or stop its tickers/videos.

## 4. The "Director" Workflow
1.  **Establish the Atmosphere (Theme):** Vibrant Energy (Light Mode) with pristine white backgrounds and dynamic Aurora Glass elements. 
2.  **Define the Anchor:** What is the single object the user should stare at? (The Hero).
3.  **Add Life:** Small, autonomous movements (breathing glow on glass edges, subtle gradient flows, updating organic shapes) make the interface feel "alive" without being intrusive.
4.  **Direct the Camera:** Use scroll to zoom, pan, and focus. Don't just move the page up.

## 5. Example Prompt for the AI
*"Refactor this hero section. Use the 'Cinematic Architect' skill. I want a concept called 'The Liquid Core'. Pristine white atmosphere, floating glass cards reacting to the mouse, and a central glowing gradient that expands upon scrolling."*
