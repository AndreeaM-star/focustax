"use client";

import { useState } from "react";
import styles from "../../calculator.module.css";

const fmt    = (n: number) => n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });
const fmtDec = (n: number) => n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const COTE = [
  { label: "19% — standard",          val: 19 },
  { label: "9% — alimente / turism",   val: 9  },
  { label: "5% — cărți / locuințe",    val: 5  },
  { label: "0% — scutit cu drept",     val: 0  },
];

export default function TvaCalc() {
  const [mod,        setMod]        = useState<"adauga" | "extrage">("adauga");
  const [suma,       setSuma]       = useState(10000);
  const [cota,       setCota]       = useState(19);
  const [colectat,   setColectat]   = useState(0);
  const [deductibil, setDeductibil] = useState(0);

  // Calcul TVA per tranzactie
  const tva        = mod === "adauga"
    ? suma * (cota / 100)
    : suma - suma / (1 + cota / 100);
  const fara       = mod === "adauga" ? suma : suma / (1 + cota / 100);
  const total      = mod === "adauga" ? suma + tva : suma;

  // Decont TVA
  const tvaDePlata = Math.max(0, colectat - deductibil);
  const tvaDeRecuperat = Math.max(0, deductibil - colectat);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Calculator TVA</div>
        <div className={styles.cardSubtitle}>Adaugă sau extrage TVA · Decont D300 · România 2026</div>
      </div>
      <div className={styles.cardBody}>
        {/* TVA per tranzactie */}
        <div style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "#6b7280" }}>
          Calculator per tranzacție
        </div>

        <div className={styles.field}>
          <label>Operațiune</label>
          <div className={styles.toggleRow}>
            <button className={`${styles.toggleBtn} ${mod === "adauga" ? styles.toggleBtnActive : ""}`}
              onClick={() => setMod("adauga")}>Adaugă TVA (la preț fără TVA)</button>
            <button className={`${styles.toggleBtn} ${mod === "extrage" ? styles.toggleBtnActive : ""}`}
              onClick={() => setMod("extrage")}>Extrage TVA (din preț cu TVA)</button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <label>{mod === "adauga" ? "Preț fără TVA (lei)" : "Preț cu TVA (lei)"}</label>
            <input type="number" value={suma} min={0} step={100}
              onChange={(e) => setSuma(Number(e.target.value))} />
          </div>
          <div className={styles.field}>
            <label>Cotă TVA</label>
            <select value={cota} onChange={(e) => setCota(Number(e.target.value))}>
              {COTE.map((c) => <option key={c.val} value={c.val}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.resultMain}>
            <span className={styles.resultLabel}>TVA</span>
            <span className={styles.resultValue}>{fmtDec(tva)}</span>
            <span className={styles.resultUnit}>lei</span>
          </div>
          <div className={styles.resultRows}>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Preț fără TVA</span>
              <span className={styles.resultRowVal}>{fmtDec(fara)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>TVA {cota}%</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>{fmtDec(tva)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Preț cu TVA</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowPos}`}>{fmtDec(total)} lei</span>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div style={{ height: 1, background: "#f3f4f6", margin: "0.5rem 0" }} />
        <div style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "#6b7280" }}>
          Decont TVA lunar (D300)
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <label>TVA Colectat (vânzări)</label>
            <input type="number" value={colectat} min={0} step={100}
              onChange={(e) => setColectat(Number(e.target.value))} />
          </div>
          <div className={styles.field}>
            <label>TVA Deductibil (achiziții)</label>
            <input type="number" value={deductibil} min={0} step={100}
              onChange={(e) => setDeductibil(Number(e.target.value))} />
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.resultMain} style={{ background: tvaDePlata > 0 ? "#111" : "#15803d" }}>
            <span className={styles.resultLabel}>
              {tvaDePlata > 0 ? "TVA de plată" : "TVA de recuperat"}
            </span>
            <span className={styles.resultValue}>{fmt(tvaDePlata > 0 ? tvaDePlata : tvaDeRecuperat)}</span>
            <span className={styles.resultUnit}>lei</span>
          </div>
          <div className={styles.resultRows}>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>TVA colectat</span>
              <span className={styles.resultRowVal}>{fmt(colectat)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>TVA deductibil</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowPos}`}>−{fmt(deductibil)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>{tvaDePlata > 0 ? "De virat la stat" : "De solicitat la rambursare"}</span>
              <span className={`${styles.resultRowVal} ${tvaDePlata > 0 ? styles.resultRowNeg : styles.resultRowPos}`}>
                {fmt(tvaDePlata > 0 ? tvaDePlata : tvaDeRecuperat)} lei
              </span>
            </div>
          </div>
        </div>

        <div className={styles.infoBox}>
          Termenul de depunere D300: <strong>25 ale lunii</strong> următoare perioadei de raportare.
          Pragul de înregistrare obligatorie în scopuri de TVA: <strong>300.000 lei/an</strong> (cifra de afaceri).
        </div>
      </div>
    </div>
  );
}
