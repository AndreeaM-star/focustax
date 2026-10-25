import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/lib/site";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const GA_ID = "G-5PK0G1QWLR";

const DESCRIERE =
  "Calculatoare de taxe, ghiduri și termene fiscale pentru România, actualizate 2026: salariu net, PFA, SRL, dividende, chirii, TVA și declarații ANAF.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FocusTax — calculatoare de taxe și ghiduri fiscale pentru România",
    template: "%s | FocusTax",
  },
  description: DESCRIERE,
  applicationName: "FocusTax",
  openGraph: {
    title: "FocusTax — claritate în taxe",
    description: DESCRIERE,
    url: SITE_URL,
    type: "website",
    locale: "ro_RO",
    siteName: "FocusTax",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FocusTax" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusTax — claritate în taxe",
    description: DESCRIERE,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1210" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "FocusTax",
      url: `${SITE_URL}/`,
      email: "focustaxro@gmail.com",
      logo: `${SITE_URL}/icon.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "FocusTax",
      url: `${SITE_URL}/`,
      inLanguage: "ro-RO",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

/**
 * Google Consent Mode v2: totul refuzat implicit; analytics se activează doar după „Accept”
 * în bannerul de cookie-uri (alegerea e păstrată în localStorage „ft-consent”).
 */
const consentScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});try{if(localStorage.getItem('ft-consent')==='da')gtag('consent','update',{analytics_storage:'granted'})}catch(e){}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;

/** Aplică tema salvată înainte de primul render, ca să nu clipească pagina */
const themeScript = `try{var t=localStorage.getItem("ft-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: consentScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#continut" className="skip-to-content">Salt la conținut</a>
        {children}
        <Analytics />
        <SpeedInsights />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <CookieBanner />
      </body>
    </html>
  );
}
