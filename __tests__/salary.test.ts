import { calcSalariu, calcTVA, calcPlafonTVA, nextInvoiceNumber } from '../lib/salary';

describe('Salary Calculations', () => {
  test('calculates salary correctly for employee with 1 child', () => {
    const result = calcSalariu(5000, 1, 21, 21);

    expect(result.brut).toBe(5000);
    expect(result.cas).toBe(1250); // 25% of 5000
    expect(result.cass).toBe(500);  // 10% of 5000
    expect(result.deducere).toBe(759); // 459 base + 300 for child
    expect(result.bazaImpozit).toBe(2491); // 5000 - 1250 - 500 - 759
    expect(result.impozit).toBe(249); // 10% of 2491
    expect(result.net).toBe(3001); // 5000 - 1250 - 500 - 249
    expect(result.camAngajator).toBe(200); // 4% of 5000
    expect(result.totalAngajator).toBe(5200);
  });

  test('calculates salary with partial attendance', () => {
    const result = calcSalariu(5000, 0, 15, 21);

    expect(result.brut).toBe(3571); // 5000 * (15/21)
    expect(result.net).toBe(2149); // actual calculation
  });

  test('calculates salary for minimum wage', () => {
    const result = calcSalariu(4050, 0, 21, 21);

    expect(result.brut).toBe(4050);
    expect(result.deducere).toBe(600); // minimum deduction
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
    expect(nextInvoiceNumber('INVALID')).toBe('F2026-0001');
  });
});