"use client";

import { useState } from "react";
import Link from "next/link";
import type { DeclaratieData } from "./data";
import styles from "./page.module.css";

// Mapping declarație → tip comparatie + preview țări
const CONTEXT_EUROPEAN: Record<
  string,
  {
    tip: string;
    titlu: string;
    tari: { nume: string; cota: number; flag: string }[];
  }
> = {
  d300: {
    tip: "tva",
    titlu: "TVA în Europa",
    tari: [
      { nume: "Ungaria", cota: 27, flag: "🇭🇺" },
      { nume: "Polonia", cota: 23, flag: "🇵🇱" },
      { nume: "România", cota: 19, flag: "🇷🇴" },
      { nume: "Germania", cota: 19, flag: "🇩🇪" },
      { nume: "Luxemburg", cota: 17, flag: "🇱🇺" },
    ],
  },
  d212: {
    tip: "impozit-venit",
    titlu: "Impozit pe venit în Europa",
    tari: [
      { nume: "Danemarca", cota: 56, flag: "🇩🇰" },
      { nume: "Germania", cota: 45, flag: "🇩🇪" },
      { nume: "Polonia", cota: 32, flag: "🇵🇱" },
      { nume: "România", cota: 10, flag: "🇷🇴" },
      { nume: "Bulgaria", cota: 10, flag: "🇧🇬" },
    ],
  },
  d220: {
    tip: "impozit-venit",
    titlu: "Impozit pe venit în Europa",
    tari: [
      { nume: "Danemarca", cota: 56, flag: "🇩🇰" },
      { nume: "Germania", cota: 45, flag: "🇩🇪" },
      { nume: "Polonia", cota: 32, flag: "🇵🇱" },
      { nume: "România", cota: 10, flag: "🇷🇴" },
      { nume: "Bulgaria", cota: 10, flag: "🇧🇬" },
    ],
  },
  d204: {
    tip: "impozit-venit",
    titlu: "Impozit pe venit în Europa",
    tari: [
      { nume: "Danemarca", cota: 56, flag: "🇩🇰" },
      { nume: "Germania", cota: 45, flag: "🇩🇪" },
      { nume: "Polonia", cota: 32, flag: "🇵🇱" },
      { nume: "România", cota: 10, flag: "🇷🇴" },
      { nume: "Bulgaria", cota: 10, flag: "🇧🇬" },
    ],
  },
  d216: {
    tip: "impozit-venit",
    titlu: "Impozit pe venit în Europa",
    tari: [
      { nume: "Danemarca", cota: 56, flag: "🇩🇰" },
      { nume: "Germania", cota: 45, flag: "🇩🇪" },
      { nume: "Ungaria", cota: 15, flag: "🇭🇺" },
      { nume: "România", cota: 10, flag: "🇷🇴" },
      { nume: "Bulgaria", cota: 10, flag: "🇧🇬" },
    ],
  },
  d101: {
    tip: "impozit-profit",
    titlu: "Impozit pe profit în Europa",
    tari: [
      { nume: "Franța", cota: 25, flag: "🇫🇷" },
      { nume: "Germania", cota: 30, flag: "🇩🇪" },
      { nume: "România", cota: 16, flag: "🇷🇴" },
      { nume: "Irlanda", cota: 12.5, flag: "🇮🇪" },
      { nume: "Ungaria", cota: 9, flag: "🇭🇺" },
    ],
  },
  d112: {
    tip: "contributii-sociale",
    titlu: "Contribuții sociale în Europa",
    tari: [
      { nume: "Franța", cota: 68, flag: "🇫🇷" },
      { nume: "Germania", cota: 40, flag: "🇩🇪" },
      { nume: "România", cota: 35, flag: "🇷🇴" },
      { nume: "Elveția", cota: 25.15, flag: "🇨🇭" },
      { nume: "Irlanda", cota: 15.15, flag: "🇮🇪" },
    ],
  },
};

const LUNI = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function luniActive(periodicitate: string): number[] {
  const p = periodicitate.toLowerCase();
  if (p.includes("lunar")) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  if (p.includes("trimestrial")) return [1, 4, 7, 10];
  if (p === "anual" || p.includes("anual")) return [5];
  return [];
}

const CINE_DEPUNE: Record<string, string[]> = {
  d300: ["SRL cu TVA", "PFA cu TVA", "II cu TVA"],
  d301: ["Cumpărători intracomunitari neînregistrați TVA"],
  d390: ["SRL cu TVA", "PFA cu TVA"],
  d394: ["SRL cu TVA", "PFA cu TVA"],
  d101: ["SRL", "SA", "Alte persoane juridice"],
  d012: ["Plătitori impozit pe profit"],
  d100: ["SRL", "SA", "Plătitori accize"],
  d200: ["Persoane fizice cu venituri din 2023 și anterior"],
  d212: ["PFA", "II", "IF", "Chirii", "Investiții", "Alte venituri"],
  d220: ["PFA", "II", "Activități independente noi"],
  d230: ["Persoane fizice cu impozit pe venit"],
  d112: ["Angajatori", "SRL cu salariați", "PFA cu salariați"],
  d204: ["PFA", "II", "IF"],
  d216: ["PFA", "II", "IF", "Persoane cu activități independente"],
  d120: ["Antrepozitari autorizați", "Importatori accize"],
  d130: ["Producători țiței"],
};

const DECLARATII_CONEXE: Record<string, { cod: string; nume: string; href: string }[]> = {
  d300: [
    { cod: "D390", nume: "Declarație recapitulativă VIES", href: "/declaratii/d390" },
    { cod: "D394", nume: "Declarație informativă livrări", href: "/declaratii/d394" },
  ],
  d212: [
    { cod: "D220", nume: "Declarație venit estimat", href: "/declaratii/d220" },
    { cod: "D230", nume: "3,5% din impozit", href: "/declaratii/d230" },
  ],
  d101: [
    { cod: "D100", nume: "Obligații de plată", href: "/declaratii/d100" },
    { cod: "D012", nume: "Notificare sistem anticipate", href: "/declaratii/d012" },
  ],
  d112: [{ cod: "D100", nume: "Obligații de plată", href: "/declaratii/d100" }],
  d220: [{ cod: "D212", nume: "Declarație Unică", href: "/declaratii/d212" }],
  d230: [{ cod: "D212", nume: "Declarație Unică", href: "/declaratii/d212" }],
  d390: [{ cod: "D300", nume: "Decont TVA", href: "/declaratii/d300" }],
  d394: [{ cod: "D300", nume: "Decont TVA", href: "/declaratii/d300" }],
  d204: [{ cod: "D212", nume: "Declarație Unică", href: "/declaratii/d212" }],
  d216: [{ cod: "D212", nume: "Declarație Unică", href: "/declaratii/d212" }],
};

// ─── Mini-calculatoare ────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("ro-RO", { maximumFractionDigits: 0 }) + " lei";
}

function CalcD300({ accentCuloare }: { accentCuloare: string }) {
  const [colectata, setColectata] = useState("");
  const [deductibila, setDeductibila] = useState("");
  const [rezultat, setRezultat] = useState<{ plata: number; pozitiv: boolean } | null>(null);

  function calculeaza() {
    const col = parseFloat(colectata.replace(/\./g, "").replace(",", ".")) || 0;
    const ded = parseFloat(deductibila.replace(/\./g, "").replace(",", ".")) || 0;
    setRezultat({ plata: Math.abs(col - ded), pozitiv: col >= ded });
  }

  return (
    <div className={styles.miniCalc}>
      <p className={styles.miniCalcDesc}>Introdu valorile din decontul tău pentru a vedea TVA de plată sau de rambursat.</p>
      <div className={styles.miniCalcRow}>
        <div className={styles.miniCalcField}>
          <label className={styles.miniCalcLabel}>TVA colectată (lei)</label>
          <input className={styles.miniCalcInput} type="number" placeholder="ex: 19000" value={colectata} onChange={e => setColectata(e.target.value)} />
        </div>
        <div className={styles.miniCalcField}>
          <label className={styles.miniCalcLabel}>TVA deductibilă (lei)</label>
          <input className={styles.miniCalcInput} type="number" placeholder="ex: 7500" value={deductibila} onChange={e => setDeductibila(e.target.value)} />
        </div>
      </div>
      <button className={styles.miniCalcBtn} style={{ background: accentCuloare }} onClick={calculeaza}>Calculează</button>
      {rezultat !== null && (
        <div className={`${styles.miniCalcResult} ${rezultat.pozitiv ? styles.miniCalcDePlata : styles.miniCalcDeRambursat}`}>
          <span className={styles.miniCalcResultLabel}>{rezultat.pozitiv ? "TVA de plată" : "TVA de rambursat"}</span>
          <span className={styles.miniCalcResultVal}>{fmt(rezultat.plata)}</span>
        </div>
      )}
    </div>
  );
}

function CalcD212({ accentCuloare }: { accentCuloare: string }) {
  const [venit, setVenit] = useState("");
  const [rezultat, setRezultat] = useState<{ impozit: number; cas: number; cass: number; total: number } | null>(null);

  const SMIN = 4050;

  function calculeaza() {
    const v = parseFloat(venit.replace(/\./g, "").replace(",", ".")) || 0;
    const impozit = Math.round(v * 0.1);
    const casBase = v >= 12 * SMIN ? Math.min(v, 24 * SMIN) : 0;
    const cas = Math.round(casBase * 0.25);
    let cassBase = 0;
    if (v >= 24 * SMIN) cassBase = 24 * SMIN;
    else if (v >= 12 * SMIN) cassBase = 12 * SMIN;
    else if (v >= 6 * SMIN) cassBase = 6 * SMIN;
    const cass = Math.round(cassBase * 0.1);
    setRezultat({ impozit, cas, cass, total: impozit + cas + cass });
  }

  return (
    <div className={styles.miniCalc}>
      <p className={styles.miniCalcDesc}>Introdu venitul net anual pentru a estima impozitul și contribuțiile sociale.</p>
      <div className={styles.miniCalcRow}>
        <div className={styles.miniCalcField}>
          <label className={styles.miniCalcLabel}>Venit net anual (lei)</label>
          <input className={styles.miniCalcInput} type="number" placeholder="ex: 80000" value={venit} onChange={e => setVenit(e.target.value)} />
        </div>
      </div>
      <button className={styles.miniCalcBtn} style={{ background: accentCuloare }} onClick={calculeaza}>Calculează</button>
      {rezultat !== null && (
        <div className={styles.miniCalcResultGrid}>
          <div className={styles.miniCalcRow2}>
            <span className={styles.miniCalcItem2}>Impozit 10%</span>
            <span className={styles.miniCalcVal2}>{fmt(rezultat.impozit)}</span>
          </div>
          <div className={styles.miniCalcRow2}>
            <span className={styles.miniCalcItem2}>CAS 25%</span>
            <span className={styles.miniCalcVal2}>{fmt(rezultat.cas)}</span>
          </div>
          <div className={styles.miniCalcRow2}>
            <span className={styles.miniCalcItem2}>CASS 10%</span>
            <span className={styles.miniCalcVal2}>{fmt(rezultat.cass)}</span>
          </div>
          <div className={`${styles.miniCalcRow2} ${styles.miniCalcTotal}`}>
            <span className={styles.miniCalcItem2}>Total obligații</span>
            <span className={styles.miniCalcVal2} style={{ color: accentCuloare }}>{fmt(rezultat.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function CalcD101({ accentCuloare }: { accentCuloare: string }) {
  const [profit, setProfit] = useState("");
  const [rezultat, setRezultat] = useState<number | null>(null);

  function calculeaza() {
    const p = parseFloat(profit.replace(/\./g, "").replace(",", ".")) || 0;
    setRezultat(Math.round(p * 0.16));
  }

  return (
    <div className={styles.miniCalc}>
      <p className={styles.miniCalcDesc}>Estimează impozitul pe profit — cota standard 16%.</p>
      <div className={styles.miniCalcRow}>
        <div className={styles.miniCalcField}>
          <label className={styles.miniCalcLabel}>Profit impozabil (lei)</label>
          <input className={styles.miniCalcInput} type="number" placeholder="ex: 50000" value={profit} onChange={e => setProfit(e.target.value)} />
        </div>
      </div>
      <button className={styles.miniCalcBtn} style={{ background: accentCuloare }} onClick={calculeaza}>Calculează</button>
      {rezultat !== null && (
        <div className={`${styles.miniCalcResult} ${styles.miniCalcDePlata}`}>
          <span className={styles.miniCalcResultLabel}>Impozit pe profit (16%)</span>
          <span className={styles.miniCalcResultVal}>{fmt(rezultat)}</span>
        </div>
      )}
    </div>
  );
}

function CalcD112({ accentCuloare }: { accentCuloare: string }) {
  const [salariu, setSalariu] = useState("");
  const [rezultat, setRezultat] = useState<{ cas: number; cass: number; im: number; net: number } | null>(null);

  function calculeaza() {
    const s = parseFloat(salariu.replace(/\./g, "").replace(",", ".")) || 0;
    const cas = Math.round(s * 0.25);
    const cass = Math.round(s * 0.1);
    const im = Math.round((s - cas - cass) * 0.1);
    const net = s - cas - cass - im;
    setRezultat({ cas, cass, im, net });
  }

  return (
    <div className={styles.miniCalc}>
      <p className={styles.miniCalcDesc}>Calculează reținerile salariale din D112 pentru un angajat.</p>
      <div className={styles.miniCalcRow}>
        <div className={styles.miniCalcField}>
          <label className={styles.miniCalcLabel}>Salariu brut (lei)</label>
          <input className={styles.miniCalcInput} type="number" placeholder="ex: 8000" value={salariu} onChange={e => setSalariu(e.target.value)} />
        </div>
      </div>
      <button className={styles.miniCalcBtn} style={{ background: accentCuloare }} onClick={calculeaza}>Calculează</button>
      {rezultat !== null && (
        <div className={styles.miniCalcResultGrid}>
          <div className={styles.miniCalcRow2}><span className={styles.miniCalcItem2}>CAS angajat 25%</span><span className={styles.miniCalcVal2}>{fmt(rezultat.cas)}</span></div>
          <div className={styles.miniCalcRow2}><span className={styles.miniCalcItem2}>CASS angajat 10%</span><span className={styles.miniCalcVal2}>{fmt(rezultat.cass)}</span></div>
          <div className={styles.miniCalcRow2}><span className={styles.miniCalcItem2}>Impozit venit 10%</span><span className={styles.miniCalcVal2}>{fmt(rezultat.im)}</span></div>
          <div className={`${styles.miniCalcRow2} ${styles.miniCalcTotal}`}>
            <span className={styles.miniCalcItem2}>Salariu net</span>
            <span className={styles.miniCalcVal2} style={{ color: accentCuloare }}>{fmt(rezultat.net)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniCalculator({ cod, accentCuloare, badgeBg, badgeBorder }: {
  cod: string; accentCuloare: string; badgeBg: string; badgeBorder: string;
}) {
  const map: Record<string, React.ReactNode> = {
    d300: <CalcD300 accentCuloare={accentCuloare} />,
    d212: <CalcD212 accentCuloare={accentCuloare} />,
    d220: <CalcD212 accentCuloare={accentCuloare} />,
    d204: <CalcD212 accentCuloare={accentCuloare} />,
    d216: <CalcD212 accentCuloare={accentCuloare} />,
    d101: <CalcD101 accentCuloare={accentCuloare} />,
    d112: <CalcD112 accentCuloare={accentCuloare} />,
  };

  const calc = map[cod];
  if (!calc) return null;

  return (
    <div className={styles.miniCalcWrapper} style={{ background: badgeBg, borderColor: badgeBorder }}>
      <h2 className={styles.sectionTitle}>Exemplu numeric</h2>
      {calc}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────

export default function DeclaratieClient({ data }: { data: DeclaratieData }) {
  const [deschis, setDeschis] = useState<string | null>(null);

  const cod = data.cod.toLowerCase();
  const luni = luniActive(data.periodicitate);
  const cine = CINE_DEPUNE[cod] ?? [];
  const conexe = DECLARATII_CONEXE[cod] ?? [];

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/declaratii" className={styles.breadcrumbLink}>Declarații</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span>{data.cod}</span>
      </div>

      <div className={styles.header}>
        <span className={styles.badge} style={{ color: data.badgeCuloare, background: data.badgeBg, borderColor: data.badgeBorder }}>
          {data.categorie}
        </span>
        <h1 className={styles.title}>{data.titlu}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <div className={styles.meta}>
          <span className={styles.metaItem}>📅 Periodicitate: {data.periodicitate}</span>
          <span className={styles.metaItem}>⏰ Termen: {data.termen}</span>
          <span className={styles.metaItem}>🏛️ Depunere: {data.depunere}</span>
        </div>
      </div>

      {/* Butoane formular */}
      {(data.linkDescarcare || data.linkWebFormular) && (
        <div className={styles.formularButoane}>
          {data.linkDescarcare && (
            <a
              href={data.linkDescarcare}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnDescarcare}
              style={{ borderColor: data.badgeBorder, color: data.accentCuloare, background: data.badgeBg }}
            >
              ⬇ Descarcă formularul (PDF)
            </a>
          )}
          {data.linkWebFormular && (
            <a
              href={data.linkWebFormular}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWebFormular}
              style={{ background: data.accentCuloare }}
            >
              🌐 Completează web formularul
            </a>
          )}
        </div>
      )}

      {/* Calendar vizual */}
      {luni.length > 0 && (
        <div className={styles.calendarSection}>
          <h2 className={styles.sectionTitle}>Calendar depunere</h2>
          <div className={styles.calendar}>
            {LUNI.map((l, i) => {
              const activ = luni.includes(i + 1);
              return (
                <div
                  key={l}
                  className={`${styles.calendarLuna} ${activ ? styles.calendarActiv : ""}`}
                  style={activ ? { background: data.badgeBg, borderColor: data.badgeBorder, color: data.accentCuloare } : undefined}
                >
                  {l}
                </div>
              );
            })}
          </div>
          <p className={styles.calendarHint}>
            {luni.length === 12
              ? "Se depune lunar — în fiecare lună, până la termenul specificat."
              : luni.length === 4
              ? "Se depune trimestrial — în primele luni ale fiecărui trimestru."
              : "Se depune anual — de regulă până pe 25 mai."}
          </p>
        </div>
      )}

      {/* Cine depune */}
      {cine.length > 0 && (
        <div className={styles.cineSection}>
          <h2 className={styles.sectionTitle}>Cine depune</h2>
          <div className={styles.cineBadges}>
            {cine.map((c) => (
              <span key={c} className={styles.cineBadge} style={{ borderColor: data.badgeBorder, color: data.accentCuloare, background: data.badgeBg }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Exemplu numeric mini-calculator */}
      <MiniCalculator
        cod={cod}
        accentCuloare={data.accentCuloare}
        badgeBg={data.badgeBg}
        badgeBorder={data.badgeBorder}
      />

      <div className={styles.legislatie}>
        <h2 className={styles.sectionTitle}>Informații oficiale</h2>
        <div className={styles.legislatieBox} style={{ borderColor: data.legislatieBorder, borderLeftColor: data.legislatieAccent }}>
          {data.legislatie.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className={styles.legislatieFooter} style={{ borderTopColor: data.legislatieBorder }}>
            <span>⏱ Durată estimată: <strong>{data.durata}</strong></span>
            <span>📋 Categoria: {data.categorie}</span>
          </div>
        </div>
      </div>

      <div className={styles.capitole}>
        <h2 className={styles.sectionTitle}>Capitolele formularului</h2>
        {data.capitole.map((cap) => (
          <div key={cap.id} className={styles.capitol}>
            <button
              className={`${styles.capitolHeader} ${deschis === cap.id ? styles.activ : ""}`}
              onClick={() => setDeschis(deschis === cap.id ? null : cap.id)}
              style={deschis === cap.id ? { background: data.legislatieBg } : undefined}
            >
              <span className={styles.capitolId} style={{ color: data.accentCuloare }}>{cap.id}</span>
              <span className={styles.capitolTitlu}>{cap.titlu}</span>
              <span className={styles.chevron}>{deschis === cap.id ? "▲" : "▼"}</span>
            </button>
            {deschis === cap.id && (
              <ul className={styles.capitolContinut}>
                {cap.continut.map((item, i) => (
                  <li key={i} className={styles.capitolItem}>
                    <span className={styles.bullet} style={{ color: data.accentCuloare }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Declarații conexe */}
      {conexe.length > 0 && (
        <div className={styles.conexeSection}>
          <h2 className={styles.sectionTitle}>Declarații conexe</h2>
          <div className={styles.conexeGrid}>
            {conexe.map((d) => (
              <Link key={d.cod} href={d.href} className={styles.conexeCard}>
                <span className={styles.conexeCod} style={{ color: data.accentCuloare }}>{d.cod}</span>
                <span className={styles.conexeNume}>{d.nume}</span>
                <span className={styles.conexeArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* România în context european */}
      {CONTEXT_EUROPEAN[cod] && (
        <div className={styles.conexeSection} style={{ marginTop: 40 }}>
          <h2 className={styles.sectionTitle}>România în context european</h2>
          <div
            className={styles.contextEuCard}
            style={{ borderColor: data.badgeBorder, background: data.badgeBg }}
          >
            <div className={styles.contextEuHeader}>
              <span className={styles.contextEuIcon}>🌍</span>
              <div>
                <p className={styles.contextEuTitlu}>{CONTEXT_EUROPEAN[cod].titlu}</p>
                <p className={styles.contextEuDesc}>Câteva țări europene pentru comparație rapidă</p>
              </div>
            </div>
            <div className={styles.contextEuTari}>
              {CONTEXT_EUROPEAN[cod].tari.map((t) => (
                <div
                  key={t.nume}
                  className={`${styles.contextEuTara} ${t.nume === "România" ? styles.contextEuRo : ""}`}
                  style={t.nume === "România" ? { borderColor: data.badgeBorder, background: "rgba(255,255,255,0.7)" } : {}}
                >
                  <span className={styles.contextEuFlag}>{t.flag}</span>
                  <span className={styles.contextEuNume}>{t.nume}</span>
                  <span
                    className={styles.contextEuCota}
                    style={t.nume === "România" ? { color: data.accentCuloare } : {}}
                  >
                    {t.cota}%
                  </span>
                </div>
              ))}
            </div>
            <Link
              href={`/comparatii/${CONTEXT_EUROPEAN[cod].tip}`}
              className={styles.contextEuLink}
              style={{ color: data.accentCuloare, borderColor: data.badgeBorder }}
            >
              Vezi comparație completă cu grafice →
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
