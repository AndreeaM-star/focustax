/**
 * Romanian salary calculator — 2026 rules
 * CAS: 25% angajat | CASS: 10% angajat | Impozit: 10% | CAM: 2.25% angajator
 */
export interface SalaryResult {
  brut: number;
  cas: number;
  cass: number;
  deducere: number;
  bazaImpozit: number;
  impozit: number;
  net: number;
  camAngajator: number;
  totalAngajator: number;
}

export function calcSalariu(
  brutBaza: number,
  nrCopii = 0,
  pontaj = 21,
  zileLucratoare = 21,
  luna?: number // 1-12, dacă lipsește folosim luna curentă
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

export const SALARIU_MINIM_2026 = {
  ianIun: 4050,
  iulDec: 4325,
  getSalariuMinim: () => new Date().getMonth() >= 6 ? 4325 : 4050,
};

/**
 * Calculeaza TVA datorat:  colectat - deductibil
 */
export function calcTVA(colectat: number, deductibil: number): number {
  return Math.max(0, colectat - deductibil);
}

/**
 * Calculeaza procentul din plafonul TVA anual (395.000 lei)
 */
export function calcPlafonTVA(
  cifraDeAfaceri: number,
  plafon = 395000
): number {
  return Math.min(100, Math.round((cifraDeAfaceri / plafon) * 100));
}

/**
 * Genereaza numarul urmator de factura
 */
export function nextInvoiceNumber(lastNumber: string): string {
  const year = new Date().getFullYear();
  const match = lastNumber.match(/(\d+)$/);
  if (!match) return `F${year}-0001`;
  const n = parseInt(match[1], 10) + 1;
  return `F${year}-${n.toString().padStart(4, "0")}`;
}
