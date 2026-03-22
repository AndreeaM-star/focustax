export type Tara = {
  nume: string;
  codISO: string;
  cotaStandard: number;
  coteReduse?: number[];
  sistem: "flat" | "progresiv" | "distributie";
  detalii?: string;
  esteRomania?: boolean;
};

export type TipComparatie = {
  id: string;
  titlu: string;
  descriere: string;
  unitateMasura: string;
  culoare: string;
  culoareSecundara: string;
  emoji: string;
  tari: Tara[];
  contextRomania: string;
  mediuEuropean: number;
  istorie: string;
  fapteInteresante: string[];
};

export const COMPARATII: Record<string, TipComparatie> = {
  tva: {
    id: "tva",
    titlu: "TVA — Taxa pe Valoare Adăugată",
    descriere:
      "Comparație internațională a cotelor standard de TVA în Europa. România aplică o cotă de 19%, sub media europeană de ~21%.",
    unitateMasura: "%",
    culoare: "rgba(37, 99, 235, 0.85)",
    culoareSecundara: "rgba(37, 99, 235, 0.18)",
    emoji: "🛒",
    tari: [
      { nume: "Ungaria", codISO: "HU", cotaStandard: 27, coteReduse: [5, 18], sistem: "flat" },
      { nume: "Danemarca", codISO: "DK", cotaStandard: 25, coteReduse: [], sistem: "flat" },
      { nume: "Suedia", codISO: "SE", cotaStandard: 25, coteReduse: [6, 12], sistem: "flat" },
      { nume: "Norvegia", codISO: "NO", cotaStandard: 25, coteReduse: [12, 15], sistem: "flat" },
      { nume: "Croația", codISO: "HR", cotaStandard: 25, coteReduse: [5, 13], sistem: "flat" },
      { nume: "Finlanda", codISO: "FI", cotaStandard: 25.5, coteReduse: [10, 14], sistem: "flat" },
      { nume: "Polonia", codISO: "PL", cotaStandard: 23, coteReduse: [5, 8], sistem: "flat" },
      { nume: "Portugalia", codISO: "PT", cotaStandard: 23, coteReduse: [6, 13], sistem: "flat" },
      { nume: "Irlanda", codISO: "IE", cotaStandard: 23, coteReduse: [9, 13.5], sistem: "flat" },
      { nume: "Grecia", codISO: "GR", cotaStandard: 24, coteReduse: [6, 13], sistem: "flat" },
      { nume: "Belgia", codISO: "BE", cotaStandard: 21, coteReduse: [6, 12], sistem: "flat" },
      { nume: "Olanda", codISO: "NL", cotaStandard: 21, coteReduse: [9], sistem: "flat" },
      { nume: "Cehia", codISO: "CZ", cotaStandard: 21, coteReduse: [12], sistem: "flat" },
      { nume: "Letonia", codISO: "LV", cotaStandard: 21, coteReduse: [5, 12], sistem: "flat" },
      { nume: "Lituania", codISO: "LT", cotaStandard: 21, coteReduse: [5, 9], sistem: "flat" },
      { nume: "Spania", codISO: "ES", cotaStandard: 21, coteReduse: [4, 10], sistem: "flat" },
      { nume: "Slovacia", codISO: "SK", cotaStandard: 23, coteReduse: [10], sistem: "flat" },
      { nume: "Austria", codISO: "AT", cotaStandard: 20, coteReduse: [5, 10, 13], sistem: "flat" },
      { nume: "Franța", codISO: "FR", cotaStandard: 20, coteReduse: [2.1, 5.5, 10], sistem: "flat" },
      { nume: "Bulgaria", codISO: "BG", cotaStandard: 20, coteReduse: [9], sistem: "flat" },
      { nume: "Estonia", codISO: "EE", cotaStandard: 22, coteReduse: [9], sistem: "flat" },
      { nume: "Slovenia", codISO: "SI", cotaStandard: 22, coteReduse: [5, 9.5], sistem: "flat" },
      { nume: "Italia", codISO: "IT", cotaStandard: 22, coteReduse: [4, 5, 10], sistem: "flat" },
      { nume: "România", codISO: "RO", cotaStandard: 19, coteReduse: [5, 9], sistem: "flat", esteRomania: true },
      { nume: "Germania", codISO: "DE", cotaStandard: 19, coteReduse: [7], sistem: "flat" },
      { nume: "Cipru", codISO: "CY", cotaStandard: 19, coteReduse: [5, 9], sistem: "flat" },
      { nume: "Malta", codISO: "MT", cotaStandard: 18, coteReduse: [5, 7], sistem: "flat" },
      { nume: "Luxemburg", codISO: "LU", cotaStandard: 17, coteReduse: [3, 8, 14], sistem: "flat" },
      { nume: "Elveția", codISO: "CH", cotaStandard: 8.1, coteReduse: [2.6, 3.8], sistem: "flat" },
    ],
    contextRomania:
      "România aplică o cotă de TVA de 19%, sub media UE de ~21%. Față de vecinii săi, România se situează la același nivel cu Germania și Cipru. Cota redusă de 9% se aplică pentru alimente, medicamente și servicii de turism, iar 5% pentru locuințe sociale și produse ecologice.",
    mediuEuropean: 21,
    istorie:
      "TVA a fost inventată în Franța în 1954 de către Maurice Lauré, director adjunct al administrației fiscale franceze. Ideea revoluționară a fost că fiecare verigă din lanțul de producție și distribuție plătește impozit doar pe valoarea adăugată de ea, nu pe valoarea totală a tranzacției. România a introdus TVA în 1993, la scurt timp după tranziția la economia de piață, cu o cotă inițială de 18%. Cota a crescut la 19% în 1998, a urcat la 24% în 2010 (în contextul crizei economice și al acordului cu FMI), a scăzut la 20% în 2016 și la 19% în 2017. Uniunea Europeană impune statelor membre o cotă minimă de TVA de 15%, dar fiecare stat are libertatea să stabilească propria cotă standard.",
    fapteInteresante: [
      "Ungaria are cea mai mare cotă de TVA din lume — 27% — mai mare decât orice altă țară OCDE.",
      "Luxemburg, deși are cea mai mică cotă din UE (17%), găzduiește sediile multor companii tech datorită avantajelor fiscale.",
      "Elveția nu este în UE și aplică una dintre cele mai mici cote TVA europene: 8.1%, cu cote reduse de 2.6% pentru alimente de bază.",
      "Danemarca nu are cote reduse de TVA — aplică cota standard de 25% la aproape toate produsele, compensând prin beneficii sociale generoase.",
    ],
  },

  "impozit-venit": {
    id: "impozit-venit",
    titlu: "Impozit pe Venit — Persoane Fizice",
    descriere:
      "Comparație a sistemelor de impozitare a veniturilor persoanelor fizice în Europa. România aplică o cotă unică de 10%.",
    unitateMasura: "%",
    culoare: "rgba(5, 150, 105, 0.85)",
    culoareSecundara: "rgba(5, 150, 105, 0.18)",
    emoji: "💼",
    tari: [
      { nume: "Danemarca", codISO: "DK", cotaStandard: 56, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Austria", codISO: "AT", cotaStandard: 55, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Suedia", codISO: "SE", cotaStandard: 52, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Belgia", codISO: "BE", cotaStandard: 50, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Finlanda", codISO: "FI", cotaStandard: 51.4, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Spania", codISO: "ES", cotaStandard: 47, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Franța", codISO: "FR", cotaStandard: 45, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Germania", codISO: "DE", cotaStandard: 45, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Italia", codISO: "IT", cotaStandard: 43, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Grecia", codISO: "GR", cotaStandard: 44, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Olanda", codISO: "NL", cotaStandard: 49.5, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Portugalia", codISO: "PT", cotaStandard: 48, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Irlanda", codISO: "IE", cotaStandard: 40, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Croația", codISO: "HR", cotaStandard: 35.4, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Polonia", codISO: "PL", cotaStandard: 32, sistem: "progresiv", detalii: "12% / 32%" },
      { nume: "Slovacia", codISO: "SK", cotaStandard: 25, sistem: "progresiv", detalii: "19% / 25%" },
      { nume: "Cehia", codISO: "CZ", cotaStandard: 23, sistem: "progresiv", detalii: "15% / 23%" },
      { nume: "Letonia", codISO: "LV", cotaStandard: 31, sistem: "progresiv", detalii: "20% / 23% / 31%" },
      { nume: "Lituania", codISO: "LT", cotaStandard: 32, sistem: "progresiv", detalii: "20% / 32%" },
      { nume: "Estonia", codISO: "EE", cotaStandard: 22, sistem: "flat", detalii: "Cotă unică 22%" },
      { nume: "Ungaria", codISO: "HU", cotaStandard: 15, sistem: "flat", detalii: "Cotă unică 15%" },
      { nume: "Bulgaria", codISO: "BG", cotaStandard: 10, sistem: "flat", detalii: "Cotă unică 10%" },
      {
        nume: "România",
        codISO: "RO",
        cotaStandard: 10,
        sistem: "flat",
        detalii: "Cotă unică 10%",
        esteRomania: true,
      },
      { nume: "Slovenia", codISO: "SI", cotaStandard: 50, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Cipru", codISO: "CY", cotaStandard: 35, sistem: "progresiv", detalii: "Cotă marginală maximă" },
      { nume: "Malta", codISO: "MT", cotaStandard: 35, sistem: "progresiv", detalii: "Cotă marginală maximă" },
    ],
    contextRomania:
      "România și Bulgaria sunt singurele țări UE cu o cotă unică de impozit pe venit de 10% — cea mai mică din Europa. Această cotă avantajează semnificativ persoanele cu venituri medii și mari față de sistemele progresive din vest. PFA-urile și liber profesioniștii plătesc 10% + CAS 25% + CASS 10% din venitul net anual.",
    mediuEuropean: 38,
    istorie:
      "Impozitul pe venitul personal a apărut pentru prima dată în Marea Britanie în 1799, introdus de William Pitt cel Tânăr pentru a finanța războaiele napoleoniene. Statele Unite au introdus impozitul pe venit prin Amendamentul XVI din 1913. România a adoptat impozitul pe venit odată cu reformele fiscale din anii 1990. Inițial a existat un sistem progresiv cu mai multe trepte (18%, 23%, 28%), dar în 2005 guvernul Călin Popescu-Tăriceanu a introdus cota unică de 16%, considerată un avantaj competitiv pentru atragerea investițiilor. Din 2018, cota a fost redusă la 10% pentru persoanele fizice, concomitent cu transferul contribuțiilor sociale de la angajator la angajat.",
    fapteInteresante: [
      "Bulgaria și România sunt singurele state UE cu cotă unică de 10% — cele mai mici din blocul comunitar.",
      "Danemarca are cea mai mare cotă marginală din Europa (56%), dar și cel mai generos sistem de protecție socială.",
      "Estonia a fost prima țară din Europa Centrală și de Est care a introdus cota unică (1994), inspirând alte țări din regiune.",
      "Elveția are un sistem unic: impozitul federal, cantonal și comunal se calculează separat, rata efectivă variind de la 0% la ~40% în funcție de cantonul de rezidență.",
    ],
  },

  "impozit-profit": {
    id: "impozit-profit",
    titlu: "Impozit pe Profit — Persoane Juridice",
    descriere:
      "Comparație a cotelor de impozit pe profit pentru companii în Europa. România aplică 16% (sau 1% microîntreprinderi).",
    unitateMasura: "%",
    culoare: "rgba(124, 58, 237, 0.85)",
    culoareSecundara: "rgba(124, 58, 237, 0.18)",
    emoji: "🏢",
    tari: [
      { nume: "Franța", codISO: "FR", cotaStandard: 25, sistem: "flat", detalii: "Cotă standard 25%" },
      { nume: "Germania", codISO: "DE", cotaStandard: 30, sistem: "flat", detalii: "~30% combinat (federal + local)" },
      { nume: "Italia", codISO: "IT", cotaStandard: 24, sistem: "flat", detalii: "24% IRES + 3.9% IRAP" },
      { nume: "Spania", codISO: "ES", cotaStandard: 25, sistem: "flat" },
      { nume: "Belgia", codISO: "BE", cotaStandard: 25, sistem: "flat" },
      { nume: "Olanda", codISO: "NL", cotaStandard: 25.8, sistem: "progresiv", detalii: "19% / 25.8%" },
      { nume: "Suedia", codISO: "SE", cotaStandard: 20.6, sistem: "flat" },
      { nume: "Austria", codISO: "AT", cotaStandard: 23, sistem: "flat", detalii: "Redus de la 25% în 2023" },
      { nume: "Portugalia", codISO: "PT", cotaStandard: 21, sistem: "flat", detalii: "21% + surtaxe locale" },
      { nume: "Grecia", codISO: "GR", cotaStandard: 22, sistem: "flat" },
      { nume: "Danemarca", codISO: "DK", cotaStandard: 22, sistem: "flat" },
      { nume: "Polonia", codISO: "PL", cotaStandard: 19, sistem: "flat", detalii: "9% pentru firme mici" },
      { nume: "Cehia", codISO: "CZ", cotaStandard: 21, sistem: "flat" },
      { nume: "Slovacia", codISO: "SK", cotaStandard: 21, sistem: "flat" },
      { nume: "Croația", codISO: "HR", cotaStandard: 18, sistem: "flat", detalii: "10% sub 1M EUR profit" },
      { nume: "Slovenia", codISO: "SI", cotaStandard: 19, sistem: "flat" },
      {
        nume: "România",
        codISO: "RO",
        cotaStandard: 16,
        sistem: "flat",
        detalii: "16% profit / 1% micro",
        esteRomania: true,
      },
      { nume: "Finlanda", codISO: "FI", cotaStandard: 20, sistem: "flat" },
      { nume: "Estonia", codISO: "EE", cotaStandard: 20, sistem: "distributie", detalii: "Doar pe profitul distribuit" },
      { nume: "Letonia", codISO: "LV", cotaStandard: 20, sistem: "distributie", detalii: "Doar pe profitul distribuit" },
      { nume: "Lituania", codISO: "LT", cotaStandard: 15, sistem: "flat", detalii: "5% pentru firme mici" },
      { nume: "Ungaria", codISO: "HU", cotaStandard: 9, sistem: "flat", detalii: "Cea mai mică din UE" },
      { nume: "Bulgaria", codISO: "BG", cotaStandard: 10, sistem: "flat" },
      { nume: "Cipru", codISO: "CY", cotaStandard: 12.5, sistem: "flat" },
      { nume: "Irlanda", codISO: "IE", cotaStandard: 12.5, sistem: "flat", detalii: "Renumit pentru firme tech" },
      { nume: "Malta", codISO: "MT", cotaStandard: 35, sistem: "flat", detalii: "Efectiv ~5% cu restituiri" },
      { nume: "Luxemburg", codISO: "LU", cotaStandard: 17, sistem: "flat" },
      { nume: "Elveția", codISO: "CH", cotaStandard: 14.9, sistem: "flat", detalii: "Medie cantoane ~14.9%" },
    ],
    contextRomania:
      "România aplică o cotă de 16% pentru impozitul pe profit, în linie cu media europeană. Microîntreprinderile (sub 500.000 EUR cifră de afaceri) plătesc 1% pe cifra de afaceri brută, un avantaj semnificativ față de statele din vestul Europei. Din 2024, microîntreprinderile cu angajați plătesc 1%, cele fără angajați — 3%.",
    mediuEuropean: 20,
    istorie:
      "Impozitul pe profit modern a apărut la începutul secolului XX. Germania a introdus impozitul pe corporații în 1920. România a introdus impozitul pe profit în 1990, odată cu tranziția la economia de piață. Cota a variat între 38% (1991) și 16% (din 2005, odată cu introducerea cotei unice). Tendința globală a ultimilor 30 de ani este de scădere continuă a cotelor corporative — media globală a scăzut de la ~45% în 1985 la ~23% astăzi. Motivul: competiția fiscală între state pentru atragerea investițiilor străine. Irlanda este cel mai cunoscut exemplu: cota de 12.5% a atras sedii europene ale Google, Apple, Facebook și alte mari corporații tech.",
    fapteInteresante: [
      "Ungaria are cea mai mică cotă de impozit pe profit din UE: 9%, un avantaj competitiv major pentru companii.",
      "Irlanda (12.5%) găzduiește sediile europene ale celor mai mari corporații tech americane, generând venituri fiscale enorme.",
      "Estonia și Letonia nu impozitează profitul reinvestit — impozitul se plătește doar la distribuirea dividendelor, stimulând reinvestiția.",
      "Malta are formal cea mai mare cotă (35%), dar printr-un sistem de restituiri, companiile străine plătesc efectiv ~5%, ceea ce a atras critici privind concurența fiscală neloială.",
    ],
  },

  "contributii-sociale": {
    id: "contributii-sociale",
    titlu: "Contribuții Sociale — Angajat + Angajator",
    descriere:
      "Comparație a totalului contribuțiilor sociale (angajat + angajator) în Europa. România: CAS 25% + CASS 10% (angajat).",
    unitateMasura: "%",
    culoare: "rgba(217, 119, 6, 0.85)",
    culoareSecundara: "rgba(217, 119, 6, 0.18)",
    emoji: "🤝",
    tari: [
      { nume: "Franța", codISO: "FR", cotaStandard: 68, sistem: "progresiv", detalii: "~42% angajator + 26% angajat" },
      { nume: "Slovacia", codISO: "SK", cotaStandard: 48.6, sistem: "flat", detalii: "35.2% angajator + 13.4% angajat" },
      { nume: "Cehia", codISO: "CZ", cotaStandard: 45, sistem: "flat", detalii: "33.8% angajator + 11.2% angajat" },
      { nume: "Italia", codISO: "IT", cotaStandard: 43, sistem: "flat", detalii: "~30% angajator + 13% angajat" },
      { nume: "Belgia", codISO: "BE", cotaStandard: 40, sistem: "flat", detalii: "~27% angajator + 13.07% angajat" },
      { nume: "Germania", codISO: "DE", cotaStandard: 40, sistem: "flat", detalii: "~20% angajator + 20% angajat" },
      { nume: "Austria", codISO: "AT", cotaStandard: 39.9, sistem: "flat", detalii: "~21.7% angajator + 18.2% angajat" },
      { nume: "Spania", codISO: "ES", cotaStandard: 36.9, sistem: "flat", detalii: "~29.9% angajator + 6.4% angajat" },
      { nume: "Grecia", codISO: "GR", cotaStandard: 38.5, sistem: "flat", detalii: "~22% angajator + 16% angajat" },
      {
        nume: "România",
        codISO: "RO",
        cotaStandard: 35,
        sistem: "flat",
        detalii: "CAS 25% + CASS 10% (angajat); 2.25% CAM (angajator)",
        esteRomania: true,
      },
      { nume: "Polonia", codISO: "PL", cotaStandard: 34.7, sistem: "flat", detalii: "~20.6% angajator + 13.7% angajat" },
      { nume: "Letonia", codISO: "LV", cotaStandard: 34.09, sistem: "flat", detalii: "~23.59% angajator + 10.5% angajat" },
      { nume: "Ungaria", codISO: "HU", cotaStandard: 33.5, sistem: "flat", detalii: "~15.5% angajator + 18% angajat" },
      { nume: "Bulgaria", codISO: "BG", cotaStandard: 32.7, sistem: "flat", detalii: "~18.9% angajator + 13.8% angajat" },
      { nume: "Estonia", codISO: "EE", cotaStandard: 33, sistem: "flat", detalii: "~33% angajator, 0% angajat" },
      { nume: "Slovenia", codISO: "SI", cotaStandard: 38.2, sistem: "flat", detalii: "~16.1% angajator + 22.1% angajat" },
      { nume: "Croația", codISO: "HR", cotaStandard: 36.5, sistem: "flat", detalii: "~16.5% angajator + 20% angajat" },
      { nume: "Lituania", codISO: "LT", cotaStandard: 40.7, sistem: "flat", detalii: "~1.77% angajator + 19.5% angajat" },
      { nume: "Portugalia", codISO: "PT", cotaStandard: 34.75, sistem: "flat", detalii: "~23.75% angajator + 11% angajat" },
      { nume: "Olanda", codISO: "NL", cotaStandard: 35.7, sistem: "flat", detalii: "~21.6% angajator + 13.1% angajat" },
      { nume: "Finlanda", codISO: "FI", cotaStandard: 38.3, sistem: "flat", detalii: "~25% angajator + 13.3% angajat" },
      { nume: "Suedia", codISO: "SE", cotaStandard: 38.4, sistem: "flat", detalii: "~31.4% angajator + 7% angajat" },
      { nume: "Irlanda", codISO: "IE", cotaStandard: 15.15, sistem: "flat", detalii: "~11.15% angajator + 4% angajat" },
      { nume: "Danemarca", codISO: "DK", cotaStandard: 8, sistem: "flat", detalii: "~0% angajator + 8% angajat ATP" },
      { nume: "Elveția", codISO: "CH", cotaStandard: 25.15, sistem: "flat", detalii: "~12.7% angajator + 12.45% angajat" },
    ],
    contextRomania:
      "În România, contribuțiile sociale sunt suportate integral de angajat: CAS 25% (pensie) și CASS 10% (sănătate) din salariul brut. Angajatorul plătește doar 2.25% CAM (contribuția asiguratorie pentru muncă). Această structură, introdusă în 2018, transferă povara fiscală asupra salariatului, crescând transparența costurilor.",
    mediuEuropean: 36,
    istorie:
      "Contribuțiile sociale moderne au apărut în Germania lui Bismarck, în 1883, odată cu introducerea primei asigurări de sănătate obligatorii la nivel național. Sistemul a fost extins treptat pentru a include pensiile (1889) și asigurarea de șomaj (1927). România a adoptat sistemul de asigurări sociale obligatorii în 1912, sub regele Carol I. Reformele majore post-1990 au restructurat sistemul spre un model contributiv. Marea reformă din 2018 a transferat contribuțiile de la angajator la angajat — salariile brute au crescut compensator, dar rata efectivă a rămas similară. Tendința europeană actuală este de reducere graduală a contribuțiilor angajatorului și creșterea finanțării din impozite generale.",
    fapteInteresante: [
      "Franța are cel mai mare nivel de contribuții sociale din Europa (~68% combinat), dar și cel mai generos sistem de protecție socială.",
      "Danemarca are contribuții sociale foarte mici (~8%), dar finanțează sănătatea și pensiile în principal din impozite pe venit ridicate.",
      "Irlanda are contribuții reduse (~15%), parțial compensate de costul ridicat al asigurărilor private de sănătate.",
      "Estonia a ales să pună toată sarcina contribuțiilor pe angajator (~33%), angajatul neplatind nimic extra, simplificând calculul salariului net.",
    ],
  },
};

export const COMPARATII_IDS = Object.keys(COMPARATII);
