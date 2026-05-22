import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ghid Completare D212 2026 — Pas cu Pas | FocusTax",
  description: "Ghid interactiv pentru completarea Declarației Unice D212. Termen depunere: 25 mai 2026. Checklist complet, wizard pas cu pas.",
  openGraph: {
    title: "Ghid D212 2026 | FocusTax",
    description: "Completează D212 corect cu ghidul nostru pas cu pas. Termen: 25 mai 2026.",
  },
};

export default function GhidD212Layout({ children }: { children: React.ReactNode }) {
  return children;
}
