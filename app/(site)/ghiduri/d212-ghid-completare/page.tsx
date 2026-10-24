import type { Metadata } from "next";
import { Container, PageHeader, Section, Callout, ButtonLink } from "@/components/ui";
import { absUrl } from "@/lib/site";
import { salariuMinimAnual, fmtLei } from "@/lib/fiscal";
import D212Wizard from "./D212Wizard";
import s from "./d212.module.css";

export const metadata: Metadata = {
  title: "Declarația unică D212: ghid de completare pas cu pas (2026–2027)",
  description: "Cine depune Declarația unică, ce capitole completezi pentru PFA, chirii, dividende și crypto, cum calculezi CAS și CASS și cum o depui în SPV. Termen: 25 mai.",
  alternates: { canonical: absUrl("/ghiduri/d212-ghid-completare") },
};

const FAQ = [
  { q: "Până când depun D212 pentru veniturile din 2026?", a: "Până la 25 mai 2027. Tot până atunci plătești impozitul, CAS și CASS datorate pentru 2026." },
  { q: "Trebuie să depun D212 dacă am doar salariu?", a: "Nu. Pentru salarii, impozitul și contribuțiile sunt reținute și declarate de angajator. Depui D212 doar dacă ai și alte venituri (PFA, chirii, dividende, investiții) sau dacă vrei să redirecționezi 3,5% din impozit." },
  { q: "Se plătește CASS pe dividende prin D212?", a: "Da. Firma reține doar impozitul de 16%. CASS-ul îl declari și îl plătești tu, prin D212, dacă veniturile pasive depășesc 6 salarii minime." },
  { q: "Ce fac dacă am greșit declarația?", a: "Depui o declarație rectificativă, tot prin SPV, bifând căsuța „rectificativă”." },
];

export default function D212Page() {
  const sm = salariuMinimAnual();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main id="continut">
      <PageHeader
        crumbs={[{ label: "Ghiduri", href: "/ghiduri" }, { label: "Declarația unică D212" }]}
        eyebrow="Ghid interactiv · termen 25 mai"
        title="Declarația unică D212, pas cu pas"
        lead="Alege ce venituri ai avut și vezi exact ce capitole completezi, ce contribuții datorezi și ce documente îți trebuie."
      >
        <ButtonLink href="/calculator/pfa" variant="secondary" icon="calculator">Calculează CAS și CASS</ButtonLink>
      </PageHeader>
      <Container>
        <Callout tone="accent" title="Următorul termen: 25 mai 2027">
          Declari veniturile din 2026 și plătești impozitul, CAS și CASS. Pentru 2026, pragurile de contribuții folosesc salariul minim de {fmtLei(sm)} lei:
          CAS de la {fmtLei(12 * sm)} lei, CASS de la {fmtLei(6 * sm)} lei.
        </Callout>

        <Section title="1. Ce venituri ai avut?">
          <D212Wizard />
        </Section>

        <Section title="2. Cum o depui">
          <ol className={s.steps}>
            <li><strong>Intră în SPV</strong> pe anaf.ro, cu cont de persoană fizică (sau cu certificat digital).</li>
            <li><strong>Verifică D212 precompletată</strong> — ANAF include deja venituri raportate de terți: dividende, dobânzi, câștiguri de la brokeri și platforme crypto (DAC8).</li>
            <li><strong>Completează sau corectează</strong> capitolele de mai sus și estimarea pentru anul în curs, dacă e cazul.</li>
            <li><strong>Trimite declarația</strong> și păstrează recipisa de depunere.</li>
            <li><strong>Plătește</strong> până la 25 mai, prin Ghișeul.ro, bancă sau la trezorerie, în contul unic al ANAF.</li>
          </ol>
        </Section>

        <Section title="Întrebări frecvente">
          <div className={s.faq}>
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </Section>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
