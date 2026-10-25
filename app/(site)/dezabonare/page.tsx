import type { Metadata } from "next";
import { Container, PageHeader, Main, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Dezabonare",
  robots: { index: false, follow: false },
};

export default async function DezabonarePage({ searchParams }: { searchParams: Promise<{ stare?: string }> }) {
  const { stare } = await searchParams;
  const ok = stare === "ok";
  return (
    <Main>
      <PageHeader
        title={ok ? "Te-ai dezabonat" : "Linkul nu mai e valid"}
        lead={ok ? "Nu îți mai trimitem alerte fiscale pe e-mail. Te poți abona din nou oricând." : "Scrie-ne la focustaxro@gmail.com și te dezabonăm manual."}
      />
      <Container>
        <ButtonLink href="/" icon="arrowRight">Înapoi la FocusTax</ButtonLink>
      </Container>
    </Main>
  );
}
