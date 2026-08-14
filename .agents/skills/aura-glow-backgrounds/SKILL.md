---
name: aura-glow-backgrounds
description: "Design premium 'Aura Glow Gradient' professional backgrounds for glassmorphic UIs, tech products, and SaaS interfaces using generate_image."
---

# Aura Glow Gradient Professional Backgrounds

This skill equips the agent to generate extremely high-quality, premium background assets tailored for SaaS products, glassmorphic interfaces, and modern web design (Apple-style aesthetics).

## Aesthetic Principles
1. **Aura Glows:** Soft, diffused light blooms blending organically into a dark or light canvas.
2. **Glassmorphism Support:** The backgrounds should act as a perfect base for glassmorphic cards to sit on top of. They need high contrast and varied lighting (auras) to make the blur effect of the glass stand out.
3. **Minimalist Geometry:** Flowing organic meshes, fluid liquid gradients, or very subtle structural lines. 
4. **Premium Corporate Feel:** Avoid overly saturated "gamer" neon. Use sophisticated, controlled palettes (e.g., deep brand blues, space grays, titanium silver, warm coral accents).

## Prompting Guidelines for `generate_image`
When generating these backgrounds using your `generate_image` tool, use prompts structured like this:

**For Tech / SaaS:**
> "Abstract digital aura background, deep space gray with a soft glowing titanium blue light bloom in the corner. High-end Apple-style presentation background, ultra-smooth fluid gradient, 8k resolution, minimalist, clean, no text, no harsh lines, perfect for UI background."

**For Liquid Glass aesthetic:**
> "Abstract flowing liquid mesh gradient background, smooth organic curves, deep navy blue and cyan aura glow. Soft diffused lighting, premium corporate SaaS background, high fidelity, smooth color transitions, elegant, modern."

## Workflow
1. Identify the primary brand color or mood the user needs.
2. Use `generate_image` with `AspectRatio: '16:9'` (or another appropriate ratio for the UI component).
3. Generate 3-4 variations with slightly different prompts (e.g., one fluid, one geometric, one minimalist light bloom) so the user can cycle through them.
4. Integrate the chosen background into the codebase using absolute positioning and an overlay layer to ensure text legibility.
