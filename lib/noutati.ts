/**
 * Noutăți fiscale — sursa comună pentru /noutati, /noutati/[slug] și pagina principală.
 * Adaugă articolele noi la începutul listei; `iso` (AAAA-LL) determină ordinea.
 */

export type Urgenta = "urgent" | "important" | "info";

export interface Noutate {
  slug: string;
  iso: string;
  categorie: string;
  tag: string;
  urgenta: Urgenta;
  titlu: string;
  desc: string;
  link?: string;
}

export const NOUTATI: Noutate[] = [
  {
    slug: "actualizarea-codurilor-caen-rev-3-termen-prelungit-pana-la",
    iso: "2026-10",
    categorie: "SRL",
    tag: "CAEN",
    urgenta: "important",
    titlu: "Actualizarea codurilor CAEN Rev. 3 — termen prelungit până la 1 aprilie 2027",
    desc: "HG 788/2026 (în vigoare din 1 octombrie 2026) acordă încă 6 luni pentru trecerea la CAEN Rev. 3. Noul termen este 1 aprilie 2027 (cel vechi era 25 septembrie 2026). Până atunci, ambele versiuni CAEN sunt acceptate în relația cu autoritățile. Atenție: orice altă modificare depusă la Registrul Comerțului (sediu, asociați etc.) impune și actualizarea la Rev. 3. Doar circa 37% dintre firme făcuseră actualizarea la termenul inițial.",
  },
  {
    slug: "conturi-de-economii-si-investitii-cei-legea-202-2026",
    iso: "2026-10",
    categorie: "Cod Fiscal",
    tag: "Investiții",
    urgenta: "info",
    titlu: "Conturi de economii și investiții (CEI) — Legea 202/2026, disponibile din 2027",
    desc: "Legea 202/2026 introduce conturile de economii și investiții, administrate de bănci și firme de investiții autorizate, cu facilități fiscale: un tip de cont permite retrageri fără impozit pe venit, celălalt permite deducerea contribuțiilor din venitul impozabil. Banii pot fi investiți în acțiuni, obligațiuni și fonduri, iar accesul este permis la pensionare sau după 65 de ani. Legea 199/2026 completează în paralel Codul fiscal (art. 291). Normele de aplicare urmează să fie publicate.",
  },
  {
    slug: "salariul-minim-pentru-2027-inca-nestabilit",
    iso: "2026-10",
    categorie: "Salariu minim",
    tag: "Salariu minim",
    urgenta: "info",
    titlu: "Salariul minim pentru 2027 — încă nestabilit",
    desc: "Guvernul nu a aprobat încă salariul minim pentru 2027. Raportul pe baza căruia se stabilește noua valoare era programat pentru 20 octombrie 2026; sindicatele cer 5.000 lei brut de la 1 ianuarie 2027. Până la o nouă hotărâre rămâne valabil salariul minim de 4.325 lei brut (de la 1 iulie 2026). Calculatoarele FocusTax vor fi actualizate imediat după publicarea HG în Monitorul Oficial.",
    link: "/calculator/salariu",
  },
  {
    slug: "tva-9-la-locuinte-a-expirat-pe-30-septembrie",
    iso: "2026-10",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "important",
    titlu: "TVA 9% la locuințe a expirat pe 30 septembrie 2026",
    desc: "Legea 161/2026 a prelungit regimul tranzitoriu de 9% pentru locuințe până la 30 septembrie 2026 (pentru locuințe de max. 120 mp și 600.000 lei fără TVA, cu avans de 20% plătit până la 31 iulie 2025). De la 1 octombrie 2026 se aplică cota standard de 21%. Cumpărătorii care au plătit 21% între 1 august 2026 și intrarea în vigoare a legii pot cere restituirea diferenței, conform procedurii ANAF.",
    link: "/ghiduri/inregistrare-tva",
  },
  {
    slug: "plafonul-tva-la-incasare-creste-la-5-500-000",
    iso: "2026-10",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "info",
    titlu: "Plafonul TVA la încasare crește la 5.500.000 lei din 2027",
    desc: "Prin OUG 8/2026, plafonul pentru aplicarea sistemului TVA la încasare a crescut de la 4.500.000 lei la 5.000.000 lei pentru perioada 1 martie – 31 decembrie 2026 și urcă la 5.500.000 lei de la 1 ianuarie 2027.",
    link: "/ghiduri/inregistrare-tva",
  },
  {
    slug: "din-2027-dispar-imca-si-taxa-pe-stalp",
    iso: "2026-10",
    categorie: "Cod Fiscal",
    tag: "Profit",
    urgenta: "info",
    titlu: "Din 2027 dispar IMCA și „taxa pe stâlp”",
    desc: "Conform OUG 89/2025, impozitul minim pe cifra de afaceri (IMCA) — aplicabil doar firmelor cu CA peste 50 mil. EUR — a scăzut la 0,5% în 2026 și se elimină de la 1 ianuarie 2027. Tot din 2027 se elimină impozitul pe construcții speciale („taxa pe stâlp”), iar toate clădirile deținute de persoane juridice vor fi considerate nerezidențiale la calculul impozitului local.",
  },
  {
    slug: "salariul-minim-creste-la-4-325-lei-de-la",
    iso: "2026-07",
    categorie: "Salariu minim",
    tag: "Salariu minim",
    urgenta: "info",
    titlu: "Salariul minim crește la 4.325 lei de la 1 iulie 2026",
    desc: "Salariul minim brut garantat în plată devine 4.325 lei/lună de la 1 iulie 2026 (HG 146/2026), de la 4.050 lei în primul semestru. Suma neimpozabilă pentru angajații plătiți cu salariul minim scade de la 300 la 200 lei/lună, iar salariul net la minim ajunge la 2.699 lei. Atenție: pentru CAS și CASS datorate de PFA și pe veniturile pasive se folosește în continuare salariul minim de la 1 ianuarie 2026 (4.050 lei), deci pragurile rămân 24.300 / 48.600 / 97.200 lei.",
  },
  {
    slug: "4-reguli-noi-pentru-dividende-si-imprumuturi-la-srl",
    iso: "2026-05",
    categorie: "SRL",
    tag: "Penalități",
    urgenta: "important",
    titlu: "4 reguli noi pentru dividende și împrumuturi la SRL — amenzi până la 300.000 lei",
    desc: "ANAF a publicat Comunicatul 461/13.05.2026 cu patru restricții noi introduse prin Legea 239/2025:\n\n1) Dacă firma a distribuit dividende intermediare în cursul anului, nu poate acorda împrumuturi asociaților până la regularizarea anuală — amendă 10.000–200.000 lei.\n\n2) Dacă activul net scade sub 50% din capitalul social subscris, firma nu poate restitui împrumuturile primite de la asociați — amendă 10.000–200.000 lei.\n\n3) Dacă situațiile financiare anuale arată active nete sub limită, trebuie reconstituite până la finalul anului următor — ANAF verifică din 2027 pentru exercițiul 2025.\n\n4) AGA extraordinară este obligatorie; dacă reconstituirea nu reușește și există datorii față de asociați, acestea trebuie convertite în capital social în 2 ani — amendă 40.000–300.000 lei.",
    link: "/ghiduri/srl-vs-micro",
  },
  {
    slug: "anaf-d212-precompletata-include-datele-dac8-verificati-inainte-de",
    iso: "2026-05",
    categorie: "D212",
    tag: "D212",
    urgenta: "important",
    titlu: "ANAF: D212 precompletată include datele DAC8 — verificați înainte de depunere",
    desc: "Înainte de a depune D212, ANAF recomandă verificarea în SPV a datelor precompletate, care includ acum informații DAC8 (câștiguri crypto raportate automat de platformele de tranzacționare pentru 2025). Dacă există discrepanțe față de evidența proprie, trebuie corectate înainte de termenul din 25 mai. Platformele au transmis rapoartele la ANAF conform noilor obligații DAC8 intrate în vigoare în 2026.",
    link: "/ghiduri/d212-ghid-completare",
  },
  {
    slug: "impozit-crypto-creste-la-16-dac8-intra-in-vigoare",
    iso: "2026-01",
    categorie: "Crypto",
    tag: "Crypto",
    urgenta: "important",
    titlu: "Impozit crypto crește la 16% — DAC8 intră în vigoare",
    desc: "Din 1 ianuarie 2026, câștigurile din criptomonede se impozitează cu 16% (față de 10% anterior). Scutire: câștiguri sub 200 lei/tranzacție dacă totalul anual nu depășește 600 lei. Prin DAC8, platformele raportează automat tranzacțiile la ANAF.",
  },
  {
    slug: "impozit-dividende-16-din-2026",
    iso: "2026-01",
    categorie: "Dividende",
    tag: "Dividende",
    urgenta: "important",
    titlu: "Impozit dividende: 16% din 2026",
    desc: "Impozitul pe dividende a crescut de la 10% la 16% pentru dividendele distribuite din 1 ianuarie 2026 (Legea 141/2025). Se reține la sursă de firma care distribuie. CASS se datorează separat, în trepte fixe, dacă totalul veniturilor pasive depășește 6 salarii minime (24.300 lei în 2026).",
    link: "/ghiduri/dividende",
  },
  {
    slug: "micro-2026-cota-unica-1-plafon-100-000-eur",
    iso: "2026-01",
    categorie: "Microîntreprinderi",
    tag: "Microîntreprinderi",
    urgenta: "important",
    titlu: "Micro 2026: cotă unică 1%, plafon 100.000 EUR",
    desc: "Din 2026, microîntreprinderile plătesc o cotă unică de 1% din CA (eliminată cota de 3%). Plafonul de încadrare a scăzut la 100.000 EUR/an. Condiție nouă: firmele trebuie să fi depus situațiile financiare la timp.",
    link: "/ghiduri/srl-vs-micro",
  },
  {
    slug: "impozit-cladiri-si-auto-cresteri-semnificative-2026",
    iso: "2026-01",
    categorie: "Impozite locale",
    tag: "Impozite locale",
    urgenta: "info",
    titlu: "Impozit clădiri și auto — creșteri semnificative 2026",
    desc: "Impozitele pe proprietăți au crescut cu până la 150% față de 2025 în unele localități. Impozitul pe autoturisme este diferențiat după norma Euro și cilindree. Mașinile electrice plătesc 40 lei/an.",
    link: "/ghiduri/impozite-locale-2026",
  },
  {
    slug: "e-factura-extinsa-la-toate-tranzactiile-b2b",
    iso: "2025-12",
    categorie: "e-Factura",
    tag: "e-Factura",
    urgenta: "info",
    titlu: "e-Factura — extinsă la toate tranzacțiile B2B",
    desc: "Din 2025, obligația de transmitere în RO e-Factura s-a extins la toate tranzacțiile B2B, inclusiv cu parteneri neplătitori de TVA. Termen de transmitere: 5 zile calendaristice. Amendă pentru netransmitere: 5.000 lei.",
    link: "/sisteme/ro-e-factura",
  },
  {
    slug: "ro-e-tva-implementare-pentru-contribuabilii-mari",
    iso: "2025-11",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "info",
    titlu: "RO e-TVA — implementare pentru contribuabilii mari",
    desc: "ANAF a lansat sistemul RO e-TVA — D300 precompletat pe baza facturilor din e-Factura. Contribuabilii verifică datele și depun declarația finală. Extinderea la toți plătitorii de TVA se face gradual în 2026.",
    link: "/sisteme/ro-e-tva",
  },
  {
    slug: "plafonul-de-inregistrare-tva-urca-la-395-000-lei",
    iso: "2025-09",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "important",
    titlu: "Plafonul de înregistrare TVA urcă la 395.000 lei",
    desc: "De la 1 septembrie 2025, plafonul de înregistrare obligatorie în scopuri de TVA a crescut de la 300.000 lei la 395.000 lei. Firmele sub 395.000 lei pot solicita scoaterea din evidența TVA.",
    link: "/ghiduri/inregistrare-tva",
  },
  {
    slug: "ro-e-transport-noi-categorii-de-bunuri",
    iso: "2025-09",
    categorie: "e-Transport",
    tag: "e-Transport",
    urgenta: "info",
    titlu: "RO e-Transport — noi categorii de bunuri",
    desc: "ANAF a extins lista bunurilor cu risc fiscal supuse monitorizării e-Transport. Noile categorii includ materiale de construcții, produse cosmetice de lux și echipamente electronice. Penalitățile pentru lipsa codului UIT: 50.000 lei.",
    link: "/sisteme/ro-e-transport",
  },
  {
    slug: "cota-standard-tva-creste-la-21",
    iso: "2025-08",
    categorie: "TVA",
    tag: "TVA",
    urgenta: "important",
    titlu: "Cota standard TVA crește la 21%",
    desc: "Începând cu 1 august 2025, cota standard de TVA a crescut de la 19% la 21%. Cota redusă pentru alimente, restaurante, turism: 11%. Cotele de 9% și 5% au fost unificate în 11%; pentru locuințe s-a păstrat un regim tranzitoriu de 9%, prelungit până la 30 septembrie 2026.",
    link: "/ghiduri/inregistrare-tva",
  },
];

const LUNI = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];

/** „2026-10” → „octombrie 2026” */
export function lunaAn(iso: string): string {
  const [an, luna] = iso.split("-").map(Number);
  return `${LUNI[luna - 1]} ${an}`;
}

export const CATEGORII_NOUTATI = Array.from(new Set(NOUTATI.map((n) => n.categorie)));

export function getNoutate(slug: string): Noutate | undefined {
  return NOUTATI.find((n) => n.slug === slug);
}
