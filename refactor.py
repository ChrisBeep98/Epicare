import re
import sys

file_path = 'design-system-app/src/app/design-system/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'salento-terracotta': 'brand-orange',
    'salento-mocha': 'surface-2',
    'salento-gold': 'brand-blue',
    'salento-moss': 'surface-1',
    'SalentoCoffee': 'New Platform',
    'Organic Liquid Glass UI Kit': 'Modern Design System UI Kit',
    'Amanecer Cafetero': 'Light Mode',
    'Midnight Roast': 'Dark Mode',
    'bebas': 'dmsans',
    'inter': 'dmsans',
    '--color-oatmeal': '--surface-1',
    '#F7F2E7': '#F7F7F7',
    '--color-obsidian': '--surface-1',
    '#111111': '#202122',
    '--color-almond': '--surface-2',
    '#EAD8C0': '#EBECEC',
    '--color-charcoal': '--surface-2',
    '#1A1A1A': '#28292A',
    '--color-mocha': '--surface-3',
    '#4E3B31': '#3D3E3F',
    '--color-terracotta': '--brand-orange',
    '#C35B48': '#F26023',
    '--color-gold': '--brand-blue',
    '#D4AF37': '#35BBFD',
    '--color-moss': '--brand-dark',
    '#4A5D23': '#2F3437',
    'bg-[#F7F2E7]': 'bg-[var(--surface-1)]',
    'bg-[#111111]': 'bg-[var(--surface-1)]',
    'bg-[#EAD8C0]': 'bg-[var(--surface-2)]',
    'bg-[#1A1A1A]': 'bg-[var(--surface-2)]',
    'bg-background': 'bg-[var(--bg-primary)]',
    'text-foreground': 'text-[var(--text-primary)]',
    'bg-secondary': 'bg-[var(--surface-1)]',
    'text-muted': 'text-[var(--text-secondary)]',
    'border-border': 'border-[var(--border-default)]'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Replaced successfully')
