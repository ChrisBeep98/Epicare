import re
import os
import shutil

src = 'D:/Proyectos-Importantes/GOAMS Landing_Production/design-system/page.tsx'
dst = 'D:/Proyectos-Importantes/GOAMS Landing_Production/design-system-app/src/app/design-system/page.tsx'

shutil.copy(src, dst)

with open(dst, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. FIX FONTS (Careful word boundaries)
# We want to replace "inter" and "bebas" only when they refer to fonts
content = content.replace('previewFont === "bebas"', 'previewFont === "dmsans"')
content = content.replace('font === "bebas"', 'font === "dmsans"')
content = content.replace('setPreviewFont("bebas")', 'setPreviewFont("dmsans")')
content = content.replace('value="bebas"', 'value="dmsans"')
content = content.replace('value="inter"', 'value="dmsans"')
content = content.replace('>Bebas Neue<', '>DM Sans<')
content = content.replace('>Inter<', '>DM Sans<')
content = re.sub(r'\bfont-bebas\b', 'font-dmsans', content)
content = re.sub(r'\bfont-serif\b', 'font-dmsans', content)
content = re.sub(r'\bfont-sans\b', 'font-dmsans', content)

# 2. FIX COLORS (Tailwind v4 exact mapping)
replacements = {
    'bg-background': 'bg-[var(--color-surface-BG-base)]',
    'bg-secondary': 'bg-[var(--color-surface-BG-1)]',
    'bg-salento-mocha': 'bg-[var(--color-surface-BG-2)]',
    'bg-salento-moss': 'bg-[var(--color-surface-BG-3)]',
    'text-foreground-secondary': 'text-[var(--color-text-secondary)]',
    'text-foreground-tertiary': 'text-[var(--color-text-muted)]',
    'text-foreground': 'text-[var(--color-text-primary)]',
    'text-muted': 'text-[var(--color-text-muted)]',
    'text-accent': 'text-[var(--color-brand-orange)]',
    'text-inverse': 'text-[var(--color-text-primary-Reverted)]',
    'bg-accent': 'bg-[var(--color-brand-orange)]',
    'border-accent': 'border-[var(--color-brand-orange)]',
    'border-border': 'border-[var(--color-border-Strokes-default)]',
    'text-salento-terracotta': 'text-[var(--color-brand-orange)]',
    'bg-surface-2/10': 'bg-[var(--color-surface-BG-2)]/10',
    'bg-surface-2/20': 'bg-[var(--color-surface-BG-2)]/20',
    'bg-surface-1/10': 'bg-[var(--color-surface-BG-1)]/10',
    'bg-surface-1/30': 'bg-[var(--color-surface-BG-1)]/30',
    'border-surface-2/30': 'border-[var(--color-surface-BG-2)]/30',
    'border-surface-2/20': 'border-[var(--color-surface-BG-2)]/20',
    'border-surface-1/30': 'border-[var(--color-surface-BG-1)]/30',
    'text-surface-2': 'text-[var(--color-surface-BG-2)]',
    'bg-brand-orange/10': 'bg-[var(--color-brand-orange)]/10',
    'border-brand-orange/30': 'border-[var(--color-brand-orange)]/30',
    'text-brand-orange': 'text-[var(--color-brand-orange)]',
    'bg-foreground': 'bg-[var(--color-text-primary)]',
    'bg-inverse': 'bg-[var(--color-surface-BG-base)]',
}

for old, new in replacements.items():
    content = content.replace(old, new)

# 3. FIX TEXTS
content = content.replace('SalentoCoffee Design System', 'Modern Design System')
content = content.replace('Organic Liquid Glass UI Kit', 'Premium Framework')
content = content.replace('Amanecer Cafetero', 'Light Theme')
content = content.replace('Midnight Roast', 'Dark Theme')

# 4. OVERWRITE SECTION 1 WITH COMPLETE PALETTE
# I will read the react_sections.txt that I generated previously
try:
    with open('react_sections.txt', 'r', encoding='utf-8') as f:
        react_sections = f.read()

    content = re.sub(
        r'\{/\* --- SECTION 1: COLOR PALETTE --- \*/\}.*?(?=\{/\* --- SECTION 2: SEMANTIC TEXT COLORS --- \*/\})',
        f'{{/* --- SECTION 1: COLOR PALETTE --- */}}\n        <section className="mb-32 animate-fade-up">\n          <div className="flex items-center gap-4 mb-10">\n            <h2 className="text-h1">1. Complete Color Palette</h2>\n            <div className="h-[0.0625rem] flex-1 bg-[var(--color-border-Strokes-default)]" />\n          </div>\n\n{react_sections}\n        </section>\n\n        ',
        content,
        flags=re.DOTALL
    )
except Exception as e:
    print('Failed to read react_sections.txt', e)

# 5. REMOVE FONT SELECTOR AND SET DEFAULT
# The UI part
content = re.sub(r'<div className="flex flex-col gap-2">\s*<span className="text-ui-label text-\[var\(--color-text-secondary\)\].*?</select>\s*</div>\s*</div>', '', content, flags=re.DOTALL)

with open(dst, 'w', encoding='utf-8') as f:
    f.write(content)

print("Page completely reset and correctly patched.")
