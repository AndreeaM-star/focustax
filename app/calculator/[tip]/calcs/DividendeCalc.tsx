"use client";

import { useState } from "react";
import styles from "../../calculator.module.css";
import CopyBtn from "@/components/CopyBtn";

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
            <div className={styles.rangeWrap}>
              <input type="range" min={0} max={1000000} step={5000} value={profitBrut}
                onChange={(e) => setProfitBrut(Number(e.target.value))}
                aria-label="Profit brut distribuit" />
              <span className={styles.rangeValue}>{fmt(profitBrut)} lei</span>
            </div>
            <input type="number" value={profitBrut} min={0} step={5000}
              onChange={(e) => setProfitBrut(Math.max(0, Number(e.target.value)))}
              aria-label="Valoare exactă profit"
              style={{ marginTop: 6, width: 160, padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(99,102,241,0.3)", background: "rgba(255,255,255,0.7)", fontSize: "0.88rem" }} />
          </div>
          <div className={styles.field}>
            <label>Alte venituri anuale (lei)</label>
            <input type="number" value={alteVen} min={0} step={1000}
              onChange={(e) => setAlteVen(Math.max(0, Number(e.target.value)))}
              aria-label="Alte venituri anuale" />
            <span style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: "0.2rem", display: "block" }}>
              PFA, chirii, salarii — pentru calcul corect CASS
            </span>
          </div>
        </div>

        {profitBrut > 0 && (
          <div style={{ margin: "4px 0 8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.73rem", fontWeight: 600, color: totalVen >= PRAG_CASS ? "#dc2626" : "#6b7280", marginBottom: 4 }}>
              <span>Prag CASS ({fmt(PRAG_CASS)} lei total venituri)</span>
              <span>{totalVen >= PRAG_CASS ? "Depășit — CASS datorată" : `${fmt(totalVen)} / ${fmt(PRAG_CASS)} lei`}</span>
            </div>
            <div style={{ height: 7, borderRadius: 5, background: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min((totalVen / PRAG_CASS) * 100, 100)}%`, background: totalVen >= PRAG_CASS ? "linear-gradient(90deg,#f97316,#dc2626)" : "linear-gradient(90deg,#22c55e,#f59e0b)", borderRadius: 5, transition: "width 0.5s ease" }} />
            </div>
          </div>
        )}

        <div className={styles.results} aria-live="polite">
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
              <CopyBtn text={`Calculator Dividende FocusTax 2026\nProfit brut distribuit: ${fmt(profitBrut)} lei\nImpozit dividende 16%: −${fmt(impozitDiv)} lei\nCASS 10% (pe dividende): ${cassDiv > 0 ? `−${fmt(cassDiv)} lei` : "Scutit"}\nTotal taxe: −${fmt(totalTaxe)} lei\nDividende nete: ${fmt(ramas)} lei\nRată efectivă: ${profitBrut > 0 ? ((totalTaxe / profitBrut) * 100).toFixed(1) : 0}%`} />
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
