import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://focustax.ro"),
  title: "FocusTax | Claritate în taxe",
  description:
    "Înțelege ce declarații trebuie să depui și când. Ghid complet al declarațiilor fiscale din România — gratuit.",
  openGraph: {
    title: "FocusTax | Claritate în taxe",
    description:
      "Înțelege ce declarații trebuie să depui și când. Ghid complet al declarațiilor fiscale din România.",
    type: "website",
    locale: "ro_RO",
    siteName: "FocusTax",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FocusTax" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusTax | Claritate în taxe",
    description: "Ghid complet al declarațiilor fiscale din România — gratuit.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FocusTax",
  "url": "https://focustax.ro",
  "description": "Platformă fiscală educativă pentru România — calculatoare taxe, ghiduri, calendar fiscal și declarații ANAF actualizate 2026.",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RON" },
  "inLanguage": "ro",
  "publisher": { "@type": "Organization", "name": "FocusTax", "url": "https://focustax.ro" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ScrollProgress />
        {children}
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
