export interface CalculatorMeta {
  /** Titlu SEO (<title>) */
  title: string;
  /** H1 vizibil */
  h1: string;
  description: string;
  lead: string;
  /** Pași „cum se calculează”, afișați sub calculator */
  cum: string[];
  faq: { q: string; a: string }[];
}

export const CALCULATOARE: Record<string, CalculatorMeta> = {
  salariu: {
    title: "Calculator salariu net 2026 — din brut în net și invers",
    h1: "Calculator salariu net 2026",
    description: "Calculează salariul net din brut (și invers) după regulile din 2026: CAS 25%, CASS 10%, impozit 10%, deducere personală, suma neimpozabilă la salariul minim și costul total pentru angajator.",
    lead: "Află cât primești în mână, cât reține statul și cât îl costă pe angajator, cu deducerea personală și suma neimpozabilă de la salariul minim incluse.",
    cum: [
      "Din salariul brut se rețin CAS (25%, pensie) și CASS (10%, sănătate).",
      "La salariul minim, 300 lei/lună (ian–iun 2026) sau 200 lei/lună (iul–dec 2026) sunt scutiți de taxe.",
      "Din ce rămâne se scade deducerea personală, dacă brutul nu depășește salariul minim + 2.000 lei.",
      "Impozitul pe venit este 10% din baza rămasă. Netul = brut − CAS − CASS − impozit.",
      "Angajatorul plătește în plus CAM de 2,25% din brut.",
    ],
    faq: [
      { q: "Cât este salariul minim net în 2026?", a: "Pentru salariul minim de 4.050 lei brut (ianuarie–iunie 2026) netul este 2.574 lei, iar pentru 4.325 lei brut (din iulie 2026) netul este 2.699 lei, cu suma neimpozabilă inclusă." },
      { q: "Cine primește deducere personală?", a: "Angajații cu salariul brut de cel mult salariul minim + 2.000 lei, la funcția de bază. Procentul pornește de la 20% din salariul minim fără persoane în întreținere și ajunge la 45% pentru 4 sau mai multe, scăzând treptat la salarii mai mari." },
      { q: "Ce este deducerea suplimentară de 100 lei?", a: "Se acordă pentru fiecare copil minor înscris într-o unitate de învățământ, unuia dintre părinți, indiferent de nivelul salariului." },
    ],
  },
  pfa: {
    title: "Calculator PFA 2026 — CAS, CASS și impozit pe venit",
    h1: "Calculator taxe PFA 2026",
    description: "Calculează taxele PFA în sistem real sau la normă de venit pentru 2026: CAS 25% la 12 sau 24 de salarii minime, CASS 10% plafonat la 72 de salarii minime, impozit 10%.",
    lead: "Introdu venitul net anual (încasări minus cheltuieli deductibile) sau norma de venit și vezi exact ce plătești prin Declarația unică.",
    cum: [
      "CAS (pensie, 25%) este obligatoriu dacă venitul net depășește 12 salarii minime (48.600 lei în 2026) și se plătește la o bază fixă: 12 sau 24 de salarii minime.",
      "CASS (sănătate, 10%) se calculează la venitul net, cu minimum 6 și maximum 72 de salarii minime (24.300 – 291.600 lei).",
      "Impozitul pe venit este 10% din venitul net minus CAS și CASS.",
      "Pentru contribuțiile pe 2026 se folosește salariul minim de la 1 ianuarie 2026: 4.050 lei.",
    ],
    faq: [
      { q: "Plătesc CAS dacă am venituri mici din PFA?", a: "Nu este obligatoriu sub 12 salarii minime (48.600 lei pentru 2026), dar poți opta să plătești, ca să-ți crească stagiul de cotizare." },
      { q: "Dacă sunt și angajat, mai plătesc CASS la PFA?", a: "Da. CASS se datorează pe venitul din PFA, dar minimul de 6 salarii minime nu se aplică dacă ești deja asigurat ca salariat sau pensionar." },
      { q: "Când plătesc taxele PFA?", a: "Prin Declarația unică (D212), până la 25 mai a anului următor celui în care ai obținut venitul." },
    ],
  },
  srl: {
    title: "Calculator SRL 2026 — microîntreprindere 1% sau impozit pe profit 16%",
    h1: "Calculator SRL: micro sau profit",
    description: "Compară impozitul pe veniturile microîntreprinderilor (1%) cu impozitul pe profit (16%) și vezi cât îți rămâne după impozitul de 16% pe dividende și CASS.",
    lead: "Pornește de la cifra de afaceri și cheltuieli și vezi, pentru ambele regimuri, cât ajunge la tine ca dividend net.",
    cum: [
      "Microîntreprinderea plătește 1% din venituri, indiferent de profit, dacă cifra de afaceri nu depășește 100.000 EUR.",
      "Firma cu impozit pe profit plătește 16% din profit (venituri minus cheltuieli deductibile).",
      "Profitul rămas se poate distribui ca dividende, cu impozit de 16% reținut la sursă.",
      "Asociatul plătește CASS separat dacă totalul veniturilor pasive depășește 6 salarii minime.",
    ],
    faq: [
      { q: "Când este mai avantajos regimul micro?", a: "Când cheltuielile sunt mici față de venituri. Cu cât marja de profit e mai mare, cu atât impozitul de 1% pe venit e mai mic decât 16% din profit." },
      { q: "Ce se întâmplă dacă depășesc 100.000 EUR?", a: "Firma trece la impozit pe profit începând cu trimestrul în care a depășit plafonul." },
    ],
  },
  dividende: {
    title: "Calculator dividende 2026 — impozit 16% și CASS",
    h1: "Calculator dividende 2026",
    description: "Calculează impozitul de 16% pe dividende și CASS-ul datorat în 2026, în funcție de pragurile de 6, 12 și 24 de salarii minime.",
    lead: "Vezi cât primești efectiv din dividendele distribuite și dacă datorezi CASS.",
    cum: [
      "Firma reține impozit de 16% din dividendul brut și îl plătește la ANAF.",
      "CASS (10%) se datorează dacă totalul veniturilor pasive din an (dividende, chirii, dobânzi, crypto) depășește 6 salarii minime.",
      "CASS nu se aplică pe tot venitul, ci la o bază fixă: 6, 12 sau 24 de salarii minime, în funcție de treapta atinsă.",
      "CASS se declară și se plătește prin Declarația unică, până la 25 mai.",
    ],
    faq: [
      { q: "Cât CASS plătesc la 100.000 lei dividende?", a: "Peste 24 de salarii minime (97.200 lei în 2026) baza este plafonată la 97.200 lei, deci CASS-ul este 9.720 lei." },
      { q: "Impozitul de 16% se aplică și dividendelor din profitul anilor trecuți?", a: "Cota se aplică dividendelor distribuite (plătite) începând cu 1 ianuarie 2026, indiferent de anul în care s-a obținut profitul." },
    ],
  },
  chirii: {
    title: "Calculator impozit chirii 2026 — deducere 20%, impozit 10%, CASS",
    h1: "Calculator impozit pe chirii 2026",
    description: "Calculează impozitul pe veniturile din chirii în 2026: deducere forfetară de 20%, impozit 10% și CASS în trepte de 6, 12 sau 24 de salarii minime.",
    lead: "Introdu chiria încasată și vezi impozitul, CASS-ul și cât îți rămâne pe an și pe lună.",
    cum: [
      "Venitul net = chiria încasată minus o deducere forfetară de 20% (fără documente justificative).",
      "Impozitul pe venit este 10% din venitul net.",
      "CASS se datorează dacă veniturile pasive totale depășesc 6 salarii minime, la o bază fixă de 6, 12 sau 24 de salarii minime.",
      "Totul se declară prin Declarația unică, până la 25 mai a anului următor.",
    ],
    faq: [
      { q: "Trebuie să înregistrez contractul de închiriere?", a: "Da, contractul se înregistrează la ANAF în 30 de zile de la încheiere, prin formularul C168." },
      { q: "Chiria de la o firmă se impozitează altfel?", a: "Firma care plătește chiria reține impozitul de 10% la sursă. CASS rămâne în sarcina ta și se declară prin D212." },
    ],
  },
  tva: {
    title: "Calculator TVA 2026 — adaugă sau extrage TVA (21%, 11%)",
    h1: "Calculator TVA 2026",
    description: "Adaugă sau extrage TVA din orice sumă cu cotele din 2026 (21% standard, 11% redusă) și calculează TVA-ul de plată din decont.",
    lead: "Calculează rapid TVA-ul dintr-o factură și TVA-ul de plată pentru decontul D300.",
    cum: [
      "Cota standard de TVA este 21% din 1 august 2025.",
      "Cota redusă unică este 11% (alimente, cazare, restaurante, cărți, medicamente); cota de 5% a fost eliminată.",
      "Pentru a extrage TVA dintr-un preț cu TVA: TVA = preț × cotă / (100 + cotă).",
      "TVA de plată = TVA colectată − TVA deductibilă.",
    ],
    faq: [
      { q: "Când devin plătitor de TVA?", a: "Obligatoriu când cifra de afaceri depășește 395.000 lei într-un an calendaristic. Te înregistrezi în 10 zile de la sfârșitul lunii în care ai depășit plafonul." },
      { q: "Mai există cota de 9% pentru locuințe?", a: "Nu. Regimul tranzitoriu de 9% s-a aplicat doar livrărilor efectuate până la 30 septembrie 2026. De la 1 octombrie 2026 locuințele se vând cu TVA de 21%." },
    ],
  },
  crypto: {
    title: "Calculator impozit crypto 2026 — 16% pe câștiguri și CASS",
    h1: "Calculator impozit crypto 2026",
    description: "Calculează impozitul de 16% pe câștigurile din criptomonede în 2026 și CASS-ul pe veniturile pasive. Include scutirea pentru câștiguri mici.",
    lead: "Introdu câștigul net realizat (vânzări minus cost de achiziție) și vezi ce declari în D212.",
    cum: [
      "Câștigul impozabil = prețul de vânzare minus costul de achiziție, pentru tranzacțiile încheiate în an.",
      "Impozitul este 16% din câștigul net anual.",
      "Câștigurile sub 200 lei pe tranzacție sunt scutite, dacă totalul lor nu depășește 600 lei pe an.",
      "CASS se adaugă dacă totalul veniturilor pasive depășește 6 salarii minime.",
    ],
    faq: [
      { q: "Ce este DAC8?", a: "Directiva europeană prin care platformele crypto raportează automat tranzacțiile la ANAF, începând cu 2026. Datele apar în D212 precompletată." },
      { q: "Schimbul între două criptomonede se impozitează?", a: "Se impozitează câștigul realizat la transferul dreptului de proprietate. Verifică cu un consultant fiscal situația concretă a schimburilor crypto-crypto." },
    ],
  },
};

export const CALCULATOARE_IDS = Object.keys(CALCULATOARE);
