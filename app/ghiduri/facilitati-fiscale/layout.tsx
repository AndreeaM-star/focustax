import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilități Fiscale IT, Construcții, Agricultură 2026 | FocusTax",
  description: "Scutire impozit venit pentru angajații IT, construcții și agricultură. Calculator comparativ net cu/fără facilitate. Condiții eligibilitate 2026.",
  openGraph: {
    title: "Facilități Fiscale Sectoriale 2026 | FocusTax",
    description: "IT, construcții, agricultură — scutiri impozit și contribuții reduse.",
  },
};

export default function FacilitatiFiscaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
