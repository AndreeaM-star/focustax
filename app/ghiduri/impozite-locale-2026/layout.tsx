import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impozite Locale 2026 România: Clădiri și Mașini | FocusTax",
  description: "Calculator impozit clădiri și autoturisme 2026. Creșteri semnificative față de 2025. Normă Euro, cilindree, tip proprietate.",
  openGraph: {
    title: "Impozite Locale 2026 | FocusTax",
    description: "Calculează impozitul pe clădiri și mașini în 2026. Creșteri față de 2025.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impozite Locale 2026 | FocusTax",
    description: "Calculator impozit clădiri și mașini 2026 — creșteri față de 2025.",
  },
  alternates: { canonical: "https://focustax.ro/ghiduri/impozite-locale-2026" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Cu cât au crescut impozitele pe clădiri în 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Impozitele pe clădiri au crescut cu până la 150% față de 2025 în unele localități, ca urmare a revalorizării la prețurile pieței. Creșterile variază în funcție de municipiu și tipul clădirii (rezidențial vs comercial).",
      },
    },
    {
      "@type": "Question",
      "name": "Cum se calculează impozitul pe mașini în 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Impozitul auto în 2026 este diferențiat după norma Euro și cilindree. Mașinile electrice plătesc 40 lei/an. Sumele variază de la câteva zeci la câteva sute de lei pe an.",
      },
    },
    {
      "@type": "Question",
      "name": "Până când se plătesc impozitele locale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Impozitele locale se plătesc în două rate: prima jumătate până pe 31 martie și a doua jumătate până pe 30 septembrie. Plata integrală până pe 31 martie oferă o bonificație de 10%.",
      },
    },
  ],
};

export default function ImpoziteLocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  );
}
