"use client";

import { useState } from "react";
import styles from "../../calculator.module.css";

const fmt = (n: number) => n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
const PRAG_CASS  = 6 * 4050;   // 24.300 lei/an — prag minim CASS (2026: 6 × salariu minim)
const PLAFON_CASS = 60 * 4050; // 243.000 lei/an — plafon CASS

export default function DividendeCalc() {
  const [profitBrut, setProfitBrut] = useState(100000);
  const [alteVen,    setAlteVen]    = useState(0); // alte venituri (PFA, chirii etc.)

  const impozitDiv = profitBrut * 0.16;
  const profitNet  = profitBrut - impozitDiv;

  // CASS se calculeaza pe total venituri (dividende + alte venituri)
  const totalVen    = profitBrut + alteVen;
  const cassBase    = totalVen > PRAG_CASS ? Math.min(totalVen, PLAFON_CASS) : 0;
  const cass        = cassBase * 0.10;

  // CASS atribuita proportional dividendelor
  const cassDiv = totalVen > 0 ? cass * (profitBrut / totalVen) : 0;

  const totalTaxe = impozitDiv + cassDiv;
  const ramas     = Math.max(0, profitBrut - totalTaxe);

  const segments = [
    { label: "Impozit dividende 16%", value: impozitDiv, color: "#ef4444" },
    { label: "CASS 10%",             value: cassDiv,    color: "#f97316" },
    { label: "Dividende nete",        value: ramas,      color: "#22c55e" },
  ].filter((s) => s.value > 0);
  const total = segments.reduce((s, x) => s + x.value, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Calculator Dividende</div>
        <div className={styles.cardSubtitle}>Distribuire profit SRL · Impozit 16% + CASS · România 2026</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <label>Profit brut distribuit (lei)</label>
            <input type="number" value={profitBrut} min={0} step={5000}
              onChange={(e) => setProfitBrut(Number(e.target.value))} />
          </div>
          <div className={styles.field}>
            <label>Alte venituri anuale (lei)</label>
            <input type="number" value={alteVen} min={0} step={1000}
              onChange={(e) => setAlteVen(Number(e.target.value))} />
            <span style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: "0.2rem" }}>
              PFA, chirii, salarii — pentru calcul corect CASS
            </span>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.resultMain}>
            <span className={styles.resultLabel}>Dividende nete</span>
            <span className={styles.resultValue}>{fmt(ramas)}</span>
            <span className={styles.resultUnit}>lei</span>
          </div>
          <div className={styles.resultRows}>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Profit brut distribuit</span>
              <span className={styles.resultRowVal}>{fmt(profitBrut)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Impozit dividende 16% (reținut la sursă)</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozitDiv)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>
                CASS 10% {totalVen <= PRAG_CASS ? "(sub 24.300 lei — scutit)" : `(baza: ${fmt(cassBase)} lei)`}
              </span>
              <span className={`${styles.resultRowVal} ${cassDiv > 0 ? styles.resultRowNeg : ""}`}>
                {cassDiv > 0 ? `−${fmt(cassDiv)} lei` : "Scutit"}
              </span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Total taxe</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(totalTaxe)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Rată efectivă de taxare</span>
              <span className={styles.resultRowVal}>{profitBrut > 0 ? ((totalTaxe / profitBrut) * 100).toFixed(1) : 0}%</span>
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
          Impozitul de <strong>16%</strong> (Legea 239/2025, aplicabil din 01.01.2026) se reține la sursă de firmă și se virează până pe 25 ale lunii următoare.
          <strong> CASS</strong> se datorează dacă totalul veniturilor depășește <strong>24.300 lei/an</strong>, plafonat la <strong>243.000 lei/an</strong>.
        </div>
      </div>
    </div>
  );
}
