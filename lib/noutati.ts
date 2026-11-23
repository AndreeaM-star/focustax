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
    slug: "salariul-minim-pentru-2027-inca-nestabilit",
    iso: "2026-11",
    categorie: "Salariu minim",
    tag: "Salariu minim",
    urgenta: "important",
    titlu: "Salariul minim rămâne 4.325 lei la 1 ianuarie 2027, iar scutirea de 200 lei expiră",
    desc: "Ministrul Muncii, Florin Manole, a anunțat pe 24 octombrie 2026 că la 1 ianuarie 2027 salariul minim brut rămâne 4.325 lei. O eventuală majorare se negociază în Consiliul Tripartit: ministerul a prezentat variante între 4.593 și 5.079 lei, sindicatele cer 5.000 lei, iar data de aplicare (ianuarie sau iulie 2027) nu a fost stabilită.\n\nSeparat, suma de 200 lei scutită de impozit și contribuții la salariul minim se aplică doar până la 31 decembrie 2026 și, la 20 noiembrie, nu fusese prelungită. Fără un act nou, netul la salariul minim scade din ianuarie 2027 de la 2.699 la 2.616 lei.\n\nPentru PFA și veniturile pasive, pragurile de CAS și CASS din 2027 se calculează la salariul minim de la 1 ianuarie 2027. Dacă acesta rămâne 4.325 lei, pragurile devin 25.950 / 51.900 / 103.800 lei (6 / 12 / 24 salarii minime). Calculatoarele FocusTax aplică deja aceste reguli și vor fi actualizate dacă apare o hotărâre nouă.",
    link: "/calculator/salariu",
  },
  {
    slug: "din-2027-impozitul-pe-profit-ramane-la-25-iunie-micro-revine-la-25-ianuarie",
    iso: "2026-11",
    categorie: "SRL",
    tag: "Termene",
    urgenta: "important",
    titlu: "Din 2027: impozitul pe profit rămâne la 25 iunie, micro revine la 25 ianuarie",
    desc: "Termenul de 25 iunie pentru declarația anuală privind impozitul pe profit (D101) a devenit definitiv prin OUG 8/2026, începând cu declarația pentru anul 2026, care se depune până la 25 iunie 2027.\n\nMicroîntreprinderile nu mai beneficiază de această amânare: impozitul pe trimestrul IV 2026 se declară (D100) și se plătește până la 25 ianuarie 2027. Plățile trimestriale de impozit pe profit pentru trimestrele I–III rămân la 25 aprilie, 25 iulie și 25 octombrie.",
    link: "/calendar",
  },
  {
    slug: "bonul-fiscal-noile-obligatii-suspendate-pana-la-31-octombrie-2027",
    iso: "2026-11",
    categorie: "Case de marcat",
    tag: "Bon fiscal",
    urgenta: "important",
    titlu: "Bonul fiscal: noile obligații rămân suspendate până la 31 octombrie 2027",
    desc: "OUG 68/2025 a introdus cerințe noi pentru bonurile emise de casele de marcat, între care codul de identificare fiscală al cumpărătorului, numărul bonului și afișarea unor date în format cod QR. Aplicarea lor era suspendată până la 1 noiembrie 2026.\n\nOUG 43/2026 (Monitorul Oficial nr. 915 din 30 octombrie 2026) prelungește suspendarea până la 31 octombrie 2027 inclusiv, așa că deocamdată comercianții nu trebuie să aplice aceste cerințe.",
  },
  {
    slug: "taxa-de-25-lei-pe-coletele-din-afara-ue-eliminata-din-1-noiembrie-2026",
    iso: "2026-11",
    categorie: "Comerț online",
    tag: "Colete",
    urgenta: "info",
    titlu: "Taxa de 25 lei pe coletele din afara UE a fost eliminată de la 1 noiembrie 2026",
    desc: "OUG 43/2026 (Monitorul Oficial nr. 915 din 30 octombrie 2026) abrogă de la 1 noiembrie 2026 taxa logistică introdusă prin Legea 239/2025 pentru coletele cu valoare sub 150 EUR expediate din afara UE. Taxa se mai datorează doar pentru coletele livrate până la 31 octombrie 2026 inclusiv.\n\nPentru coletele livrate din 1 noiembrie, furnizorii poștali care au încasat deja taxa nu o mai virează la buget și trebuie să o restituie plătitorilor în 30 de zile de la livrare.\n\nColetele rămân supuse taxelor europene: taxa vamală de 3 EUR aplicată din 1 iulie 2026 și taxa de procesare de 2 EUR aplicată din 1 noiembrie 2026.",
  },
  {
    slug: "anaf-stabileste-din-oficiu-cas-si-cass-pentru-veniturile-din-2025",
    iso: "2026-11",
    categorie: "D212",
    tag: "CAS / CASS",
    urgenta: "important",
    titlu: "ANAF poate stabili din oficiu CAS și CASS pentru veniturile din 2025 nedeclarate",
    desc: "Ordinul ANAF 1457/2026, publicat la începutul lunii noiembrie 2026, aprobă procedura prin care Fiscul stabilește din oficiu contribuția la pensie (CAS) și contribuția la sănătate (CASS) pentru persoanele fizice care nu le-au declarat prin Declarația unică pentru 2025.\n\nANAF trimite mai întâi o notificare. Ordinul aprobă și decizia de anulare, folosită atunci când contribuabilul își depune ulterior declarația.\n\nDacă în 2025 ai avut venituri din PFA, drepturi de autor, chirii, dividende sau investiții peste pragurile de contribuții și nu ai depus D212, depune-o cât mai curând: la sumele datorate se adaugă dobânzi și penalități de întârziere.",
    link: "/ghiduri/d212-ghid-completare",
  },
  {
    slug: "amnistia-tva-legea-177-2026-procedura-anaf-publicata",
    iso: "2026-11",
    categorie: "TVA",
    tag: "Amnistie",
    urgenta: "info",
    titlu: "Amnistia TVA din Legea 177/2026: ANAF a publicat procedura de anulare și restituire",
    desc: "Legea 177/2026, în vigoare din 27 august 2026, anulează diferențele de TVA și accesoriile stabilite prin decizii de impunere după anularea înregistrării în scopuri de TVA, pentru perioadele fiscale de după 1 ianuarie 2019. Nu se anulează TVA-ul pentru operațiunile în care contribuabilul a înscris taxa în facturi sau a colectat-o de la clienți. Legea acoperă separat și cooperativele agricole cărora li s-a stabilit TVA pentru utilaje agricole.\n\nOrdinul ANAF 1512/2026, publicat la începutul lunii noiembrie 2026, stabilește procedura: anularea se face din oficiu, prin decizie comunicată contribuabilului, iar sumele deja plătite se restituie la cerere.",
  },
  {
    slug: "noul-portal-anaf-si-spv-modernizat-lansare-anuntata-pe-26-noiembrie",
    iso: "2026-11",
    categorie: "ANAF",
    tag: "SPV",
    urgenta: "info",
    titlu: "Noul portal ANAF și SPV modernizat: lansare parțială anunțată pentru 26 noiembrie",
    desc: "Președintele ANAF, Adrian Nica, a indicat 26 noiembrie 2026 pentru prima etapă a noului portal: pagina principală și o versiune modernizată a Spațiului Privat Virtual (SPV), folosit de peste 3,8 milioane de contribuabili. Platforma nu va fi finalizată atunci, iar la 17 noiembrie ANAF nu confirmase data printr-un comunicat oficial.\n\nPentru etapele următoare au fost anunțate formulare precompletate, programări online și discuții cu organul fiscal prin videoconferință.",
    link: "/sisteme/spv",
  },
  {
    slug: "legea-213-2026-sediu-permanent-agent-dependent-din-2027",
    iso: "2026-11",
    categorie: "Cod Fiscal",
    tag: "Nerezidenți",
    urgenta: "info",
    titlu: "Sediu permanent: definiția agentului dependent se schimbă din 2027 (Legea 213/2026)",
    desc: "Legea 213/2026 (Monitorul Oficial nr. 945 din 12 noiembrie 2026) modifică art. 8 alin. (5) din Codul fiscal. O firmă nerezidentă are sediu permanent în România prin intermediul unei persoane care încheie în mod obișnuit contracte în numele ei sau are rolul principal în încheierea lor, fără modificări semnificative din partea firmei.\n\nLegea precizează că sunt vizate și contractele încheiate fără negocierea activă a clauzelor, iar negocierea în România a tuturor elementelor esențiale echivalează cu încheierea contractului în România, chiar dacă semnarea are loc în străinătate. Rămân excluse activitățile pregătitoare sau auxiliare. Modificarea se aplică de la 1 ianuarie 2027.",
  },
  {
    slug: "ministrul-finantelor-fara-tva-mai-mare-in-2027",
    iso: "2026-11",
    categorie: "Cod Fiscal",
    tag: "2027",
    urgenta: "info",
    titlu: "Ministrul Finanțelor: fără TVA mai mare și fără impozit pe valoarea de piață a locuințelor în 2027",
    desc: "Pe 9 noiembrie 2026, ministrul Finanțelor, Alexandru Nazare, a declarat la Bruxelles că Guvernul nu intenționează să majoreze TVA și că impozitarea locuințelor la valoarea de piață nu va fi introdusă în 2027. El a condiționat evitarea unor noi creșteri de taxe de reducerea cheltuielilor publice.\n\nSunt declarații, nu acte normative. Regulile fiscale pentru 2027 se vor vedea în bugetul pe 2027 și în eventualele ordonanțe de la final de an.",
  },
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
    slug: "tichetele-de-masa-raman-la-45-lei-pana-in-martie-2027",
    iso: "2026-10",
    categorie: "Salarii",
    tag: "Tichete de masă",
    urgenta: "info",
    titlu: "Tichetele de masă rămân la maximum 45 lei până în martie 2027",
    desc: "Prin Ordinul ministrului finanțelor nr. 1254/2026 (Monitorul Oficial nr. 830 din 30 septembrie 2026), valoarea maximă a unui tichet de masă rămâne 45 lei pentru perioada octombrie 2026 – martie 2027.\n\nDin valoarea tichetelor se rețin impozit pe venit de 10% și CASS de 10%; nu se datorează CAS și nici contribuția asiguratorie pentru muncă (CAM) a angajatorului. Un proiect de lege depus în octombrie propune creșterea la 50 lei, dar nu fusese adoptat.",
    link: "/ghiduri/salarii-retineri",
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
    slug: "tva-stabilita-din-oficiu-pentru-decontul-d300-nedepus",
    iso: "2026-09",
    categorie: "TVA",
    tag: "D300",
    urgenta: "important",
    titlu: "D300 nedepus: ANAF stabilește TVA din oficiu pe baza datelor RO e-TVA",
    desc: "Ordinul ANAF 1022/2026, publicat în septembrie 2026, înlocuiește procedura din 2016 pentru firmele care nu depun decontul de TVA (formularul 300). ANAF trimite o notificare, iar dacă decontul nu este depus în 15 zile, stabilește taxa din oficiu folosind decontul precompletat RO e-TVA, e-Factura și casele de marcat electronice: TVA colectată minus 50% din TVA deductibilă.\n\nDecizia se emite doar dacă suma depășește 20 lei, iar procedura se întrerupe dacă depui decontul.",
    link: "/declaratii/d300",
  },
  {
    slug: "dac8-platformele-crypto-raporteaza-la-anaf-pana-la-15-martie-2027",
    iso: "2026-07",
    categorie: "Crypto",
    tag: "DAC8",
    urgenta: "important",
    titlu: "DAC8: platformele crypto raportează la ANAF până la 15 martie 2027",
    desc: "Ordinul ANAF 750/2026, în vigoare din 6 iulie 2026, aprobă formularul F8000, prin care furnizorii de servicii de criptoactive raportează anual tranzacțiile utilizatorilor (DAC8, transpusă prin OUG 71/2025). Prima raportare acoperă anul 2026 și se depune până la 15 martie 2027.\n\nPentru câștigurile din 2025, declarate în 2026, ANAF nu avea încă date DAC8. Pentru câștigurile din 2026, declarate până la 25 mai 2027, va putea compara Declarația unică cu rapoartele platformelor.",
    link: "/ghiduri/crypto-impozit-dac8",
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
    slug: "e-factura-obligatorie-pentru-persoanele-fizice-cu-cnp-din-1-iunie-2026",
    iso: "2026-06",
    categorie: "e-Factura",
    tag: "e-Factura",
    urgenta: "important",
    titlu: "e-Factura obligatorie pentru persoanele fizice cu CNP din 1 iunie 2026",
    desc: "Persoanele fizice care desfășoară activități economice și sunt identificate fiscal prin CNP, nu prin CIF, emit facturile prin RO e-Factura din 1 iunie 2026. Obligația vine din OUG 89/2025, iar Ordonanța 6/2026 a amânat-o de la începutul anului până la această dată.\n\nÎnscrierea în Registrul RO e-Factura se face cu formularul 082. Obligația există și pentru cei aflați sub plafonul de scutire de TVA de 395.000 lei. Sunt exceptați, între alții, agricultorii persoane fizice care aplică regimul special pentru agricultori.",
    link: "/sisteme/ro-e-factura",
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
    slug: "ro-e-tva-notificarea-de-conformare-a-fost-eliminata",
    iso: "2026-03",
    categorie: "TVA",
    tag: "e-TVA",
    urgenta: "info",
    titlu: "RO e-TVA: notificarea de conformare a dispărut, decontul precompletat rămâne",
    desc: "De la 1 ianuarie 2026 nu mai există obligația de a răspunde la notificările de conformare RO e-TVA și nici sancțiunile asociate. În martie 2026, OUG 13/2026 a abrogat și prevederile despre notificare din OUG 70/2024.\n\nANAF continuă să pună la dispoziție în SPV decontul precompletat (P300), util pentru verificarea D300 înainte de depunere, și îl folosește la stabilirea din oficiu a TVA pentru deconturile nedepuse.",
    link: "/sisteme/ro-e-tva",
  },
  {
    slug: "impozit-crypto-creste-la-16-dac8-intra-in-vigoare",
    iso: "2026-01",
    categorie: "Crypto",
    tag: "Crypto",
    urgenta: "important",
    titlu: "Impozit crypto crește la 16% — DAC8 intră în vigoare",
    desc: "Din 1 ianuarie 2026, câștigurile din criptomonede se impozitează cu 16% (față de 10% anterior). Scutire: câștiguri sub 200 lei/tranzacție dacă totalul anual nu depășește 600 lei. Prin DAC8, platformele raportează tranzacțiile la ANAF; prima raportare, pentru anul 2026, se face până la 15 martie 2027.",
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
    desc: "Legea 239/2025 a majorat valorile impozabile pentru clădiri și terenuri, iar suma finală depinde de cotele stabilite de fiecare consiliu local. Impozitul auto se calculează după cilindree și norma Euro, cu majorări între 5% și 146% față de 2025, cele mai mari la mașinile hibride. Mașinile electrice, scutite până acum, plătesc 40 lei pe an.",
    link: "/ghiduri/impozite-locale-2026",
  },
  {
    slug: "e-factura-termen-de-5-zile-lucratoare-din-2026",
    iso: "2026-01",
    categorie: "e-Factura",
    tag: "e-Factura",
    urgenta: "important",
    titlu: "e-Factura: termen de transmitere de 5 zile lucrătoare din 2026",
    desc: "Din 1 ianuarie 2026, facturile se transmit în RO e-Factura în cel mult 5 zile lucrătoare de la emitere (înainte: 5 zile calendaristice), dar nu mai târziu de 5 zile lucrătoare de la termenul legal de emitere a facturii (OUG 89/2025, care modifică art. 10 alin. (7) din OUG 120/2021). Sistemul este obligatoriu pentru facturile B2B, B2G și B2C.\n\nAmenzile pentru transmiterea cu întârziere sunt de 5.000–10.000 lei pentru contribuabilii mari, 2.500–5.000 lei pentru cei mijlocii și 1.000–2.500 lei pentru ceilalți contribuabili și persoanele fizice. În relația B2B, netransmiterea facturii se sancționează cu 15% din valoarea ei.",
    link: "/sisteme/ro-e-factura",
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
