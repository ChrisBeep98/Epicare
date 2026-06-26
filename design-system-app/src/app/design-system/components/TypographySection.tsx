"use client";

import React from "react";
import { useState } from "react";
import TypeRow from "./TypeRow";

export default function TypographySection() {
  const [previewFont, setPreviewFont] = useState("inter");
  const [previewSecondaryFont, setPreviewSecondaryFont] = useState("inter");

  return (
    <>
      <section className="mb-32 relative">
          <div className="sticky top-0 z-40 bg-[var(--color-surface-BG-base)]/90 backdrop-blur-xl pt-6 pb-4 mb-10 border-b border-[var(--color-border-Strokes-default)] flex flex-col md:flex-row md:items-end justify-between gap-6 transition-colors duration-500">
            <div>
              <h2 className="text-h1 mb-2">3. Cognitive Typography</h2>
              <p className="text-body-sm text-[var(--color-text-muted)] max-w-lg">
                Preview our premium serif and display fonts.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 shrink-0">
            </div>
          </div>

          
          
          
          <div className="organic-glass-panel p-8 md:p-12 flex flex-col gap-12">
            {[
              { token: ".text-display-3xl", name: "Display 3XL", text: "IMMENSE", details: `Size: clamp(6rem, 12vw, 12rem)
Weight: 500
Line-height: 0.95
Letter-spacing: -0.02em` },
              { token: ".text-display-2xl", name: "Display 2XL", text: "GIANT", details: `Size: clamp(4.5rem, 8vw, 8rem)
Weight: 500
Line-height: 1
Letter-spacing: -0.01em` },
              { token: ".text-display-xl", name: "Display XL", text: "GO AMS Portal", details: `Size: clamp(3.5rem, 6vw, 6rem)
Weight: 500
Line-height: 1.1` },
              { token: ".text-display-lg", name: "Display LG", text: "Agent Dashboard", details: `Size: clamp(3rem, 5vw, 4.5rem)
Weight: 600
Line-height: 1.1` },
              { token: ".text-display", name: "Display", text: "Sales Performance", details: `Size: clamp(2.5rem, 4vw, 3.5rem)
Weight: 500
Line-height: 1.15` },
              { token: ".text-display-sm", name: "Display SM", text: "Client Portfolio", details: `Size: clamp(2rem, 3vw, 2.5rem)
Weight: 500
Line-height: 1.2` },
              { token: ".text-h1", name: "H1 Section", text: "Commission Tracking", details: `Size: clamp(1.75rem, 2.5vw, 2.25rem)
Weight: 500
Line-height: 1.2` },
              { token: ".text-h2", name: "H2 Sub-section", text: "Active Policies", details: `Size: clamp(1.5rem, 2vw, 1.875rem)
Weight: 500
Line-height: 1.3` },
              { token: ".text-h3", name: "H3 Card", text: "Lead Generation", details: `Size: clamp(1.25rem, 1.5vw, 1.5rem)
Weight: 500
Line-height: 1.3` },
              { token: ".text-h4", name: "H4 Subtitle", text: "Monthly Targets", details: `Size: clamp(1.125rem, 1.25vw, 1.25rem)
Weight: 500
Line-height: 1.4` },
              { token: ".text-h5", name: "H5 Small", text: "Approved", details: `Size: 1.125rem
Weight: 500
Line-height: 1.5` },
              { token: ".text-h6", name: "H6 Micro", text: "Policy ID #4092", details: `Size: 1rem
Weight: 500
Line-height: 1.5` },
              { token: ".text-h7", name: "H7 Nano", text: "Dropdown Menu Option", details: `Size: 0.875rem
Weight: 500
Line-height: 1.6` }
            ].map(item => (
              <TypeRow key={item.token} {...item} font={previewFont} overrideFont={previewFont} />
            ))}
            <TypeRow token=".text-overline" name="Overline" font={previewSecondaryFont} text="AGENT OVERVIEW" overrideFont={previewSecondaryFont} details={`Size: 0.875rem
Weight: 600
Tracking: 0.1em`} />
            <TypeRow token=".text-subtitle" name="Subtitle" font={previewSecondaryFont} text="Manage your insurance portfolio, track daily sales metrics, and connect with your high-value clients." overrideFont={previewSecondaryFont} details={`Size: clamp(1.125rem, 2vw, 1.5rem)
Weight: 300
Line-height: 1.5`} />
            <TypeRow token=".text-body-2xl" name="Body 2XL" font={previewSecondaryFont} text="Your sales performance this quarter has exceeded targets by 15%, maintaining a strong retention rate across all premium insurance packages." overrideFont={previewSecondaryFont} details={`Size: 1.5rem
Weight: 300
Line-height: 1.5`} />
            <TypeRow token=".text-body-2xl-light" name="Body 2XL Light" font={previewSecondaryFont} text="Review the latest policy updates and ensure all client documentation is properly submitted for final underwriting approval." overrideFont={previewSecondaryFont} details={`Size: 1.5rem
Weight: 200
Line-height: 1.5`} />
            <TypeRow token=".text-body-xl" name="Body XL" font={previewSecondaryFont} text="Please review the attached life insurance policy details before sending the digital signature request to the client." overrideFont={previewSecondaryFont} details={`Size: 1.25rem
Weight: 300
Line-height: 1.5`} />
            <TypeRow token=".text-body-lg" name="Body LG" font={previewSecondaryFont} text="The dashboard provides a real-time overview of your active health and auto policies, including pending renewals." overrideFont={previewSecondaryFont} details={`Size: 1.125rem
Weight: 300
Line-height: 1.6`} />
            <TypeRow token=".text-body-lg-light" name="Body LG Light" font={previewSecondaryFont} text="Agent commissions are automatically calculated at the end of each billing cycle based on successfully bound policies." overrideFont={previewSecondaryFont} details={`Size: 1.125rem
Weight: 200
Line-height: 1.6`} />
            <TypeRow token=".text-body-md" name="Body MD" font={previewSecondaryFont} text="Select a specific agent from the directory to view their historical conversion rates and overall client satisfaction scores." overrideFont={previewSecondaryFont} details={`Size: 1rem
Weight: 300
Line-height: 1.6`} />
            <TypeRow token=".text-body" name="Body" font={previewSecondaryFont} text="The GO AMS platform centralizes all lead management, allowing agents to instantly follow up on new quote requests and process applications." overrideFont={previewSecondaryFont} details={`Size: 1rem
Weight: 300
Line-height: 1.6`} />
            <TypeRow token=".text-body-light" name="Body Light" font={previewSecondaryFont} text="Ensure that the beneficiary information is accurate and fully verified before submitting the final contract." overrideFont={previewSecondaryFont} details={`Size: 1rem
Weight: 200
Line-height: 1.6`} />
            <TypeRow token=".text-body-sm" name="Body SM" font={previewSecondaryFont} text="By clicking submit, you agree to the terms of service and acknowledge that your data will be processed according to our privacy policy." overrideFont={previewSecondaryFont} details={`Size: 0.875rem
Weight: 300
Line-height: 1.6`} />
            <TypeRow token=".text-body-sm-light" name="Body SM Light" font={previewSecondaryFont} text="The premium calculation includes a standard multi-policy discount applied to the client’s home and auto bundle." overrideFont={previewSecondaryFont} details={`Size: 0.875rem
Weight: 200
Line-height: 1.6`} />
            <TypeRow token=".text-body-xs" name="Body XS" font={previewSecondaryFont} text="Required fields are marked with an asterisk (*). Please complete all fields before submitting your application." overrideFont={previewSecondaryFont} details={`Size: 0.75rem
Weight: 300
Line-height: 1.6`} />
            <TypeRow token=".text-ui-label" name="UI Label" font={previewSecondaryFont} text="Generate Quote" overrideFont={previewSecondaryFont} details={`Size: 0.875rem
Weight: 500
Tracking: 0.05em`} />
            <TypeRow token=".text-data" name="Data" font="geist-mono" text="$14,500.00 YTD" details={`Size: 1rem
Font: Monospace`} />
            <TypeRow token=".text-caption" name="Caption" font={previewSecondaryFont} text="Last updated today at 14:30 EST. Secured via 256-bit encryption." overrideFont={previewSecondaryFont} details={`Size: 0.75rem
Weight: 400
Line-height: 1.5`} />
          </div>



        </section>
    </>
  );
}