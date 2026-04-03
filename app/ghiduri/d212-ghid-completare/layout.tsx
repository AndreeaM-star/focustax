import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ghid Completare D212 2026 — Pas cu Pas | FocusTax",
  description: "Ghid interactiv pentru completarea Declarației Unice D212. Calculator bonificație 3% (termen 15 aprilie 2026). Checklist pre-depunere.",
  openGraph: {
    title: "Ghid D212 2026 | FocusTax",
    description: "Completează D212 corect cu ghidul nostru pas cu pas. Bonificație 3% până pe 15 aprilie.",
  },
};

export default function GhidD212Layout({ children }: { children: React.ReactNode }) {
  return children;
}
