import type { Metadata } from "next";
import { Container, PageHeader, Section, Callout, Card } from "@/components/ui";
import { absUrl } from "@/lib/site";
import { salariuMinim, fmtLei } from "@/lib/fiscal";
import s from "../d212-ghid-completare/d212.module.css";

export const metadata: Metadata = {
  title: "Facilități fiscale 2026: ce scutiri și deduceri mai există",
  description: "Ce facilități fiscale mai poți folosi în 2026: suma neimpozabilă la salariul minim, deducerea pentru tineri și copii, scutirea pentru persoane cu dizabilități, sponsorizări. Scutirile IT, construcții și agricultură au fost eliminate din 2025.",
  alternates: { canonical: absUrl("/ghiduri/facilitati-fiscale") },
};

export default function FacilitatiPage() {
  const sm = salariuMinim();
  const FACILITATI = [
    { t: "Suma neimpozabilă la salariul minim", d: "300 lei/lună (ianuarie–iunie 2026) și 200 lei/lună (iulie–decembrie 2026) sunt scutite de impozit, CAS și CASS pentru angajații cu normă întreagă plătiți cu salariul minim (brut până la 4.300, respectiv 4.600 lei)." },
    { t: "Deducerea personală", d: `Pentru salarii de până la salariul minim + 2.000 lei: între 20% și 45% din salariul minim (${fmtLei(0.2 * sm)}–${fmtLei(0.45 * sm)} lei), în funcție de persoanele aflate în întreținere.` },
    { t: "Deducere pentru tinerii sub 26 de ani", d: `15% din salariul minim (${fmtLei(0.15 * sm)} lei/lună), pentru salarii de până la salariul minim + 2.000 lei.` },
    { t: "Deducere pentru copii la școală", d: "100 lei/lună pentru fiecare copil minor înscris într-o unitate de învățământ, acordată unui singur părinte, indiferent de salariu." },
    { t: "Persoane cu handicap grav sau accentuat", d: "Veniturile din salarii sunt scutite de impozitul pe venit. Din 2026, impozitul pe locuința de domiciliu se reduce cu 50% (handicap grav) sau 25% (accentuat)." },
    { t: "Pensii facultative și abonamente medicale", d: "Contribuțiile la pensia facultativă (pilonul III) și abonamentele medicale sunt deductibile, fiecare până la echivalentul a 400 EUR pe an." },
    { t: "Sponsorizări din impozitul firmei", d: "Firmele pot direcționa sponsorizări din impozit: până la 20% din impozitul pe profit (limitat la 0,75% din cifra de afaceri) sau din impozitul micro." },
    { t: "Redirecționarea a 3,5% din impozit", d: "Persoanele fizice pot direcționa 3,5% din impozitul pe venit către un ONG sau o unitate de cult, prin formularul 230 sau prin D212." },
  ];

  return (
    <main id="continut">
      <PageHeader
        crumbs={[{ label: "Ghiduri", href: "/ghiduri" }, { label: "Facilități fiscale" }]}
        eyebrow="Ghid · actualizat octombrie 2026"
        title="Facilități fiscale în 2026"
        lead="Ce scutiri și deduceri mai există pentru salariați, persoane fizice și firme și ce s-a eliminat."
      />
      <Container>
        <Callout tone="danger" title="Scutirile pentru IT, construcții și agricultură nu mai există">
          Scutirea de impozit pe venit pentru programatori și scutirile pentru angajații din construcții, agricultură și industria alimentară
          au fost eliminate de la 1 ianuarie 2025, prin OUG 156/2024. Din 2025, acești angajați plătesc aceleași taxe ca ceilalți salariați.
        </Callout>

        <Section title="Ce poți folosi în 2026">
          <div className={s.cards}>
            {FACILITATI.map((f) => <Card key={f.t} title={f.t}><p style={{ color: "var(--ink-2)" }}>{f.d}</p></Card>)}
          </div>
        </Section>

        <Section>
          <Callout tone="neutral">
            Condițiile exacte (documente, plafoane, cine solicită deducerea) sunt stabilite în Codul fiscal și în normele de aplicare.
            Pentru salarii, deducerile se aplică de angajator, pe baza declarației tale și a documentelor justificative.
          </Callout>
        </Section>
      </Container>
    </main>
  );
}
