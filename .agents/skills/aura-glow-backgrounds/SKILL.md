---
name: aura-glow-backgrounds
description: "Design premium 'Aura Glow Gradient' professional backgrounds for glassmorphic UIs, tech products, and SaaS interfaces using generate_image."
---

# Aura Glow Gradient Professional Backgrounds

This skill equips the agent to generate extremely high-quality, premium background assets tailored for SaaS products, glassmorphic interfaces, and modern web design. The goal is to create visuals that look like they belong on a high-end tech landing page (e.g., Stripe, Vercel, Apple, or Linear).

## The "Aura Glow" Aesthetic
If you generate generic "gradients", the image model will often create flat, ugly, or outdated 2010s color blends. To achieve the **premium modern aesthetic**, your prompts MUST focus on three core concepts:
1. **Volumetric Light / Blooms:** Soft, out-of-focus light sources that bleed into a deep, textured background.
2. **Liquid Glass & Meshes:** Organic, flowing, three-dimensional translucent ripples or fine structural meshes that add depth.
3. **Muted & Sophisticated Palettes:** Avoid hyper-saturated rainbows. Use monochromatic or analogous color schemes with a strict focus on a primary brand color (like deep navy, titanium, or cyan) over a solid dark or off-white canvas.

## Foolproof Prompt Formulas for `generate_image`

When calling `generate_image`, always use `AspectRatio: '16:9'` (or the required aspect ratio) and use one of these highly-tested prompt structures. 

### 1. The "Liquid Glass Aura" (Best for Hero sections and Dark Mode)
> "A hyper-realistic abstract background featuring a deep, dark [INSERT BASE COLOR] canvas. In the background, a massive, soft glowing [INSERT ACCENT COLOR] light bloom. Overlaying the light is a translucent, 3D liquid glass wave, smooth organic ripples distorting the light. Ultra-high fidelity, 8k resolution, minimalist corporate tech aesthetic, clean, out-of-focus background, no harsh lines, no text, no objects."

### 2. The "Minimalist Volumetric Mesh" (Best for Light Mode & Bento Grids)
> "A pristine, minimalist abstract background. Pure off-white canvas with a very soft, diffused [INSERT BRAND COLOR] aura glow emanating from the bottom corner. A very subtle, elegant 3D geometric wireframe mesh gently distorting the light. Ultra-smooth, premium Apple-style presentation background. Clean, bright, highly professional, no distracting elements, 8k resolution."

### 3. The "Deep Space Aurora" (Best for CTA Sections)
> "A completely abstract, ultra-smooth fluid gradient background. Deep void black merging into a rich [INSERT DARK COLOR]. A striking, volumetric [INSERT BRIGHT COLOR] aurora light bleed cutting across the canvas softly. Unbelievably smooth color transitions, zero noise, high-end SaaS aesthetic, cinematic lighting, pure blur, no shapes, no text."

## Critical Rules for Agents
- **NEVER** use words like "laptop", "screen", "digital", or "tech" in the prompt, as the model will literally draw laptops and motherboards. Use words like "abstract", "volumetric", "liquid", "mesh", and "gradient".
- **NEVER** accept the first result if it looks like cheap vector art. If it has hard edges or looks like a cartoon, refine the prompt to emphasize "out-of-focus", "pure blur", and "photorealistic liquid".
- **ALWAYS** instruct the user to layer a semi-transparent dark or light overlay (`bg-black/40` or `bg-white/50`) over the generated image in CSS to ensure perfect text legibility in the UI.
