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
  zileLucratoare = 21
): SalaryResult {
  const brut = Math.round(brutBaza * (pontaj / zileLucratoare));

  // CAS 25%
  const cas = Math.round(brut * 0.25);

  // CASS 10%
  const cass = Math.round(brut * 0.1);

  // Deducere personala 2026
  // Limita de jos: salariul minim 4050 lei (2026 estimat)
  const salariuMinim = 4050;
  let deducereBase = 0;
  if (brut <= salariuMinim) {
    deducereBase = 600;
  } else if (brut <= salariuMinim * 2) {
    deducereBase = Math.max(
      0,
      Math.round(600 - (600 / salariuMinim) * (brut - salariuMinim))
    );
  }
  // +300 lei per copil in intretinere
  const deducereCopii = nrCopii * 300;
  const deducere = deducereBase + deducereCopii;

  // Baza de impozitare
  const bazaImpozit = Math.max(0, brut - cas - cass - deducere);

  // Impozit 10%
  const impozit = Math.round(bazaImpozit * 0.1);

  // Net
  const net = brut - cas - cass - impozit;

  // Costuri angajator: brut + CAM 2.25%
  const camAngajator = Math.round(brut * 0.0225);
  const totalAngajator = brut + camAngajator;

  return {
    brut,
    cas,
    cass,
    deducere,
    bazaImpozit,
    impozit,
    net,
    camAngajator,
    totalAngajator,
  };
}

/**
 * Calculeaza TVA datorat:  colectat - deductibil
 */
export function calcTVA(colectat: number, deductibil: number): number {
  return Math.max(0, colectat - deductibil);
}

/**
 * Calculeaza procentul din plafonul TVA anual (300.000 lei)
 */
export function calcPlafonTVA(
  cifraDeAfaceri: number,
  plafon = 300000
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
