export type TimelineStep = {
  pas: number;
  titlu: string;
  detaliu: string;
  durata: string;
};

export type Sectiune = {
  titlu: string;
  continut: string[];
};

export type ChartBar = {
  label: string;
  value: number;
  color: string;
};

export type GhidData = {
  slug: string;
  titlu: string;
  categorie: string;
  culoare: string;
  badgeBg: string;
  desc: string;
  ceFaciAfla: string[];
  sectiuni: Sectiune[];
  timeline?: TimelineStep[];
  chart?: {
    tip: "bar" | "pie";
    titlu: string;
    bare: ChartBar[];
    unitate?: string;
  };
  declaratiiAferente: { cod: string; nume: string; href: string }[];
  atentie: string[];
};

export const ghiduri: Record<string, GhidData> = {
  "inregistrare-pfa": {
    slug: "inregistrare-pfa",
    titlu: "Cum te înregistrezi ca PFA",
    categorie: "PFA & II",
    culoare: "#2563eb",
    badgeBg: "#eff6ff",
    desc: "Ghid complet pentru înregistrarea ca Persoană Fizică Autorizată la ONRC — pași, documente și costuri actualizate 2026.",
    ceFaciAfla: [
      "Ce documente pregătești înainte de înregistrare",
      "Costurile exacte la ONRC și publicare în MO",
      "Pașii la ghișeu și online prin ONRC Portal",
      "Codurile CAEN permise pentru PFA",
      "Diferența dintre PFA, II și IF",
      "Primul an — obligații fiscale după înregistrare",
    ],
    sectiuni: [
      {
        titlu: "Ce este un PFA și când îl alegi",
        continut: [
          "PFA (Persoana Fizică Autorizată) este forma simplă de activitate independentă — ești tu ca persoană fizică ce desfășori activitate economică autorizată.",
          "Alegi PFA dacă ești freelancer, consultant, meșteșugar, fotograf, traducător sau desfășori orice activitate din codul CAEN corespunzător.",
          "PFA nu are personalitate juridică separată — răspunzi cu patrimoniul personal pentru obligații. Dacă vrei protecție patrimonială, ia în calcul SRL.",
          "Alternativa II (Întreprindere Individuală) permite angajarea de salariați și are același regim fiscal. IF (Întreprindere Familială) implică mai mulți membri ai familiei.",
        ],
      },
      {
        titlu: "Documente necesare pentru înregistrare",
        continut: [
          "Cerere de înregistrare și autorizare (formular tip ONRC, disponibil online sau la ghișeu)",
          "Carte de identitate — copie + original pentru verificare",
          "Dovada sediului profesional: contract de comodat, contract de închiriere sau extras CF dacă ești proprietar",
          "Cazier fiscal de la ANAF (se obține gratuit în ziua depunerii la ghișeul ANAF sau în 3 zile online prin SPV)",
          "Declarație pe proprie răspundere că îndeplinești condițiile legale pentru activitate",
          "Documente de calificare dacă activitatea necesită autorizare specială (ex: medic, avocat, arhitect)",
          "Dacă lucrezi online sau la domiciliu: acordul asociației de proprietari/locatari sau al proprietarului",
        ],
      },
      {
        titlu: "Costurile înregistrării",
        continut: [
          "Taxa ONRC înregistrare PFA: 107 lei (2026)",
          "Publicare în Monitorul Oficial — Partea a IV-a: 92 lei (opțional, dar necesar pentru anumite activități reglementate)",
          "Cazier fiscal ANAF: gratuit",
          "Traduceri/legalizări (dacă e cazul pentru cetățeni străini): variabil",
          "Total minim: ~107 lei. Total cu publicare MO: ~200 lei.",
          "ONRC Portal permite plata online cu cardul, eliminând deplasarea la ghișeu.",
        ],
      },
      {
        titlu: "Obligații fiscale după înregistrare",
        continut: [
          "Înregistrare la ANAF în 30 de zile de la data autorizării — completezi Formularul 070.",
          "Deschidere cont bancar profesional — nu este obligatoriu dar recomandat.",
          "Declarația Unică D212 se depune anual până pe 25 mai — declari venitul realizat și estimezi venitul pentru anul următor.",
          "CAS (25%) și CASS (10%) se datorează dacă venitul net depășește 6 salarii minime brute/an (24.300 lei în 2026).",
          "Impozit pe venit: 10% aplicat la venitul net (în sistem real) sau la norma de venit (dacă optezi).",
          "Nu ești obligat la TVA dacă nu depășești 300.000 lei cifră de afaceri anuală.",
        ],
      },
    ],
    timeline: [
      { pas: 1, titlu: "Obții cazierul fiscal", detaliu: "La ghișeul ANAF sau online prin SPV. Gratuit.", durata: "1 zi" },
      { pas: 2, titlu: "Pregătești documentele", detaliu: "Copie CI, dovada sediu, declarație pe proprie răspundere.", durata: "1-2 ore" },
      { pas: 3, titlu: "Depui cererea la ONRC", detaliu: "La ghișeu sau pe portal.onrc.ro. Plătești taxa de 107 lei.", durata: "1 zi" },
      { pas: 4, titlu: "Aștepți soluționarea", detaliu: "ONRC soluționează în maxim 3 zile lucrătoare.", durata: "1-3 zile" },
      { pas: 5, titlu: "Ridici certificatul", detaliu: "Primești Certificatul de Înregistrare cu CUI unic.", durata: "1 oră" },
      { pas: 6, titlu: "Te înregistrezi la ANAF", detaliu: "Formularul 070 la ANAF în 30 de zile.", durata: "1 zi" },
    ],
    chart: {
      tip: "bar",
      titlu: "Costuri înregistrare PFA (lei)",
      bare: [
        { label: "Taxă ONRC", value: 107, color: "#2563eb" },
        { label: "Publicare MO", value: 92, color: "#93c5fd" },
        { label: "Cazier fiscal", value: 0, color: "#dbeafe" },
      ],
      unitate: "lei",
    },
    declaratiiAferente: [
      { cod: "D212", nume: "Declarație Unică — impozit venit + contribuții", href: "/declaratii/d212" },
      { cod: "D220", nume: "Declarație privind venitul estimat", href: "/declaratii/d220" },
    ],
    atentie: [
      "PFA-ul nu te protejează patrimonial — răspunzi cu bunurile personale pentru datorii.",
      "Codul CAEN ales determină activitățile permise. Poți adăuga coduri suplimentare ulterior.",
      "Dacă desfășori activitate reglementată (medical, juridic, contabilitate), ai nevoie de autorizație specială suplimentară.",
    ],
  },

  "sistem-real-norma": {
    slug: "sistem-real-norma",
    titlu: "Sistem real vs normă de venit",
    categorie: "PFA & II",
    culoare: "#2563eb",
    badgeBg: "#eff6ff",
    desc: "Ghid complet pentru a înțelege diferența dintre sistemul real de impozitare și norma de venit — cu exemple numerice concrete.",
    ceFaciAfla: [
      "Cum funcționează fiecare sistem de impozitare",
      "Când este avantajoasă norma de venit",
      "Când sistemul real te avantajează",
      "Exemplu numeric complet cu calcul pas cu pas",
      "Cum optezi pentru un sistem sau altul",
      "Care sunt codurile CAEN eligibile pentru normă",
    ],
    sectiuni: [
      {
        titlu: "Sistemul real de impozitare",
        continut: [
          "În sistemul real, impozitul se calculează pe venitul net efectiv: Venituri încasate — Cheltuieli deductibile = Venit net.",
          "Sunt deductibile: chiria biroului, abonamentele software, echipamentele achiziționate, transportul în interes profesional, contribuțiile CAS și CASS.",
          "Avantajul principal: dacă ai cheltuieli mari sau venituri variabile, plătești impozit doar pe profitul real.",
          "Dezavantajul: trebuie să ții evidența contabilă simplă (Registrul de încasări și plăți) și să păstrezi toate documentele justificative.",
          "Rata de impozitare: 10% aplicat la venitul net calculat.",
        ],
      },
      {
        titlu: "Norma de venit",
        continut: [
          "Norma de venit este un venit prestabilit de ANAF pentru fiecare județ și cod CAEN. Tu plătești impozit pe această normă, indiferent de ce câștigi efectiv.",
          "Normele sunt publicate anual de Direcțiile Fiscale Județene și variază pe județe și activități.",
          "Exemplu: norma pentru consultant IT în București poate fi 65.000 lei/an — plătești impozit pe această sumă, chiar dacă ai câștigat 200.000 lei.",
          "Avantajul: simplitate — nu ții contabilitate, nu aduni bonuri, nu calculezi cheltuieli.",
          "Dezavantajul: dacă câștigi sub normă, tot plătești impozit pe normă. Și normele cresc annual.",
          "Nu toate activitățile permit norma — lista codurilor CAEN eligibile e stabilită prin HG.",
        ],
      },
      {
        titlu: "Exemplu numeric comparat",
        continut: [
          "Scenariu: PFA cu venituri de 120.000 lei/an, cheltuieli deductibile de 15.000 lei, normă de venit 55.000 lei.",
          "SISTEM REAL: Venit net = 120.000 - 15.000 = 105.000 lei. Impozit 10% = 10.500 lei. CAS 25% din min(105.000, plafon) = ~8.875 lei. CASS 10% = ~3.550 lei. Total: ~22.925 lei.",
          "NORMĂ DE VENIT: Venit impozabil = 55.000 lei. Impozit 10% = 5.500 lei. CAS și CASS se calculează tot din norma aleasă ca bază. Total taxe: ~14.000 lei.",
          "Concluzie pentru acest exemplu: norma este mai avantajoasă cu ~9.000 lei/an.",
          "ATENȚIE: dacă cheltuielile reale sunt mari sau venitul e mic, sistemul real poate fi mai avantajos.",
        ],
      },
      {
        titlu: "Cum optezi pentru un sistem",
        continut: [
          "Opțiunea se face în Declarația Unică D212 — la secțiunea corespunzătoare pentru venitul estimat.",
          "Poți schimba sistemul anual, dar decizia se aplică pentru întregul an fiscal.",
          "Termenul de depunere D212 cu opțiunea de sistem: 25 mai a anului curent.",
          "Dacă nu depui D212 la timp, ANAF te poate impozita la normă din oficiu (dacă activitatea permite).",
        ],
      },
    ],
    chart: {
      tip: "bar",
      titlu: "Comparatie taxe totale (120k venituri, lei)",
      bare: [
        { label: "Sistem Real", value: 22925, color: "#2563eb" },
        { label: "Normă venit", value: 14000, color: "#93c5fd" },
      ],
      unitate: "lei",
    },
    declaratiiAferente: [
      { cod: "D212", nume: "Declarație Unică — impozit venit + contribuții", href: "/declaratii/d212" },
      { cod: "D220", nume: "Declarație privind venitul estimat", href: "/declaratii/d220" },
    ],
    atentie: [
      "Norma de venit nu este disponibilă pentru toate activitățile. Verifică lista CAEN eligibilă la ANAF.",
      "Normele variază pe județ — norma din București este de obicei mai mare decât în județele mici.",
      "Din 2024, anumite activități au fost scoase de pe lista eligibilă pentru normă (ex: IT consulting în unele județe).",
    ],
  },

  "contributii-sociale": {
    slug: "contributii-sociale",
    titlu: "CAS și CASS pentru PFA",
    categorie: "PFA & II",
    culoare: "#2563eb",
    badgeBg: "#eff6ff",
    desc: "Ghid complet privind calculul contribuțiilor sociale (CAS și CASS) pentru persoanele fizice cu activitate independentă — plafoane, baze de calcul și termene 2026.",
    ceFaciAfla: [
      "Cum se calculează CAS (25%) pentru PFA",
      "Cum se calculează CASS (10%) pentru PFA",
      "Plafoanele de la care se datorează contribuțiile",
      "Exemple numerice la diferite niveluri de venit",
      "Termenele de plată și penalizările",
      "Situații de scutire sau reducere",
    ],
    sectiuni: [
      {
        titlu: "CAS — Contribuția de Asigurări Sociale (Pensii)",
        continut: [
          "CAS se datorează dacă venitul net din activități independente depășește 12 salarii minime brute (plafonul minim în 2026: 48.600 lei).",
          "Cota CAS: 25% aplicată la baza de calcul aleasă.",
          "Baza de calcul poate fi: venitul net realizat (sistem real) sau norma de venit (normă). Nu poate fi mai mică de 12 salarii minime și nu poate depăși 24 salarii minime (plafonul maxim: 97.200 lei).",
          "Exemplu: venit net 80.000 lei → CAS = 80.000 × 25% = 20.000 lei.",
          "Poți opta să plătești CAS chiar dacă ești sub plafonul minim (dacă vrei să te asiguri pentru pensie).",
          "CAS se declară și se plătește prin Declarația Unică D212, cu termen 25 mai.",
        ],
      },
      {
        titlu: "CASS — Contribuția de Asigurări Sociale de Sănătate",
        continut: [
          "CASS se datorează dacă venitul net depășește 6 salarii minime brute (plafonul minim în 2026: 24.300 lei).",
          "Cota CASS: 10% aplicată la baza de calcul.",
          "Plafoane CASS: 6 salarii (24.300 lei), 12 salarii (48.600 lei) sau 24 salarii (97.200 lei) — se plătește pentru plafonul atins.",
          "Exemplu: venit net 60.000 lei → se atinge plafonul de 12 salarii → CASS = 48.600 × 10% = 4.860 lei.",
          "Dacă ai venituri din mai multe surse (salariat + PFA), contribuțiile se cumulează — risc de supraplată, cere restituire!",
        ],
      },
      {
        titlu: "Termene de plată",
        continut: [
          "Declararea se face anual prin D212, termen 25 mai.",
          "Plata se poate face integral la termenul declarației sau în rate trimestriale (25 martie, 25 iunie, 25 septembrie, 25 decembrie).",
          "Dobânda de întârziere: 0,02%/zi. Pe un an de întârziere ajunge la 7,3%.",
          "Penalitate de nedepunere D212: 50-500 lei pentru persoane fizice.",
        ],
      },
    ],
    chart: {
      tip: "bar",
      titlu: "Taxe totale PFA la diferite venituri nete (lei)",
      bare: [
        { label: "40.000 lei", value: 4000, color: "#dbeafe" },
        { label: "60.000 lei", value: 12860, color: "#93c5fd" },
        { label: "80.000 lei", value: 20000, color: "#3b82f6" },
        { label: "100.000 lei", value: 27200, color: "#2563eb" },
      ],
      unitate: "lei impozit+CAS+CASS",
    },
    declaratiiAferente: [
      { cod: "D212", nume: "Declarație Unică — impozit venit + contribuții", href: "/declaratii/d212" },
      { cod: "D204", nume: "Declarație privind CAS pentru activități independente", href: "/declaratii/d204" },
    ],
    atentie: [
      "CASS se plătește la plafoane fixe, nu proporțional — verifică exact în care plafon te încadrezi.",
      "Dacă ești și salariat, angajatorul reține CASS din salariu — poți fi scutit de CASS pe venituri independente sau poți opta.",
      "Pensionarii activi pot fi scutiți de CAS în anumite condiții.",
    ],
  },

  "d212-pfa": {
    slug: "d212-pfa",
    titlu: "Declarația Unică D212 pentru PFA",
    categorie: "PFA & II",
    culoare: "#2563eb",
    badgeBg: "#eff6ff",
    desc: "Ghid pas cu pas pentru completarea și depunerea Declarației Unice D212 — cu exemple concrete pentru PFA în sistem real și normă de venit.",
    ceFaciAfla: [
      "Cine este obligat să depună D212",
      "Termenul de depunere — 25 mai",
      "Cum completezi Capitolul I (venituri realizate)",
      "Cum completezi Capitolul II (venituri estimate)",
      "Cum depui online prin SPV",
      "Ce se întâmplă dacă nu depui la timp",
    ],
    sectiuni: [
      {
        titlu: "Cine depune D212",
        continut: [
          "Persoanele fizice cu venituri din activități independente (PFA, II, IF, drepturi de autor).",
          "Persoanele cu venituri din cedarea folosinței bunurilor (chirii, arendă).",
          "Persoanele cu venituri din investiții (dividende, dobânzi, câștiguri bursiere).",
          "Persoanele cu alte venituri (premii, asociere în participațiune etc.).",
          "Nu depun D212: salariații care au EXCLUSIV venituri din salarii (angajatorul face regularizarea).",
        ],
      },
      {
        titlu: "Capitolul I — Venituri realizate",
        continut: [
          "Completezi venitul brut și cheltuielile deductibile din activitatea anului anterior.",
          "Sistem real: completezi veniturile efective și cheltuielile din Registrul de Încasări și Plăți.",
          "Normă de venit: completezi norma stabilită de ANAF pentru județul și codul CAEN al tău.",
          "Calculezi venitul net, impozitul de 10% și contribuțiile CAS/CASS datorate.",
          "ATENȚIE: dacă ai plătit impozit/contribuții anticipate prin D220, le scazi din suma de plată.",
        ],
      },
      {
        titlu: "Capitolul II — Venituri estimate",
        continut: [
          "Estimezi venitul net pentru anul în curs (nu cel trecut).",
          "Pe baza acestei estimări, ANAF calculează obligațiile anticipate pentru CAS și CASS.",
          "Baza minimă CAS: 12 salarii minime brute (48.600 lei). Baza minimă CASS: 6 salarii minime (24.300 lei).",
          "Dacă activitatea e nouă (primul an), trebuie să depui estimarea în 30 de zile de la debut.",
        ],
      },
      {
        titlu: "Depunere online prin SPV",
        continut: [
          "Accesezi SPV pe e.anaf.ro → Depunere declarații → Formularul 212.",
          "Completezi direct în formularul online sau încarci PDF-ul completat anterior.",
          "Primești număr de înregistrare și confirmare pe e-mail.",
          "Dacă există erori, poți depune o declarație rectificativă oricând după termenul inițial.",
        ],
      },
    ],
    timeline: [
      { pas: 1, titlu: "Aduni documentele", detaliu: "Registrul de Încasări și Plăți, facturi, chitanțe.", durata: "1-2 zile" },
      { pas: 2, titlu: "Calculezi venitul net", detaliu: "Venituri brute minus cheltuieli deductibile.", durata: "1-2 ore" },
      { pas: 3, titlu: "Calculezi impozit + CAS/CASS", detaliu: "10% impozit, 25% CAS, 10% CASS conform plafoane.", durata: "30 min" },
      { pas: 4, titlu: "Completezi D212 online", detaliu: "Pe e.anaf.ro prin SPV sau PDF oficial.", durata: "1 oră" },
      { pas: 5, titlu: "Depui până pe 25 mai", detaliu: "Termen fix. Poți depune și mai devreme.", durata: "5 min" },
      { pas: 6, titlu: "Plătești impozitul", detaliu: "Online prin Ghișeul.ro sau la bancă/trezorerie.", durata: "10 min" },
    ],
    chart: {
      tip: "bar",
      titlu: "Structura obligatii fiscale PFA (venit net 80.000 lei)",
      bare: [
        { label: "Impozit 10%", value: 8000, color: "#dc2626" },
        { label: "CAS 25%", value: 20000, color: "#2563eb" },
        { label: "CASS 10%", value: 4860, color: "#059669" },
      ],
      unitate: "lei",
    },
    declaratiiAferente: [
      { cod: "D212", nume: "Declarație Unică — impozit venit + contribuții", href: "/declaratii/d212" },
      { cod: "D220", nume: "Declarație privind venitul estimat", href: "/declaratii/d220" },
      { cod: "D230", nume: "Cerere privind destinația a 3.5% din impozit", href: "/declaratii/d230" },
    ],
    atentie: [
      "Termenul 25 mai este fix. Depunerea cu întârziere atrage amendă 50-500 lei.",
      "Dacă rectifici D212, poți ajusta și sumele de plată/restituit.",
      "Poți direcționa 3,5% din impozitul pe venit prin formularul D230 (se bifează în D212).",
    ],
  },

  "srl-vs-micro": {
    slug: "srl-vs-micro",
    titlu: "SRL vs Microîntreprindere",
    categorie: "SRL & Microîntreprinderi",
    culoare: "#059669",
    badgeBg: "#ecfdf5",
    desc: "Ghid complet pentru înțelegerea diferențelor de impozitare între SRL cu impozit pe profit (16%) și microîntreprindere (1% sau 3%), cu exemple și criterii de alegere.",
    ceFaciAfla: [
      "Condițiile pentru a fi microîntreprindere",
      "Cotele 1% și 3% — când se aplică fiecare",
      "Impozitul pe profit 16% — când devine obligatoriu",
      "Comparație taxe reale la aceeași cifră de afaceri",
      "Cum se face trecerea de la micro la profit",
      "Avantajele și dezavantajele fiecărui sistem",
    ],
    sectiuni: [
      {
        titlu: "Condiții pentru microîntreprindere",
        continut: [
          "Cifra de afaceri sub 500.000 euro la 31 decembrie a anului precedent.",
          "Cel puțin un salariat angajat cu normă întreagă (pentru cota 1%).",
          "Activitățile din domeniu nu interzic regimul micro (ex: bancar, asigurări, jocuri de noroc — excluse).",
          "Nu are capital social deținut de stat sau unități administrativ-teritoriale peste 25%.",
          "Veniturile din consultanță și management nu depășesc 20% din CA totală (altfel cota devine 3%).",
        ],
      },
      {
        titlu: "Cota 1% vs 3%",
        continut: [
          "COTA 1%: se aplică microîntreprinderilor cu cel puțin un salariat și venituri din consultanță/management sub 20% din CA.",
          "COTA 3%: se aplică dacă nu ai salariat sau dacă veniturile din consultanță/management depășesc 20% din CA.",
          "Exemplu cota 1%: CA = 200.000 lei → impozit micro = 2.000 lei.",
          "Exemplu cota 3%: CA = 200.000 lei → impozit micro = 6.000 lei.",
          "Comparativ cu impozit profit 16%: profit 50.000 lei → impozit = 8.000 lei. La o cifra de afaceri de 200k cu marja de 25%, micro 1% e de 4x mai mic.",
        ],
      },
      {
        titlu: "Impozit pe profit 16% — când devine obligatoriu",
        continut: [
          "Obligatoriu când depășești 500.000 euro cifră de afaceri (devii plătitor de impozit pe profit din trimestrul următor).",
          "Obligatoriu dacă nu mai îndeplinești condițiile de micro (ex: ai pierdut singurul salariat).",
          "Poți opta voluntar pentru impozit pe profit dacă activitatea e profitabilă și cheltuielile mari reduc profitul semnificativ.",
          "Trecerea se face prin depunerea Formularului D012 la ANAF.",
        ],
      },
      {
        titlu: "Dividende după impozitare",
        continut: [
          "Indiferent de sistemul ales (micro sau profit), dividendele distribuite se impozitează cu 8%.",
          "La micro: plătești 1-3% impozit pe CA, apoi 8% pe dividende distribuite.",
          "La profit: plătești 16% pe profit, rămâne profitul net, apoi 8% pe dividende.",
          "Suma totală extrasă personal depinde de marja de profit și de cât distribui ca dividende.",
        ],
      },
    ],
    chart: {
      tip: "bar",
      titlu: "Impozit total la CA 300.000 lei, profit 20%",
      bare: [
        { label: "Micro 1%", value: 3000, color: "#059669" },
        { label: "Micro 3%", value: 9000, color: "#6ee7b7" },
        { label: "Profit 16%", value: 9600, color: "#d97706" },
      ],
      unitate: "lei",
    },
    declaratiiAferente: [
      { cod: "D100", nume: "Declarație privind obligațiile de plată", href: "/declaratii/d100" },
      { cod: "D101", nume: "Declarație privind impozitul pe profit", href: "/declaratii/d101" },
      { cod: "D012", nume: "Notificare sistem plăți anticipate", href: "/declaratii/d012" },
    ],
    atentie: [
      "Depășirea plafonului de 500.000 euro în cursul anului obligă la trecerea la impozit pe profit din trimestrul următor.",
      "Pierderea salariatului unic te muta la cota 3% din luna imediat următoare.",
      "Microîntreprinderea nu poate reporta pierderi fiscale — la profit poți reporta pierderile 7 ani.",
    ],
  },

  "dividende": {
    slug: "dividende",
    titlu: "Dividende: cum se impozitează",
    categorie: "SRL & Microîntreprinderi",
    culoare: "#059669",
    badgeBg: "#ecfdf5",
    desc: "Ghid complet pentru impozitarea dividendelor distribuite de SRL — cota 8%, procedura de declarare la ANAF și calcul CASS.",
    ceFaciAfla: [
      "Cota de impozit pe dividende: 8%",
      "Cine reține și declară impozitul",
      "CASS datorată pe dividende",
      "Procedura de distribuire legală",
      "Exemple numerice complete",
      "Dividende pentru asociat unic vs mai mulți asociați",
    ],
    sectiuni: [
      {
        titlu: "Impozitul pe dividende — 8%",
        continut: [
          "Dividendele distribuite de SRL persoanelor fizice asociate se impozitează cu 8% (cotă aplicabilă din 2017).",
          "Impozitul se reține la sursă de SRL — firma reține 8% înainte să vireze dividendele asociaților.",
          "SRL-ul declară și plătește impozitul reținut prin D100, cu termenul 25 ale lunii următoare distribuției.",
          "Exemplu: distribuiți 100.000 lei dividende → SRL reține 8.000 lei → asociatul primește 92.000 lei.",
        ],
      },
      {
        titlu: "CASS pe dividende",
        continut: [
          "Dacă dividendele depășesc 6 salarii minime (24.300 lei în 2026), se datorează și CASS 10%.",
          "Plafoane CASS pentru dividende: 6 SM (24.300 lei), 12 SM (48.600 lei), 24 SM (97.200 lei).",
          "CASS se declară și se plătește de persoana fizică prin D212, nu de SRL.",
          "Exemplu: 100.000 lei dividende → CASS 10% × 97.200 lei = 9.720 lei (plafonul maxim este 24 SM).",
          "Total taxe pe 100.000 lei dividende: impozit 8.000 + CASS 9.720 = 17.720 lei.",
        ],
      },
      {
        titlu: "Procedura de distribuire",
        continut: [
          "Dividendele se pot distribui numai din profit net contabil, confirmat prin situații financiare.",
          "Decizia de distribuire se ia prin hotărârea adunării generale a asociaților (sau decizia asociatului unic).",
          "Nu poți distribui dividende dacă SRL-ul are pierderi neacoperite din anii anteriori.",
          "Termenul legal de plată a dividendelor: 60 de zile de la data aprobării situațiilor financiare.",
          "Distribuiri intermediare de dividende (în cursul anului) sunt permise din 2019, pe baza situațiilor financiare interimare.",
        ],
      },
    ],
    chart: {
      tip: "bar",
      titlu: "Taxe pe 100.000 lei dividende distribuite",
      bare: [
        { label: "Impozit 8%", value: 8000, color: "#059669" },
        { label: "CASS 10%", value: 9720, color: "#6ee7b7" },
        { label: "Net primit", value: 82280, color: "#d1fae5" },
      ],
      unitate: "lei",
    },
    declaratiiAferente: [
      { cod: "D100", nume: "Declarație privind obligațiile de plată", href: "/declaratii/d100" },
      { cod: "D212", nume: "Declarație Unică (CASS pe dividende)", href: "/declaratii/d212" },
    ],
    atentie: [
      "SRL-ul trebuie să aibă profit net contabil înainte de a distribui dividende.",
      "CASS pe dividende se declară de asociat în D212, nu de firmă.",
      "Distribuirile intermediare necesită situații financiare interimare aprobate.",
    ],
  },

  "inregistrare-tva": {
    slug: "inregistrare-tva",
    titlu: "Ghid complet TVA",
    categorie: "TVA",
    culoare: "#d97706",
    badgeBg: "#fffbeb",
    desc: "Tot ce trebuie să știi despre TVA în România: când te înregistrezi, cotele aplicabile, decontul D300 și sistemul TVA la încasare.",
    ceFaciAfla: [
      "Plafonul de înregistrare TVA: 300.000 lei",
      "Cotele TVA: 19%, 9%, 5%",
      "Procedura de înregistrare voluntară vs obligatorie",
      "Avantajele și dezavantajele înregistrării",
      "TVA la încasare — ce este și cum funcționează",
      "Cum completezi și depui decontul D300",
    ],
    sectiuni: [
      {
        titlu: "Plafonul de înregistrare — 300.000 lei",
        continut: [
          "Înregistrarea în scopuri de TVA devine OBLIGATORIE când cifra de afaceri depășește 300.000 lei în cursul unui an calendaristic.",
          "Termenul: în termen de 10 zile de la sfârșitul lunii în care s-a depășit plafonul.",
          "Formularul de înregistrare: Declarația D010 (persoane juridice) sau D070 (PFA/II).",
          "Înregistrare VOLUNTARĂ: poți solicita înregistrarea oricând, chiar sub plafon, dacă e avantajos (ex: dacă ai clienți plătitori de TVA).",
        ],
      },
      {
        titlu: "Cotele TVA aplicabile în 2026",
        continut: [
          "COTA STANDARD 19%: se aplică la toate livrările și prestările care nu beneficiază de cote reduse.",
          "COTA REDUSĂ 9%: alimente și băuturi nealcoolice, medicamente, echipamente medicale, hoteluri și cazare, transport de persoane, acces la muzee/evenimente culturale.",
          "COTA REDUSĂ 5%: manuale și cărți școlare, locuințe sociale (sub 140.000 euro), energie termică și electrică pentru gospodării, bilete la spectacole/concerte.",
          "SCUTITE CU DREPT DE DEDUCERE (0%): exporturi, livrări intracomunitare.",
          "SCUTITE FĂRĂ DREPT DE DEDUCERE: servicii medicale, educație, activitate bancară, asigurări.",
        ],
      },
      {
        titlu: "TVA la încasare",
        continut: [
          "Sistemul TVA la încasare permite amânarea plății TVA colectate până la ÎNCASAREA efectivă a facturii (nu la emitere).",
          "Eligibil pentru firme cu CA sub 4.500.000 lei.",
          "Avantaj major: nu plătești TVA colectată înainte să primești banii de la client.",
          "Dezavantaj: nici TVA deductibilă (de la furnizori) nu poate fi dedusă până la plata efectivă a facturii.",
          "Opțiunea se bifează în declarația de înregistrare sau la depunerea D300.",
        ],
      },
      {
        titlu: "Decontul D300 — cum se completează",
        continut: [
          "D300 se depune lunar (dacă CA > 100k euro echivalent) sau trimestrial (sub acest prag).",
          "Completezi: TVA colectată (pe livrări/prestații) și TVA deductibilă (pe achiziții).",
          "TVA de plată = TVA colectată - TVA deductibilă. Dacă e negativ, ai TVA de rambursat.",
          "Depunere online obligatorie prin SPV pentru persoane juridice. Termen: 25 ale lunii/trimestrului următor.",
          "Documentele justificative (facturi) se arhivează minim 5 ani.",
        ],
      },
    ],
    chart: {
      tip: "bar",
      titlu: "Impact TVA la CA 500.000 lei (cota 19%)",
      bare: [
        { label: "TVA colectată", value: 95000, color: "#d97706" },
        { label: "TVA deductibilă est.", value: 38000, color: "#fbbf24" },
        { label: "TVA de plată", value: 57000, color: "#fde68a" },
      ],
      unitate: "lei",
    },
    declaratiiAferente: [
      { cod: "D300", nume: "Decontul de TVA", href: "/declaratii/d300" },
      { cod: "D390", nume: "Declarație recapitulativă VIES", href: "/declaratii/d390" },
      { cod: "D394", nume: "Declarație informativă livrări/prestări", href: "/declaratii/d394" },
    ],
    atentie: [
      "Depășirea plafonului de 300.000 lei obligă la înregistrare în 10 zile — nerespectarea atrage amendă și obligarea la plata TVA retroactiv.",
      "TVA colectată eronat (la cota greșită) se corectează prin facturi de stornare.",
      "Rambursarea TVA poate dura 30-45 zile și necesită inspecție fiscală dacă suma e mare.",
    ],
  },

  "impozit-chirii": {
    slug: "impozit-chirii",
    titlu: "Impozit pe chirii — ghid complet",
    categorie: "Persoane Fizice",
    culoare: "#7c3aed",
    badgeBg: "#f5f3ff",
    desc: "Ghid complet pentru impozitarea veniturilor din chirii în România — cotă 10%, norma de 40%, CASS și obligații de declarare prin D212.",
    ceFaciAfla: [
      "Cum se calculează venitul net din chirii",
      "Deducerea forfetară de 40% din venitul brut",
      "Cota de impozit: 10% pe venitul net",
      "CASS datorată pe venituri din chirii",
      "Obligația de înregistrare a contractului de închiriere",
      "Exemplu numeric complet pas cu pas",
    ],
    sectiuni: [
      {
        titlu: "Baza de calcul — venitul net din chirii",
        continut: [
          "Venitul brut = totalul chiriei încasate în cursul anului (inclusiv utilități dacă sunt în contract).",
          "Cheltuiala forfetară deductibilă: 40% din venitul brut (nu trebuie să dovedești cheltuieli reale).",
          "Venit net = Venit brut × 60% (adică 100% - 40% deducere forfetară).",
          "Exemplu: chirie lunară 2.000 lei → venit brut anual 24.000 lei → venit net = 24.000 × 60% = 14.400 lei.",
        ],
      },
      {
        titlu: "Impozitul pe venit — 10%",
        continut: [
          "Impozit = Venit net × 10%.",
          "Exemplu: venit net 14.400 lei → impozit = 1.440 lei/an.",
          "Se declară și se plătește prin D212, termen 25 mai.",
          "Poți plăti anticipat impozit prin D220 (dacă estimezi venitul de la început).",
        ],
      },
      {
        titlu: "CASS pe venituri din chirii",
        continut: [
          "CASS (10%) se datorează dacă venitul net din chirii depășește 6 salarii minime brute (24.300 lei în 2026).",
          "Baza de calcul CASS: plafonul atins (6 SM, 12 SM sau 24 SM).",
          "Dacă venitul net e sub 24.300 lei/an, nu datorezi CASS.",
          "Exemplu: venit net chirii 35.000 lei → se atinge plafonul 12 SM → CASS = 48.600 × 10% = 4.860 lei.",
          "IMPORTANT: dacă ai și alte venituri (salariu, PFA), CASS se cumulează — verifică să nu plătești de două ori.",
        ],
      },
      {
        titlu: "Obligații administrative",
        continut: [
          "Contractul de închiriere trebuie înregistrat la ANAF (Formularul 168 sau online prin SPV).",
          "Înregistrarea trebuie făcută în 30 de zile de la semnarea contractului.",
          "Neînregistrarea atrage amendă 1.000-5.000 lei.",
          "Dacă ești persoană fizică ce închiriezi mai mult de 5 proprietăți, ești considerat activitate economică (PFA obligatoriu).",
        ],
      },
    ],
    chart: {
      tip: "bar",
      titlu: "Calcul impozit chirii (chirie 2.000 lei/luna)",
      bare: [
        { label: "Venit brut", value: 24000, color: "#7c3aed" },
        { label: "Deducere 40%", value: 9600, color: "#c4b5fd" },
        { label: "Venit net", value: 14400, color: "#a78bfa" },
        { label: "Impozit 10%", value: 1440, color: "#ede9fe" },
      ],
      unitate: "lei/an",
    },
    declaratiiAferente: [
      { cod: "D212", nume: "Declarație Unică — impozit venit + CASS chirii", href: "/declaratii/d212" },
      { cod: "D220", nume: "Declarație privind venitul estimat", href: "/declaratii/d220" },
    ],
    atentie: [
      "Contractul de închiriere TREBUIE înregistrat la ANAF în 30 de zile de la semnare.",
      "Deducerea de 40% este forfetară — nu poți adăuga cheltuieli reale suplimentare.",
      "Dacă locuința e mobila, valoarea mobilierului nu se include în venitul din chirii dacă e separat contractualizat.",
    ],
  },

  "spv-ghid": {
    slug: "spv-ghid",
    titlu: "SPV — Spațiul Privat Virtual",
    categorie: "Persoane Fizice",
    culoare: "#7c3aed",
    badgeBg: "#f5f3ff",
    desc: "Ghid complet pentru crearea contului SPV pe e.anaf.ro, utilizarea platformei și depunerea declarațiilor fiscale online.",
    ceFaciAfla: [
      "Ce este SPV și la ce folosește",
      "Cum creezi contul — certificat digital vs identitate digitală",
      "Depunerea declarațiilor D212, D300 și altele",
      "Vizualizarea situației fiscale personale",
      "Obligativitatea SPV pentru persoane juridice",
      "Probleme frecvente și soluții",
    ],
    sectiuni: [
      {
        titlu: "Ce este SPV",
        continut: [
          "SPV (Spațiul Privat Virtual) este portalul online al ANAF de pe e.anaf.ro unde poți depune declarații, vizualiza obligații și comunica cu autoritatea fiscală.",
          "Disponibil 24/7, elimină deplasarea la ghișeele ANAF.",
          "Persoanele juridice au OBLIGAȚIA de a folosi SPV (depunerea la ghișeu nu mai este acceptată pentru firme).",
          "Persoanele fizice pot folosi SPV sau ghișeul ANAF, dar SPV este recomandat.",
        ],
      },
      {
        titlu: "Creare cont — metode de autentificare",
        continut: [
          "METODA 1: Certificat digital calificat (token USB) — emis de furnizori autorizați (DIGISIGN, certSIGN, TRANS SPED). Cost: ~200-400 lei/an.",
          "METODA 2: Identitate digitală RO eID — cardul de identitate electronic cu cip (gratuit, emis de DEPABD).",
          "METODA 3: Nume de utilizator + parolă + confirmare prin e-mail la ghișeul ANAF — cea mai simplă pentru persoane fizice.",
          "METODA 4: Prin semnătură electronică a unei persoane împuternicite (avocat fiscal, contabil).",
          "Recomandare pentru persoane fizice: metoda 3 (ghișeu) sau metoda 2 (RO eID).",
        ],
      },
      {
        titlu: "Ce poți face în SPV",
        continut: [
          "Depune declarații: D212, D300, D390, D394, D101, D112 și toate celelalte formulare.",
          "Vizualizează situația fiscală: obligații de plată, restanțe, penalități.",
          "Primești și răspunzi la notificări ANAF (citații, atenționări, decizii).",
          "Consultă istoricul declarațiilor depuse și confirmările de primire.",
          "Obții cazierul fiscal online (gratuit, în timp real).",
          "Înregistrezi contracte de închiriere (Formularul 168).",
        ],
      },
      {
        titlu: "Probleme frecvente",
        continut: [
          "Eroare la autentificare: verifică că certificatul digital nu a expirat și că driver-ul token-ului e instalat.",
          "Declarație respinsă: verifică mesajul de eroare din SPV — cel mai frecvent e un câmp completat greșit sau o perioadă deja declarată.",
          "Nu primești e-mail de confirmare: verifică spam-ul și că adresa de e-mail din cont e corectă.",
          "Cont blocat după mai multe tentative eșuate: contactează ANAF la 031.403.91.60.",
        ],
      },
    ],
    timeline: [
      { pas: 1, titlu: "Alegi metoda de autentificare", detaliu: "Certificat digital, RO eID sau cont simplu.", durata: "15 min" },
      { pas: 2, titlu: "Mergi la ghișeul ANAF (dacă e metoda 3)", detaliu: "Cu CI, completezi formularul de înregistrare.", durata: "1 zi" },
      { pas: 3, titlu: "Activezi contul pe e.anaf.ro", detaliu: "Urmezi linkul din e-mailul de confirmare.", durata: "5 min" },
      { pas: 4, titlu: "Setezi profilul", detaliu: "Date de contact, adresă e-mail pentru notificări.", durata: "10 min" },
      { pas: 5, titlu: "Accesezi declarațiile", detaliu: "Meniu Declarații → selectezi formularul.", durata: "5 min" },
    ],
    chart: {
      tip: "bar",
      titlu: "Declaratii disponibile in SPV (numar)",
      bare: [
        { label: "Venit/PFA", value: 5, color: "#7c3aed" },
        { label: "TVA", value: 4, color: "#a78bfa" },
        { label: "Profit/Micro", value: 3, color: "#c4b5fd" },
        { label: "Contributii", value: 4, color: "#ede9fe" },
      ],
      unitate: "formulare",
    },
    declaratiiAferente: [
      { cod: "D212", nume: "Declarație Unică — depusă prin SPV", href: "/declaratii/d212" },
      { cod: "D300", nume: "Decontul de TVA — depus prin SPV", href: "/declaratii/d300" },
      { cod: "D112", nume: "Contribuții sociale — depus prin SPV", href: "/declaratii/d112" },
    ],
    atentie: [
      "Certificatul digital expirat face imposibilă autentificarea — reînnoiește-l cu 30 de zile înainte de expirare.",
      "SPV nu funcționează cu Internet Explorer — folosește Chrome, Firefox sau Edge.",
      "Declarațiile depuse în SPV au același efect juridic ca cele depuse la ghișeu.",
    ],
  },

  "salarii-retineri": {
    slug: "salarii-retineri",
    titlu: "Salarii — de la brut la net",
    categorie: "SRL & Microîntreprinderi",
    culoare: "#059669",
    badgeBg: "#ecfdf5",
    desc: "Ghid complet pentru calculul salariului net din brut — CAS 25%, CASS 10%, impozit 10% — cu exemplu numeric detaliat și contribuțiile angajatorului.",
    ceFaciAfla: [
      "Formula completă brut → net pas cu pas",
      "CAS 25% și CASS 10% reținute din salariul brut",
      "Impozitul pe venit 10% calculat corect",
      "CAM (contribuția angajatorului) de 2.25%",
      "Exemplu numeric cu salariu brut 5.000 lei",
      "Tichete de masă — cum afectează impozitarea",
    ],
    sectiuni: [
      {
        titlu: "Formula salariului net",
        continut: [
          "CAS (pensie) = Brut × 25% — reținută din salariul angajatului.",
          "CASS (sănătate) = Brut × 10% — reținută din salariul angajatului.",
          "Baza de impozit = Brut − CAS − CASS (dacă nu sunt alte deduceri).",
          "Impozit venit = Baza × 10%.",
          "Salariu NET = Brut − CAS − CASS − Impozit.",
          "Exemplu (5.000 lei brut): CAS=1.250, CASS=500, Baza=3.250, Impozit=325 → NET = 2.925 lei.",
        ],
      },
      {
        titlu: "Contribuțiile angajatorului",
        continut: [
          "CAM (Contribuția Asiguratorie pentru Muncă) = 2.25% din salariul brut.",
          "CAM se plătește de angajator suplimentar față de salariul brut — nu se reține din salariul angajatului.",
          "Cost total angajator = Brut + CAM = Brut × 1.0225.",
          "Exemplu: 5.000 lei brut → CAM = 112,5 lei → cost total angajator = 5.112,5 lei.",
          "Angajatorul nu mai plătește CAS sau CASS — acestea sunt integral în sarcina angajatului din 2018.",
        ],
      },
      {
        titlu: "Tichete de masă",
        continut: [
          "Valoarea maximă legală a unui tichet de masă în 2026: 40 lei/zi lucrătoare.",
          "Tichetele de masă sunt scutite de impozit pe venit și CASS, dar NU de CAS.",
          "Angajatorul deduce costul tichetelor ca și cheltuială.",
          "Exemplu: 21 zile lucrătoare × 40 lei = 840 lei/lună în tichete de masă, netaxabile cu impozit.",
          "Tichetele se acordă SUPLIMENTAR față de salariul net — cresc puterea de cumpărare efectivă.",
        ],
      },
      {
        titlu: "Salariul minim și implicații",
        continut: [
          "Salariul minim brut 2026: 4.050 lei/lună (HG 1200/2023).",
          "Salariu net minim: 4.050 − (4.050×25%) − (4.050×10%) − (4.050×65%×10%) ≈ 2.370 lei.",
          "Angajatorii nu pot plăti sub salariul minim brut pentru 8 ore/zi, 5 zile/săptămână.",
          "Salariul minim în construcții: 4.582 lei brut/lună (regim special).",
          "La salariul minim, CAS și CASS se calculează la cel puțin salariul minim, chiar dacă angajatul lucrează part-time sub acest prag.",
        ],
      },
      {
        titlu: "Deducerea personală",
        continut: [
          "Persoanele cu venituri lunare sub 3.600 lei brut beneficiază de o deducere personală care reduce baza de impozitare.",
          "Deducerea personală de bază: 300-500 lei/lună în funcție de venit (pentru venituri sub 3.600 lei).",
          "Persoanele cu copii în întreținere beneficiază de deduceri suplimentare.",
          "Deducerile se acordă DOAR dacă salariatul declară în scris că nu le obține de la alt angajator (formular 010).",
          "Exemplu: angajat cu 2 copii, brut 2.500 lei → deducere personală suplimentară reduce impozitul efectiv.",
        ],
      },
      {
        titlu: "Declararea și plata",
        continut: [
          "Angajatorul depune D112 lunar (până în 25 ale lunii următoare) cu toate reținute și contribuțiile.",
          "D112 se depune prin SPV — obligatoriu electronic pentru toți angajatorii.",
          "CAS, CASS și impozitul pe venit se plătesc tot până pe 25 ale lunii.",
          "Angajatorul emite fișa fiscală anuală (adeverință de venit) — necesară pentru D212 al angajatului.",
          "La ieșirea din angajare, angajatorul emite adeverință de venit și contribuții pentru CAS (necesar la pensionare).",
        ],
      },
    ],
    chart: {
      tip: "bar",
      titlu: "Repartizarea salariului brut de 5.000 lei",
      bare: [
        { label: "Salariu net", value: 2925, color: "#059669" },
        { label: "CAS 25%", value: 1250, color: "#6ee7b7" },
        { label: "CASS 10%", value: 500, color: "#a7f3d0" },
        { label: "Impozit 10%", value: 325, color: "#d1fae5" },
      ],
      unitate: "lei/lună",
    },
    declaratiiAferente: [
      { cod: "D112", nume: "Declarație privind obligațiile sociale și impozitul reținut", href: "/declaratii/d112" },
      { cod: "D205", nume: "Declarație privind impozitul reținut la sursă", href: "/declaratii/d212" },
    ],
    atentie: [
      "CAS și CASS se calculează la cel puțin salariul minim brut, chiar dacă salariul contractual e mai mic.",
      "Tichetele de masă NU sunt scutite de CAS — angajatorul reține CAS și din valoarea tichetelor.",
      "Angajatorul răspunde solidar pentru neplata obligațiilor sociale la termen.",
    ],
  },

  "sponsorizari": {
    slug: "sponsorizari",
    titlu: "Sponsorizări — reducere din impozit",
    categorie: "SRL & Microîntreprinderi",
    culoare: "#d97706",
    badgeBg: "#fef3c7",
    desc: "Ghid complet pentru reducerea impozitului prin sponsorizări — 20% din impozit (max 0.75% CA) pentru microîntreprinderi și persoane juridice plătitoare de impozit pe profit.",
    ceFaciAfla: [
      "Cum funcționează deducerea sponsorizărilor din impozit",
      "Limita de 20% din impozit și max 0.75% din cifra de afaceri",
      "Cine poate primi sponsorizare (entități eligibile)",
      "Documentele necesare — contractul de sponsorizare",
      "Exemplu numeric pentru microîntreprindere și impozit pe profit",
      "Cum se raportează sponsorizarea în declarații fiscale",
    ],
    sectiuni: [
      {
        titlu: "Ce este sponsorizarea fiscală",
        continut: [
          "Sponsorizarea permite firmelor să direcționeze o parte din impozit către organizații non-profit, culte, sport, cultură.",
          "NU este o cheltuială suplimentară — reduci impozitul datorat cu suma sponsorizată.",
          "Limita: MINIM dintre (20% din impozitul datorat) și (0.75% din cifra de afaceri anuală).",
          "Dacă suma sponsorizată e mai mică decât limita, reduci impozitul cu suma exactă sponsorizată.",
          "Dacă suma sponsorizată depășește limita, diferența se reportează în următorii 7 ani fiscali.",
        ],
      },
      {
        titlu: "Exemplu microîntreprindere",
        continut: [
          "Firmă cu CA = 500.000 lei și impozit micro 1% = 5.000 lei.",
          "Limita sponsorizare: min(20% × 5.000 lei; 0.75% × 500.000 lei) = min(1.000 lei; 3.750 lei) = 1.000 lei.",
          "Dacă sponsorizezi cu 1.000 lei: impozit de plată = 5.000 − 1.000 = 4.000 lei.",
          "Ai cheltuit 1.000 lei efectiv dar ai economisit 1.000 lei din impozit → cost net zero!",
          "Practic: dai 1.000 lei organizației, ANAF acceptă să scadă 1.000 lei din impozit.",
        ],
      },
      {
        titlu: "Exemplu impozit pe profit",
        continut: [
          "Firmă cu profit impozabil 600.000 lei → impozit profit 16% = 96.000 lei.",
          "CA = 2.000.000 lei.",
          "Limita: min(20% × 96.000; 0.75% × 2.000.000) = min(19.200; 15.000) = 15.000 lei.",
          "Poți sponsoriza max 15.000 lei și reduce impozitul cu aceeași sumă.",
          "Impozit de plată: 96.000 − 15.000 = 81.000 lei.",
          "Diferența față de limita de 20% (19.200 lei) = 4.200 lei reportați în anii următori.",
        ],
      },
      {
        titlu: "Entități eligibile să primească sponsorizare",
        continut: [
          "Organizații non-profit (ONG) înregistrate legal cu cod fiscal propriu.",
          "Culte religioase recunoscute oficial în România.",
          "Cluburi și asociații sportive (inclusiv școli de sport).",
          "Instituții de cultură și artă (teatre, muzee, orchestre).",
          "IMPORTANT: Entitatea trebuie să fie înscrisă în Registrul Entităților/Unităților de Cult (REUC) pe site-ul ANAF.",
          "Nu poți sponsoriza persoane fizice sau firme comerciale.",
        ],
      },
      {
        titlu: "Documentele necesare",
        continut: [
          "Contract de sponsorizare semnat de ambele părți — stipulează suma, destinația și scopul.",
          "Factura sau chitanța de la beneficiar (confirmare de primire a sumei).",
          "Verificarea că entitatea beneficiară e înscrisă în REUC pe anaf.ro.",
          "Declarație pe proprie răspundere a beneficiarului că a utilizat suma în scopul declarat.",
          "Toate documentele se păstrează minim 5 ani pentru inspecție fiscală.",
        ],
      },
      {
        titlu: "Raportarea în declarații fiscale",
        continut: [
          "Microîntreprinderi: se declară în D100 (declarație trimestrială de impozit micro).",
          'Impozit pe profit: se declară în D101 la rubrica „Reduceri de impozit — sponsorizări".',
          "PFA-uri cu impozit pe venit: NU beneficiază de această facilitate.",
          "Suma reportată (dacă depășește limita) se deduce în anii următori tot prin D100/D101.",
          "Sancțiune: dacă beneficiarul NU e în REUC, sponsorizarea nu e acceptată fiscal — impozit + penalități.",
        ],
      },
    ],
    chart: {
      tip: "bar",
      titlu: "Beneficiu sponsorizare (microîntreprindere, CA 500k lei)",
      bare: [
        { label: "Impozit inițial", value: 5000, color: "#d97706" },
        { label: "Limită sponsorizare", value: 1000, color: "#fbbf24" },
        { label: "Impozit final", value: 4000, color: "#fef3c7" },
      ],
      unitate: "lei",
    },
    declaratiiAferente: [
      { cod: "D100", nume: "Declarație privind obligațiile de plată (micro)", href: "/declaratii/d100" },
      { cod: "D101", nume: "Declarație privind impozitul pe profit", href: "/declaratii/d101" },
    ],
    atentie: [
      "Verifică OBLIGATORIU că entitatea beneficiară e în REUC pe anaf.ro înainte de a sponsoriza.",
      "Contractul de sponsorizare trebuie semnat ÎNAINTE de plată — nu retroactiv.",
      "Limita se calculează la impozitul datorat ÎNAINTE de deducerea sponsorizărilor.",
    ],
  },
};
