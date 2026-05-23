import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compară Forme Juridice 2026: Angajat vs PFA vs SRL | FocusTax",
  description: "Simulator fiscal gratuit: compară venitul net pentru angajat CIM, PFA sistem real, PFA normă, SRL micro și SRL profit în 2026. Valori actualizate.",
  openGraph: {
    title: "Simulator Forme Juridice 2026 | FocusTax",
    description: "Compară instant venitul net ca angajat, PFA sau SRL în 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulator Forme Juridice 2026 | FocusTax",
    description: "Angajat vs PFA vs SRL — compară venitul net rapid, gratuit.",
  },
  alternates: { canonical: "https://focustax.ro/calculator/forme-juridice" },
};

export default function FormeJuridiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
