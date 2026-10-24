import { calcSalariu, calcTVA, calcPlafonTVA, nextInvoiceNumber } from '../lib/salary';

describe('Salary adapter (Manager HR)', () => {
  const OCT_2026 = new Date('2026-10-15T12:00:00Z');

  test('delegates to lib/fiscal and maps employer cost', () => {
    const r = calcSalariu(10000, 0, 21, 21, OCT_2026);
    expect(r.net).toBe(5850);
    expect(r.camAngajator).toBe(225);
    expect(r.totalAngajator).toBe(10225);
  });

  test('prorates gross by attendance', () => {
    const r = calcSalariu(5000, 0, 15, 21, OCT_2026);
    expect(r.brut).toBe(3571);
  });

  test('dependents raise the personal deduction', () => {
    const fara = calcSalariu(4500, 0, 21, 21, OCT_2026);
    const cu = calcSalariu(4500, 2, 21, 21, OCT_2026);
    expect(cu.deducere).toBeGreaterThan(fara.deducere);
    expect(cu.net).toBeGreaterThan(fara.net);
  });
});

describe('TVA Calculations', () => {
  test('calculates TVA due correctly', () => {
    expect(calcTVA(10000, 6000)).toBe(4000); // 10000 - 6000
    expect(calcTVA(5000, 6000)).toBe(0); // no negative TVA
  });

  test('calculates VAT threshold progress', () => {
    expect(calcPlafonTVA(150000, 300000)).toBe(50); // 50% of 300k
    expect(calcPlafonTVA(320000, 300000)).toBe(100); // capped at 100%
  });
});

describe('Invoice Number Generation', () => {
  test('generates next invoice number', () => {
    expect(nextInvoiceNumber('F2026-0847')).toBe('F2026-0848');
    expect(nextInvoiceNumber('F2026-0999')).toBe('F2026-1000');
  });

  test('handles malformed numbers', () => {
    expect(nextInvoiceNumber('INVALID')).toBe(`F${new Date().getFullYear()}-0001`);
  });
});