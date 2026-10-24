import type { Metadata } from "next";
import { Container, PageHeader, Main, Callout } from "@/components/ui";
import { termeneAn } from "@/lib/calendar";
import { absUrl } from "@/lib/site";
import CalendarView from "./CalendarView";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Calendar fiscal 2026–2027: toate termenele ANAF",
  description: "Termenele fiscale pentru 2026 și 2027, filtrate după profilul tău: salarii (D112), TVA (D300, D394), micro și profit (D100, D101), Declarația unică D212. Cu mutarea automată în prima zi lucrătoare.",
  alternates: { canonical: absUrl("/calendar") },
};

export default function CalendarPage() {
  const an = new Date().getFullYear();
  const ani = [an, an + 1];
  return (
    <Main>
      <PageHeader
        crumbs={[{ label: "Calendar fiscal" }]}
        eyebrow="Calendar fiscal"
        title="Toate termenele fiscale, într-un loc"
        lead="Alege ce te privește și vezi doar termenele tale. Când un termen cade în weekend sau de sărbătoare, se mută pe prima zi lucrătoare."
      />
      <Container>
        <CalendarView termene={Object.fromEntries(ani.map((a) => [a, termeneAn(a)]))} ani={ani} />
        <div style={{ marginTop: 32 }}>
          <Callout tone="info" title="Ultimul an cu termenul de 25 iunie">
            Impozitul pe profit anual (D101) și impozitul micro pe trimestrul IV 2025 au avut termen 25 iunie 2026. Din 2027 se revine la termenele standard: 25 martie pentru D101 și 25 ianuarie pentru trimestrul IV la microîntreprinderi.
          </Callout>
        </div>
      </Container>
    </Main>
  );
}
