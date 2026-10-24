import type { Metadata } from "next";
import { Container, PageHeader, LinkCard, Main, Section, Badge } from "@/components/ui";
import { sisteme } from "./[sistem]/data";
import { absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sisteme ANAF explicate: e-Factura, SPV, RO e-TVA, e-Transport, SAF-T",
  description: "Platformele digitale ANAF pe înțeles: ce este fiecare, cine este obligat să-l folosească, termene și sancțiuni. e-Factura, SPV, RO e-TVA, RO e-Transport, OSS.",
  alternates: { canonical: absUrl("/sisteme") },
};

export default function SistemePage() {
  return (
    <Main>
      <PageHeader
        crumbs={[{ label: "Sisteme ANAF" }]}
        eyebrow="Sisteme informatice ANAF"
        title="Platformele prin care lucrezi cu ANAF"
        lead="De la facturare electronică la transport și TVA precompletat: ce face fiecare sistem, cine e obligat și ce riști dacă nu îl folosești."
      />
      <Container>
        <Section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 14 }}>
            {Object.values(sisteme).map((x) => (
              <LinkCard
                key={x.id}
                href={`/sisteme/${x.id}`}
                title={x.titlu}
                desc={x.descriereScurta}
                icon="server"
                badge={x.obligatoriuDin ? <Badge tone="accent">obligatoriu din {x.obligatoriuDin}</Badge> : undefined}
                meta="Detalii"
              />
            ))}
          </div>
        </Section>
      </Container>
    </Main>
  );
}
