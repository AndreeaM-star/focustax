import type { Metadata } from "next";
import { Container, PageHeader, Main } from "@/components/ui";
import { NOUTATI, CATEGORII_NOUTATI } from "@/lib/noutati";
import { absUrl } from "@/lib/site";
import NoutatiList from "./NoutatiList";

export const metadata: Metadata = {
  title: "Noutăți fiscale 2026: modificări Cod fiscal, ANAF, TVA, salariu minim",
  description: "Modificările fiscale din România explicate pe scurt: TVA, salariul minim, dividende, microîntreprinderi, CAEN, termene ANAF. Actualizat octombrie 2026.",
  alternates: { canonical: absUrl("/noutati") },
};

export default function NoutatiPage() {
  return (
    <Main>
      <PageHeader
        crumbs={[{ label: "Noutăți" }]}
        eyebrow="Noutăți fiscale · actualizat octombrie 2026"
        title="Ce s-a schimbat în taxe"
        lead="Modificările legislative care contează pentru salariați, PFA-uri și firme, explicate în câteva rânduri."
      />
      <Container>
        <NoutatiList noutati={NOUTATI} categorii={CATEGORII_NOUTATI} />
      </Container>
    </Main>
  );
}
