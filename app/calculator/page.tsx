"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

type TipContribuabil = "pfa" | "srl" | "angajat" | "";

export default function CalculatorPage() {
  const [tip, setTip] = useState<TipContribuabil>("");
  const [venit, setVenit] = useState("");
  const [rezultat, setRezultat] = useState<null | {
    impozitVenit: number;
    cas: number;
    cass: number;
    total: number;
    net: number;
  }>(null);

  function calculeaza() {
    const v = parseFloat(venit.replace(",", "."));
    if (!tip || isNaN(v) || v <= 0) return;

    let impozitVenit = 0;
    let cas = 0;
    let cass = 0;
    const salarMinim = 4050;

    if (tip === "pfa") {
      impozitVenit = v * 0.1;
      cas = v >= salarMinim * 12 ? salarMinim * 12 * 0.25 : 0;
      cass = Math.min(v, salarMinim * 60) * 0.1;
    } else if (tip === "srl") {
      const cotaImpozit = v <= 500000 * 5 ? 0.01 : 0.16;
      impozitVenit = v * cotaImpozit;
      cas = 0;
      cass = 0;
    } else if (tip === "angajat") {
      cas = v * 0.25;
      cass = v * 0.1;
      const bazaImpozit = v - cas - cass - 300;
      impozitVenit = bazaImpozit > 0 ? bazaImpozit * 0.1 : 0;
    }

    const total = impozitVenit + cas + cass;
    setRezultat({ impozitVenit, cas, cass, total, net: v - total });
  }

  function reset() {
    setVenit("");
    setTip("");
    setRezultat(null);
  }

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Calculator Taxe</h1>
        <p className={styles.subtitle}>
          Estimează rapid impozitele și contribuțiile datorate în funcție de tipul tău de activitate.
        </p>
        <div className={styles.card}>
          <div className={styles.formGroup}>
            <label>Tip contribuabil</label>
            <div className={styles.tipGrid}>
              {[
                { val: "pfa", label: "PFA / II", desc: "Persoană fizică autorizată" },
                { val: "srl", label: "SRL", desc: "Microîntreprindere / Profit" },
                { val: "angajat", label: "Angajat", desc: "Venituri din salarii" },
              ].map((t) => (
                <button
                  key={t.val}
                  className={`${styles.tipBtn} ${tip === t.val ? styles.tipBtnActiv : ""}`}
                  onClick={() => { setTip(t.val as TipContribuabil); setRezultat(null); }}
                >
                  <span className={styles.tipLabel}>{t.label}</span>
                  <span className={styles.tipDesc}>{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="venit">Venit brut anual (lei)</label>
            <input
              id="venit"
              type="number"
              className={styles.input}
              placeholder="ex: 60000"
              value={venit}
              onChange={(e) => { setVenit(e.target.value); setRezultat(null); }}
            />
          </div>

          <div className={styles.btnRow}>
            <button className={styles.btnCalc} onClick={calculeaza} disabled={!tip || !venit}>
              Calculează
            </button>
            {rezultat && (
              <button className={styles.btnReset} onClick={reset}>Resetează</button>
            )}
          </div>

          {rezultat && (
            <div className={styles.rezultat}>
              <h2 className={styles.rezultatTitlu}>Estimare fiscală</h2>
              <div className={styles.rezultatGrid}>
                <div className={styles.rezultatRow}>
                  <span>Impozit pe venit (10%)</span>
                  <span className={styles.valoare}>{rezultat.impozitVenit.toFixed(0)} lei</span>
                </div>
                {rezultat.cas > 0 && (
                  <div className={styles.rezultatRow}>
                    <span>CAS — pensii (25%)</span>
                    <span className={styles.valoare}>{rezultat.cas.toFixed(0)} lei</span>
                  </div>
                )}
                {rezultat.cass > 0 && (
                  <div className={styles.rezultatRow}>
                    <span>CASS — sănătate (10%)</span>
                    <span className={styles.valoare}>{rezultat.cass.toFixed(0)} lei</span>
                  </div>
                )}
                <div className={`${styles.rezultatRow} ${styles.totalRow}`}>
                  <span>Total obligații fiscale</span>
                  <span className={styles.totalValoare}>{rezultat.total.toFixed(0)} lei</span>
                </div>
                <div className={`${styles.rezultatRow} ${styles.netRow}`}>
                  <span>Venit net estimat</span>
                  <span className={styles.netValoare}>{rezultat.net.toFixed(0)} lei</span>
                </div>
              </div>
              <p className={styles.disclaimer}>
                * Calcul orientativ. Consultați un contabil autorizat pentru situația dvs. exactă.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
