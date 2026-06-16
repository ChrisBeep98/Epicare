import re
file_path = 'design-system-app/src/app/design-system/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix default state values
content = re.sub(r'const \[sandboxBg, setSandboxBg\] = useState\(".*?"\);', 'const [sandboxBg, setSandboxBg] = useState("bg-[var(--color-surface-BG-base)]");', content)
content = re.sub(r'const \[sandboxTextColor, setSandboxTextColor\] = useState\(".*?"\);', 'const [sandboxTextColor, setSandboxTextColor] = useState("text-[var(--color-text-primary)]");', content)

# Fix Text options map
text_options_replacement = '''{[
                      { id: "text-[var(--color-text-primary)]", label: "Primary" },
                      { id: "text-[var(--color-text-secondary)]", label: "Secondary" },
                      { id: "text-[var(--color-text-muted)]", label: "Muted" },
                      { id: "text-[var(--color-text-hint)]", label: "Hint" },
                      { id: "text-[var(--color-brand-orange)]", label: "Brand Orange" },
                      { id: "text-[var(--color-brand-blue)]", label: "Brand Blue" },
                      { id: "text-[var(--color-text-primary-Reverted)]", label: "Inverse" }
                    ]'''
content = re.sub(r'\{\[\s*\{\s*id:\s*"text-\[var\(--color-text-primary\)\].*?\]', text_options_replacement, content, flags=re.DOTALL)

# Also fix Background options map
bg_options_replacement = '["bg-[var(--color-surface-BG-base)]", "bg-[var(--color-surface-BG-1)]", "bg-[var(--color-surface-BG-2)]", "bg-[var(--color-surface-BG-3)]", "bg-[var(--color-brand-dark)]", "bg-[var(--color-brand-orange)]"]'
content = re.sub(r'\{\["bg-\[var\(--color-surface-BG-base\)\].*?\]\.map', f'{{{bg_options_replacement}.map', content, flags=re.DOTALL)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated sandbox')
