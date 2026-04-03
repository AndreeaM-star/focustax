import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impozite Locale 2026 România: Clădiri și Mașini | FocusTax",
  description: "Calculator impozit clădiri și autoturisme 2026. Creșteri semnificative față de 2025. Normă Euro, cilindree, tip proprietate.",
  openGraph: {
    title: "Impozite Locale 2026 | FocusTax",
    description: "Calculează impozitul pe clădiri și mașini în 2026. Creșteri față de 2025.",
  },
};

export default function ImpoziteLocaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
