# PROMPT COMPLET PENTRU CLAUDE CODE — FOCUSTAX.RO UPGRADE MAJOR

## CONTEXT PROIECT

Proiect: `focustax.ro` — platformă educativă fiscală gratuită pentru România.
Stack: Next.js 15, TypeScript, Supabase, CSS Modules, Vercel.
Fișiere principale relevante:
- `app/page.tsx` — homepage
- `app/layout.tsx` — layout global (Montserrat + Open Sans, Vercel Analytics)
- `app/globals.css` — design system cu liquid glass (glass-sm / glass-md / glass-lg)
- `app/calculator/CalculatorClient.tsx` — toate calculatoarele (Salariu, PFA, SRL, Chirii, TVA)
- `lib/salary.ts` — funcții calcul salariu / TVA / facturi
- `app/manager/` — Dashboard, Facturi, HR, AI (ANA), TVA, Bănci
- `app/api/chat/route.ts` — AI backend (Groq llama-3.3-70b-versatile)
- `app/api/` — routes: facturi, angajati, companies, sessions, tranzactii, anaf
- `app/ghiduri/`, `app/declaratii/`, `app/comparatii/`, `app/noutati/`

Design system: fundal gri-lavandă (`background-color: #e0e0e4`) cu radial gradients, carduri liquid glass cu backdrop-filter blur. Navbar + Footer componente globale. Animații fadeInUp, cardIn, slideDown.

Configurație: `trailingSlash: true`, Vercel deployment, fără `output: export`.

---

## BLOC 1 — CORECTURI URGENTE (DATE GREȘITE)

### 1.1 — `app/page.tsx` — Homepage stats strip și carduri
Găsește și înlocuiește TOATE aparițiile valorilor incorecte:

**TVA:** Înlocuiește `19%` cu `21%` în:
- Stat strip (rândul `<span className={styles.statNum}>19%</span>`)
- Card "TVA" din array-ul `carduri` — schimbă textul la: `"Cota standard de TVA este 21% (din august 2025). Există cote reduse de 11% (alimente, medicamente, turism, restaurante) și 9% (locuințe noi). Înregistrarea este obligatorie peste 395.000 lei/an."`

**Prag TVA:** Înlocuiește `300k` cu `395k` în stat strip.
Înlocuiește `300.000 lei` cu `395.000 lei` în card TVA.

**Card Impozit Profit:** Actualizează textul: `"Societățile comerciale (SRL, SA) plătesc 16% impozit pe profit. Microîntreprinderile plătesc 1% din cifra de afaceri (cotă unică din 2026). Plafonul de încadrare: 100.000 EUR/an."`

Adaugă imediat sub `<section className={styles.hero}>`, înainte de `<span className={styles.pill}>`, un banner de alertă fiscal urgent:

```tsx
<div style={{
  background: 'rgba(234, 179, 8, 0.15)',
  border: '1px solid rgba(234, 179, 8, 0.4)',
  borderRadius: '12px',
  padding: '12px 20px',
  marginBottom: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '0.875rem',
  color: '#78350f',
  backdropFilter: 'blur(8px)',
}}>
  <span style={{ fontSize: '1.1rem' }}>⏰</span>
  <span>
    <strong>Termen D212 cu bonificație 3%: 15 aprilie 2026</strong> — depune și plătește înainte de această dată pentru reducerea impozitului.{' '}
    <Link href="/ghiduri/d212-pfa" style={{ color: '#92400e', textDecoration: 'underline' }}>Ghid complet →</Link>
  </span>
</div>
```

---

### 1.2 — `lib/salary.ts` — Valori salariu minim și deducere

Înlocuiește complet funcția `calcSalariu` cu versiunea corectă 2026:

```typescript
export function calcSalariu(
  brutBaza: number,
  nrCopii = 0,
  pontaj = 21,
  zileLucratoare = 21,
  luna?: number // 1-12, dacă lipsește folosim media
): SalaryResult {
  const brut = Math.round(brutBaza * (pontaj / zileLucratoare));

  // Salariu minim dual 2026: 4050 lei ian-iun, 4325 lei iul-dec
  const lunaCalc = luna ?? new Date().getMonth() + 1;
  const salariuMinim = lunaCalc >= 7 ? 4325 : 4050;

  // CAS 25%
  const cas = Math.round(brut * 0.25);

  // CASS 10%
  const cass = Math.round(brut * 0.1);

  // Deducere personală 2026 (OUG 115/2023 actualizat)
  // Bază: 300 lei/lună dacă brut <= salariuMinim, scade liniar la 0 la brut = 2 * salariuMinim
  let deducereBase = 0;
  if (brut <= salariuMinim) {
    deducereBase = 300;
  } else if (brut <= salariuMinim * 2) {
    deducereBase = Math.max(
      0,
      Math.round(300 - (300 / salariuMinim) * (brut - salariuMinim))
    );
  }
  // +100 lei per copil în întreținere (2026)
  const deducereCopii = nrCopii * 100;
  const deducere = deducereBase + deducereCopii;

  const bazaImpozit = Math.max(0, brut - cas - cass - deducere);
  const impozit = Math.round(bazaImpozit * 0.1);
  const net = brut - cas - cass - impozit;

  // CAM angajator: 2.25%
  const camAngajator = Math.round(brut * 0.0225);
  const totalAngajator = brut + camAngajator;

  return { brut, cas, cass, deducere, bazaImpozit, impozit, net, camAngajator, totalAngajator };
}
```

Adaugă și constanta exportată:
```typescript
export const SALARIU_MINIM_2026 = {
  ianIun: 4050,
  iulDec: 4325,
  getSalariuMinim: () => new Date().getMonth() >= 6 ? 4325 : 4050,
};
```

---

### 1.3 — `app/calculator/CalculatorClient.tsx` — Corecturi calcule

**Variabila SMIN:** Înlocuiește `const SMIN = 4050;` cu:
```typescript
const getSMIN = () => new Date().getMonth() >= 6 ? 4325 : 4050;
const SMIN = getSMIN();
```

**Calculator Firmă — dividende:**
Găsește `const impDividende = divVal * 0.08;` și înlocuiește cu `const impDividende = divVal * 0.16;`
Găsește hint-ul `"Impozit dividende: 8% reținut la sursă (D205)"` și înlocuiește cu `"Impozit dividende: 16% reținut la sursă din 2026 (D205)"`
Găsește `label="Impozit dividende — 8%"` și înlocuiește cu `label="Impozit dividende — 16%"`

**Calculator Firmă — micro:**
Găsește `const cota = salVal >= 1 ? 0.01 : 0.03;` și înlocuiește cu `const cota = 0.01; // 2026: cotă unică 1%`
Șterge hint-ul `"0 salariați sau consultanță >20% CA → 3% | ≥1 salariat → 1%"`.
Adaugă hint nou: `"Din 2026: cotă unică 1% pentru toate microîntreprinderile. Eliminată cota de 3%. Plafonul: 100.000 EUR/an (≈510.000 lei)."`
Elimină butoanele de selecție număr salariați din secțiunea micro (nu mai are relevanță pentru cotă).

**Calculator TVA — plafonul:**
Înlocuiește `const PLAFON = 300_000;` cu `const PLAFON = 395_000;`
Actualizează textul din `infoBox`: `"Plafonul de înregistrare obligatorie în scopuri de TVA este 395.000 lei (cifra de afaceri din ultimele 12 luni, majorat de la 300.000 lei din septembrie 2025). La depășire, ești obligat să te înregistrezi în 10 zile."`
Actualizează `<Row label="Plafon înregistrare TVA" val="395.000 lei" />`

**Disclaimer final:** Actualizează la:
`"Calcul orientativ conform Legii 227/2015 (Cod fiscal) și modificărilor 2026. Salariu minim: 4.050 lei (ian-iun) / 4.325 lei (iul-dec). TVA standard: 21%. Consultați un contabil autorizat CECCAR pentru situația dvs. exactă."`

**Adaugă un tab nou "Crypto / Invest"** în array-ul `tabs`:
```typescript
{ id: "crypto", icon: "₿", label: "Crypto & Invest" },
```
Și adaugă `"crypto"` în tipul `Tab`: `type Tab = "salariu" | "pfa" | "firma" | "chirii" | "tva" | "crypto";`

Crează componenta `CalculatorCrypto` (detalii la Bloc 3).

---

### 1.4 — `app/api/chat/route.ts` — System prompt ANA actualizat

Înlocuiește complet `SYSTEM_PROMPT` cu:

```typescript
const SYSTEM_PROMPT = `Ești ANA, asistentul fiscal AI al platformei FocusTax.ro pentru România. Ești specializată în legislația fiscală română 2026.

VALORI FISCALE CORECTE 2026:
- TVA standard: 21% (din august 2025, anterior 19%)
- TVA redusă: 11% (alimente, medicamente, turism, restaurante), 9% (locuințe noi până iulie 2026)
- Prag înregistrare TVA: 395.000 lei/an (majorat din sept 2025 de la 300.000 lei)
- Impozit venit PF: 10%
- Impozit dividende: 16% (din 2026, anterior 8%)
- Impozit crypto/monede virtuale: 16% (din 2026, anterior 10%)
- Impozit acțiuni bursă (broker): 3% dacă deținere >365 zile / 6% dacă <365 zile (reținere la sursă)
- CAS angajat: 25% | CASS angajat: 10% | Impozit venit: 10% | CAM angajator: 2.25%
- Salariu minim 2026: 4.050 lei ian-iun / 4.325 lei iul-dec
- Deducere personală bază: 300 lei/lună (pentru salarii ≤ salariu minim) + 100 lei/copil
- Microîntreprinderi 2026: cotă unică 1% (eliminată cota 3%), plafon 100.000 EUR/an (≈510.000 lei)
- Impozit pe profit: 16%, impozit minim pe CA pentru firmele sub 16% efectiv
- CASS PFA: 10% din venit net, minim 10% × 6 salarii minime (2.430/2.595 lei), maxim 10% × 72 salarii minime
- CAS PFA: 25% opțional dacă venit net < 12 salarii minime, obligatoriu peste
- Bonificație D212: 3% reducere dacă depui și plătești până pe 15 APRILIE 2026 (nu 25 mai!)
- DAC8: din 2026 platformele crypto raportează automat tranzacțiile la ANAF
- Impozit imobile 2026: crescut semnificativ față de 2025 (în unele cazuri +150%)
- Impozit auto 2026: diferențiat pe normă Euro și cilindree; electrice: 40 lei/an fix

DECLARAȚII CHEIE:
- D212: anual, termen 25 mai (cu bonificație 3% dacă depui până 15 apr)
- D112: lunar, termen 25 ale lunii următoare
- D300 TVA: lunar sau trimestrial, termen 25
- D101: anual impozit profit, termen 25 martie
- D100: trimestrial (micro sau avansuri profit), termen 25 ale lunii după trimestru
- D168: înregistrare contracte chirii (obligatorie la ANAF)
- D394: declarație informativă livrări/achiziții — lunar/trimestrial

Răspunzi EXCLUSIV în română. Ești concisă, precisă, prietenoasă. Formatezi sumele cu bold. Specifici întotdeauna termenele legale. Când nu știi ceva sigur, spui "Verifică cu un consultant fiscal autorizat CCF/CECCAR".

Data curentă: ${new Date().toLocaleDateString("ro-RO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.`;
```

---

## BLOC 2 — UPGRADE PAGINI EXISTENTE

### 2.1 — `app/ghiduri/[slug]/page.tsx` și conținut ghiduri

#### Ghid Dividende (`/ghiduri/dividende/`)
Găsește sau creează fișierul de conținut pentru ghidul dividende. Actualizează complet cu:
- Titlu: "Dividende 2026: Cum se impozitează și ce declari la ANAF"
- Cota impozit dividende: **16%** (subliniez — nu 8%, nu 10%)
- Termen plată impozit: 25 ale lunii următoare distribuirii
- CASS pe dividende: dacă total venituri pasive (dividende + chirii + dobânzi) > 24.300 lei → plătești CASS 10% (min 2.430 lei, max 29.160 lei)
- Exemplu numeric complet: SRL cu profit 100.000 lei → impozit micro 1% = 1.000 lei → profit net 99.000 lei → distribui 80.000 dividende → impozit dividende 16% = 12.800 lei → net 67.200 lei
- Declarații necesare: D205 (reținut la sursă de firmă), D212 (proprietar dacă are CASS de plată)
- Notă bonificație: dacă primești dividende de la SRL propriu, verifică dacă trebuie D212 cu bonificație 15 apr

#### Ghid TVA (`/ghiduri/inregistrare-tva/`)
Actualizează toate referințele:
- Prag: 395.000 lei (nu 300.000 lei)
- Cota standard: 21%
- Cota alimente/medicamente/turism: 11%
- Adaugă secțiune: "TVA la încasare" (opțional pentru firme cu CA < 4.500.000 lei)
- Adaugă secțiune: "TVA intracomunitar" — ce se întâmplă la achiziții/livrări UE

#### Ghid SRL vs Micro (`/ghiduri/srl-vs-micro/`)
Actualizează:
- Micro 2026: 1% cotă unică (eliminat 3%)
- Prag micro: 100.000 EUR/an (coborât de la 500.000 EUR în 2026)
- Condiții micro 2026: CA ≤ 100.000 EUR, să fi depus situațiile financiare la timp, capital social > 0
- Adaugă: impozit minim pe CA pentru firmele la profit (pentru CA 1-5M lei: 0.4% CA minim)

---

### 2.2 — `app/noutati/page.tsx` — Noutăți fiscale

Adaugă în array-ul de noutăți (sau creează dacă nu există ca date statice) articolele noi în ordine cronologică descrescătoare:

```tsx
const noutati = [
  {
    categorie: "D212",
    luna: "Aprilie 2026",
    titlu: "Bonificație 3% la D212 — termen 15 aprilie 2026",
    text: "Contribuabilii care depun Declarația Unică D212 și plătesc integral impozitul și contribuțiile până pe 15 aprilie 2026 beneficiază de o reducere de 3% a impozitului datorat (OUG 8/2026). Atenție: românii care închiriază spații către firme NU pot beneficia de bonificație. Dacă ai depus deja D212 fără bonificație, poți depune declarație rectificativă.",
    tag: "urgent"
  },
  {
    categorie: "TVA",
    luna: "August 2025",
    titlu: "Cota standard TVA crește la 21%",
    text: "Începând cu 1 august 2025, cota standard de TVA a crescut de la 19% la 21%. Cota redusă pentru alimente, medicamente, turism și restaurante este acum 11% (anterior 9%). Rămâne la 9% doar pentru locuințe noi până la 31 iulie 2026.",
    tag: "important"
  },
  {
    categorie: "TVA",
    luna: "Septembrie 2025",
    titlu: "Plafonul de înregistrare TVA urcă la 395.000 lei",
    text: "De la 1 septembrie 2025, plafonul de înregistrare obligatorie în scopuri de TVA a crescut de la 300.000 lei la 395.000 lei. Firmele care au trecut de 300.000 lei dar sunt sub 395.000 lei pot solicita scoaterea din evidența TVA.",
    tag: "important"
  },
  {
    categorie: "Crypto",
    luna: "Ianuarie 2026",
    titlu: "Impozit crypto crește la 16% — DAC8 intră în vigoare",
    text: "Din 1 ianuarie 2026, câștigurile din tranzacții cu criptomonede se impozitează cu 16% (față de 10% anterior). Scutire: câștiguri sub 200 lei/tranzacție dacă totalul anual nu depășește 600 lei. Prin DAC8, toate platformele de tranzacționare sunt obligate să raporteze automat tranzacțiile utilizatorilor români la ANAF.",
    tag: "important"
  },
  {
    categorie: "Dividende",
    luna: "Ianuarie 2026",
    titlu: "Impozit dividende: 16% din 2026",
    text: "Impozitul pe dividende a crescut de la 8% la 16% începând cu 1 ianuarie 2026 (Legea 239/2025). Se reține la sursă de persoana juridică distribuitor. La nivel de acționar PF: dacă dividendele + alte venituri pasive depășesc 24.300 lei, se plătește și CASS.",
    tag: "important"
  },
  {
    categorie: "Microîntreprinderi",
    luna: "Ianuarie 2026",
    titlu: "Micro 2026: cotă unică 1%, plafon 100.000 EUR",
    text: "Din 2026, microîntreprinderile plătesc o cotă unică de 1% din CA (eliminată cota de 3%). Plafonul de încadrare a scăzut la 100.000 EUR/an (de la 500.000 EUR). Condiție nouă: firmele trebuie să fi depus situațiile financiare la timp pentru a accesa regimul.",
    tag: "important"
  },
  {
    categorie: "Impozite locale",
    luna: "Ianuarie 2026",
    titlu: "Impozit clădiri și auto — creșteri semnificative",
    text: "Impozitele pe proprietăți au crescut cu până la 150% față de 2025 în unele localități. Impozitul pe autoturisme este acum diferențiat după norma Euro și cilindree. Mașinile electrice plătesc o taxă fixă de 40 lei/an (față de 0 în 2025).",
    tag: "info"
  },
  {
    categorie: "Salariu minim",
    luna: "Iulie 2026",
    titlu: "Salariul minim crește la 4.325 lei de la 1 iulie 2026",
    text: "Salariul minim brut garantat în plată devine 4.325 lei/lună de la 1 iulie 2026 (de la 4.050 lei în primul semestru). Acest lucru afectează calculul CAS și CASS pentru PFA (plafonul minim de 6 salarii minime crește la 25.950 lei).",
    tag: "info"
  },
];
```

Adaugă un sistem de filtrare pe categorii în pagina de noutăți (butoane: Toate / TVA / Crypto / Dividende / Micro / Salariu / Impozite locale).

---

### 2.3 — `app/comparatii/` — Actualizare date comparative

În toate paginile de comparații (`/comparatii/tva/`, `/comparatii/impozit-venit/`, etc.):
- Actualizează cota TVA România de la 19% la 21%
- Actualizează nota: "Date actualizate 2025–2026. România a majorat TVA standard la 21% din august 2025."

---

### 2.4 — `app/manager/ai/page.tsx` — Actualizare suggestions

Înlocuiește array-ul `suggestions` cu:
```typescript
const suggestions = [
  "Cum calculez bonificația de 3% la D212?",
  "Care e plafonul TVA în 2026?",
  "Cât impozit plătesc pe crypto în 2026?",
  "Care e impozitul pe dividende acum?",
  "Cum calculez salariul net cu salariul minim nou?",
  "Ce declarații depun pentru chirii?",
];
```

---

## BLOC 3 — PAGINI ȘI FUNCȚIONALITĂȚI NOI

### 3.1 — Calculator Crypto & Investiții (tab nou în `/calculator/`)

Creează componenta `CalculatorCrypto` în `app/calculator/[tip]/calcs/CryptoCalc.tsx`:

```tsx
"use client";
import { useState, useEffect } from "react";
import styles from "../../page.module.css";

// Valori 2026
const SMIN_2026 = 4050; // ian-iun (conservativ)
const SCUTIRE_PER_TRANZACTIE = 200; // sub 200 lei/tranzacție = scutit
const SCUTIRE_TOTALA = 600; // dacă total anual < 600 lei, scutit complet
const COTA_CRYPTO = 0.16; // 16% din 2026
const COTA_ACTIUNI_LUNG = 0.03; // >365 zile
const COTA_ACTIUNI_SCURT = 0.06; // <365 zile
const COTA_DIVIDENDE = 0.16;
const PLAFON_CASS_MIN = SMIN_2026 * 6; // 24.300 lei
const PLAFON_CASS_MAX = SMIN_2026 * 72; // 291.600 lei
```

Componenta are 3 secțiuni cu tab-uri interne: **Crypto**, **Acțiuni bursă**, **Dividende**.

**Tab Crypto:**
- Input: "Câștig net total din crypto în 2025 (lei)" — câștiguri minus pierderi compensate
- Checkbox: "Am câștiguri individuale sub 200 lei/tranzacție cu total anual sub 600 lei" → dacă bifat, afișează "Scutit de impozit și declarare"
- Calcul: impozit = câștig net × 16%
- CASS: dacă câștig net > 24.300 lei → CASS 10% (min 2.430 lei, max 29.160 lei)
- Afișează: impozit datorat, CASS dacă e cazul, total de plătit, declarații necesare (D212, termen 25 mai / bonificație 15 apr)
- Notă: "Din 2026, ANAF primește automat rapoarte de la platformele de tranzacționare (DAC8). Declarați chiar dacă nu primiți notificare."

**Tab Acțiuni bursă (prin broker):**
- Input: "Câștig net acțiuni deținute > 365 zile (lei)" — impozit reținut la sursă 3%
- Input: "Câștig net acțiuni deținute < 365 zile (lei)" — impozit reținut la sursă 6%
- Info box: "Dacă câștigurile sunt prin broker autorizat, impozitul este reținut la sursă. Nu mai trebuie să-l declari tu, dar se ia în calcul pentru CASS."
- Calcul CASS dacă total > 24.300 lei
- Afișează: rezumat impozite reținute, CASS dacă e cazul, dacă trebuie D212 pentru CASS

**Tab Dividende:**
- Input: "Dividende primite brut în 2025 (lei)"
- Calcul: impozit 16% (reținut la sursă de firmă)
- CASS cumulat cu alte venituri
- Info: "Dacă firma ți-a reținut impozitul la sursă, nu mai trebuie să-l declari tu. Verifică totuși dacă datorezi CASS."

Adaugă în `CalculatorClient.tsx`:
```tsx
{tab === "crypto" && <CalculatorCrypto />}
```

---

### 3.2 — Pagina Calendar Fiscal Interactiv (`/calendar/`)

Creează `app/calendar/page.tsx` și `app/calendar/page.module.css`.

**Funcționalitate:**
1. Utilizatorul selectează profilul (checkboxuri multiple): `[ ] Angajat CIM`, `[ ] PFA`, `[ ] SRL / Micro`, `[ ] Proprietar cu chirii`, `[ ] Investitor (crypto/bursă/dividende)`.
2. Pe baza selecției, se afișează un calendar pe luni cu declarațiile relevante.
3. Fiecare declarație apare ca un card pe luna corespunzătoare, cu culori pe urgență (roșu = luna curentă, portocaliu = luna viitoare, gri = restul).

**Date hardcodate 2026 — termene principale:**
```typescript
const termene2026 = [
  // Q1
  { luna: 1, zi: 25, declaratie: "D112", titlu: "Salarii decembrie 2025", profile: ["angajat_srl"] },
  { luna: 1, zi: 25, declaratie: "D300", titlu: "TVA Q4 2025 (trimestrial)", profile: ["srl"] },
  { luna: 3, zi: 25, declaratie: "D101", titlu: "Impozit pe profit 2025", profile: ["srl_profit"] },
  // Termenul special bonificație
  { luna: 4, zi: 15, declaratie: "D212", titlu: "Declarația Unică 2025 (bonificație 3%)", profile: ["pfa", "chirii", "investitor"], urgent: true, badge: "BONIFICAȚIE 3%" },
  { luna: 4, zi: 25, declaratie: "D112", titlu: "Salarii martie 2026", profile: ["angajat_srl"] },
  { luna: 4, zi: 25, declaratie: "D100", titlu: "Impozit micro T1 2026", profile: ["srl"] },
  { luna: 5, zi: 25, declaratie: "D212", titlu: "Declarația Unică 2025 (termen normal)", profile: ["pfa", "chirii", "investitor"] },
  { luna: 7, zi: 25, declaratie: "D100", titlu: "Impozit micro T2 2026", profile: ["srl"] },
  { luna: 10, zi: 25, declaratie: "D100", titlu: "Impozit micro T3 2026", profile: ["srl"] },
  // lunare repeat pentru D112, D300
];
```

**Design:** Grid 3×4 cu lunile anului. Fiecare celulă = o lună cu lista de termene filtrate. Stil liquid glass. Celula lunii curente are border colorat.

**Buton "Adaugă în Google Calendar":** pentru fiecare termen, generează un link `https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=...` cu data corectă.

Adaugă link-ul `/calendar/` în Navbar între Sisteme și Noutăți.

---

### 3.3 — Pagina Ghid D212 Interactiv (`/ghiduri/d212-ghid-completare/`)

Creează `app/ghiduri/d212-ghid-completare/page.tsx`.

**Structură step-by-step:**
- Step 0: "Alege tipul veniturilor tale" — checkboxuri: PFA sistem real / PFA normă de venit / Chirii / Crypto & Investiții / Venituri din străinătate
- Step 1 (dinamic pe baza selecției): explică ce capitole din D212 completezi
- Step 2: Calculator bonificație — "Câți bani economisești dacă depui până pe 15 apr?"
  - Input: venit net estimat → calcul impozit → calcul 3% bonificație → afișare economie în lei
- Step 3: Checklist pre-depunere (bifezi pe rând): cont SPV activ / CIF/CNP corect / semnătură electronică disponibilă / sume calculate corect
- Step 4: Link direct la `https://efactura.mfinante.gov.ro/` (sau SPV ANAF) cu instrucțiuni

Componenta este `"use client"` cu `useState` pentru step curent. Butoane Înapoi/Înainte. Progress bar deasupra.

**Calculator bonificație (embeddable în pagină):**
```tsx
function CalculatorBonificatie() {
  const [venitNet, setVenitNet] = useState("");
  // calcul: impozit brut = venitNet * 0.1; bonificatie = impozit * 0.03; economia = bonificatie
  // Afișează: "Depunând până pe 15 apr 2026, economisești X lei din impozitul de Y lei"
}
```

---

### 3.4 — Pagina Impozite Locale 2026 (`/ghiduri/impozite-locale-2026/`)

Creează `app/ghiduri/impozite-locale-2026/page.tsx`.

**Secțiunea 1 — Calculator Impozit Clădiri:**
```tsx
function CalculatorImpozitCladire() {
  // Inputs:
  // - Valoare impozabilă (lei) — din actul de proprietate sau evaluare primărie
  // - Tip clădire: Reședință principală / Altă clădire rezidențială / Clădire nerezidențială
  // - An construcție (pentru calculul vechimii)
  
  // Calcul 2026 (rate orientative — variază pe localitate):
  // Rezidențiale: 0.08% - 0.2% din valoarea impozabilă (orientativ)
  // Nerezidențiale: 0.2% - 1.3%
  // Notă importantă: din 2027 se va folosi valoarea de piață reală (e-Proprietatea)
  
  // Afișează: impozit estimat anual, comparație cu 2025 (-50%? variabil pe localitate)
  // Disclaimer clar: valorile exacte se obțin de la primăria ta
}
```

**Secțiunea 2 — Calculator Impozit Auto:**
```tsx
function CalculatorImpozitAuto() {
  // Inputs:
  // - Norma Euro: Non-Euro / Euro 1 / Euro 2 / Euro 3 / Euro 4 / Euro 5 / Euro 6 / Electric/Hibrid
  // - Cilindree (cm³): slider sau input
  
  // Calcul 2026 bazat pe grila oficială (tarifele per 200cm³ din Legea 239/2025):
  const tarifeEuro = {
    "non_euro": { base: 30, per200: 15 }, // exemple orientative
    "euro1": { base: 25, per200: 12 },
    "euro2": { base: 20, per200: 10 },
    "euro3": { base: 18, per200: 8 },
    "euro4": { base: 12, per200: 6 },
    "euro5": { base: 8, per200: 4 },
    "euro6": { base: 6, per200: 3 },
    "electric": { fixed: 40 }, // 40 lei fix
  };
  // Afișează impozit estimat + comparație cu 2025
}
```

Adaugă aceste ghiduri în `app/ghiduri/page.tsx` în secțiunea "Persoane Fizice".

---

### 3.5 — Pagina Facilități Fiscale Sectoriale (`/ghiduri/facilitati-fiscale/`)

Creează `app/ghiduri/facilitati-fiscale/page.tsx`.

**Conținut:**

#### IT (Scutire impozit venit 10%)
Condiții cumulative:
1. Angajat pe CIM cu funcție IT eligibilă (lista ANAF — include programatori, analiști, QA, etc.)
2. Angajatorul desfășoară activitate de creare programe (CAEN 6201, 6202, 6209, etc.)
3. Studii superioare finalizate (diplomă de licență sau echivalent)
4. Salariul brut realizat ≥ salariul minim

Calculator comparativ: "Salariu net cu facilitate IT vs. fără facilitate"
```tsx
// Input: salariu brut
// Cu facilitate: net = brut - CAS 25% - CASS 10% (fără impozit 10%)
// Fără facilitate: net normal
// Afișează diferența lunară și anuală
```

#### Construcții (Contribuții reduse)
- Scutire impozit venit 10%
- CAS redus: angajatul plătește 21.25% (nu 25%)
- CASS: 10% normal dar baza de calcul diferită
- Condiție: angajatorul realizează ≥80% venituri din activitate de construcții

#### Agricultură
- Scutire impozit venit 10%
- Condiție: angajatorul realizează ≥80% venituri din activitate agricolă sau industrie alimentară

---

### 3.6 — Simulator Comparativ Forme Juridice (`/calculator/forme-juridice/`)

Aceasta este pagina flagship cea mai importantă. Creează `app/calculator/forme-juridice/page.tsx`.

**Un singur input:** "Venit brut anual estimat (lei)" + "Cheltuieli deductibile anuale (lei)" (opțional).

**Afișează simultan 5 coloane comparative:**

```
| Angajat CIM | PFA real | PFA normă | SRL Micro 1% | SRL Profit 16% |
|-------------|----------|-----------|--------------|----------------|
| Net lunar   | Net anual| Net anual | Net (după div)| Net (după div)|
| % taxare    | % taxare | % taxare  | % taxare     | % taxare       |
| [detalii]   | [detalii]| [detalii] | [detalii]    | [detalii]      |
```

**Calculele pentru fiecare formă (folosind valorile 2026 corecte):**

Angajat CIM:
- brut = input
- cas = brut × 25%
- cass = brut × 10%
- deducere = min(300, max(0, 300 × (1 - (brut - 4050) / 4050)))
- impozit = max(0, (brut - cas - cass - deducere)) × 10%
- net = brut - cas - cass - impozit
- cost_angajator = brut × 1.0225

PFA sistem real:
- venit_net = input - cheltuieli
- SMIN = 4050 (sau 4325 din iulie)
- cass = min(max(venit_net × 10%, SMIN × 6 × 10%), SMIN × 72 × 10%)
- cas = venit_net > SMIN × 12 ? venit_net × 25% : optional (calculăm cu 0 pentru PFA nou)
- impozit = (venit_net - cas - cass) × 10%
- net_anual = venit_net - cas - cass - impozit

PFA normă de venit:
- Normă generică orientativă: 50.000 lei/an (afișăm că variază pe județ/CAEN)
- Taxe pe normă, indiferent de cât câștigă
- Avantaj dacă venit_real > normă; dezavantaj dacă venit_real < normă

SRL Micro 1%:
- impozit_firma = ca × 1%
- profit_net = ca - impozit_firma (simplificat, fără cheltuieli)
- dividende = profit_net (assume totul distribuit)
- impozit_div = dividende × 16%
- net_proprietar = dividende - impozit_div
- Notă: trebuie salariu minim dacă vrei să fii angajat în propria firmă → adaugă CAS/CASS pe salariu minim

SRL Profit 16%:
- cheltuieli_input = cheltuieli (sau default 30% din CA pentru servicii)
- profit_brut = ca - cheltuieli_input
- impozit = profit_brut × 16% (cu impozit minim pe CA dacă impozit < CA × 0.005)
- profit_net = profit_brut - impozit
- dividende = profit_net
- impozit_div = dividende × 16%
- net_proprietar = dividende - impozit_div

**Design:** Cards side-by-side cu highlight pe cel mai avantajos (cel cu net maxim = border verde). Mobile: tabs cu select dropdown. Buton "Explică-mi diferențele → ANA" care deschide chat cu ANA pre-populat cu contextul calculat.

---

### 3.7 — Glosar Fiscal (`/glosar/`)

Creează `app/glosar/page.tsx` cu 60+ termeni fiscali explicați în 2-3 propoziții.

**Date statice** — array `termeni` cu:
```typescript
interface TermenFiscal {
  termen: string;
  definitie: string;
  exemplu?: string;
  linkUri?: string; // link spre ghid relevant
}
```

Include obligatoriu (lista minimă):
ANAF, SPV, e-Factura, RO e-VAT, RO e-Transport, UIT, DAC8, CAS, CASS, CAM, TVA, cota standard, cota redusă, plafon TVA, TVA la încasare, PFA, II (Întreprindere Individuală), SRL, microîntreprindere, impozit pe profit, impozit pe venit, impozit pe dividende, D212, D112, D300, D101, D100, D394, D168, deducere personală, salariu minim, salariu brut, salariu net, normă de venit, sistem real, cheltuieli deductibile, bonificație fiscală, CIF, CNP, SPV, certificat digital, semnătură electronică, CECCAR, CCF, impozit minim pe CA, PNRR, OCDE, DAC8, criptomonede fiscal, câștig de capital, deducere forfetară, impozit local, valoare impozabilă, registru fiscal, control fiscal, inspecție fiscală, penalitate, dobândă fiscală, imprescriptibil, solidaritate fiscală.

**Funcție de căutare** în timp real (filter pe termen). Grupare alfabetică (A, B, C... litere ca separatoare).

Adaugă `/glosar/` în footer și în Navbar (dropdown din Ghiduri sau link separat).

---

## BLOC 4 — UPGRADE MANAGER

### 4.1 — `app/manager/page.tsx` — Dashboard îmbunătățit

Adaugă widget "Termene ANAF" în dashboard:
```tsx
const termeneApropiateAzi = [
  // calculezi dinamic față de new Date()
  // afișezi maxim 3 termene cele mai apropiate, cu număr de zile rămase
];
```

Widget design: card glass-md cu titlu "📅 Termene ANAF", lista cu fiecare termen pe un rând: `[declaratie] — [descriere] — [zile rămase] zile`.

Dacă sunt ≤5 zile: rândul are background roșu-transparent.
Dacă sunt ≤15 zile: portocaliu-transparent.
Altfel: verde-transparent.

---

### 4.2 — `app/manager/tva/page.tsx` — Corecturi TVA

Înlocuiește `const plafonAnual = 300000;` cu `const plafonAnual = 395000;`

Adaugă selector cotă TVA pentru facturi noi:
```typescript
const coteDisponibile = [
  { label: "21% — standard", val: 21 },
  { label: "11% — redusă (alimente, medicamente, turism)", val: 11 },
  { label: "9% — redusă (locuințe noi)", val: 9 },
  { label: "5% — redusă (cărți, locuințe sociale)", val: 5 },
  { label: "0% — scutit cu drept de deducere", val: 0 },
];
```

---

## BLOC 5 — SEO ȘI METADATA

### 5.1 — Metadata pentru paginile noi

Pentru fiecare pagină nouă creată, adaugă export `metadata` corect:

```typescript
// /calendar/
export const metadata: Metadata = {
  title: "Calendar Fiscal 2026 | Termene Declarații ANAF | FocusTax",
  description: "Calendar interactiv cu toate termenele fiscale 2026. Personalizat pe profilul tău: PFA, SRL, chirii, investiții. Includ termene D212, D300, D112.",
  openGraph: { title: "Calendar Fiscal 2026", ... }
};

// /calculator/forme-juridice/
export const metadata: Metadata = {
  title: "Compară Forme Juridice 2026: Angajat vs PFA vs SRL | FocusTax",
  description: "Simulator fiscal gratuit: compară venitul net pentru angajat CIM, PFA sistem real, PFA normă, SRL micro și SRL profit în 2026. Valori actualizate.",
};

// /glosar/
export const metadata: Metadata = {
  title: "Glosar Fiscal România 2026 | Termeni Explicați | FocusTax",
  description: "60+ termeni fiscali explicați simplu: ANAF, TVA, CAS, CASS, PFA, SRL, microîntreprindere, e-Factura, D212 și mulți alții.",
};

// /ghiduri/impozite-locale-2026/
export const metadata: Metadata = {
  title: "Impozite Locale 2026 România: Clădiri și Mașini | FocusTax",
  description: "Calculator impozit clădiri și autoturisme 2026. Creșteri semnificative față de 2025. Normă Euro, cilindree, tip proprietate.",
};
```

### 5.2 — Structured Data (JSON-LD) pe pagini ghiduri

Pe fiecare pagină de ghid adaugă FAQPage schema pentru top 3 întrebări frecvente. Exemplu pentru ghidul TVA:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Care este plafonul de înregistrare TVA în 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Plafonul de înregistrare obligatorie în scopuri de TVA în 2026 este de 395.000 lei (cifra de afaceri din ultimele 12 luni), majorat de la 300.000 lei în septembrie 2025."
        }
      },
      {
        "@type": "Question",
        "name": "Care este cota standard TVA în 2026 în România?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cota standard de TVA în România este 21% din august 2025 (anterior 19%). Există cote reduse de 11% pentru alimente, medicamente și turism, și 9% pentru locuințe noi."
        }
      }
    ]
  })}}
/>
```

### 5.3 — Actualizare `sitemap.ts`

Adaugă în `app/sitemap.ts` toate URL-urile noi:
```typescript
"/calendar",
"/calculator/forme-juridice",
"/glosar",
"/ghiduri/impozite-locale-2026",
"/ghiduri/facilitati-fiscale",
"/ghiduri/d212-ghid-completare",
```

---

## BLOC 6 — NAVBAR ȘI NAVIGARE

### 6.1 — Actualizare `components/Navbar.tsx`

Adaugă în navigare:
- `Calendar` (link `/calendar/`) între `Sisteme` și `Noutăți`
- `Glosar` (link `/glosar/`) lângă Contact sau în footer

Actualizează și footer-ul (`components/Footer.tsx`) cu link-uri noi în secțiunea "Link-uri rapide":
- Calendar Fiscal → `/calendar/`
- Compară forme juridice → `/calculator/forme-juridice/`
- Glosar Fiscal → `/glosar/`
- Impozite locale 2026 → `/ghiduri/impozite-locale-2026/`

---

## BLOC 7 — NOTE TEHNICE IMPORTANTE

### 7.1 — Reguli care trebuie respectate obligatoriu

1. **Toate componentele interactive** (useState, useEffect, event handlers) trebuie să aibă `"use client";` la prima linie.

2. **Toate paginile noi** cu rute statice (fără parametri dinamici) funcționează direct. Dacă ai rute dinamice `[slug]`, adaugă `generateStaticParams()`.

3. **Nu folosi localStorage direct** în componente fără verificare `typeof window !== 'undefined'` sau fără wrapper `"use client"`.

4. **CSS Modules:** fiecare pagină nouă are propriul `.module.css`. Folosiți clasele design system existente din `globals.css`: `glass-sm`, `glass-md`, `glass-lg` pentru carduri, plus culorile din variabilele CSS dacă există.

5. **Design consistent:** respectați fonturile existente (Montserrat pentru headings via `--font-montserrat`, Open Sans pentru body via `--font-open-sans`), fundalul body existent, și stilul liquid glass al cardurilor.

6. **Formatare numere:** folosiți întotdeauna `.toLocaleString("ro-RO")` pentru sume în lei, cu opțiunea `maximumFractionDigits: 0` pentru sume întregi.

7. **Disclaimer fiscal:** TOATE paginile cu calculatoare sau valori numerice trebuie să aibă un disclaimer vizibil: "Calcul orientativ. Nu substituie consultanță fiscală autorizată CCF/CECCAR. Valorile exacte pot varia."

8. **Actualizare `app/sitemap.ts`** cu toate URL-urile noi (vezi Bloc 5.3).

9. **Vercel deployment:** proiectul este deployed pe Vercel. Project ID: `prj_L1aOnsiOY7nHoMbTZYPWqTICOS5D`. Nu schimba configurația `next.config.mjs`.

10. **Supabase:** tabelele existente sunt `facturi`, `angajati`, `companies`, `sessions`, `tranzactii`. Nu crea tabele noi fără instrucțiuni Supabase specifice. Conținutul nou (ghiduri, glosar, noutăți) este static în cod.

### 7.2 — Ordinea de implementare recomandată

1. **PRIMUL:** Corecturi urgente (Bloc 1) — valorile greșite TVA 19%→21%, dividende 8%→16%, salariu minim, plafonul TVA
2. **AL DOILEA:** Actualizare system prompt ANA (Bloc 1.4)
3. **AL TREILEA:** Calculator Crypto tab nou (Bloc 3.1)
4. **AL PATRULEA:** Pagina noutăți actualizată (Bloc 2.2)
5. **AL CINCILEA:** Simulator forme juridice (Bloc 3.6) — flagship
6. **AL ȘASELEA:** Calendar fiscal (Bloc 3.2)
7. **AL ȘAPTELEA:** Ghid D212 interactiv (Bloc 3.3)
8. **AL OPTULEA:** Glosar fiscal (Bloc 3.7)
9. **AL NOULEA:** Restul ghidurilor noi (Bloc 3.4, 3.5)
10. **ULTIMUL:** SEO / metadata / JSON-LD / sitemap (Bloc 5)

---

## REZUMAT VALORI FISCALE CORECTE 2026 — REFERINȚĂ RAPIDĂ

| Parametru | Valoare GREȘITĂ (pe site acum) | Valoare CORECTĂ 2026 |
|-----------|-------------------------------|----------------------|
| TVA standard | 19% | **21%** (din aug 2025) |
| TVA alimente/medicamente/turism | 9% | **11%** |
| Prag înregistrare TVA | 300.000 lei | **395.000 lei** (din sept 2025) |
| Impozit dividende | 8% | **16%** (din ian 2026) |
| Impozit crypto | 10% | **16%** (din ian 2026) |
| Cota micro (fără angajat) | 3% | **1%** (cotă unică din 2026) |
| Plafon micro | 500.000 EUR | **100.000 EUR** (din 2026) |
| Salariu minim | 4.050 lei fix | **4.050 ian-iun / 4.325 iul-dec** |
| Deducere personală bază | 600 lei | **300 lei** (la salariu minim) |
| Deducere per copil | 300 lei | **100 lei** |
| Impozit acțiuni >365 zile | 1% | **3%** (prin broker, reținere sursă) |
| Impozit acțiuni <365 zile | 3% | **6%** (prin broker, reținere sursă) |
| Termen D212 cu bonificație | nu exista | **15 APRILIE 2026** (bonificație 3%) |
| Termen D212 normal | 25 mai | **25 mai 2026** |

Toate informațiile sunt conform: Legea 227/2015 (Cod fiscal), Legea 239/2025 (pachete fiscale 1+2), OUG 8/2026 (bonificație D212), OUG 71/2025 (DAC8 cripto).
