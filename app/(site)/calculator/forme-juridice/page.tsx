import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { absUrl } from "@/lib/site";
import Comparator from "./Comparator";

export const metadata: Metadata = {
  title: { absolute: "Salariat, PFA sau SRL? Comparator forme juridice 2026 | FocusTax" },
  description: "Compară cât îți rămâne pe an ca salariat, PFA în sistem real, SRL microîntreprindere sau SRL cu impozit pe profit, după regulile fiscale din 2026.",
  alternates: { canonical: absUrl("/calculator/forme-juridice") },
};

export default function FormeJuridicePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Calculatoare", href: "/calculator/salariu" }, { label: "Compară forme juridice" }]}
        eyebrow="Comparator · reguli 2026"
        title="Salariat, PFA sau SRL?"
        lead="Pornind de la aceeași sumă încasată pe an, vezi cât îți rămâne în fiecare formă de organizare și unde se duc taxele."
      />
      <Container>
        <Comparator />
      </Container>
    </>
  );
}
