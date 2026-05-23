import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glosar Fiscal România 2026 | Termeni Explicați | FocusTax",
  description: "60+ termeni fiscali explicați simplu: ANAF, TVA, CAS, CASS, PFA, SRL, microîntreprindere, e-Factura, D212 și mulți alții.",
  openGraph: {
    title: "Glosar Fiscal România 2026 | FocusTax",
    description: "Toți termenii fiscali importanți explicați simplu și clar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glosar Fiscal România 2026 | FocusTax",
    description: "60+ termeni fiscali: TVA, CAS, CASS, PFA, SRL, D212 și alții.",
  },
  alternates: { canonical: "https://focustax.ro/glosar" },
};

export default function GlosarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
