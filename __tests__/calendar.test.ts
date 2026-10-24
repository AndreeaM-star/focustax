import { termeneAn, ziLucratoare, urmatoareleTermene } from "../lib/calendar";

const gasit = (an: number, cod: string, fragment: string) =>
  termeneAn(an).find((t) => t.cod === cod && t.titlu.includes(fragment));

describe("calendar fiscal", () => {
  test("termenul din weekend se mută luni", () => {
    // 25 octombrie 2026 este duminică
    expect(ziLucratoare(new Date(2026, 9, 25)).getDate()).toBe(26);
  });

  test("termenul de sărbătoare se mută pe prima zi lucrătoare", () => {
    // 1 iunie 2026 (Rusalii + Ziua Copilului) → 2 iunie
    expect(ziLucratoare(new Date(2026, 5, 1)).getDate()).toBe(2);
  });

  test("D212 pe 25 mai", () => {
    expect(gasit(2026, "D212", "2025")?.data).toBe("2026-05-25");
  });

  test("D101 și micro T4: 25 iunie în 2026, termene standard din 2027", () => {
    expect(gasit(2026, "D101", "2025")?.data).toBe("2026-06-25");
    expect(gasit(2026, "D100", "T4 2025")?.data).toBe("2026-06-25");
    expect(gasit(2027, "D101", "2026")?.data).toBe("2027-03-25");
    expect(gasit(2027, "D100", "T4 2026")?.data).toBe("2027-01-25");
  });

  test("D394 pe 30, iar în februarie în ultima zi lucrătoare de după", () => {
    expect(gasit(2026, "D394", "ian.")?.data).toBe("2026-03-02");
  });

  test("următoarele termene sunt în viitor și sortate", () => {
    const de_la = new Date(2026, 9, 25);
    const t = urmatoareleTermene(de_la, 5);
    expect(t).toHaveLength(5);
    expect(t[0].data >= "2026-10-25").toBe(true);
    expect([...t].sort((a, b) => a.data.localeCompare(b.data))).toEqual(t);
  });
});
