import type { Metadata } from "next";
import { Montserrat, Open_Sans, Dancing_Script } from "next/font/google";
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

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-dancing-script",
});

export const metadata: Metadata = {
  title: "FocusTax | Claritate în taxe",
  description:
    "Vrei claritate în taxe? Alege FocusTax – Ghid complet al declarațiilor fiscale din România.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ro"
      className={`${montserrat.variable} ${openSans.variable} ${dancingScript.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
