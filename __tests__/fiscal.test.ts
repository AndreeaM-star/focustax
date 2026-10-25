import {
  calcSalariu, brutDinNet, deducerePersonala, salariuMinim, salariuMinimAnual,
  calcPfa, cassVenituriPasive, calcDividende, calcChirii, calcCrypto,
  calcImpozitProfit, plafonTvaIncasare, tvaDinBrut, tvaDinNet, calcD212,
} from "../lib/fiscal";

const IAN_2026 = new Date("2026-03-15T12:00:00Z");
const OCT_2026 = new Date("2026-10-15T12:00:00Z");

describe("salariul minim", () => {
  test("4.050 lei în S1 2026, 4.325 lei din iulie 2026", () => {
    expect(salariuMinim(IAN_2026)).toBe(4050);
    expect(salariuMinim(OCT_2026)).toBe(4325);
  });
  test("pentru contribuții PFA/pasive se folosește salariul de la 1 ianuarie", () => {
    expect(salariuMinimAnual(2026)).toBe(4050);
  });
});

describe("calcSalariu", () => {
  test("salariul minim S1 2026 → net 2.574 lei (cu 300 lei neimpozabili)", () => {
    const r = calcSalariu(4050, { data: IAN_2026 });
    expect(r.sumaNeimpozabila).toBe(300);
    expect(r.cas).toBe(938);
    expect(r.cass).toBe(375);
    expect(r.deducere).toBe(810);
    expect(r.impozit).toBe(163);
    expect(r.net).toBe(2574);
  });

  test("salariul minim din iulie 2026 → net 2.699 lei (cu 200 lei neimpozabili)", () => {
    const r = calcSalariu(4325, { data: OCT_2026 });
    expect(r.sumaNeimpozabila).toBe(200);
    expect(r.net).toBe(2699);
  });

  test("brut 10.000 lei: fără deducere, fără sumă neimpozabilă", () => {
    const r = calcSalariu(10000, { data: OCT_2026 });
    expect(r.sumaNeimpozabila).toBe(0);
    expect(r.deducere).toBe(0);
    expect(r.cas).toBe(2500);
    expect(r.cass).toBe(1000);
    expect(r.impozit).toBe(650);
    expect(r.net).toBe(5850);
    expect(r.cam).toBe(225);
    expect(r.costTotal).toBe(10225);
  });

  test("deducere suplimentară pentru copii la școală și tineri sub 26 de ani", () => {
    const baza = calcSalariu(5000, { data: OCT_2026 });
    const cuCopii = calcSalariu(5000, { data: OCT_2026, copiiScoala: 2 });
    expect(cuCopii.deducere - baza.deducere).toBe(200);
    const tanar = calcSalariu(5000, { data: OCT_2026, sub26: true });
    expect(tanar.deducere - baza.deducere).toBe(Math.round(0.15 * 4325));
  });

  test("brutDinNet inversează calcSalariu", () => {
    const brut = brutDinNet(5000, { data: OCT_2026 });
    expect(calcSalariu(brut, { data: OCT_2026 }).net).toBeGreaterThanOrEqual(5000);
    expect(calcSalariu(brut - 1, { data: OCT_2026 }).net).toBeLessThan(5000);
  });
});

describe("deducerePersonala", () => {
  test("procent de bază la salariul minim după persoanele în întreținere", () => {
    expect(deducerePersonala(4325, 0, 4325)).toBe(865);   // 20%
    expect(deducerePersonala(4325, 1, 4325)).toBe(1081);  // 25%
    expect(deducerePersonala(4325, 4, 4325)).toBe(1946);  // 45%
  });
  test("scade cu 0,5 pp la fiecare 50 lei și dispare peste salariul minim + 2.000", () => {
    expect(deducerePersonala(4375, 0, 4325)).toBe(Math.round(0.195 * 4325));
    expect(deducerePersonala(6275, 0, 4325)).toBe(Math.round(0.005 * 4325));
    expect(deducerePersonala(6325, 0, 4325)).toBe(0);
    expect(deducerePersonala(6325, 4, 4325)).toBe(Math.round(0.25 * 4325));
    expect(deducerePersonala(6326, 4, 4325)).toBe(0);
  });
});

describe("calcPfa (2026, salariu minim 4.050)", () => {
  test("sub 12 salarii minime: fără CAS, CASS la minim 6 salarii", () => {
    const r = calcPfa(30000, { an: 2026 });
    expect(r.cas).toBe(0);
    expect(r.cass).toBe(3000);
    expect(r.impozit).toBe(2700);
  });
  test("între 12 și 24 salarii minime: CAS la baza de 12 salarii", () => {
    const r = calcPfa(60000, { an: 2026 });
    expect(r.bazaCas).toBe(48600);
    expect(r.cas).toBe(12150);
    expect(r.cass).toBe(6000);
    expect(r.impozit).toBe(Math.round((60000 - 12150 - 6000) * 0.1));
  });
  test("peste 24 salarii minime: CAS la 24 salarii, CASS plafonat la 72 salarii", () => {
    const r = calcPfa(500000, { an: 2026 });
    expect(r.cas).toBe(24300);
    expect(r.bazaCass).toBe(72 * 4050);
    expect(r.cass).toBe(29160);
  });
});

describe("venituri pasive", () => {
  test("CASS în trepte 6/12/24 salarii minime", () => {
    expect(cassVenituriPasive(20000, 2026).cass).toBe(0);
    expect(cassVenituriPasive(30000, 2026).cass).toBe(2430);
    expect(cassVenituriPasive(60000, 2026).cass).toBe(4860);
    expect(cassVenituriPasive(500000, 2026).cass).toBe(9720);
  });
  test("dividende 16% + CASS", () => {
    const r = calcDividende(100000, 0, 2026);
    expect(r.impozit).toBe(16000);
    expect(r.cass).toBe(9720);
    expect(r.ramas).toBe(74280);
  });
  test("chirii: deducere forfetară 20%, impozit 10%", () => {
    const r = calcChirii(24000, 0, 2026);
    expect(r.deducere).toBe(4800);
    expect(r.impozit).toBe(1920);
    expect(r.cass).toBe(0);
  });
  test("crypto: 16%, scutit sub 600 lei pe an", () => {
    expect(calcCrypto(500).impozit).toBe(0);
    expect(calcCrypto(10000, 0, 2026).impozit).toBe(1600);
  });
});

describe("firme și TVA", () => {
  test("IMCA doar peste 50 mil. EUR și doar în 2026", () => {
    expect(calcImpozitProfit(10000, 2_000_000, 2026).impozit).toBe(1600);
    expect(calcImpozitProfit(0, 300_000_000, 2026).imca).toBe(1_500_000);
    expect(calcImpozitProfit(0, 300_000_000, 2027).imca).toBe(0);
  });
  test("plafon TVA la încasare", () => {
    expect(plafonTvaIncasare(2026)).toBe(5_000_000);
    expect(plafonTvaIncasare(2027)).toBe(5_500_000);
  });
  test("TVA din net și din brut", () => {
    expect(tvaDinNet(100, 21).brut).toBe(121);
    expect(tvaDinBrut(121, 21).net).toBeCloseTo(100);
  });
});

describe("calcD212 — venituri mixte", () => {
  test("broker străin 16%, cu compensare de pierderi max. 70%", () => {
    const r = calcD212({ castigBrokerStrain: 10000, pierderiReportate: 9000, an: 2026 });
    expect(r.linii[0].baza).toBe(3000);
    expect(r.impozit).toBe(480);
    expect(r.cass.cass).toBe(0);
  });

  test("dividende străine: credit fiscal limitat la impozitul român", () => {
    const r = calcD212({ dividendeStrainatate: 10000, impozitStrainDividende: 1000, an: 2026 });
    expect(r.impozit).toBe(600);
    expect(r.retinut).toBe(1000);
  });

  test("CASS se calculează pe toate veniturile pasive cumulate", () => {
    const r = calcD212({ chirii: 24000, dividendeRO: 20000, castigBrokerRomanBrut: 10000, an: 2026 });
    // chirii nete 19.200 + 20.000 + 10.000 = 49.200 → treapta de 12 salarii minime
    expect(r.totalCass).toBe(49200);
    expect(r.cass.cass).toBe(4860);
    expect(r.impozit).toBe(1920);
    expect(r.trebuieDepusa).toBe(true);
  });

  test("doar dividende românești sub prag: nu e nimic de plată", () => {
    const r = calcD212({ dividendeRO: 15000, an: 2026 });
    expect(r.totalDePlata).toBe(0);
    expect(r.trebuieDepusa).toBe(false);
  });
});
