import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Jackal Studio — Agence web et IA à Mâcon",
    template: "%s | Jackal Studio",
  },
  description: siteConfig.description,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.locality,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.country,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#service`,
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      areaServed: {
        "@type": "City",
        name: siteConfig.locality,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.locality,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.country,
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
