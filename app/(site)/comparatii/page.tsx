import type { Metadata } from "next";
import { Container, PageHeader, LinkCard, Main, Section } from "@/components/ui";
import { COMPARATII, COMPARATII_IDS } from "./[tip]/data";
import { absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Taxele din România comparate cu Europa: TVA, impozit pe venit, profit, dividende",
  description: "Unde se situează România în Europa la TVA, impozit pe venit, impozit pe profit, contribuții sociale, dividende și plafonul de TVA. Comparații țară cu țară.",
  alternates: { canonical: absUrl("/comparatii") },
};

export default function ComparatiiPage() {
  return (
    <Main>
      <PageHeader
        crumbs={[{ label: "Comparații" }]}
        eyebrow="România vs Europa"
        title="Cât de mari sunt taxele din România?"
        lead="Compară cotele de impozitare din România cu cele din celelalte țări europene, țară cu țară, cu context și istoric."
      />
      <Container>
        <Section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 14 }}>
            {COMPARATII_IDS.map((id) => {
              const c = COMPARATII[id];
              const ro = c.tari.find((t) => t.esteRomania);
              return (
                <LinkCard
                  key={id}
                  href={`/comparatii/${id}`}
                  title={c.titlu}
                  desc={c.descriere}
                  icon="globe"
                  meta={id === "contributii-sociale" ? "Cost total, taxe și net în euro" : ro ? `România: ${ro.cotaStandard}${c.unitateMasura === "%" ? "%" : ` ${c.unitateMasura}`} · media ${c.mediuEuropean}${c.unitateMasura === "%" ? "%" : ` ${c.unitateMasura}`}` : "Compară"}
                />
              );
            })}
          </div>
        </Section>
      </Container>
    </Main>
  );
}
