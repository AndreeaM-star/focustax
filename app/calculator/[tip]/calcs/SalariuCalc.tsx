"use client";

import { useState } from "react";
import styles from "../../calculator.module.css";

const fmt = (n: number) => n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
const SMIN = 4050;

function calc(brut: number, copii: number, pontaj: number) {
  const brutAjustat = (brut / 21) * Math.min(pontaj, 21);
  const cas   = brutAjustat * 0.25;
  const cass  = brutAjustat * 0.10;
  const bazaImpozabila = Math.max(0, brutAjustat - cas - cass - deducere(brutAjustat, copii));
  const impozit = bazaImpozabila * 0.10;
  const net     = brutAjustat - cas - cass - impozit;
  const cam     = brutAjustat * 0.0225;
  const totalAngajator = brutAjustat + cam;
  return { brut: brutAjustat, cas, cass, impozit, net: Math.max(0, net), cam, totalAngajator };
}

function deducere(brut: number, copii: number) {
  if (brut > SMIN * 2) return 0;
  if (brut <= SMIN) return 600 + copii * 300;
  const factor = (SMIN * 2 - brut) / SMIN;
  return Math.round((600 + copii * 300) * factor);
}

export default function SalariuCalc() {
  const [brut,   setBrut]   = useState(5000);
  const [copii,  setCopii]  = useState(0);
  const [pontaj, setPontaj] = useState(21);

  const r = calc(brut, copii, pontaj);
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
            <input type="number" value={brut} min={3300} step={100}
              onChange={(e) => setBrut(Number(e.target.value))} />
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

        <div className={styles.results}>
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
            {deducere(r.brut, copii) > 0 && (
              <div className={styles.resultRow}>
                <span className={styles.resultRowLabel}>Deducere personală{copii > 0 ? ` +${copii} copii` : ""}</span>
                <span className={`${styles.resultRowVal} ${styles.resultRowPos}`}>−{fmt(deducere(r.brut, copii))} lei</span>
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
          Salariul minim brut pe economie în 2026: <strong>3.300 lei</strong>.
          Deducerea personală se aplică integral la salarii ≤ 4.050 lei și dispare treptat până la 8.100 lei.
        </div>
      </div>
    </div>
  );
}
