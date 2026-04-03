"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface TermenFiscal {
  termen: string;
  definitie: string;
  exemplu?: string;
  linkUri?: string;
}

const termeni: TermenFiscal[] = [
  { termen: "ANAF", definitie: "Agenția Națională de Administrare Fiscală — autoritatea fiscală română care administrează impozitele, taxele și contribuțiile. Organizează inspecțiile fiscale și gestionează sistemele SPV, e-Factura, e-Transport.", exemplu: "Declarațiile se depun la ANAF prin SPV." },
  { termen: "Baza impozabilă", definitie: "Suma la care se aplică cota de impozit sau taxă. Se calculează după scăderea deducerilor și cheltuielilor deductibile din venitul brut.", exemplu: "Baza impozabilă salariu = brut - CAS - CASS - deducere personală." },
  { termen: "Bonificație fiscală", definitie: "Reducere a impozitului datorat oferită pentru respectarea unor condiții (ex: depunerea și plata D212 până pe 15 aprilie). În 2026, bonificația este de 3%.", exemplu: "OUG 8/2026 acordă 3% bonificație la D212 depus până pe 15 aprilie." },
  { termen: "CAM", definitie: "Contribuția Asiguratorie pentru Muncă plătită de angajator — 2.25% din fondul de salarii brute. Nu se reține din salariul angajatului, ci este cost suplimentar pentru angajator.", exemplu: "Pentru un salariu brut de 5.000 lei, CAM este 112,50 lei/lună." },
  { termen: "CAS", definitie: "Contribuția de Asigurări Sociale (pensii). Angajat: 25% din salariul brut. PFA: 25% din venit net (obligatoriu dacă venit > 12 salarii minime, opțional sub acest prag).", exemplu: "La un salariu brut de 4.000 lei, CAS angajat = 1.000 lei/lună.", linkUri: "/calculator" },
  { termen: "CASS", definitie: "Contribuția de Asigurări Sociale de Sănătate (sănătate). Angajat: 10% din brut. PFA/independenți: 10% din venit net, minim pe 6 salarii minime, maxim pe 72 salarii minime.", exemplu: "La salariu minim 4.050 lei, CASS min PFA = 2.430 lei/an.", linkUri: "/calculator" },
  { termen: "CECCAR", definitie: "Corpul Experților Contabili și Contabililor Autorizați din România — organizația profesională care acreditează contabilii autorizați și experții contabili." },
  { termen: "CCF", definitie: "Camera Consultanților Fiscali din România — organizația care acreditează consultanții fiscali autorizați. Consultanții CCF pot oferi sfaturi fiscale oficiale." },
  { termen: "Certificat digital", definitie: "Document electronic care atestă identitatea unui utilizator sau entități, folosit pentru semnarea electronică a declarațiilor ANAF prin SPV.", exemplu: "E necesar certificat digital de la Certdep/Certign pentru SPV." },
  { termen: "CIF", definitie: "Codul de Identificare Fiscală — numărul unic de identificare fiscală al persoanelor juridice (SRL, PFA, II). Pentru persoane fizice se folosește CNP.", exemplu: "CIF-ul SRL-ului tău apare pe toate facturile emise." },
  { termen: "CNP", definitie: "Codul Numeric Personal — identificatorul unic al persoanelor fizice în România, folosit și în scopuri fiscale pentru persoane fizice neînregistrate ca entități juridice." },
  { termen: "Cod fiscal", definitie: "Legea 227/2015 — legea principală care reglementează impozitele și taxele din România: impozit pe venit, profit, TVA, contribuții sociale." },
  { termen: "Cotă redusă TVA", definitie: "Cote de TVA sub cea standard: 11% pentru alimente, medicamente, turism și restaurante; 9% pentru locuințe noi (până iulie 2026); 5% pentru cărți, ziare, locuințe sociale.", linkUri: "/ghiduri/inregistrare-tva" },
  { termen: "Criptomonede fiscal", definitie: "Câștigurile din tranzacții crypto se impozitează cu 16% (din 2026). Scutire: câștiguri sub 200 lei/tranzacție și total anual sub 600 lei. Se declară prin D212.", linkUri: "/calculator" },
  { termen: "DAC8", definitie: "Directiva europeană de cooperare administrativă (8). Din 2026, platformele de tranzacționare crypto și alte platforme digitale sunt obligate să raporteze automat tranzacțiile utilizatorilor la ANAF.", exemplu: "Binance, Crypto.com etc. vor raporta automat câștigurile tale la ANAF." },
  { termen: "D100", definitie: "Declarația privind obligațiile de plată la bugetul de stat — depusă trimestrial de microîntreprinderi (impozit pe CA) și de firmele la profit (plăți anticipate). Termen: 25 ale lunii următoare trimestrului." },
  { termen: "D101", definitie: "Declarația privind impozitul pe profit — depusă anual de firmele plătitoare de impozit pe profit. Termen: 25 martie pentru exercițiul anterior." },
  { termen: "D112", definitie: "Declarația privind obligațiile de plat a contribuțiilor sociale, impozitului pe venit și evidența nominală a persoanelor asigurate. Depusă lunar de angajatori. Termen: 25 ale lunii următoare." },
  { termen: "D168", definitie: "Declarația pentru înregistrarea contractelor de locațiune (chirii) la ANAF. Obligatorie la încheierea contractului de închiriere.", exemplu: "Proprietarii care închiriază trebuie să depună D168 la ANAF în 30 de zile de la semnarea contractului." },
  { termen: "D205", definitie: "Declarația informativă privind impozitul reținut la sursă pe veniturile persoanelor fizice — depusă de firme care plătesc dividende, chirii etc. Termen: 31 ianuarie pentru anul anterior." },
  { termen: "D212", definitie: "Declarația Unică — formularul central pentru persoanele fizice cu venituri din activități independente, chirii, investiții, dividende. Termen: 25 mai. Bonificație 3% dacă depui până pe 15 aprilie.", linkUri: "/ghiduri/d212-ghid-completare" },
  { termen: "D300", definitie: "Decontul de TVA — declarat lunar sau trimestrial de plătitorii de TVA. Arată TVA colectat (datorat statului) minus TVA deductibil (din achizițiile firmei). Termen: 25 ale lunii." },
  { termen: "D394", definitie: "Declarația informativă privind livrările/prestările și achizițiile efectuate pe teritoriul național — depusă lunar sau trimestrial de plătitorii de TVA. Cuprinde datele din facturile emise/primite." },
  { termen: "Deducere forfetară", definitie: "Reducere procentuală aplicată automat venitului brut fără a necesita dovezi de cheltuieli. La chirii: 40% din venitul brut. La alte venituri (ex. drepturi de autor): 40%.", exemplu: "Chirie brută 2.000 lei/lună → deducere 800 lei → baza impozabilă 1.200 lei." },
  { termen: "Deducere personală", definitie: "Sumă dedusă din baza de calcul a impozitului pe salariu. 2026: 300 lei/lună pentru salarii ≤ salariu minim, scade liniar la 0 pentru salarii > 2× salariu minim. +100 lei per copil în întreținere.", linkUri: "/calculator" },
  { termen: "e-Factura", definitie: "Sistem obligatoriu de transmitere a facturilor electronice în format XML prin platforma ANAF (RO e-Factura). Obligatoriu pentru toate tranzacțiile B2B și B2G din România.", linkUri: "/sisteme/ro-e-factura" },
  { termen: "Impozit dividende", definitie: "Impozit aplicat dividendelor distribuite persoanelor fizice. Din 2026: 16% (anterior 8%). Se reține la sursă de societatea distribuitor.", linkUri: "/ghiduri/dividende" },
  { termen: "Impozit local", definitie: "Impozite și taxe percepute de autoritățile locale (primărie): impozit pe clădiri, impozit pe teren, taxa pe mijloace de transport. Nivelul variază pe localitate.", linkUri: "/ghiduri/impozite-locale-2026" },
  { termen: "Impozit minim pe CA", definitie: "Impozit minim aplicat firmelor cu impozit pe profit (16%) mai mic decât un procent din cifra de afaceri. Grile: 0.5% pentru CA 1-5M lei, 0.4% pentru 5-10M lei etc.", exemplu: "Firmă cu CA 2M lei și profit mic → impozit minim = 10.000 lei." },
  { termen: "Impozit pe profit", definitie: "Impozit de 16% aplicat profitului brut al societăților comerciale (SRL, SA) care nu se încadrează ca microîntreprindere." },
  { termen: "Impozit pe venit", definitie: "Impozit de 10% aplicat veniturilor persoanelor fizice: salarii, activități independente, chirii, dividende, investiții etc. Declarat prin D212 sau reținut la sursă." },
  { termen: "Întreprindere Individuală (II)", definitie: "Formă de organizare similară PFA-ului, dar cu posibilitatea de a angaja salariați. Titularul răspunde nelimitat cu bunurile personale." },
  { termen: "Microîntreprindere", definitie: "Firmă cu CA ≤ 100.000 EUR/an (din 2026) și care îndeplinește condițiile de accesare a regimului. Plătește 1% impozit pe CA (cotă unică din 2026, eliminată cota 3%).", linkUri: "/ghiduri/srl-vs-micro" },
  { termen: "Normă de venit", definitie: "Sistem de impozitare pentru PFA în care impozitul se calculează pe o sumă fixă stabilită de ANAF pe județ/activitate, indiferent de venitul real obținut.", exemplu: "Normă de venit 50.000 lei/an → impozit calculat pe această sumă, chiar dacă ai câștigat mai mult sau mai puțin." },
  { termen: "OCDE", definitie: "Organizația pentru Cooperare și Dezvoltare Economică — România vizează aderarea la OCDE, ceea ce va implica alinierea legislației fiscale la standarde internaționale." },
  { termen: "PFA", definitie: "Persoană Fizică Autorizată — formă de organizare pentru activitate independentă. Nu are personalitate juridică separată. Impozitare prin sistem real (10% pe venit net) sau normă de venit.", linkUri: "/calculator" },
  { termen: "Plafon TVA", definitie: "Cifra de afaceri de 395.000 lei (din septembrie 2025) peste care înregistrarea în scopuri de TVA este obligatorie. La depășire, ai 10 zile să depui cererea.", linkUri: "/ghiduri/inregistrare-tva" },
  { termen: "PNRR", definitie: "Planul Național de Redresare și Reziliență — planul de investiții finanțat din fonduri europene. Unele reforme fiscale (digitalizare ANAF, e-Factura) sunt legate de jaloanele PNRR." },
  { termen: "Registru fiscal", definitie: "Evidența obligațiilor și plăților fiscale ale unui contribuabil ținută de ANAF. Accesibil online prin SPV." },
  { termen: "RO e-Transport", definitie: "Sistem ANAF de monitorizare a transportului bunurilor cu risc fiscal ridicat pe teritoriul României. Necesită obținerea unui cod UIT înainte de transport.", linkUri: "/sisteme/ro-e-transport" },
  { termen: "RO e-VAT", definitie: "Sistemul ANAF de precompletare a declarației D300 (decontul TVA) pe baza datelor din e-Factura. Reduce munca de completare manuală a decontului.", linkUri: "/sisteme/ro-e-tva" },
  { termen: "Salariu brut", definitie: "Suma totală acordată angajatului înainte de reținerea CAS, CASS și impozitului pe venit. Este suma din care se calculează toate contribuțiile.", linkUri: "/calculator" },
  { termen: "Salariu minim", definitie: "Salariul minim brut garantat în plată: 4.050 lei (ianuarie-iunie 2026), 4.325 lei (iulie-decembrie 2026). Reprezintă baza minimă legală de salarizare.", linkUri: "/calculator" },
  { termen: "Salariu net", definitie: "Suma efectiv primită de angajat după reținerea CAS (25%), CASS (10%) și impozitului pe venit (10%). Se calculează din salariul brut.", linkUri: "/calculator" },
  { termen: "Sistem real", definitie: "Sistem de impozitare PFA bazat pe veniturile și cheltuielile reale, documentate. Impozitul se calculează pe venitul net (venituri minus cheltuieli deductibile).", linkUri: "/calculator" },
  { termen: "SPV", definitie: "Spațiul Privat Virtual — platforma online ANAF pentru depunerea declarațiilor, vizualizarea situației fiscale și comunicarea cu ANAF. Acces cu certificat digital sau token.", linkUri: "/sisteme/spv" },
  { termen: "SRL", definitie: "Societate cu Răspundere Limitată — cea mai comună formă juridică pentru afaceri în România. Are personalitate juridică separată. Poate fi microîntreprindere (1% pe CA) sau plătitoare de impozit pe profit (16%).", linkUri: "/ghiduri/srl-vs-micro" },
  { termen: "TVA", definitie: "Taxa pe Valoarea Adăugată. Cota standard în România: 21% (din august 2025). Cote reduse: 11% (alimente, medicamente, turism), 9% (locuințe noi). Se aplică la fiecare etapă a lanțului de producție/distribuție.", linkUri: "/ghiduri/inregistrare-tva" },
  { termen: "TVA la încasare", definitie: "Sistem opțional pentru firme cu CA < 4.500.000 lei/an prin care TVA se declară și plătește numai când factura este efectiv încasată (nu la emitere)." },
  { termen: "TVA intracomunitar", definitie: "Regimul special de TVA aplicabil tranzacțiilor între firme din UE. Livrările intracomunitare sunt scutite de TVA la furnizor dacă cumpărătorul are cod valid de TVA în altă țară UE." },
  { termen: "UIT", definitie: "Cod Unic de Identificare a Transportului — cod obținut din sistemul RO e-Transport, obligatoriu pentru transportul bunurilor cu risc fiscal ridicat. Se obține înainte de începerea transportului.", linkUri: "/sisteme/ro-e-transport" },
  { termen: "Valoare impozabilă", definitie: "Baza de calcul pentru impozitul pe clădiri — valoarea clădirii stabilită prin evaluare fiscală (nu valoarea de piață). Din 2027 se va trece la valoarea de piață prin sistemul e-Proprietatea." },
];

export default function GlosarPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    if (!s) return termeni;
    return termeni.filter(t =>
      t.termen.toLowerCase().includes(s) ||
      t.definitie.toLowerCase().includes(s)
    );
  }, [search]);

  // Group by first letter
  const grouped = useMemo(() => {
    const map: Record<string, TermenFiscal[]> = {};
    filtered.forEach(t => {
      const letter = t.termen[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(t);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 8, color: "#1e293b" }}>
          Glosar Fiscal România 2026
        </h1>
        <p style={{ color: "#64748b", marginBottom: "1.5rem", maxWidth: 600 }}>
          {termeni.length} termeni fiscali explicați simplu. Caută orice termen fiscal românesc.
        </p>

        <input
          type="search"
          placeholder="Caută termen fiscal (ex: TVA, PFA, deducere...)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "12px 18px",
            borderRadius: 12, border: "1px solid rgba(99,102,241,0.3)",
            background: "rgba(255,255,255,0.85)", fontSize: "1rem",
            outline: "none", marginBottom: "2rem",
          }}
        />

        {filtered.length === 0 ? (
          <p style={{ color: "#9ca3af", textAlign: "center", padding: "2rem" }}>
            Niciun termen găsit pentru „{search}".
          </p>
        ) : (
          grouped.map(([letter, items]) => (
            <div key={letter} style={{ marginBottom: "2rem" }}>
              <div style={{
                fontSize: "1.5rem", fontWeight: 800, color: "#6366f1",
                borderBottom: "2px solid rgba(99,102,241,0.2)",
                paddingBottom: 4, marginBottom: 12,
              }}>{letter}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map(t => (
                  <div key={t.termen} style={{
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "14px 18px",
                  }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                      <strong style={{ fontSize: "1rem", color: "#1e293b" }}>{t.termen}</strong>
                      {t.linkUri && (
                        <Link href={t.linkUri} style={{ fontSize: "0.75rem", color: "#6366f1" }}>→ detalii</Link>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "#374151", lineHeight: 1.6 }}>
                      {t.definitie}
                    </p>
                    {t.exemplu && (
                      <p style={{ margin: "6px 0 0", fontSize: "0.8rem", color: "#6b7280", fontStyle: "italic" }}>
                        Ex: {t.exemplu}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
