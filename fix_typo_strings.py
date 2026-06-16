import re

page_path = 'design-system-app/src/app/design-system/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace details: "..." with details: `...` where it spans multiple lines.
# But wait, right now the file has actual literal newlines inside the quotes.
# I can just re-run the previous string creation but using backticks for the details value.
new_typography_jsx = '''
          <div className="organic-glass-panel p-8 md:p-12 flex flex-col gap-12">
            {[
              { token: ".text-display-xl", name: "Display XL", text: "Artisanal Coffee", details: `Size: clamp(3.5rem, 6vw, 6rem)\\nWeight: 700\\nLine-height: 1.1` },
              { token: ".text-display-lg", name: "Display LG", text: "Mastering Craft", details: `Size: clamp(3rem, 5vw, 4.5rem)\\nWeight: 700\\nLine-height: 1.1` },
              { token: ".text-display", name: "Display", text: "Heritage", details: `Size: clamp(2.5rem, 4vw, 3.5rem)\\nWeight: 700\\nLine-height: 1.15` },
              { token: ".text-display-sm", name: "Display SM", text: "A Legacy", details: `Size: clamp(2rem, 3vw, 2.5rem)\\nWeight: 700\\nLine-height: 1.2` },
              { token: ".text-h1", name: "H1 Section", text: "Our Origins", details: `Size: clamp(1.75rem, 2.5vw, 2.25rem)\\nWeight: 700\\nLine-height: 1.2` },
              { token: ".text-h2", name: "H2 Sub-section", text: "The Terroir", details: `Size: clamp(1.5rem, 2vw, 1.875rem)\\nWeight: 600\\nLine-height: 1.3` },
              { token: ".text-h3", name: "H3 Card", text: "Espresso", details: `Size: clamp(1.25rem, 1.5vw, 1.5rem)\\nWeight: 600\\nLine-height: 1.3` },
              { token: ".text-h4", name: "H4 Subtitle", text: "Tasting Notes", details: `Size: clamp(1.125rem, 1.25vw, 1.25rem)\\nWeight: 600\\nLine-height: 1.4` },
              { token: ".text-h5", name: "H5 Small", text: "Roasted", details: `Size: 1.125rem\\nWeight: 500\\nLine-height: 1.5` },
              { token: ".text-h6", name: "H6 Micro", text: "Aroma Profile", details: `Size: 1rem\\nWeight: 500\\nLine-height: 1.5` }
            ].map(item => (
              <TypeRow key={item.token} {...item} font={previewFont} overrideFont={previewFont} />
            ))}
            <TypeRow token=".text-overline" name="Overline" font={previewSecondaryFont} text="Premium Selection" overrideFont={previewSecondaryFont} details={`Size: 0.875rem\\nWeight: 600\\nTracking: 0.1em`} />
            <TypeRow token=".text-subtitle" name="Subtitle" font={previewSecondaryFont} text="A smooth, balanced cup that reflects the rich volcanic soils." overrideFont={previewSecondaryFont} details={`Size: clamp(1.125rem, 2vw, 1.5rem)\\nWeight: 400\\nLine-height: 1.5`} />
            <TypeRow token=".text-body-2xl" name="Body 2XL" font={previewSecondaryFont} text="This is the largest body text, used for premium reading experiences." overrideFont={previewSecondaryFont} details={`Size: 1.5rem\\nWeight: 400\\nLine-height: 1.5`} />
            <TypeRow token=".text-body-xl" name="Body XL" font={previewSecondaryFont} text="Extra large body text, providing excellent legibility." overrideFont={previewSecondaryFont} details={`Size: 1.25rem\\nWeight: 400\\nLine-height: 1.5`} />
            <TypeRow token=".text-body-lg" name="Body LG" font={previewSecondaryFont} text="Large body text, offering a comfortable reading rhythm." overrideFont={previewSecondaryFont} details={`Size: 1.125rem\\nWeight: 400\\nLine-height: 1.6`} />
            <TypeRow token=".text-body-md" name="Body MD" font={previewSecondaryFont} text="Medium body text, the standard for article paragraphs." overrideFont={previewSecondaryFont} details={`Size: 1rem\\nWeight: 400\\nLine-height: 1.6`} />
            <TypeRow token=".text-body" name="Body" font={previewSecondaryFont} text="Our beans are carefully hand-picked by local farmers who have dedicated generations." overrideFont={previewSecondaryFont} details={`Size: 1rem\\nWeight: 400\\nLine-height: 1.6`} />
            <TypeRow token=".text-body-sm" name="Body SM" font={previewSecondaryFont} text="Small body text, used for secondary descriptions and minor details." overrideFont={previewSecondaryFont} details={`Size: 0.875rem\\nWeight: 400\\nLine-height: 1.6`} />
            <TypeRow token=".text-body-xs" name="Body XS" font={previewSecondaryFont} text="Extra small body text, for dense information areas." overrideFont={previewSecondaryFont} details={`Size: 0.75rem\\nWeight: 400\\nLine-height: 1.6`} />
            <TypeRow token=".text-ui-label" name="UI Label" font={previewSecondaryFont} text="Add to Cart" overrideFont={previewSecondaryFont} details={`Size: 0.875rem\\nWeight: 500\\nTracking: 0.05em`} />
            <TypeRow token=".text-data" name="Data" font="geist-mono" text="$24.00 USD" details={`Size: 1rem\\nFont: Monospace`} />
            <TypeRow token=".text-caption" name="Caption" font={previewSecondaryFont} text="Footnotes, timestamps, and tiny details." overrideFont={previewSecondaryFont} details={`Size: 0.75rem\\nWeight: 400\\nLine-height: 1.5`} />
          </div>
'''

content = re.sub(r'<div className="organic-glass-panel p-8 md:p-12 flex flex-col gap-12">.*?</div>', new_typography_jsx, content, flags=re.DOTALL)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(content)
