import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Design System Project",
  description: "New project with custom Design System",
};

import I18nProviderClient from "../components/epicare/I18nProviderClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} font-inter antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-surface-BG-1)] text-[var(--color-text-primary)]">
        <I18nProviderClient>
          {children}
        </I18nProviderClient>
      </body>
    </html>
  );
}
