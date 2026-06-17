import re

page_path = 'design-system-app/src/app/design-system/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add state variable
state_var = '  const [activeMaxWidth, setActiveMaxWidth] = useState("max-w-section-md");'
if 'activeMaxWidth' not in content:
    content = content.replace('const [activeInternalGap, setActiveInternalGap] = useState("gap-2");', 'const [activeInternalGap, setActiveInternalGap] = useState("gap-2");\n' + state_var)

# 2. Add SECTION 6 JSX
section_6 = '''
        {/* --- SECTION 6: LAYOUT MAX WIDTHS --- */}
        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-h1">6. Desktop Layout Max-Width</h2>
            <p className="text-body-lg text-[var(--color-text-muted)] mt-4">
              Restricciones de ancho máximo para mantener la legibilidad y estructura del contenido en pantallas grandes.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-12 items-start">
            {/* Control Panel */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8 shrink-0">
              <SpacingCard 
                label="Max Widths"
                token={activeMaxWidth}
                value={activeMaxWidth === 'max-w-section-sm' ? '48rem (768px)' : activeMaxWidth === 'max-w-section-md' ? '64rem (1024px)' : activeMaxWidth === 'max-w-section-lg' ? '80rem (1280px)' : '96rem (1536px)'}
                usage={activeMaxWidth === 'max-w-section-sm' ? 'Formularios, login, y settings enfocados.' : activeMaxWidth === 'max-w-section-md' ? 'Artículos y vistas de detalle estándar.' : activeMaxWidth === 'max-w-section-lg' ? 'Dashboards principales de GO AMS.' : 'Tablas de datos extensas y gráficas complejas.'}
                options={['max-w-section-sm', 'max-w-section-md', 'max-w-section-lg', 'max-w-section-xl']}
                activeOption={activeMaxWidth}
                onOptionChange={setActiveMaxWidth}
                preview={
                  <div className="w-full bg-[var(--color-surface-BG-1)] h-24 rounded-lg flex items-center justify-center p-4">
                     {/* Mini map representation */}
                     <div className={`h-full bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] rounded transition-all duration-500`} style={{ width: activeMaxWidth === 'max-w-section-sm' ? '40%' : activeMaxWidth === 'max-w-section-md' ? '60%' : activeMaxWidth === 'max-w-section-lg' ? '80%' : '100%' }}></div>
                  </div>
                }
              />
            </div>

            {/* Interactive Demo */}
            <div className="flex-1 w-full bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] rounded-3xl p-8 overflow-hidden relative min-h-[500px] flex flex-col">
               {/* Resizing Container */}
               <div className={`${activeMaxWidth} bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] rounded-2xl p-6 shadow-2xl transition-all duration-500 flex-1 flex flex-col mx-auto w-full`}>
                 {/* Fake UI Header */}
                 <div className="flex justify-between items-center border-b border-[var(--color-border-Strokes-default)]/50 pb-4 mb-6">
                   <div className="flex flex-col">
                     <span className="text-h4">GO AMS Dashboard</span>
                     <span className="text-caption text-[var(--color-text-muted)]">Active Policies Overview</span>
                   </div>
                   <div className="flex gap-2">
                     <div className="w-8 h-8 rounded-full bg-[var(--color-surface-BG-2)]"></div>
                     <div className="w-8 h-8 rounded-full bg-[var(--color-surface-BG-2)]"></div>
                   </div>
                 </div>
                 
                 {/* Fake Data Grid */}
                 <div className="flex gap-4 mb-4">
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl"></div>
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl hidden sm:block"></div>
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl hidden md:block"></div>
                 </div>
                 <div className="flex-1 bg-[var(--color-surface-BG-1)] rounded-xl flex items-center justify-center min-h-[200px]">
                    <p className="text-body-sm text-[var(--color-text-hint)]">Content Area Restricted by {activeMaxWidth}</p>
                 </div>
               </div>
            </div>
          </div>
        </section>
'''

if 'SECTION 6: LAYOUT MAX WIDTHS' not in content:
    # Notice the 4 spaces now: '    </main>'
    content = content.replace('    </main>', section_6 + '\n    </main>')
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added Section 6 for Max Widths into page.tsx")
else:
    print("Section 6 already exists in page.tsx")
