---
name: Awwwards Motion Dynamics
description: Behavioral physics of SalentoCoffee. Three pillars - Layered Unveiling, Liquid Organic Unveiling, and Breathing Canvas for Artisanal Glassmorphism interfaces.
---

# 🏆 Agent Skill: AWWWARDS MOTION DYNAMICS (The SalentoCoffee Core)

**Level:** Master-Class (Awwwards/FWA Standard)
**Stack:** GSAP 3.x + Lenis + CSS Variables + IntersectionObserver
**Objective:** Elevate "Creative Motion" to "Experiential Art" for SalentoCoffee AI.

---

> *"The scroll is not a mechanical action; it is an act of revelation. The screen is not a document; it is a liquid stage."*

This skill defines the behavioral physics of SalentoCoffee AI. Based on the "Alche Studio" reference, we must abandon rigid, static web structures and adopt an **Organic Liquid Glass & Theatrical** approach, keeping the organic feeling of the coffee process while using liquid metaphors like pouring coffee and liquid gold. 

Whenever you are asked to animate a section, component, or transition in SalentoCoffee, you MUST prioritize these three behavioral pillars:

## 1. LAYERED UNVEILING (The "Wait and Rise" Effect)
Content must never appear all at once. It must be choreographed in waves.

*   **The Physics:** When entering a new section, the previous content does not immediately leave. It stays pinned or fades slowly in the background, while the new content "swims" up from the bottom of the screen.
*   **The Execution (GSAP):**
    *   Do NOT use simple `y: 50`. Use exaggerated distances (`y: "100vh"`) with very specific easing.
    *   **The Curve:** Start fast, end slow. The element must feel like it has "weight" and is decelerating as it arrives at its destination. `ease: "power4.out"` or `CustomEase`.
*   **The Parallax Rule:** Backgrounds and structural elements must move at a slightly slower speed than typography to create immediate spatial depth.

## 2. THE BIRTH OF TYPOGRAPHY (The Water Mask)
Headings (H1, H2) do not just fade in. They are *born* from an invisible horizon.

*   **The Physics:** Letters or lines of text are hidden by an invisible mask (using `overflow: hidden` on a wrapper or `clip-path`). Upon scrolling, the text emerges upward through this horizon.
*   **The Execution (GSAP SplitText):**
    *   Animate lines, not just whole blocks. If a title has two lines, Line 1 emerges `0.1s` before Line 2, creating a rippling wave effect.
    *   *Start State:* `yPercent: 100, opacity: 0`
    *   *End State:* `yPercent: 0, opacity: 1`
    *   Combine this with `scrub: true` so the user's scroll speed physically controls the "birth" of the text.

## 3. THE BREATHING CANVAS (Latent Organic Life)
The interface must never be completely still, even when the user stops scrolling.

*   **The Physics:** The space feels alive through continuous, imperceptible micro-movements.
*   **The Execution (Passive GSAP):**
    *   **Floating Elements:** Floating UI cards (`SoftOrganicGlassCards` components) should have a continuous, infinite vertical oscillation (e.g., `y: "-=10px", yoyo: true, repeat: -1, duration: 4, ease: "sine.inOut"`).
    *   **Gradient Flows:** The background *Earthy Glassmorphism Gradient* must slowly shift its coordinates, resembling a fluid simulation with amber reflections.
    *   **Focus Blurs:** Peripheral elements may have a `backdrop-blur-xl` tinted with warm/amber colors (like seeing through a glass of coffee or amber glass) that snaps to sharp focus (`blur(0px)`) when they enter the center of the viewport.

---

## 🎭 SECTION TRANSITIONS: "The Theater Curtain"
Forget standard scrolling. To move from the "Hero" to "SalentoCoffee Shop", we must use the Theater Curtain approach:

1.  **Pinning:** The current section (A) gets pinned (`position: sticky` or GSAP pin).
2.  **Overlap:** The next section (B) slides *over* section A, as if section B has a higher `z-index`.
3.  **The Fade:** As section B covers A, section A scales down slightly (`scale: 0.95`) and darkens/fades, giving the illusion that it is sinking into the background Z-space.

## 🤖 AI PROMPT DIRECTIVES for SalentoCoffee
When generating code for SalentoCoffee UI, you must internally evaluate:
1. *"Did I just make this fade in? If yes, REWRITE it to use the 'Text Birth' mask technique."*
2. *"Are the visual elements static when the user stops? If yes, ADD a passive 'Breathing' animation."*
3. *"Does the scroll feel like a PDF? If yes, IMPLEMENT 'Layered Unveiling' with overlapped z-indexing."*
