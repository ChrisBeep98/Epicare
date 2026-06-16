import os

globals_path = 'design-system-app/src/app/globals.css'
with open(globals_path, 'r', encoding='utf-8') as f:
    globals_css = f.read()

spacing_vars = '''
:root {
  /* Spacing System */
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
}
'''

if '--space-gutter-sm' not in globals_css:
    globals_css = globals_css.replace('@import "tailwindcss";', '@import "tailwindcss";\n' + spacing_vars)
    with open(globals_path, 'w', encoding='utf-8') as f:
        f.write(globals_css)
    print('Injected spacing variables successfully!')
else:
    print('Variables already exist')
