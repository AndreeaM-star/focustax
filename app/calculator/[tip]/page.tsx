import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SalariuCalc    from "./calcs/SalariuCalc";
import PfaCalc        from "./calcs/PfaCalc";
import SrlCalc        from "./calcs/SrlCalc";
import ChiriiCalc     from "./calcs/ChiriiCalc";
import DividendeCalc  from "./calcs/DividendeCalc";
import TvaCalc        from "./calcs/TvaCalc";

const META: Record<string, { title: string; description: string }> = {
  salariu:   { title: "Calculator Salariu Net 2026",            description: "Calculează salariul net din brut — CAS 25%, CASS 10%, impozit 10%, deducere personală." },
  pfa:       { title: "Calculator PFA / II 2026",               description: "Calculator impozite PFA norma de venit sau sistem real — CAS, CASS, impozit venit." },
  srl:       { title: "Calculator SRL / Microîntreprindere 2026", description: "Calculator impozit micro 1%/3%, impozit profit 16%, dividende." },
  chirii:    { title: "Calculator Chirii 2026",                  description: "Calculator impozit venituri din chirii — deducere 20%, impozit 10%, CASS." },
  dividende: { title: "Calculator Dividende 2026",               description: "Calculator impozit dividende 8% + CASS, distribuire profit." },
  tva:       { title: "Calculator TVA 2026",                     description: "Calculează TVA colectat, deductibil, de plată — cote 19%, 9%, 5%, 0%." },
};

export async function generateMetadata({ params }: { params: Promise<{ tip: string }> }): Promise<Metadata> {
  const { tip } = await params;
  const meta = META[tip];
  if (!meta) return {};
  return {
    title: `${meta.title} | FocusTax`,
    description: meta.description,
    openGraph: { title: `${meta.title} | FocusTax`, description: meta.description },
  };
}

export function generateStaticParams() {
  return Object.keys(META).map((tip) => ({ tip }));
}

export default async function TipPage({ params }: { params: Promise<{ tip: string }> }) {
  const { tip } = await params;

  switch (tip) {
    case "salariu":   return <SalariuCalc />;
    case "pfa":       return <PfaCalc />;
    case "srl":       return <SrlCalc />;
    case "chirii":    return <ChiriiCalc />;
    case "dividende": return <DividendeCalc />;
    case "tva":       return <TvaCalc />;
    default:          return notFound();
  }
}
