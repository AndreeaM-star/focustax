export type PasTimeline = { an: string; eveniment: string; };
export type SistemData = {
  id: string;
  titlu: string;
  emoji: string;
  descriereScurta: string;
  obligatoriuDin?: string;
  culoare: string;
  badge: string;
  descriere: string;
  cineEObligat: string[];
  cumFunctioneaza: { pas: string; descriere: string }[];
  timeline: PasTimeline[];
  sanctiuni?: string[];
  linkuriOficiale: { titlu: string; url: string }[];
  sfaturi?: string[];
};

export const sisteme: Record<string, SistemData> = {
  "ro-e-factura": {
    id: "ro-e-factura",
    titlu: "RO e-Factura",
    emoji: "🧾",
    descriereScurta: "Sistemul național de factură electronică — transmitere obligatorie prin ANAF.",
    obligatoriuDin: "ian. 2024",
    culoare: "#2563eb",
    badge: "TVA",
    descriere: "RO e-Factura este sistemul național prin care facturile se transmit la ANAF în format XML, conform standardului european SR EN 16931. A fost introdus prin OUG 120/2021, a devenit obligatoriu pentru toate facturile B2B din 1 ianuarie 2024, iar din 2025 se transmit în sistem și facturile emise către persoane fizice (B2C). Din 1 iunie 2026 îl folosesc și persoanele fizice cu activități economice identificate prin CNP.",
    cineEObligat: [
      "Persoanele impozabile stabilite în România, pentru facturile emise către alte firme (B2B) și către instituții publice (B2G)",
      "Din 2025, și pentru facturile emise către persoane fizice (B2C)",
      "Din 1 iunie 2026, persoanele fizice care desfășoară activități economice și sunt identificate fiscal prin CNP (înscriere cu formularul 082), inclusiv sub plafonul de scutire de TVA",
      "Excepții, între altele: agricultorii persoane fizice care aplică regimul special pentru agricultori",
    ],
    cumFunctioneaza: [
      { pas: "1. Creezi factura", descriere: "Generezi factura în format XML (UBL 2.1 sau CII, cu regulile naționale RO_CIUS), din programul de facturare sau din aplicația gratuită a Ministerului Finanțelor." },
      { pas: "2. Transmiți la ANAF", descriere: "Încarci XML-ul în RO e-Factura prin SPV sau prin API." },
      { pas: "3. ANAF validează", descriere: "Sistemul verifică structura facturii și îi atribuie un index de încărcare; factura validată primește sigiliul electronic al Ministerului Finanțelor." },
      { pas: "4. Beneficiarul o primește", descriere: "Clientul firmă descarcă factura din SPV. Clienților persoane fizice le poți da factura și în PDF sau pe hârtie, dar o transmiți oricum în sistem." },
      { pas: "5. Termenul de transmitere", descriere: "Din 1 ianuarie 2026: 5 zile lucrătoare de la data emiterii, dar nu mai târziu de 5 zile lucrătoare de la termenul legal de emitere a facturii (OUG 89/2025). Până atunci termenul era de 5 zile calendaristice." },
    ],
    timeline: [
      { an: "2021", eveniment: "OUG 120/2021 creează sistemul național RO e-Factura" },
      { an: "2022", eveniment: "Obligatoriu în relația cu instituțiile publice (B2G) și pentru produsele cu risc fiscal ridicat" },
      { an: "Ian 2024", eveniment: "Obligatoriu pentru toate facturile B2B între firme stabilite în România" },
      { an: "2025", eveniment: "Se transmit în sistem și facturile către persoane fizice (B2C); sancțiunile B2C se aplică din iulie 2025" },
      { an: "Ian 2026", eveniment: "Termenul de transmitere devine 5 zile lucrătoare (OUG 89/2025)" },
      { an: "Iun 2026", eveniment: "Obligatoriu pentru persoanele fizice cu activități economice identificate prin CNP (amânare prin Ordonanța 6/2026)" },
    ],
    sanctiuni: [
      "Transmitere cu întârziere: 5.000–10.000 lei pentru contribuabilii mari, 2.500–5.000 lei pentru cei mijlocii, 1.000–2.500 lei pentru ceilalți contribuabili și persoanele fizice",
      "În relația B2B, netransmiterea facturii prin sistem se sancționează cu amendă egală cu 15% din valoarea totală a facturii",
      "Destinatarul care primește și înregistrează o factură B2B emisă în afara sistemului riscă tot o amendă de 15% din valoarea facturii",
    ],
    linkuriOficiale: [
      { titlu: "RO e-Factura — Ministerul Finanțelor", url: "https://mfinante.gov.ro/ro/web/efactura" },
      { titlu: "Informații tehnice RO e-Factura", url: "https://mfinante.gov.ro/ro/web/efactura/informatii-tehnice" },
    ],
    sfaturi: [
      "Verifică dacă programul tău de facturare generează XML conform RO_CIUS și îl transmite automat",
      "Setează o alertă pentru termenul de 5 zile lucrătoare de la emitere",
      "Verifică săptămânal în SPV facturile primite de la furnizori și erorile de validare",
    ],
  },

  "spv": {
    id: "spv",
    titlu: "SPV — Spațiul Privat Virtual",
    emoji: "🔐",
    descriereScurta: "Platforma principală de comunicare online cu ANAF — depunere declarații, mesaje, notificări.",
    obligatoriuDin: "2016",
    culoare: "#059669",
    badge: "General",
    descriere: "Spațiul Privat Virtual (SPV) este platforma online a ANAF prin care contribuabilii pot depune declarații fiscale, primi notificări, comunica cu inspectorii fiscali și accesa situația fiscală personală. Persoanele juridice sunt obligate să utilizeze SPV pentru toate declarațiile din 2022.",
    cineEObligat: [
      "Persoane juridice (SRL, SA, etc.) — obligatoriu din 2022 pentru toate declarațiile",
      "PFA, II, IF — obligatoriu din 2022",
      "Persoane fizice — opțional; pot depune declarațiile și pe hârtie, dar SPV este recomandat",
      "Orice persoană care dorește să interacționeze electronic cu ANAF",
    ],
    cumFunctioneaza: [
      { pas: "1. Înregistrare cont", descriere: "Creezi cont pe anaf.ro cu CNP/CUI, email și parola sau cu certificat digital calificat." },
      { pas: "2. Validare identitate", descriere: "Validezi identitatea prin SMS sau prezentare la ghișeul ANAF cu actul de identitate." },
      { pas: "3. Depunere declarații", descriere: "Accesezi 'Depunere declarații' și încărci fișierele PDF cu XML sau completezi direct online." },
      { pas: "4. Primire notificări", descriere: "ANAF trimite automat decizii de impunere, somaţii și confirmări în căsuța ta SPV." },
      { pas: "5. Verificare situație fiscală", descriere: "Poți vedea oricând situația obligațiilor fiscale, plăților efectuate și eventualelor restanțe." },
    ],
    timeline: [
      { an: "2014", eveniment: "Lansarea primei versiuni SPV — opțional" },
      { an: "2016", eveniment: "Extindere funcționalități — depunere declarații online" },
      { an: "2020", eveniment: "Îmbunătățiri semnificative de interfață și funcționalitate" },
      { an: "2022", eveniment: "Obligatoriu pentru persoane juridice și PFA" },
      { an: "Nov 2026", eveniment: "Lansare parțială anunțată a noului portal ANAF și a SPV modernizat (26 noiembrie), fără comunicat oficial până la 17 noiembrie" },
    ],
    sanctiuni: [
      "Declarațiile depuse la ghișeu de persoanele juridice sunt respinse (nu sunt acceptate)",
      "Amenzi pentru nedepunerea declarațiilor în termen",
    ],
    linkuriOficiale: [
      { titlu: "SPV — Portal ANAF", url: "https://www.anaf.ro/anaf/internet/RO/spv" },
      { titlu: "Ghid înregistrare SPV", url: "https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/Ghid_SPV.pdf" },
    ],
    sfaturi: [
      "Verifică căsuța SPV săptămânal — ANAF trimite documente cu termen de răspuns",
      "Activează notificările prin email în setările contului SPV",
      "Păstrează o copie a tuturor declarațiilor depuse pentru arhivă",
    ],
  },

  "ro-e-tva": {
    id: "ro-e-tva",
    titlu: "RO e-TVA",
    emoji: "📊",
    descriereScurta: "Decontul de TVA precompletat de ANAF (P300), cu rol informativ.",
    culoare: "#7c3aed",
    badge: "TVA",
    descriere: "RO e-TVA este sistemul prin care ANAF întocmește decontul de TVA precompletat (P300), din datele e-Factura, SAF-T, e-Transport, ale caselor de marcat și din declarația 394. Decontul precompletat are rol informativ: plătitorii de TVA își depun în continuare decontul D300. Din 2026 nu mai există obligația de a răspunde la notificările de conformare, iar ANAF folosește datele e-TVA pentru a stabili TVA din oficiu atunci când decontul nu este depus.",
    cineEObligat: [
      "Decontul precompletat se pune la dispoziție, în SPV, persoanelor înregistrate în scopuri de TVA",
      "Nu există o obligație separată: depui D300 ca până acum, până pe 25 ale lunii următoare perioadei fiscale",
      "Dacă nu depui D300, primești o notificare; după 15 zile, ANAF poate stabili TVA din oficiu (Ordinul ANAF 1022/2026)",
    ],
    cumFunctioneaza: [
      { pas: "1. ANAF întocmește P300", descriere: "Din datele e-Factura, SAF-T, e-Transport, case de marcat și D394, ANAF generează decontul precompletat pentru fiecare perioadă fiscală." },
      { pas: "2. Îl găsești în SPV", descriere: "Decontul precompletat și rapoartele de detaliu apar în secțiunea RO e-TVA din SPV, cu aceeași autentificare ca la e-Factura." },
      { pas: "3. Compari cu evidența ta", descriere: "Verifici diferențele față de jurnalele de vânzări și cumpărări: importuri, facturi primite cu întârziere, regularizări, operațiuni fără factură electronică." },
      { pas: "4. Depui D300", descriere: "Depui decontul D300 la termen. Din 2026 diferențele nu mai trebuie justificate printr-un răspuns la notificare." },
    ],
    timeline: [
      { an: "2024", eveniment: "OUG 70/2024 introduce decontul precompletat RO e-TVA; modelul P300 aprobat prin Ordinul ANAF 3775/2024" },
      { an: "2025", eveniment: "Notificări de conformare pentru diferențe semnificative (cel puțin 20% și 5.000 lei); obligația de răspuns și sancțiunile au fost suspendate până la 31 decembrie 2025" },
      { an: "Ian 2026", eveniment: "Dispar obligația de a răspunde la notificări și sancțiunile asociate" },
      { an: "Mar 2026", eveniment: "OUG 13/2026 abrogă prevederile despre notificarea de conformare" },
      { an: "Sep 2026", eveniment: "Ordinul ANAF 1022/2026: TVA stabilită din oficiu pe baza datelor e-TVA pentru deconturile nedepuse" },
    ],
    sanctiuni: [
      "Din 2026 nu mai există sancțiuni pentru diferențele dintre decontul precompletat și D300",
      "Pentru D300 nedepus: TVA stabilită din oficiu (TVA colectată minus 50% din TVA deductibilă), plus dobânzi și penalități",
      "Amenzile pentru nedepunerea la termen a D300 rămân cele din Codul de procedură fiscală",
    ],
    linkuriOficiale: [
      { titlu: "OUG 70/2024 privind decontul precompletat RO e-TVA", url: "https://static.anaf.ro/static/10/Anaf/legislatie/OUG_70_2024.pdf" },
      { titlu: "Ordinul ANAF 1022/2026 — TVA stabilită din oficiu", url: "https://static.anaf.ro/static/10/Anaf/legislatie/OPANAF_1022_2026.pdf" },
    ],
    sfaturi: [
      "Transmite corect și la timp facturile în e-Factura: altfel decontul precompletat nu se potrivește cu evidența ta",
      "Verifică dacă furnizorii au transmis facturile în e-Factura, pentru că afectează TVA deductibilă precompletată",
      "Dacă primești notificare pentru D300 nedepus, depune decontul în 15 zile ca să oprești stabilirea din oficiu",
    ],
  },

  "ro-e-transport": {
    id: "ro-e-transport",
    titlu: "RO e-Transport",
    emoji: "🚛",
    descriereScurta: "Monitorizarea electronică a transportului de bunuri cu risc fiscal ridicat pe teritoriul României.",
    obligatoriuDin: "2022",
    culoare: "#d97706",
    badge: "Transport",
    descriere: "RO e-Transport este sistemul de monitorizare electronică a transportului bunurilor cu risc fiscal ridicat. Înainte de transportul bunurilor, expeditorul sau destinatarul declară transportul în sistem și primește un cod UIT care trebuie însoțit de marfă.",
    cineEObligat: [
      "Expeditorii sau destinatarii de bunuri cu risc fiscal ridicat (produse alimentare, băuturi alcoolice, tutun, combustibil, etc.)",
      "Transportatorii de bunuri declarate în sistem — trebuie să aibă codul UIT la bord",
      "Persoane fizice autorizate și juridice implicate în lanțul de aprovizionare al bunurilor cu risc",
    ],
    cumFunctioneaza: [
      { pas: "1. Identifică bunurile", descriere: "Verifică dacă bunurile transportate intră în categoria cu risc fiscal ridicat conform listei ANAF." },
      { pas: "2. Declară transportul", descriere: "Declari transportul în aplicația RO e-Transport din SPV (sau prin API): expeditor, destinatar, bunuri, vehicul, dată." },
      { pas: "3. Primești codul UIT", descriere: "ANAF generează un cod UIT (Unique Identification Transport) valid 5 zile." },
      { pas: "4. Transportul are loc", descriere: "Transportatorul are la bord documentele și codul UIT. ANAF poate verifica prin aplicație mobilă." },
      { pas: "5. Actualizezi dacă e necesar", descriere: "Dacă apar modificări (cantitate, traseu), actualizezi declarația înainte de transport." },
    ],
    timeline: [
      { an: "2022", eveniment: "OUG 41/2022: opțional din 1 aprilie, obligatoriu din 1 iulie 2022 pentru bunurile cu risc fiscal ridicat (lista din Ordinul ANAF 802/2022)" },
      { an: "2024", eveniment: "Extindere la transporturile rutiere internaționale de bunuri; sancțiunile pentru acestea se aplică din 1 ianuarie 2025" },
      { an: "Nov 2024", eveniment: "OUG 129/2024: regim gradual — prima abatere nu mai atrage confiscarea" },
      { an: "2026", eveniment: "Lista bunurilor cu risc fiscal ridicat este în continuare cea din Ordinul ANAF 802/2022" },
    ],
    sanctiuni: [
      "Nedeclararea transporturilor sau declararea unor date care nu corespund realității: amendă de la 10.000 la 50.000 lei pentru persoanele fizice și de la 20.000 la 100.000 lei pentru persoanele juridice (OUG 129/2024)",
      "Confiscarea valorii bunurilor nedeclarate se aplică gradual, nu la prima abatere",
    ],
    linkuriOficiale: [
      { titlu: "RO e-Transport — Ministerul Finanțelor", url: "https://mfinante.gov.ro/ro/web/etransport" },
      { titlu: "Ghid ANAF RO e-Transport 2025", url: "https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/Ghid_RO_e_Transport_2025.pdf" },
    ],
    sfaturi: [
      "Declară transportul cu cel puțin 3 ore înainte de plecare pentru a evita probleme tehnice",
      "Păstrează codul UIT în format digital și fizic în vehicul",
      "Verifică înainte de fiecare transport dacă bunurile au risc fiscal",
    ],
  },

  "one-stop-shop": {
    id: "one-stop-shop",
    titlu: "One Stop Shop (OSS)",
    emoji: "🌍",
    descriereScurta: "Regim simplificat pentru TVA pe servicii digitale și comerț electronic UE.",
    obligatoriuDin: "2021",
    culoare: "#0ea5e9",
    badge: "TVA UE",
    descriere: "One Stop Shop (OSS) este un regim opțional de TVA care permite comercianților să declare și plătească TVA pentru toate vânzările B2C din UE printr-un singur stat membru. Elimină nevoia de înregistrare TVA în fiecare țară UE unde vinzi.",
    cineEObligat: [
      "Comercianții care vând produse fizice sau digitale consumatorilor din UE (B2C)",
      "Pragul: vânzări totale B2C UE > 10.000 EUR/an — sub acest prag se aplică TVA din statul vânzătorului",
      "Platformele digitale (Amazon, eBay, etc.) pot fi considerate furnizori și trebuie să se înregistreze",
      "Prestatorii de servicii digitale (streaming, software, etc.) cu clienți din UE",
    ],
    cumFunctioneaza: [
      { pas: "1. Înregistrare OSS", descriere: "Te înregistrezi în OSS în România prin SPV — valabil pentru toate vânzările B2C din UE." },
      { pas: "2. Calculezi TVA per țară", descriere: "Pentru fiecare vânzare B2C, aplici cota de TVA din țara consumatorului (nu din România)." },
      { pas: "3. Depui declarația OSS", descriere: "Trimestrial depui o singură declarație OSS cu toate vânzările B2C din UE." },
      { pas: "4. Plătești în România", descriere: "Plătești TVA colectată o singură dată în România — ANAF distribuie sumele către statele membre." },
    ],
    timeline: [
      { an: "2015", eveniment: "Mini One Stop Shop (MOSS) pentru servicii digitale" },
      { an: "2021", eveniment: "Extindere la One Stop Shop — include și bunuri fizice" },
      { an: "2023", eveniment: "Clarificări pentru platforme digitale și marketplace-uri" },
    ],
    sanctiuni: [
      "Penalități în fiecare stat UE unde nu s-a declarat TVA corect",
      "Excluderea din regim OSS pentru nedepunerea declarațiilor",
    ],
    linkuriOficiale: [
      { titlu: "OSS — Comisia Europeană", url: "https://taxation-customs.ec.europa.eu/taxation/vat/digital-services/one-stop-shop_en" },
      { titlu: "Înregistrare OSS — ANAF", url: "https://www.anaf.ro/anaf/internet/RO/OSS" },
    ],
    sfaturi: [
      "Dacă vinzi sub 10.000 EUR/an B2C în UE, aplici TVA românesc — mai simplu",
      "Verifică cotele de TVA pentru fiecare țară UE înainte de setarea prețurilor",
    ],
  },

  "sme-ss": {
    id: "sme-ss",
    titlu: "SME-SS",
    emoji: "💼",
    descriereScurta: "Scutirea de TVA pentru întreprinderile mici, aplicabilă și în alte state UE.",
    culoare: "#059669",
    badge: "TVA",
    descriere: "SME-SS este regimul special de scutire de TVA pentru întreprinderile mici, extins la nivelul UE prin Directiva (UE) 2020/285. În România se aplică din 1 septembrie 2025 (Ordonanța 22/2025): o firmă stabilită în România poate aplica scutirea de TVA și în alte state membre care au un astfel de regim, dacă cifra de afaceri totală în UE nu depășește 100.000 EUR, iar în fiecare stat respectă plafonul național de scutire. Tot din 1 septembrie 2025, plafonul de scutire în România este de 395.000 lei.",
    cineEObligat: [
      "Regim opțional, nu o obligație",
      "Firme stabilite în România cu cifra de afaceri în UE de cel mult 100.000 EUR, atât în anul curent, cât și în anul precedent",
      "Firme din alte state UE care aplică scutirea pentru operațiunile din România, dacă respectă plafonul UE de 100.000 EUR și plafonul românesc de 395.000 lei",
    ],
    cumFunctioneaza: [
      { pas: "1. Verifici plafoanele", descriere: "Cifra de afaceri totală în UE de cel mult 100.000 EUR, plus plafonul național de scutire din fiecare stat în care vrei să aplici regimul." },
      { pas: "2. Depui notificarea prealabilă", descriere: "Anunți ANAF în ce state membre vrei să aplici scutirea și primești un număr de identificare special pentru acest regim." },
      { pas: "3. Raportezi trimestrial", descriere: "Raportezi la ANAF valoarea operațiunilor din România și din fiecare stat în care aplici scutirea." },
      { pas: "4. Ieșirea din regim", descriere: "Scutirea încetează de la data depășirii plafonului de 100.000 EUR sau a plafonului național ori când renunți prin notificare." },
    ],
    timeline: [
      { an: "2020", eveniment: "Directiva (UE) 2020/285 privind regimul special pentru întreprinderile mici" },
      { an: "Ian 2025", eveniment: "Regimul transfrontalier se aplică la nivelul UE" },
      { an: "Sep 2025", eveniment: "România aplică regimul transfrontalier și majorează plafonul de scutire la 395.000 lei (Ordonanța 22/2025)" },
      { an: "Nov 2025", eveniment: "Ordinul ANAF 2509/2025 aprobă procedurile de aplicare" },
    ],
    sanctiuni: [
      "La depășirea plafonului de 100.000 EUR, scutirea în celelalte state membre încetează de la data depășirii",
    ],
    linkuriOficiale: [
      { titlu: "Ordonanța 22/2025 (modificarea Codului fiscal)", url: "https://static.anaf.ro/static/10/Anaf/legislatie/OG_22_2025.pdf" },
    ],
    sfaturi: [
      "Urmărește cifra de afaceri la nivelul întregii UE, nu doar în România",
      "Verifică plafonul național din fiecare stat în care vrei să aplici scutirea",
    ],
  },

  "ro-e-sigiliu": {
    id: "ro-e-sigiliu",
    titlu: "RO e-Sigiliu",
    emoji: "🔏",
    descriereScurta: "Sigiliul electronic aplicat documentelor fiscale de ANAF pentru autentificare.",
    culoare: "#8b5cf6",
    badge: "Autentificare",
    descriere: "RO e-Sigiliu este mecanismul prin care ANAF aplică o semnătură electronică calificată (sigiliu) documentelor fiscale emise sau validate de sistem. Permite verificarea autenticității documentelor primite de la ANAF.",
    cineEObligat: [
      "Nu este o obligație pentru contribuabili — este aplicat automat de ANAF",
      "Contribuabilii trebuie să verifice sigiliul documentelor primite de la ANAF",
    ],
    cumFunctioneaza: [
      { pas: "1. ANAF aplică sigiliu", descriere: "Orice document emis de ANAF (decizie de impunere, confirmare e-Factura, etc.) primește automat sigiliul electronic." },
      { pas: "2. Primești documentul", descriere: "Documentul în format PDF sau XML vine cu sigiliul incorporat." },
      { pas: "3. Verifici autenticitatea", descriere: "Folosești portalul de verificare ANAF pentru a confirma că documentul nu a fost modificat." },
      { pas: "4. Arhivezi", descriere: "Documentele cu e-Sigiliu sunt documente originale — arhivarea electronică este legală." },
    ],
    timeline: [
      { an: "2021", eveniment: "Introducerea e-Sigiliu pentru documentele e-Factura" },
      { an: "2022", eveniment: "Extins la toate documentele emise prin SPV" },
      { an: "2024", eveniment: "Integrare cu toate sistemele ANAF" },
    ],
    sanctiuni: [],
    linkuriOficiale: [
      { titlu: "Verificare e-Sigiliu — ANAF", url: "https://verificare.anaf.ro" },
    ],
    sfaturi: [
      "Verifică sigiliul documentelor importante primite de la ANAF înainte de arhivare",
      "Un document cu sigiliu valid are aceeași valoare juridică ca originalul pe hârtie",
    ],
  },
};

export const SISTEME_IDS = Object.keys(sisteme);
