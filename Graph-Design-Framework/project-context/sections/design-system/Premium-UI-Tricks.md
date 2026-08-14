# Premium UI Tricks & Techniques

This document serves as a repository for advanced CSS and UI/UX techniques used in the GO AMS ecosystem to achieve high-end, premium interfaces.

## The Seamless Video Background Trick (Mix-Blend-Mode)

**Problem:** 
When embedding UI demonstration videos (which usually have solid white or solid black backgrounds) over textured or complex backgrounds (like Aura Glows or Glassmorphism), the video's solid background creates an ugly, hard "box" cut that ruins the immersion.

**The Solution:** 
Instead of trying to manually match the background color or export videos with alpha channels (which are heavy and poorly supported), you can use CSS `mix-blend-mode` to mathematically erase the solid background of the video in real-time.

### Implementation Guide

1. **The Container:** Ensure the container holding the video has a transparent background (`bg-transparent`), and NO borders (`border-none`) that might create a physical line where the video starts.
2. **The Background Layer:** Place your textured background (e.g., an Aura Mesh image) at a lower z-index (e.g., `-z-10`) so it spans across the entire container.
3. **The Video Classes:**
   - **For Light Mode (White Background Videos):** Apply `mix-blend-multiply` to the video. 
     *How it works:* Multiply ignores pure white (`#FFFFFF`) pixels, making them 100% transparent. The dark UI elements in the video will remain visible and multiply against the textured background.
   - **For Dark Mode (Black Background Videos):** Apply `mix-blend-screen` to the video.
     *How it works:* Screen ignores pure black (`#000000`) pixels, making them 100% transparent. The bright UI elements will remain visible and float over the textured background.

### Code Example (Tailwind CSS)

```tsx
<div className="relative w-full h-[500px] overflow-hidden bg-transparent">
  
  {/* 1. Global Textured Background (Spans behind everything) */}
  <img 
    src="/Files/aura-mesh-texture.jpg" 
    className="absolute inset-0 -z-10 w-full h-full object-cover opacity-50" 
  />

  {/* 2. Light Mode Video (Erases White) */}
  <video 
    src="/features/ui-demo-light.mp4" 
    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply dark:hidden" 
  />

  {/* 3. Dark Mode Video (Erases Black) */}
  <video 
    src="/features/ui-demo-dark.mp4" 
    className="absolute inset-0 w-full h-full object-cover mix-blend-screen hidden dark:block" 
  />

</div>
```

**Warning:** This technique requires the video background to be **pure** white or **pure** black. If the video was exported with a slight off-white (e.g., `#F9F9F9`) or gray background, the blend mode will leave a faint "haze". Always ensure the motion designer exports UI videos with `#FFFFFF` or `#000000` solid backgrounds.
