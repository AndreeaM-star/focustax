import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusTax | Claritate în taxe",
    description: "Ghid complet al declarațiilor fiscale din România — gratuit.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
