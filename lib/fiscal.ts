/**
 * Motorul fiscal FocusTax — singura sursă pentru cote, plafoane și formule.
 * Toate calculatoarele, ghidurile și asistentul AI citesc valorile de aici.
 *
 * Reguli 2026 (Legea 227/2015 — Cod fiscal, cu modificările din 2025–2026):
 * - Salariu minim brut: 4.050 lei (ian–iun 2026), 4.325 lei (iul–dec 2026, HG 146/2026)
 * - Pentru CAS/CASS la venituri din afara salariilor se folosește salariul minim
 *   în vigoare la 1 ianuarie al anului (4.050 lei pentru tot 2026)
 * - Suma neimpozabilă la salariul minim: 300 lei (ian–iun 2026, brut ≤ 4.300),
 *   200 lei (iul–dec 2026, brut ≤ 4.600) — OUG 89/2025
 */

// ─── Cote ──────────────────────────────────────────────────────────────

export const COTE = {
  CAS: 0.25,
  CASS: 0.10,
  IMPOZIT_VENIT: 0.10,
  CAM: 0.0225,
  DIVIDENDE: 0.16,
  CRYPTO: 0.16,
  MICRO: 0.01,
  PROFIT: 0.16,
  /** IMCA — doar pentru CA > 50 mil. EUR, 0,5% în 2026, eliminat din 2027 */
  IMCA_2026: 0.005,
  TVA_STANDARD: 0.21,
  TVA_REDUSA: 0.11,
  /** Deducere forfetară la chirii (art. 84, din 2024) */
  DEDUCERE_CHIRII: 0.20,
} as const;

/** Cotele TVA afișate în calculatoare și la facturare */
export const COTE_TVA = [
  { val: 21, label: "21% — cota standard" },
  { val: 11, label: "11% — cota redusă (alimente, cazare, restaurante, cărți, medicamente)" },
  { val: 0,  label: "0% — scutit cu drept de deducere (export, livrări intracomunitare)" },
] as const;

// ─── Plafoane ──────────────────────────────────────────────────────────

export const PLAFOANE = {
  /** Înregistrare obligatorie în scopuri de TVA (din 1 sept. 2025) */
  TVA_INREGISTRARE: 395_000,
  /** Plafon microîntreprindere (din 2026) */
  MICRO_EUR: 100_000,
  /** Prag IMCA */
  IMCA_EUR: 50_000_000,
  /** Curs orientativ EUR/RON folosit pentru conversia plafoanelor în calculatoare */
  CURS_EUR: 5.1,
  /** Scutire crypto: câștig sub 200 lei/tranzacție, dacă totalul anual ≤ 600 lei */
  CRYPTO_TRANZACTIE: 200,
  CRYPTO_ANUAL: 600,
} as const;

/** Plafonul pentru aplicarea sistemului TVA la încasare (OUG 8/2026) */
export function plafonTvaIncasare(an: number): number {
  if (an >= 2027) return 5_500_000;
  return 5_000_000;
}

// ─── Salariul minim ────────────────────────────────────────────────────

/** Istoricul salariului minim brut; ultima valoare rămâne în vigoare până la o nouă HG. */
const ISTORIC_SALARIU_MINIM: { de_la: string; valoare: number }[] = [
  { de_la: "2025-01-01", valoare: 4050 },
  { de_la: "2026-07-01", valoare: 4325 },
];

/** Salariul minim brut în vigoare la o anumită dată */
export function salariuMinim(data: Date = new Date()): number {
  const iso = data.toISOString().slice(0, 10);
  let val = ISTORIC_SALARIU_MINIM[0].valoare;
  for (const p of ISTORIC_SALARIU_MINIM) if (p.de_la <= iso) val = p.valoare;
  return val;
}

/** Salariul minim folosit pentru CAS/CASS la venituri din afara salariilor: cel de la 1 ianuarie */
export function salariuMinimAnual(an: number = new Date().getFullYear()): number {
  return salariuMinim(new Date(Date.UTC(an, 0, 1)));
}

/** Suma lunară scutită de impozit și contribuții pentru angajații plătiți cu salariul minim */
export function sumaNeimpozabila(data: Date = new Date()): { suma: number; plafonBrut: number } {
  const iso = data.toISOString().slice(0, 10);
  if (iso < "2026-01-01") return { suma: 300, plafonBrut: 4300 };
  if (iso < "2026-07-01") return { suma: 300, plafonBrut: 4300 };
  if (iso < "2027-01-01") return { suma: 200, plafonBrut: 4600 };
  return { suma: 0, plafonBrut: 0 };
}

const lei = (n: number) => Math.round(n);

// ─── Salariu ───────────────────────────────────────────────────────────

/** Procentul de bază din salariul minim, după numărul de persoane în întreținere (art. 77) */
const PROCENT_DEDUCERE = [20, 25, 30, 35, 45];

/**
 * Deducerea personală de bază (art. 77 Cod fiscal): procent din salariul minim,
 * scade cu 0,5 puncte pentru fiecare tranșă de 50 lei peste salariul minim,
 * se anulează peste salariul minim + 2.000 lei.
 */
export function deducerePersonala(brut: number, persoaneIntretinere: number, smin: number): number {
  if (brut > smin + 2000) return 0;
  const baza = PROCENT_DEDUCERE[Math.min(Math.max(persoaneIntretinere, 0), 4)];
  const transe = brut <= smin ? 0 : Math.ceil((brut - smin) / 50);
  const procent = baza - transe * 0.5;
  return procent > 0 ? lei((procent / 100) * smin) : 0;
}

export interface OptiuniSalariu {
  /** Persoane în întreținere (copii, soț/soție fără venituri etc.) */
  persoaneIntretinere?: number;
  /** Copii minori înscriși într-o unitate de învățământ (+100 lei/copil, deducere suplimentară) */
  copiiScoala?: number;
  /** Angajat sub 26 de ani (+15% din salariul minim, dacă brut ≤ salariu minim + 2.000) */
  sub26?: boolean;
  /** Salariul de bază e egal cu salariul minim și norma e întreagă (pentru suma neimpozabilă) */
  laSalariulMinim?: boolean;
  data?: Date;
}

export interface RezultatSalariu {
  brut: number;
  sumaNeimpozabila: number;
  cas: number;
  cass: number;
  deducere: number;
  bazaImpozit: number;
  impozit: number;
  net: number;
  cam: number;
  costTotal: number;
  salariuMinim: number;
}

export function calcSalariu(brut: number, opt: OptiuniSalariu = {}): RezultatSalariu {
  const data = opt.data ?? new Date();
  const smin = salariuMinim(data);
  const { suma, plafonBrut } = sumaNeimpozabila(data);
  const scutit = opt.laSalariulMinim !== false && brut <= plafonBrut && brut >= smin ? suma : 0;
  const bazaContributii = Math.max(0, brut - scutit);

  const cas = lei(bazaContributii * COTE.CAS);
  const cass = lei(bazaContributii * COTE.CASS);

  let deducere = deducerePersonala(brut, opt.persoaneIntretinere ?? 0, smin);
  if (opt.sub26 && brut <= smin + 2000) deducere += lei(0.15 * smin);
  deducere += (opt.copiiScoala ?? 0) * 100;

  const bazaImpozit = Math.max(0, bazaContributii - cas - cass - deducere);
  const impozit = lei(bazaImpozit * COTE.IMPOZIT_VENIT);
  const net = brut - cas - cass - impozit;
  const cam = lei(bazaContributii * COTE.CAM);

  return {
    brut, sumaNeimpozabila: scutit, cas, cass, deducere, bazaImpozit, impozit, net,
    cam, costTotal: brut + cam, salariuMinim: smin,
  };
}

/** Brutul necesar pentru un net dorit (căutare binară pe calcSalariu) */
export function brutDinNet(netDorit: number, opt: OptiuniSalariu = {}): number {
  let lo = 0, hi = Math.max(1, netDorit * 2.5);
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (calcSalariu(mid, opt).net < netDorit) lo = mid; else hi = mid;
  }
  return Math.ceil(hi);
}

// ─── PFA / activități independente ─────────────────────────────────────

export interface RezultatPfa {
  venitNet: number;
  cas: number;
  bazaCas: number;
  cass: number;
  bazaCass: number;
  impozit: number;
  totalTaxe: number;
  ramas: number;
  smin: number;
}

/**
 * PFA în sistem real sau la normă (venitNet = norma de venit).
 * CAS: obligatoriu peste 12 salarii minime, la baza de 12 sau 24 salarii minime.
 * CASS: 10% din venitul net, între 6 și 72 salarii minime (2026).
 * Impozit: 10% din venitul net minus CAS și CASS.
 */
export function calcPfa(venitNet: number, opt: { an?: number; casOptional?: boolean; asiguratAltfel?: boolean } = {}): RezultatPfa {
  const an = opt.an ?? new Date().getFullYear();
  const s = salariuMinimAnual(an);
  const v = Math.max(0, venitNet);

  let bazaCas = 0;
  if (v >= 24 * s) bazaCas = 24 * s;
  else if (v >= 12 * s) bazaCas = 12 * s;
  else if (opt.casOptional) bazaCas = 12 * s;
  const cas = lei(bazaCas * COTE.CAS);

  const plafonMaxCass = (an >= 2026 ? 72 : 60) * s;
  const minCass = opt.asiguratAltfel ? 0 : 6 * s;
  const bazaCass = Math.min(Math.max(v, minCass), plafonMaxCass);
  const cass = lei(bazaCass * COTE.CASS);

  const impozit = lei(Math.max(0, v - cas - cass) * COTE.IMPOZIT_VENIT);
  const totalTaxe = cas + cass + impozit;
  return { venitNet: v, cas, bazaCas, cass, bazaCass, impozit, totalTaxe, ramas: v - totalTaxe, smin: s };
}

// ─── Venituri pasive: dividende, chirii, crypto, investiții ───────────

/**
 * CASS pe venituri din afara activităților independente și salariilor
 * (dividende, chirii, crypto, dobânzi): bază fixă în trepte de 6 / 12 / 24 salarii minime.
 */
export function cassVenituriPasive(venitTotal: number, an: number = new Date().getFullYear()): { cass: number; baza: number; treapta: 0 | 6 | 12 | 24 } {
  const s = salariuMinimAnual(an);
  if (venitTotal < 6 * s) return { cass: 0, baza: 0, treapta: 0 };
  const treapta = venitTotal < 12 * s ? 6 : venitTotal < 24 * s ? 12 : 24;
  const baza = treapta * s;
  return { cass: lei(baza * COTE.CASS), baza, treapta };
}

export function calcDividende(brut: number, alteVenituriPasive = 0, an?: number) {
  const impozit = lei(brut * COTE.DIVIDENDE);
  const net = brut - impozit;
  const { cass, baza, treapta } = cassVenituriPasive(brut + alteVenituriPasive, an);
  return { brut, impozit, net, cass, bazaCass: baza, treapta, ramas: net - cass };
}

export function calcChirii(chirieAnuala: number, alteVenituriPasive = 0, an?: number) {
  const deducere = lei(chirieAnuala * COTE.DEDUCERE_CHIRII);
  const venitNet = chirieAnuala - deducere;
  const impozit = lei(venitNet * COTE.IMPOZIT_VENIT);
  const { cass, baza, treapta } = cassVenituriPasive(venitNet + alteVenituriPasive, an);
  const totalTaxe = impozit + cass;
  return { chirieAnuala, deducere, venitNet, impozit, cass, bazaCass: baza, treapta, totalTaxe, ramas: chirieAnuala - totalTaxe };
}

export function calcCrypto(castig: number, alteVenituriPasive = 0, an?: number) {
  const c = Math.max(0, castig);
  const scutit = c <= PLAFOANE.CRYPTO_ANUAL;
  const impozit = scutit ? 0 : lei(c * COTE.CRYPTO);
  const { cass, baza, treapta } = cassVenituriPasive(c + alteVenituriPasive, an);
  return { castig: c, scutit, impozit, cass, bazaCass: baza, treapta, totalTaxe: impozit + cass, ramas: c - impozit - cass };
}

// ─── Firme ─────────────────────────────────────────────────────────────

export function calcMicro(cifraAfaceri: number) {
  const impozit = lei(cifraAfaceri * COTE.MICRO);
  const depasestePlafon = cifraAfaceri > PLAFOANE.MICRO_EUR * PLAFOANE.CURS_EUR;
  return { impozit, depasestePlafon };
}

export function calcImpozitProfit(profit: number, cifraAfaceri: number, an: number = new Date().getFullYear()) {
  const impozitProfit = lei(Math.max(0, profit) * COTE.PROFIT);
  const supusImca = an <= 2026 && cifraAfaceri > PLAFOANE.IMCA_EUR * PLAFOANE.CURS_EUR;
  const imca = supusImca ? lei(cifraAfaceri * COTE.IMCA_2026) : 0;
  return { impozit: Math.max(impozitProfit, imca), impozitProfit, imca };
}

// ─── TVA ───────────────────────────────────────────────────────────────

export function tvaDinNet(net: number, cota: number) {
  const tva = net * (cota / 100);
  return { net, tva, brut: net + tva };
}

export function tvaDinBrut(brut: number, cota: number) {
  const net = brut / (1 + cota / 100);
  return { net, tva: brut - net, brut };
}

// ─── Formatare ─────────────────────────────────────────────────────────

export const fmtLei = (n: number) => n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
export const fmtLeiDec = (n: number) => n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
