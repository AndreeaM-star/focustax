"use client";

import { useState } from "react";
import styles from "../../calculator.module.css";

const fmt = (n: number) => n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
const SMIN_ANUAL = 3300 * 12; // 39600 lei

export default function PfaCalc() {
  const [sistem, setSistem] = useState<"norma" | "real">("real");
  const [venituri,     setVenituri]     = useState(60000);
  const [cheltuieli,   setCheltuieli]   = useState(15000);
  const [normaVenit,   setNormaVenit]   = useState(40000);

  const venNet = sistem === "real"
    ? Math.max(0, venituri - cheltuieli)
    : normaVenit;

  // CAS: 25% din venitul net, dacă > 12 salarii minime (39.600 lei/an)
  const casBase = Math.min(venNet, 24 * 3300); // plafon 24 x SMIN
  const cas = venNet >= SMIN_ANUAL ? casBase * 0.25 : 0;

  // CASS: 10% din venitul net, plafon 60 x SMIN
  const cassBase = Math.min(venNet, 60 * 3300);
  const cass = venNet > 0 ? cassBase * 0.10 : 0;

  // Impozit: 10% din venitul net
  const impozit = venNet * 0.10;

  const totalTaxe = cas + cass + impozit;
  const ramas     = Math.max(0, venNet - totalTaxe);

  const segments = [
    { label: "CAS 25%",     value: cas,     color: "#ef4444" },
    { label: "CASS 10%",    value: cass,    color: "#f97316" },
    { label: "Impozit 10%", value: impozit, color: "#eab308" },
    { label: "Rămas",       value: ramas,   color: "#22c55e" },
  ].filter((s) => s.value > 0);
  const total = segments.reduce((s, x) => s + x.value, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Calculator PFA / II / AF</div>
        <div className={styles.cardSubtitle}>Persoană fizică autorizată · România 2026</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.field}>
          <label>Sistem de impozitare</label>
          <div className={styles.toggleRow}>
            <button className={`${styles.toggleBtn} ${sistem === "real" ? styles.toggleBtnActive : ""}`}
              onClick={() => setSistem("real")}>Sistem real (venituri − cheltuieli)</button>
            <button className={`${styles.toggleBtn} ${sistem === "norma" ? styles.toggleBtnActive : ""}`}
              onClick={() => setSistem("norma")}>Normă de venit</button>
          </div>
        </div>

        {sistem === "real" ? (
          <div className={styles.inputGroup}>
            <div className={styles.field}>
              <label>Venituri brute anuale (lei)</label>
              <input type="number" value={venituri} min={0} step={1000}
                onChange={(e) => setVenituri(Number(e.target.value))} />
            </div>
            <div className={styles.field}>
              <label>Cheltuieli deductibile anuale (lei)</label>
              <input type="number" value={cheltuieli} min={0} step={1000}
                onChange={(e) => setCheltuieli(Number(e.target.value))} />
            </div>
          </div>
        ) : (
          <div className={styles.field}>
            <label>Normă de venit stabilită de ANAF (lei/an)</label>
            <input type="number" value={normaVenit} min={0} step={1000}
              onChange={(e) => setNormaVenit(Number(e.target.value))} />
          </div>
        )}

        <div className={styles.results}>
          <div className={styles.resultMain}>
            <span className={styles.resultLabel}>Rămas după taxe</span>
            <span className={styles.resultValue}>{fmt(ramas)}</span>
            <span className={styles.resultUnit}>lei/an</span>
          </div>
          <div className={styles.resultRows}>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Venit net impozabil</span>
              <span className={styles.resultRowVal}>{fmt(venNet)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>CAS 25% {venNet < SMIN_ANUAL ? "(sub plafon — 0)" : "(plafon 24x SMIN)"}</span>
              <span className={`${styles.resultRowVal} ${cas > 0 ? styles.resultRowNeg : ""}`}>
                {cas > 0 ? `−${fmt(cas)} lei` : "Scutit"}
              </span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>CASS 10% (plafon 60x SMIN)</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(cass)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Impozit venit 10%</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozit)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Total taxe anuale</span>
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
          <strong>CAS</strong> se datorează dacă venitul net ≥ 39.600 lei/an (12 × 3.300 lei).
          {" "}<strong>CASS</strong> se datorează indiferent de nivelul venitului, plafonat la 60 × SMIN = 198.000 lei.
        </div>
      </div>
    </div>
  );
}
