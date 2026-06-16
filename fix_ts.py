import re
file_path = 'design-system-app/src/app/design-system/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix TypeRow interface
content = re.sub(r'font:\s*string;\s*overrideFont\?:\s*string;\s*', '', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed TypeRow TS definition')
