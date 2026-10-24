import type { Metadata } from "next";
import { Container, PageHeader, Main } from "@/components/ui";
import { GLOSAR } from "@/lib/glosar";
import { absUrl } from "@/lib/site";
import GlosarList from "./GlosarList";

export const metadata: Metadata = {
  title: "Glosar fiscal: termeni de taxe explicați simplu (CAS, CASS, TVA, D212)",
  description: `${GLOSAR.length} termeni fiscali din România explicați pe înțeles: CAS, CASS, deducere personală, microîntreprindere, TVA la încasare, SPV, e-Factura și alții.`,
  alternates: { canonical: absUrl("/glosar") },
};

export default function GlosarPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glosar fiscal FocusTax",
    inLanguage: "ro-RO",
    hasDefinedTerm: GLOSAR.map((t) => ({ "@type": "DefinedTerm", name: t.termen, description: t.definitie })),
  };
  return (
    <Main>
      <PageHeader
        crumbs={[{ label: "Glosar" }]}
        eyebrow="Glosar fiscal"
        title="Termeni fiscali, pe înțeles"
        lead={`${GLOSAR.length} termeni pe care îi întâlnești în declarații, pe fluturași și în corespondența cu ANAF.`}
      />
      <Container>
        <GlosarList termeni={GLOSAR} />
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Main>
  );
}
