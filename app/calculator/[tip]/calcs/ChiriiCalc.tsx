"use client";

import { useState } from "react";
import styles from "../../calculator.module.css";

const fmt = (n: number) => n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });

export default function ChiriiCalc() {
  const [chirieAnuala, setChirieAnuala] = useState(24000);
  const [tip, setTip] = useState<"fizic" | "juridic">("fizic");

  // Deducere 20% pentru persoane fizice
  const deducere   = tip === "fizic" ? chirieAnuala * 0.20 : 0;
  const venNet     = chirieAnuala - deducere;
  const impozit    = venNet * 0.10;

  // CASS: dacă venitul net > 6 x SMIN (6 * 3300 = 19.800)
  const pragCASS   = 6 * 3300;
  const cassBase   = venNet > pragCASS ? Math.min(venNet, 60 * 3300) : 0;
  const cass       = cassBase * 0.10;

  const totalTaxe  = impozit + cass;
  const ramas      = chirieAnuala - totalTaxe;

  const segments = [
    { label: "Impozit 10%", value: impozit, color: "#ef4444" },
    { label: "CASS 10%",    value: cass,    color: "#f97316" },
    { label: "Chirie netă", value: ramas,   color: "#22c55e" },
  ].filter((s) => s.value > 0);
  const total = segments.reduce((s, x) => s + x.value, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Calculator Impozit Chirii</div>
        <div className={styles.cardSubtitle}>Venituri din chirii · Persoană fizică · România 2026</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.field}>
          <label>Chiria este în relație cu</label>
          <div className={styles.toggleRow}>
            <button className={`${styles.toggleBtn} ${tip === "fizic" ? styles.toggleBtnActive : ""}`}
              onClick={() => setTip("fizic")}>Persoană fizică (deducere 20%)</button>
            <button className={`${styles.toggleBtn} ${tip === "juridic" ? styles.toggleBtnActive : ""}`}
              onClick={() => setTip("juridic")}>Firmă (fără deducere)</button>
          </div>
        </div>
        <div className={styles.field}>
          <label>Venit brut din chirie (lei/an)</label>
          <input type="number" value={chirieAnuala} min={0} step={1000}
            onChange={(e) => setChirieAnuala(Number(e.target.value))} />
          <span style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.2rem" }}>
            Echivalent lunar: {fmt(chirieAnuala / 12)} lei/lună
          </span>
        </div>

        <div className={styles.results}>
          <div className={styles.resultMain}>
            <span className={styles.resultLabel}>Chirie netă anuală</span>
            <span className={styles.resultValue}>{fmt(ramas)}</span>
            <span className={styles.resultUnit}>lei/an</span>
          </div>
          <div className={styles.resultRows}>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Chirie brută</span>
              <span className={styles.resultRowVal}>{fmt(chirieAnuala)} lei</span>
            </div>
            {tip === "fizic" && (
              <div className={styles.resultRow}>
                <span className={styles.resultRowLabel}>Deducere forfetară 20%</span>
                <span className={`${styles.resultRowVal} ${styles.resultRowPos}`}>−{fmt(deducere)} lei</span>
              </div>
            )}
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Venit net impozabil</span>
              <span className={styles.resultRowVal}>{fmt(venNet)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Impozit 10%</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozit)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>
                CASS 10% {venNet <= pragCASS ? `(sub plafon ${fmt(pragCASS)} lei — scutit)` : ""}
              </span>
              <span className={`${styles.resultRowVal} ${cass > 0 ? styles.resultRowNeg : ""}`}>
                {cass > 0 ? `−${fmt(cass)} lei` : "Scutit"}
              </span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Total taxe</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(totalTaxe)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Echivalent lunar net</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowPos}`}>{fmt(ramas / 12)} lei/lună</span>
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
          <strong>Deducerea forfetară de 20%</strong> se aplică automat veniturilor din chirii cu persoane fizice.
          {" "}<strong>CASS</strong> se datorează dacă venitul net depășește <strong>19.800 lei/an</strong> (6 × salariul minim brut).
          Termenul de depunere a declarației D212: <strong>25 mai</strong>.
        </div>
      </div>
    </div>
  );
}
