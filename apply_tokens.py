import json
import re

def extract(file):
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    colors = {}
    def traverse(obj, path=''):
        for key, val in obj.items():
            if isinstance(val, dict):
                if val.get('$type') == 'color' and '$value' in val and 'hex' in val['$value']:
                    colors[path + key] = val['$value']['hex']
                else:
                    if key not in ['$value', '$extensions']:
                        traverse(val, path + key + '-')
    traverse(data)
    return colors

light = extract('design-system/Light.tokens.json')
dark = extract('design-system/Dark.tokens.json')

categories = {}
for k, v in light.items():
    cat = k.split('-')[0].capitalize()
    if cat not in categories: categories[cat] = []
    categories[cat].append((k, v, dark.get(k, v)))

css_root = ':root {\n'
css_dark = '.dark {\n'
theme_vars = ''
for cat, items in categories.items():
    css_root += f'  /* {cat} */\n'
    css_dark += f'  /* {cat} */\n'
    for k, l, d in items:
        k_safe = k.replace(' ', '-').replace('_', '-')
        css_root += f'  --color-{k_safe}: {l};\n'
        css_dark += f'  --color-{k_safe}: {d};\n'
        theme_vars += f'  --color-{k_safe}: var(--color-{k_safe});\n'
css_root += '}\n'
css_dark += '}\n'

with open('design-system-app/src/app/globals.css', 'r', encoding='utf-8') as f:
    globals_content = f.read()

# Replace variables in globals.css
globals_content = re.sub(r':root \{.*?\}', css_root, globals_content, flags=re.DOTALL)
globals_content = re.sub(r'\.dark \{.*?\}', css_dark, globals_content, flags=re.DOTALL)
globals_content = re.sub(r'@theme \{.*?\}', f'@theme {{\n  --font-dmsans: var(--font-dm-sans);\n{theme_vars}\n}}', globals_content, flags=re.DOTALL)

with open('design-system-app/src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(globals_content)

# Update page.tsx
react_sections = ''
for cat, items in categories.items():
    react_sections += f'          <div className="mb-16">\n'
    react_sections += f'            <h3 className="text-h3 text-[var(--color-text-primary)] mb-6">{cat} Tokens</h3>\n'
    react_sections += '            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">\n'
    for k, l, d in items:
        k_safe = k.replace(' ', '-').replace('_', '-')
        text_white = "textWhite={false}" if "surface" in k.lower() or "bg" in k.lower() else "textWhite={true}"
        react_sections += f'              <ColorCard name="{k}" variable="--color-{k_safe}" hex={{isDark ? "{d}" : "{l}"}} colorClass="bg-[var(--color-{k_safe})]" {text_white} />\n'
    react_sections += '            </div>\n'
    react_sections += '          </div>\n'

with open('design-system-app/src/app/design-system/page.tsx', 'r', encoding='utf-8') as f:
    page_content = f.read()

# Remove Section 1 and replace with our dynamic tokens
page_content = re.sub(
    r'\{/\* --- SECTION 1: COLOR PALETTE --- \*/\}.*?(?=\{/\* --- SECTION 2: SEMANTIC TEXT COLORS --- \*/\})',
    f'{{/* --- SECTION 1: COLOR PALETTE --- */}}\n        <section className="mb-32 animate-fade-up">\n          <div className="flex items-center gap-4 mb-10">\n            <h2 className="text-h1">1. Complete Color Palette</h2>\n            <div className="h-[0.0625rem] flex-1 bg-[var(--color-border-Strokes-default)]" />\n          </div>\n\n{react_sections}\n        </section>\n\n        ',
    page_content,
    flags=re.DOTALL
)

with open('design-system-app/src/app/design-system/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_content)

print('Globals and Page updated with dynamic full tokens')
