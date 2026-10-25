import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, PageHeader, Callout } from "@/components/ui";
import SalariuCalc from "./calcs/SalariuCalc";
import PfaCalc from "./calcs/PfaCalc";
import SrlCalc from "./calcs/SrlCalc";
import ChiriiCalc from "./calcs/ChiriiCalc";
import DividendeCalc from "./calcs/DividendeCalc";
import TvaCalc from "./calcs/TvaCalc";
import CryptoCalc from "./calcs/CryptoCalc";
import D212Calc from "./calcs/D212Calc";
import { CALCULATOARE } from "./meta";
import { absUrl } from "@/lib/site";
import s from "../calculator.module.css";

const COMPONENTE: Record<string, () => React.ReactElement> = {
  salariu: SalariuCalc,
  pfa: PfaCalc,
  srl: SrlCalc,
  chirii: ChiriiCalc,
  dividende: DividendeCalc,
  tva: TvaCalc,
  crypto: CryptoCalc,
  "declaratie-unica": D212Calc,
};

export function generateStaticParams() {
  return Object.keys(CALCULATOARE).map((tip) => ({ tip }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ tip: string }> }): Promise<Metadata> {
  const { tip } = await params;
  const m = CALCULATOARE[tip];
  if (!m) return {};
  return {
    title: { absolute: `${m.title} | FocusTax` },
    description: m.description,
    alternates: { canonical: absUrl(`/calculator/${tip}`) },
    openGraph: { title: m.title, description: m.description, url: absUrl(`/calculator/${tip}`) },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ tip: string }> }) {
  const { tip } = await params;
  const m = CALCULATOARE[tip];
  const Calc = COMPONENTE[tip];
  if (!m || !Calc) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: m.h1,
      url: absUrl(`/calculator/${tip}`),
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "ro-RO",
      offers: { "@type": "Offer", price: "0", priceCurrency: "RON" },
      description: m.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: m.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Calculatoare", href: "/calculator/salariu" }, { label: m.h1 }]}
        eyebrow="Calculator · reguli 2026"
        title={m.h1}
        lead={m.lead}
      />
      <Container>
        <Calc />

        <div className={s.explain}>
          <section>
            <h2 className={s.h2}>Cum se calculează</h2>
            <ol className={s.steps}>
              {m.cum.map((p) => <li key={p}>{p}</li>)}
            </ol>
          </section>
          <section className={s.faq}>
            <h2 className={s.h2}>Întrebări frecvente</h2>
            {m.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>
        </div>

        <div style={{ marginTop: 40 }}>
          <Callout tone="neutral">
            Rezultatele sunt orientative și folosesc regulile fiscale în vigoare în 2026. Pentru situații particulare (venituri din mai multe surse, scutiri, contracte speciale) consultă un expert contabil.
          </Callout>
        </div>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
