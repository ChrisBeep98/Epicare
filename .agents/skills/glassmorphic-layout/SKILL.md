---
name: glassmorphic-layout
description: "Architectural blueprint for implementing premium Glassmorphic cards over immersive backgrounds, avoiding common z-index, border clipping, and hover animation bugs."
---

# Glassmorphic Layout Architecture

This skill defines the strict structural pattern for building high-end "Apple-style" sections where a Glassmorphic Card floats above a cinematic background (image or video). It documents the fixes for multiple edge cases and rendering bugs encountered during development.

## 🏗️ DOM Structure & Layering (Z-Index Hierarchy)
Always structure the section using this explicit layer order:

```tsx
<section className="relative w-full min-h-[100dvh] flex items-center justify-between overflow-visible z-10">
  
  {/* LAYER 0: IMMERSIVE BACKGROUND (Right/Left Aligned) */}
  {/* Must be absolute to allow expanding inwards without breaking Flexbox width calculation */}
  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[47%] z-0">
    <video /> (or Aura Glow Background)
  </div>

  {/* LAYER 1: TEXT CONTENT & GLASS CARD WRAPPER */}
  {/* Use negative translateY on the WRAPPER to shift everything vertically (never on the card if it has hover effects) */}
  <div className="relative z-20 w-1/2 flex flex-col shrink-0 lg:-translate-y-32">
    
    {/* THE GLASS CARD (Parent must own the border to prevent clipping) */}
    <div className="relative z-10 w-full rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-transform">
      
      {/* STATIC BACKGROUND LAYER (Separate from content for blur performance) */}
      <div className="absolute inset-0 -z-10 rounded-[2.5rem]">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[24px]" />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[20px] saturate-[1.5]" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 p-12">
        <h1>Content here</h1>
      </div>

    </div>
  </div>
</section>
```

## 🚨 Critical Bug Prevention Rules (DO NOT IGNORE)

1. **Border Clipping Bug (Corner Shaving):** 
   - ❌ *Error:* Putting the `border` on an inner absolute element while the parent has `overflow-hidden`.
   - ✅ *Fix:* The `border border-xxx` class **MUST** belong to the outermost card parent that has the `rounded-xxx` class. This physically defines the boundary and stops WebKit from anti-alias shaving the corners.

2. **Hover Transform Collision:**
   - ❌ *Error:* Moving a card up statically using `lg:-translate-y-32`, and also adding `hover:-translate-y-1`. When hovered, the card will violently snap downwards because Tailwind overwrites the transform.
   - ✅ *Fix:* If you need to shift the whole card upwards dramatically (e.g., to balance visual weight against the background), apply `lg:-translate-y-32` to the **parent wrapper column**, NOT the card itself. Let the card keep only its micro-interaction (`hover:-translate-y-1`).

3. **Flexbox Explosion on Resize (Absolute Backgrounds):**
   - ❌ *Error:* Putting a background block (like a video) as a relative flex-child alongside the text column, then trying to scale it dynamically. It will overflow the screen and cause horizontal scrolling.
   - ✅ *Fix:* The immersive background (Video/Aura) must be `absolute` on Desktop, pinned to the edge (`right-0` or `left-0`). This ensures that if its width expands, it grows *inwards* towards the center without pushing other flex items off the screen.

4. **Performance (Blur Latency):**
   - Never apply `backdrop-blur` and heavy GSAP transforms to the exact same DOM node. Keep the blur in a static `absolute -z-10` child layer, and only animate opacity/transforms on the wrapper.
