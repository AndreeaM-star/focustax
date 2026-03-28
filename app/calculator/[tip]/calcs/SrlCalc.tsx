"use client";

import { useState } from "react";
import styles from "../../calculator.module.css";

const fmt = (n: number) => n.toLocaleString("ro-RO", { maximumFractionDigits: 0 });

export default function SrlCalc() {
  const [regim,    setRegim]    = useState<"micro" | "profit">("micro");
  const [ca,       setCa]       = useState(200000);
  const [profit,   setProfit]   = useState(50000);
  const [angajat,  setAngajat]  = useState(true);
  const [distribui, setDistribui] = useState(true);

  // Micro: 1% cu angajat, 3% fără
  const cotaMicro   = angajat ? 0.01 : 0.03;
  const impozitMicro = regim === "micro" ? ca * cotaMicro : 0;

  // Impozit profit 16%
  const impozitProfit = regim === "profit" ? profit * 0.16 : 0;

  const profitNet = regim === "micro"
    ? ca - impozitMicro  // simplificat
    : profit - impozitProfit;

  // Dividende: impozit 8% + CASS dacă > 6 x SMIN x 12 = 237.600 lei
  const impozitDiv = distribui ? profitNet * 0.08 : 0;
  const cassDiv    = distribui && profitNet > 6 * 3300 * 12
    ? Math.min(profitNet, 60 * 3300) * 0.10
    : 0;

  const ramas = distribui ? Math.max(0, profitNet - impozitDiv - cassDiv) : profitNet;

  const impozitTotal = (regim === "micro" ? impozitMicro : impozitProfit) + impozitDiv + cassDiv;

  const segments = [
    { label: regim === "micro" ? `Impozit micro ${angajat ? "1%" : "3%"}` : "Impozit profit 16%",
      value: regim === "micro" ? impozitMicro : impozitProfit, color: "#ef4444" },
    { label: "Impozit dividende 8%", value: impozitDiv,  color: "#f97316" },
    { label: "CASS dividende",       value: cassDiv,     color: "#eab308" },
    { label: "Rămas net",            value: ramas,       color: "#22c55e" },
  ].filter((s) => s.value > 0);
  const totalSeg = segments.reduce((s, x) => s + x.value, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Calculator SRL / Firmă</div>
        <div className={styles.cardSubtitle}>Microîntreprindere 1%/3% sau Impozit profit 16% · România 2026</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.field}>
          <label>Regim fiscal</label>
          <div className={styles.toggleRow}>
            <button className={`${styles.toggleBtn} ${regim === "micro" ? styles.toggleBtnActive : ""}`}
              onClick={() => setRegim("micro")}>Microîntreprindere (CA ≤ 500k EUR)</button>
            <button className={`${styles.toggleBtn} ${regim === "profit" ? styles.toggleBtnActive : ""}`}
              onClick={() => setRegim("profit")}>Impozit pe profit 16%</button>
          </div>
        </div>

        {regim === "micro" ? (
          <>
            <div className={styles.inputGroup}>
              <div className={styles.field}>
                <label>Cifră de afaceri anuală (lei)</label>
                <input type="number" value={ca} min={0} step={10000}
                  onChange={(e) => setCa(Number(e.target.value))} />
              </div>
              <div className={styles.field}>
                <label>Are angajat cu normă întreagă?</label>
                <div className={styles.toggleRow}>
                  <button className={`${styles.toggleBtn} ${angajat ? styles.toggleBtnActive : ""}`}
                    onClick={() => setAngajat(true)}>Da — 1%</button>
                  <button className={`${styles.toggleBtn} ${!angajat ? styles.toggleBtnActive : ""}`}
                    onClick={() => setAngajat(false)}>Nu — 3%</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.field}>
            <label>Profit impozabil anual (lei)</label>
            <input type="number" value={profit} min={0} step={5000}
              onChange={(e) => setProfit(Number(e.target.value))} />
          </div>
        )}

        <div className={styles.field}>
          <label>Distribui profitul ca dividende?</label>
          <div className={styles.toggleRow}>
            <button className={`${styles.toggleBtn} ${distribui ? styles.toggleBtnActive : ""}`}
              onClick={() => setDistribui(true)}>Da, distribui dividende</button>
            <button className={`${styles.toggleBtn} ${!distribui ? styles.toggleBtnActive : ""}`}
              onClick={() => setDistribui(false)}>Nu, rămâne în firmă</button>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.resultMain}>
            <span className={styles.resultLabel}>{distribui ? "Dividende nete" : "Profit rămas în firmă"}</span>
            <span className={styles.resultValue}>{fmt(ramas)}</span>
            <span className={styles.resultUnit}>lei/an</span>
          </div>
          <div className={styles.resultRows}>
            {regim === "micro" ? (
              <div className={styles.resultRow}>
                <span className={styles.resultRowLabel}>Impozit micro {angajat ? "1%" : "3%"}</span>
                <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozitMicro)} lei</span>
              </div>
            ) : (
              <div className={styles.resultRow}>
                <span className={styles.resultRowLabel}>Impozit profit 16%</span>
                <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozitProfit)} lei</span>
              </div>
            )}
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Profit net disponibil</span>
              <span className={styles.resultRowVal}>{fmt(profitNet)} lei</span>
            </div>
            {distribui && (
              <>
                <div className={styles.resultRow}>
                  <span className={styles.resultRowLabel}>Impozit dividende 8%</span>
                  <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozitDiv)} lei</span>
                </div>
                {cassDiv > 0 && (
                  <div className={styles.resultRow}>
                    <span className={styles.resultRowLabel}>CASS dividende 10%</span>
                    <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(cassDiv)} lei</span>
                  </div>
                )}
              </>
            )}
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Total taxe</span>
              <span className={`${styles.resultRowVal} ${styles.resultRowNeg}`}>−{fmt(impozitTotal)} lei</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultRowLabel}>Rata efectivă de taxare</span>
              <span className={styles.resultRowVal}>
                {((impozitTotal / (regim === "micro" ? ca : profit)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          {totalSeg > 0 && (
            <div className={styles.breakdown}>
              <div className={styles.breakdownBar}>
                {segments.map((s) => (
                  <div key={s.label} className={styles.breakdownSeg}
                    style={{ width: `${(s.value / totalSeg) * 100}%`, background: s.color }} />
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
          Microîntreprindere: CA ≤ 500.000 EUR (≈ 2,5M lei) și cel puțin 1 angajat pentru cota de <strong>1%</strong>.
          Fără angajat: <strong>3%</strong>. CASS la dividende se aplică dacă totalul depășește 237.600 lei/an.
        </div>
      </div>
    </div>
  );
}
