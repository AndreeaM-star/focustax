/**
 * Adaptor pentru modulul Manager (HR, facturi). Calculele fiscale vin din lib/fiscal.ts.
 */
import { calcSalariu as calcSalariuFiscal, PLAFOANE } from "./fiscal";

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

/**
 * Salariul lunar al unui angajat, proporțional cu zilele lucrate.
 * nrCopii = persoane în întreținere (determină procentul deducerii personale).
 */
export function calcSalariu(
  brutBaza: number,
  nrCopii = 0,
  pontaj = 21,
  zileLucratoare = 21,
  data?: Date
): SalaryResult {
  const brut = Math.round(brutBaza * (pontaj / zileLucratoare));
  const r = calcSalariuFiscal(brut, { persoaneIntretinere: nrCopii, data });
  return {
    brut: r.brut,
    cas: r.cas,
    cass: r.cass,
    deducere: r.deducere,
    bazaImpozit: r.bazaImpozit,
    impozit: r.impozit,
    net: r.net,
    camAngajator: r.cam,
    totalAngajator: r.costTotal,
  };
}

/** TVA de plată: colectată − deductibilă (minim 0) */
export function calcTVA(colectat: number, deductibil: number): number {
  return Math.max(0, colectat - deductibil);
}

/** Procentul atins din plafonul anual de înregistrare în scopuri de TVA */
export function calcPlafonTVA(cifraDeAfaceri: number, plafon: number = PLAFOANE.TVA_INREGISTRARE): number {
  return Math.min(100, Math.round((cifraDeAfaceri / plafon) * 100));
}

/** Numărul următor de factură: F2026-0847 → F2026-0848 */
export function nextInvoiceNumber(lastNumber: string): string {
  const year = new Date().getFullYear();
  const match = lastNumber.match(/(\d+)$/);
  if (!match) return `F${year}-0001`;
  const n = parseInt(match[1], 10) + 1;
  return `F${year}-${n.toString().padStart(4, "0")}`;
}
