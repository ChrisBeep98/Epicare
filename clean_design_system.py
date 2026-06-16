import re

# 1. FIX GLOBALS.CSS
globals_path = 'design-system-app/src/app/globals.css'
with open(globals_path, 'r', encoding='utf-8') as f:
    globals_css = f.read()

# Add missing spacing variables to :root
spacing_vars = """
  /* Spacing */
  --space-gutter-sm: clamp(1rem, 2vw, 1.5rem);
  --space-gutter-md: clamp(1.5rem, 4vw, 3.5rem);
  --space-gutter-lg: clamp(2rem, 6vw, 5rem);
  --space-gutter-xl: clamp(3rem, 8vw, 8rem);
  
  --space-section-xs: clamp(2rem, 4vw, 4rem);
  --space-section-sm: clamp(4rem, 6vw, 6rem);
  --space-section-md: clamp(6rem, 8vw, 10rem);
  --space-section-lg: clamp(8rem, 12vw, 15rem);
  
  --space-fluid-xs: clamp(0.5rem, 1vw, 1.5rem);
  --space-fluid-sm: clamp(1rem, 2vw, 2.5rem);
  --space-fluid-md: clamp(2rem, 4vw, 5rem);
  --space-fluid-lg: clamp(3rem, 6vw, 8rem);
"""

if '--space-gutter-sm' not in globals_css:
    globals_css = globals_css.replace(':root {', ':root {\n' + spacing_vars)

# Add missing utility classes to @layer utilities
spacing_classes = """
  .px-gutter-sm { padding-left: var(--space-gutter-sm); padding-right: var(--space-gutter-sm); }
  .px-gutter-md { padding-left: var(--space-gutter-md); padding-right: var(--space-gutter-md); }
  .px-gutter-lg { padding-left: var(--space-gutter-lg); padding-right: var(--space-gutter-lg); }
  .px-gutter-xl { padding-left: var(--space-gutter-xl); padding-right: var(--space-gutter-xl); }

  .py-section-xs { padding-top: var(--space-section-xs); padding-bottom: var(--space-section-xs); }
  .py-section-sm { padding-top: var(--space-section-sm); padding-bottom: var(--space-section-sm); }
  .py-section-md { padding-top: var(--space-section-md); padding-bottom: var(--space-section-md); }
  .py-section-lg { padding-top: var(--space-section-lg); padding-bottom: var(--space-section-lg); }

  .gap-fluid-xs { gap: var(--space-fluid-xs); }
  .gap-fluid-sm { gap: var(--space-fluid-sm); }
  .gap-fluid-md { gap: var(--space-fluid-md); }
  .gap-fluid-lg { gap: var(--space-fluid-lg); }
"""

if 'px-gutter-sm' not in globals_css:
    # remove old partial spacing
    globals_css = re.sub(r'\.px-gutter-md \{.*?\}\n', '', globals_css)
    globals_css = re.sub(r'\.py-section-md \{.*?\}\n', '', globals_css)
    globals_css = re.sub(r'\.gap-fluid-md \{.*?\}\n', '', globals_css)
    globals_css = globals_css.replace('@layer utilities {', '@layer utilities {\n' + spacing_classes)

# Fix remaining bg-surface-2 classes that are missing color variables in globals.css (like bg-surface-2/10)
# Tailwind 4 automatically resolves var(--color-surface-BG-2) if we use bg-[var(--color-surface-BG-2)]
# But in page.tsx there are still classes like "bg-surface-2/10".
# Let's add them to @theme as aliased colors so Tailwind can use opacity modifiers.
theme_aliases = """
  --color-surface-1: var(--color-surface-BG-1);
  --color-surface-2: var(--color-surface-BG-2);
  --color-brand-orange: var(--color-brand-orange);
  --color-foreground: var(--color-text-primary);
  --color-muted: var(--color-text-muted);
"""
if '--color-surface-1' not in globals_css:
    globals_css = globals_css.replace('@theme {', '@theme {\n' + theme_aliases)

with open(globals_path, 'w', encoding='utf-8') as f:
    f.write(globals_css)


# 2. CLEAN UP PAGE.TSX
page_path = 'design-system-app/src/app/design-system/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page_content = f.read()

# Remove Typography States
page_content = re.sub(r'const \[previewFont.*?;\n', '', page_content)
page_content = re.sub(r'const \[previewSecondaryFont.*?;\n', '', page_content)

# Remove the Typography selector UI entirely
typography_header_regex = r'<div className="flex flex-col gap-2">.*?<span className="text-ui-label text-\[var\(--color-text-secondary\)\].*?</select>\s*</div>\s*</div>'
page_content = re.sub(typography_header_regex, '', page_content, flags=re.DOTALL)

# Clean up TypeRow calls to remove the font override props
page_content = re.sub(r'font=\{previewFont\}\s*', '', page_content)
page_content = re.sub(r'overrideFont=\{previewFont\}\s*', '', page_content)
page_content = re.sub(r'font=\{previewSecondaryFont\}\s*', '', page_content)
page_content = re.sub(r'overrideFont=\{previewSecondaryFont\}\s*', '', page_content)
page_content = re.sub(r'font="geist-mono"\s*', '', page_content)

# The Component signature of TypeRow has `font` and `overrideFont`. We can just let it render natively.
page_content = page_content.replace('font={font}', '')
page_content = page_content.replace('font={overrideFont || "sans"}', '')

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page_content)

print("Globals updated with robust spacing system and typography selector removed from page.tsx")
