import type { Metadata } from "next";
import { Container, PageHeader, Main, Callout } from "@/components/ui";
import { termeneAn } from "@/lib/calendar";
import { absUrl } from "@/lib/site";
import CalendarView from "./CalendarView";
import AlerteForm from "@/components/AlerteForm";

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
        <div style={{ marginTop: 40 }}><AlerteForm sursa="calendar" /></div>
        <div style={{ marginTop: 32 }}>
          <Callout tone="info" title="Din 2027, termenele micro și profit se despart">
            Microîntreprinderile revin la termenul din ianuarie: impozitul pe trimestrul IV 2026 se declară și se plătește până la 25 ianuarie 2027.
            Pentru impozitul pe profit, termenul de 25 iunie a devenit definitiv prin OUG 8/2026: declarația D101 pentru anul 2026 se depune până la 25 iunie 2027.
          </Callout>
        </div>
      </Container>
    </Main>
  );
}
