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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} font-inter antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F2F2F2] dark:bg-[#191A1A] text-[#1A1E21] dark:text-[#E8ECEF]">{children}</body>
    </html>
  );
}
