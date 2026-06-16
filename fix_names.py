import re
import sys

file_path = 'design-system-app/src/app/design-system/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'ColorCard name="Oatmeal (Bg Light)"': 'ColorCard name="Surface 1"',
    'ColorCard name="Obsidian (Bg Dark)"': 'ColorCard name="Surface 2"',
    'ColorCard name="Almond (Sec Light)"': 'ColorCard name="Surface Base"',
    'ColorCard name="Charcoal (Sec Dark)"': 'ColorCard name="Border Default"',
    'ColorCard name="Mocha"': 'ColorCard name="Text Primary"',
    'ColorCard name="Terracotta"': 'ColorCard name="Brand Orange"',
    'ColorCard name="Premium Gold"': 'ColorCard name="Brand Blue"',
    'ColorCard name="Moss Green"': 'ColorCard name="Brand Dark"',
    'previewFont === "bebas"': 'previewFont === "dmsans"',
    'font === "bebas"': 'font === "dmsans"',
    'setPreviewFont("bebas")': 'setPreviewFont("dmsans")',
    'value="bebas"': 'value="dmsans"',
    'value="inter"': 'value="dmsans"',
    'Bebas Neue': 'DM Sans',
    'Inter': 'DM Sans',
    'inter': 'dmsans',
    'bebas': 'dmsans',
    'font-sans': 'font-dmsans',
    'font-serif': 'font-dmsans',
    'font-bebas': 'font-dmsans'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated ColorCard names and fonts perfectly.')
