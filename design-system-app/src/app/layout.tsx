import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
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
    <html lang="en" className={`${dmSans.variable} font-dmsans antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F2F2F2] dark:bg-[#191A1A] text-[#1A1E21] dark:text-[#E8ECEF]">{children}</body>
    </html>
  );
}
