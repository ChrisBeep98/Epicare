import re

# Update globals.css
css_path = 'design-system-app/src/app/globals.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Replace font-weight: 300; with font-weight: 200; for all the light classes
# Since we only have font-weight: 300; in the light classes right now, we can do a targeted regex
css_content = re.sub(r'(\.text-body-[a-z0-9-]+-light\s*\{[^}]*font-weight:\s*)300', r'\g<1>200', css_content)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)


# Update page.tsx
page_path = 'design-system-app/src/app/design-system/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page_content = f.read()

# Replace Weight: 300 with Weight: 200 inside the typography JSX details
page_content = re.sub(r'Weight:\s*300', r'Weight: 200', page_content)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page_content)

print("Updated light weights to 200 in globals.css and page.tsx")
