import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Calculator Taxe | FocusTax",
  description:
    "Calculator online pentru impozite și contribuții fiscale din România — salariu, PFA, microîntreprindere și impozit pe profit. Actualizat 2025.",
  openGraph: {
    title: "Calculator Taxe România 2025 | FocusTax",
    description:
      "Calculează instant salariul net, impozitele PFA și taxele pentru firmă. Gratuit, conform Codului Fiscal.",
  },
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
