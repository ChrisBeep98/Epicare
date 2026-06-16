import re
import sys

file_path = 'design-system-app/src/app/design-system/page.tsx'
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        'text-foreground-secondary': 'text-[var(--text-secondary)]',
        'text-foreground-tertiary': 'text-[var(--text-tertiary)]',
        'bg-foreground-secondary': 'bg-[var(--text-secondary)]',
        'bg-foreground-tertiary': 'bg-[var(--text-tertiary)]',
        'text-inverse': 'text-[var(--text-inverse)]',
        'bg-inverse': 'bg-[var(--bg-inverse)]',
        'text-accent': 'text-[var(--brand-orange)]',
        'bg-accent': 'bg-[var(--brand-orange)]',
        'border-accent': 'border-[var(--brand-orange)]'
    }

    for old, new in replacements.items():
        content = content.replace(old, new)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Fixed extra classes in page.tsx')
except Exception as e:
    print('Error:', e)
