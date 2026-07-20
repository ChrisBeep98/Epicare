import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ── TYPOGRAPHY: 3-ROLE FONT SYSTEM ──
// Display · Headings → Inter (variable, optical size axis pinned to 32 via CSS).
const interDisplay = Inter({
  variable: "--font-inter-display",
  axes: ["opsz"],
  subsets: ["latin"],
  display: "swap",
});

// Body · UI → Inter Tight (disciplined grotesk for all functional reading).
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

// Meta · Code → JetBrains Mono (numbers, hex, labels, metadata only).
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Design System Project",
  description: "New project with custom Design System",
};

import I18nProviderClient from "../components/epicare/I18nProviderClient";
import SmoothScrollProvider from "../components/SmoothScrollProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${interDisplay.variable} ${interTight.variable} ${jetBrainsMono.variable} font-body antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-surface-BG-1)] text-[var(--color-text-primary)]">
        <SmoothScrollProvider>
          <I18nProviderClient>
            {children}
          </I18nProviderClient>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
