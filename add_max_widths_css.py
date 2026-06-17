import re

# Update globals.css
css_path = 'design-system-app/src/app/globals.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

max_widths_css = '''
  /* LAYOUT MAX-WIDTHS */
  :root {
    --max-w-section-sm: 48rem; /* 768px */
    --max-w-section-md: 64rem; /* 1024px */
    --max-w-section-lg: 80rem; /* 1280px */
    --max-w-section-xl: 96rem; /* 1536px */
  }

  .max-w-section-sm { max-width: var(--max-w-section-sm); width: 100%; margin-inline: auto; }
  .max-w-section-md { max-width: var(--max-w-section-md); width: 100%; margin-inline: auto; }
  .max-w-section-lg { max-width: var(--max-w-section-lg); width: 100%; margin-inline: auto; }
  .max-w-section-xl { max-width: var(--max-w-section-xl); width: 100%; margin-inline: auto; }
'''

# Find the spot to insert layout max-widths, maybe right before /* CUSTOM UTILITIES */
css_content = css_content.replace('/* CUSTOM UTILITIES */', max_widths_css + '\n  /* CUSTOM UTILITIES */')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Added max-width layout variables to globals.css")
