import type { Metadata } from "next";

const DESCRIPTION =
  "GO AMS is the Epicare broker portal: manage contracts, clients, production and payouts for your insurance business in a single interface.";

export const metadata: Metadata = {
  title: "GO AMS — The broker portal",
  description: DESCRIPTION,
  alternates: { canonical: "/go-ams/" },
  openGraph: {
    type: "website",
    siteName: "Epicare",
    title: "GO AMS — The broker portal",
    description: DESCRIPTION,
    url: "/go-ams/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GO AMS — The broker portal",
    description: DESCRIPTION,
  },
};

export default function GoAmsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
