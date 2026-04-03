import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar Fiscal 2026 | Termene Declarații ANAF | FocusTax",
  description: "Calendar interactiv cu toate termenele fiscale 2026. Personalizat pe profilul tău: PFA, SRL, chirii, investiții. Includ termene D212, D300, D112.",
  openGraph: {
    title: "Calendar Fiscal 2026 | FocusTax",
    description: "Toate termenele fiscale 2026 într-un singur loc. Personalizat pe profilul tău.",
  },
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
