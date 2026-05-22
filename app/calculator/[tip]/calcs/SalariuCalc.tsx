"use client";

import { useState } from "react";
import styles from "../../calculator.module.css";

const fmt = (n: number) => n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
const SMIN = 4050;

function deducere(brut: number, copii: number) {
  let base = 0;
  if (brut <= SMIN) base = 300;
  else if (brut <= SMIN * 2) base = Math.max(0, Math.round(300 - (300 / SMIN) * (brut - SMIN)));
  return base + copii * 100;
}

function calc(brut: number, copii: number, pontaj: number) {
  const brutAjustat = Math.round((brut / 21) * Math.min(pontaj, 21));
  const cas   = Math.round(brutAjustat * 0.25);
  const cass  = Math.round(brutAjustat * 0.10);
  const ded   = deducere(brutAjustat, copii);
  const bazaImpozabila = Math.max(0, brutAjustat - cas - cass - ded);
  const impozit = Math.round(bazaImpozabila * 0.10);
  const net     = brutAjustat - cas - cass - impozit;
  const cam     = Math.round(brutAjustat * 0.0225);
  const totalAngajator = brutAjustat + cam;
  return { brut: brutAjustat, cas, cass, deducereVal: ded, impozit, net: Math.max(0, net), cam, totalAngajator };
}

export default function SalariuCalc() {
  const [brut,   setBrut]   = useState(5000);
  const [copii,  setCopii]  = useState(0);
  const [pontaj, setPontaj] = useState(21);

  const r = calc(brut, copii, pontaj);
  const ded = deducere(r.brut, copii);
  const segments = [
    { label: "CAS 25%",    value: r.cas,     color: "#ef4444" },
    { label: "CASS 10%",   value: r.cass,    color: "#f97316" },
    { label: "Impozit 10%",value: r.impozit, color: "#eab308" },
    { label: "Salariu net",value: r.net,     color: "#22c55e" },
  ];
  const total = segments.reduce((s, x) => s + x.value, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Calculator Salariu Net</div>
        <div className={styles.cardSubtitle}>Angajat cu contract de muncă · România 2026 · CAS 25% · CASS 10% · Impozit 10%</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <label>Salariu Brut (lei/lună)</label>
            <div className={styles.rangeWrap}>
              <input type="range" min={4050} max={30000} step={50} value={brut}
                onChange={(e) => setBrut(Number(e.target.value))}
                aria-label="Salariu brut" />
              <span className={styles.rangeValue}>{fmt(brut)} lei</span>
            </div>
            <input type="number" value={brut} min={4050} step={100}
              onChange={(e) => setBrut(Math.max(4050, Number(e.target.value)))}
              aria-label="Valoare exactă salariu brut"
              style={{ marginTop: 6, width: 140, padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(99,102,241,0.3)", background: "rgba(255,255,255,0.7)", fontSize: "0.88rem" }} />
          </div>
          <div className={styles.field}>
            <label>Copii în întreținere</label>
            <select value={copii} onChange={(e) => setCopii(Number(e.target.value))}>
              {[0,1,2,3,4,5].map((n) => <option key={n} value={n}>{n === 0 ? "Niciun copil" : `${n} ${n === 1 ? "copil" : "copii"}`}</option>)}
            </select>
          </div>
        </div>
        <div className={styles.field}>
          <label>Zile lucrate / lună</label>
          <div className={styles.rangeWrap}>
            <input type="range" min={1} max={21} value={pontaj}
              onChange={(e) => setPontaj(Number(e.target.value))} />
            <span className={styles.rangeValue}>{pontaj} / 21 zile</span>
          </div>
        </div>

        <div className={styles.results} aria-live="polite" aria-label="Rezultate calcul salariu">
          <div className={styles.resultMain}>
            <span className={styles.resultLabel}>Salariu NET</span>
            <span className={styles.resultValue}>{fmt(r.net)}</span>
            <span className={styles.resultUnit}>lei/lună</span>
          </div>
          <div className={styles.resultRows}>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Salariu brut</span>
              <span className={styles.resultRowVal}>{fmt(r.brut)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>CAS 25% (pensie)</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(r.cas)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>CASS 10% (sănătate)</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(r.cass)} lei</span>
            </div>
            {ded > 0 && (
              <div className={styles.resultRow}>
                <span className={styles.resultRowLabel}>Deducere personală{copii > 0 ? ` +${copii} copii` : ""}</span>
                <span className={`${styles.resultRowVal} ${styles.resultRowPos}`}>−{fmt(ded)} lei</span>
              </div>
            )}
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Impozit venit 10%</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(r.impozit)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Cost total angajator (+CAM 2.25%)</span>
              <span className={styles.resultRowVal}>{fmt(r.totalAngajator)} lei</span>
            </div>
          </div>
          {total > 0 && (
            <div className={styles.breakdown}>
              <div className={styles.breakdownBar}>
                {segments.map((s) => (
                  <div key={s.label} className={styles.breakdownSeg}
                    style={{ width: `${(s.value / total) * 100}%`, background: s.color }} />
                ))}
              </div>
              <div className={styles.breakdownLegend}>
                {segments.map((s) => (
                  <span key={s.label} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: s.color }} />
                    {s.label}: {fmt(s.value)} lei
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.infoBox}>
          Salariul minim brut în 2026: <strong>4.050 lei</strong> (ian–iun) · <strong>4.325 lei</strong> (iul–dec).
          Deducerea personală (300 lei + 100/copil) se aplică la salarii ≤ 4.050 lei și dispare treptat până la 8.100 lei.
        </div>
      </div>
    </div>
  );
}
