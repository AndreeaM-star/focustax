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
    descriere: "RO e-Factura este sistemul național de gestiune a facturilor electronice din România. Facturile în format XML sunt transmise ANAF înainte de a fi transmise beneficiarului. Sistemul a fost introdus prin OG 120/2021 și a devenit obligatoriu B2B din 1 ianuarie 2024.",
    cineEObligat: [
      "Toți contribuabilii înregistrați în scopuri de TVA pentru tranzacții B2B (business-to-business)",
      "Furnizorii de produse/servicii cu risc fiscal ridicat (ulterior extinse)",
      "Din 2025 — toate tranzacțiile B2B, inclusiv cu parteneri neplătitori de TVA",
      "Tranzacțiile B2C (business-to-consumer) nu sunt obligatorii, dar pot fi transmise voluntar",
    ],
    cumFunctioneaza: [
      { pas: "1. Creezi factura", descriere: "Generezi factura în formatul XML UBL 2.1, fie manual, fie prin software-ul de contabilitate." },
      { pas: "2. Transmiți la ANAF", descriere: "Încărci XML-ul în sistemul RO e-Factura prin SPV sau API înainte de trimiterea la beneficiar." },
      { pas: "3. ANAF validează", descriere: "ANAF validează factura în timp real și returnează un index unic și o semnătură electronică." },
      { pas: "4. Trimiți beneficiarului", descriere: "Factura validată (cu semnătura ANAF) se trimite beneficiarului prin orice metodă." },
      { pas: "5. Termenul de transmitere", descriere: "Factura trebuie transmisă în sistemul RO e-Factura în termen de 5 zile calendaristice de la data emiterii." },
    ],
    timeline: [
      { an: "2021", eveniment: "OG 120/2021 — introducea baza legală a e-Factura în România" },
      { an: "2022", eveniment: "Lansarea sistemului pilot și transmiterea voluntară" },
      { an: "2023", eveniment: "Obligatorie pentru tranzacțiile cu instituții publice (B2G) și produse cu risc fiscal" },
      { an: "Ian 2024", eveniment: "Obligatorie B2B pentru toți plătitorii de TVA" },
      { an: "2025", eveniment: "Extinsă la toate tranzacțiile B2B, inclusiv parteneri neplătitori TVA" },
    ],
    sanctiuni: [
      "Amendă de 5.000 lei pentru persoanele juridice care nu transmit factura în termen",
      "Amendă de 2.500 lei pentru persoanele fizice autorizate",
      "Factura netransmisă nu este considerată emisă legal — risc de pierdere a dreptului de deducere TVA",
    ],
    linkuriOficiale: [
      { titlu: "Portal RO e-Factura — ANAF", url: "https://efactura.mfinante.gov.ro" },
      { titlu: "Ghid tehnic XML UBL 2.1", url: "https://static.anaf.ro/static/10/Anaf/Declaratii_R/Ghid_e-factura.pdf" },
    ],
    sfaturi: [
      "Verifică că software-ul tău de contabilitate suportă exportul în format XML UBL 2.1",
      "Arhivează toate facturile validate de ANAF — sunt documente legale",
      "Setează alerte pentru termenul de 5 zile de la emitere",
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
      "Persoane fizice cu obligații fiscale — obligatoriu din 2023",
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
      { an: "2023", eveniment: "Obligatoriu pentru persoane fizice cu obligații fiscale" },
      { an: "2025", eveniment: "Interfață redesignată, integrare cu toate sistemele ANAF" },
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
    descriereScurta: "Declarație TVA precompletată de ANAF pe baza facturilor din e-Factura.",
    obligatoriuDin: "2025",
    culoare: "#7c3aed",
    badge: "TVA",
    descriere: "RO e-TVA este sistemul prin care ANAF precompletează declarația D300 (decontul de TVA) pe baza datelor din sistemul e-Factura. Contribuabilul verifică datele precompletate, face corecțiile necesare și depune declarația. Reduce semnificativ efortul de completare manuală.",
    cineEObligat: [
      "Toți contribuabilii înregistrați în scopuri de TVA (plătitori de TVA)",
      "Obligatoriu din 2025 pentru contribuabilii mari",
      "Extins treptat la toți plătitorii de TVA",
    ],
    cumFunctioneaza: [
      { pas: "1. ANAF precompletează", descriere: "Pe baza facturilor din RO e-Factura, ANAF generează automat D300 precompletat." },
      { pas: "2. Accesezi în SPV", descriere: "Găsești D300 precompletat în contul tău SPV sub 'Declarații precompletate'." },
      { pas: "3. Verifici datele", descriere: "Compari cu evidența contabilă proprie și corectezi eventualele discrepanțe." },
      { pas: "4. Completezi diferențele", descriere: "Adaugi operațiunile care nu sunt în e-Factura (importuri, achiziții fără factură electronică, etc.)." },
      { pas: "5. Depui D300", descriere: "Depui decontul TVA finalizat în SPV până la termenul legal (25 ale lunii următoare)." },
    ],
    timeline: [
      { an: "2024", eveniment: "Anunțarea sistemului RO e-TVA prin acte normative" },
      { an: "Ian 2025", eveniment: "Implementare pentru contribuabilii mari (mari contribuabili)" },
      { an: "2025", eveniment: "Extindere la contribuabilii mijlocii" },
      { an: "2026", eveniment: "Extindere la toți plătitorii de TVA" },
    ],
    sanctiuni: [
      "Amenzi pentru D300 depus incorect sau tardiv (similar cu sistemul actual)",
      "Penalități de 0.02% pe zi de întârziere la plata TVA",
    ],
    linkuriOficiale: [
      { titlu: "RO e-TVA — ANAF", url: "https://www.anaf.ro/anaf/internet/RO/e-tva" },
    ],
    sfaturi: [
      "Asigură-te că toate facturile emise sunt transmise corect în e-Factura înainte de data de precompletare",
      "Verifică că facturile de la furnizori sunt și ele în e-Factura — pot afecta TVA deductibil precompletat",
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
      { pas: "2. Declară transportul", descriere: "Declari în SPV transportul cu: tip transport, expeditor, destinatar, bunuri, vehicul, dată." },
      { pas: "3. Primești codul UIT", descriere: "ANAF generează un cod UIT (Unique Identification Transport) valid 5 zile." },
      { pas: "4. Transportul are loc", descriere: "Transportatorul are la bord documentele și codul UIT. ANAF poate verifica prin aplicație mobilă." },
      { pas: "5. Actualizezi dacă e necesar", descriere: "Dacă apar modificări (cantitate, traseu), actualizezi declarația înainte de transport." },
    ],
    timeline: [
      { an: "2022", eveniment: "Lansarea sistemului pilot pentru produse cu risc ridicat" },
      { an: "2023", eveniment: "Extins la noi categorii de bunuri, amenzi active" },
      { an: "2024", eveniment: "Integrare cu sistemul e-Factura și GPS tracking" },
      { an: "2025", eveniment: "Noi categorii de bunuri adăugate, sistem extins" },
    ],
    sanctiuni: [
      "Amendă de 50.000 lei pentru lipsa declarației e-Transport (persoane juridice)",
      "Amendă de 25.000 lei pentru persoane fizice",
      "Confiscarea bunurilor transportate fără cod UIT valid",
      "Reținerea vehiculului de transport până la regularizare",
    ],
    linkuriOficiale: [
      { titlu: "RO e-Transport — ANAF", url: "https://www.anaf.ro/anaf/internet/RO/e-transport" },
      { titlu: "Lista bunuri cu risc fiscal", url: "https://static.anaf.ro/static/10/Anaf/formulare/Liste_bunuri_risc.pdf" },
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
    descriereScurta: "Schema specială de TVA pentru întreprinderile mici — deducere parțială de TVA.",
    culoare: "#059669",
    badge: "TVA",
    descriere: "SME-SS (Schema specială de TVA pentru întreprinderile mici) este o schemă simplificată introdusă în 2022 pentru IMM-urile cu cifră de afaceri sub 2 milioane EUR. Permite contabilitate simplificată și deducere parțială de TVA în cote fixe pe categorii de bunuri/servicii: 21.4%, 20%, 17%, 13.5%, 5.4%.",
    cineEObligat: [
      "Întreprinderile mici cu cifră de afaceri anuală sub 2 milioane EUR",
      "IMM-uri care optează pentru schema simplificată de TVA",
      "Contribuabili care nu desfășoară activități exceptate (bănci, asigurări, etc.)",
    ],
    cumFunctioneaza: [
      { pas: "1. Verifică eligibilitatea", descriere: "Cifra de afaceri sub 2M EUR în anul precedent, nu desfășoară activități exceptate." },
      { pas: "2. Optează pentru schemă", descriere: "Depune declarație de opțiune (formular 092) la ANAF până la 31 ianuarie." },
      { pas: "3. Aplică cote fixe de deducere", descriere: "Deduce TVA în cote fixe în funcție de categoria bunurilor/serviciilor achiziționate." },
      { pas: "4. Depune declarații simplificate", descriere: "Folosește declarații TVA simplificate și contabilitate simplificată." },
    ],
    timeline: [
      { an: "2022", eveniment: "Introducerea schemei SME-SS în România conform Directivei UE" },
      { an: "2023", eveniment: "Aplicare opțională pentru IMM-uri sub pragul de 2M EUR" },
      { an: "2026", eveniment: "Actualizare praguri și cote — martie 2026" },
    ],
    sanctiuni: [
      "Pierderea dreptului de deducere TVA dacă se depășește pragul de 2M EUR",
      "Corecții TVA pentru nerespectarea regulilor schemei",
    ],
    linkuriOficiale: [
      { titlu: "SME-SS — ANAF", url: "https://www.anaf.ro/en/sme-ss" },
    ],
    sfaturi: [
      "Verifică anual dacă cifra de afaceri rămâne sub pragul de 2M EUR",
      "Consultă lista categoriilor și cotelor fixe pentru deducere TVA",
      "Optează până la 31 ianuarie pentru anul fiscal următor",
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
