import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar Fiscal 2026 | Termene Declarații ANAF | FocusTax",
  description: "Calendar interactiv cu toate termenele fiscale 2026. Personalizat pe profilul tău: PFA, SRL, chirii, investiții. Includ termene D212, D300, D112.",
  openGraph: {
    title: "Calendar Fiscal 2026 | FocusTax",
    description: "Toate termenele fiscale 2026 într-un singur loc. Personalizat pe profilul tău.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendar Fiscal 2026 | FocusTax",
    description: "Termene fiscale 2026 personalizate: PFA, SRL, chirii, investiții.",
  },
  alternates: { canonical: "https://focustax.ro/calendar" },
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
