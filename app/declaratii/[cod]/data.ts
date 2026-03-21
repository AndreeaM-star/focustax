export type Capitol = {
  id: string;
  titlu: string;
  continut: string[];
};

export type DeclaratieData = {
  cod: string;
  titlu: string;
  categorie: string;
  badgeCuloare: string;
  badgeBg: string;
  badgeBorder: string;
  accentCuloare: string;
  legislatieBg: string;
  legislatieBorder: string;
  legislatieAccent: string;
  subtitle: string;
  periodicitate: string;
  termen: string;
  depunere: string;
  legislatie: string[];
  durata: string;
  capitole: Capitol[];
};

export const declaratii: Record<string, DeclaratieData> = {
  d301: {
    cod: "D301",
    titlu: "Formularul 301",
    categorie: "TVA",
    badgeCuloare: "#d97706",
    badgeBg: "#fef3c7",
    badgeBorder: "#fde68a",
    accentCuloare: "#d97706",
    legislatieBg: "#fffbeb",
    legislatieBorder: "#fde68a",
    legislatieAccent: "#d97706",
    subtitle:
      "Decontul special de TVA — depus de persoanele care nu sunt înregistrate normal în scopuri de TVA, dar realizează achiziții intracomunitare sau operațiuni pentru care sunt obligate la plata TVA.",
    periodicitate: "Lunar",
    termen: "25 ale lunii următoare",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "Se depune de persoanele impozabile neînregistrate în scopuri de TVA conform art. 316 Cod fiscal, care realizează achiziții intracomunitare de bunuri.",
      "Se depune și de persoanele juridice neimpozabile care realizează achiziții intracomunitare peste plafonul de 10.000 euro/an.",
      "Baza legală: art. 326 din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "5 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare",
        continut: [
          "Denumirea contribuabilului",
          "Codul de identificare fiscală (CIF/CUI)",
          "Perioada fiscală: luna calendaristică",
          "Adresa sediului social",
        ],
      },
      {
        id: "B",
        titlu: "B — Achiziții intracomunitare de bunuri",
        continut: [
          "Valoarea achizițiilor intracomunitare de bunuri (fără TVA)",
          "TVA aferentă achizițiilor intracomunitare la cota de 19%",
          "TVA aferentă achizițiilor la cota redusă (9% sau 5%)",
          "Achiziții intracomunitare de mijloace de transport noi",
        ],
      },
      {
        id: "C",
        titlu: "C — Servicii primite de la furnizori din UE",
        continut: [
          "Valoarea serviciilor pentru care beneficiarul este obligat la plata TVA (taxare inversă)",
          "TVA colectată pentru servicii intracomunitare",
          "Servicii electronice, de telecomunicații și de radiodifuziune",
        ],
      },
      {
        id: "D",
        titlu: "D — TVA de plată",
        continut: [
          "Total TVA de plată aferent perioadei declarate",
          "Cont de plată: RO... — cod IBAN specificat de ANAF",
        ],
      },
    ],
  },

  d390: {
    cod: "D390",
    titlu: "Formularul 390 VIES",
    categorie: "TVA",
    badgeCuloare: "#d97706",
    badgeBg: "#fef3c7",
    badgeBorder: "#fde68a",
    accentCuloare: "#d97706",
    legislatieBg: "#fffbeb",
    legislatieBorder: "#fde68a",
    legislatieAccent: "#d97706",
    subtitle:
      "Declarația recapitulativă privind livrările/achizițiile/prestările intracomunitare — folosită pentru raportarea operațiunilor cu parteneri din Uniunea Europeană în sistemul VIES.",
    periodicitate: "Lunar",
    termen: "25 ale lunii următoare",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "Se depune de persoanele impozabile înregistrate în scopuri de TVA care realizează operațiuni intracomunitare.",
      "Datele sunt transmise automat în sistemul VIES (VAT Information Exchange System) la nivel european.",
      "Baza legală: art. 325 din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "10 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare",
        continut: [
          "Codul de înregistrare în scopuri de TVA (format RO + CUI)",
          "Denumirea contribuabilului",
          "Perioada declarată (luna/anul)",
        ],
      },
      {
        id: "B",
        titlu: "B — Livrări intracomunitare de bunuri",
        continut: [
          "Codul de TVA al beneficiarului din statul membru UE",
          "Valoarea totală a livrărilor intracomunitare scutite de TVA",
          "Livrări în cadrul unor operațiuni triunghiulare",
        ],
      },
      {
        id: "C",
        titlu: "C — Prestări de servicii intracomunitare",
        continut: [
          "Codul de TVA al beneficiarului din alt stat UE",
          "Valoarea serviciilor pentru care beneficiarul aplică taxare inversă",
          "Servicii pentru care locul prestării este în statul beneficiarului",
        ],
      },
      {
        id: "D",
        titlu: "D — Achiziții intracomunitare de bunuri",
        continut: [
          "Codul de TVA al furnizorului din statul UE de origine",
          "Valoarea achizițiilor intracomunitare",
          "Achiziții în calitate de beneficiar al unei operațiuni triunghiulare",
        ],
      },
    ],
  },

  d394: {
    cod: "D394",
    titlu: "Formularul 394",
    categorie: "TVA",
    badgeCuloare: "#d97706",
    badgeBg: "#fef3c7",
    badgeBorder: "#fde68a",
    accentCuloare: "#d97706",
    legislatieBg: "#fffbeb",
    legislatieBorder: "#fde68a",
    legislatieAccent: "#d97706",
    subtitle:
      "Declarația informativă privind livrările/prestările și achizițiile efectuate pe teritoriul național — raportare detaliată a tranzacțiilor interne cu alți contribuabili înregistrați în scopuri de TVA.",
    periodicitate: "Lunar / Trimestrial",
    termen: "25 ale lunii/trimestrului următor",
    depunere: "SPV (online)",
    legislatie: [
      "Se depune de toate persoanele impozabile înregistrate în scopuri de TVA în România.",
      "Conține informații detaliate despre fiecare partener comercial și valorile tranzacționate.",
      "Baza legală: OPANAF nr. 3769/2015, cu modificările ulterioare.",
    ],
    durata: "15–30 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Livrări de bunuri și prestări de servicii",
        continut: [
          "CIF-ul beneficiarului și denumirea acestuia",
          "Valoarea totală a livrărilor/prestărilor (fără TVA)",
          "TVA colectată aferentă",
          "Operațiuni taxabile, scutite cu/fără drept de deducere",
          "Livrări de bunuri imobile",
        ],
      },
      {
        id: "B",
        titlu: "B — Achiziții de bunuri și servicii",
        continut: [
          "CIF-ul furnizorului și denumirea acestuia",
          "Valoarea totală a achizițiilor (fără TVA)",
          "TVA deductibilă aferentă",
          "Achiziții de bunuri imobile",
          "Achiziții de combustibil și autovehicule",
        ],
      },
      {
        id: "C",
        titlu: "C — Operațiuni speciale",
        continut: [
          "Livrări prin casă de marcat fiscalizată (retail)",
          "Achiziții de la persoane fizice",
          "Operațiuni de leasing",
          "Operațiuni de tip call-off stock",
        ],
      },
    ],
  },

  d101: {
    cod: "D101",
    titlu: "Formularul 101",
    categorie: "Impozit pe Profit",
    badgeCuloare: "#059669",
    badgeBg: "#d1fae5",
    badgeBorder: "#a7f3d0",
    accentCuloare: "#059669",
    legislatieBg: "#f0fdf4",
    legislatieBorder: "#a7f3d0",
    legislatieAccent: "#059669",
    subtitle:
      "Declarația privind impozitul pe profit — documentul anual prin care contribuabilii plătitori de impozit pe profit stabilesc impozitul datorat pentru exercițiul financiar încheiat.",
    periodicitate: "Anual",
    termen: "25 martie a anului următor (excepție bănci: 25 februarie)",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "Se depune de contribuabilii plătitori de impozit pe profit: SRL, SA, RA, alte persoane juridice române.",
      "Nu se depune de microîntreprinderi (care depun D100 trimestrial) sau de persoanele fizice.",
      "Baza legală: Titlul II din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "20–40 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare",
        continut: [
          "Denumirea contribuabilului și CUI",
          "Exercițiul financiar declarat",
          "Tipul declarației: inițială sau rectificativă",
        ],
      },
      {
        id: "B",
        titlu: "B — Calculul profitului impozabil",
        continut: [
          "Rezultatul contabil brut (profit/pierdere)",
          "Elemente similare veniturilor",
          "Cheltuieli nedeductibile fiscal (protocol, amenzi, dobânzi excesive)",
          "Deduceri suplimentare (sponsorizări, cercetare-dezvoltare)",
          "Profitul impozabil = Rezultat contabil + Cheltuieli nedeductibile − Deduceri",
        ],
      },
      {
        id: "C",
        titlu: "C — Calculul impozitului pe profit",
        continut: [
          "Impozit pe profit = Profit impozabil × 16%",
          "Impozit minim pe cifra de afaceri (dacă aplicabil)",
          "Credite fiscale (sponsorizări — 20% din impozit, max 0.75% din CA)",
          "Impozit pe dividende reținut la sursă, dedus",
          "Impozit de plată / de recuperat",
        ],
      },
      {
        id: "D",
        titlu: "D — Pierderi fiscale",
        continut: [
          "Pierderea fiscală a exercițiului curent",
          "Reportul pierderilor din exercițiile precedente (max 7 ani)",
          "Recuperarea pierderii: max 70% din profitul impozabil al anului curent",
        ],
      },
    ],
  },

  d012: {
    cod: "D012",
    titlu: "Formularul 012",
    categorie: "Impozit pe Profit",
    badgeCuloare: "#059669",
    badgeBg: "#d1fae5",
    badgeBorder: "#a7f3d0",
    accentCuloare: "#059669",
    legislatieBg: "#f0fdf4",
    legislatieBorder: "#a7f3d0",
    legislatieAccent: "#059669",
    subtitle:
      "Notificarea privind alegerea sistemului de declarare și plată a impozitului pe profit — depusă de contribuabilii care optează pentru sistemul plăților anticipate trimestriale.",
    periodicitate: "Ocazional (la opțiune)",
    termen: "31 ianuarie a anului fiscal pentru care se face opțiunea",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "Se depune de contribuabilii plătitori de impozit pe profit care optează pentru sistemul plăților anticipate.",
      "Opțiunea este obligatorie pentru contribuabilii nou-înființați în primul an de activitate.",
      "Baza legală: art. 41 din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "5 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare",
        continut: [
          "Denumirea contribuabilului și CUI",
          "Anul fiscal pentru care se face opțiunea",
        ],
      },
      {
        id: "B",
        titlu: "B — Opțiunea aleasă",
        continut: [
          "Sistem plăți anticipate: impozit calculat la nivelul impozitului din anul precedent, actualizat cu indicele de inflație",
          "Sistem declarare/plată trimestrială: impozit calculat pe baza rezultatelor trimestriale efective",
          "Opțiunea este valabilă pentru cel puțin 2 ani fiscali consecutivi",
        ],
      },
    ],
  },

  d100: {
    cod: "D100",
    titlu: "Formularul 100",
    categorie: "Obligații de plată",
    badgeCuloare: "#374151",
    badgeBg: "#f3f4f6",
    badgeBorder: "#e5e7eb",
    accentCuloare: "#374151",
    legislatieBg: "#f9fafb",
    legislatieBorder: "#e5e7eb",
    legislatieAccent: "#374151",
    subtitle:
      "Declarația privind obligațiile de plată la bugetul de stat — formular cu utilizare multiplă, depus pentru impozit pe profit trimestrial, impozit pe veniturile microîntreprinderilor, accize și alte obligații.",
    periodicitate: "Lunar / Trimestrial",
    termen: "25 ale lunii/trimestrului următor",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "Se depune de microîntreprinderi (trimestrial) pentru impozitul pe veniturile din activitatea curentă.",
      "Se depune de plătitorii de accize (lunar) pentru accizele datorate la bugetul de stat.",
      "Se depune de contribuabilii plătitori de impozit pe profit care efectuează plăți anticipate trimestriale.",
      "Baza legală: OPANAF privind declarațiile fiscale, Legea nr. 227/2015 Cod fiscal.",
    ],
    durata: "5–10 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare",
        continut: [
          "Denumirea contribuabilului și CUI/CIF",
          "Perioada fiscală (luna sau trimestrul)",
          "Tipul obligației declarate",
        ],
      },
      {
        id: "B",
        titlu: "B — Impozit pe veniturile microîntreprinderilor",
        continut: [
          "Veniturile realizate în trimestrul de raportare",
          "Cota aplicabilă: 1% (cu salariat) sau 3% (fără salariat / consultanță > 20%)",
          "Impozitul datorat trimestrial",
          "Reducere pentru sponsorizări (20% din impozit, max 0.75% din CA)",
        ],
      },
      {
        id: "C",
        titlu: "C — Accize și alte obligații",
        continut: [
          "Cantitățile și valorile produselor accizabile",
          "Accizele datorate calculate conform anexelor Codului fiscal",
          "Alte obligații de plată la bugetul de stat declarate prin D100",
        ],
      },
    ],
  },

  d200: {
    cod: "D200",
    titlu: "Formularul 200",
    categorie: "Impozit pe Venit",
    badgeCuloare: "#dc2626",
    badgeBg: "#fee2e2",
    badgeBorder: "#fca5a5",
    accentCuloare: "#dc2626",
    legislatieBg: "#fff5f5",
    legislatieBorder: "#fca5a5",
    legislatieAccent: "#dc2626",
    subtitle:
      "Declarația privind veniturile realizate — depusă de persoanele fizice care au obținut venituri din activități independente, chirii, drepturi de proprietate intelectuală și alte surse în anul fiscal precedent.",
    periodicitate: "Anual",
    termen: "25 mai a anului următor",
    depunere: "SPV (online), Formular PDF cu semnătură digitală sau ghișeu ANAF",
    legislatie: [
      "Se depune de persoanele fizice rezidente care realizează venituri din România sau din străinătate.",
      "Notă: Începând cu 2018, D200 a fost înlocuită în mare parte de Declarația Unică D212 pentru veniturile din activități independente și contribuții sociale.",
      "D200 se mai depune pentru anumite venituri din străinătate și situații specifice.",
      "Baza legală: Titlul IV din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "15–20 minute",
    capitole: [
      {
        id: "I",
        titlu: "Capitolul I — Venituri din activități independente",
        continut: [
          "Venituri din activități independente pe baza datelor din evidența contabilă",
          "Cheltuieli deductibile aferente veniturilor",
          "Venitul net din activități independente",
          "Norma de venit (dacă se aplică)",
        ],
      },
      {
        id: "II",
        titlu: "Capitolul II — Venituri din cedarea folosinței bunurilor",
        continut: [
          "Chirii din cedarea folosinței bunurilor din România",
          "Cota forfetară de cheltuieli: 40% din venitul brut",
          "Venitul net impozabil din chirii",
        ],
      },
      {
        id: "III",
        titlu: "Capitolul III — Venituri din drepturi de proprietate intelectuală",
        continut: [
          "Redevențe, drepturi de autor, brevete, mărci",
          "Cheltuieli deductibile forfetare: 40%",
          "Venitul net impozabil",
        ],
      },
      {
        id: "IV",
        titlu: "Capitolul IV — Venituri din alte surse",
        continut: [
          "Venituri din activități agricole, silvicultură, piscicultură",
          "Câștiguri din transferul proprietăților imobiliare",
          "Alte venituri neîncadrate în categorii principale",
        ],
      },
    ],
  },

  d212: {
    cod: "D212",
    titlu: "Formularul 212 — Declarația Unică",
    categorie: "Impozit pe Venit",
    badgeCuloare: "#dc2626",
    badgeBg: "#fee2e2",
    badgeBorder: "#fca5a5",
    accentCuloare: "#dc2626",
    legislatieBg: "#fff5f5",
    legislatieBorder: "#fca5a5",
    legislatieAccent: "#dc2626",
    subtitle:
      "Declarația unică privind impozitul pe venit și contribuțiile sociale datorate de persoanele fizice — cel mai important formular pentru PFA, persoane fizice cu venituri independente, chirii și investiții.",
    periodicitate: "Anual",
    termen: "25 mai a anului următor",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "A înlocuit D200, D220 și alte declarații separate, simplificate după 2018.",
      "Se depune de persoanele fizice cu venituri din activități independente, chirii, investiții, drepturi de proprietate intelectuală.",
      "Cuprinde atât venitul realizat în anul precedent cât și estimarea pentru anul curent.",
      "Baza legală: art. 120–122 din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "15–30 minute",
    capitole: [
      {
        id: "CAP I",
        titlu: "Capitolul I — Venituri realizate în anul precedent",
        continut: [
          "Venituri din activități independente (PFA, II, IF) — sistem real sau normă de venit",
          "Venituri din drepturi de proprietate intelectuală",
          "Venituri din cedarea folosinței bunurilor (chirii)",
          "Venituri din activități agricole, silvicultură și piscicultură",
          "Venituri din investiții (dividende, dobânzi, câștiguri din tranzacții)",
          "CAS și CASS datorate pentru veniturile realizate",
        ],
      },
      {
        id: "CAP II",
        titlu: "Capitolul II — Venit estimat pentru anul curent",
        continut: [
          "Estimarea venitului net pentru anul fiscal în curs (baza de calcul CAS/CASS anticipate)",
          "Alegerea bazei de calcul pentru CAS: venitul estimat sau salariul minim brut",
          "Alegerea bazei de calcul pentru CASS: venitul estimat sau plafonul de 6 salarii minime",
          "Opțiunea de plată a CAS chiar dacă venitul estimat este sub plafonul minim",
          "Declararea de venituri din surse noi față de anul anterior",
        ],
      },
    ],
  },

  d220: {
    cod: "D220",
    titlu: "Formularul 220",
    categorie: "Impozit pe Venit",
    badgeCuloare: "#dc2626",
    badgeBg: "#fee2e2",
    badgeBorder: "#fca5a5",
    accentCuloare: "#dc2626",
    legislatieBg: "#fff5f5",
    legislatieBorder: "#fca5a5",
    legislatieAccent: "#dc2626",
    subtitle:
      "Declarația privind venitul estimat/norma de venit — depusă la începerea activității sau la modificarea estimărilor de venit pentru stabilirea plăților anticipate de impozit.",
    periodicitate: "Anual / La modificare",
    termen: "30 de zile de la începerea activității sau modificarea venitului",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "Notă: Formularul D220 a fost integrat în Declarația Unică D212 începând cu 2018.",
      "Se mai poate depune în situații tranzitorii sau pentru anumite categorii de venituri specifice.",
      "Baza legală: art. 120 din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "10 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare",
        continut: [
          "Numele și prenumele contribuabilului",
          "CNP (Codul Numeric Personal)",
          "Adresa domiciliului fiscal",
        ],
      },
      {
        id: "B",
        titlu: "B — Venitul estimat",
        continut: [
          "Categoria de venit (activități independente, chirii, agricultură etc.)",
          "Venitul brut estimat pentru anul în curs",
          "Cheltuielile deductibile estimate",
          "Venitul net estimat — baza de calcul a impozitului anticipat",
          "Norma de venit (dacă activitatea este inclusă în Nomenclatorul normelor de venit)",
        ],
      },
    ],
  },

  d230: {
    cod: "D230",
    titlu: "Formularul 230",
    categorie: "Impozit pe Venit",
    badgeCuloare: "#dc2626",
    badgeBg: "#fee2e2",
    badgeBorder: "#fca5a5",
    accentCuloare: "#dc2626",
    legislatieBg: "#fff5f5",
    legislatieBorder: "#fca5a5",
    legislatieAccent: "#dc2626",
    subtitle:
      "Cererea privind destinația sumei reprezentând până la 3,5% din impozitul anual datorat — permite direcționarea unei cote din impozit către entități nonprofit sau unități de cult.",
    periodicitate: "Anual",
    termen: "25 mai a anului următor celui în care s-a realizat venitul",
    depunere: "SPV (online), formular tipărit la ANAF sau ghișeu",
    legislatie: [
      "Poate fi depusă de orice persoană fizică rezidentă care datorează impozit pe venit.",
      "Suma direcționată: max 3,5% din impozitul pe venit anual (anterior era 2%).",
      "Beneficiarii: ONG-uri, asociații, fundații, unități de cult înregistrate fiscal.",
      "Baza legală: art. 123^1 din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "5 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare contribuabil",
        continut: [
          "Numele și prenumele, CNP",
          "Adresa domiciliului fiscal",
          "Categoriile de venituri realizate în anul de referință",
        ],
      },
      {
        id: "B",
        titlu: "B — Date de identificare beneficiar",
        continut: [
          "Denumirea completă a entității nonprofit beneficiare",
          "CIF-ul (Codul de Identificare Fiscală) al entității",
          "Contul bancar IBAN al entității",
          "Suma solicitată (% din impozit sau sumă fixă, max 3,5%)",
        ],
      },
    ],
  },

  d112: {
    cod: "D112",
    titlu: "Formularul 112",
    categorie: "Contribuții Sociale",
    badgeCuloare: "#2563eb",
    badgeBg: "#dbeafe",
    badgeBorder: "#93c5fd",
    accentCuloare: "#2563eb",
    legislatieBg: "#eff6ff",
    legislatieBorder: "#93c5fd",
    legislatieAccent: "#2563eb",
    subtitle:
      "Declarația privind obligațiile de plată a contribuțiilor sociale, impozitului pe venit și evidența nominală a persoanelor asigurate — declarația lunară a angajatorilor pentru salariați.",
    periodicitate: "Lunar",
    termen: "25 ale lunii următoare celei pentru care se datorează",
    depunere: "SPV (online) — obligatoriu electronic",
    legislatie: [
      "Se depune de angajatori (persoane juridice sau fizice) care au angajați cu contract de muncă.",
      "Conține evidența nominală a fiecărui angajat: venituri, contribuții individuale și de angajator.",
      "Baza legală: Legea nr. 227/2015 Cod fiscal, Titlul V — Contribuții sociale obligatorii.",
    ],
    durata: "10–30 minute (în funcție de numărul de angajați)",
    capitole: [
      {
        id: "A",
        titlu: "A — Date angajator",
        continut: [
          "CUI-ul și denumirea angajatorului",
          "Numărul total de asigurați declarați",
          "Luna și anul de raportare",
        ],
      },
      {
        id: "B",
        titlu: "B — Evidența nominală a angajaților",
        continut: [
          "CNP-ul fiecărui angajat",
          "Venitul brut realizat în luna de raportare",
          "CAS individual: 25% din venitul brut",
          "CASS individual: 10% din venitul brut",
          "Impozit pe venit reținut la sursă: 10% din venitul net",
          "Contribuția asiguratorie pentru muncă (CAM): 2,25% suportată de angajator",
        ],
      },
      {
        id: "C",
        titlu: "C — Centralizator obligații",
        continut: [
          "Total CAS datorat (individual + angajator, dacă e cazul)",
          "Total CASS datorat",
          "Total impozit pe venit reținut",
          "Total CAM (contribuția asiguratorie pentru muncă)",
        ],
      },
    ],
  },

  d204: {
    cod: "D204",
    titlu: "Formularul 204",
    categorie: "Contribuții Sociale",
    badgeCuloare: "#2563eb",
    badgeBg: "#dbeafe",
    badgeBorder: "#93c5fd",
    accentCuloare: "#2563eb",
    legislatieBg: "#eff6ff",
    legislatieBorder: "#93c5fd",
    legislatieAccent: "#2563eb",
    subtitle:
      "Declarația privind venitul asigurat și contribuția de asigurări sociale (CAS) datorată de persoanele fizice care realizează venituri din activități independente.",
    periodicitate: "Anual",
    termen: "25 mai a anului următor",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "Notă: Formularul D204 a fost în mare parte înlocuit de Declarația Unică D212 care include și contribuțiile sociale.",
      "Se depune în situații specifice pentru regularizarea CAS pentru activități independente.",
      "Baza legală: art. 148–153 din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "10 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare",
        continut: [
          "Numele, prenumele și CNP-ul",
          "Adresa domiciliului fiscal",
          "Tipul activității independente",
        ],
      },
      {
        id: "B",
        titlu: "B — Venitul asigurat și CAS",
        continut: [
          "Venitul net realizat din activități independente",
          "Baza de calcul CAS: venitul ales (min. salariul minim brut lunar pe economie × 12)",
          "CAS datorat = Baza de calcul × 25%",
          "CAS achitat prin plăți anticipate",
          "Diferența de CAS de plată/de recuperat",
        ],
      },
    ],
  },

  d216: {
    cod: "D216",
    titlu: "Formularul 216",
    categorie: "Contribuții Sociale",
    badgeCuloare: "#2563eb",
    badgeBg: "#dbeafe",
    badgeBorder: "#93c5fd",
    accentCuloare: "#2563eb",
    legislatieBg: "#eff6ff",
    legislatieBorder: "#93c5fd",
    legislatieAccent: "#2563eb",
    subtitle:
      "Declarația privind contribuția de asigurări sociale de sănătate (CASS) datorată de persoanele fizice care nu realizează venituri sau realizează venituri din activități independente.",
    periodicitate: "Anual",
    termen: "25 mai a anului următor",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "Notă: Formularul D216 a fost în mare parte înlocuit de Declarația Unică D212 care include CASS.",
      "Se depune pentru anumite situații specifice de CASS datorat de persoane fără venituri sau cu venituri speciale.",
      "Baza legală: art. 168–174 din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "10 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare",
        continut: [
          "Numele, prenumele și CNP-ul",
          "Adresa domiciliului fiscal",
          "Categoria de persoană asigurată",
        ],
      },
      {
        id: "B",
        titlu: "B — CASS datorat",
        continut: [
          "Tipul veniturilor realizate (independente, chirii, investiții, alte surse)",
          "Venitul total realizat",
          "Baza de calcul CASS: min. 6 salarii minime brute, max. 60 salarii minime brute",
          "CASS datorat = Baza de calcul × 10%",
          "CASS achitat prin plăți anticipate",
          "Diferența CASS de plată/de recuperat",
        ],
      },
    ],
  },

  d120: {
    cod: "D120",
    titlu: "Formularul 120",
    categorie: "Accize",
    badgeCuloare: "#7c3aed",
    badgeBg: "#ede9fe",
    badgeBorder: "#c4b5fd",
    accentCuloare: "#7c3aed",
    legislatieBg: "#faf5ff",
    legislatieBorder: "#c4b5fd",
    legislatieAccent: "#7c3aed",
    subtitle:
      "Decontul privind accizele — depus lunar de antrepozitarii autorizați și operatorii înregistrați pentru produse supuse accizelor armonizate (alcool, produse energetice, tutun).",
    periodicitate: "Lunar",
    termen: "25 ale lunii următoare",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "Se depune de antrepozitarii autorizați pentru producție, transformare sau deținere de produse accizabile.",
      "Se depune și de destinatarii înregistrați și expeditorii înregistrați pentru achiziții intracomunitare.",
      "Baza legală: Titlul VIII din Legea nr. 227/2015 privind Codul fiscal — Accize și alte taxe speciale.",
    ],
    durata: "15–20 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare",
        continut: [
          "CUI-ul și denumirea antrepozitarului/operatorului",
          "Codul de accize / numărul de autorizație",
          "Luna și anul de raportare",
        ],
      },
      {
        id: "B",
        titlu: "B — Produse accizabile — intrări",
        continut: [
          "Producția proprie realizată în antrepozit",
          "Achiziții intracomunitare de produse accizabile",
          "Importuri de produse accizabile",
          "Transferuri primite din alte antrepozite",
        ],
      },
      {
        id: "C",
        titlu: "C — Produse accizabile — ieșiri",
        continut: [
          "Eliberările pentru consum (generatoare de accize)",
          "Livrările scutite de accize (export, aprovizionare avioane/nave)",
          "Transferurile către alte antrepozite fiscale",
          "Distrugeri și pierderi autorizate",
        ],
      },
      {
        id: "D",
        titlu: "D — Calculul accizelor",
        continut: [
          "Cantitățile eliberate pentru consum × cotele de accize din Codul fiscal",
          "Accize de plată după deducerea avansurilor achitate",
          "Regularizări față de perioadele anterioare",
        ],
      },
    ],
  },

  d130: {
    cod: "D130",
    titlu: "Formularul 130",
    categorie: "Accize",
    badgeCuloare: "#7c3aed",
    badgeBg: "#ede9fe",
    badgeBorder: "#c4b5fd",
    accentCuloare: "#7c3aed",
    legislatieBg: "#faf5ff",
    legislatieBorder: "#c4b5fd",
    legislatieAccent: "#7c3aed",
    subtitle:
      "Declarația privind impozitul la țițeiul din producția internă — depusă lunar de producătorii de țiței autohton pentru impozitul specific datorat la bugetul de stat.",
    periodicitate: "Lunar",
    termen: "25 ale lunii următoare",
    depunere: "SPV (online) sau ghișeu ANAF",
    legislatie: [
      "Se depune exclusiv de producătorii de țiței din producția internă (extracție autohtonă).",
      "Impozitul se calculează ca diferență dintre prețul de vânzare și prețul de referință, înmulțită cu cantitatea extrasă.",
      "Baza legală: art. 424–425 din Legea nr. 227/2015 privind Codul fiscal.",
    ],
    durata: "10 minute",
    capitole: [
      {
        id: "A",
        titlu: "A — Date de identificare",
        continut: [
          "CUI-ul și denumirea producătorului",
          "Luna și anul de raportare",
          "Zăcămintele/perimetrele de extracție",
        ],
      },
      {
        id: "B",
        titlu: "B — Producția și calculul impozitului",
        continut: [
          "Cantitatea de țiței extrasă în luna de raportare (tone)",
          "Prețul mediu de vânzare realizat",
          "Prețul de referință stabilit de autorități",
          "Impozit datorat = (Preț vânzare − Preț referință) × Cantitate",
          "Impozit de plată la bugetul de stat",
        ],
      },
    ],
  },
};
