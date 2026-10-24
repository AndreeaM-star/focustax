import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container, ButtonLink, LinkCard } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="continut" style={{ padding: "80px 0 40px" }}>
        <Container>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "4rem", color: "var(--brand)", lineHeight: 1 }}>404</p>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginTop: 12 }}>Pagina nu există</h1>
          <p style={{ color: "var(--ink-2)", marginTop: 12, maxWidth: "52ch" }}>
            Linkul e greșit sau pagina a fost mutată. Poate te ajută una dintre paginile de mai jos.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <ButtonLink href="/" icon="arrowRight">Pagina principală</ButtonLink>
            <ButtonLink href="/calculator/salariu" variant="secondary">Calculatoare</ButtonLink>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: 14, marginTop: 48 }}>
            <LinkCard href="/ghiduri" title="Ghiduri fiscale" icon="book" />
            <LinkCard href="/declaratii" title="Declarații ANAF" icon="file" />
            <LinkCard href="/calendar" title="Calendar fiscal" icon="calendar" />
            <LinkCard href="/glosar" title="Glosar" icon="search" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
