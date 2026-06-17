import re

page_path = 'design-system-app/src/app/design-system/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_section_6 = '''        {/* --- SECTION 6: LAYOUT MAX WIDTHS --- */}
        <section className="mb-32">
          <div className="mb-12 text-center">
            <h2 className="text-h1">6. Desktop Layout Max-Width</h2>
            <p className="text-body-lg text-[var(--color-text-muted)] mt-4 max-w-2xl mx-auto">
              Contenedores maestros de la aplicación. Haz clic en las medidas para ver cómo el dashboard reacciona y se ajusta a su límite real (escalas exactas en CSS).
            </p>
          </div>

          <div className="flex flex-col gap-12 items-center w-full">
            {/* Controles de Medida */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {[
                { id: 'max-w-section-sm', px: '768px', rem: '48rem', desc: 'Formularios y Login' },
                { id: 'max-w-section-md', px: '1024px', rem: '64rem', desc: 'Artículos / Detalle' },
                { id: 'max-w-section-lg', px: '1280px', rem: '80rem', desc: 'Dashboards GO AMS' },
                { id: 'max-w-section-xl', px: '1536px', rem: '96rem', desc: 'Tablas Extensas' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setActiveMaxWidth(opt.id)}
                  className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all w-60 ${
                    activeMaxWidth === opt.id 
                      ? 'bg-[var(--color-surface-BG-base)] border-[var(--color-text-primary)] shadow-md scale-105' 
                      : 'bg-[var(--color-surface-BG-1)] border-[var(--color-border-Strokes-default)]/50 hover:border-[var(--color-text-muted)]'
                  }`}
                >
                  <span className="text-ui-label font-bold mb-1">{opt.id}</span>
                  <span className="text-data text-[var(--color-text-primary)]">{opt.px}</span>
                  <span className="text-caption text-[var(--color-text-muted)] mt-2">{opt.desc}</span>
                </button>
              ))}
            </div>

            {/* Dashboard Demo - Usando la clase CSS nativa real */}
            <div className="w-full bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] rounded-3xl p-8 flex flex-col items-center">
               
               <p className="text-caption text-[var(--color-text-muted)] mb-8 font-mono">
                 Aplicando clase: {activeMaxWidth}
               </p>

               {/* El Dashboard que reacciona a la medida */}
               <div className={`${activeMaxWidth} bg-[var(--color-surface-BG-base)] border border-[var(--color-border-Strokes-default)] rounded-2xl p-6 shadow-2xl transition-all duration-700 w-full`}>
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
                 <div className="flex gap-4 mb-4 overflow-hidden">
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl min-w-[120px]"></div>
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl min-w-[120px] hidden sm:block"></div>
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl min-w-[120px] hidden md:block"></div>
                   <div className="flex-1 h-24 bg-[var(--color-surface-BG-1)] rounded-xl min-w-[120px] hidden lg:block"></div>
                 </div>
                 <div className="flex-1 bg-[var(--color-surface-BG-1)] rounded-xl flex items-center justify-center min-h-[200px]">
                    <p className="text-body-sm text-[var(--color-text-hint)] text-center">
                       Contenido restringido por<br/>
                       <strong className="text-[var(--color-text-primary)]">{activeMaxWidth}</strong>
                    </p>
                 </div>
               </div>
               
            </div>
          </div>
        </section>'''

# Reemplazar la sección 6
pattern = r'\{\/\* --- SECTION 6: LAYOUT MAX WIDTHS.*?<\/section>'
content = re.sub(pattern, new_section_6, content, flags=re.DOTALL)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored Dashboard mockup with native CSS real scales, removed fake thumbnails, and respected layout bounds.")
