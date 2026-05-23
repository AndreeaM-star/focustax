import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ghid Completare D212 2026 — Pas cu Pas | FocusTax",
  description: "Ghid interactiv pentru completarea Declarației Unice D212. Termen depunere: 25 mai 2026. Checklist complet, wizard pas cu pas.",
  openGraph: {
    title: "Ghid D212 2026 | FocusTax",
    description: "Completează D212 corect cu ghidul nostru pas cu pas. Termen: 25 mai 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghid D212 2026 | FocusTax",
    description: "Completează Declarația Unică corect — wizard pas cu pas, termen 25 mai 2026.",
  },
  alternates: { canonical: "https://focustax.ro/ghiduri/d212-ghid-completare" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Care este termenul de depunere pentru D212 în 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Termenul normal de depunere a Declarației Unice D212 pentru veniturile din 2025 este 25 mai 2026. Bonificația de 3% pentru plata anticipată a expirat pe 15 aprilie 2026.",
      },
    },
    {
      "@type": "Question",
      "name": "Cine trebuie să depună D212?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "D212 trebuie depusă de persoanele fizice care au obținut venituri din activități independente (PFA), chirii, investiții (crypto, bursă, dividende) sau din alte surse nesalariale în 2025.",
      },
    },
    {
      "@type": "Question",
      "name": "Cum se depune D212 online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "D212 se depune online prin Spațiul Privat Virtual (SPV) de pe anaf.ro. Ai nevoie de cont SPV activ și semnătură electronică sau token digital.",
      },
    },
    {
      "@type": "Question",
      "name": "Ce contribuții se declară prin D212?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prin D212 se declară impozitul pe venit (10%), CAS (25% pentru venituri din activități independente) și CASS (10% pe venituri pasive care depășesc 24.300 lei).",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "FocusTax", "item": "https://focustax.ro" },
    { "@type": "ListItem", "position": 2, "name": "Ghiduri", "item": "https://focustax.ro/ghiduri" },
    { "@type": "ListItem", "position": 3, "name": "Ghid D212 2026", "item": "https://focustax.ro/ghiduri/d212-ghid-completare" },
  ],
};

export default function GhidD212Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
