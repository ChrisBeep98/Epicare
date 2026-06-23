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

import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/es.json';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`dark ${inter.variable} font-inter antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-surface-BG-1)] text-[var(--color-text-primary)]">
        <NextIntlClientProvider locale="es" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
