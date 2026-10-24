import type { Metadata } from "next";
import { Container, PageHeader, Section, Callout } from "@/components/ui";
import { absUrl } from "@/lib/site";
import ImpozitCladire from "./ImpozitCladire";
import s from "../d212-ghid-completare/d212.module.css";

export const metadata: Metadata = {
  title: "Impozite locale 2026: impozitul pe clădiri și pe mașină",
  description: "Cum se calculează impozitul pe locuință și pe mașină în 2026: valori impozabile mai mari, reduceri pentru clădiri vechi și persoane cu dizabilități, impozit auto după norma Euro.",
  alternates: { canonical: absUrl("/ghiduri/impozite-locale-2026") },
};

export default function ImpoziteLocalePage() {
  return (
    <main id="continut">
      <PageHeader
        crumbs={[{ label: "Ghiduri", href: "/ghiduri" }, { label: "Impozite locale 2026" }]}
        eyebrow="Ghid · impozite locale"
        title="Impozitele locale în 2026"
        lead="Ce s-a schimbat la impozitul pe clădiri și pe mașină și cum îți estimezi suma de plată."
      />
      <Container>
        <Section title="Impozitul pe clădiri (persoane fizice)">
          <ul className={s.steps} style={{ listStyle: "none" }}>
            <li><strong>Formula:</strong> impozit = valoarea impozabilă × cota stabilită de consiliul local (pentru locuințe, de regulă 0,1%).</li>
            <li><strong>Valori mai mari în 2026:</strong> Legea 239/2025 a majorat valorile impozabile pe metru pătrat, ceea ce a dus la creșteri importante ale impozitului față de 2025.</li>
            <li><strong>Reduceri pentru clădiri vechi:</strong> OUG 9/2026 a reintrodus reducerea valorii impozabile: −15% pentru locuințele de 50–100 de ani și −25% pentru cele de peste 100 de ani.</li>
            <li><strong>Persoane cu dizabilități:</strong> impozitul pe locuința de domiciliu se reduce cu 50% (handicap grav) sau 25% (handicap accentuat).</li>
            <li><strong>Din 2027:</strong> toate clădirile firmelor vor fi tratate ca nerezidențiale, iar impozitul pe construcții speciale („taxa pe stâlp”) dispare.</li>
          </ul>
        </Section>

        <Section title="Estimează impozitul pe locuință">
          <ImpozitCladire />
        </Section>

        <Section title="Impozitul pe mașină">
          <ul className={s.steps} style={{ listStyle: "none" }}>
            <li><strong>Formula:</strong> numărul de grupe de 200 cm³ (rotunjit în sus) × suma pe grupă, care depinde acum și de norma de poluare Euro.</li>
            <li><strong>Exemplu:</strong> 1.598 cm³, Euro 6 → 8 grupe × 16,5 lei ≈ 132 lei pe an, la care se poate adăuga cota suplimentară a primăriei.</li>
            <li><strong>Mașinile mai vechi și mai poluante</strong> plătesc mai mult pe grupă decât cele Euro 6.</li>
          </ul>
        </Section>

        <Section>
          <Callout tone="info" title="Suma exactă o afli de la primărie">
            Valorile impozabile, cotele și cotele adiționale se stabilesc prin hotărâri ale consiliului local. Verifică decizia de impunere sau contul tău de pe Ghișeul.ro.
          </Callout>
        </Section>
      </Container>
    </main>
  );
}
