import type { Metadata } from "next";
import { Container, PageHeader, Section, Callout } from "@/components/ui";
import { absUrl } from "@/lib/site";
import s from "./erori.module.css";

export const metadata: Metadata = {
  title: "Erori e-Factura explicate: BR-RO-100, BR-CO-15, BR-07 și altele — cauză și soluție",
  description: "Ce înseamnă cele mai frecvente erori de validare e-Factura (BR-RO-100, BR-RO-101, BR-RO-020, BR-CO-15, BR-CO-10, BR-07, BR-23) și erorile SPV, cu soluția pentru fiecare.",
  alternates: { canonical: absUrl("/ghiduri/erori-e-factura") },
};

interface Eroare { cod: string; titlu: string; cauza: string; solutie: string; categorie: "Adrese" | "Totaluri și TVA" | "Date obligatorii" | "Coduri și formate" | "SPV și transmitere" }

const ERORI: Eroare[] = [
  { cod: "BR-RO-100", categorie: "Adrese", titlu: "Sectorul vânzătorului din București", cauza: "Vânzătorul are sediul în București (județ RO-B), iar localitatea nu e scrisă ca sector.", solutie: "La localitatea vânzătorului pune codul sectorului din lista SECTOR-RO: SECTOR1 … SECTOR6. În multe programe e câmpul „Sector” sau „Localitate” din datele firmei." },
  { cod: "BR-RO-101", categorie: "Adrese", titlu: "Sectorul cumpărătorului din București", cauza: "Aceeași regulă ca la BR-RO-100, dar pentru adresa cumpărătorului.", solutie: "În fișa clientului din București, completează localitatea ca SECTOR1 … SECTOR6 și județul București." },
  { cod: "BR-RO-110 / BR-RO-111", categorie: "Adrese", titlu: "Județul lipsește sau e greșit", cauza: "Pentru adresele din România, județul trebuie trimis cu codul ISO 3166-2 (ex. RO-CJ, RO-B).", solutie: "Completează județul în datele firmei și ale clientului. Verifică să corespundă localității." },
  { cod: "BR-RO-020", categorie: "Coduri și formate", titlu: "Tip de factură invalid", cauza: "Codul tipului de document nu e acceptat.", solutie: "Folosește un cod din lista acceptată: 380 (factură), 384 (factură corectată), 389 (autofactură), 751 (factură în scopuri contabile). Pentru stornare, de regulă se folosește 380 cu valori negative sau 381 (notă de credit), după cum acceptă programul tău." },
  { cod: "BR-CO-15", categorie: "Totaluri și TVA", titlu: "Totalul cu TVA nu se potrivește", cauza: "Totalul facturii cu TVA trebuie să fie exact totalul fără TVA plus TVA-ul total.", solutie: "De obicei e o rotunjire. Rotunjește TVA-ul pe fiecare cotă (nu pe fiecare linie, dacă programul tău calculează pe total) și refă totalurile la 2 zecimale." },
  { cod: "BR-CO-10", categorie: "Totaluri și TVA", titlu: "Suma liniilor nu se potrivește", cauza: "Totalul net al facturii trebuie să fie suma valorilor nete ale liniilor.", solutie: "Verifică liniile cu discount sau rotunjiri. Fiecare valoare de linie = cantitate × preț − discount, rotunjită la 2 zecimale, apoi adunate." },
  { cod: "BR-CO-17", categorie: "Totaluri și TVA", titlu: "TVA-ul pe cotă e calculat greșit", cauza: "TVA-ul fiecărei categorii trebuie să fie baza × cota, rotunjit la 2 zecimale.", solutie: "Recalculează TVA-ul pe fiecare cotă (21%, 11%) din baza totală a cotei. Verifică să nu ai rămasă cota veche de 19%, 9% sau 5%." },
  { cod: "BR-CO-09", categorie: "Coduri și formate", titlu: "Codul de TVA fără prefix de țară", cauza: "Codul de TVA al vânzătorului sau cumpărătorului trebuie să înceapă cu prefixul țării.", solutie: "Pentru firmele plătitoare de TVA din România scrie codul ca RO12345678. Pentru neplătitori folosește CUI-ul fără RO, în câmpul de identificare (nu în cel de TVA)." },
  { cod: "BR-06 / BR-07", categorie: "Date obligatorii", titlu: "Lipsește numele vânzătorului / cumpărătorului", cauza: "Numele vânzătorului (BR-06) sau al cumpărătorului (BR-07) e obligatoriu.", solutie: "Completează denumirea completă în fișa firmei și a clientului. La persoane fizice, numele și prenumele." },
  { cod: "BR-23", categorie: "Date obligatorii", titlu: "Lipsește unitatea de măsură", cauza: "Fiecare linie trebuie să aibă un cod de unitate de măsură (UN/ECE Rec. 20).", solutie: "Asociază fiecare unitate cu codul ei: H87 (bucată), KGM (kg), HUR (oră), C62 (unitate), LTR (litru), MTR (metru)." },
  { cod: "BR-25", categorie: "Date obligatorii", titlu: "Linie fără denumire de produs", cauza: "Fiecare linie de factură trebuie să aibă numele produsului sau serviciului.", solutie: "Completează denumirea articolului pe fiecare linie." },
  { cod: "BR-CL-14", categorie: "Coduri și formate", titlu: "Cod de țară invalid", cauza: "Codul de țară nu respectă lista ISO 3166-1 (două litere).", solutie: "Folosește RO, DE, IT etc. Verifică și țara de origine a produselor, dacă programul o trimite." },
  { cod: "Format dată", categorie: "Coduri și formate", titlu: "Data nu e în formatul AAAA-LL-ZZ", cauza: "Datele din XML trebuie să fie în formatul ISO, de exemplu 2026-10-26.", solutie: "Verifică data emiterii și data scadenței. Scadența nu poate fi înaintea datei facturii." },
  { cod: "SPV — fără drept", categorie: "SPV și transmitere", titlu: "„Nu aveți drept în SPV pentru CIF”", cauza: "Certificatul digital folosit nu are drepturi pentru firma respectivă în Spațiul Privat Virtual.", solutie: "Înregistrează certificatul pentru firmă în SPV (persoană juridică), cu formularul de împuternicire dacă e alt reprezentant, apoi regenerează tokenul de acces în program." },
  { cod: "Token expirat", categorie: "SPV și transmitere", titlu: "Programul nu mai poate trimite facturi", cauza: "Autorizarea OAuth dintre program și ANAF a expirat sau a fost revocată.", solutie: "Reconectează programul la ANAF din setări, cu certificatul digital al firmei." },
  { cod: "Duplicat", categorie: "SPV și transmitere", titlu: "Factura apare de două ori", cauza: "Același XML a fost trimis de două ori (reîncercare după o eroare temporară ANAF).", solutie: "Nu retrimite la nesfârșit: verifică întâi starea după indexul de încărcare. Dacă a fost acceptată de două ori, emite o factură de stornare pentru dublură." },
];

const CATEGORII = Array.from(new Set(ERORI.map((e) => e.categorie)));

export default function EroriEFacturaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ERORI.map((e) => ({ "@type": "Question", name: `Ce înseamnă eroarea e-Factura ${e.cod}?`, acceptedAnswer: { "@type": "Answer", text: `${e.cauza} Soluție: ${e.solutie}` } })),
  };

  return (
    <main id="continut">
      <PageHeader
        crumbs={[{ label: "Ghiduri", href: "/ghiduri" }, { label: "Erori e-Factura" }]}
        eyebrow="Dicționar · e-Factura și SPV"
        title="Erori e-Factura: ce înseamnă și cum le rezolvi"
        lead="Caută codul din mesajul primit de la ANAF (în „Răspunsuri factură” sau în programul de facturare) și vezi cauza și soluția."
      />
      <Container>
        <Callout tone="info" title="Cum citești o eroare">
          Mesajul ANAF conține codul regulii (ex. BR-RO-100) și, de obicei, câmpul vizat (ex. BT-52). Corectezi câmpul în program, regenerezi XML-ul și retrimiți.
          Înainte de retrimitere poți verifica fișierul în validatorul de pe site-ul ANAF.
        </Callout>

        <nav className={s.index} aria-label="Coduri">
          {ERORI.map((e) => <a key={e.cod} href={`#${e.cod.replace(/\W+/g, "-").toLowerCase()}`}>{e.cod}</a>)}
        </nav>

        {CATEGORII.map((cat) => (
          <Section key={cat} title={cat}>
            <div className={s.list}>
              {ERORI.filter((e) => e.categorie === cat).map((e) => (
                <article key={e.cod} id={e.cod.replace(/\W+/g, "-").toLowerCase()} className={s.item}>
                  <header><code>{e.cod}</code><h3>{e.titlu}</h3></header>
                  <p><b>Cauza:</b> {e.cauza}</p>
                  <p><b>Soluția:</b> {e.solutie}</p>
                </article>
              ))}
            </div>
          </Section>
        ))}

        <Section>
          <Callout tone="neutral">
            Codurile BR-xx vin din standardul european EN 16931, iar BR-RO-xx sunt reguli specifice României (CIUS-RO). Textul exact al mesajului poate diferi de la o versiune
            la alta a validatorului ANAF; dacă eroarea ta nu se potrivește, citește câmpul indicat în mesaj sau întreabă furnizorul programului de facturare.
          </Callout>
        </Section>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
