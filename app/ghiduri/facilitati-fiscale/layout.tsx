import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilități Fiscale IT, Construcții, Agricultură 2026 | FocusTax",
  description: "Scutire impozit venit pentru angajații IT, construcții și agricultură. Calculator comparativ net cu/fără facilitate. Condiții eligibilitate 2026.",
  openGraph: {
    title: "Facilități Fiscale Sectoriale 2026 | FocusTax",
    description: "IT, construcții, agricultură — scutiri impozit și contribuții reduse.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facilități Fiscale IT, Construcții, Agricultură 2026 | FocusTax",
    description: "Calculator scutire impozit venit și condiții eligibilitate 2026.",
  },
  alternates: { canonical: "https://focustax.ro/ghiduri/facilitati-fiscale" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Cine beneficiază de scutire impozit IT în 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Angajații din IT cu salariu brut ≤ 10.000 lei/lună beneficiază de scutire completă de impozit pe venit (10%). Angajatorul trebuie să fie înregistrat cu cod CAEN specific IT și să realizeze venituri din software.",
      },
    },
    {
      "@type": "Question",
      "name": "Facilitatea IT se aplică și la CASS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nu. Scutirea IT vizează doar impozitul pe venit. CAS (25%) și CASS (10%) se rețin normal. Facilitatea se traduce în net mai mare cu suma impozitului scutit.",
      },
    },
    {
      "@type": "Question",
      "name": "Ce condiții trebuie să îndeplinească angajatorul pentru facilitatea construcții?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Angajatorul din construcții trebuie să aibă activitate principală în construcții (CAEN 41, 42, 43) și minim 80% din cifra de afaceri din această activitate. Salariatul beneficiază de scutire impozit și CASS redusă.",
      },
    },
  ],
};

export default function FacilitatiFiscaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  );
}
