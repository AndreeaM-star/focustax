import type { Metadata } from "next";
import { Container, PageHeader, Main } from "@/components/ui";
import { absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termeni de utilizare",
  description: "Condițiile în care poți folosi FocusTax.ro: caracter informativ, limitarea răspunderii, asistentul AI.",
  alternates: { canonical: absUrl("/termeni") },
};

export default function TermeniPage() {
  return (
    <Main>
      <PageHeader crumbs={[{ label: "Termeni de utilizare" }]} eyebrow="Actualizat: 26 octombrie 2026" title="Termeni de utilizare" />
      <Container>
        <div className="prose">
          <h2>Ce este FocusTax</h2>
          <p>
            FocusTax.ro publică informații generale despre legislația fiscală din România și pune la dispoziție calculatoare orientative.
            FocusTax nu este un serviciu al ANAF și nu este afiliat vreunei autorități publice.
          </p>

          <h2>Informații generale, nu consultanță</h2>
          <p>
            Conținutul site-ului, rezultatele calculatoarelor și răspunsurile asistentului AI au caracter <strong>informativ și educativ</strong>.
            Ele nu constituie consultanță fiscală, juridică sau contabilă și nu țin cont de toate particularitățile situației tale.
            Pentru decizii și pentru depunerea declarațiilor îți recomandăm un consultant fiscal autorizat sau un expert contabil.
          </p>

          <h2>Asistentul AI</h2>
          <p>
            Asistentul Iris este un sistem de inteligență artificială. Răspunsurile sunt generate automat, pot conține erori sau pot fi incomplete
            și trebuie verificate. Nu introduce în conversație date personale (CNP, IBAN, adrese).
          </p>

          <h2>Corectitudinea informațiilor</h2>
          <p>
            Actualizăm conținutul când se schimbă legislația, dar regulile fiscale se modifică des. Verifică întotdeauna data actualizării și sursele
            oficiale (Codul fiscal, ANAF, Monitorul Oficial). Dacă găsești o greșeală, scrie-ne la <a href="mailto:focustaxro@gmail.com">focustaxro@gmail.com</a>.
          </p>

          <h2>Limitarea răspunderii</h2>
          <p>
            În limitele permise de lege, FocusTax nu răspunde pentru pierderi, amenzi, dobânzi sau penalități rezultate din folosirea informațiilor
            ori a calculelor de pe site fără verificarea lor pentru situația concretă.
          </p>

          <h2>Linkuri către alte site-uri</h2>
          <p>
            Unele pagini trimit către site-uri externe (ANAF, furnizori de servicii). Nu răspundem pentru conținutul lor. Dacă un link este de afiliere
            sau de parteneriat, îl marcăm explicit.
          </p>

          <h2>Proprietate intelectuală</h2>
          <p>Textele, calculatoarele și designul FocusTax nu pot fi copiate integral fără acord. Poți cita fragmente scurte, cu link către sursă.</p>

          <h2>Date personale</h2>
          <p>Felul în care prelucrăm datele este descris în <a href="/confidentialitate/">Politica de confidențialitate</a>.</p>
        </div>
      </Container>
    </Main>
  );
}
