/**
 * Calendarul obligațiilor fiscale. Termenele care cad în weekend sau în zile
 * de sărbătoare legală se mută pe prima zi lucrătoare următoare (art. 181 Cod procedură fiscală).
 */

export type Profil = "angajator" | "pfa" | "micro" | "profit" | "tva" | "persoana_fizica";

export interface Termen {
  /** Data legală (după mutarea de weekend/sărbătoare), ISO AAAA-LL-ZZ */
  data: string;
  cod: string;
  titlu: string;
  profile: Profil[];
  link?: string;
}

export const PROFILE: { id: Profil; label: string }[] = [
  { id: "angajator", label: "Am angajați" },
  { id: "tva", label: "Plătitor de TVA" },
  { id: "micro", label: "Microîntreprindere" },
  { id: "profit", label: "Impozit pe profit" },
  { id: "pfa", label: "PFA / independent" },
  { id: "persoana_fizica", label: "Chirii, dividende, investiții" },
];

/** Sărbători legale (Codul muncii, art. 139) */
const SARBATORI: Record<number, string[]> = {
  2026: ["01-01", "01-02", "01-06", "01-07", "01-24", "04-10", "04-12", "04-13", "05-01", "05-31", "06-01", "08-15", "11-30", "12-01", "12-25", "12-26"],
  2027: ["01-01", "01-02", "01-06", "01-07", "01-24", "04-30", "05-01", "05-02", "05-03", "06-01", "06-20", "06-21", "08-15", "11-30", "12-01", "12-25", "12-26"],
};

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function zi(an: number, luna: number, ziua: number): Date {
  const ultima = new Date(an, luna, 0).getDate();
  return new Date(an, luna - 1, Math.min(ziua, ultima));
}

/** Mută termenul pe prima zi lucrătoare */
export function ziLucratoare(d: Date): Date {
  const r = new Date(d);
  for (;;) {
    const wd = r.getDay();
    const md = iso(r).slice(5);
    if (wd !== 0 && wd !== 6 && !(SARBATORI[r.getFullYear()] ?? []).includes(md)) return r;
    r.setDate(r.getDate() + 1);
  }
}

const LUNI_SCURT = ["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sep.", "oct.", "nov.", "dec."];

export function termeneAn(an: number): Termen[] {
  const t: Termen[] = [];
  const add = (luna: number, ziua: number, cod: string, titlu: string, profile: Profil[], link?: string) =>
    t.push({ data: iso(ziLucratoare(zi(an, luna, ziua))), cod, titlu, profile, link });

  for (let luna = 1; luna <= 12; luna++) {
    const prec = luna === 1 ? `dec. ${an - 1}` : `${LUNI_SCURT[luna - 2]} ${an}`;
    add(luna, 25, "D112", `Contribuții și impozit pe salarii — ${prec}`, ["angajator"], "/declaratii/d112");
    add(luna, 25, "D300", `Decont TVA lunar — ${prec}`, ["tva"], "/declaratii/d300");
    add(luna, 30, "D394", `Declarația informativă livrări/achiziții — ${prec}`, ["tva"], "/declaratii/d394");
    add(luna, 31, "D406", `SAF-T lunar — ${prec}`, ["tva"]);
  }

  const trimestre = [
    { luna: 4, eticheta: `T1 ${an}` },
    { luna: 7, eticheta: `T2 ${an}` },
    { luna: 10, eticheta: `T3 ${an}` },
  ];
  for (const q of trimestre) {
    add(q.luna, 25, "D100", `Impozit microîntreprindere — ${q.eticheta}`, ["micro"], "/declaratii/d100");
    add(q.luna, 25, "D100", `Impozit pe profit (plăți trimestriale) — ${q.eticheta}`, ["profit"], "/declaratii/d100");
  }
  add(1, 25, "D300", `Decont TVA trimestrial — T4 ${an - 1}`, ["tva"], "/declaratii/d300");
  add(4, 25, "D300", `Decont TVA trimestrial — T1 ${an}`, ["tva"], "/declaratii/d300");
  add(7, 25, "D300", `Decont TVA trimestrial — T2 ${an}`, ["tva"], "/declaratii/d300");
  add(10, 25, "D300", `Decont TVA trimestrial — T3 ${an}`, ["tva"], "/declaratii/d300");

  // Trimestrul IV și declarația anuală: 25 iunie până în 2026 (OUG 153/2020), apoi termenele standard
  if (an <= 2026) {
    add(6, 25, "D100", `Impozit microîntreprindere — T4 ${an - 1}`, ["micro"], "/declaratii/d100");
    add(6, 25, "D101", `Declarația anuală privind impozitul pe profit ${an - 1}`, ["profit"], "/declaratii/d101");
  } else {
    add(1, 25, "D100", `Impozit microîntreprindere — T4 ${an - 1}`, ["micro"], "/declaratii/d100");
    add(3, 25, "D101", `Declarația anuală privind impozitul pe profit ${an - 1}`, ["profit"], "/declaratii/d101");
  }

  add(2, 28, "D205", `Declarația informativă privind impozitul reținut la sursă — ${an - 1}`, ["angajator", "micro", "profit"]);
  add(5, 25, "D212", `Declarația unică — venituri ${an - 1} și estimare ${an}`, ["pfa", "persoana_fizica"], "/ghiduri/d212-ghid-completare");

  return t.sort((a, b) => a.data.localeCompare(b.data) || a.cod.localeCompare(b.cod));
}

/** Următoarele termene de la o dată dată, deduplicate pe (dată, cod) */
export function urmatoareleTermene(de_la: Date = new Date(), n = 5, profil?: Profil): Termen[] {
  const azi = iso(de_la);
  const lista = [...termeneAn(de_la.getFullYear()), ...termeneAn(de_la.getFullYear() + 1)]
    .filter((t) => t.data >= azi && (!profil || t.profile.includes(profil)));
  const vazute = new Set<string>();
  return lista.filter((t) => {
    const k = `${t.data}|${t.cod}`;
    if (vazute.has(k)) return false;
    vazute.add(k);
    return true;
  }).slice(0, n);
}

export function formatData(isoData: string): string {
  const d = new Date(`${isoData}T12:00:00`);
  return d.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
}

export function zileRamase(isoData: string, de_la: Date = new Date()): number {
  const azi = new Date(de_la); azi.setHours(0, 0, 0, 0);
  const t = new Date(`${isoData}T00:00:00`);
  return Math.round((t.getTime() - azi.getTime()) / 86400000);
}
