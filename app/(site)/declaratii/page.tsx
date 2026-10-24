import type { Metadata } from "next";
import { Container, PageHeader, Section, LinkCard, Main, Badge, Callout } from "@/components/ui";
import { declaratii, INLOCUITE } from "./[cod]/data";
import { absUrl } from "@/lib/site";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Declarații fiscale ANAF 2026: termene și ghid de completare",
  description: "Toate declarațiile fiscale importante din România explicate: D212, D300, D394, D100, D101, D112 și altele. Cine le depune, când și ce conțin.",
  alternates: { canonical: absUrl("/declaratii") },
};

const ORDINE = ["Impozit pe Venit", "TVA", "Contribuții Sociale", "Obligații de plată", "Impozit pe Profit", "Accize"];

export default function DeclaratiiPage() {
  const toate = Object.entries(declaratii);
  const rang = (c: string) => (ORDINE.includes(c) ? ORDINE.indexOf(c) : ORDINE.length);
  const categorii = Array.from(new Set(toate.map(([, d]) => d.categorie))).sort((a, b) => rang(a) - rang(b));

  return (
    <Main>
      <PageHeader
        crumbs={[{ label: "Declarații" }]}
        eyebrow="Declarații ANAF · 2026"
        title="Declarații fiscale: ce depui și până când"
        lead="Formularele pe care le depun persoanele fizice, PFA-urile și firmele, cu termene, conținut și linkuri spre formularele oficiale."
      />
      <Container>
        <Callout tone="brand" title="Ai venituri din PFA, chirii, dividende sau investiții?">
          Le declari pe toate într-un singur formular, Declarația unică D212, până la 25 mai a anului următor.
        </Callout>

        {categorii.map((cat) => (
          <Section key={cat} title={cat}>
            <div className={s.grid}>
              {toate.filter(([, d]) => d.categorie === cat).map(([k, d]) => (
                <LinkCard
                  key={k}
                  href={`/declaratii/${k}`}
                  title={<>{d.cod} <span style={{ fontWeight: 500, color: "var(--muted)" }}>· {d.periodicitate}</span></>}
                  desc={d.subtitle}
                  badge={INLOCUITE[k] ? <Badge>înlocuită de {INLOCUITE[k]}</Badge> : <Badge tone="brand">{d.termen.length > 34 ? d.periodicitate : d.termen}</Badge>}
                  meta="Detalii"
                />
              ))}
            </div>
          </Section>
        ))}
      </Container>
    </Main>
  );
}
