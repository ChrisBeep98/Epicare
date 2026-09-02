import type { Metadata } from "next";

const DESCRIPTION =
  "GO CRM is the Epicare insurance CRM: manage leads, pipelines, automated follow-up, and client communication seamlessly in your agency operation.";

export const metadata: Metadata = {
  title: "GO CRM — Intelligent Pipeline & Client Management | Epicare",
  description: DESCRIPTION,
  alternates: { canonical: "/go-crm/" },
  openGraph: {
    type: "website",
    siteName: "Epicare",
    title: "GO CRM — Intelligent Pipeline & Client Management | Epicare",
    description: DESCRIPTION,
    url: "/go-crm/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GO CRM — Intelligent Pipeline & Client Management | Epicare",
    description: DESCRIPTION,
  },
};

export default function GoCrmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
